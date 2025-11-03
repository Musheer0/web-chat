import { ConvexError, v } from "convex/values";
import { action, internalAction, internalMutation } from "../../_generated/server";
import { rag } from "../../ai/rag";
import { components, internal } from "../../_generated/api";
import { createThread } from "@convex-dev/agent";
import { agent} from "../../ai/agent";



/**
 * Internal mutation: stores a user's message into a chat thread.
 *
 * - If thread does not exist yet → creates new agent thread
 * - Inserts user message to DB
 *
 * @param id - chat id in Convex
 * @param content - raw text user message
 * @returns chat object with guaranteed thread_id set
 */
export const SendMessageInternal = internalMutation({
    args:{
        id:v.id("chat"),
        content:v.string()
    },
    handler:async(ctx,args)=>{
        const {id, content} = args;
          const auth = await ctx.auth.getUserIdentity();
          if(!auth) throw new ConvexError("Unauthorized");
          const chat = await ctx.db.get(id);
          if(!chat) throw new Error("chat not found")
         if(chat.user_id!==auth.subject) throw new ConvexError("Un authorized");
          let thread_id = chat.thread_id
         if(!thread_id){
           const threadId = await createThread(ctx,components.agent);
           await ctx.db.patch(chat._id,{
            thread_id:threadId
           });
           thread_id = threadId;
         };
         if(!thread_id) throw new ConvexError("Error creating agent thread")
         await ctx.db.insert("message",{
            chat:chat._id,
            content,
            type:"user",
            user_id:auth.subject,
            
         });
         return {
          ...chat,
          thread_id:thread_id
         }

    }
});



/**
 * Internal mutation: stores AI model response message into DB.
 *
 * @param id - chat id in Convex
 * @param content - final AI response text
 * @param rag_content - text chunks retrieved from RAG search that assisted AI
 * @param usage - token usage (for metering / cost tracking)
 */
export const SendAiMessageInternal =internalMutation({
      args:{
         id:v.id("chat"),
        content:v.string(),
        rag_content:v.string(),
        usage:v.number()
    },
    handler:async(ctx,args)=>{
            const auth = await ctx.auth.getUserIdentity();
          if(!auth) throw new ConvexError("Unauthorized");
                   await ctx.db.insert("message",{
            chat:args.id,
            content:args.content,
            type:"ai",
            user_id:auth.subject,
            original_rag_content:args.rag_content,
            token_usage:args.usage
         });
    }
});


/**
 * Public Action: one full message exchange pipeline
 *
 * Steps:
 * 1. store user message in DB
 * 2. RAG search → find relevant website chunks
 * 3. agent.generateText → produce AI reply based on user msg + RAG context
 * 4. store AI response in DB (SendAiMessageInternal)
 *
 * This is the only public entrypoint for “send message to chat”
 *
 * @param id - chat id user is talking to
 * @param content - user input text message
 */
export const SendMsg = action({
    args:{
         id:v.id("chat"),
        content:v.string()
    },
    handler:async(ctx,args)=>{
             const auth = await ctx.auth.getUserIdentity();
          if(!auth) throw new ConvexError("Unauthorized");
       const chat =  await ctx.runMutation(internal.website.chat.mutate.SendMessageInternal,{
            ...args
        });
      const {text}= await rag.search(ctx,{
        namespace:chat.website_id,
        query:args.content,
        limit:4,
        vectorScoreThreshold:0.48,
        chunkContext:{
          before:1,
          after:1
        },
      });
      const {text:AgentText,usage:AgentUsage} = await agent.generateText(ctx,{
        threadId:chat.thread_id,
        userId:auth.subject
      },{prompt:`
        <user question>
      ${args.content}
        </user question>
        <provided content>
        ${text}
        </provided content>
        `});
        await ctx.runMutation(internal.website.chat.mutate.SendAiMessageInternal,{
          content:AgentText,
          usage:AgentUsage.totalTokens||0,
          id:args.id,
          rag_content:text
        });
    }
})
export const SendMsgInternal = internalAction({
    args:{
         id:v.id("chat"),
        content:v.string()
    },
    handler:async(ctx,args)=>{
             const auth = await ctx.auth.getUserIdentity();
          if(!auth) throw new ConvexError("Unauthorized");
       const chat =  await ctx.runMutation(internal.website.chat.mutate.SendMessageInternal,{
            ...args
        });
      const {text}= await rag.search(ctx,{
        namespace:chat.website_id,
        query:args.content,
        limit:4,
        vectorScoreThreshold:0.48,
        chunkContext:{
          before:1,
          after:1
        },
      });
      const {text:AgentText,usage:AgentUsage} = await agent.generateText(ctx,{
        threadId:chat.thread_id,
        userId:auth.subject
      },{prompt:`
        <user question>
      ${args.content}
        </user question>
        <provided content>
        ${text}
        </provided content>
        `});
        await ctx.runMutation(internal.website.chat.mutate.SendAiMessageInternal,{
          content:AgentText,
          usage:AgentUsage.totalTokens||0,
          id:args.id,
          rag_content:text
        });
    }
})