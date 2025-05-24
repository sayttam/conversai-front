import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const response = await fetch("http://localhost:5000/api/logout", {
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

