"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

export type Evidence = {
  id:string;
  type:"Project"|"Certificate"|"Repository"|"Assessment"|"Other";
  title:string;
  url?:string;
  addedAt:string;
  score?:number;
};
export type Skill = { id:string; name:string; level:number; evidence:Evidence[] };
export type StudentProfile = {
  name:string;
  course:string;
  department:string;
  targetRole:string;
  location:string;
  workMode:"Remote"|"Hybrid"|"On-site"|"Any";
  availability:"Available now"|"Within 30 days"|"Not available";
  evidenceVisibility:"Recruiters"|"Only me"|"Public";
  recruiterContact:boolean;
  notifications:boolean;
  onboardingComplete:boolean;
};
export type AssessmentResult={id:string;role:string;score:number;skillScores:Record<string,number>;completedAt:string};
export type Activity={id:string;type:string;label:string;at:string};

type StudentStateValue = {
  skills:Skill[]; setSkills:(v:Skill[]|((x:Skill[])=>Skill[]))=>void;
  profile:StudentProfile; setProfile:(v:StudentProfile|((x:StudentProfile)=>StudentProfile))=>void;
  saved:string[]; toggleSaved:(id:string)=>void;
  applied:string[]; apply:(id:string)=>void;
  startedSteps:string[]; startStep:(id:string)=>void;
  completedSteps:string[]; completeStep:(id:string)=>void;
  assessments:AssessmentResult[]; addAssessment:(r:AssessmentResult)=>void;
  activity:Activity[]; addActivity:(type:string,label:string)=>void;
  hydrated:boolean; resetAll:()=>void; loadJudgeDemo:()=>void;
};

const DEFAULT_PROFILE:StudentProfile={
  name:"", course:"", department:"", targetRole:"", location:"",
  workMode:"Any", availability:"Available now", evidenceVisibility:"Recruiters",
  recruiterContact:true, notifications:true, onboardingComplete:false,
};
const KEY="skillbridge-student-state-v6";
const Ctx=createContext<StudentStateValue|null>(null);

export function StudentStateProvider({children}:{children:ReactNode}){
  const [skills,setSkills]=useState<Skill[]>([]);
  const [profile,setProfile]=useState<StudentProfile>(DEFAULT_PROFILE);
  const [saved,setSaved]=useState<string[]>([]);
  const [applied,setApplied]=useState<string[]>([]);
  const [startedSteps,setStartedSteps]=useState<string[]>([]);
  const [completedSteps,setCompletedSteps]=useState<string[]>([]);
  const [assessments,setAssessments]=useState<AssessmentResult[]>([]);
  const [activity,setActivity]=useState<Activity[]>([]);
  const [hydrated,setHydrated]=useState(false);

  useEffect(()=>{
    try{
      const raw=localStorage.getItem(KEY);
      if(raw){
        const data=JSON.parse(raw);
        setSkills(Array.isArray(data.skills)?data.skills:[]);
        setProfile({...DEFAULT_PROFILE,...(data.profile||{})});
        setSaved(Array.isArray(data.saved)?data.saved:[]);
        setApplied(Array.isArray(data.applied)?data.applied:[]);
        setStartedSteps(Array.isArray(data.startedSteps)?data.startedSteps:[]);
        setCompletedSteps(Array.isArray(data.completedSteps)?data.completedSteps:[]);
        setAssessments(Array.isArray(data.assessments)?data.assessments:[]);
        setActivity(Array.isArray(data.activity)?data.activity:[]);
      }
    }catch{}
    setHydrated(true);
  },[]);

  useEffect(()=>{
    if(!hydrated)return;
    localStorage.setItem(KEY,JSON.stringify({skills,profile,saved,applied,startedSteps,completedSteps,assessments,activity}));
  },[skills,profile,saved,applied,startedSteps,completedSteps,assessments,activity,hydrated]);

  const addActivity=(type:string,label:string)=>setActivity(x=>[{id:String(Date.now()),type,label,at:new Date().toISOString()},...x].slice(0,30));
  const value=useMemo<StudentStateValue>(()=>({
    skills,setSkills,profile,setProfile,saved,applied,startedSteps,completedSteps,assessments,activity,hydrated,
    toggleSaved:(id)=>setSaved(x=>x.includes(id)?x.filter(v=>v!==id):[...x,id]),
    apply:(id)=>{setApplied(x=>x.includes(id)?x:[...x,id]);addActivity("application","Applied to a sample opportunity");},
    startStep:(id)=>{setStartedSteps(x=>x.includes(id)?x:[...x,id]);},
    completeStep:(id)=>{setCompletedSteps(x=>x.includes(id)?x:[...x,id]);},
    addAssessment:(r)=>{setAssessments(x=>[r,...x]);addActivity("assessment",`Completed ${r.role} assessment (${r.score}%)`);},
    addActivity,
    resetAll:()=>{
      setSkills([]);setProfile(DEFAULT_PROFILE);setSaved([]);setApplied([]);setStartedSteps([]);setCompletedSteps([]);setAssessments([]);setActivity([]);localStorage.removeItem(KEY)
    },
    loadJudgeDemo:()=>{
      const now=new Date().toISOString();
      setProfile({name:"Aarav Demo",course:"B.Tech CSE",department:"Computer Science",targetRole:"Front-End Developer",location:"Roorkee",workMode:"Any",availability:"Available now",evidenceVisibility:"Recruiters",recruiterContact:true,notifications:true,onboardingComplete:true});
      setSkills([
        {id:"demo-html",name:"HTML",level:88,evidence:[{id:"ev-html",type:"Project",title:"Accessible portfolio UI",url:"https://example.com",addedAt:now}]},
        {id:"demo-css",name:"CSS",level:82,evidence:[{id:"ev-css",type:"Repository",title:"Responsive design system",url:"https://github.com",addedAt:now}]},
        {id:"demo-js",name:"JavaScript",level:58,evidence:[{id:"ev-js",type:"Assessment",title:"SkillBridge quick assessment",addedAt:now,score:68}]},
        {id:"demo-git",name:"Git",level:46,evidence:[]},
        {id:"demo-react",name:"React",level:28,evidence:[]},
      ]);
      setSaved(["nova-fe"]);setApplied([]);setStartedSteps([]);setCompletedSteps([]);
      setAssessments([{id:"demo-assessment",role:"Front-End Developer",score:68,skillScores:{HTML:100,CSS:100,JavaScript:68,Git:45,React:35},completedAt:now}]);
      setActivity([{id:"demo-1",type:"demo",label:"Loaded fictional SIH judge demo profile",at:now}]);
    },
  }),[skills,profile,saved,applied,startedSteps,completedSteps,assessments,activity,hydrated]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export function useStudent(){const x=useContext(Ctx);if(!x)throw new Error("useStudent must be inside StudentStateProvider");return x}
