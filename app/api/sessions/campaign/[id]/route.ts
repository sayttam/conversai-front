import { envs } from "@/app/config/envs"
import { NextResponse } from "next/server"

export const dynamic = 'error';

interface Message {
    role: string
    content: string
    _id: string
    timestamp: Date
}

interface Session {
    _id: string
    consumerId: string
    campaignId: string
    gptInstance: object
    lastActivity: Date
    status: string
    conversationHistory: Message[]

}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const campaignId = url.pathname.split("/").pop();
    const response = await fetch(envs.backendDevTunnel+"/api/sessions/campaign/"+ campaignId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": request.headers.get("Authorization") || "",
      },
      credentials: 'include'
    })  

    console.log("Response from Campaigns API:", response)

    const data = await response.json()

    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error("Campaigns API error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}