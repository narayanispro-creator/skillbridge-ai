import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowUpRight, BrainCircuit, Building2, CheckCircle2, ChevronRight, GraduationCap, Network, Radar, ShieldCheck, Sparkles, Target, UsersRound } from "lucide-react";
import { LogoCloud } from "@/components/LogoCloud";

const features=[
  [Radar,"Living Skill Passport","A continuously evolving proficiency profile with evidence, confidence and role readiness — not a static résumé snapshot."],
  [Network,"Role Skill Graph","Every role is modeled as weighted capabilities, proficiency thresholds and evidence expectations that recruiters can actually inspect."],
  [BrainCircuit,"AI that explains, not scores","AI converts complex gaps into actions. The numeric ranking remains deterministic, auditable and stable."],
] as const;
const weights=[["Skill fit",86,45],["Proficiency",71,20],["Role interest",90,15],["Availability",80,10],["Learning readiness",75,10]] as const;

export default function Home(){return <main className="marketingShell">
  <header className="marketingNav wrap">
    <Link className="brand" href="/"><span className="brandMark">S</span><span>SkillBridge <em>AI</em></span></Link>
    <nav className="navLinks"><a href="#platform">Platform</a><a href="#engine">Match engine</a><a href="#impact">Closed loop</a></nav>
    <div className="navActions"><Link className="btn ghost" href="/login">Sign in</Link><Link className="btn primary" href="/dashboard">Launch workspace <ArrowUpRight size={14}/></Link></div>
  </header>

  <section className="hero2 wrap">
    <div>
      <div className="eyebrow"><i/> SIH 2026 · CODECARTEL · PS 26044</div>
      <h1>Career intelligence<br/><span className="thin">that can</span> <span className="inkGradient">show its work.</span></h1>
      <p className="heroLead">SkillBridge turns scattered skills, internship requirements and academic signals into one explainable career graph — so students know what to learn, recruiters know who is ready, and institutions know what to fix.</p>
      <div className="heroCtas"><Link className="btn primary xl" href="/dashboard">Enter Student Command Center <ChevronRight size={16}/></Link><Link className="btn glass xl" href="/company">Open Recruiter Console</Link></div>
      <div className="trustRow"><span><ShieldCheck size={14}/> deterministic ranking</span><span><CheckCircle2 size={14}/> evidence-backed skills</span><span><Sparkles size={14}/> contextual AI guidance</span></div>
      <div className="heroProof"><div><strong>5 signals</strong><small>inside every match</small></div><div><strong>3 workspaces</strong><small>one skill graph</small></div><div><strong>0 black boxes</strong><small>in numeric ranking</small></div></div>
    </div>

    <div className="productStage2">
      <div className="stageHalo"/>
      <div className="appPreview">
        <div className="previewTop"><div className="previewDots"><i/><i/><i/></div><span>student.skillbridge.ai / command-center</span><span>ENCRYPTED SESSION</span></div>
        <div className="previewBody"><aside className="previewSide"><div className="previewSideLogo">S</div>{["Overview","Skill Passport","Career Graph","Opportunities","AI Mentor"].map((x,i)=><div className={`previewNav ${i===0?"active":""}`} key={x}>{x}</div>)}</aside>
          <div className="previewContent">
            <div className="previewHeader"><div><small>CAREER READINESS / FRONT-END DEVELOPER</small><h3>Good morning, Narayan.</h3></div><span className="miniTag">LIVE SKILL GRAPH</span></div>
            <div className="commandHero"><div className="previewRing"><span>82</span><small>READINESS</small></div><div className="previewHeroCopy"><b>One move can unlock three roles.</b><p>React is your highest weighted gap across currently matched opportunities. Raise it from 46 → 72 and attach one proof-of-work project.</p><span className="impactChip">↗ projected +9 readiness points</span></div></div>
            <div className="previewMetrics">{[["SKILL FIT","86%"],["PROFICIENCY","71%"],["EVIDENCE","4 FILES"],["TOP GAP","REACT"]].map(([a,b])=><div className="previewMetric" key={a}><small>{a}</small><b>{b}</b></div>)}</div>
            <div className="previewGrid"><div className="previewPanel"><div className="previewPanelHead"><b>SHORTEST SKILL PATH</b><span>IMPACT-FIRST</span></div>{[["React",46],["Git",63],["JavaScript",72]].map(([n,v])=><div className="barLine" key={n as string}><span>{n}</span><i style={{"--w":`${v}%`} as CSSProperties}/><b>{v}%</b></div>)}</div><div className="previewPanel"><div className="previewPanelHead"><b>BEST-FIT ROLE</b><span>92% MATCH</span></div><div className="roleMini"><strong>Product Engineering Intern</strong><span>Nova Labs · Remote</span><p>Strong JavaScript + UI foundation. React is the only material gap.</p></div></div></div>
          </div>
        </div>
      </div>
      <div className="floatingInsight one"><BrainCircuit size={16}/><div><small>AI MENTOR</small><b>Explains your next best move</b></div></div>
      <div className="floatingInsight two"><Network size={16}/><div><small>MATCH ENGINE</small><b>5 weighted, visible signals</b></div></div>
    </div>
  </section>

  <div className="wrap"><LogoCloud/></div>

  <section id="platform" className="section wrap"><div className="sectionKicker">THE PRODUCT</div><div className="sectionHead"><h2>Not another internship portal.<br/><span className="muted">A shared intelligence layer.</span></h2><p>Every stakeholder gets a purpose-built workspace, while all three operate on the same role requirements, evidence and skill graph.</p></div><div className="featureGrid">{features.map(([Icon,title,copy],i)=><article className="featureCard" key={title}><div className="featureNo">0{i+1} / CORE SYSTEM</div><div className="featureIcon"><Icon size={20}/></div><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

  <section id="engine" className="darkSection"><div className="wrap engineLayout"><div><div className="sectionKicker">EXPLAINABLE MATCH ENGINE</div><h2 style={{margin:"15px 0 18px"}}>One score.<br/>Five visible reasons.</h2><p>The model never decides whether a student is a 72 or an 82. SkillBridge computes the score deterministically, then AI translates the result into practical guidance.</p><div className="formulaPills"><span>45% Skill Fit</span><span>20% Proficiency</span><span>15% Role Interest</span><span>10% Availability</span><span>10% Learning Readiness</span></div></div><div className="engineBoard"><div className="engineBoardTop"><div><small>OPPORTUNITY MATCH</small><div style={{fontSize:9,color:"#778d97",marginTop:5}}>Product Engineering Intern · Nova Labs</div></div><strong>82%</strong></div>{weights.map(([name,value,weight])=><div className="engineRow" key={name}><div><b>{name}</b><small>{weight}% weight</small></div><div className="engineTrack"><i style={{width:`${value}%`}}/></div><strong>{value}%</strong></div>)}<div className="explainCallout"><Sparkles size={16}/><p><b style={{color:"#bcd4d9"}}>Why this is a strong match:</b> JavaScript and UI foundations exceed the threshold. React is the single highest-impact gap, so the recommendation is clear and defensible.</p></div></div></div></section>

  <section id="impact" className="section wrap"><div className="sectionKicker">THE CLOSED LOOP</div><div className="sectionHead"><h2>Three stakeholders.<br/><span className="muted">One improving system.</span></h2><p>Industry demand becomes student action and academic intervention, then fresh evidence flows back into the same graph.</p></div><div className="stakeGrid"><Link href="/dashboard" className="stakeCard"><div className="stakeIcon"><GraduationCap size={19}/></div><span>STUDENT</span><h3>Know exactly what to do next.</h3><p>Measure readiness, prove skills, close weighted gaps and discover opportunities that fit now — not someday.</p><div className="stakeAction">Open command center <ArrowUpRight size={14}/></div></Link><Link href="/company" className="stakeCard featured"><div className="stakeIcon"><Building2 size={19}/></div><span>INDUSTRY</span><h3>Hire for evidence, not keywords.</h3><p>Translate job descriptions into structured requirements and rank candidates with visible, skill-level matching.</p><div className="stakeAction">Open recruiter console <ArrowUpRight size={14}/></div></Link><Link href="/college" className="stakeCard"><div className="stakeIcon"><UsersRound size={19}/></div><span>ACADEMIA</span><h3>See the gap before placement season.</h3><p>Use privacy-safe aggregate intelligence to target workshops and curriculum interventions around real demand.</p><div className="stakeAction">Open institution console <ArrowUpRight size={14}/></div></Link></div></section>

  <footer className="footer"><div className="wrap footerInner"><div className="brand"><span className="brandMark">S</span><span>SkillBridge <em>AI</em></span></div><span>Measure → Explain → Improve → Match</span><span>Built by CodeCartel · SIH 2026</span></div></footer>
</main>}
