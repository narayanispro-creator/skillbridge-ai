"use client";
import { ProductShell } from "@/components/ProductShell";
import { ArrowUpRight, Bookmark, CheckCircle2, MapPin, Sparkles, TriangleAlert } from "lucide-react";
const ops=[
 {role:"Frontend Developer Intern",company:"Nova Labs",loc:"Remote",match:82,good:["HTML & CSS clear the role threshold","JavaScript is usable for the core tasks"],gap:"React is the main missing skill",stipend:"₹12k–18k / month"},
 {role:"Web Platform Intern",company:"Vertex Digital",loc:"Gurugram · Hybrid",match:74,good:["Strong UI foundations","Communication profile fits"],gap:"Git workflow needs more evidence",stipend:"₹10k–16k / month"},
 {role:"UI Engineering Intern",company:"Orbit Systems",loc:"Bengaluru · Hybrid",match:69,good:["CSS is a strong match","HTML is above threshold"],gap:"React proficiency is below requirement",stipend:"₹15k–22k / month"},
];
export default function Explore(){return <ProductShell role="student" live={false}><section className="focusPage">
 <div className="focusEyebrow">EXPLORE OPPORTUNITIES</div><div className="focusTitleRow"><div><h1>Apply where your skills make sense.</h1><p className="focusLead">Every opportunity shows why you match and what is holding the score back.</p></div><div className="filterTabs"><button className="active">For you</button><button>Saved</button><button>Applied</button></div></div>
 <div className="opportunityFeed">{ops.map((o,i)=><article className="exploreCard" key={o.role}><div className="exploreTop"><div className="companyMark">{o.company[0]}</div><div className="exploreTitle"><h2>{o.role}</h2><p>{o.company} · <MapPin size={12}/> {o.loc}</p></div><div className="matchBadge"><b>{o.match}%</b><span>match</span></div></div><div className="matchExplanation"><div><span className="whyLabel"><Sparkles size={13}/> WHY YOU MATCH</span>{o.good.map(x=><p key={x}><CheckCircle2 size={14}/>{x}</p>)}</div><div className="gapReason"><span><TriangleAlert size={13}/> WHAT'S HOLDING YOU BACK</span><p>{o.gap}</p></div></div><div className="exploreFoot"><span>{o.stipend}</span><div><button className="saveBtn"><Bookmark size={15}/></button><button className="applyBtn">View role <ArrowUpRight size={14}/></button></div></div></article>)}</div>
 </section></ProductShell>}
