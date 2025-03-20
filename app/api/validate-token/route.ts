import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await fetch("http://localhost:5000/api/validate-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return NextResponse.json(response, { status: response.status });
  } catch (error) {
    console.error("Login API error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

