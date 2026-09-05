"use client";

import { ProductShell } from "@/components/ProductShell";
import {
  BadgeCheck,
  BookOpenCheck,
  ChevronRight,
  FileText,
  FileUp,
  Link2,
  Pencil,
  Plus,
  ShieldCheck,
  Trash2,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";

type Evidence = {
  id: string;
  type: "Project" | "Certificate" | "Repository" | "Other";
  title: string;
  url?: string;
  addedAt: string;
};

type Skill = {
  id: string;
  name: string;
  level: number;
  status: "Learning" | "Developing" | "Confident";
  evidence: Evidence[];
};

const starterSkills: Skill[] = [
  { id: "html", name: "HTML", level: 90, status: "Confident", evidence: [] },
  { id: "css", name: "CSS", level: 82, status: "Confident", evidence: [] },
  { id: "javascript", name: "JavaScript", level: 52, status: "Developing", evidence: [] },
  { id: "git", name: "Git", level: 34, status: "Developing", evidence: [] },
  { id: "react", name: "React", level: 20, status: "Learning", evidence: [] },
];

const STORAGE_KEY = "skillbridge-demo-skill-passport-v2";

function statusForLevel(level: number): Skill["status"] {
  if (level >= 75) return "Confident";
  if (level >= 35) return "Developing";
  return "Learning";
}

function toneForStatus(status: Skill["status"]) {
  return status === "Confident" ? "strong" : status === "Developing" ? "mid" : "low";
}

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>(starterSkills);
  const [hydrated, setHydrated] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [showEvidence, setShowEvidence] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setSkills(JSON.parse(saved));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(skills));
  }, [skills, hydrated]);

  const selected = skills.find((skill) => skill.id === selectedId) ?? null;
  const evidenceCount = useMemo(
    () => skills.reduce((count, skill) => count + skill.evidence.length, 0),
    [skills]
  );
  const skillsWithProof = useMemo(
    () => skills.filter((skill) => skill.evidence.length > 0).length,
    [skills]
  );

  function addSkill(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const level = Math.max(0, Math.min(100, Number(form.get("level") || 0)));
    if (!name) return;

    const existing = skills.find((s) => s.name.toLowerCase() === name.toLowerCase());
    if (existing) {
      setSkills((current) =>
        current.map((s) =>
          s.id === existing.id ? { ...s, level, status: statusForLevel(level) } : s
        )
      );
      setSelectedId(existing.id);
    } else {
      const skill: Skill = {
        id: `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`,
        name,
        level,
        status: statusForLevel(level),
        evidence: [],
      };
      setSkills((current) => [...current, skill]);
      setSelectedId(skill.id);
    }
    setShowAddSkill(false);
    event.currentTarget.reset();
  }

  function addEvidence(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected) return;
    const form = new FormData(event.currentTarget);
    const title = String(form.get("title") || "").trim();
    const type = String(form.get("type") || "Project") as Evidence["type"];
    const url = String(form.get("url") || "").trim();
    if (!title) return;

    const evidence: Evidence = {
      id: `${Date.now()}`,
      type,
      title,
      url: url || undefined,
      addedAt: new Date().toISOString(),
    };
    setSkills((current) =>
      current.map((skill) =>
        skill.id === selected.id
          ? { ...skill, evidence: [...skill.evidence, evidence] }
          : skill
      )
    );
    setShowEvidence(false);
    event.currentTarget.reset();
  }

  function updateLevel(level: number) {
    if (!selected) return;
    setSkills((current) =>
      current.map((skill) =>
        skill.id === selected.id
          ? { ...skill, level, status: statusForLevel(level) }
          : skill
      )
    );
  }

  function deleteEvidence(evidenceId: string) {
    if (!selected) return;
    setSkills((current) =>
      current.map((skill) =>
        skill.id === selected.id
          ? { ...skill, evidence: skill.evidence.filter((item) => item.id !== evidenceId) }
          : skill
      )
    );
  }

  function deleteSkill() {
    if (!selected) return;
    setSkills((current) => current.filter((skill) => skill.id !== selected.id));
    setSelectedId(null);
  }

  function resetDemo() {
    setSkills(starterSkills);
    setSelectedId(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <ProductShell role="student" live={false}>
      <section className="focusPage skillsPage">
        <div className="focusEyebrow">LIVING SKILL PASSPORT</div>
        <div className="focusTitleRow">
          <div>
            <h1>Build what you can actually prove.</h1>
            <p className="focusLead">
              Add what you have learned first. Evidence comes from you — SkillBridge never invents it.
            </p>
          </div>
          <button className="softAction" onClick={() => setShowAddSkill(true)}>
            <Plus size={15} /> Add learned skill
          </button>
        </div>

        <div className="passportSummary">
          <div>
            <BadgeCheck size={19} />
            <span>
              <b>{skillsWithProof} skills with proof</b>
              <small>{evidenceCount} evidence item{evidenceCount === 1 ? "" : "s"} added by you</small>
            </span>
          </div>
          <div>
            <ShieldCheck size={19} />
            <span>
              <b>{skills.length} skills in your passport</b>
              <small>Your level and evidence can be updated anytime</small>
            </span>
          </div>
        </div>

        <div className="skillsSectionHead">
          <div>
            <b>Your skills</b>
            <small>Open a skill to update level or attach proof.</small>
          </div>
          <button className="textButton" onClick={resetDemo}>Reset demo data</button>
        </div>

        <div className="skillPassportList">
          {skills.map((skill) => {
            const tone = toneForStatus(skill.status);
            return (
              <button className="passportSkill" key={skill.id} onClick={() => setSelectedId(skill.id)}>
                <div className={`skillOrb ${tone}`}>{skill.name.slice(0, 2)}</div>
                <div className="passportSkillMain">
                  <div>
                    <b>{skill.name}</b>
                    <span className={`skillState ${tone}`}>{skill.status}</span>
                  </div>
                  <div className="passportBar"><i style={{ width: `${skill.level}%` }} /></div>
                  <small>
                    {skill.level}% self-rated proficiency · {skill.evidence.length} proof{skill.evidence.length === 1 ? "" : "s"}
                  </small>
                </div>
                <ChevronRight size={18} />
              </button>
            );
          })}
        </div>

        {skills.length === 0 && (
          <div className="skillEmpty">
            <BookOpenCheck size={28} />
            <b>Your Skill Passport is empty.</b>
            <p>Add the first thing you have learned. Proof is optional and starts at zero.</p>
            <button className="softAction" onClick={() => setShowAddSkill(true)}><Plus size={15}/> Add first skill</button>
          </div>
        )}

        <div className="singleCTA">
          <FileUp size={18} />
          <div>
            <b>Evidence should come from you.</b>
            <p>Projects, repositories, certificates or other work can support a skill when you are ready.</p>
          </div>
          <button
            className="softAction"
            onClick={() => skills[0] && setSelectedId(skills[0].id)}
            disabled={!skills.length}
          >
            Choose a skill
          </button>
        </div>
      </section>

      {selected && (
        <div className="sheetBackdrop" onMouseDown={(e) => e.target === e.currentTarget && setSelectedId(null)}>
          <aside className="skillSheet" role="dialog" aria-modal="true">
            <div className="sheetTop">
              <div>
                <span className="focusEyebrow">SKILL DETAIL</span>
                <h2>{selected.name}</h2>
              </div>
              <button className="sheetClose" onClick={() => setSelectedId(null)} aria-label="Close"><X size={18}/></button>
            </div>

            <div className="skillLevelCard">
              <div className="skillLevelTop"><b>Your current level</b><strong>{selected.level}%</strong></div>
              <input
                className="skillRange"
                type="range"
                min="0"
                max="100"
                value={selected.level}
                onChange={(e) => updateLevel(Number(e.target.value))}
              />
              <div className="rangeLabels"><span>Just started</span><span>Comfortable</span><span>Strong</span></div>
              <p>This is your current self-rating. Proof is tracked separately.</p>
            </div>

            <div className="evidenceHead">
              <div><b>Evidence</b><small>{selected.evidence.length} item{selected.evidence.length === 1 ? "" : "s"} added</small></div>
              <button className="softAction" onClick={() => setShowEvidence(true)}><Plus size={14}/> Add proof</button>
            </div>

            <div className="evidenceList">
              {selected.evidence.length === 0 ? (
                <div className="evidenceEmpty">
                  <FileText size={22}/>
                  <b>0 proofs added</b>
                  <p>Nothing is assumed. Add a real project, certificate or repository when you have one.</p>
                </div>
              ) : selected.evidence.map((item) => (
                <div className="evidenceItem" key={item.id}>
                  <div className="evidenceIcon"><FileText size={16}/></div>
                  <div><b>{item.title}</b><small>{item.type}</small></div>
                  {item.url && <a href={item.url} target="_blank" rel="noreferrer" className="evidenceLink"><Link2 size={14}/></a>}
                  <button className="evidenceDelete" onClick={() => deleteEvidence(item.id)} aria-label="Delete evidence"><Trash2 size={14}/></button>
                </div>
              ))}
            </div>

            <div className="sheetDanger">
              <button onClick={deleteSkill}><Trash2 size={14}/> Remove skill from passport</button>
            </div>
          </aside>
        </div>
      )}

      {showAddSkill && (
        <div className="modalBackdrop" onMouseDown={(e) => e.target === e.currentTarget && setShowAddSkill(false)}>
          <form className="miniModal" onSubmit={addSkill}>
            <div className="modalTop"><div><span className="focusEyebrow">ADD TO PASSPORT</span><h3>What have you learned?</h3></div><button type="button" className="sheetClose" onClick={() => setShowAddSkill(false)}><X size={18}/></button></div>
            <label>Skill name<input name="name" className="input" placeholder="e.g. Python, Figma, SQL" autoFocus required /></label>
            <label>Your current level<input name="level" type="number" className="input" min="0" max="100" defaultValue="25" required /></label>
            <p className="formHint">This creates the skill with <b>0 proofs</b>. You can add real evidence afterward.</p>
            <button className="primaryModalAction" type="submit"><Plus size={15}/> Add skill</button>
          </form>
        </div>
      )}

      {showEvidence && selected && (
        <div className="modalBackdrop" onMouseDown={(e) => e.target === e.currentTarget && setShowEvidence(false)}>
          <form className="miniModal" onSubmit={addEvidence}>
            <div className="modalTop"><div><span className="focusEyebrow">ADD EVIDENCE</span><h3>Proof for {selected.name}</h3></div><button type="button" className="sheetClose" onClick={() => setShowEvidence(false)}><X size={18}/></button></div>
            <label>Evidence type<select name="type" className="input" defaultValue="Project"><option>Project</option><option>Certificate</option><option>Repository</option><option>Other</option></select></label>
            <label>Title<input name="title" className="input" placeholder="e.g. Portfolio website" required /></label>
            <label>Link <span>(optional)</span><input name="url" className="input" placeholder="https://github.com/..." /></label>
            <p className="formHint">Only add evidence you can actually show. SkillBridge will not mark it verified automatically.</p>
            <button className="primaryModalAction" type="submit"><FileUp size={15}/> Save evidence</button>
          </form>
        </div>
      )}
    </ProductShell>
  );
}
