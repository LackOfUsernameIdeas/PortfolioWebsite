"use client";

import { useLanguage } from "@/lib/i18n/language-context";

export function UKFlag() {
  return (
    <svg viewBox="0 0 60 60" className="w-full h-full">
      <circle cx="30" cy="30" r="30" fill="#012169" />
      <g clipPath="url(#uk-clip)">
        <path d="M0 0 L60 60 M60 0 L0 60" stroke="#FFFFFF" strokeWidth="10" />
        <path d="M0 0 L60 60 M60 0 L0 60" stroke="#C8102E" strokeWidth="4" />
        <path d="M30 0 V60 M0 30 H60" stroke="#FFFFFF" strokeWidth="16" />
        <path d="M30 0 V60 M0 30 H60" stroke="#C8102E" strokeWidth="8" />
      </g>
      <defs>
        <clipPath id="uk-clip">
          <circle cx="30" cy="30" r="30" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function BulgariaFlag() {
  return (
    <svg viewBox="0 0 60 60" className="w-full h-full">
      <defs>
        <clipPath id="bg-clip">
          <circle cx="30" cy="30" r="30" />
        </clipPath>
      </defs>
      <g clipPath="url(#bg-clip)">
        <rect x="0" y="0" width="60" height="20" fill="#FFFFFF" />
        <rect x="0" y="20" width="60" height="20" fill="#00966E" />
        <rect x="0" y="40" width="60" height="20" fill="#D62612" />
      </g>
    </svg>
  );
}

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();
  const isBg = language === "bg";

  return (
    <div className="rounded-full bg-card border border-border shadow-md flex items-center gap-2 px-3 py-1.5">
      <span
        className={`text-[11px] font-bold tracking-wide transition-colors duration-300 ${!isBg ? "text-primary" : "text-muted-foreground"}`}
      >
        EN
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={isBg}
        aria-label="Switch language between English and Bulgarian"
        onClick={toggleLanguage}
        className="relative flex items-center w-14 h-7 rounded-full cursor-pointer select-none"
        style={{
          background: "hsl(var(--muted))",
          boxShadow: "inset 0 2px 5px rgba(0,0,0,0.2)"
        }}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full shadow-md overflow-hidden border border-white/70 transition-transform duration-300 ease-out ${
            isBg ? "translate-x-7" : "translate-x-0"
          }`}
        >
          {isBg ? <BulgariaFlag /> : <UKFlag />}
        </span>
      </button>
      <span
        className={`text-[11px] font-bold tracking-wide transition-colors duration-300 ${isBg ? "text-primary" : "text-muted-foreground"}`}
      >
        BG
      </span>
    </div>
  );
}
