"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, MoreHorizontal, Edit, Archive, Eye, Trash2, Filter, ArrowUpDown, Calendar } from "lucide-react"

interface Campaign {
  id: string
  name: string
  client: string
  startDate: string
  endDate: string
  status: "active" | "scheduled" | "ended" | "archived"
  performance: number
}

export default async function CampaignsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState("all")

  try {
    // Hacer la llamada real a la API de login
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch('/api/login', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      }
    });

    const data = await response.json();
    const campaigns: Campaign[] = data.campaigns;

    if (!response.ok) {
      return campaigns;
    }

    // En caso de éxito, guardar los tokens
    localStorage.setItem('accessToken', data.token);
    localStorage.setItem('refreshToken', data.refreshToken);
    
    // Redireccionar al dashboard
    router.push("/dashboard");
    
  } catch (err) {
    console.error(err);
  }

  // Sample campaign data
  const campaigns: Campaign[] = [
    {
      id: "1",
      name: "Summer Sale 2025",
      client: "Acme Inc",
      startDate: "2025-06-01",
      endDate: "2025-08-31",
      status: "active",
      performance: 92,
    },
    {
      id: "2",
      name: "Product Launch - Model X",
      client: "TechCorp",
      startDate: "2025-07-15",
      endDate: "2025-09-15",
      status: "scheduled",
      performance: 0,
    },
    {
      id: "3",
      name: "Spring Collection",
      client: "Fashion World",
      startDate: "2025-03-01",
      endDate: "2025-05-31",
      status: "ended",
      performance: 88,
    },
    {
      id: "4",
      name: "Holiday Special",
      client: "Global Retail",
      startDate: "2024-11-15",
      endDate: "2025-01-15",
      status: "active",
      performance: 95,
    },
    {
      id: "5",
      name: "Customer Feedback Survey",
      client: "Service Pro",
      startDate: "2025-05-01",
      endDate: "2025-06-30",
      status: "scheduled",
      performance: 0,
    },
  ]

  const filteredCampaigns = campaigns.filter((campaign) => {
    // Filter by status
    if (filter !== "all" && campaign.status !== filter) return false

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return campaign.name.toLowerCase().includes(query) || campaign.client.toLowerCase().includes(query)
    }

    return true
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "scheduled":
        return "bg-blue-500"
      case "ended":
        return "bg-gray-500"
      case "archived":
        return "bg-amber-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campaigns</h1>
          <p className="text-muted-foreground">Manage and monitor your AI chatbot campaigns</p>
        </div>
        <Button onClick={() => router.push("/dashboard/campaigns/create")} className="sm:w-auto w-full joiaButton">
          <Plus className="mr-2 h-4 w-4" /> New Campaign
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>All Campaigns</CardTitle>
          <CardDescription>View and manage all your client campaigns in one place</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" onValueChange={setFilter} className="mb-4">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              <TabsTrigger value="ended">Ended</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between mb-4">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search campaigns..."
                className="w-full sm:w-[300px] pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                <Calendar className="mr-2 h-4 w-4" />
                Date Range
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">
                    <div className="flex items-center">
                      Campaign Name
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date Range</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCampaigns.length > 0 ? (
                  filteredCampaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell className="font-medium">{campaign.name}</TableCell>
                      <TableCell>{campaign.client}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={`${getStatusColor(campaign.status)} text-white`}>
                          {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(campaign.startDate).toLocaleDateString()} -{" "}
                        {new Date(campaign.endDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {campaign.performance > 0 ? (
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-16 rounded-full bg-gray-200">
                              <div
                                className={`h-full rounded-full ${
                                  campaign.performance > 90
                                    ? "bg-green-500"
                                    : campaign.performance > 75
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                                }`}
                                style={{ width: `${campaign.performance}%` }}
                              />
                            </div>
                            <span>{campaign.performance}%</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">Not started</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" /> View
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Archive className="mr-2 h-4 w-4" /> Archive
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No campaigns found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

