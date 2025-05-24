"use client"

import { useState, useEffect, use } from "react"
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
  _id: string
  id: string
  name: string
  client: string
  startDate: string
  endDate: string
  status: "active" | "scheduled" | "ended" | "archived"
  performance: number
  type: string
  instructions: string
  tasks: string[]
  created_at: string
  campaignId: string
  campaignName: string
  clientId: string
}

interface User {
    _id: string
    email: string
    name: string
    role: string
    account: string
    clientsAssigned: string[]
}


export default function CampaignsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState("all")
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const getCampaigns = async () => {
      try {
        const storageUser = JSON.parse(localStorage.getItem('user') || 'null');
        const token = localStorage.getItem('accessToken');
  
        const responseUser = await fetch('/api/user/email/' + storageUser.email, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token || '',
          },
          credentials: 'include'  
        });
  
        const dataUser = await responseUser.json();
  
        if (!responseUser.ok) {
          console.error('Failed to fetch user:', dataUser);
          return;
        }
        
        setUser(dataUser.user);
  
        const campaignPromises = (dataUser.user.clientsAssigned as string[]).map(client => 
          fetch('/api/campaigns/' + client, {
            method: 'GET',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token || '',
            },
            credentials: 'include'  
          }).then(res => res.json())
        );
  
        const campaignsResponses = await Promise.all(campaignPromises);
  
        const campaignsData = campaignsResponses
          .filter(response => response && response.campaigns)
          .flatMap(response => response.campaigns);
  
        setCampaigns(campaignsData);
  
      } catch (err) {
        console.error('Error fetching campaigns:', err);
      }
    };
  
    getCampaigns();
  }, []);
  

  const filteredCampaigns = campaigns.filter((campaign) => {
    if (filter !== "all" && campaign.status !== filter) return false

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
                    <TableRow key={campaign._id}>
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
                                className={`h-full rounded-full ${campaign.performance > 90
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
                            <DropdownMenuItem onClick={() => router.push("/dashboard/campaigns/" + campaign._id)} >
                              <Eye className="mr-2 h-4 w-4"/> View
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

