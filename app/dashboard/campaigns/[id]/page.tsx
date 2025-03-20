import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, BarChart3, Edit, LineChart, MoreHorizontal, PieChart, Share2, Users } from "lucide-react"
import Link from "next/link"

export default function CampaignDetailPage({ params }: { params: { id: string } }) {
  // This would normally fetch campaign data based on the ID
  const campaignId = params.id

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/campaigns">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Summer Sale 2025</h1>
            <p className="text-muted-foreground">Campaign ID: {campaignId}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Edit className="h-4 w-4" />
            Edit
          </Button>
          <Button variant="outline" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Impressions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24,853</div>
            <Progress value={65} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">65% of target</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clicks</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,652</div>
            <Progress value={78} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">78% of target</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14.3%</div>
            <Progress value={92} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">92% of target</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,543</div>
            <Progress value={45} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">45% of target</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="audience">Audience</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Details</CardTitle>
                  <CardDescription>Key information about this campaign</CardDescription>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-4">
                    <div className="flex justify-between">
                      <dt className="font-medium">Status</dt>
                      <dd>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          Active
                        </span>
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium">Type</dt>
                      <dd>Email Campaign</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium">Start Date</dt>
                      <dd>June 1, 2025</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium">End Date</dt>
                      <dd>August 31, 2025</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium">Target Audience</dt>
                      <dd>All Users</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium">Budget</dt>
                      <dd>$25,000</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium">Created By</dt>
                      <dd>John Doe</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Campaign Performance</CardTitle>
                  <CardDescription>Performance metrics over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px] w-full rounded-md border border-dashed flex items-center justify-center">
                    <div className="text-center">
                      <LineChart className="mx-auto h-12 w-12 text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">Performance chart visualization</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Detailed performance analysis for this campaign</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px] w-full rounded-md border border-dashed flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">Performance metrics visualization</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audience">
            <Card>
              <CardHeader>
                <CardTitle>Audience Insights</CardTitle>
                <CardDescription>Demographic and behavioral data for your audience</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px] w-full rounded-md border border-dashed flex items-center justify-center">
                  <div className="text-center">
                    <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">Audience insights visualization</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="budget">
            <Card>
              <CardHeader>
                <CardTitle>Budget Allocation</CardTitle>
                <CardDescription>Track your spending and budget allocation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px] w-full rounded-md border border-dashed flex items-center justify-center">
                  <div className="text-center">
                    <PieChart className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">Budget allocation visualization</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

