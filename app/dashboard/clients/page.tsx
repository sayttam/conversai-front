"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Edit, MoreHorizontal, Search, Trash2, UserPlus } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import Link from "next/link"

interface Client {
  id: string
  name: string
  contactInfo: {
    email: string
    phone: string
  }
  campaings: string[]
  apiKey: string
  status: string
  createdAt: Date
  value: number
  projects: number
  __v: number
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [sortBy, setSortBy] = useState("")
  const [campaignsNums, setCampaignsNums] = useState<number>(0)


  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(`/api/clients`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("accessToken") || "",
            "User": localStorage.getItem("user") || "",
          },
          credentials: "include",
        })
        
        if (!response.ok) {
          throw new Error("Failed to fetch clients")
        }
        
        const data = await response.json()
        
        // Mapear los datos del backend al formato del frontend
        const mappedClients = data.map((client: any) => ({
          id: client._id,
          name: client.name,
          contactInfo: client.contactInfo,
          campaings: Array.isArray(client.campaings) ? client.campaings : [],
          apiKey: client.apiKey,
          status: client.status || 'Active',
          createdAt: new Date(client.created_at),
          value: client.value || 0,
          projects: client.projects || 0,
          __v: client.__v || 0
        }))

        for (const client of mappedClients) {
          const campaignsNumber = client.campaings.length
          setCampaignsNums(campaignsNumber)
        }
        
        setClients(mappedClients)
        
        if (mappedClients.length === 0) {
          toast({
            title: "No Clients Found",
            description: "You currently have no clients. Add a new client to get started.",
          })
        }
      } catch (error) {
        console.error("Error fetching clients:", error)
        toast({
          title: "Error",
          description: "Failed to load clients",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }
    
    fetchClients()
  }, [])

  // Función para filtrar y ordenar clientes
  const getFilteredAndSortedClients = (statusFilter?: string) => {
    let filtered = clients

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(client => 
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.contactInfo.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filtrar por estado
    if (statusFilter) {
      filtered = filtered.filter(client => client.status === statusFilter)
    }

    // Ordenar
    if (sortBy) {
      filtered = [...filtered].sort((a, b) => {
        switch (sortBy) {
          case 'name':
            return a.name.localeCompare(b.name)
          case 'value':
            return b.value - a.value
          case 'projects':
            return b.projects - a.projects
          default:
            return 0
        }
      })
    }

    return filtered
  }

  const handleDeleteClient = async (clientId: string) => {
    try {
      const response = await fetch(`/api/clients/${clientId}`, {
        method: "DELETE",
        headers: {
          "Authorization": localStorage.getItem("accessToken") || "",
        },
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error("Failed to delete client")
      }

      setClients(clients.filter(client => client.id !== clientId))
      toast({
        title: "Success",
        description: "Client deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting client:", error)
      toast({
        title: "Error",
        description: "Failed to delete client",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading clients...</div>
        </div>
      </div>
    )
  }

  const ClientTable = ({ clients }: { clients: Client[] }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Company</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Value</TableHead>
          <TableHead>Campaigns</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients.map((client: Client) => (
          <TableRow key={client.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt={client.name} />
                  <AvatarFallback>{client.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{client.name}</p>
                  <p className="text-xs text-muted-foreground">{client.contactInfo.email}</p>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div>
                <p>Phone</p>
                <p className="text-xs text-muted-foreground">{client.contactInfo.phone || 'N/A'}</p>
              </div>
            </TableCell>
            <TableCell>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  client.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {client.status}
              </span>
            </TableCell>
            <TableCell>${client.value.toLocaleString()}</TableCell>
            <TableCell>{campaignsNums}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/dashboard/clients/${client.id}`}>
                    <Edit className="h-4 w-4" />
                  </Link>
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleDeleteClient(client.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Clients</h1>
          <p className="text-muted-foreground">Manage your client relationships.</p>
        </div>
        <Button className="flex items-center gap-1">
          <UserPlus className="h-4 w-4" />
          Add Client
        </Button>
      </div>

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search clients..." 
            className="pl-8" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select 
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:w-[150px]"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <select 
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:w-[150px]"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="name">Name</option>
            <option value="value">Value</option>
            <option value="projects">Projects</option>
          </select>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Clients ({clients.length})</TabsTrigger>
          <TabsTrigger value="active">Active ({clients.filter(c => c.status === 'Active').length})</TabsTrigger>
          <TabsTrigger value="inactive">Inactive ({clients.filter(c => c.status === 'Inactive').length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader className="px-6 py-4">
              <CardTitle>All Clients</CardTitle>
              <CardDescription>View and manage all your client relationships.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {getFilteredAndSortedClients().length === 0 ? (
                <div className="p-6 text-center text-muted-foreground">
                  No clients found matching your criteria.
                </div>
              ) : (
                <ClientTable clients={getFilteredAndSortedClients()} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Active Clients</CardTitle>
              <CardDescription>View and manage your active client relationships.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {getFilteredAndSortedClients('Active').length === 0 ? (
                <div className="p-6 text-center text-muted-foreground">
                  No active clients found.
                </div>
              ) : (
                <ClientTable clients={getFilteredAndSortedClients('Active')} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inactive">
          <Card>
            <CardHeader>
              <CardTitle>Inactive Clients</CardTitle>
              <CardDescription>View and manage your inactive client relationships.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {getFilteredAndSortedClients('Inactive').length === 0 ? (
                <div className="p-6 text-center text-muted-foreground">
                  No inactive clients found.
                </div>
              ) : (
                <ClientTable clients={getFilteredAndSortedClients('Inactive')} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}