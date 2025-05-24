import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    // 🔥 Enviar cookies al backend
    const response = await fetch("http://localhost:5000/api/validate-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // 🔥 IMPORTANTE: Envía cookies en la solicitud
    });

    return NextResponse.json({ status: response.status });
  } catch (error) {
    console.error("Token validation error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
