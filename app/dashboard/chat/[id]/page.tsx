import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Paperclip, SendHorizontal } from "lucide-react"
import Link from "next/link"

export default function ChatDetailPage({ params }: { params: { id: string } }) {
  // This would normally fetch chat data based on the ID
  const chatId = params.id

  return (
    <div className="container mx-auto py-6 h-[calc(100vh-120px)] flex flex-col">
      <div className="mb-4 flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/chat">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Chat with Marketing Team</h1>
          <p className="text-muted-foreground">Chat ID: {chatId}</p>
        </div>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden">
        <CardHeader className="border-b p-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Marketing Team" />
              <AvatarFallback>MT</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Marketing Team</p>
              <p className="text-xs text-muted-foreground">5 members • Active now</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-auto p-4 space-y-4">
          <div className="flex items-start gap-3">
            <Avatar className="mt-1">
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Jane Smith" />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <div className="rounded-lg bg-muted p-3">
              <p className="text-sm font-medium mb-1">Jane Smith</p>
              <p className="text-sm">
                Hey team, I've just uploaded the new campaign assets to the shared folder. Can everyone take a look and
                provide feedback by EOD?
              </p>
              <p className="text-xs text-muted-foreground mt-1">10:32 AM</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Avatar className="mt-1">
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Mike Johnson" />
              <AvatarFallback>MJ</AvatarFallback>
            </Avatar>
            <div className="rounded-lg bg-muted p-3">
              <p className="text-sm font-medium mb-1">Mike Johnson</p>
              <p className="text-sm">
                I'll take a look right away. Are we still targeting the same audience as discussed in yesterday's
                meeting?
              </p>
              <p className="text-xs text-muted-foreground mt-1">10:45 AM</p>
            </div>
          </div>

          <div className="flex items-start gap-3 justify-end">
            <div className="rounded-lg bg-primary p-3 text-primary-foreground">
              <p className="text-sm">
                Yes, we're focusing on the 25-34 demographic with interests in technology and sustainability. I've
                included the audience breakdown in the brief.
              </p>
              <p className="text-xs text-primary-foreground/80 mt-1 text-right">11:03 AM</p>
            </div>
            <Avatar className="mt-1">
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="You" />
              <AvatarFallback>You</AvatarFallback>
            </Avatar>
          </div>

          <div className="flex items-start gap-3">
            <Avatar className="mt-1">
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Sarah Lee" />
              <AvatarFallback>SL</AvatarFallback>
            </Avatar>
            <div className="rounded-lg bg-muted p-3">
              <p className="text-sm font-medium mb-1">Sarah Lee</p>
              <p className="text-sm">
                The visuals look great! I think we should adjust the CTA color to make it more prominent. What do you
                all think?
              </p>
              <p className="text-xs text-muted-foreground mt-1">11:15 AM</p>
            </div>
          </div>

          <div className="flex items-start gap-3 justify-end">
            <div className="rounded-lg bg-primary p-3 text-primary-foreground">
              <p className="text-sm">
                Good point, Sarah. I'll create a version with a more vibrant CTA and share it with everyone for
                comparison.
              </p>
              <p className="text-xs text-primary-foreground/80 mt-1 text-right">11:22 AM</p>
            </div>
            <Avatar className="mt-1">
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="You" />
              <AvatarFallback>You</AvatarFallback>
            </Avatar>
          </div>
        </CardContent>
        <div className="border-t p-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Input placeholder="Type your message..." className="flex-1" />
            <Button size="icon">
              <SendHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

