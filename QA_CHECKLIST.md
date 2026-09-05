# SkillBridge AI v3 — SIH demo QA

## Zero-state integrity
1. Reset local profile from Profile.
2. Home must ask for setup.
3. Complete onboarding.
4. Skills must show 0 skills and 0 proof.
5. Career must show 0% readiness.
6. Explore must show 0% for every sample opportunity.
7. Mentor must show the selected target with 0% readiness and current gaps.

## Cross-page truth test
1. Add JavaScript at 40%.
2. Career JavaScript row must show 40%.
3. Home readiness must update.
4. Explore opportunity percentages must update.
5. Move JavaScript to 70%; all dependent screens must update after navigation.
6. Add proof for JavaScript; evidence signal must increase without changing the self-rating.
7. Change target from Career; Home/Profile/Mentor target must reflect the same role.
8. Use Career comparison; selecting a role must update the shared target.
9. Start a roadmap step; it must become In progress.
10. Mark it done; it must persist after refresh.

## Opportunity explainability
1. Open Explore → Explain match.
2. Confirm 5 factors appear: Skill Fit, Proficiency, Role Interest, Availability, Learning Readiness.
3. Confirm the total matches the card score.
4. Save a listing; Saved tab must update.
5. Apply in prototype; Applied tab must update.

## Mentor grounding
1. Ask “Why is my readiness this score?”
2. Response must use the current role/readiness/gaps.
3. Mentor must not recalculate or modify the official numeric score.

## Profile
1. Edit identity and target role.
2. Edit privacy settings.
3. Edit location/work mode/availability.
4. Refresh and confirm local demo persistence.
