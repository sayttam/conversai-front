import { NextResponse } from "next/server"
import { envs } from "@/app/config/envs";

export const dynamic = 'force-static';

export function encodeBase64(str: string): string {
  return Buffer.from(str).toString('base64');
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { account, name, email, password } = body
    const accessToken = "JOIA-ostpHLDrZfPPbZ2G4abYPG0JX0Tamv8c2f38Zh1ywi8XZHxUdGh2V5JOsHxd1B6uBpd1CR51wPBtPHqM42ci1AlJM4DQjVkTpt08Xgow7VKWvCYq";
    const encodedAccessToken = encodeBase64(accessToken);

    if (!name || !email || !password || !account) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    } 
    
    const getUserByEmail = await fetch(`${envs.backendDevTunnel}/api/user/check?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      }
    });

    const data = await getUserByEmail.json();
    
    if (data.exists) {
      return NextResponse.json({ error: "User already exists" }, {
        status: 400,
      })
    }

    const createUser = await fetch(envs.backendDevTunnel+"/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ name: name, email: email, password: password, account: account })
    });
    console.log({ name: name, email: email, password: password, account: account })

    if (!createUser.ok) {
      return NextResponse.json({ error: "Failed to create user" }, {
        status: 401,
      })
    } else {
      return NextResponse.json({ success: true, message: "User registered successfully" }, {
        status: 201,
      });
    }
    // 2. Hash the password
    // 3. Store user in database
    // 4. Create a session or token
   
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

