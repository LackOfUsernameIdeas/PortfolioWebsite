"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n/language-context";
import { uiTranslations } from "@/lib/i18n/ui-translations";
import { UKFlag, BulgariaFlag } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { Particles } from "@/components/particles";
import { GlowBlobs } from "@/components/glow-blobs";

const CHOSEN_KEY = "portfolio-language-chosen";

type Phase = "checking" | "picking" | "closing" | "done";

export function LanguageSplash() {
  const { setLanguage } = useLanguage();
  const [phase, setPhase] = useState<Phase>("checking");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const chosen = window.localStorage.getItem(CHOSEN_KEY);
    if (chosen) {
      // Returning visitor: skip the picker entirely, just fade the loading
      // cover away smoothly instead of popping straight to the content.
      const id = window.setTimeout(() => setPhase("closing"), 200);
      return () => window.clearTimeout(id);
    }
    setPhase("picking");
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (phase === "closing") {
      const id = window.setTimeout(() => setPhase("done"), 550);
      return () => clearTimeout(id);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "picking") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  if (phase === "done") return null;

  const handleSelect = (lang: "en" | "bg") => {
    setLanguage(lang);
    window.localStorage.setItem(CHOSEN_KEY, "1");
    setPhase("closing");
  };

  const closing = phase === "closing";
  const showPicker = phase === "picking";
  const a = mounted && showPicker;

  return (
    <div
      className={`fixed inset-0 z-[300] flex items-center justify-center overflow-hidden transition-all duration-500 ease-out ${
        closing
          ? "opacity-0 scale-105 pointer-events-none"
          : "opacity-100 scale-100"
      }`}
    >
      {/* Solid opaque base - prevents the home photo/scroll from showing through */}
      <div className="absolute inset-0 bg-background" />

      {/* Subtle corner tint, matches home, layered on top of the opaque base */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/10" />

      {/* Red glow blobs, matches home */}
      <GlowBlobs />

      <Particles count={14} />

      {/* Lightweight loader shown only while checking localStorage */}
      {!showPicker && (
        <div
          className={`relative z-10 flex flex-col items-center gap-4 transition-opacity duration-300 ${
            phase === "checking" ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="w-10 h-10 rounded-full border-2 border-border border-t-primary animate-spin" />
        </div>
      )}

      {showPicker && (
        <div
          className={`${a ? "home-1" : "opacity-0"} absolute top-6 right-6 z-20`}
        >
          <ThemeToggle />
        </div>
      )}

      {showPicker && (
        <div className="relative z-10 flex flex-col items-center px-6 text-center">
          <h1
            className={`${a ? "home-1" : "opacity-0"} font-bold tracking-tight leading-[1.05] text-2xl sm:text-3xl md:text-4xl lg:text-5xl`}
          >
            <span className="block whitespace-nowrap">
              {uiTranslations.splash.welcome.en}
            </span>
            <span className="block whitespace-nowrap pt-2 text-primary">
              {uiTranslations.splash.welcome.bg}
            </span>
          </h1>

          <p
            className={`${a ? "home-2" : "opacity-0"} mt-6 text-muted-foreground leading-relaxed text-md sm:text-lg lg:text-xl`}
          >
            <span className="block whitespace-nowrap">
              {uiTranslations.splash.prompt.en}
            </span>
            <span className="block whitespace-nowrap">
              {uiTranslations.splash.prompt.bg}
            </span>
          </p>

          <div
            className={`${a ? "home-3" : "opacity-0"} flex items-center gap-6 sm:gap-10 mt-12`}
          >
            <button
              type="button"
              onClick={() => handleSelect("en")}
              className="group flex flex-col items-center gap-3 cursor-pointer"
            >
              <span
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-border shadow-md transition-all duration-300 ease-out group-hover:scale-110 group-hover:shadow-xl group-hover:border-primary group-hover:border-[3px] group-active:scale-95"
                style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.12)" }}
              >
                <UKFlag />
              </span>
              <span className="text-sm font-bold tracking-wide text-foreground transition-all duration-300 group-hover:text-primary group-hover:scale-110">
                {uiTranslations.splash.english.en}
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleSelect("bg")}
              className="group flex flex-col items-center gap-3 cursor-pointer"
            >
              <span
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-border shadow-md transition-all duration-300 ease-out group-hover:scale-110 group-hover:shadow-xl group-hover:border-primary group-hover:border-[3px] group-active:scale-95"
                style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.12)" }}
              >
                <BulgariaFlag />
              </span>
              <span className="text-sm font-bold tracking-wide text-foreground transition-all duration-300 group-hover:text-primary group-hover:scale-110">
                {uiTranslations.splash.bulgarian.bg}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
