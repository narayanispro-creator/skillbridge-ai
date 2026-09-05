"use client";
import { ProductShell } from "@/components/ProductShell";
import { BadgeCheck, ChevronRight, FileUp, Plus, ShieldCheck } from "lucide-react";
const skills=[
 {name:"HTML",level:90,state:"Verified",proof:"2 proofs",tone:"strong"},
 {name:"CSS",level:82,state:"Verified",proof:"2 proofs",tone:"strong"},
 {name:"JavaScript",level:52,state:"Developing",proof:"1 proof",tone:"mid"},
 {name:"Git",level:34,state:"Developing",proof:"No proof yet",tone:"mid"},
 {name:"React",level:20,state:"Starting",proof:"No proof yet",tone:"low"},
];
export default function Skills(){return <ProductShell role="student" live={false}><section className="focusPage">
  <div className="focusEyebrow">LIVING SKILL PASSPORT</div><div className="focusTitleRow"><div><h1>What you can actually prove.</h1><p className="focusLead">Not a long resume. A living record of skills, evidence and progress.</p></div><button className="softAction"><Plus size={15}/> Add skill</button></div>
  <div className="passportSummary"><div><BadgeCheck size={19}/><span><b>2 verified skills</b><small>Evidence attached and ready to show recruiters</small></span></div><div><ShieldCheck size={19}/><span><b>3 developing skills</b><small>Build proof before calling them job-ready</small></span></div></div>
  <div className="skillPassportList">{skills.map(s=><button className="passportSkill" key={s.name}><div className={`skillOrb ${s.tone}`}>{s.name.slice(0,2)}</div><div className="passportSkillMain"><div><b>{s.name}</b><span className={`skillState ${s.tone}`}>{s.state}</span></div><div className="passportBar"><i style={{width:`${s.level}%`}}/></div><small>{s.level}% proficiency · {s.proof}</small></div><ChevronRight size={18}/></button>)}</div>
  <div className="singleCTA"><FileUp size={18}/><div><b>Add proof to Git</b><p>A repository, certificate or project can turn a claimed skill into evidence.</p></div><button className="softAction">Add evidence</button></div>
</section></ProductShell>}
