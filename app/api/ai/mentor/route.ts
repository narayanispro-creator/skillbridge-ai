import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Gap = {
  name?: string;
  have?: number;
  need?: number;
  gap?: number;
  weight?: number;
};

type OpenAIError = {
  error?: {
    message?: string;
    type?: string;
    code?: string | null;
  };
};

function fallback(role: string, gaps: Gap[], readiness: number, question: string) {
  const top = (gaps || []).slice(0, 3);
  const lead = top[0];

  if (question.trim()) {
    return `For ${role}, your current readiness is ${readiness}%. ${
      lead ? `${lead.name} is the highest-impact gap (${lead.have}% → ${lead.need}%). ` : ""
    }Use your next project to prove that exact capability, publish the work, attach evidence to your Skill Passport, then reassess. Your match score itself stays deterministic.`;
  }

  return `Your readiness for ${role} is ${readiness}%. ${
    lead ? `Prioritize ${lead.name} first: move from ${lead.have}% toward ${lead.need}% with one deployable proof-of-work project. ` : ""
  }Then attach evidence and reassess. SkillBridge AI explains the path; it never changes the numeric score.`;
}

function outputText(payload: any): string {
  if (typeof payload?.output_text === "string" && payload.output_text.trim()) {
    return payload.output_text.trim();
  }

  const chunks: string[] = [];
  for (const item of Array.isArray(payload?.output) ? payload.output : []) {
    for (const content of Array.isArray(item?.content) ? item.content : []) {
      if ((content?.type === "output_text" || content?.type === "text") && typeof content?.text === "string") {
        chunks.push(content.text);
      }
    }
  }
  return chunks.join("\n").trim();
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const role = String(body.role || "your target role").slice(0, 120);
    const readiness = Math.max(0, Math.min(100, Number(body.readiness || 0)));
    const gaps = Array.isArray(body.gaps) ? body.gaps.slice(0, 6) : [];
    const question = String(body.question || "").slice(0, 700);
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.warn("[SkillBridge AI] OPENAI_API_KEY is missing; using deterministic fallback.");
      return NextResponse.json({
        text: fallback(role, gaps, readiness, question),
        mode: "deterministic-fallback",
        diagnostic: "missing_api_key",
      });
    }

    const model = process.env.OPENAI_MODEL || "gpt-5.6-luna";
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        input: [
          {
            role: "system",
            content:
              "You are SkillBridge Mentor, an evidence-first career copilot. Be concise, specific and practical. Ground every recommendation in the provided role, deterministic readiness and weighted gaps. Never invent, alter or recalculate numeric scores. Never use hype. Prefer one concrete project/action over generic course lists. Maximum 5 short sentences unless the user explicitly asks for a plan.",
          },
          {
            role: "user",
            content: JSON.stringify({ role, readiness, gaps, question }),
          },
        ],
        max_output_tokens: 420,
      }),
      cache: "no-store",
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      const err = payload as OpenAIError;
      const diagnostic = {
        status: response.status,
        type: err?.error?.type || "unknown",
        code: err?.error?.code || "unknown",
        message: String(err?.error?.message || "OpenAI request failed").slice(0, 240),
        model,
      };
      console.error("[SkillBridge AI] OpenAI mentor request failed", diagnostic);

      return NextResponse.json({
        text: fallback(role, gaps, readiness, question),
        mode: "provider-fallback",
        diagnostic: `${diagnostic.status}:${diagnostic.code}`,
      });
    }

    const text = outputText(payload);
    if (!text) {
      console.error("[SkillBridge AI] OpenAI mentor returned no text", { model });
      return NextResponse.json({
        text: fallback(role, gaps, readiness, question),
        mode: "empty-provider-fallback",
        diagnostic: "empty_output",
      });
    }

    return NextResponse.json({ text, mode: "openai", model });
  } catch (error: any) {
    console.error("[SkillBridge AI] Mentor route exception", {
      name: error?.name || "Error",
      message: String(error?.message || "Unknown mentor error").slice(0, 240),
    });

    return NextResponse.json(
      {
        text: "The AI layer is temporarily unavailable. Your deterministic readiness, skill gaps and opportunity ranking are still available.",
        mode: "safe-fallback",
        diagnostic: "route_exception",
      },
      { status: 200 }
    );
  }
}
