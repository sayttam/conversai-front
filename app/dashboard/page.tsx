"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Users, MessageSquare, TrendingUp, TrendingDown, DollarSign } from "lucide-react"
import { useRouter } from "next/navigation";
import { isUserValidated } from "@/lib/validate-login"
import { useEffect, useState } from "react"



export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkValidation() {
      const isValidated = await isUserValidated();
      console.log("Valid: " + isValidated);
      if (!isValidated) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    }
    checkValidation();
  }, [router]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="space-y-6" >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">{/* Actions could go here */}</div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Conversations</p>
                <p className="text-3xl font-bold">2,857</p>
              </div>
              <div className="rounded-full p-2 bg-primary/10">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
              <span className="text-green-500 font-medium">+12%</span>
              <span className="ml-1">from last week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Clients</p>
                <p className="text-3xl font-bold">24</p>
              </div>
              <div className="rounded-full p-2 bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
              <span className="text-green-500 font-medium">+2</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Campaigns</p>
                <p className="text-3xl font-bold">18</p>
              </div>
              <div className="rounded-full p-2 bg-primary/10">
                <Activity className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <TrendingDown className="mr-1 h-4 w-4 text-red-500" />
              <span className="text-red-500 font-medium">-1</span>
              <span className="ml-1">from last week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                <p className="text-3xl font-bold">$48.9k</p>
              </div>
              <div className="rounded-full p-2 bg-primary/10">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
              <span className="text-green-500 font-medium">+8.2%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity and Performance */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest client interactions and system events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Activity className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">New campaign created</p>
                    <p className="text-sm text-muted-foreground">Client: Acme Inc. • Campaign: Summer Promo</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(Date.now() - i * 3600000).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Campaign Performance</CardTitle>
            <CardDescription>Top performing active campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Spring Promotion", client: "Globex Corp", score: 98 },
                { name: "Product Launch", client: "Stark Industries", score: 92 },
                { name: "Holiday Special", client: "Wayne Enterprises", score: 87 },
                { name: "Customer Survey", client: "Acme Inc", score: 85 },
                { name: "Feedback Collection", client: "Umbrella Corp", score: 80 },
              ].map((campaign, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">{campaign.name}</p>
                    <p className="text-sm text-muted-foreground">{campaign.client}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2 w-20 rounded-full ${
                        campaign.score > 90 ? "bg-green-500" : campaign.score > 80 ? "bg-yellow-500" : "bg-red-500"
                      }`}
                    >
                      <div className="h-full rounded-full bg-muted" style={{ width: `${100 - campaign.score}%` }} />
                    </div>
                    <span className="text-sm font-medium">{campaign.score}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    
  )
}

