import { NextResponse } from "next/server";
import { buildAssistantSystemPrompt, fallbackAnswer } from "@/lib/assistant-knowledge";

type ChatBody = {
  message?: string;
  history?: { role: "user" | "assistant"; content: string }[];
};

const MAX_LEN = 2000;
const MAX_HISTORY = 12;

export async function POST(req: Request) {
  let body: ChatBody;
  try {
    body = (await req.json()) as ChatBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!message) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }
  if (message.length > MAX_LEN) {
    return NextResponse.json({ error: "Message too long" }, { status: 400 });
  }

  const history = Array.isArray(body.history)
    ? body.history
        .filter(
          (m): m is { role: "user" | "assistant"; content: string } =>
            (m.role === "user" || m.role === "assistant") &&
            typeof m.content === "string" &&
            m.content.length <= MAX_LEN,
        )
        .slice(-MAX_HISTORY)
    : [];

  const apiKey = process.env.OPENAI_API_KEY;
  if (apiKey) {
    try {
      const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
      const sys = buildAssistantSystemPrompt();
      const messages = [
        { role: "system" as const, content: sys },
        ...history.map((m) => ({ role: m.role, content: m.content })),
        { role: "user" as const, content: message },
      ];

      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          messages,
          max_tokens: 500,
          temperature: 0.65,
        }),
      });

      if (res.ok) {
        const data = (await res.json()) as {
          choices?: { message?: { content?: string } }[];
        };
        const reply = data.choices?.[0]?.message?.content?.trim();
        if (reply) {
          return NextResponse.json({ reply, source: "openai" as const });
        }
      }
    } catch {
      /* use fallback */
    }
  }

  const reply = fallbackAnswer(message);
  return NextResponse.json({ reply, source: "fallback" as const });
}
