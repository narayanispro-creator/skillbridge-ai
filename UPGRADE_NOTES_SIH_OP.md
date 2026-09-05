# SkillBridge AI — SIH OP Build

## Core product rule
One student state is the source of truth for Skills, Career, Explore, Mentor, Profile and Judge Demo.

## Added / upgraded
- Empty-by-default Skill Passport with editable proficiency and user-created evidence.
- Quick role assessment creates explicit assessment signals; result is not silently applied.
- Dynamic role readiness from saved skills.
- Role skill map with evidence confidence separated from self-rating.
- Highest-leverage gap and shortest path.
- Projected readiness if a target gap is closed.
- Explainable opportunity scoring with visible 45/20/15/10/10 factors.
- Projected opportunity match after closing the biggest configured gap.
- Saved/applied opportunity state.
- AI Mentor grounded in the same role/readiness/gaps and prohibited from owning the score.
- Editable profile, privacy and preferences.
- Recruiter Role Studio with JD skill extraction and live local Skill Passport candidate signal.
- Institution demand-gap / intervention workspace.
- SIH Judge Mode (`/demo`) using clearly-labelled fictional data to demonstrate the Student → Industry → Academia loop.

## Important truthfulness constraints
- Sample market listings are labelled sample data.
- Judge Mode uses the fictional profile `Aarav Demo`.
- Self-rated proficiency is not described as verified.
- AI explanations do not generate the deterministic score.
- Projected readiness/match are simulations, not promises.

## Suggested SIH demo sequence
1. Open `/demo` and Load judge scenario.
2. Show current readiness, top gap and best market fit.
3. Open Skills; inspect evidence and change a level.
4. Return to Career; show readiness changed.
5. Open Assessment; create an assessment signal and add it to the passport.
6. Career: show role graph + projected readiness.
7. Explore: Explain Match + projected match improvement.
8. Company: show the same local student as a LIVE PASSPORT candidate.
9. College: show how repeated demand gaps become interventions.
10. Mentor: ask why a recommendation was made; explain that the LLM explains but does not score.

## Validation performed in this environment
Changed TS/TSX files were parsed with TypeScript `transpileModule` and produced no syntax diagnostics.
A full Next.js build could not be run locally because dependency installation timed out in the sandbox; Vercel remains the final dependency/build validation.
