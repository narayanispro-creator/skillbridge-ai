"use client";
import Link from "next/link";
import { ProductShell } from "@/components/ProductShell";
import { ArrowRight, BriefcaseBusiness, CheckCircle2, Clock3, Route, Sparkles, Target } from "lucide-react";

export default function Dashboard(){
  return <ProductShell role="student" live={false}>
    <section className="focusPage homeFocus">
      <div className="focusEyebrow">SATURDAY · YOUR CAREER HOME</div>
      <div className="homeWelcome">
        <div><p className="focusHello">Good morning, Narayan.</p><h1>One clear move at a time.</h1><p className="focusLead">You are working toward <b>Front-End Developer</b>. SkillBridge has already chosen the highest-impact thing to do next.</p></div>
        <div className="readinessDial"><span>56%</span><small>role ready</small></div>
      </div>

      <article className="nextActionCard">
        <div className="nextActionIcon"><Target size={22}/></div>
        <div className="nextActionBody"><span>YOUR NEXT MOVE</span><h2>Strengthen JavaScript before jumping deeper into React.</h2><p>Your foundations are strong, but JavaScript is the skill currently blocking the biggest part of your Front-End path.</p><div className="actionMeta"><span><Clock3 size={14}/> ~7 focused days</span><span><CheckCircle2 size={14}/> Add one proof project</span></div></div>
        <Link href="/career" className="roundArrow" aria-label="Open career path"><ArrowRight size={19}/></Link>
      </article>

      <div className="homeSplit">
        <Link href="/explore" className="quietPanel"><div className="quietIcon"><BriefcaseBusiness size={18}/></div><div><span>OPPORTUNITIES</span><h3>3 roles are realistic for you now.</h3><p>See the match reason before you apply.</p></div><ArrowRight size={18}/></Link>
        <Link href="/mentor" className="quietPanel mentorQuiet"><div className="quietIcon"><Sparkles size={18}/></div><div><span>ASK MENTOR</span><h3>Turn your gap into a plan.</h3><p>Ask anything about your skills, path or an internship.</p></div><ArrowRight size={18}/></Link>
      </div>

      <div className="homeProgressLine"><div><span>THIS WEEK</span><b>2 of 4 actions completed</b></div><div className="thinProgress"><i style={{width:"50%"}}/></div><Link href="/skills">View skill passport <ArrowRight size={13}/></Link></div>
    </section>
  </ProductShell>
}
