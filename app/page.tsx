"use client";

import { Navigation } from "@/components/navigation";
import { LanguageSplash } from "@/components/language-splash";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { AchievementsSection } from "@/components/sections/achievements-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ContactSection } from "@/components/sections/contact-section";
import { useReveal } from "@/hooks/use-reveal";

export default function Home() {
  useReveal();

  return (
    <>
      <LanguageSplash />
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <AchievementsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
