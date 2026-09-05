"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Bell, Command, Home, Search, ShieldCheck, Sparkles, Target, UsersRound, BriefcaseBusiness, BarChart3, CircleUserRound, BadgeCheck, UserRound, Route } from "lucide-react";

const studentNav = [
  ["/dashboard", "Home", Home],
  ["/skills", "Skills", BadgeCheck],
  ["/career", "Career", Route],
  ["/explore", "Explore", BriefcaseBusiness],
  ["/mentor", "Mentor", Sparkles],
  ["/profile", "Profile", UserRound],
] as const;
const companyNav = [
  ["/company", "Recruiter overview", Home],
  ["/company#roles", "Role studio", Target],
  ["/company#candidates", "Candidate intelligence", UsersRound],
  ["/company#pipeline", "Hiring pipeline", BarChart3],
] as const;
const collegeNav = [
  ["/college", "Executive view", Home],
  ["/college#signals", "Skill intelligence", BarChart3],
  ["/college#cohort", "Cohort readiness", UsersRound],
  ["/college#interventions", "Interventions", Target],
] as const;

export function ProductShell({role, children, live=true}:{role:"student"|"company"|"college";children:ReactNode;live?:boolean}){
  const pathname=usePathname();
  const nav=role==="student"?studentNav:role==="company"?companyNav:collegeNav;
  const roleLabel=role==="student"?"Student workspace":role==="company"?"Recruiter intelligence":"Institution intelligence";
  return <div className={`productApp ${role==="student"?"studentProduct":""}`}>
    <div className="appNoise" />
    <header className="productTopbar">
      <Link href="/" className="productBrand"><span className="brandGlyph">S</span><span><b>SkillBridge</b><em>AI</em></span></Link>
      <button className="searchCommand" aria-label="Search"><Search size={15}/><span>Search skills, roles, opportunities…</span><kbd><Command size={11}/> K</kbd></button>
      <div className="topbarRight"><span className="systemStatus"><i className={live?"pulseDot":"demoDot"}/>{live?"LIVE PROFILE":"DEMO PROFILE"}</span><button className="iconButton"><Bell size={16}/></button><Link href="/profile" className="accountChip"><CircleUserRound size={17}/><span>Profile</span></Link></div>
    </header>
    <div className="productFrame">
      <aside className="productSidebar">
        <div className="sidebarRole"><span>{roleLabel}</span><ShieldCheck size={14}/></div>
        <nav>{nav.map(([href,label,Icon])=>{
          const base=href.split("#")[0]; const active=pathname===base;
          return <Link className={`navItem ${active?'active':''}`} href={href} key={href+label}><Icon size={16}/><span>{label}</span>{active&&<i/>}</Link>
        })}</nav>
        <div className="sidebarFoot"><div className="intelligenceCard"><div className="intelligenceIcon"><Sparkles size={15}/></div><div><strong>One screen. One job.</strong><p>Move through your career journey without dashboard overload.</p></div></div><Link href="/" className="backHome">← Product overview</Link></div>
      </aside>
      <main className="productMain studentMain">{children}</main>
    </div>
    {role==="student"&&<nav className="mobileStudentNav">{studentNav.slice(0,5).map(([href,label,Icon])=><Link href={href} className={pathname===href?"active":""} key={href}><Icon size={18}/><span>{label}</span></Link>)}</nav>}
  </div>
}
