import type { Message } from "@/types/session"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface ChatMessageProps {
  message: Message
  consumerName?: string
}

export function ChatMessage({ message, consumerName }: ChatMessageProps) {
  const isUser = message.role === "user"
  const isSystem = message.role === "system"

  if (isSystem) {
    return (
      <div className="flex items-center justify-center my-4">
        <div className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">{message.content}</div>
      </div>
    )
  }

  return (
    <div className={cn("flex items-start gap-3 mb-4", isUser ? "flex-row-reverse" : "")}>
      <Avatar className={cn("h-8 w-8", isUser ? "bg-green-500" : "bg-primary")}>
        <AvatarFallback>{isUser ? consumerName?.charAt(0) || "U" : "AI"}</AvatarFallback>
      </Avatar>
      <div
        className={cn(
          "rounded-lg px-4 py-2 max-w-[80%]",
          isUser ? "bg-green-500 text-white rounded-tr-none" : "bg-gray-100 text-gray-800 rounded-tl-none",
        )}
      >
        <p className="text-sm">{message.content}</p>
        <div className={cn("text-xs mt-1", isUser ? "text-green-100" : "text-gray-500")}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>
    </div>
  )
}

