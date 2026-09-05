"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Bell, Command, GraduationCap, LayoutDashboard, Network, Search, ShieldCheck, Sparkles, Target, UsersRound, BriefcaseBusiness, BarChart3, CircleUserRound } from "lucide-react";

const studentNav = [
  ["/dashboard", "Command center", LayoutDashboard],
  ["/dashboard#passport", "Skill passport", GraduationCap],
  ["/dashboard#graph", "Career graph", Network],
  ["/dashboard#opportunities", "Opportunities", BriefcaseBusiness],
  ["/dashboard#mentor", "AI mentor", Sparkles],
] as const;
const companyNav = [
  ["/company", "Recruiter overview", LayoutDashboard],
  ["/company#roles", "Role studio", Target],
  ["/company#candidates", "Candidate intelligence", UsersRound],
  ["/company#pipeline", "Hiring pipeline", BarChart3],
] as const;
const collegeNav = [
  ["/college", "Executive view", LayoutDashboard],
  ["/college#signals", "Skill intelligence", BarChart3],
  ["/college#cohort", "Cohort readiness", UsersRound],
  ["/college#interventions", "Interventions", Target],
] as const;

export function ProductShell({role, children, live=true}:{role:"student"|"company"|"college";children:ReactNode;live?:boolean}){
  const pathname=usePathname();
  const nav=role==="student"?studentNav:role==="company"?companyNav:collegeNav;
  const roleLabel=role==="student"?"Student intelligence":role==="company"?"Recruiter intelligence":"Institution intelligence";
  return <div className="productApp">
    <div className="appNoise" />
    <header className="productTopbar">
      <Link href="/" className="productBrand"><span className="brandGlyph">S</span><span><b>SkillBridge</b><em>AI</em></span></Link>
      <button className="searchCommand" aria-label="Search"><Search size={15}/><span>Search skills, roles, people…</span><kbd><Command size={11}/> K</kbd></button>
      <div className="topbarRight"><span className="systemStatus"><i className={live?"pulseDot":"demoDot"}/>{live?"LIVE GRAPH":"DEMO GRAPH"}</span><button className="iconButton"><Bell size={16}/></button><Link href="/login" className="accountChip"><CircleUserRound size={17}/><span>Workspace</span></Link></div>
    </header>
    <div className="productFrame">
      <aside className="productSidebar">
        <div className="sidebarRole"><span>{roleLabel}</span><ShieldCheck size={14}/></div>
        <nav>{nav.map(([href,label,Icon],i)=><Link className={`navItem ${(i===0&&pathname===href)||pathname===href?'active':''}`} href={href} key={href+label}><Icon size={16}/><span>{label}</span>{i===0&&<i/>}</Link>)}</nav>
        <div className="sidebarFoot"><div className="intelligenceCard"><div className="intelligenceIcon"><Sparkles size={15}/></div><div><strong>Explainable by design</strong><p>AI explains. The deterministic engine scores.</p></div></div><Link href="/" className="backHome">← Product overview</Link></div>
      </aside>
      <main className="productMain">{children}</main>
    </div>
  </div>
}
