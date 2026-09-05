import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SkillBridge AI — Explainable Career Intelligence",
  description: "From skill gap to career path. Explainable skill intelligence for students, industry and institutions.",
};

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="en"><body>{children}</body></html>
}
