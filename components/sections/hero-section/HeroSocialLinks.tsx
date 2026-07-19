"use client";

import { useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";

interface HeroSocialLinksProps {
  mounted: boolean;
}

export function HeroSocialLinks({ mounted }: HeroSocialLinksProps) {
  const [emailTipOpen, setEmailTipOpen] = useState(false);

  return (
    <div
      className={`${mounted ? "hero-4" : "opacity-0"} flex items-center gap-4 mt-8`}
    >
      <div className="relative group/email">
        <a
          href="mailto:kaloyan.kostadinov0730@gmail.com"
          aria-label="Email"
          className="glow-icon w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
          onClick={(e) => {
            if (window.innerWidth < 1024) {
              e.preventDefault();
              setEmailTipOpen((v) => !v);
            }
          }}
        >
          <Mail className="w-4 h-4" />
        </a>
        <span
          className={`absolute top-12 left-0 px-2.5 py-1 rounded-md bg-popover border border-border text-sm text-foreground whitespace-nowrap pointer-events-none transition-opacity duration-200 shadow-md
      ${emailTipOpen ? "opacity-100" : "opacity-0 group-hover/email:opacity-100"}`}
        >
          kaloyan.kostadinov0730@gmail.com
        </span>
      </div>
      <a
        href="https://github.com/LackOfUsernameIdeas"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className="glow-icon w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
      >
        <Github className="w-4 h-4" />
      </a>
      <a
        href="https://www.linkedin.com/in/kaloyan-kostadinov-3ab625367/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="glow-icon w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
      >
        <Linkedin className="w-4 h-4" />
      </a>
    </div>
  );
}
