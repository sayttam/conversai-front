import { envs } from "@/app/config/envs";
import { NextResponse } from "next/server"

export const dynamic = 'force-static';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
    const response = await fetch(`${envs.backendDevTunnel}/api/clients`, {
      headers: {
        Authorization: `${request.headers.get("Authorization") || ""}`,
        "Content-Type": "application/json",
        "User": `${request.headers.get("User") || ""}`,
    },
    })

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch consumer" }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching consumer:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
