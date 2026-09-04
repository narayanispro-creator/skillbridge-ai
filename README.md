# SkillBridge AI — CodeCartel / SIH 2026

Full-stack Next.js prototype for PS 26044.

## Included
- Next.js/React responsive frontend
- Student Skill Passport dashboard
- Explainable deterministic matching API
- Company talent view
- Academia skill-gap view
- Supabase Auth integration with demo fallback
- PostgreSQL/Supabase schema + RLS starter policies
- Environment hooks for OpenAI
- Vercel-ready project

## Local
1. `npm install`
2. Copy `.env.example` to `.env.local`
3. `npm run dev`

## Supabase
Run `supabase/schema.sql` in the Supabase SQL editor and set:
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.

## AI
Set `OPENAI_API_KEY`. Keep the deterministic match engine as the source of truth; use AI for resume extraction and human-readable explanations.

## Important
The dashboard contains illustrative prototype/demo data. Do not present it as measured SIH or Quantum University outcome data.
