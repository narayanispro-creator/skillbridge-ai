export type Skill={name:string,level:number}; export type Required={name:string,level:number,weight?:number};
export function calculateMatch(student:Skill[],required:Required[]){
 const map=new Map(student.map(s=>[s.name.toLowerCase(),s.level]));
 let weighted=0,total=0; const gaps:any[]=[];
 required.forEach(r=>{const w=r.weight??1; const have=map.get(r.name.toLowerCase())??0; weighted+=Math.min(have/r.level,1)*w; total+=w; if(have<r.level) gaps.push({skill:r.name,have,need:r.level,gap:r.level-have})});
 const skillFit=Math.round((weighted/total)*100);
 const score=Math.round(skillFit*.7+70*.1+80*.1+75*.1);
 return {score,skillFit,gaps:gaps.sort((a,b)=>b.gap-a.gap)};
}