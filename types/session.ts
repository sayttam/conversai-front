export interface Message {
    role: "system" | "user" | "assistant"
    content: string
    timestamp: string
  }
  
  export interface GptInstance {
    model: string
    instructions: string
  }
  
  export interface Session {
    _id: string
    consumerId: string
    campaignId: string
    gptInstance: GptInstance
    conversationHistory: Message[]
    lastActivity: string
    status: "active" | "closed"
  }
  
  export interface Consumer {
    _id: string
    name: string
    email: string
    phone?: string
    avatar?: string
  }

  export interface Message {
    role: "system" | "user" | "assistant" 
    content: string
    timestamp: string
  }
  