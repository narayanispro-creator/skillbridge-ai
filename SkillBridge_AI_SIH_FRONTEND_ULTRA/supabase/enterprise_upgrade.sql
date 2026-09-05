-- SkillBridge AI enterprise upgrade (already applied to the connected Supabase project)
-- Run this only on a compatible SkillBridge schema.

-- Harden privileged RPC execution
revoke all on function public.calculate_internship_match(uuid,bigint) from public, anon, authenticated;
revoke all on function public.handle_new_user() from public, anon, authenticated;
revoke all on function public.student_opportunities() from public, anon;
grant execute on function public.student_opportunities() to authenticated;
revoke all on function public.company_candidate_matches(bigint) from public, anon;
grant execute on function public.company_candidate_matches(bigint) to authenticated;
revoke all on function public.college_dashboard_metrics() from public, anon;
grant execute on function public.college_dashboard_metrics() to authenticated;
revoke all on function public.college_skill_gap_summary() from public, anon;
grant execute on function public.college_skill_gap_summary() to authenticated;

-- Query-path indexes
create unique index if not exists applications_student_internship_uq on public.applications(student_id,internship_id);
create index if not exists student_skills_student_idx on public.student_skills(student_id);
create index if not exists student_skills_skill_idx on public.student_skills(skill_id);
create index if not exists internship_skills_internship_idx on public.internship_skills(internship_id);
create index if not exists internships_company_active_idx on public.internships(company_id,active);
create index if not exists applications_internship_status_idx on public.applications(internship_id,status);
create index if not exists applications_student_created_idx on public.applications(student_id,created_at desc);
