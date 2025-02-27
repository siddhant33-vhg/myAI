import { NextRequest, NextResponse } from "next/server";

// In-memory storage (Replace with a database later)
const chatLogs: { user: string; bot: string }[] = [];

export async function POST(req: NextRequest) {
  try {
    const { userMessage, botResponse } = await req.json();

    if (!userMessage || !botResponse) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    // Store the chat (Replace with a DB later)
    chatLogs.push({ user: userMessage, bot: botResponse });

    return NextResponse.json({ message: "Logged successfully", chatLogs });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ chatLogs });
}
