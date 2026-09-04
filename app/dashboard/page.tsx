"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type SkillRow = { id:number; name:string };
type StudentSkill = { skill_id:number; level:number; evidence_url?:string|null };
type RoleSkill = { skill_id:number; required_level:number; weight:number|string };

const fallbackSkills = [
  {name:"HTML",level:90},{name:"CSS",level:82},{name:"JavaScript",level:52},{name:"React",level:20},{name:"Git",level:34}
];

export default function Dashboard(){
  const s = useMemo(()=>supabase(),[]);
  const [userId,setUserId]=useState<string|null>(null);
  const [skills,setSkills]=useState<SkillRow[]>([]);
  const [levels,setLevels]=useState<Record<number,number>>({});
  const [roleSkills,setRoleSkills]=useState<RoleSkill[]>([]);
  const [roleTitle,setRoleTitle]=useState("Front-End Developer");
  const [msg,setMsg]=useState("");
  const [loading,setLoading]=useState(true);

  useEffect(()=>{ (async()=>{
    if(!s){ setLoading(false); return; }
    const {data:{user}} = await s.auth.getUser();
    setUserId(user?.id ?? null);

    const {data:skillData} = await s.from("skills").select("id,name").order("id");
    const allSkills = (skillData || []) as SkillRow[];
    setSkills(allSkills);

    const {data:role} = await s.from("job_roles").select("id,title").eq("title",roleTitle).single();
    if(role){
      const {data:reqs} = await s.from("role_skills").select("skill_id,required_level,weight").eq("role_id",role.id);
      setRoleSkills((reqs || []) as RoleSkill[]);
    }

    if(user){
      const {data:ss} = await s.from("student_skills").select("skill_id,level,evidence_url").eq("student_id",user.id);
      const map:Record<number,number>={};
      (ss || []).forEach((r:StudentSkill)=>map[r.skill_id]=r.level);
      setLevels(map);
    } else {
      const map:Record<number,number>={};
      allSkills.forEach(sk=>{
        const f=fallbackSkills.find(x=>x.name===sk.name);
        if(f) map[sk.id]=f.level;
      });
      setLevels(map);
    }
    setLoading(false);
  })(); },[s,roleTitle]);

  const match = useMemo(()=>{
    if(!roleSkills.length) return 0;
    let weighted=0,total=0;
    roleSkills.forEach(r=>{
      const w=Number(r.weight)||1, have=levels[r.skill_id]||0;
      weighted += Math.min(have/r.required_level,1)*w; total += w;
    });
    const fit = total ? weighted/total*100 : 0;
    return Math.round(fit*.7 + 70*.1 + 80*.1 + 75*.1);
  },[roleSkills,levels]);

  const gaps = useMemo(()=>roleSkills.map(r=>({
    ...r, name: skills.find(s=>s.id===r.skill_id)?.name || "Skill",
    have: levels[r.skill_id]||0, gap: Math.max(0,r.required_level-(levels[r.skill_id]||0))
  })).filter(g=>g.gap>0).sort((a,b)=>b.gap-a.gap),[roleSkills,levels,skills]);

  async function saveSkills(){
    if(!s || !userId){ setMsg("Login first to save your real Skill Passport."); return; }
    const rows=Object.entries(levels).map(([skill_id,level])=>({student_id:userId,skill_id:Number(skill_id),level}));
    const {error}=await s.from("student_skills").upsert(rows,{onConflict:"student_id,skill_id"});
    setMsg(error?.message || "Skill Passport saved to Supabase ✓");
  }

  async function uploadEvidence(file:File, skillId:number){
    if(!s || !userId){ setMsg("Login first to upload evidence."); return; }
    const path=`${userId}/${skillId}-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g,"_")}`;
    const {error}=await s.storage.from("evidence").upload(path,file);
    if(error) return setMsg(error.message);
    await s.from("student_skills").upsert({student_id:userId,skill_id:skillId,level:levels[skillId]||0,evidence_url:path},{onConflict:"student_id,skill_id"});
    setMsg("Evidence uploaded securely ✓");
  }

  return <div className="wrap">
    <nav className="nav">
      <Link className="brand" href="/">◈ SkillBridge AI</Link>
      <span className="tag">{userId ? "LIVE DATABASE" : "DEMO MODE"}</span>
    </nav>

    <section className="section">
      <div className="top">
        <div><h1>Student Skill Passport</h1><p className="muted">Target role: {roleTitle}</p></div>
        <div className="card"><small>Explainable Match</small><div className="metric">{loading ? "..." : match+"%"}</div></div>
      </div>

      <div className="two">
        <div className="card">
          <h2>Your Skills</h2>
          {skills.length===0 && <p className="muted">Login to load live skills, or use the demo from the landing page.</p>}
          {skills.map(sk=><div key={sk.id} style={{margin:"18px 0"}}>
            <div className="top"><span>{sk.name}</span><b>{levels[sk.id]||0}%</b></div>
            <input type="range" min="0" max="100" value={levels[sk.id]||0}
              onChange={e=>setLevels(v=>({...v,[sk.id]:Number(e.target.value)}))}
              style={{width:"100%"}} />
            <input type="file" accept=".pdf,image/png,image/jpeg"
              onChange={e=>e.target.files?.[0] && uploadEvidence(e.target.files[0],sk.id)}
              style={{marginTop:8}} />
          </div>)}
          <button className="btn primary" onClick={saveSkills}>Save Skill Passport</button>
          {msg && <p className="muted">{msg}</p>}
        </div>

        <div className="card">
          <h2>Gap → Learning Roadmap</h2>
          {gaps.slice(0,5).map((g,i)=><div className="card" key={g.skill_id} style={{marginTop:10}}>
            <b>{i+1}. {g.name}</b>
            <p className="muted">You: {g.have}% • Role needs: {g.required_level}% • Gap: {g.gap}%</p>
          </div>)}

          <h3 style={{marginTop:24}}>Recommended opportunity</h3>
          <div className="card">
            <span className="tag">{match}% MATCH</span>
            <h3>Front-End Intern</h3>
            <p className="muted">
              Score comes from weighted role-skill fit plus readiness factors. AI can explain the result, but it does not control the score.
            </p>
            <button className="btn primary">Apply & Track</button>
          </div>
        </div>
      </div>
    </section>
  </div>;
}
