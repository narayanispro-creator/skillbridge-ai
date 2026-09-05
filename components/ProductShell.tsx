"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Bell, Command, Home, Search, ShieldCheck, Sparkles, Target, UsersRound, BriefcaseBusiness, BarChart3, CircleUserRound, BadgeCheck, UserRound, Route, ClipboardCheck } from "lucide-react";

const studentNav = [
  ["/dashboard", "Home", Home],
  ["/skills", "Skills", BadgeCheck],
  ["/career", "Career", Route],
  ["/assessment", "Assess", ClipboardCheck],
  ["/explore", "Explore", BriefcaseBusiness],
  ["/mentor", "Mentor", Sparkles],
  ["/profile", "Profile", UserRound],
] as const;

const mobileStudentNav = [
  ["/dashboard", "Home", Home],
  ["/skills", "Skills", BadgeCheck],
  ["/explore", "Explore", BriefcaseBusiness],
  ["/mentor", "Mentor", Sparkles],
  ["/career", "Career", Route],
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
      <Link href={role==="student"?"/explore":role==="company"?"/company":"/college"} className="searchCommand" aria-label="Explore"><Search size={15}/><span>{role==="student"?"Explore roles and opportunities…":"Open workspace…"}</span><kbd><Command size={11}/> K</kbd></Link>
      <div className="topbarRight"><span className="systemStatus"><i className={live?"pulseDot":"demoDot"}/>{live?"LIVE PROFILE":"DEMO PROFILE"}</span><Link href={role==="student"?"/profile":role==="company"?"/company":"/college"} className="iconButton" aria-label="Notifications and settings"><Bell size={16}/></Link><Link href="/profile" className="accountChip"><CircleUserRound size={17}/><span>Profile</span></Link></div>
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
    {role==="student"&&<nav className="mobileStudentNav">{mobileStudentNav.map(([href,label,Icon])=><Link href={href} className={pathname===href?"active":""} key={href}><Icon size={18}/><span>{label}</span></Link>)}</nav>}
  </div>
}
