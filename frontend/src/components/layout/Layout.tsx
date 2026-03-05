import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FloatingCTA } from "../FloatingCTA";
import { ScrollToTop } from "../ui/ScrollToTop";

interface LayoutProps {
  children: ReactNode;
  language: "en" | "te";
  onLanguageChange: (lang: "en" | "te") => void;
}

export function Layout({ children, language, onLanguageChange }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header language={language} onLanguageChange={onLanguageChange} />
      <main className="flex-1">{children}</main>
      <Footer language={language} />
      <FloatingCTA language={language} />
      <ScrollToTop />
    </div>
  );
}
