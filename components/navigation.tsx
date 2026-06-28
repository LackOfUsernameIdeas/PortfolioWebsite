"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#home", label: "HOME" },
  { href: "#about", label: "ABOUT" },
  { href: "#achievements", label: "ACHIEVEMENTS" },
  { href: "#projects", label: "PROJECTS" },
  { href: "#contact", label: "CONTACT" }
];

export function Navigation() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
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
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        scrolled ? "scale-95" : ""
      }`}
    >
      {/* Desktop pill */}
      <nav className="hidden md:flex items-center gap-1 bg-card/90 backdrop-blur-md rounded-full px-2 py-2 shadow-lg border border-border">
        {navLinks.map((link) => (
          <button
            key={link.href}
            onClick={() => scrollTo(link.href)}
            className={`px-5 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300 cursor-pointer ${
              active === link.href.replace("#", "")
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-foreground hover:bg-secondary"
            }`}
          >
            {link.label}
          </button>
        ))}
      </nav>

      {/* Mobile */}
      <div className="md:hidden">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-card/90 backdrop-blur-md shadow-lg border-border"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        {open && (
          <div className="absolute top-14 left-1/2 -translate-x-1/2 w-48 bg-card/95 backdrop-blur-md rounded-2xl shadow-lg border border-border p-2">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium tracking-wide text-center transition-all duration-300 cursor-pointer ${
                    active === link.href.replace("#", "")
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-secondary"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
