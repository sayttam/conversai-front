import { NextResponse } from "next/server"

interface User {
    id: string
    email: string
    name: string
    role: string
    account: string
    clientsAssigned: string[]
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const clientId = url.pathname.split("/").pop();
    const response = await fetch("http://localhost:5000/api/campaigns/"+ clientId, {
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