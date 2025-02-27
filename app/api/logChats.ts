import { NextRequest, NextResponse } from "next/server";

// In-memory chat logs (Temporary storage, resets on redeploy)
const chatLogs: { user: string; bot: string; timestamp: string }[] = [];

/**
 * Function to log chat messages
 */
export async function logChat(userMessage: string, botMessage: string) {
  const logEntry = {
    user: userMessage,
    bot: botMessage,
    timestamp: new Date().toISOString(),
  };

  chatLogs.push(logEntry);
  console.log("Chat logged successfully.");
}

/**
 * API route to log chats via HTTP request
 */
export async function POST(req: NextRequest) {
  try {
    const { userMessage, botResponse } = await req.json();

    if (!userMessage || !botResponse) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    await logChat(userMessage, botResponse);

    return NextResponse.json({ message: "Logged successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * API route to fetch chat logs
 */
export async function GET() {
  try {
    return NextResponse.json({ chatLogs });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch logs" }, { status: 500 });
  }
}
