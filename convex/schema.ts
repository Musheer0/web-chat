import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    message:defineTable({
        content:v.string(),
        type :v.union(v.literal("ai"),v.literal("user")),
        user_id:v.string(),
        chat:v.id("chat"),
        original_rag_content:v.optional(v.string()),
        token_usage:v.optional(v.number()),
    }).index("by_user_chat",["chat","user_id"]),
    website_data:defineTable({
        data:v.string(),
        url:v.string(),
        metadata:v.string(),
        entry_id:v.optional(v.string()),
        user_id:v.string(),
    }).index("by_user",["user_id"]),
    chat:defineTable({
        favicon:v.string(),
        name:v.string(),
        description:v.string(),
        website_id:v.id("website_data"),
        user_id:v.string(),
        thread_id:v.optional(v.string())
    }).index("by_user",["user_id"])
    .index("by_user_website",["user_id","website_id"]),
    token_usage:defineTable({
     user_id:v.string(),
     token_available:v.number(),
     last_token_updated:v.number(),
     plan:v.union(v.literal("free"),v.literal("pro"),v.literal("ultra")),
     website_index_available:v.number(),
     chat_creation_available:v.number()
    }).index("by_user",["user_id"]),
})