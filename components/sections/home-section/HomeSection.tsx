"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import { t } from "@/lib/i18n/ui-translations";
import { scrollToSection } from "@/lib/scroll-to-section";
import { Particles } from "@/components/particles";
import { GlowBlobs } from "@/components/glow-blobs";
import { HomePhotoPanel } from "./HomePhotoPanel";
import { HomeSocialLinks } from "./HomeSocialLinks";

export function HomeSection() {
  const [mounted, setMounted] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const a = mounted;

  return (
    <section
      id="home"
      className="relative h-screen w-full overflow-hidden flex flex-col justify-center px-6 sm:px-12 lg:px-20"
    >
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10" />

      {/* Red glow blobs */}
      <GlowBlobs primaryPositionClassName="-top-32 -right-100" />

      <Particles />

      <HomePhotoPanel mounted={mounted} />

      {/* Left: text content */}
      <div className="relative z-10 max-w-xl">
        <h1
          className={`${a ? "home-1" : "opacity-0"} text-6xl sm:text-7xl lg:text-8xl laptop-short:text-7xl! font-bold tracking-tight leading-[0.95]`}
        >
          {language === "bg" ? "Калоян" : "Kaloyan"}
          <br />
          <span className="text-primary glow-gradient-text glow-text">
            {language === "bg" ? "Костадинов" : "Kostadinov"}
          </span>
        </h1>
        <p
          className={`${a ? "home-2" : "opacity-0"} mt-6 laptop-short:mt-4! text-lg sm:text-xl laptop-short:text-base! text-muted-foreground max-w-md leading-relaxed`}
        >
          {t("home.subtitle", language)}
        </p>
        <div
          className={`${a ? "home-3" : "opacity-0"} flex items-center gap-4 mt-10 laptop-short:mt-6!`}
        >
          <button
            onClick={() => scrollToSection("projects")}
            className="shine-sweep glow-pulse flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3 rounded-full font-semibold cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            {t("home.viewProjects", language)}{" "}
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="shine-sweep shine-sweep-tint flex items-center gap-2 border border-border px-7 py-3 rounded-full font-semibold cursor-pointer hover:bg-secondary transition-all duration-300"
          >
            {t("home.contactMe", language)}
          </button>
        </div>
        <HomeSocialLinks mounted={mounted} />
      </div>

      {/* Scroll indicator */}
      <div
        className={`${a ? "home-scroll" : "opacity-0"} absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none`}
      >
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce" />
        </div>
        <span className="text-xs text-muted-foreground tracking-widest">
          {t("home.scroll", language)}
        </span>
      </div>
    </section>
  );
}
