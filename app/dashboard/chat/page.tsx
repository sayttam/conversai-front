"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Paperclip, Send, Bot, User, Settings, MessageSquare } from "lucide-react"

interface Message {
  id: string
  role: "user" | "ai"
  content: string
  timestamp: Date
}

export default function ChatPage() {
  const [input, setInput] = useState("")
  const [activeConversation, setActiveConversation] = useState("1")
  const [messages, setMessages] = useState<Record<string, Message[]>>({
    "1": [
      {
        id: "1",
        role: "ai",
        content: "Hello! How can I help you today?",
        timestamp: new Date(Date.now() - 3600000),
      },
      {
        id: "2",
        role: "user",
        content: "I'm interested in learning more about your premium plan",
        timestamp: new Date(Date.now() - 3500000),
      },
      {
        id: "3",
        role: "ai",
        content:
          "Great! Our premium plan includes advanced AI capabilities, unlimited conversations, priority support, and custom branding options. Would you like more specific details about any of these features?",
        timestamp: new Date(Date.now() - 3400000),
      },
    ],
    "2": [
      {
        id: "1",
        role: "ai",
        content: "Welcome back! Is there anything I can help you with today?",
        timestamp: new Date(),
      },
    ],
    "3": [],
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isTyping, setIsTyping] = useState(false)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, activeConversation])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => ({
      ...prev,
      [activeConversation]: [...(prev[activeConversation] || []), userMessage],
    }))

    setInput("")
    setIsTyping(true)

    // Simulate AI response after delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content:
          "Thank you for your message. This is a simulated response from the AI chatbot. In a real implementation, this would be connected to your backend and GPT service.",
        timestamp: new Date(),
      }

      setMessages((prev) => ({
        ...prev,
        [activeConversation]: [...(prev[activeConversation] || []), aiMessage],
      }))

      setIsTyping(false)
    }, 2000)
  }

  const conversations = [
    { id: "1", name: "Support Inquiry", client: "Acme Inc", recent: true },
    { id: "2", name: "Product Question", client: "TechCorp", recent: true },
    { id: "3", name: "New Conversation", client: "Start New Chat", recent: false },
  ]

  return (
    <div className="flex h-[calc(100vh-7rem)] gap-4 flex-col md:flex-row">
      {/* Conversation List (Left Sidebar) */}
      <div className="md:w-80 w-full h-auto md:h-full">
        <Card className="h-full flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle>Conversations</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto p-0">
            <ScrollArea className="h-full rounded-md">
              <div className="space-y-2 p-3">
                {conversations.map((conversation) => (
                  <Button
                    key={conversation.id}
                    variant={activeConversation === conversation.id ? "default" : "ghost"}
                    className="w-full justify-start px-2 py-6 h-auto"
                    onClick={() => setActiveConversation(conversation.id)}
                  >
                    <div className="flex flex-col items-start">
                      <div className="flex items-center">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        <span>{conversation.name}</span>
                        {conversation.recent && (
                          <Badge variant="outline" className="ml-2">
                            New
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground mt-1">{conversation.client}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Chat Interface (Main Content) */}
      <div className="flex-1 flex flex-col h-full">
        <Card className="flex-1 flex flex-col h-full">
          <CardHeader className="py-3 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CardTitle>{conversations.find((c) => c.id === activeConversation)?.name || "Chat"}</CardTitle>
                <Badge variant="outline" className="ml-2">
                  {conversations.find((c) => c.id === activeConversation)?.client || "Client"}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <Switch id="ai-mode" />
                  <label htmlFor="ai-mode" className="text-sm">
                    AI Mode
                  </label>
                </div>
                <Button variant="ghost" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <Tabs defaultValue="chat" className="flex-1 flex flex-col">
            <TabsList className="mx-4 mt-2 justify-start">
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="chat" className="flex-1 flex flex-col data-[state=active]:flex-1">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages[activeConversation]?.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className="flex gap-3 max-w-[80%]">
                        {message.role === "ai" && (
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              <Bot className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`rounded-lg p-3 ${
                            message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          <div className="text-sm whitespace-pre-wrap break-words">{message.content}</div>
                          <div className="mt-1 text-xs opacity-70">
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                        {message.role === "user" && (
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex gap-3 max-w-[80%]">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="rounded-lg p-3 bg-muted">
                          <div className="flex space-x-1">
                            <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.3s]"></div>
                            <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.15s]"></div>
                            <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              <div className="p-4 border-t">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Button variant="outline" size="icon" type="button">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button type="submit">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </TabsContent>
            <TabsContent value="settings" className="p-4">
              <h3 className="font-semibold mb-4">Chat Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label htmlFor="enable-history" className="text-sm font-medium">
                    Save Chat History
                  </label>
                  <Switch id="enable-history" />
                </div>
                <div className="flex items-center justify-between">
                  <label htmlFor="notifications" className="text-sm font-medium">
                    Enable Notifications
                  </label>
                  <Switch id="notifications" />
                </div>
                <div className="flex items-center justify-between">
                  <label htmlFor="ai-suggestions" className="text-sm font-medium">
                    AI Suggestions
                  </label>
                  <Switch id="ai-suggestions" defaultChecked />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}

