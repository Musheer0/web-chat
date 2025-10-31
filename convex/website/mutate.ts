import { ConvexError, v } from "convex/values";
import { mutation } from "../_generated/server";

export const sendMessage = mutation({
    args:{
        website:v.id("website"),
        content:v.string(),
    },
    handler:async(ctx,args)=>{
        const auth = await ctx.auth.getUserIdentity();
        if(!auth) throw new ConvexError("Un authorized");
        const data = await ctx.db.get(args.website);
        if(!data) throw new Error("no website found")
        
    }
});
