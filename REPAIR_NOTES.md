# SkillBridge shared-state repair

This build removes contradictory hard-coded student data.

- New local prototype state key: `skillbridge-student-state-v4`
- Fresh profile starts with zero skills and zero evidence.
- Home, Skills, Career, Explore, Mentor and Profile read the same state.
- Career target role is editable.
- Readiness recalculates from the current passport.
- Explore match scores recalculate from the current passport; no skills => 0%.
- Profile personal info, privacy/evidence visibility and preferences are editable.
- Roadmap Start buttons persist an in-progress state.
- Opportunity Save, View role and Apply-in-prototype actions work.
- Sample opportunities are explicitly labelled as sample listings.
