import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // 🔥 Permite enviar y recibir cookies
      body: JSON.stringify(body),
    })

    const data = await response.json()

    // 🔥 Extraer cookies del backend y reenviarlas al frontend
    const responseHeaders = new Headers(response.headers)
    const cookies = responseHeaders.get("set-cookie")

    const nextResponse = NextResponse.json(data, { status: response.status })

    if (cookies) {
      nextResponse.headers.set("set-cookie", cookies) // 🔥 Pasar cookies al cliente
    }

    return nextResponse
    

  } catch (error) {
    console.error("Login API error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

