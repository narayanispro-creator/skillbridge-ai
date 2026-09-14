import Link from "next/link";
import { ArrowUpRight, BrainCircuit, Building2, CheckCircle2, ChevronRight, GraduationCap, Network, Radar, ShieldCheck, Sparkles, Target, UsersRound } from "lucide-react";
import { LogoCloud } from "@/components/LogoCloud";
import { LandingInteractive, InteractiveMatchEngine } from "@/components/LandingInteractive";

const features=[
  [Radar,"Living Skill Passport","A continuously evolving proficiency profile with evidence, confidence and role readiness — not a static résumé snapshot."],
  [Network,"Role Skill Graph","Every role is modeled as weighted capabilities, proficiency thresholds and evidence expectations that recruiters can actually inspect."],
  [BrainCircuit,"AI that explains, not scores","AI converts complex gaps into actions. The numeric ranking remains deterministic, auditable and stable."],
] as const;
export default function Home(){return <main className="marketingShell">
  <header className="marketingNav wrap">
    <Link className="brand" href="/"><span className="brandMark">S</span><span>SkillBridge <em>AI</em></span></Link>
    <nav className="navLinks"><a href="#platform">Platform</a><a href="#engine">Match engine</a><a href="#impact">Closed loop</a></nav>
    <div className="navActions"><Link className="btn ghost" href="/login">Sign in</Link><Link className="btn primary" href="/dashboard">Launch workspace <ArrowUpRight size={14}/></Link></div>
  </header>

  <section className="hero2 wrap">
    <div>
      <div className="eyebrow"><i/> SKILL INTELLIGENCE FOR EARLY CAREERS</div>
      <h1>Know what you can do.<br/><span className="thin">See what comes</span> <span className="inkGradient">next.</span></h1>
      <p className="heroLead">SkillBridge turns scattered skills, internship requirements and academic signals into one explainable career graph — so students know what to learn, recruiters know who is ready, and institutions know what to fix.</p>
      <div className="heroCtas"><Link className="btn primary xl" href="/dashboard">Open student workspace <ChevronRight size={16}/></Link><Link className="btn glass xl" href="/company">Open Recruiter Console</Link></div>
      <div className="trustRow"><span><ShieldCheck size={14}/> deterministic ranking</span><span><CheckCircle2 size={14}/> evidence-backed skills</span><span><Sparkles size={14}/> contextual AI guidance</span></div>
      <div className="heroProof"><div><strong>5 signals</strong><small>inside every match</small></div><div><strong>3 workspaces</strong><small>one skill graph</small></div><div><strong>0 black boxes</strong><small>in numeric ranking</small></div></div>
    </div>

    <LandingInteractive/>
  </section>

  <div className="wrap"><LogoCloud/></div>

  <section id="platform" className="section wrap"><div className="sectionKicker">THE PRODUCT</div><div className="sectionHead"><h2>Not another internship portal.<br/><span className="muted">A shared intelligence layer.</span></h2><p>Every stakeholder gets a purpose-built workspace, while all three operate on the same role requirements, evidence and skill graph.</p></div><div className="featureGrid">{features.map(([Icon,title,copy],i)=><article className="featureCard" key={title}><div className="featureNo">0{i+1} / CORE SYSTEM</div><div className="featureIcon"><Icon size={20}/></div><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

  <section id="engine" className="darkSection"><div className="wrap engineLayout"><div><div className="sectionKicker">EXPLAINABLE MATCH ENGINE</div><h2 style={{margin:"15px 0 18px"}}>One score.<br/>Five visible reasons.</h2><p>The model never decides whether a student is a 72 or an 82. SkillBridge computes the score deterministically, then AI translates the result into practical guidance.</p><div className="formulaPills"><span>45% Skill Fit</span><span>20% Proficiency</span><span>15% Role Interest</span><span>10% Availability</span><span>10% Learning Readiness</span></div></div><InteractiveMatchEngine/></div></section>

  <section id="impact" className="section wrap"><div className="sectionKicker">THE CLOSED LOOP</div><div className="sectionHead"><h2>Three stakeholders.<br/><span className="muted">One improving system.</span></h2><p>Industry demand becomes student action and academic intervention, then fresh evidence flows back into the same graph.</p></div><div className="stakeGrid"><Link href="/dashboard" className="stakeCard"><div className="stakeIcon"><GraduationCap size={19}/></div><span>STUDENT</span><h3>Know exactly what to do next.</h3><p>Measure readiness, prove skills, close weighted gaps and discover opportunities that fit now — not someday.</p><div className="stakeAction">Open command center <ArrowUpRight size={14}/></div></Link><Link href="/company" className="stakeCard featured"><div className="stakeIcon"><Building2 size={19}/></div><span>INDUSTRY</span><h3>Hire for evidence, not keywords.</h3><p>Translate job descriptions into structured requirements and rank candidates with visible, skill-level matching.</p><div className="stakeAction">Open recruiter console <ArrowUpRight size={14}/></div></Link><Link href="/college" className="stakeCard"><div className="stakeIcon"><UsersRound size={19}/></div><span>ACADEMIA</span><h3>See the gap before placement season.</h3><p>Use privacy-safe aggregate intelligence to target workshops and curriculum interventions around real demand.</p><div className="stakeAction">Open institution console <ArrowUpRight size={14}/></div></Link></div></section>

  <footer className="footer"><div className="wrap footerInner"><div className="brand"><span className="brandMark">S</span><span>SkillBridge <em>AI</em></span></div><span>Measure → Explain → Improve → Match</span><span>Skill intelligence for students, recruiters and institutions</span></div></footer>
</main>}
