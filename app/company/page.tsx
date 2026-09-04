"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function Company(){
  const s=useMemo(()=>supabase(),[]);
  const [userId,setUserId]=useState<string|null>(null);
  const [title,setTitle]=useState("Front-End Intern");
  const [location,setLocation]=useState("Remote");
  const [items,setItems]=useState<any[]>([]);
  const [msg,setMsg]=useState("");

  async function load(){
    if(!s)return;
    const {data:{user}}=await s.auth.getUser();
    setUserId(user?.id??null);
    const {data}=await s.from("internships").select("id,title,location,active,created_at").order("created_at",{ascending:false});
    setItems(data||[]);
  }
  useEffect(()=>{load()},[]);

  async function post(){
    if(!s||!userId)return setMsg("Login as a company first.");
    const {error}=await s.from("internships").insert({company_id:userId,title,location,description:"Posted from SkillBridge AI recruiter dashboard"});
    setMsg(error?.message||"Internship posted ✓");
    if(!error)load();
  }

  return <div className="wrap">
    <nav className="nav"><Link className="brand" href="/">◈ SkillBridge AI</Link><span className="tag">Industry Portal</span></nav>
    <section className="section">
      <h1>Post opportunities. Match by skills.</h1>
      <div className="two">
        <div className="card">
          <h2>Post Internship</h2>
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Role title"
            style={{width:"100%",padding:12,margin:"8px 0",borderRadius:10,background:"#07111f",color:"white",border:"1px solid #29405a"}}/>
          <input value={location} onChange={e=>setLocation(e.target.value)} placeholder="Location"
            style={{width:"100%",padding:12,margin:"8px 0",borderRadius:10,background:"#07111f",color:"white",border:"1px solid #29405a"}}/>
          <button className="btn primary" onClick={post}>+ Post Internship</button>
          {msg&&<p className="muted">{msg}</p>}
        </div>
        <div className="card">
          <h2>Live Opportunities</h2>
          {items.map(i=><div className="card" key={i.id} style={{marginTop:10}}>
            <b>{i.title}</b><p className="muted">{i.location||"Location not set"} • {i.active?"Active":"Closed"}</p>
          </div>)}
          {!items.length&&<p className="muted">No live internships yet.</p>}
        </div>
      </div>
    </section>
  </div>;
}
