"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"student"|"company"|"college">("student");
  const [msg, setMsg] = useState("");

  async function magic() {
    const s = supabase();
    if (!s) return setMsg("Supabase is not configured.");
    if (!email.trim()) return setMsg("Enter your email first.");

    const { error } = await s.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${location.origin}/dashboard`,
        data: { role, full_name: email.split("@")[0] }
      }
    });

    setMsg(error?.message || "Magic login link sent. Check your email.");
  }

  return <div className="wrap">
    <nav className="nav">
      <Link className="brand" href="/">◈ SkillBridge AI</Link>
    </nav>

    <section className="section">
      <div className="card" style={{maxWidth:480,margin:"40px auto"}}>
        <span className="tag">Real Supabase Auth</span>
        <h1>Login / Sign up</h1>
        <p className="muted">Choose your role and receive a secure magic link.</p>

        <label className="muted">Role</label>
        <select value={role} onChange={e=>setRole(e.target.value as any)}
          style={{width:"100%",padding:13,borderRadius:12,border:"1px solid #29405a",background:"#07111f",color:"white",margin:"8px 0 12px"}}>
          <option value="student">Student</option>
          <option value="company">Company / Recruiter</option>
          <option value="college">College / Admin</option>
        </select>

        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"
          style={{width:"100%",padding:13,borderRadius:12,border:"1px solid #29405a",background:"#07111f",color:"white"}} />

        <button className="btn primary" onClick={magic} style={{width:"100%",marginTop:12}}>
          Send Magic Link
        </button>
        {msg && <p className="muted">{msg}</p>}
      </div>
    </section>
  </div>;
}
