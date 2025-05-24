"use client"
import React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, Edit, MessageSquare, BarChart, Calendar, Users, CheckSquare } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface Campaign {
  _id: string
  name: string
  type: string
  instructions: string
  tasks: string[]
  createdAt: string
  campaignId: string
  startDate?: string
  endDate?: string
  clientId?: number
  status?: string
  performance?: number
  __v: number
}

export default function CampaignDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [campaign, setCampaign] = useState<Campaign | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  const resolvedParams = React.use(params)

  useEffect(() => {
    fetchCampaign()
  }, [])

  const fetchCampaign = async () => {
    try {
      const response = await fetch(`/api/campaigns/id/${resolvedParams.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("accessToken") || "",
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
      toast({
        title: "Error",
        description: "Failed to load campaign details",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-500"
      case "paused":
        return "bg-yellow-500"
      case "completed":
        return "bg-blue-500"
      case "draft":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <Skeleton className="h-8 w-24 mb-4" />
          <Skeleton className="h-12 w-3/4 mb-2" />
          <Skeleton className="h-6 w-1/2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    )
  }

  if (!campaign) {
    return (
      <div className="container mx-auto p-6">
        <Button variant="outline" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">Campaign not found</h2>
          <p className="text-gray-500 mb-6">
            The campaign you're looking for doesn't exist or you don't have permission to view it.
          </p>
          <Button asChild>
            <Link href="/dashboard/campaigns">View All Campaigns</Link>
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

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">{campaign.name}</h1>
          <p className="text-gray-500">Campaign ID: {campaign.campaignId}</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Badge className={getStatusColor(campaign.status)}>{campaign.status || "Draft"}</Badge>
          <Button variant="outline" asChild>
            <Link href={`/dashboard/campaigns/${campaign._id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Campaign
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <p className="text-sm font-medium">Start Date</p>
                <p className="text-sm text-gray-500">
                  {campaign.startDate ? new Date(campaign.startDate).toLocaleDateString() : "Not specified"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">End Date</p>
                <p className="text-sm text-gray-500">
                  {campaign.endDate ? new Date(campaign.endDate).toLocaleDateString() : "Not specified"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Created</p>
                <p className="text-sm text-gray-500">{new Date(campaign.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Campaign Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">{campaign.type || "No type specified"}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <BarChart className="mr-2 h-5 w-5" />
              Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <p className="text-sm font-medium">Performance Score</p>
                <p className="text-sm text-gray-500">
                  {campaign.performance !== undefined ? `${campaign.performance}%` : "Not available"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Client ID</p>
                <p className="text-sm text-gray-500">{campaign.clientId || "Not specified"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">{campaign.instructions || "No instructions provided"}</p>
        </CardContent>
      </Card>

      {campaign.tasks && campaign.tasks.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckSquare className="mr-2 h-5 w-5" />
              Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {campaign.tasks.map((task, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-100 text-gray-800 text-sm font-medium mr-3">
                    {index + 1}
                  </span>
                  <span className="text-gray-600">{task}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Button asChild className="w-full">
          <Link href={`/dashboard/chat/${campaign._id}`}>
            <MessageSquare className="mr-2 h-5 w-5" />
            Open Chat
          </Link>
        </Button>
        <Button asChild variant="outline" className="w-full">
          <Link href={`/dashboard/analytics?campaignId=${campaign._id}`}>
            <BarChart className="mr-2 h-5 w-5" />
            View Analytics
          </Link>
        </Button>
      </div>
    </div>
  )
}

