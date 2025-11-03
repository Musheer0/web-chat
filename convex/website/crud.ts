import { ConvexError, v } from "convex/values";
import { query } from "../_generated/server";
import { paginationOptsValidator } from "convex/server";

export const GetUserWebsites = query({
     args: { paginationOpts: paginationOptsValidator },
    handler:async(ctx,args)=>{
            const auth = await ctx.auth.getUserIdentity();
            if (!auth) throw new ConvexError("Unauthorized");
            const websites = await ctx.db.query("website_data")
            .withIndex("by_user",(q)=>q.eq("user_id",auth.subject))
            .paginate(args.paginationOpts);
            const filtered_results = websites.page.map((p)=>{
                return {
                    ...p,
                    data:'filtered',
                    metadata:JSON.parse(p.metadata||JSON.stringify({}))
                }
            })
            return {
                ...websites,
                page:filtered_results
            }
     }
});
export const GetWebsiteById = query({
    args:{
        id: v.id("website_data"),
    },
    handler: async (ctx,args)=>{
        const auth = await ctx.auth.getUserIdentity()
        if(!auth) throw new ConvexError("Unauthorized")

        const website = await ctx.db.get(args.id)
        if(!website) throw new ConvexError("Not found")

        // check belongs to user bro this is CRITICAL
        if(website.user_id !== auth.subject) throw new ConvexError("Not allowed")

        return {
            ...website,
            data:"filtered", // same as list bro never raw dump
            metadata: JSON.parse(website.metadata || JSON.stringify({}))
        }
    }
})
