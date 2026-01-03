import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // TEMP: log instead of email
  console.log("New contact:", { name, email, message });

  return NextResponse.json({ success: true });
}
