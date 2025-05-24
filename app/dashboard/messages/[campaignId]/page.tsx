"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, MessageSquare, Clock, User, Search } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import type { Session, Consumer } from "@/types/session"

export default function CampaignMessagesPage({ params }: { params: { campaignId: string } }) {
    const router = useRouter()
    const [sessions, setSessions] = useState<Session[]>([])
    const [consumers, setConsumers] = useState<Record<string, Consumer>>({})
    const [loading, setLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [campaign, setCampaign] = useState<{ _id: string; name: string } | null>(null)

    useEffect(() => {
        fetchCampaign()
        fetchSessions()
        setIsAuthenticated(true)
    }, [])

    const url = new URL(window.location.href)
    const campaignId = url.pathname.split("/").pop()

    const checkAuth = async () => {
        try {
            const response = await fetch("/api/auth/check")
            if (response.ok) {
                setIsAuthenticated(true)
                fetchCampaign()
                fetchSessions()
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

    const fetchCampaign = async () => {
        try {
            const response = await fetch(`/api/campaigns/id/${campaignId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("accessToken") || "",
                },
                credentials: "include",
            })

            if (!response.ok) {
                throw new Error("Failed to fetch campaign")
            }
            const data = await response.json()
            setCampaign(data)
        } catch (error) {
            console.error("Error fetching campaign:", error)
        }
    }

    const fetchSessions = async () => {
        try {
            const response = await fetch(`/api/sessions/campaign/${campaignId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("accessToken") || "",
                },
                credentials: "include",
            })
            if (!response.ok) {
                throw new Error("Failed to fetch sessions")
            }
            const data = await response.json()
            setSessions(data)

            // Fetch consumer details for each session
            const consumerIds = [...new Set(data.map((session: Session) => session.consumerId))]
            await fetchConsumers(consumerIds as string[])
        } catch (error) {
            console.error("Error fetching sessions:", error)
            toast({
                title: "Error",
                description: "Failed to load chat sessions",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    const fetchConsumers = async (consumerIds: string[]) => {
        try {
            const consumersData: Record<string, Consumer> = {}

            await Promise.all(
                consumerIds.map(async (id) => {
                    const response = await fetch(`/api/consumers/${id}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: localStorage.getItem("accessToken") || "",
                        },
                        credentials: "include",
                    })
                    if (response.ok) {
                        const consumer = await response.json()
                        consumersData[id] = consumer
                    }
                }),
            )

            setConsumers(consumersData)
        } catch (error) {
            console.error("Error fetching consumers:", error)
        }
    }

    const filteredSessions = sessions.filter((session) => {
        const consumer = consumers[session.consumerId]
        const consumerName = consumer?.name || ""
        const consumerEmail = consumer?.email || ""

        return (
            consumerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            consumerEmail.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })

    if (isAuthenticated === null || loading) {
        return (
            <div className="container mx-auto p-6">
                <div className="mb-6">
                    <Skeleton className="h-8 w-24 mb-4" />
                    <Skeleton className="h-12 w-3/4 mb-2" />
                    <Skeleton className="h-6 w-1/2" />
                </div>
                <div className="grid grid-cols-1 gap-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <Skeleton key={i} className="h-24 w-full" />
                    ))}
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

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Chat Sessions</h1>
                    {campaign && <p className="text-gray-500">Campaign: {campaign.name}</p>}
                </div>
            </div>

            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                        placeholder="Search by consumer name or email..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {filteredSessions.length === 0 ? (
                <div className="text-center py-12">
                    <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h2 className="text-xl font-semibold mb-2">No chat sessions found</h2>
                    <p className="text-gray-500 mb-6">
                        {searchTerm ? "No sessions match your search criteria" : "This campaign doesn't have any chat sessions yet"}
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredSessions.map((session) => {
                        const consumer = consumers[session.consumerId]
                        const lastMessage =
                            session.conversationHistory.length > 0
                                ? session.conversationHistory[session.conversationHistory.length - 1]
                                : null

                        return (
                            <Card key={session._id} className="hover:shadow-md transition-shadow">
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center">
                                            <User className="h-5 w-5 mr-2 text-gray-500" />
                                            <CardTitle className="text-lg">{consumer?.name || "Unknown Consumer"}</CardTitle>
                                        </div>
                                        <Badge className={session.status === "active" ? "bg-green-500" : "bg-gray-500"}>
                                            {session.status}
                                        </Badge>
                                    </div>
                                    <div className="text-sm text-gray-500">{consumer?.email || "No email available"}</div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="flex items-center text-sm text-gray-500 mb-2">
                                                <Clock className="h-4 w-4 mr-1" />
                                                Last activity: {new Date(session.lastActivity).toLocaleString()}
                                            </div>
                                            <div className="text-sm text-gray-600 line-clamp-1">
                                                {lastMessage ? (
                                                    <>
                                                        <span className="font-medium">
                                                            {lastMessage.role === "user" ? consumer?.name || "User" : "AI"}:
                                                        </span>{" "}
                                                        {lastMessage.content}
                                                    </>
                                                ) : (
                                                    "No messages yet"
                                                )}
                                            </div>
                                        </div>
                                        <Button asChild>
                                            <Link href={`/dashboard/messages/${campaignId}/${session._id}`}>
                                                <MessageSquare className="mr-2 h-4 w-4" />
                                                View Chat
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

