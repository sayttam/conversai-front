import { envs } from "@/app/config/envs";
import { NextResponse } from "next/server"


export const dynamic = 'force-static';

export async function POST(request: Request) {
  try {
    const response = await fetch(envs.backendDevTunnel + "/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })

    if (response.ok) {
      return NextResponse.json({ status: response.status });
    }

  } catch (error) {
    console.error("Login API error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

