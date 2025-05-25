"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, Send, User, Bot, Clock } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import type { Session, Consumer } from "@/types/session"
import { ChatMessage } from "@/components/chat-message"

export default function SessionChatPage({
    params,
}: {
    params: { campaignId: string; sessionId: string }
}) {
    const router = useRouter()
    const [session, setSession] = useState<Session | null>(null)
    const [consumer, setConsumer] = useState<Consumer | null>(null)
    const [loading, setLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
    const [newMessage, setNewMessage] = useState("")
    const chatContainerRef = useRef<HTMLDivElement>(null)
    const [expandedMessages, setExpandedMessages] = useState<Set<number>>(new Set())

    useEffect(() => {
        fetchSession()
        setIsAuthenticated(true)
    }, [])

    useEffect(() => {
        // Scroll to bottom when messages change
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
        }
    }, [session?.conversationHistory])

    

    const checkAuth = async () => {
        try {
            const response = await fetch("/api/auth/check")
            if (response.ok) {
                setIsAuthenticated(true)
                fetchSession()
            } else {
                setIsAuthenticated(false)
                router.push("/login")
            }
        } catch (error) {
            console.error("Auth check error:", error)
            setIsAuthenticated(false)
            router.push("/login")
        }
    }

    const toggleExpanded = (index: number) => {
        setExpandedMessages(prev => {
            const updated = new Set(prev)
            updated.has(index) ? updated.delete(index) : updated.add(index)
            return updated
        })
    }

    const fetchSession = async () => {
        try {
            const url = new URL(window.location.href)
            const sessionId = url.pathname.split("/").pop();
            const response = await fetch(`/api/sessions/${sessionId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("accessToken") || "",
                },
                credentials: "include",
            })
            if (!response.ok) {
                throw new Error("Failed to fetch session")
            }
            const data = await response.json()
            setSession(data)

            // Fetch consumer details
            if (data.consumerId) {
                fetchConsumer(data.consumerId)
            }
        } catch (error) {
            console.error("Error fetching session:", error)
            toast({
                title: "Error",
                description: "Failed to load chat session",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    const fetchConsumer = async (consumerId: string) => {
        try {
            console.log("Fetching consumer with ID:", consumerId)
            const response = await fetch(`/api/consumers/${consumerId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("accessToken") || "",
                },
                credentials: "include",
            })

            if (!response.ok) {
                throw new Error("Failed to fetch consumer")
            }
            const data = await response.json()
            setConsumer(data)
        } catch (error) {
            console.error("Error fetching consumer:", error)
        }
    }

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!newMessage.trim() || !session) return

        // This is just for UI preview - in a real app, you'd send this to the backend
        // and get a response from the AI
        const updatedSession = {
            ...session,
            conversationHistory: [
                ...session.conversationHistory,
                {
                    role: "assistant",
                    content: newMessage,
                    timestamp: new Date().toISOString(),
                },
            ],
        }

        setSession(updatedSession as Session)
        setNewMessage("")

        // In a real implementation, you would send the message to the backend
        // and update the session with the response
    }

    if (isAuthenticated === null || loading) {
        return (
            <div className="container mx-auto p-6">
                <div className="mb-6">
                    <Skeleton className="h-8 w-24 mb-4" />
                    <Skeleton className="h-12 w-3/4 mb-2" />
                </div>
                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-48" />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3, 4].map((i) => (
                                <Skeleton key={i} className="h-16 w-full" />
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (!session) {
        return (
            <div className="container mx-auto p-6">
                <Button variant="outline" onClick={() => router.back()} className="mb-6">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
                <div className="text-center py-12">
                    <h2 className="text-xl font-semibold mb-2">Chat session not found</h2>
                    <p className="text-gray-500 mb-6">
                        The chat session you're looking for doesn't exist or you don't have permission to view it.
                    </p>
                    <Button asChild>
                        <Link href={`/dashboard/messages/${params.campaignId}`}>View All Sessions</Link>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-6">
            <Button variant="outline" onClick={() => router.back()} className="mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
            </Button>

            <Card className="mb-6">
                <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="flex items-center">
                                <User className="h-5 w-5 mr-2" />
                                {consumer?.name || "Unknown Consumer"}
                            </CardTitle>
                            <p className="text-sm text-gray-500">{consumer?.email || "No email available"}</p>
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            Last activity: {new Date(session.lastActivity).toLocaleString()}
                        </div>
                    </div>
                </CardHeader>
            </Card>

            <Card className="flex flex-col h-[calc(200vh-600px)] ">
                <CardHeader className="pb-3">
                    <CardTitle>Conversation History</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 overflow-hidden flex flex-col">
                    <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4">
                        {session.conversationHistory.length === 0 ? (
                            <div className="text-center py-12 text-gray-500">No messages in this conversation yet</div>
                        ) : (
                            session.conversationHistory.map((message, index) => (
                                <ChatMessage key={index} message={message} consumerName={consumer?.name} />
                            ))
                        )}
                    </div>

                    {session.status === "active" && (
                        <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
                            <Input
                                placeholder="Type a message as the AI assistant..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                className="flex-1"
                            />
                            <Button type="submit" disabled={!newMessage.trim()}>
                                <Send className="h-4 w-4 mr-2" />
                                Send
                            </Button>
                        </form>
                    )}

                    {session.status === "closed" && (
                        <div className="bg-gray-100 text-gray-600 text-sm p-3 rounded-md text-center">
                            This conversation is closed and cannot be continued
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}