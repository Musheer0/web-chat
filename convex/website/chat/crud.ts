import { ConvexError, v } from "convex/values";
import { query } from "../../_generated/server";
import { paginationOptsValidator } from "convex/server";

export const GetUserWebsiteChats = query({
     args: { paginationOpts: paginationOptsValidator,webiste_id:v.id("website_data") },
    handler:async(ctx,args)=>{
            const auth = await ctx.auth.getUserIdentity();
            if (!auth) throw new ConvexError("Unauthorized");
            const websites = await ctx.db.query("chat")
            .withIndex("by_user_website",(q)=>q.eq("user_id",auth.subject).eq("website_id",args.webiste_id))
            .paginate(args.paginationOpts);
            const filtered_results = websites.page.map((p)=>{
                return {
                    ...p,
                }
            })
            return {
                ...websites,
                page:filtered_results
            }
     }
});
export const GetPaginatedMessages = query({
  args:{
    paginationOpts: paginationOptsValidator,
    chat_id: v.id("chat")
  },
  handler: async (ctx,args)=>{
     const auth = await ctx.auth.getUserIdentity()
     if(!auth) throw new ConvexError("bro log in first 💀")

     const messages = await ctx.db
       .query("message")
       .withIndex("by_user_chat", (q)=>q.eq("chat", args.chat_id).eq("user_id", auth.subject))
       .paginate(args.paginationOpts)

     return {
       ...messages,
       page: messages.page.map(msg => ({
         ...msg
       }))
     }
  }
})
