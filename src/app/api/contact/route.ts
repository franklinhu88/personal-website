import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { name, email, message } = body as {
    name: string;
    email: string;
    message: string;
  };

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  console.log("New contact message:", {
    name,
    email,
    message,
  });

  return NextResponse.json({ success: true });
}
