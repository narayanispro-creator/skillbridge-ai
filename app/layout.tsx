import "./globals.css";
import type { Metadata } from "next";
import { StudentStateProvider } from "@/components/StudentState";
export const metadata: Metadata = {title:"SkillBridge AI — Explainable Career Intelligence",description:"From skill gap to career path."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><StudentStateProvider>{children}</StudentStateProvider></body></html>}
