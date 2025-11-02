import z from 'zod'
import { createTool } from "@convex-dev/agent"
import { rag } from '../rag';

export const queryRag =  createTool({
        description:"This is rag tool use this to query content from document based on query and get namespace from user prompt",
        args:z.object({
            query:z.string(),
            namespace:z.string()
        }),
        handler:async(ctx,args)=>{
            console.log("search tool");
            const {text} = await rag.search(ctx,args);
            console.dir({query:args.query,response:text});
            return text;z
        }
    });