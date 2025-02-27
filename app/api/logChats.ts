import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

const LOGS_FILE = path.join(process.cwd(), "chatLogs.json");

// Function to log chat messages
export async function logChat(userMessage: string, botMessage: string) {
  const logEntry = { user: userMessage, bot: botMessage, timestamp: new Date().toISOString() };

  try {
    let logs = [];

    if (fs.existsSync(LOGS_FILE)) {
      const fileContent = fs.readFileSync(LOGS_FILE, "utf-8");
      logs = JSON.parse(fileContent);
    }

    logs.push(logEntry);
    fs.writeFileSync(LOGS_FILE, JSON.stringify(logs, null, 2));

    console.log("Chat logged successfully.");
  } catch (error) {
    console.error("Error logging chat:", error);
  }
}

// API route to log chats via HTTP request
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

// API route to fetch chat logs
export async function GET() {
  try {
    if (fs.existsSync(LOGS_FILE)) {
      const logs = fs.readFileSync(LOGS_FILE, "utf-8");
      return NextResponse.json({ chatLogs: JSON.parse(logs) });
    } else {
      return NextResponse.json({ chatLogs: [] });
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch logs" }, { status: 500 });
  }
}
