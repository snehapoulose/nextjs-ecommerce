import { NextResponse } from "next/server";
import users from "@/app/data/users.json";

export async function POST(req: Request) {
  const { username, password } = await req.json();
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    return NextResponse.json(
      {
        message: "Login Successful",
        user: { id: user.id, username: user.username, role: user.role },
      },
      {
        status: 200,
        headers: {
          "Set-Cookie": `loggedIn=true; Path=/; HttpOnly; SameSite=Lax`,
        },
      }
    );
  }
  return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
}
