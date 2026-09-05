"use client";
import { ProductShell } from "@/components/ProductShell";
import { useStudent, Skill, Evidence } from "@/components/StudentState";
import { getRole, ROLES } from "@/lib/student-intelligence";
import { Check, ChevronRight, RotateCcw, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

type Q={skill:string;q:string;options:string[];answer:number};
const BANK:Record<string,Q>={
 HTML:{skill:"HTML",q:"Which element is most appropriate for the main navigation links?",options:["<div>","<nav>","<span>","<section>"],answer:1},
 CSS:{skill:"CSS",q:"Which CSS layout system is designed for two-dimensional rows and columns?",options:["Float","Grid","Position absolute","Inline-block"],answer:1},
 JavaScript:{skill:"JavaScript",q:"What does Array.prototype.map() return?",options:["The same array mutated","A new transformed array","Only the first item","A boolean"],answer:1},
 Git:{skill:"Git",q:"Which command creates a new commit from staged changes?",options:["git push","git add","git commit","git clone"],answer:2},
 React:{skill:"React",q:"Which hook is used for local component state?",options:["useState","useRoute","useQuery","useClass"],answer:0},
 "Node.js":{skill:"Node.js",q:"Node.js primarily lets JavaScript run where?",options:["Only inside CSS","On the server/runtime outside the browser","Only in SQL","Only in HTML"],answer:1},
 SQL:{skill:"SQL",q:"Which clause filters rows before aggregation?",options:["WHERE","ORDER BY","SELECT","JOIN"],answer:0},
 "REST APIs":{skill:"REST APIs",q:"Which HTTP method is conventionally used to retrieve a resource?",options:["GET","POST","DELETE","PATCH"],answer:0},
 Python:{skill:"Python",q:"Which Python collection stores key-value pairs?",options:["list","tuple","dict","set only"],answer:2},
 Excel:{skill:"Excel",q:"Which feature is commonly used to summarize grouped tabular data?",options:["Pivot Table","WordArt","Slide Master","Mail Merge"],answer:0},
 Statistics:{skill:"Statistics",q:"What does the median represent?",options:["The most frequent value","The middle value when ordered","The largest value","The sum"],answer:1},
 "Power BI":{skill:"Power BI",q:"Power BI is mainly used for what?",options:["BI dashboards and data visualization","Compiling C","Version control","Web hosting"],answer:0},
 Mathematics:{skill:"Mathematics",q:"A derivative primarily describes what?",options:["Rate of change","Database schema","Encryption key","File size"],answer:0},
 "Machine Learning":{skill:"Machine Learning",q:"What is a train/test split used for?",options:["To evaluate generalization","To encrypt data","To write CSS","To host APIs"],answer:0},
 Figma:{skill:"Figma",q:"What is a reusable UI element in Figma commonly called?",options:["Component","Commit","Query","Endpoint"],answer:0},
 "UI Design":{skill:"UI Design",q:"Visual hierarchy helps users primarily by doing what?",options:["Showing importance and order","Increasing file size","Hiding navigation","Removing contrast"],answer:0},
 "UX Research":{skill:"UX Research",q:"Which activity directly gathers qualitative user feedback?",options:["User interview","Minification","Database indexing","Caching"],answer:0},
 Prototyping:{skill:"Prototyping",q:"What is a prototype mainly used to validate?",options:["Interaction and concept before full build","Database backups","DNS settings","Compiler flags"],answer:0},
 Communication:{skill:"Communication",q:"A strong technical explanation should usually start with what?",options:["The audience and goal","Maximum jargon","Unrelated details","Assumptions hidden from users"],answer:0},
};
export default function Assessment(){
 const {profile,setSkills,addAssessment}=useStudent(); const [roleName,setRoleName]=useState(profile.targetRole||ROLES[0].name); const role=getRole(roleName); const questions=useMemo(()=>Object.keys(role?.requirements||{}).map(s=>BANK[s]).filter(Boolean),[roleName]); const [answers,setAnswers]=useState<Record<number,number>>({}); const [done,setDone]=useState(false); const score=Math.round(questions.reduce((a,q,i)=>a+(answers[i]===q.answer?1:0),0)/Math.max(1,questions.length)*100);
 function submit(){if(Object.keys(answers).length<questions.length)return; const skillScores=Object.fromEntries(questions.map((q,i)=>[q.skill,answers[i]===q.answer?100:35])); addAssessment({id:String(Date.now()),role:roleName,score,skillScores,completedAt:new Date().toISOString()}); setDone(true)}
 function useResult(){const skillScores=Object.fromEntries(questions.map((q,i)=>[q.skill,answers[i]===q.answer?100:35])); setSkills(prev=>{const next=prev.map(s=>({...s,evidence:[...s.evidence]})); for(const [name,level] of Object.entries(skillScores)){const existing=next.find(s=>s.name.toLowerCase()===name.toLowerCase()); const ev:Evidence={id:`assessment-${Date.now()}-${name}`,type:"Assessment",title:`Quick ${roleName} assessment`,addedAt:new Date().toISOString(),score:level}; if(existing){existing.level=Math.max(existing.level,level);existing.evidence=[...existing.evidence,ev]}else{next.push({id:`${name.toLowerCase().replace(/\W+/g,"-")}-${Date.now()}`,name,level,evidence:[ev]} as Skill)}} return next});}
 return <ProductShell role="student" live={false}><section className="focusPage assessmentPage"><div className="focusEyebrow">QUICK SKILL ASSESSMENT</div><div className="focusTitleRow"><div><h1>Add a stronger signal than self-rating.</h1><p className="focusLead">This prototype quiz is intentionally small. It does not pretend to be a certification; it creates an assessment signal you can choose to add to your passport.</p></div><select className="roleSelect" value={roleName} onChange={e=>{setRoleName(e.target.value);setAnswers({});setDone(false)}}>{ROLES.map(r=><option key={r.id}>{r.name}</option>)}</select></div>{!done?<div className="assessmentList">{questions.map((q,i)=><article className="assessmentQuestion" key={q.skill}><div><span>{String(i+1).padStart(2,"0")}</span><b>{q.skill}</b></div><h3>{q.q}</h3><div>{q.options.map((o,j)=><button type="button" className={answers[i]===j?"selected":""} onClick={()=>setAnswers(x=>({...x,[i]:j}))} key={o}>{answers[i]===j?<Check size={15}/>:<ChevronRight size={15}/>} {o}</button>)}</div></article>)}</div>:<div className="assessmentResult"><Sparkles size={28}/><span>RESULT</span><h2>{score}%</h2><p>This score is based only on this short prototype quiz. It is not silently applied to your profile.</p><button type="button" className="heroAction" onClick={useResult}>Add assessment signals to my passport</button><button type="button" className="backLink" onClick={()=>{setDone(false);setAnswers({})}}><RotateCcw size={14}/> Retake</button></div>} {!done&&<button type="button" className="heroAction assessmentSubmit" disabled={Object.keys(answers).length<questions.length} onClick={submit}>Finish assessment <ChevronRight size={17}/></button>}</section></ProductShell>
}
