"use client";

import Link from "next/link";
import { ProductShell } from "@/components/ProductShell";
import { useStudent } from "@/components/StudentState";
import { getRole, gapsForRole, OPPORTUNITIES, opportunityScoreBreakdown, projectedOpportunityScore, projectedReadinessAfterSkill, roleEvidenceCoverage, roleReadiness } from "@/lib/student-intelligence";
import { ArrowRight, BadgeCheck, BarChart3, BriefcaseBusiness, Building2, CheckCircle2, GraduationCap, Play, RefreshCcw, Route, ShieldCheck, Sparkles, Target, UsersRound } from "lucide-react";
import { useMemo } from "react";

export default function DemoPage(){
  const {skills,profile,loadJudgeDemo,resetAll,assessments}=useStudent();
  const role=getRole(profile.targetRole);
  const readiness=roleReadiness(skills,role);
  const evidence=roleEvidenceCoverage(skills,role);
  const gaps=gapsForRole(skills,role);
  const ranked=useMemo(()=>OPPORTUNITIES.map(op=>({op,b:opportunityScoreBreakdown(skills,profile,op)})).sort((a,b)=>b.b.total-a.b.total),[skills,profile]);
  const best=ranked[0];
  const nextGap=gaps[0];
  const projectedReadiness=nextGap?projectedReadinessAfterSkill(skills,role,nextGap.name,nextGap.target):readiness;
  const projectedMatch=best&&nextGap?projectedOpportunityScore(skills,profile,best.op,nextGap.name,nextGap.target):best?.b.total||0;
  const ready=profile.name==="Aarav Demo";

  return <ProductShell role="student" live={false}><section className="focusPage judgeDemoPage">
    <div className="judgeHero">
      <div><div className="focusEyebrow">SIH JUDGE MODE · FICTIONAL DATA</div><h1>Watch one skill change ripple through the entire system.</h1><p className="focusLead">This is not a slideshow. It is a controlled, clearly-labelled demo journey proving that Student, Industry and Academia are reading the same skill intelligence.</p></div>
      <div className="judgeHeroActions"><button className="heroAction" onClick={loadJudgeDemo}><Play size={16}/> Load judge scenario</button><button className="ghostAction" onClick={resetAll}><RefreshCcw size={15}/> Clear scenario</button></div>
    </div>

    {!ready?<div className="judgeEmpty"><Sparkles size={30}/><h2>Load the fictional scenario to begin.</h2><p>Nothing will be mixed with your own local profile. The scenario is explicitly labelled “Aarav Demo”.</p></div>:<>
      <div className="judgeSignalGrid">
        <div><span>STUDENT</span><b>{profile.name}</b><small>{skills.length} skills · {evidence}% evidence coverage</small></div>
        <div><span>TARGET</span><b>{role?.name}</b><small>{readiness}% readiness now</small></div>
        <div><span>HIGHEST GAP</span><b>{nextGap?.name||"None"}</b><small>{nextGap?`${nextGap.current}% → ${nextGap.target}% target`:"Configured gaps covered"}</small></div>
        <div><span>BEST MARKET FIT</span><b>{best?.b.total||0}%</b><small>{best?.op.role||"No opportunity"}</small></div>
      </div>

      <section className="judgeStory">
        <div className="judgeStoryTop"><div><span>THE STARTUP MOMENT</span><h2>SkillBridge does not recommend a course. It predicts the consequence of closing a gap.</h2></div><ShieldCheck size={22}/></div>
        {nextGap&&best?<div className="impactBridge">
          <div><small>CURRENT</small><strong>{readiness}%</strong><span>career readiness</span></div>
          <ArrowRight size={24}/>
          <div className="impactAction"><small>IF {nextGap.name.toUpperCase()} REACHES TARGET</small><strong>{nextGap.current}% → {nextGap.target}%</strong><span>one measurable intervention</span></div>
          <ArrowRight size={24}/>
          <div className="impactGain"><small>PROJECTED</small><strong>{projectedReadiness}%</strong><span>career readiness</span></div>
          <div className="impactGain"><small>BEST MATCH</small><strong>{best.b.total}% → {projectedMatch}%</strong><span>{best.op.role}</span></div>
        </div>:<div className="judgeEmpty compact"><CheckCircle2 size={22}/><p>Add a target gap to see projected impact.</p></div>}
      </section>

      <div className="judgeJourney">
        <Link href="/skills"><BadgeCheck/><span>01</span><div><b>Skill Passport</b><small>Open the exact evidence and proficiency signals behind the score.</small></div><ArrowRight/></Link>
        <Link href="/assessment"><Target/><span>02</span><div><b>Assessment</b><small>Create a measured signal instead of trusting self-rating alone.</small></div><ArrowRight/></Link>
        <Link href="/career"><Route/><span>03</span><div><b>Career Graph</b><small>See thresholds, gaps, shortest path and projected readiness lift.</small></div><ArrowRight/></Link>
        <Link href="/explore"><BriefcaseBusiness/><span>04</span><div><b>Explain Match</b><small>Decompose every opportunity score and simulate its biggest improvement.</small></div><ArrowRight/></Link>
        <Link href="/company"><Building2/><span>05</span><div><b>Recruiter View</b><small>Switch sides: role demand becomes structured skills and explainable ranking.</small></div><ArrowRight/></Link>
        <Link href="/college"><GraduationCap/><span>06</span><div><b>Institution View</b><small>Aggregate demand gaps into curriculum and placement interventions.</small></div><ArrowRight/></Link>
      </div>

      <section className="judgeMoatGrid">
        <article><UsersRound/><span>NETWORK EFFECT</span><h3>Student improvements change recruiter fit.</h3><p>The same structured skill graph connects what a learner proves to what an employer asks for.</p></article>
        <article><BarChart3/><span>ACADEMIA FEEDBACK</span><h3>Repeated market gaps become curriculum signals.</h3><p>Institutions see aggregate demand-vs-readiness patterns instead of waiting for placement failures.</p></article>
        <article><Sparkles/><span>AI WITH BOUNDARIES</span><h3>AI explains. Deterministic engines score.</h3><p>The judge can inspect the formula and data instead of trusting an opaque LLM percentage.</p></article>
      </section>

      <div className="judgeFooter"><div><b>{assessments.length}</b><span>assessment signal{assessments.length===1?"":"s"}</span></div><div><b>{skills.reduce((n,s)=>n+s.evidence.length,0)}</b><span>proof item{skills.reduce((n,s)=>n+s.evidence.length,0)===1?"":"s"}</span></div><div><b>{gaps.length}</b><span>active role gaps</span></div><div><b>{ranked.filter(x=>x.b.total>=60).length}</b><span>60%+ sample matches</span></div></div>
    </>}
  </section></ProductShell>
}
