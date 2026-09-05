import OpenAI from "openai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const catalog = [
  "JavaScript",
  "React",
  "Git",
  "TypeScript",
  "Next.js",
  "HTML",
  "CSS",
  "Python",
  "SQL",
  "Communication",
];

function localExtract(description: string) {
  const text = description.toLowerCase();
  return catalog
    .filter((skill) => text.includes(skill.toLowerCase()))
    .slice(0, 8)
    .map((name, i) => ({
      name,
      required_level: i < 2 ? 78 : i < 4 ? 68 : 60,
      weight: i < 2 ? 1.6 : i < 4 ? 1.2 : 1,
    }));
}

function normalizeSkills(raw: string) {
  const cleaned = raw.replace(/```json|```/gi, "").trim();
  let parsed: any[] = [];
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    const start = cleaned.indexOf("[");
    const end = cleaned.lastIndexOf("]");
    if (start >= 0 && end > start) {
      try {
        parsed = JSON.parse(cleaned.slice(start, end + 1));
      } catch {}
    }
  }

  if (!Array.isArray(parsed)) return [];

  return parsed
    .filter((item) => item && typeof item.name === "string")
    .slice(0, 8)
    .map((item) => ({
      name: String(item.name).slice(0, 60),
      required_level: Math.max(
        0,
        Math.min(100, Math.round(Number(item.required_level) || 60))
      ),
      weight: Math.max(0.5, Math.min(2, Number(item.weight) || 1)),
    }));
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
  const { description = "" } = await req.json();
  const text = String(description).trim();

  if (!text) return NextResponse.json({ skills: [], mode: "empty" });

  const fallback = localExtract(text);
  const systemPrompt =
    "Extract only concrete job skills from the internship description. Return ONLY a strict JSON array, no markdown and no commentary. Each object must contain: name (canonical concise skill), required_level (integer 0-100), weight (number 0.5-2.0). Maximum 8 skills. Core must-have skills get higher weight. Do not invent technologies or skills absent from the description.";

  // Free-first Groq provider.
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
          { role: "user", content: text.slice(0, 5000) },
        ],
        temperature: 0,
        max_tokens: 420,
      });

      const raw = completion.choices?.[0]?.message?.content || "[]";
      const skills = normalizeSkills(raw);
      if (skills.length) {
        return NextResponse.json({ skills, mode: "groq" });
      }
    } catch (error: any) {
      console.error("[SkillBridge AI] Groq JD extraction failed", safeError(error));
    }
  }

  // Optional OpenAI fallback for future paid usage.
  if (process.env.OPENAI_API_KEY) {
    try {
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const completion = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: text.slice(0, 5000) },
        ],
        temperature: 0,
        max_tokens: 420,
      });

      const raw = completion.choices?.[0]?.message?.content || "[]";
      const skills = normalizeSkills(raw);
      if (skills.length) {
        return NextResponse.json({ skills, mode: "openai" });
      }
    } catch (error: any) {
      console.error("[SkillBridge AI] OpenAI JD fallback failed", safeError(error));
    }
  }

  return NextResponse.json({ skills: fallback, mode: "local-fallback" });
}
