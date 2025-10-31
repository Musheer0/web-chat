import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    website:defineTable({
        name:v.string(),
        url:v.string(),
        data:v.array(v.id("website_data")),
        entry_id:v.string(),
        user_id:v.string()
    }),
    message:defineTable({
        website:v.id("website"),
        content:v.string(),
        type :v.union(v.literal("ai"),v.literal("user")),
        user_id:v.string()
    }),
    website_data:defineTable({
        website:v.id("website"),
        data:v.string(),
        entry_id:v.string(),
    })
})