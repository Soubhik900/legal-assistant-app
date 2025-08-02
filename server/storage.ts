import { 
  conversations, messages, judicialQueries,
  type Conversation, type Message, type JudicialQuery,
  type InsertConversation, type InsertMessage, type InsertJudicialQuery 
} from "@shared/schema";

export interface IStorage {
  // Conversations
  getConversation(sessionId: string): Promise<Conversation | undefined>;
  createConversation(conversation: InsertConversation): Promise<Conversation>;
  updateConversation(sessionId: string, updates: Partial<Conversation>): Promise<Conversation | undefined>;
  
  // Messages
  getMessagesByConversationId(conversationId: number): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  
  // Judicial Queries
  getAllJudicialQueries(): Promise<JudicialQuery[]>;
  getJudicialQueriesByCategory(category: string): Promise<JudicialQuery[]>;
  searchJudicialQueries(keywords: string[]): Promise<JudicialQuery[]>;
  createJudicialQuery(query: InsertJudicialQuery): Promise<JudicialQuery>;
}

export class MemStorage implements IStorage {
  private conversations: Map<number, Conversation>;
  private messages: Map<number, Message>;
  private judicialQueries: Map<number, JudicialQuery>;
  private currentConversationId: number;
  private currentMessageId: number;
  private currentJudicialQueryId: number;

  constructor() {
    this.conversations = new Map();
    this.messages = new Map();
    this.judicialQueries = new Map();
    this.currentConversationId = 1;
    this.currentMessageId = 1;
    this.currentJudicialQueryId = 1;
  }

  async getConversation(sessionId: string): Promise<Conversation | undefined> {
    return Array.from(this.conversations.values()).find(
      (conv) => conv.sessionId === sessionId
    );
  }

  async createConversation(insertConversation: InsertConversation): Promise<Conversation> {
    const id = this.currentConversationId++;
    const now = new Date();
    const conversation: Conversation = {
      ...insertConversation,
      id,
      userId: insertConversation.userId || null,
      createdAt: now,
      updatedAt: now,
    };
    this.conversations.set(id, conversation);
    return conversation;
  }

  async updateConversation(sessionId: string, updates: Partial<Conversation>): Promise<Conversation | undefined> {
    const conversation = await this.getConversation(sessionId);
    if (!conversation) return undefined;
    
    const updated: Conversation = {
      ...conversation,
      ...updates,
      updatedAt: new Date(),
    };
    this.conversations.set(conversation.id, updated);
    return updated;
  }

  async getMessagesByConversationId(conversationId: number): Promise<Message[]> {
    return Array.from(this.messages.values())
      .filter((message) => message.conversationId === conversationId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.currentMessageId++;
    const message: Message = {
      ...insertMessage,
      id,
      messageType: insertMessage.messageType || "text",
      metadata: insertMessage.metadata || null,
      createdAt: new Date(),
    };
    this.messages.set(id, message);
    return message;
  }

  async getAllJudicialQueries(): Promise<JudicialQuery[]> {
    return Array.from(this.judicialQueries.values());
  }

  async getJudicialQueriesByCategory(category: string): Promise<JudicialQuery[]> {
    return Array.from(this.judicialQueries.values()).filter(
      (query) => query.category === category
    );
  }

  async searchJudicialQueries(keywords: string[]): Promise<JudicialQuery[]> {
    const lowercaseKeywords = keywords.map(k => k.toLowerCase());
    return Array.from(this.judicialQueries.values()).filter(
      (query) => {
        const queryText = (query.query + " " + query.response + " " + (query.keywords?.join(" ") || "")).toLowerCase();
        return lowercaseKeywords.some(keyword => queryText.includes(keyword));
      }
    );
  }

  async createJudicialQuery(insertQuery: InsertJudicialQuery): Promise<JudicialQuery> {
    const id = this.currentJudicialQueryId++;
    const query: JudicialQuery = {
      ...insertQuery,
      id,
      keywords: insertQuery.keywords || null,
      createdAt: new Date(),
    };
    this.judicialQueries.set(id, query);
    return query;
  }
}

export const storage = new MemStorage();
