# SkillBridge AI — SIH Startup Build v3

This build is designed around one rule: **one screen = one job, one student state = one truth**.

## What makes this build different
- No pre-filled personal skills, proofs or readiness.
- One shared local prototype state across Home, Skills, Career, Explore, Mentor and Profile.
- Career readiness recalculates from the current Skill Passport and selected target role.
- Evidence confidence is displayed separately from self-rated proficiency.
- Career comparison shows the same passport against multiple role maps without an AI guess.
- Opportunity matching exposes the actual 45/20/15/10/10 factor breakdown.
- Opportunity scores stay at 0 when the passport has no skills.
- Mentor receives the live role, readiness and gaps and cannot silently change deterministic scores.
- Roadmap Start / Mark done actions persist in the same student state.
- Profile, privacy and preferences are editable.
- Groq-first AI integration is preserved.
- Supabase/PostgreSQL production path is preserved.

## Student journey
1. `/onboarding` — choose a target and create the student identity.
2. `/skills` — add only skills actually learned; attach optional evidence.
3. `/assessment` — take a transparent prototype assessment; no silent skill mutation.
4. `/career` — inspect readiness, role thresholds, evidence and shortest gap path.
5. `/explore` — inspect sample opportunities with explainable score decomposition.
6. `/mentor` — use a dedicated grounded career copilot space.
7. `/profile` — edit identity, target, privacy and preferences.

## Matching formula
- 45% Skill Fit
- 20% Proficiency
- 15% Role Interest
- 10% Availability
- 10% Learning Readiness

The LLM never owns the match score.

## Demo data policy
Sample opportunity/company/college datasets are explicitly marked as sample/demo. Student claims are never auto-created.
