# SkillBridge AI — Enterprise SIH Build

**From Skill Gap to Career Path.** SkillBridge AI is an explainable career-intelligence network for Students, Industry and Academia. It replaces opaque résumé matching with a shared skill graph, evidence-backed Skill Passport and deterministic five-factor match engine.

## Product workspaces
- **Student Command Center:** living Skill Passport, readiness score, shortest skill path, ranked opportunities and contextual AI Mentor.
- **Recruiter Intelligence:** AI-assisted JD-to-skill mapping, structured role graph, transparent candidate ranking and hiring pipeline.
- **Institution Intelligence:** privacy-safe cohort readiness, demand-gap analytics and measurable intervention workflows.

## Explainable match model
`45% Skill Fit + 20% Proficiency + 15% Role Interest + 10% Availability + 10% Learning Readiness`

The LLM never owns the numeric score. OpenAI is used only for extraction and explanation. API routes have deterministic/local fallback modes so the SIH demo remains functional without an AI key.

## Stack
Next.js 15 · React 19 · TypeScript · Supabase Auth/Postgres/Storage/RLS · OpenAI Responses API · Vercel

## Environment
Copy `.env.example` to `.env.local` and configure:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `OPENAI_API_KEY` (optional for local fallback, recommended for live AI)
- `OPENAI_MODEL` (defaults to `gpt-4.1-mini`)

## Production notes
The connected Supabase project already has the enterprise schema, five-factor RPCs, restricted privileged function execution, private evidence storage and the product-intelligence layer (`saved_opportunities`, `skill_assessments`, `activity_events`, `notifications`) applied. Google OAuth and custom SMTP still require credentials owned by the project team.
