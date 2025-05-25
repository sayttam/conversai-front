import { envs } from "@/app/config/envs";
import { NextResponse } from "next/server";

export const dynamic = 'force-static';

export async function POST(request: Request) {
  try {
    // 🔥 Enviar cookies al backend
    const response = await fetch(envs.backendDevTunnel+"/api/validate-token", {
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
