import type { Skill, StudentProfile } from "@/components/StudentState";

export type RoleDefinition={id:string;name:string;description:string;requirements:Record<string,number>};
export const ROLES:RoleDefinition[]=[
 {id:"frontend",name:"Front-End Developer",description:"Build accessible, responsive web interfaces.",requirements:{HTML:80,CSS:75,JavaScript:80,Git:60,React:70}},
 {id:"fullstack",name:"Full-Stack Developer",description:"Work across browser, server and database layers.",requirements:{HTML:70,CSS:65,JavaScript:80,React:65,"Node.js":70,SQL:60,Git:60}},
 {id:"backend",name:"Backend Developer",description:"Design APIs, data flows and server-side systems.",requirements:{JavaScript:65,"Node.js":75,SQL:70,Git:60,"REST APIs":70}},
 {id:"data",name:"Data Analyst",description:"Turn datasets into clear decisions and reports.",requirements:{Python:65,SQL:70,Excel:70,Statistics:60,"Power BI":60}},
 {id:"ml",name:"AI / ML Engineer",description:"Build, evaluate and deploy machine-learning systems.",requirements:{Python:80,Mathematics:70,Statistics:70,"Machine Learning":75,Git:55}},
 {id:"uiux",name:"UI / UX Designer",description:"Research, design and validate user experiences.",requirements:{Figma:80,"UI Design":75,"UX Research":65,Prototyping:70,Communication:65}},
];

export const getRole=(name:string)=>ROLES.find(r=>r.name===name);
const levelMap=(skills:Skill[])=>Object.fromEntries(skills.map(s=>[s.name.toLowerCase(),s.level]));
const skillMap=(skills:Skill[])=>Object.fromEntries(skills.map(s=>[s.name.toLowerCase(),s]));

export function roleReadiness(skills:Skill[],role?:RoleDefinition){
 if(!role||!skills.length)return 0;
 const map=levelMap(skills), req=Object.entries(role.requirements);
 return Math.round(req.reduce((a,[name,target])=>a+Math.min((map[name.toLowerCase()]||0)/target,1),0)/req.length*100);
}

export function evidenceConfidence(skill:Skill){
 const count=skill.evidence.length;if(!count)return 0;
 const hasAssessment=skill.evidence.some(e=>e.type==="Assessment");
 const hasProject=skill.evidence.some(e=>e.type==="Project"||e.type==="Repository");
 return Math.min(100,(hasAssessment?45:0)+(hasProject?30:0)+Math.min(25,count*10));
}

export function roleEvidenceCoverage(skills:Skill[],role?:RoleDefinition){
 if(!role)return 0;
 const sm=skillMap(skills);const names=Object.keys(role.requirements);if(!names.length)return 0;
 return Math.round(names.reduce((sum,name)=>sum+(sm[name.toLowerCase()]?evidenceConfidence(sm[name.toLowerCase()]):0),0)/names.length);
}

export function gapsForRole(skills:Skill[],role?:RoleDefinition){
 if(!role)return [];
 const map=levelMap(skills);
 return Object.entries(role.requirements)
  .map(([name,target])=>({name,target,current:map[name.toLowerCase()]||0,gap:Math.max(0,target-(map[name.toLowerCase()]||0))}))
  .filter(x=>x.gap>0)
  .sort((a,b)=>(b.gap/b.target)-(a.gap/a.target));
}

export function roleFitRows(skills:Skill[],role?:RoleDefinition){
 if(!role)return [];
 const sm=skillMap(skills);
 return Object.entries(role.requirements).map(([name,target])=>{
  const skill=sm[name.toLowerCase()];const current=skill?.level||0;const proof=skill?evidenceConfidence(skill):0;
  return {name,target,current,proof,gap:Math.max(0,target-current),coverage:Math.round(Math.min(current/target,1)*100)};
 });
}

export function roleAlternatives(skills:Skill[]){
 return ROLES.map(role=>({role,readiness:roleReadiness(skills,role),evidence:roleEvidenceCoverage(skills,role)})).sort((a,b)=>b.readiness-a.readiness);
}

