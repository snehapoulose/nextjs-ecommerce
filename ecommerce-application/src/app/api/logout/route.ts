import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { message: "Logged out successfully" },
    {
      status: 200,
      headers: {
        "Set-Cookie": `loggedIn=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax`,
      },
    }
  );
}
