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
})