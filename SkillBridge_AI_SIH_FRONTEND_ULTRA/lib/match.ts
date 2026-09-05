export type MatchFactors = {
  skillFit: number;
  proficiency: number;
  roleInterest: number;
  availability: number;
  learningReadiness: number;
};

export const MATCH_WEIGHTS = {
  skillFit: 0.45,
  proficiency: 0.2,
  roleInterest: 0.15,
  availability: 0.1,
  learningReadiness: 0.1,
} as const;

export type Skill = { name: string; level: number };
export type Required = { name: string; level: number; weight?: number };

const clamp = (n: number) => Math.max(0, Math.min(100, n));

export function finalMatchScore(f: MatchFactors) {
  return Math.round(
    clamp(f.skillFit) * MATCH_WEIGHTS.skillFit +
      clamp(f.proficiency) * MATCH_WEIGHTS.proficiency +
      clamp(f.roleInterest) * MATCH_WEIGHTS.roleInterest +
      clamp(f.availability) * MATCH_WEIGHTS.availability +
      clamp(f.learningReadiness) * MATCH_WEIGHTS.learningReadiness,
  );
}

export function calculateMatch(student: Skill[], required: Required[]) {
  const map = new Map(student.map((s) => [s.name.toLowerCase(), clamp(s.level)]));
  let weighted = 0;
  let total = 0;
  const gaps: Array<{ skill: string; have: number; need: number; gap: number; weight: number }> = [];

  required.forEach((r) => {
    const weight = Math.max(0.1, r.weight ?? 1);
    const need = Math.max(1, clamp(r.level));
    const have = map.get(r.name.toLowerCase()) ?? 0;
    weighted += Math.min(have / need, 1) * weight;
    total += weight;
    if (have < need) gaps.push({ skill: r.name, have, need, gap: need - have, weight });
  });

  const skillFit = total ? Math.round((weighted / total) * 100) : 0;
  const proficiency = student.length
    ? Math.round(student.reduce((sum, skill) => sum + clamp(skill.level), 0) / student.length)
    : 0;
  const factors: MatchFactors = {
    skillFit,
    proficiency,
    roleInterest: 85,
    availability: 80,
    learningReadiness: 75,
  };

  return {
    score: finalMatchScore(factors),
    skillFit,
    factors,
    gaps: gaps.sort((a, b) => b.gap * b.weight - a.gap * a.weight),
  };
}
