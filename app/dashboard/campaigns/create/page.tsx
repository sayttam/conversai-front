import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, ImageIcon, UploadIcon } from "lucide-react"

export default function CreateCampaignPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Create Campaign</h1>
        <p className="text-muted-foreground">Set up a new marketing campaign.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Campaign Details</CardTitle>
          <CardDescription>Fill in the details for your new campaign.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="campaign-name">Campaign Name</Label>
            <Input id="campaign-name" placeholder="Summer Sale 2025" />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date</Label>
              <div className="flex">
                <Input id="start-date" type="date" />
                <Button variant="outline" size="icon" className="ml-2">
                  <CalendarIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date">End Date</Label>
              <div className="flex">
                <Input id="end-date" type="date" />
                <Button variant="outline" size="icon" className="ml-2">
                  <CalendarIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="campaign-type">Campaign Type</Label>
            <Select>
              <SelectTrigger id="campaign-type">
                <SelectValue placeholder="Select campaign type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email Campaign</SelectItem>
                <SelectItem value="social">Social Media</SelectItem>
                <SelectItem value="display">Display Ads</SelectItem>
                <SelectItem value="search">Search Ads</SelectItem>
                <SelectItem value="content">Content Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="target-audience">Target Audience</Label>
            <Select>
              <SelectTrigger id="target-audience">
                <SelectValue placeholder="Select target audience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="new">New Users</SelectItem>
                <SelectItem value="returning">Returning Users</SelectItem>
                <SelectItem value="inactive">Inactive Users</SelectItem>
                <SelectItem value="custom">Custom Segment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget">Budget</Label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground">
                $
              </span>
              <Input id="budget" type="number" className="rounded-l-none" placeholder="1000" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Campaign Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your campaign objectives and strategy..."
              className="min-h-[120px]"
            />
          </div>

          <div className="space-y-2">
            <Label>Campaign Assets</Label>
            <div className="border rounded-md p-4">
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadIcon className="w-8 h-8 mb-3 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">Images, videos, or documents (max 10MB)</p>
                  </div>
                  <input id="file-upload" type="file" className="hidden" multiple />
                </label>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <div className="flex items-center gap-2 p-2 border rounded-md bg-muted/30">
                  <ImageIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">banner-image.jpg</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <span className="sr-only">Remove</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Save as Draft</Button>
          <Button>Create Campaign</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

