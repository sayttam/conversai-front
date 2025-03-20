import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Download, Eye, Filter, Search } from "lucide-react"
import Link from "next/link"

export default function ChatLogsPage() {
  // Mock chat log data
  const chatLogs = [
    {
      id: "log_1",
      user: "John Smith",
      userEmail: "john@acmecorp.com",
      date: "2025-03-15",
      time: "10:32 AM",
      duration: "15m 42s",
      messages: 24,
      topic: "Campaign Strategy",
      sentiment: "Positive",
    },
    {
      id: "log_2",
      user: "Jane Doe",
      userEmail: "jane@globex.com",
      date: "2025-03-14",
      time: "2:15 PM",
      duration: "32m 18s",
      messages: 47,
      topic: "Product Feedback",
      sentiment: "Neutral",
    },
    {
      id: "log_3",
      user: "Michael Johnson",
      userEmail: "michael@initech.com",
      date: "2025-03-14",
      time: "11:05 AM",
      duration: "8m 03s",
      messages: 12,
      topic: "Technical Support",
      sentiment: "Negative",
    },
    {
      id: "log_4",
      user: "Sarah Williams",
      userEmail: "sarah@umbrella.com",
      date: "2025-03-13",
      time: "4:47 PM",
      duration: "21m 55s",
      messages: 32,
      topic: "Subscription Renewal",
      sentiment: "Positive",
    },
    {
      id: "log_5",
      user: "Tony Stark",
      userEmail: "tony@stark.com",
      date: "2025-03-12",
      time: "9:30 AM",
      duration: "45m 12s",
      messages: 68,
      topic: "Partnership Discussion",
      sentiment: "Positive",
    },
  ]

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Chat Logs</h1>
        <p className="text-muted-foreground">View and analyze your customer chat history.</p>
      </div>

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search chat logs..." className="pl-8" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Date Range</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Logs</TabsTrigger>
          <TabsTrigger value="positive">Positive</TabsTrigger>
          <TabsTrigger value="neutral">Neutral</TabsTrigger>
          <TabsTrigger value="negative">Negative</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader className="px-6 py-4">
              <CardTitle>All Chat Logs</CardTitle>
              <CardDescription>View and analyze all customer chat interactions.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Messages</TableHead>
                    <TableHead>Topic</TableHead>
                    <TableHead>Sentiment</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {chatLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={log.user} />
                            <AvatarFallback>{log.user.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{log.user}</p>
                            <p className="text-xs text-muted-foreground">{log.userEmail}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p>{log.date}</p>
                          <p className="text-xs text-muted-foreground">{log.time}</p>
                        </div>
                      </TableCell>
                      <TableCell>{log.duration}</TableCell>
                      <TableCell>{log.messages}</TableCell>
                      <TableCell>{log.topic}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            log.sentiment === "Positive"
                              ? "bg-green-100 text-green-800"
                              : log.sentiment === "Neutral"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {log.sentiment}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/dashboard/chat-logs/${log.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="positive">
          <Card>
            <CardHeader>
              <CardTitle>Positive Sentiment Chats</CardTitle>
              <CardDescription>View chat logs with positive customer sentiment.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Messages</TableHead>
                    <TableHead>Topic</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {chatLogs
                    .filter((log) => log.sentiment === "Positive")
                    .map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={log.user} />
                              <AvatarFallback>{log.user.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{log.user}</p>
                              <p className="text-xs text-muted-foreground">{log.userEmail}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p>{log.date}</p>
                            <p className="text-xs text-muted-foreground">{log.time}</p>
                          </div>
                        </TableCell>
                        <TableCell>{log.duration}</TableCell>
                        <TableCell>{log.messages}</TableCell>
                        <TableCell>{log.topic}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" asChild>
                              <Link href={`/dashboard/chat-logs/${log.id}`}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="neutral">
          <Card>
            <CardHeader>
              <CardTitle>Neutral Sentiment Chats</CardTitle>
              <CardDescription>View chat logs with neutral customer sentiment.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Messages</TableHead>
                    <TableHead>Topic</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {chatLogs
                    .filter((log) => log.sentiment === "Neutral")
                    .map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={log.user} />
                              <AvatarFallback>{log.user.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{log.user}</p>
                              <p className="text-xs text-muted-foreground">{log.userEmail}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p>{log.date}</p>
                            <p className="text-xs text-muted-foreground">{log.time}</p>
                          </div>
                        </TableCell>
                        <TableCell>{log.duration}</TableCell>
                        <TableCell>{log.messages}</TableCell>
                        <TableCell>{log.topic}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" asChild>
                              <Link href={`/dashboard/chat-logs/${log.id}`}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="negative">
          <Card>
            <CardHeader>
              <CardTitle>Negative Sentiment Chats</CardTitle>
              <CardDescription>View chat logs with negative customer sentiment.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Messages</TableHead>
                    <TableHead>Topic</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {chatLogs
                    .filter((log) => log.sentiment === "Negative")
                    .map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={log.user} />
                              <AvatarFallback>{log.user.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{log.user}</p>
                              <p className="text-xs text-muted-foreground">{log.userEmail}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p>{log.date}</p>
                            <p className="text-xs text-muted-foreground">{log.time}</p>
                          </div>
                        </TableCell>
                        <TableCell>{log.duration}</TableCell>
                        <TableCell>{log.messages}</TableCell>
                        <TableCell>{log.topic}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" asChild>
                              <Link href={`/dashboard/chat-logs/${log.id}`}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

