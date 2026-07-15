"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n/language-context";
import { uiTranslations } from "@/lib/i18n/ui-translations";
import { UKFlag, BulgariaFlag } from "@/components/language-toggle";
import { Particles } from "@/components/particles";

const CHOSEN_KEY = "portfolio-language-chosen";

export function LanguageSplash() {
  const { setLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const chosen = window.localStorage.getItem(CHOSEN_KEY);
    if (!chosen) {
      setVisible(true);
    }
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  if (!visible) return null;

  const handleSelect = (lang: "en" | "bg") => {
    setLanguage(lang);
    window.localStorage.setItem(CHOSEN_KEY, "1");
    setClosing(true);
    window.setTimeout(() => setVisible(false), 550);
  };

  const a = mounted && !closing;

  return (
    <div
      className={`fixed inset-0 z-[300] flex items-center justify-center overflow-hidden transition-all duration-500 ease-out ${
        closing
          ? "opacity-0 scale-105 pointer-events-none"
          : "opacity-100 scale-100"
      }`}
    >
      {/* Solid opaque base — prevents the hero photo/scroll from showing through */}
      <div className="absolute inset-0 bg-background" />

      {/* Subtle corner tint, matches hero, layered on top of the opaque base */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/10" />

      {/* Red glow blobs, matches hero */}
      <div
        className="blob absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-[0.12]"
        style={{ background: "#FF001A" }}
      />
      <div
        className="blob absolute bottom-0 -left-40 w-[400px] h-[400px] rounded-full opacity-[0.06]"
        style={{ background: "#FF001A", animationDelay: "4s" }}
      />

      <Particles count={14} />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <h1
          className={`${a ? "hero-1" : "opacity-0"} text-4xl sm:text-6xl font-bold tracking-tight leading-[0.95]`}
        >
          Kaloyan
          <br />
          <span className="text-primary">Kostadinov</span>
        </h1>

        <p
          className={`${a ? "hero-2" : "opacity-0"} mt-6 text-base sm:text-lg text-muted-foreground max-w-md leading-relaxed`}
        >
          {uiTranslations.splash.prompt.en}
          <br />
          {uiTranslations.splash.prompt.bg}
        </p>

        <div
          className={`${a ? "hero-3" : "opacity-0"} flex items-center gap-6 sm:gap-10 mt-12`}
        >
          <button
            type="button"
            onClick={() => handleSelect("en")}
            className="group flex flex-col items-center gap-3 cursor-pointer"
          >
            <span
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border border-border shadow-md transition-all duration-300 ease-out group-hover:scale-110 group-hover:shadow-xl group-hover:border-primary group-active:scale-95"
              style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.12)" }}
            >
              <UKFlag />
            </span>
            <span className="text-sm font-bold tracking-wide text-foreground transition-colors duration-300 group-hover:text-primary">
              {uiTranslations.splash.english.en}
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleSelect("bg")}
            className="group flex flex-col items-center gap-3 cursor-pointer"
          >
            <span
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border border-border shadow-md transition-all duration-300 ease-out group-hover:scale-110 group-hover:shadow-xl group-hover:border-primary group-active:scale-95"
              style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.12)" }}
            >
              <BulgariaFlag />
            </span>
            <span className="text-sm font-bold tracking-wide text-foreground transition-colors duration-300 group-hover:text-primary">
              {uiTranslations.splash.bulgarian.bg}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
