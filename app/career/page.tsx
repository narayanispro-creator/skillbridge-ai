"use client";
import { ProductShell } from "@/components/ProductShell";
import { ArrowRight, Check, Circle, LockKeyhole, Route, Target } from "lucide-react";
const path=[
 {name:"JavaScript foundations",sub:"52% → target 80%",status:"now",time:"7 days"},
 {name:"Git workflow",sub:"34% → target 65%",status:"next",time:"3 days"},
 {name:"React fundamentals",sub:"20% → target 70%",status:"locked",time:"10 days"},
 {name:"Deploy one complete project",sub:"Proof-of-work milestone",status:"locked",time:"2 days"},
];
export default function Career(){return <ProductShell role="student" live={false}><section className="focusPage">
 <div className="focusEyebrow">CAREER PATH</div><div className="careerHero"><div><span className="roleChip">TARGET ROLE</span><h1>Front-End Developer</h1><p className="focusLead">You do not need to learn everything. You need to close the right gaps in the right order.</p></div><div className="careerReadiness"><b>56%</b><span>ready today</span></div></div>
 <div className="careerReason"><Target size={18}/><div><b>Why only 56%?</b><p>Your HTML and CSS are strong. JavaScript, Git and React are below the role thresholds, so they limit your readiness more than adding another design skill would.</p></div></div>
 <div className="pathHeader"><div><Route size={18}/><span><b>Shortest path</b><small>SkillBridge prioritizes the sequence with the highest readiness impact.</small></span></div><span>~22 focused days</span></div>
 <div className="careerPath">{path.map((p,i)=><div className={`pathStep ${p.status}`} key={p.name}><div className="pathMarker">{p.status==="now"?<ArrowRight size={16}/>:p.status==="next"?<Circle size={14}/>:<LockKeyhole size={14}/>}</div><div className="pathCopy"><span>0{i+1}</span><b>{p.name}</b><small>{p.sub}</small></div><em>{p.time}</em>{p.status==="now"&&<button>Start</button>}</div>)}</div>
 </section></ProductShell>}
