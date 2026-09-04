"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

type Role = "student" | "company" | "college";

function destination(role: Role) {
  if (role === "company") return "/company";
  if (role === "college") return "/college";
  return "/dashboard";
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("student");
  const [msg, setMsg] = useState("");
  const [sending, setSending] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => {
    const finishGoogleLogin = async () => {
      if (new URLSearchParams(window.location.search).get("oauth") !== "1") return;

      setMsg("Finishing Google sign-in...");
      const s = supabase();
      const { data: { user }, error } = await s.auth.getUser();

      if (error || !user) {
        setMsg(error?.message || "Google sign-in could not be completed. Please try again.");
        return;
      }

      const savedRole = (localStorage.getItem("skillbridge_oauth_role") || "student") as Role;
      const safeRole: Role = ["student", "company", "college"].includes(savedRole) ? savedRole : "student";
      const fullName = user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split("@")[0] || "SkillBridge User";

      const { error: profileError } = await s
        .from("profiles")
        .update({ role: safeRole, full_name: fullName })
        .eq("id", user.id);

      if (profileError) {
        setMsg(`Signed in with Google, but profile setup needs attention: ${profileError.message}`);
        return;
      }

      localStorage.removeItem("skillbridge_oauth_role");
      window.location.replace(destination(safeRole));
    };

    finishGoogleLogin();
  }, []);

  async function google() {
    if (googleLoading) return;
    setGoogleLoading(true);
    setMsg("Opening Google sign-in...");

    const s = supabase();
    localStorage.setItem("skillbridge_oauth_role", role);

    const { error } = await s.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/login?oauth=1`
      }
    });

    if (error) {
      setMsg(
        error.message.toLowerCase().includes("provider")
          ? "Google login is not enabled in Supabase yet. Enable the Google provider, then this button will work."
          : error.message
      );
      setGoogleLoading(false);
    }
  }

  async function magic() {
    if (sending) return;
    const s = supabase();
    if (!email.trim()) return setMsg("Enter your email first.");

    setSending(true);
    setMsg("Sending secure login link...");

    const { error } = await s.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}${destination(role)}`,
        data: { role, full_name: email.split("@")[0] }
      }
    });

    if (error) {
      setMsg(
        error.message.toLowerCase().includes("rate limit")
          ? "Email login is temporarily rate-limited. Use Google or Instant Demo Access below."
          : error.message
      );
      setSending(false);
      return;
    }

    setMsg("Magic login link sent. Check your email. Google sign-in is usually faster during high traffic.");
    setTimeout(() => setSending(false), 60000);
  }

  function demoAccess() {
    sessionStorage.setItem("skillbridge_demo_role", role);
    window.location.href = destination(role);
  }

  return <div className="wrap">
    <nav className="nav">
      <Link className="brand" href="/">◈ SkillBridge AI</Link>
    </nav>

    <section className="section">
      <div className="card" style={{maxWidth:480,margin:"40px auto"}}>
        <span className="tag">Google + Supabase Auth + SIH Demo Access</span>
        <h1>Login / Sign up</h1>
        <p className="muted">Google is the recommended high-traffic login. Email magic links remain available as a fallback.</p>

        <label className="muted">Role</label>
        <select value={role} onChange={e=>setRole(e.target.value as Role)}
          style={{width:"100%",padding:13,borderRadius:12,border:"1px solid #29405a",background:"#07111f",color:"white",margin:"8px 0 12px"}}>
          <option value="student">Student</option>
          <option value="company">Company / Recruiter</option>
          <option value="college">College / Admin</option>
        </select>

        <button className="btn primary" disabled={googleLoading} onClick={google}
          style={{width:"100%",marginTop:4,opacity:googleLoading?.7:1}}>
          {googleLoading ? "Opening Google..." : "G  Continue with Google"}
        </button>

        <div style={{display:"flex",alignItems:"center",gap:10,margin:"18px 0"}}>
          <div style={{height:1,background:"#29405a",flex:1}} />
          <span className="muted" style={{fontSize:12}}>OR EMAIL</span>
          <div style={{height:1,background:"#29405a",flex:1}} />
        </div>

        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"
          style={{width:"100%",padding:13,borderRadius:12,border:"1px solid #29405a",background:"#07111f",color:"white"}} />

        <button className="btn" disabled={sending} onClick={magic} style={{width:"100%",marginTop:12,opacity:sending?.7:1}}>
          {sending ? "Login link requested" : "Send Magic Link"}
        </button>

        <div style={{display:"flex",alignItems:"center",gap:10,margin:"18px 0"}}>
          <div style={{height:1,background:"#29405a",flex:1}} />
          <span className="muted" style={{fontSize:12}}>SIH DEMO</span>
          <div style={{height:1,background:"#29405a",flex:1}} />
        </div>

        <button className="btn" onClick={demoAccess} style={{width:"100%",border:"1px solid #43d9ff",background:"rgba(67,217,255,.08)"}}>
          ⚡ Instant Demo Access — No Email Needed
        </button>
        <p className="muted" style={{fontSize:12,textAlign:"center",marginTop:8}}>
          Demo access avoids email-provider limits during judging. Real protected actions still require a Supabase session.
        </p>

        {msg && <p className="muted">{msg}</p>}
      </div>
    </section>
  </div>;
}
