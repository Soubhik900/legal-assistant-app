import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const conversations = pgTable("conversations", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull().unique(),
  userId: text("user_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  conversationId: integer("conversation_id").notNull(),
  content: text("content").notNull(),
  isUser: boolean("is_user").notNull(),
  messageType: text("message_type").default("text"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const judicialQueries = pgTable("judicial_queries", {
  id: serial("id").primaryKey(),
  query: text("query").notNull(),
  category: text("category").notNull(),
  response: text("response").notNull(),
  keywords: text("keywords").array(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertConversationSchema = createInsertSchema(conversations).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  createdAt: true,
});

export const insertJudicialQuerySchema = createInsertSchema(judicialQueries).omit({
  id: true,
  createdAt: true,
});

export type InsertConversation = z.infer<typeof insertConversationSchema>;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type InsertJudicialQuery = z.infer<typeof insertJudicialQuerySchema>;

export type Conversation = typeof conversations.$inferSelect;
export type Message = typeof messages.$inferSelect;
export type JudicialQuery = typeof judicialQueries.$inferSelect;
