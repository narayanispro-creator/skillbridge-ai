"use client";
import Link from "next/link";
import { ProductShell } from "@/components/ProductShell";
import { ChevronRight, LogIn, Settings, ShieldCheck, UserRound } from "lucide-react";
export default function Profile(){return <ProductShell role="student" live={false}><section className="focusPage profileFocus">
 <div className="focusEyebrow">PROFILE</div><div className="profileHero"><div className="profileAvatar">N</div><div><h1>Narayan</h1><p>B.Tech CSE · Student</p><span>Target: Front-End Developer</span></div></div>
 <div className="profileGroup"><button><UserRound size={18}/><span><b>Personal information</b><small>Name, course and career preferences</small></span><ChevronRight size={17}/></button><button><ShieldCheck size={18}/><span><b>Privacy & evidence visibility</b><small>Control what recruiters can see</small></span><ChevronRight size={17}/></button><button><Settings size={18}/><span><b>Preferences</b><small>Work mode, location and availability</small></span><ChevronRight size={17}/></button></div>
 <Link href="/login" className="profileLogin"><LogIn size={17}/> Sign in to sync your real Skill Passport</Link>
 </section></ProductShell>}
