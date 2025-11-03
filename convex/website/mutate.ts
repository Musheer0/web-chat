import { ConvexError, v } from "convex/values";
import { action, internalMutation, internalQuery, mutation } from "../_generated/server";
import { rag } from "../ai/rag";
import { components, internal } from "../_generated/api";
import { titleAgent } from "../ai/agent";
import { Id } from "../_generated/dataModel";
import { auth } from "@clerk/nextjs/server";




/**
 * Internal mutation to save a scraped website to the DB.
 * @param metadata - stringified JSON metadata of website (title, desc, icons etc)
 * @param data - main markdown/raw website text
 * @param links - comma separated list of links found on page
 * @param url - original website URL
 * @returns Object containing inserted id + combined markdown+links text
 */
export const saveWebsiteInternal = internalMutation({
    args:{
         metadata:v.string(),
         data:v.string(),
         links:v.string(),
         url:v.string(),
    },
     handler:async(ctx,args)=>{
        const auth = await ctx.auth.getUserIdentity();
        if(!auth) throw new ConvexError("Unauthorized");
        const website = await ctx.db.insert("website_data",{
            data:`
            ${args.data}\n
            ${args.links}
            `,
            metadata:args.metadata,
            url:args.url,
            user_id:auth.subject
        });
      return {
        id:website,
        data:`
            ${args.data}\n
            ${args.links}
            `
      }
     }
});



/**
 * Internal mutation to store RAG entry_id after AI vector indexing is done.
 * @param entry_id - RAG vector database entry ID
 * @param id - DB id of website_data row to attach rag entry id to
 */
export const saveWebsiteRagInternal = internalMutation({
    args:{
         entry_id:v.string(),
         id:v.id("website_data")
    },
     handler:async(ctx,args)=>{
        const auth = await ctx.auth.getUserIdentity();
        if(!auth) throw new ConvexError("Unauthorized");
        await ctx.db.patch(args.id,{
            entry_id:args.entry_id
        })
        
     }
});




/**
 * Public Action: Scrape website → store data → index into RAG
 * This is your main pipeline starter.
 * 
 * Steps:
 * - scrape remote URL
 * - store markdown + links + metadata inside convex
 * - push entire data to RAG AI indexing
 * - attach the rag entry id back to the same website_data row
 * 
 * @param url - website URL to scrape and index
 */
export const saveWebsite =action({
    args:{
        url:v.string()
    },
    handler:async(ctx,args)=>{
        const auth = await ctx.auth.getUserIdentity();
        if(!auth) throw new ConvexError("Unauthorized");
        const req = await fetch("https://gr2q598g-3000.inc1.devtunnels.ms/api/scrape/website?website="+args.url,{
            headers:{
                'X-CONVEX-KEY':'test123'
            }
        });
        const res = await req.json();
        const {data,id} = await ctx.runMutation(internal.website.mutate.saveWebsiteInternal,{
            data:JSON.stringify(res['markdown']),
            links:res['links'].join(','),
            metadata:JSON.stringify(res['metadata']),
            url:args.url
        });
           const {entryId} = await rag.add(ctx,{
            namespace:id,
            text:`
            ${data}
            `
        });
        await ctx.runMutation(internal.website.mutate.saveWebsiteRagInternal,{
            entry_id:entryId,
            id:id
        })
        
        
    }
});


/**
 * Internal Function to create chat by taking ai generated title
 */
export const createChatInternal = internalMutation({
  args: {
    websiteId: v.id("website_data"),
    title: v.string(),
    msg: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    const auth = await ctx.auth.getUserIdentity();
    if (!auth) throw new ConvexError("Unauthorized");
    const website = await ctx.db.get(args.websiteId);
    if (!website) throw new Error("not found");
    if (website.user_id !== auth.subject) throw new Error("un authorized");
    if (!website.entry_id) throw new Error("website not indexed yet please wait");
    const { description, favicon } = JSON.parse(website.metadata);
    const chatId = await ctx.db.insert("chat", {
      description,
      favicon,
      name: args.title,
      website_id: website._id,
      user_id: auth.subject,
    });

    return chatId;
  }
});
/**
 * Internal function to get website 
 */
export const GetWebsiteInternal = internalQuery({
    args:{
        id:v.id("website_data")
    },
     handler: async (ctx, args) => {
    const auth = await ctx.auth.getUserIdentity();
    if (!auth) throw new ConvexError("Unauthorized");

    const website = await ctx.db.get(args.id);
    if (!website) throw new Error("not found");
    if (website.user_id !== auth.subject) throw new Error("un authorized");
    if (!website.entry_id) throw new Error("website not indexed yet please wait");
    return website
  }
});
export const CreateChatFromWebsite = action({
    args:{
          websiteId: v.id("website_data"),
    msg: v.optional(v.string())
    },handler:async(ctx,args)=>{
          const auth = await ctx.auth.getUserIdentity();
    if (!auth) throw new ConvexError("Unauthorized");

    const website = await ctx.runQuery(internal.website.mutate.GetWebsiteInternal,{id:args.websiteId});
    var title = JSON.parse(website.metadata).title as string;
    if(args.msg){
        const {text} = await titleAgent.generateText(ctx,{userId:auth.subject},{prompt:`
            chat title:${title}
            user first message: ${args.msg}
            `});
            title = text
    }
     const chatId:any = await ctx.runMutation(internal.website.mutate.createChatInternal,{
        ...args,
        title
    });
    if(args.msg){
      await ctx.runAction(internal.website.chat.mutate.SendMsgInternal,{
      id:chatId,
      content:args.msg
    })
    }
    return chatId
    }
})


/**
 * Deletes chat permanently for that user.
 * @param id - convex chat id
 */
export const deleteChat = mutation({
  args: {
    id: v.id("chat"),
  },
  handler: async (ctx, args) => {
    const auth = await ctx.auth.getUserIdentity();
    if (!auth) throw new ConvexError("Unauthorized");

    const chat = await ctx.db.get(args.id);
    if (!chat) throw new Error("Chat not found");
    if (chat.user_id !== auth.subject) throw new ConvexError("Not allowed");

    await ctx.db.delete(args.id);
  },
});


                                                                                                     
