import { NextResponse } from "next/server";

const users = [
  { id: 1, username: "admin", password: "123456" },
  { id: 2, username: "muthu", password: "pass123" },
  { id: 3, username: "john", password: "doe123" },
];

export async function POST(req: Request) {
  const { username, password } = await req.json();
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    return NextResponse.json({
      message: "Login Successful",
      user: { id: user.id, username: user.username },
    });
  }
  return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
}
