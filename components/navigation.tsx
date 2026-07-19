"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { useLanguage } from "@/lib/i18n/language-context";
import { t } from "@/lib/i18n/ui-translations";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#home", key: "nav.home" },
  { href: "#about", key: "nav.about" },
  { href: "#achievements", key: "nav.achievements" },
  { href: "#projects", key: "nav.projects" },
  { href: "#contact", key: "nav.contact" }
];

export function Navigation() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight active section via IntersectionObserver
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { threshold: 0.4 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 flex items-center gap-3 ${
        scrolled ? "scale-95" : ""
      }`}
    >
      <nav className="hidden md:flex items-center gap-1 bg-card/90 backdrop-blur-md rounded-full whitespace-nowrap px-2 py-2 shadow-lg border border-border">
        {navLinks.map((link) => (
          <button
            key={link.href}
            onClick={() => scrollTo(link.href)}
            className={`px-5 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300 cursor-pointer ${
              active === link.href.replace("#", "")
                ? "bg-primary text-primary-foreground shadow-md shine-sweep"
                : "text-foreground hover:bg-secondary"
            }`}
          >
            {t(link.key, language)}
          </button>
        ))}
      </nav>

      {/* Language + theme toggle - desktop, sits right next to the nav pill */}
      <div className="hidden md:flex items-center gap-2">
        <LanguageToggle />
        <ThemeToggle />
      </div>

      <div className="md:hidden flex items-center gap-2">
        <LanguageToggle />
        <ThemeToggle />
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-card/90 backdrop-blur-md shadow-lg border-border"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        {open && (
          <div className="absolute top-14 right-0 w-48 bg-card/95 backdrop-blur-md rounded-2xl shadow-lg border border-border p-2">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium tracking-wide text-center transition-all duration-300 cursor-pointer ${
                    active === link.href.replace("#", "")
                      ? "bg-primary text-primary-foreground shine-sweep"
                      : "text-foreground hover:bg-secondary"
                  }`}
                >
                  {t(link.key, language)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
