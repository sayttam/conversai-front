import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const campaignId = url.pathname.split("/").pop();
    const response = await fetch("http://localhost:5000/api/campaigns/id/"+ campaignId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": request.headers.get("Authorization") || "",
      },
      credentials: 'include'
    })  

    const data = await response.json()

    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error("Campaigns API error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}