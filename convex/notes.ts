import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("notes", args);
  },
});

export const getAll = query(async (ctx) => {
  return await ctx.db.query("notes").collect();
});

export const deleteNote = mutation({
  args: {
    id: v.id("notes"), // ✅ Correct validator for a document ID from the "notes" table
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
