import OpenAI from "openai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Gap = {
  name?: string;
  have?: number;
  need?: number;
  gap?: number;
  weight?: number;
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

function safeError(error: any) {
  return {
    name: error?.name,
    status: error?.status,
    code: error?.code,
    type: error?.type,
    message: error?.message,
    request_id: error?.request_id,
  };
}

export async function POST(req: Request) {
  let role = "your target role";
  let readiness = 0;
  let gaps: Gap[] = [];
  let question = "";

  try {
    const body = await req.json();
    role = String(body.role || role).slice(0, 120);
    readiness = Math.max(0, Math.min(100, Number(body.readiness || 0)));
    gaps = Array.isArray(body.gaps) ? body.gaps.slice(0, 6) : [];
    question = String(body.question || "").slice(0, 700);

    const systemPrompt =
      "You are SkillBridge Mentor, an evidence-first career copilot. Be concise, specific and practical. Ground every recommendation in the provided role, deterministic readiness and weighted skill gaps. Never invent, alter or recalculate numeric scores. Never use hype. Prefer one concrete project or action over generic course lists. Maximum 5 short sentences unless the user explicitly asks for a plan.";

    const userPrompt = JSON.stringify({ role, readiness, gaps, question });

    // Free-first provider for the SIH prototype.
    if (process.env.GROQ_API_KEY) {
      try {
        const groq = new OpenAI({
          apiKey: process.env.GROQ_API_KEY,
          baseURL: "https://api.groq.com/openai/v1",
        });

        const completion = await groq.chat.completions.create({
          model: process.env.GROQ_MODEL || "openai/gpt-oss-120b",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.25,
          max_tokens: 360,
        });

        const text = completion.choices?.[0]?.message?.content?.trim();
        if (text) {
          return NextResponse.json({ text, mode: "groq" });
        }
      } catch (error: any) {
        console.error("[SkillBridge AI] Groq mentor request failed", safeError(error));
      }
    }

    // Optional paid fallback if OpenAI credits are available later.
    if (process.env.OPENAI_API_KEY) {
      try {
        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
        const completion = await openai.chat.completions.create({
          model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.25,
          max_tokens: 360,
        });

        const text = completion.choices?.[0]?.message?.content?.trim();
        if (text) {
          return NextResponse.json({ text, mode: "openai" });
        }
      } catch (error: any) {
        console.error("[SkillBridge AI] OpenAI mentor fallback failed", safeError(error));
      }
    }

    return NextResponse.json({
      text: fallback(role, gaps, readiness, question),
      mode: "deterministic-fallback",
    });
  } catch (error: any) {
    console.error("[SkillBridge AI] Mentor route failed", safeError(error));
    return NextResponse.json(
      {
        text: fallback(role, gaps, readiness, question),
        mode: "safe-fallback",
      },
      { status: 200 }
    );
  }
}