export type Opportunity={id:string;role:string;company:string;loc:string;mode:"Remote"|"Hybrid"|"On-site";stipend:string;requirements:Record<string,number>;description:string};
export const OPPORTUNITIES:Opportunity[]=[
 {id:"nova-fe",role:"Frontend Developer Intern",company:"Nova Labs",loc:"Remote",mode:"Remote",stipend:"₹12k–18k / month",description:"Sample listing: build responsive product interfaces with a small frontend team.",requirements:{HTML:75,CSS:70,JavaScript:65,React:50,Git:45}},
 {id:"vertex-web",role:"Web Platform Intern",company:"Vertex Digital",loc:"Gurugram",mode:"Hybrid",stipend:"₹10k–16k / month",description:"Sample listing: support web-platform features, fixes and internal tools.",requirements:{HTML:65,CSS:60,JavaScript:70,Git:55,Communication:50}},
 {id:"orbit-ui",role:"UI Engineering Intern",company:"Orbit Systems",loc:"Bengaluru",mode:"Hybrid",stipend:"₹15k–22k / month",description:"Sample listing: turn design-system components into production UI.",requirements:{HTML:70,CSS:80,JavaScript:60,React:65,Figma:45}},
 {id:"byte-backend",role:"Backend Engineering Intern",company:"ByteWorks",loc:"Pune",mode:"Hybrid",stipend:"₹14k–20k / month",description:"Sample listing: build APIs and database-backed services.",requirements:{JavaScript:60,"Node.js":65,SQL:60,Git:50,"REST APIs":55}},
 {id:"insight-data",role:"Data Analyst Intern",company:"InsightArc",loc:"Remote",mode:"Remote",stipend:"₹10k–15k / month",description:"Sample listing: clean data, write SQL and prepare operational dashboards.",requirements:{Python:50,SQL:65,Excel:65,Statistics:45}},
];

export function opportunityScoreBreakdown(skills:Skill[],profile:StudentProfile,op:Opportunity){
 if(!skills.length)return {skillFit:0,proficiency:0,roleInterest:0,availability:0,learningReadiness:0,total:0};
 const map=levelMap(skills), req=Object.entries(op.requirements);
 const skillFit=req.reduce((a,[n,t])=>a+Math.min((map[n.toLowerCase()]||0)/t,1),0)/req.length*100;
 const proficiency=req.reduce((a,[n])=>a+(map[n.toLowerCase()]||0),0)/req.length;
 const target=getRole(profile.targetRole);
 const overlap=target?Object.keys(target.requirements).filter(k=>k in op.requirements).length/Math.max(1,Object.keys(op.requirements).length)*100:0;
 const availability=profile.availability==="Not available"?0:profile.onboardingComplete?100:0;
 const learningReadiness=skillFit;
 const total=Math.round(.45*skillFit+.20*proficiency+.15*overlap+.10*availability+.10*learningReadiness);
 return {skillFit:Math.round(skillFit),proficiency:Math.round(proficiency),roleInterest:Math.round(overlap),availability:Math.round(availability),learningReadiness:Math.round(learningReadiness),total};
}

export function opportunityScore(skills:Skill[],profile:StudentProfile,op:Opportunity){
 return opportunityScoreBreakdown(skills,profile,op).total;
}

export function opportunityReasons(skills:Skill[],op:Opportunity){
 const map=levelMap(skills);const rows=Object.entries(op.requirements).map(([name,target])=>({name,target,current:map[name.toLowerCase()]||0}));
 const good=rows.filter(x=>x.current>=x.target).sort((a,b)=>b.current-a.current).slice(0,3).map(x=>`${x.name} meets the requested level`);
 const gaps=rows.filter(x=>x.current<x.target).sort((a,b)=>(b.target-b.current)-(a.target-a.current));
 return {good,gaps:gaps.slice(0,3),gap:gaps[0]?`${gaps[0].name} is ${gaps[0].target-gaps[0].current} points below the requested level`:"No major configured skill gap detected"};
}

export function nextBestAction(skills:Skill[],profile:StudentProfile){
 const role=getRole(profile.targetRole);if(!profile.onboardingComplete)return {kind:"setup",title:"Set your target role",body:"SkillBridge needs one target before it can calculate anything meaningful.",href:"/onboarding"};
 if(!skills.length)return {kind:"skill",title:"Add the first skill you have actually learned",body:"Your passport starts empty on purpose. Add one real skill to unlock the rest of the journey.",href:"/skills"};
 const gaps=gapsForRole(skills,role);if(gaps[0])return {kind:"gap",title:`Close your ${gaps[0].name} gap`,body:`You are at ${gaps[0].current}% against a ${gaps[0].target}% target. Improve this skill first for the biggest readiness gain.`,href:`/skills?skill=${encodeURIComponent(gaps[0].name)}`};
 return {kind:"opportunity",title:"Your configured role gaps are covered",body:"Shift from learning to proving: attach evidence and review opportunities where your skills already fit.",href:"/explore"};
}

export function allSkillNames(){return Array.from(new Set(ROLES.flatMap(r=>Object.keys(r.requirements)))).sort()}
