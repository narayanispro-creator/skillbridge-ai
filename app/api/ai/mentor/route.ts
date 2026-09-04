import { NextResponse } from "next/server";

export const runtime = "nodejs";

const catalog = ["JavaScript", "React", "Git", "TypeScript", "Next.js", "HTML", "CSS", "Python", "SQL", "Communication"];

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

function outputText(payload: any): string {
  if (typeof payload?.output_text === "string" && payload.output_text.trim()) return payload.output_text.trim();
  const chunks: string[] = [];
  for (const item of Array.isArray(payload?.output) ? payload.output : []) {
    for (const content of Array.isArray(item?.content) ? item.content : []) {
      if ((content?.type === "output_text" || content?.type === "text") && typeof content?.text === "string") chunks.push(content.text);
    }
  }
  return chunks.join("\n").trim();
}

export async function POST(req: Request) {
  const { description = "" } = await req.json();
  const text = String(description).trim();
  if (!text) return NextResponse.json({ skills: [], mode: "empty" });

  const fallback = localExtract(text);
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.warn("[SkillBridge AI] OPENAI_API_KEY missing for JD extraction.");
    return NextResponse.json({ skills: fallback, mode: "local-extractor", diagnostic: "missing_api_key" });
  }

  const model = process.env.OPENAI_MODEL || "gpt-5.6-luna";

  try {
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
              "Extract only concrete job skills from the internship description. Return a strict JSON array, no markdown. Each object must contain: name (canonical concise skill), required_level integer 0-100, weight number 0.5-2.0. Maximum 8. Core must-have skills get higher weight. Do not invent technologies absent from the description.",
          },
          { role: "user", content: text.slice(0, 5000) },
        ],
        max_output_tokens: 420,
      }),
      cache: "no-store",
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      const diagnostic = {
        status: response.status,
        type: payload?.error?.type || "unknown",
        code: payload?.error?.code || "unknown",
        message: String(payload?.error?.message || "OpenAI request failed").slice(0, 240),
        model,
      };
      console.error("[SkillBridge AI] OpenAI JD extraction failed", diagnostic);
      return NextResponse.json({ skills: fallback, mode: "provider-fallback", diagnostic: `${diagnostic.status}:${diagnostic.code}` });
    }

    const raw = outputText(payload).replace(/```json|```/g, "").trim();
    let skills: any[] = [];
    try {
      skills = JSON.parse(raw);
    } catch {
      console.error("[SkillBridge AI] JD extraction returned invalid JSON", { model, outputLength: raw.length });
    }

    skills = Array.isArray(skills)
      ? skills
          .filter((x) => x && typeof x.name === "string")
          .slice(0, 8)
          .map((x) => ({
            name: String(x.name).slice(0, 60),
            required_level: Math.max(0, Math.min(100, Math.round(Number(x.required_level) || 60))),
            weight: Math.max(0.5, Math.min(2, Number(x.weight) || 1)),
          }))
      : [];

    return NextResponse.json({
      skills: skills.length ? skills : fallback,
      mode: skills.length ? "openai" : "local-fallback",
      model,
    });
  } catch (error: any) {
    console.error("[SkillBridge AI] JD route exception", {
      name: error?.name || "Error",
      message: String(error?.message || "Unknown JD error").slice(0, 240),
    });
    return NextResponse.json({ skills: fallback, mode: "local-fallback", diagnostic: "route_exception" });
  }
}
