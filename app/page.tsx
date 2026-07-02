"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Send,
  Award,
  Download,
  GraduationCap,
  MapPin,
  Medal,
  Trophy,
  X,
  ExternalLink,
  Code2,
  Languages
} from "lucide-react";
import {
  projects,
  achievements,
  type Project,
  Achievement
} from "@/lib/projects-data";
import { useLanguage, localize, Localized } from "@/lib/i18n/language-context";
import { t } from "@/lib/i18n/ui-translations";

// ─── CSS particle background ───────────────────────────────────────────────
function Particles({ count = 18 }: { count?: number }) {
  const [items, setItems] = useState<
    Array<{
      id: number;
      size: number;
      left: number;
      delay: number;
      dur: number;
      drift: number;
      opacity: number;
    }>
  >([]);

  useEffect(() => {
    setItems(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        size: Math.random() * 6 + 3,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        dur: Math.random() * 10 + 8,
        drift: Math.random() * 10 + 8,
        opacity: Math.random() * 0.4 + 0.15
      }))
    );
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {items.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            bottom: 0,
            opacity: p.opacity,
            animationDuration: `${p.dur}s, ${p.drift}s`,
            animationDelay: `${p.delay}s, ${p.delay * 0.5}s`
          }}
        />
      ))}
    </div>
  );
}

// ─── Reveal on scroll ─────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && e.target.classList.add("visible")
        ),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [emailTipOpen, setEmailTipOpen] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const a = mounted ? true : false;

  return (
    <section
      id="home"
      className="relative h-screen w-full overflow-hidden flex flex-col justify-center px-6 sm:px-12 lg:px-20"
    >
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10" />

      {/* Red glow blobs */}
      <div
        className="blob absolute -top-32 -right-100 w-[600px] h-[600px] rounded-full opacity-[0.12]"
        style={{ background: "#FF001A" }}
      />
      <div
        className="blob absolute bottom-0 -left-40 w-[400px] h-[400px] rounded-full opacity-[0.06]"
        style={{ background: "#FF001A", animationDelay: "4s" }}
      />

      <Particles />

      {/* ── Photo panel ── */}
      <div
        className={`${a ? "hero-photo" : "opacity-0"} absolute right-0 top-0 h-full w-[55%] hidden lg:block pointer-events-none`}
      >
        <div
          className="absolute"
          style={{
            top: "49%",
            right: "9%",
            transform: "translateY(-50%)",
            width: "420px",
            height: "750px"
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "12px",
              background:
                "linear-gradient(115deg, transparent 35%, rgba(255,0,26,0.08) 35%, rgba(255,0,26,0.13) 50%, rgba(255,0,26,0.08) 65%, transparent 65%)"
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              overflow: "hidden",
              borderRadius: "12px"
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "2px",
                height: "160%",
                top: "-30%",
                left: "32%",
                background:
                  "linear-gradient(to bottom, transparent, rgba(255,0,26,0.6) 30%, rgba(255,0,26,0.6) 70%, transparent)",
                transform: "rotate(-20deg)",
                transformOrigin: "top center"
              }}
            />
            <div
              style={{
                position: "absolute",
                width: "1px",
                height: "160%",
                top: "-30%",
                left: "55%",
                background:
                  "linear-gradient(to bottom, transparent, rgba(255,0,26,0.25) 30%, rgba(255,0,26,0.25) 70%, transparent)",
                transform: "rotate(-20deg)",
                transformOrigin: "top center"
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              top: "10%",
              bottom: "10%",
              left: "-3px",
              width: "3px",
              background:
                "linear-gradient(to bottom, transparent, rgba(255,0,26,0.9) 20%, rgba(255,0,26,0.9) 80%, transparent)",
              borderRadius: "2px"
            }}
          />
        </div>
        <img
          src="/hero-photo.png"
          alt="Kaloyan Kostadinov"
          className="absolute top-[44%] right-[3%] -translate-y-1/2 h-[92%] w-auto object-contain"
        />
      </div>

      {/* ── Left: text content ── */}
      <div className="relative z-10 max-w-xl">
        <h1
          className={`${a ? "hero-1" : "opacity-0"} text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95]`}
        >
          {language === "bg" ? "Калоян" : "Kaloyan"}
          <br />
          <span className="text-primary">
            {language === "bg" ? "Костадинов" : "Kostadinov"}
          </span>
        </h1>
        <p
          className={`${a ? "hero-2" : "opacity-0"} mt-6 text-lg sm:text-xl text-muted-foreground max-w-md leading-relaxed`}
        >
          {t("hero.subtitle", language)}
        </p>
        <div
          className={`${a ? "hero-3" : "opacity-0"} flex items-center gap-4 mt-10`}
        >
          <button
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3 rounded-full font-semibold cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            {t("hero.viewProjects", language)}{" "}
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex items-center gap-2 border border-border px-7 py-3 rounded-full font-semibold cursor-pointer hover:bg-secondary transition-all duration-300"
          >
            {t("hero.contactMe", language)}
          </button>
        </div>
        <div
          className={`${a ? "hero-4" : "opacity-0"} flex items-center gap-4 mt-8`}
        >
          <div className="relative group/email">
            <a
              href="mailto:kaloyan.kostadinov0730@gmail.com"
              aria-label="Email"
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
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
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/kaloyan-kostadinov-3ab625367/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`${a ? "hero-scroll" : "opacity-0"} absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none`}
      >
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce" />
        </div>
        <span className="text-xs text-muted-foreground tracking-widest">
          {t("hero.scroll", language)}
        </span>
      </div>
    </section>
  );
}

// ─── About ─────────────────────────────────────────────────────────────────
const skills = [
  {
    category: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "PHP", "SQL", "HTML", "CSS"]
  },
  {
    category: "Frontend & Mobile",
    items: [
      "React",
      "Next.js",
      "React Native",
      "Vite",
      "Tailwind CSS",
      "shadcn/ui",
      "Chakra UI",
      "Bootstrap",
      "Three.js",
      "A-Frame",
      "WebXR",
      "Expo Go"
    ]
  },
  {
    category: "Backend & Databases",
    items: [
      "Node.js",
      "Express.js",
      "MySQL",
      "PostgreSQL",
      "Firebase",
      "Supabase",
      "Socket.IO",
      "Google Cloud Run",
      "Google Cloud Storage"
    ]
  },
  {
    category: "AI, Computer Vision & Data",
    items: [
      "OpenAI API",
      "Gemini API",
      "Vertex AI",
      "LangChain",
      "OpenCV",
      "NumPy",
      "PyNuitrack",
      "Nuitrack SDK",
      "Beautiful Soup"
    ]
  },
  {
    category: "Tools, Testing & APIs",
    items: [
      "Git",
      "Docker",
      "Android Studio",
      "Vitest",
      "Cronjob",
      "YouTube API",
      "Spotify API",
      "TikTok API",
      "OMDb API",
      "Google Custom Search API"
    ]
  },
  {
    category: "Visualization, Desktop & Hardware",
    items: [
      "Chart.js",
      "ApexCharts",
      "Tkinter",
      "Pygame",
      "Orbbec Astra+ (3D Camera)",
      "NeuroSky MindWave EEG",
      "Meta Quest 2"
    ]
  }
];

// ─── Achievements Grid ─────────────────────────────────────────────────────
function AchievementsGrid() {
  const [openAchievement, setOpenAchievement] = useState<Achievement | null>(
    null
  );
  const { language } = useLanguage();

  return (
    <>
      {openAchievement && (
        <AchievementModal
          achievement={openAchievement}
          onClose={() => setOpenAchievement(null)}
        />
      )}

      <div className="space-y-16">
        {(["2025", "2024", "2023"] as const).map((year) => {
          const items = achievements.filter((a) => a.year === year);
          return (
            <div key={year} className="reveal">
              <div className="flex items-center gap-4 mb-7">
                <h4 className="text-2xl font-bold text-primary">{year}</h4>
                <div className="flex-1 h-px bg-border" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {items.map((a, i) => {
                  const placeNum = a.place ? a.place.replace(/\D/g, "") : null;
                  const placeColor =
                    a.place === "1st"
                      ? "text-yellow-500"
                      : a.place === "2nd"
                        ? "text-slate-400"
                        : "text-primary";
                  const accentColor =
                    a.place === "1st"
                      ? "bg-yellow-500"
                      : a.place === "2nd"
                        ? "bg-slate-400"
                        : "bg-primary/60";
                  const glowClass =
                    a.place === "1st"
                      ? "hover:shadow-[0_0_28px_-6px_rgba(234,179,8,0.45)]"
                      : a.place === "2nd"
                        ? "hover:shadow-[0_0_22px_-6px_rgba(148,163,184,0.4)]"
                        : "hover:shadow-md";
                  const hasViewer =
                    (a.docs && a.docs.length > 0) || a.fallbackImage;

                  return (
                    <Card
                      key={i}
                      className={`flex flex-col overflow-hidden transition-all duration-300 ${glowClass} ${hasViewer ? "hover:border-primary/30 hover:-translate-y-1 cursor-pointer" : ""}`}
                      onClick={() => hasViewer && setOpenAchievement(a)}
                    >
                      <div className={`h-1.5 w-full shrink-0 ${accentColor}`} />

                      <CardContent className="flex flex-col gap-2.5 flex-1">
                        <p className="text-md text-muted-foreground">
                          {localize(a.competition, language)}
                        </p>
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-bold text-2xl leading-snug">
                            {t("projects.projectPrefix", language)} {a.title}
                          </p>
                          {placeNum && (
                            <span
                              className={`text-3xl font-black tabular-nums leading-none shrink-0 ${placeColor}`}
                            >
                              #{placeNum}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {t("achievements.category", language)}:{" "}
                          {localize(a.category, language)}
                        </p>

                        {(a.score || a.points || a.extra) && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {a.score && (
                              <Badge
                                variant="secondary"
                                className="rounded-full text-sm"
                              >
                                {t("achievements.grade", language)}: {a.score}
                              </Badge>
                            )}
                            {a.points && (
                              <Badge
                                variant="secondary"
                                className="rounded-full text-sm"
                              >
                                {t("achievements.points", language)}:{" "}
                                {localize(a.points, language)}
                              </Badge>
                            )}
                            {a.extra && (
                              <Badge
                                variant="outline"
                                className="rounded-full text-sm text-primary border-primary/30"
                              >
                                {localize(a.extra, language)}
                              </Badge>
                            )}
                          </div>
                        )}

                        {hasViewer && (
                          <div className="mt-auto pt-3">
                            <span className="flex items-center gap-1.5 text-sm text-primary font-medium">
                              <ExternalLink className="w-3.5 h-3.5" />
                              {t("achievements.viewRanking", language)}
                            </span>
                          </div>
                        )}

                        {a.links && a.links.length > 0 && (
                          <div className="flex flex-wrap gap-2 pt-1">
                            {a.links.map((link, li) => (
                              <a
                                key={li}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                {localize(link.label, language)}
                              </a>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

// ─── Achievement Modal ─────────────────────────────────────────────────────
function AchievementModal({
  achievement,
  onClose
}: {
  achievement: Achievement;
  onClose: () => void;
}) {
  const { language } = useLanguage();
  const [activeDoc, setActiveDoc] = useState<{
    label: Localized;
    path: string;
  } | null>(achievement.docs?.[0] ?? null);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setActiveDoc(achievement.docs?.[0] ?? null);
    setLightboxOpen(false);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [achievement]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxOpen) {
          setLightboxOpen(false);
          setZoom(1);
          setPan({ x: 0, y: 0 });
        } else {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, lightboxOpen]);

  const resetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const clampPan = (x: number, y: number, z: number) => {
    const maxX = (z - 1) * (window.innerWidth * 0.425);
    const maxY = (z - 1) * (window.innerHeight * 0.4);
    return {
      x: Math.max(-maxX, Math.min(maxX, x)),
      y: Math.max(-maxY, Math.min(maxY, y))
    };
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setZoom((z) => {
      const next = Math.min(5, Math.max(1, z - e.deltaY * 0.001));
      setPan((p) => clampPan(p.x, p.y, next));
      return next;
    });
  };

  const placeColor =
    achievement.place === "1st"
      ? "text-yellow-500"
      : achievement.place === "2nd"
        ? "text-slate-400"
        : "text-primary";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative z-10 w-full sm:max-w-4xl max-h-[92vh] bg-card border border-border rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col shadow-2xl animate-in slide-in-from-bottom-8 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1.5 w-full bg-gradient-to-r from-primary to-primary/30 shrink-0" />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-secondary flex items-center justify-center cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="px-6 pt-5 pb-4 sm:px-8 shrink-0">
          <div className="pr-10">
            <p className="text-sm text-muted-foreground mb-1">
              {localize(achievement.competition, language)} · {achievement.year}
            </p>
            <h2 className="text-3xl font-bold">
              {t("projects.projectPrefix", language)} {achievement.title}
            </h2>
            <p className="text-base text-muted-foreground mt-1.5">
              {t("achievements.category", language)}:{" "}
              {localize(achievement.category, language)}
            </p>
          </div>

          {/* Badges, doc tabs, links - with rank floating in the empty space to the right */}
          <div className="relative pr-20 sm:pr-24">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mt-4">
              {achievement.score && (
                <Badge variant="secondary" className="rounded-full text-sm">
                  {t("achievements.grade", language)}: {achievement.score}
                </Badge>
              )}
              {achievement.points && (
                <Badge variant="secondary" className="rounded-full text-sm">
                  {t("achievements.points", language)}:{" "}
                  {localize(achievement.points, language)}
                </Badge>
              )}
              {achievement.extra && (
                <Badge
                  variant="outline"
                  className="rounded-full text-sm text-primary border-primary/30"
                >
                  {localize(achievement.extra, language)}
                </Badge>
              )}
            </div>

            {/* Doc tabs - if multiple docs */}
            {achievement.docs && achievement.docs.length > 1 && (
              <div className="flex gap-2 mt-4">
                {achievement.docs.map((doc) => (
                  <button
                    key={doc.path}
                    onClick={() => setActiveDoc(doc)}
                    className={`text-sm px-3.5 py-1.5 rounded-full border transition-colors cursor-pointer ${
                      activeDoc?.path === doc.path
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-foreground hover:border-primary hover:text-primary"
                    }`}
                  >
                    {localize(doc.label, language)}
                  </button>
                ))}
              </div>
            )}

            {/* Reference links */}
            {achievement.links && achievement.links.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-3.5">
                {achievement.links.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    {localize(link.label, language)}
                  </a>
                ))}
              </div>
            )}

            {achievement.place && (
              <span
                className={`absolute right-0 top-1/2 -translate-y-1/2 text-4xl font-black tabular-nums ${placeColor}`}
              >
                #{achievement.place.replace(/\D/g, "")}
              </span>
            )}
          </div>
        </div>

        {/* PDF viewer or fallback image */}
        <div className="flex-1 min-h-0 px-6 pb-6 sm:px-8 sm:pb-8">
          {activeDoc ? (
            <div className="w-full h-full min-h-[55vh] rounded-xl overflow-hidden border border-border">
              <iframe
                key={activeDoc.path}
                src={`${activeDoc.path}#zoom=100`}
                className="w-full h-full"
                style={{ minHeight: "55vh", zoom: 1 }}
                title={localize(activeDoc.label, language)}
              />
            </div>
          ) : achievement.fallbackImage ? (
            <div
              className="w-full h-full max-h-[55vh] rounded-xl overflow-hidden border border-border relative cursor-zoom-in group/img"
              onClick={() => setLightboxOpen(true)}
            >
              <img
                src={achievement.fallbackImage}
                alt={`${achievement.title} – ${achievement.competition} ${achievement.year}`}
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-200">
                <div className="bg-black/60 text-white text-base px-6 py-3 rounded-full font-semibold">
                  {t("achievements.clickToExpand", language)}
                </div>
              </div>
              {achievement.fallbackImageCaption && (
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3 pointer-events-none">
                  <p className="text-white text-xs line-clamp-2">
                    {localize(achievement.fallbackImageCaption, language)}
                  </p>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>

      {/* ── Fallback image lightbox ── */}
      {lightboxOpen && achievement.fallbackImage && (
        <div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm py-4"
          onClick={() => {
            setLightboxOpen(false);
            resetZoom();
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxOpen(false);
              resetZoom();
            }}
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="relative overflow-hidden"
            style={{
              width: "85vw",
              maxWidth: "1200px",
              maxHeight: "80vh",
              cursor: zoom > 1 ? (dragging ? "grabbing" : "grab") : "default"
            }}
            onWheel={handleWheel}
            onMouseDown={(e) => {
              if (zoom > 1) {
                setDragging(true);
                setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
              }
            }}
            onMouseMove={(e) => {
              if (dragging) {
                const raw = {
                  x: e.clientX - dragStart.x,
                  y: e.clientY - dragStart.y
                };
                setPan(clampPan(raw.x, raw.y, zoom));
              }
            }}
            onMouseUp={() => setDragging(false)}
            onMouseLeave={() => setDragging(false)}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={achievement.fallbackImage}
              alt={`${achievement.title} – ${achievement.competition} ${achievement.year}`}
              className="w-full h-full object-contain select-none"
              style={{
                transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                transformOrigin: "center",
                transition: dragging ? "none" : "transform 0.1s"
              }}
              draggable={false}
            />
          </div>

          <div className="flex flex-col items-center gap-3 mt-4 px-6 max-w-[85vw]">
            <div className="flex items-center gap-3">
              <span className="text-white/50 text-sm">
                {t("achievements.scrollToZoom", language)}
              </span>
              {zoom > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    resetZoom();
                  }}
                  className="text-sm text-white/70 border border-white/20 px-2 py-0.5 cursor-pointer rounded-full hover:border-white/50 transition-colors"
                >
                  {t("achievements.resetZoom", language)}
                </button>
              )}
            </div>
            {achievement.fallbackImageCaption && (
              <p className="text-white/70 text-sm text-center leading-relaxed">
                {localize(achievement.fallbackImageCaption, language)}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function AchievementsSection() {
  const { language } = useLanguage();
  return (
    <section id="achievements" className="py-24 px-6 sm:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="reveal text-4xl sm:text-6xl font-bold mb-6">
          {t("achievements.heading", language)}
        </h2>
        <div className="reveal flex flex-wrap gap-3 mb-12">
          <div className="flex items-center gap-2 text-sm bg-card border border-border rounded-full px-3.5 py-2 text-muted-foreground">
            <span className="font-semibold text-foreground">
              {t("achievements.noit.short", language)}
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
            <span>{t("achievements.noit.full", language)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm bg-card border border-border rounded-full px-3.5 py-2 text-muted-foreground">
            <span className="font-semibold text-foreground">
              {t("achievements.netit.short", language)}
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
            <span>{t("achievements.netit.full", language)}</span>
          </div>
        </div>
        <AchievementsGrid />
      </div>
    </section>
  );
}

function AboutSection() {
  const { language } = useLanguage();
  return (
    <section id="about" className="py-24 px-6 sm:px-12 lg:px-20 bg-card/40">
      <div className="max-w-7xl mx-auto">
        <div className="reveal flex items-end gap-6 mb-16">
          <h2 className="text-4xl sm:text-6xl font-bold">
            {t("about.heading", language)}
          </h2>
          <div className="hidden sm:flex items-center gap-2 pb-2 text-muted-foreground">
            <MapPin className="w-5 h-5 text-primary" />
            <span className="text-lg">{t("about.location", language)}</span>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="reveal space-y-5 text-lg text-muted-foreground leading-relaxed">
            <p>{t("about.paragraph1", language)}</p>
            <p>{t("about.paragraph2", language)}</p>
            <p>{t("about.paragraph3", language)}</p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                size="lg"
                className="rounded-full px-7 py-5 text-base leading-none"
                asChild
              >
                <a href="/cv-europass.pdf" download>
                  <Download className="h-4 w-4 mr-2" />{" "}
                  {t("about.downloadCV", language)}
                </a>
              </Button>
            </div>
          </div>
          <div className="reveal grid grid-cols-1 sm:grid-cols-2 gap-3 auto-rows-fr">
            {skills.map((group) => (
              <Card
                key={group.category}
                className="bg-card/80 hover:border-primary/30 transition-colors flex flex-col h-full"
              >
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-primary">
                    {t(`about.skillCategories.${group.category}`, language)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex items-center">
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((s) => (
                      <Badge
                        key={s}
                        variant="secondary"
                        className="rounded-full text-sm"
                      >
                        {s}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Project image map ─────────────────────────────────────────────────────
const PROJECT_CARD_IMAGES: Record<string, string> = {
  mobilis: "/mobilis.png",
  mindreel: "/mindreel.png",
  nutrifit: "/nutrifit.png",
  tikfluence: "/tikfluence.png"
};

const PROJECT_IMAGES: Record<string, { src: string; caption: Localized }[]> = {
  mobilis: [
    {
      src: "/mobilis.png",
      caption: {
        en: "Mobilis - platform for improving physical health through personalized workout and nutrition plans, and real-time posture correction",
        bg: "Mobilis - платформа за подобряване на физическото здраве чрез персонализирани тренировъчни и хранителни планове, както и чрез корекция на стойката в реално време"
      }
    },
    {
      src: "/mobilis2.png",
      caption: {
        en: "Health dashboard page showing the user's BMI (27.47 - overweight), BF% (26.97%, Body fat mass: 25.35kg, Lean body mass: 68.65kg), recommended goal (Cut), target daily calories (2617 kcal, deficit: 500 kcal), BMR (2011), TDEE (3117), macronutrient breakdown (Protein: 262g, Fat: 73g, Carbs: 229g)",
        bg: "Страницата 'Здравно табло', показваща BMI на потребителя (27.47 - наднормено тегло), % телесни мазнини (26.97%, Мастна телесна маса: 25.35kg, Чиста телесна маса: 68.65kg), препоръчителна цел (Cut), целеви дневен калориен прием (2617 kcal, дефицит: 500 kcal), BMR (2011), TDEE (3117), разпределение на макронутриентите (Протеин: 262g, Мазнини: 73g, Въглехидрати: 229g)"
      }
    },
    {
      src: "/mobilis3.png",
      caption: {
        en: "Target weight achievement prognosis panel showing 91% progress (70 out of 77 days elapsed), estimated completion date (end of May 2026), remaining weeks (~1), and weekly change of -0.45 kg/week calculated from the -500 kcal/day deficit - with milestone stages (Week 3, 6, 9 completed, Week 11 current) showing expected weight at each step, and a prognosis note accounting for 2 training days per week, water/glycogen fluctuations, and protein intake recommendations",
        bg: "Панел с прогноза за постигане на целево тегло, показващ 91% напредък (изминали 70 от 77 дни), очаквана дата на завършване (края на май 2026 г.), оставащи седмици (~1) и седмична промяна от -0,45 кг/седмица, изчислена въз основа на дефицит от -500 kcal/ден – с етапи на развитие (завършени седмици 3, 6, 9, текуща седмица 11), показващи очакваното тегло на всеки етап, както и бележка към прогнозата, отчитаща 2 тренировъчни дни седмично, колебанията във водата/гликогена и препоръките за прием на протеини"
      }
    },
    {
      src: "/mobilis4.png",
      caption: {
        en: "Workout recommendations entry point where the user selects a training category - Gym, Calisthenics, or Yoga - before being guided through a preference questionnaire used to generate a personalized workout plan tailored to their level, needs, and physical condition",
        bg: "В страницата за тренировъчни препоръки потребителят избира категория тренировка – фитнес, калистеника или йога – след което се преминава към въпросник за предпочитания, който се използва за изготвяне на персонализиран тренировъчен план, съобразен с нивото, нуждите и физическото състояние на потребителя"
      }
    },
    {
      src: "/mobilis5.png",
      caption: {
        en: "Workout preference questionnaire - goal selection step showing all 8 available goals: Cut, Aggressive Cut, Lean Bulk, Dirty Bulk, Recomposition, Maintenance, Aesthetic, and Strength - each with a short description, with Cut preselected and marked as the recommended goal in this case, based on the user's body metrics",
        bg: "Въпросник за предпочитания при тренировките – стъпка с избор на цел, показваща всички 8 налични цели: Cut, Aggressive Cut, Lean Bulk, Dirty Bulk, Recomposition, Maintenance, Aesthetic и Strength – всяка с кратко описание, като в този случай „Cut“ е предварително избрана и отбелязана като препоръчителна цел въз основа на телесните показатели на потребителя"
      }
    },
    {
      src: "/mobilis6.png",
      caption: {
        en: "Yoga-specific questionnaire step where the user selects their preferred yoga style - Hatha, Vinyasa, Yin, Power Yoga, Restorative, or No preference - with Yin selected (long-held poses for deeper stretching)",
        bg: "Стъпка от въпросника, посветена на йогата, в която потребителят избира предпочитания от него стил йога – Hatha, Vinyasa, Yin, Power Yoga, Restorative или „Нямам предпочитания“ – като е избран стилът „Yin“ (пози, които се задържат дълго време, за по-дълбоко разтягане)"
      }
    },
    {
      src: "/mobilis7.png",
      caption: {
        en: "Weekly gym workout plan - Day 3 (Upper Body: Back/Shoulders + Arms) showing a 10-minute warm-up, 6 exercises each with sets, reps, and activated muscle count, an 8-minute cooldown stretching, and safety notes covering rest periods, progressive overload - with day navigation tabs (Day 1-4, based on the selected 4-day training split in the questionnaire) and a button for generating a new plan",
        bg: "Седмичен план за фитнес тренировки – Ден 3 (Горна част на тялото: гръб/рамене + ръце), включващ 10-минутна загрявка, 6 упражнения, всяко с брой серии, повторения и активирани мускули, 8-минyтнo разтягане и бележки за безопасност, обхващащи периодите на почивка и прогресивното натоварване – с раздели за навигация по дни (в случая Ден 1–4, тъй като е избран във въпросника 4-дневен тренировъчен план) и бутон за генериране на нов план"
      }
    },
    {
      src: "/mobilis8.png",
      caption: {
        en: "Exercise detail modal for Barbell Bench Press (4 sets × 8-12 reps) showing the targeted muscle groups - Chest (red), Front Deltoids (yellow), and Triceps (purple) - highlighted on a front and back body diagram",
        bg: "Модално прозорче с подробности за упражнението „Barbell Bench Press“ (4 серии × 8–12 повторения), показващо активираните мускулни групи – гърди (червено), предни делтоиди (жълто) и трицепси (лилаво) – подчертани на диаграма на тялото с изглед отпред и отзад"
      }
    },
    {
      src: "/mobilis9.png",
      caption: {
        en: "Exercise tutorial video section showing an embedded YouTube player with a technique guide for the Barbell Bench Press, with an option to open it directly on YouTube",
        bg: "Секция с видео за изпълнение на упражнението, в която се показва вграден YouTube плейър с демонстрация на техниката при лежанката с щанга, с възможност за директно отваряне на видеото в YouTube"
      }
    },
    {
      src: "/mobilis10.png",
      caption: {
        en: "Nutrition questionnaire steps - target weight input (current weight: 95kg, target: 90kg, difference: -5.0kg) and training days selection (minimum 2 days per week, Monday/Wednesday/Saturday selected) - both used to generate the target weight accomplishment prognosis and personalize the meal plan with pre- and post-workout meals on selected training days",
        bg: "Стъпки от въпросника за хранене – въвеждане на целевото тегло (текущо тегло: 95 кг, целево: 90 кг, разлика: -5,0 кг) и избор на дни за тренировка (минимум 2 дни седмично, избрани са понеделник/сряда/събота) – и двете се използват за изготвяне на прогноза за постигане на целевото тегло и персонализиране на хранителния план с ястия преди и след тренировка в избраните дни за тренировка"
      }
    },
    {
      src: "/mobilis11.png",
      caption: {
        en: "Meal plan for the week - Day 1 (a training day) showing 5 meals with suggested times: Breakfast (07:30), Mid-Morning Snack (10:00), Pre-Workout Meal (11:15), Post-Workout Meal (14:30), and Dinner (19:00) - each with a description and macros breakdown. There are daily macro totals (2607 kcal, Protein: 223.1g, Carbs: 279.8g, Fat: 73.7g) against the target ones (2617 kcal, 262g, 229g, 73g), and general tips covering nutrition, hydration, sleep, meal prep, and daily movement",
        bg: "План за седмично хранене – Ден 1 (тренировъчен ден), включващ 5 хранения с препоръчителни часове: Закуска (07:30), Предиобедна закуска (10:00), Предтренировъчно ястие (11:15), Следтренировъчно ястие (14:30) и Вечеря (19:00) – всяко с описание и разпределение на макронутриентите. Посочени са дневните общи калории и макроси (2607 kcal, 223,1g протеини, 279,8g въглехидрати, 73,7g мазнини) в сравнение с целевите (2617 kcal, 262g, 229g, 73g), както и общи съвети за хранене, хидратация, сън, подготовка на храната и ежедневна физическа активност"
      }
    },
    {
      src: "/mobilis12.png",
      caption: {
        en: "Meal detail modal for a post-workout dish (Chicken with Pasta and Carrots, 14:10, 25 min total) showing macros (604 kcal, Protein: 65.5g, Carbs: 71g, Fat: 6.4g), prep and cooking time (10 + 15 min), ingredients with gram amounts (Chicken fillet: 170g, Pasta: 240g, Carrots: 200g), and 4-step preparation instructions",
        bg: "Модален прозорец с подробности за съответното ястие след тренировка (пилешко с паста и моркови, 14:10, общо 25 мин.), показващ макросите (604 kcal, 65,5g протеини, 71g въглехидрати, 6,4g мазнини), време за подготовка и готвене (10 + 15 мин.), съставки с количества в грами (пилешко филе: 170g, паста: 240g, моркови: 200g) и инструкции за приготвяне в 4 стъпки"
      }
    },
    {
      src: "/mobilis13.png",
      caption: {
        en: "Specialized posture correction program (7 exercises) targeting flexibility and mobility of the neck, shoulders, and back, reducing tension from prolonged poor posture, and developing balance and injury prevention. Each exercise has a corresponding card showing the target zone (in this case, shoulder blades and shoulders), difficulty (medium), categories (Mobility and Posture), benefits, and four-step instructions. Each exercise also has a detail panel with an embedded YouTube demonstration video",
        bg: "Специализирана програма за коригиране на стойката (7 упражнения), насочена към гъвкавостта и подвижността на врата, раменете и гърба, намаляване на напрежението, причинено от продължителна неправилна стойка, както и към развиване на равновесие и превенция на травми. Всяко упражнение е придружено с информация за целева зона (в този случай лопатките и раменете), степен на трудност (средна), категории (мобилност и стойка), ползите и инструкциите за изпълнение. Всяко упражнение разполага и с панел с подробна информация, в който е вградено демонстрационно видео от YouTube"
      }
    },
    {
      src: "/mobilis14.png",
      caption: {
        en: "6-step setup guide for the Orbbec Astra+ posture correction application - covering app download, Nuitrack Runtime installation (with GitHub link), obtaining a free license key from 3DiVi, running the activation tool (Nuitrack.exe), activating the camera with the license key, and launching the Mobilis pose correction executable (mobilis_pose_correction.exe) from the downloaded zip",
        bg: "Секция за конфигурация на приложението за коригиране на стойката с Orbbec Astra+ в 6 стъпки – включваща изтегляне на приложението, инсталиране на Nuitrack Runtime (с линк към GitHub), получаване на безплатен лицензен ключ от 3DiVi, стартиране на инструмента за активиране (Nuitrack.exe), активиране на камерата с лицензния ключ и стартиране на .exe програмата на Mobilis (mobilis_pose_correction.exe) от изтегления ZIP файл"
      }
    },
    {
      src: "/mobilis15.mov",
      caption: {
        en: "Real-time posture correction session. Tracking is done via the Orbbec Astra+ depth camera using the Nuitrack SDK and PyNuitrack, with a voice assistant (OpenAI TTS, gpt-4o-mini-tts) dictating each step. A 5-second calibration process is done where the user stands still with arms down and legs together, during which the system computes height, arm length, shoulder/hip width, and leg length to derive body-proportional tolerances for pose and angle checks. Chin Tucks address forward head posture caused by prolonged screen use by activating the deep neck flexors responsible for stabilizing the head",
        bg: "Сесия за коригиране на стойката в реално време. Проследяването на изпълнението става чрез камерата Orbbec Astra+ с помощта на Nuitrack SDK и PyNuitrack, като гласовият асистент (OpenAI TTS, gpt-4o-mini-tts) дава указания за всяка стъпка. Извършва се 5-секунден процес на калибриране, при който потребителят стои неподвижно с ръцете надолу и събрани крака, като през това време системата изчислява височината, дължината на ръцете, ширината на раменете/бедрата и дължината на краката, за да определи пропорционални на тялото допустими граници за проверка на позата и ъглите. „Chin Tucks“ коригира наведената напред глава, получена в резултат на продължителна работа пред екран, като се активират дълбоките флексори на шията, отговорни за стабилизирането на главата"
      }
    },
    {
      src: "/mobilis16.mov",
      caption: {
        en: "Neck Side Tilts exercise improves lateral neck flexibility and reduces side tension caused by sustained poor head positioning and improves range of motion",
        bg: "Упражнението „Neck Side Tilts“ подобрява страничната гъвкавост на врата, намалява напрежението в страничната част, причинено от продължително неправилно положение на главата, и подобрява обхвата на движение"
      }
    },
    {
      src: "/mobilis17.mov",
      caption: {
        en: "Shoulder Blade Squeezes exercise targets rounded shoulders caused by prolonged sitting, hunching, and forward head positioning, strengthening the upper back muscles and improving shoulder posture",
        bg: "Упражнението „Shoulder Blade Squeezes“ е насочено към коригиране на извитите рамене, причинени от продължително седене, прегърбена стойка и наведена напред глава, като укрепва мускулите на горната част на гърба и подобрява стойката в раменете"
      }
    },
    {
      src: "/mobilis18.mov",
      caption: {
        en: "Wall Angels exercise addresses rounded shoulders and weak upper back control, improves shoulder mobility and upper back posture, and also opens the chest",
        bg: "Упражнението „Wall Angels“ помага при извити рамене и слаб контрол над горната част на гърба, подобрява подвижността на раменете и стойката в горната част на гърба, а също така разгръща гръдния кош"
      }
    },
    {
      src: "/mobilis19.mov",
      caption: {
        en: "Standing T Stretch exercise targets the shoulder blades and shoulders, addressing rounded shoulders and upper back weakness caused by prolonged sitting and screen use, strengthening the muscles between the shoulder blades and improving upper back posture",
        bg: "Упражнението „Standing T Stretch“ е насочено към лопатките и раменете, като помага при изкривени рамене и слаб контрол в горната част на гърба, причинени от продължително седене и работа пред екран, укрепва мускулите между лопатките и подобрява стойката в горната част на гърба"
      }
    },
    {
      src: "/mobilis20.mov",
      caption: {
        en: "Standing Pelvic Tilts exercise improves pelvic stability and mobility, addressing lower back imbalances (caused by sedentary habits and prolonged standing) and reducing pain in that area",
        bg: "Упражнението „Standing Pelvic Tilts“ подобрява стабилността и подвижността на таза, като коригира дисбалансите в долната част на гърба (причинени от заседнал начин на живот и продължителното стоене) и облекчава болките в тази област"
      }
    },
    {
      src: "/mobilis21.mov",
      caption: {
        en: "Standing Lumbar Extensions exercise targets the lower back, improving lumbar mobility and stability, and reducing stiffness and tension accumulated from prolonged sitting or poor postural habits",
        bg: "Упражнението „Standing Lumbar Extensions“ е насочено към долната част на гърба, подобрява гъвкавостта и стабилността в областта на кръста, както и намалява сковаността и напрежението, натрупани в резултат на продължително седене или лоши постурални навици"
      }
    },
    {
      src: "/mobilis22.png",
      caption: {
        en: "BMI classification table showing 8 categories: Severe Thinness (<16), Moderate Thinness (16-16.99), Mild Thinness (17-18.49), Normal (18.5-24.99), Pre-obese (25-29.99), Obesity Class I (30-34.99), Obesity Class II (35-39.99), and Obesity Class III (≥40) - alongside the BMI formula (weight in kg / height in m²), used by the goal selection algorithm to determine the user's recommended fitness goal",
        bg: "Таблица за класификация на BMI, показваща 8 категории: Сериозно недохранване (<16), Средно недохранване (16–16,99), Леко недохранване (17–18,49), Нормално (18,5–24,99), Предзатлъстяване (25–29,99), Затлъстяване I клас (30–34,99), Затлъстяване II клас (35–39,99) и Затлъстяване III клас (≥40) – заедно с формулата за изчисляване на BMI (тегло в кг / ръст в м²), използвана от алгоритъма за избор на цел, за да определи препоръчителната фитнес цел на потребителя"
      }
    },
    {
      src: "/mobilis23.png",
      caption: {
        en: "BF% classification table (American Council on Exercise standard) - 5 categories for men and women: Essential Fat (2-5% / 10-13%), Athletes (6-13% / 14-20%), Fitness (14-17% / 21-24%), Average (18-24% / 25-31%), and Obese (≥25% / ≥32%) - alongside the U.S. Navy method formulas for calculating BF% by gender (using waist, neck, hip, and height measurements) and the Lean Body Mass formula (weight minus Body Fat Mass)",
        bg: "Таблица за класификация на процента телесни мазнини (стандарт на Американския съвет за физическа активност) – 5 категории за мъже и жени: Основни мазнини (2–5% / 10–13%), Спортисти (6–13% / 14–20%), Фитнес (14–17% / 21–24%), Средно телосложение (18–24% / 25–31%) и Затлъстяване (≥25% / ≥32%) – заедно с формулите по U.S. Navy метода за изчисляване на процента телесни мазнини по пол (използвайки размерите на талията, врата, таза и ръста) и формулата за чистата телесна маса (тегло минус мастната телесна маса)"
      }
    },
    {
      src: "/mobilis24.png",
      caption: {
        en: "BMR (Mifflin-St Jeor formula; calculated separately for each gender using weight, height, and age) and TDEE formulas, with TDEE derived by multiplying BMR by one of 5 activity level multipliers - Sedentary (×1.2, little to no exercise, desk job), Light (×1.375, light exercise 1-3 days/week), Moderate (×1.55, moderate exercise 3-5 days/week e.g. running, cycling, swimming), Active (×1.725, hard exercise 6-7 days/week), and Very Active (×1.9, very intense training, physical job or 2x/day training)",
        bg: "Формулите за базов метаболизъм - BMR (формулата на Mifflin-St Jeor; изчислява се отделно за всеки пол въз основа на тегло, ръст и възраст) и за TDEE, като TDEE се изчислява чрез умножаване на BMR по един от 5-те коефициента за ниво на натовареност – „Заседнал начин на живот“ (×1,2), „Лека физическа активност“ (×1,375), „Умерена физическа активност“ (×1,55), „Висока физическа активност“ (×1,725) и „Много висока физическа активност“ (×1,9)"
      }
    },
    {
      src: "/mobilis25.png",
      caption: {
        en: "After determining TDEE (the calories burned per day), the next step is a caloric correction - a deficit or surplus relative to TDEE, depending on the assigned goal - since TDEE represents the maintenance point at which body weight stays stable. These daily calories are then split into macronutrients in a ratio that also depends on the goal. Aggressive Cut (-750 kcal) applies a larger deficit for Obese Class II/III (BMI). Cut (-500 kcal) applies a moderate deficit for Obese Class I (BMI), Pre-obese (BMI), or Obese BF%. Lean Bulk (+300 kcal) applies a moderate surplus for Mild Thinness (BMI). Dirty Bulk (+500 kcal) applies a larger surplus for Moderate/Severe Thinness (BMI) or critically low BF% (below 2% for men, below 10% for women). Recomposition (-200 kcal) applies a slight deficit for Normal or Pre-obese BMI combined with Obese or Average BF%. Maintenance (±0 kcal) keeps calories at TDEE for Normal or Pre-obese BMI (where the elevated weight comes from muscle mass) combined with Athlete or Fitness-level BF%. Aesthetic (-300 kcal) is a user-chosen moderate deficit for muscle definition. Strength (+200 kcal) is a user-chosen slight surplus for optimal strength performance",
        bg: "След определяне на TDEE (изгорените калории за ден), следващата стъпка е калорична корекция – дефицит или излишък спрямо TDEE, в зависимост от поставената цел – тъй като TDEE представлява точката на поддържане, при която телесното тегло остава стабилно. След това тези дневни калории се разпределят между макронутриентите в съотношение, което също зависи от целта. „Aggressive Cut“ (-750 kcal) прилага по-голям дефицит при Затлъстяване от II/III клас (BMI). „Cut“ (-500 kcal) прилага умерен дефицит при Затлъстяване от I клас (BMI), Предзатлъстяване (BMI) или категория Затлъстяване, според процента телесни мазнини. „Lean Bulk“ (+300 kcal) прилага умерен излишък при Леко недохранване (BMI). „Dirty Bulk“ (+500 kcal) прилага по-голям излишък при Сериозно/Средно недохранване (BMI) или критично нисък процент телесни мазнини (под 2% за мъже, под 10% за жени). „Recomposition“ (-200 kcal) прилага лек дефицит при Нормален или Предзатлъстяващ BMI, съчетан с категориите Затлъстяване или Средно телосложение на телесни мазнини. „Maintenance“ (±0 kcal) поддържа калориите на нивото на TDEE при Нормален или Предзатлъстяващ BMI (в тази ситуация повишеното тегло се дължи на мускулна маса), съчетан с процент на телесни мазнини от категории „Спортисти“ или „Фитнес“. „Aesthetic“ (-300 kcal) представлява избран от потребителя умерен дефицит за изразена мускулатура. „Strength“ (+200 kcal) представлява избран от потребителя лек излишък за оптимална сила"
      }
    },
    {
      src: "/mobilis26.png",
      caption: {
        en: "Each goal's caloric deficit or surplus is converted into an expected weekly weight change via `Weekly change = caloric offset × 7 ÷ 7700 kcal/kg` formula, which is the main driver of the target weight accomplishment prognosis. The prognosis shows what would happen if the plan is strictly followed - it helps the user judge whether their chosen goal actually fits their target. The number of weeks needed for completion is calculated by dividing the weight difference - `|target weight − current weight|` - by the weekly change",
        bg: "Калоричният дефицит или излишък за всяка цел се превръща в очаквана седмична промяна в теглото чрез формулата `Седмична промяна = калорично отклонение × 7 ÷ 7700 kcal/кг`, която е основният фактор за съставяне на прогнозата за постигане на целево тегло. Прогнозата показва какво би се случило, ако планът се спазва стриктно – тя помага на потребителя да прецени дали избраната от него цел действително съответства на желания резултат. Броят седмици, необходими за постигане на целта, се изчислява, като разликата в теглото – `|целево тегло − текущо тегло|` – се раздели на седмичната промяна"
      }
    },
    {
      src: "/mobilis27.png",
      caption: {
        en: "The Nuitrack exercise application uses two coordinate systems: a 3D world space that follows the standard convention with Y pointing up and a 2D screen space used for rendering skeleton data (joints, angles, and visual guides) aligned to the user's body in the OpenCV window, which has its origin at the top-left with Y growing downward. This inversion is why the Y coordinate is negated (-world_y) in the projection formula, and why all pose and angle calculations in the app reference Y using negative values - this keeps them consistent with the screen's coordinate system",
        bg: "Nuitrack приложението за упражнения използва две координатни системи: триизмерно пространство, което следва стандартната конвенция, при която Y оста сочи нагоре, и двуизмерно екранно пространство, използвано за визуализиране на данните за скелета в OpenCV прозореца (стави, ъгли и визуални ориентири), съгласувани с тялото на потребителя. Началната точка се намира в горния ляв ъгъл, а оста Y нараства надолу. Тази инверсия е причината стойността на координатата Y да е отрицателна (-world_y) във формулата за проекция, както и причината всички изчисления на пози и ъгли в приложението да се отнасят към Y чрез отрицателни стойности – това ги поддържа съгласувани с координатната система на екрана"
      }
    },
    {
      src: "/mobilis28.png",
      caption: {
        en: "Diagram of the workout recommendation generation flow: when the user submits preferences on `/dashboard/workout_recommendations`, the data is routed to `/get-model-response/workout-recommendations` and the saveUserPreferences() function is called using a category - Nutrition or Workout, which branches further into Gym, Calisthenics, or Yoga, each saving its own preference fields (e.g. experience, frequency, muscle groups, yoga style) in the workout_user_preferences table. Тhe functions generateSystemPrompt(), generateUserPrompt(), and generateResponseFormat() compose the request sent via POST method to the OpenAI API. The raw response is validated and parsed, then saveWorkoutRecommendations() uses the stored preferences to process the result into four Supabase tables - workout_generations (top-level generation record), workout_day_recommendations (per-day warmup/cooldown and focus data), workout_day_exercises (workout-specific exercise data such as sets/reps), and workout_exercises (unique exercise details - muscle activation, category)",
        bg: "Диаграма на процеса на генериране на препоръки за тренировки: когато потребителят въведе своите предпочитания на `/dashboard/workout_recommendations`, данните се изпращат към `/get-model-response/workout-recommendations` и оттам се пренасочват към функцията saveUserPreferences() според категорията – Хранене или Вид тренировка, която се разклонява по-нататък във „Фитнес“, „Калистеника“ или „Йога“, като всяка от тях записва свои собствени полета за предпочитания (например опит, честота, мускулни групи, стил на йога) в таблицата workout_user_preferences. Функциите generateSystemPrompt(), generateUserPrompt() и generateResponseFormat() съставят заявката, изпратена чрез метода POST към API-то на OpenAI. Необработеният отговор се валидира и анализира, след което функцията saveWorkoutRecommendations() използва съхранените предпочитания, за да обработи резултата в четири таблици в Supabase – workout_generations (запис на генериране на най-високо ниво), workout_day_recommendations (данни за загрявка/разгрявка и фокус за всеки ден), workout_day_exercises (данни за упражненията, специфични за тренировката, като серии/повторения) и workout_exercises (специфични подробности за упражненията – мускулна активация, категория)"
      }
    },
    {
      src: "/mobilis29.png",
      caption: {
        en: "Diagram of the nutrition recommendation generation flow: when the user submits preferences on `/dashboard/nutrition_plans`, the data is routed to `/get-model-response/nutrition-plans` and the saveUserPreferences() function is called using a category - Nutrition or Workout. The preferences (goal, training time, target weight, health issues, cuisine type, macros) are saved in nutrition_user_preferences. Тhe functions generateSystemPrompt(), generateUserPrompt(), and generateResponseFormat() compose the request sent via POST method to the OpenAI API. The raw response is validated and parsed, then saveNutritionRecommendations() uses the stored preferences to process the result into four Supabase tables - nutrition_generations (top-level generation record), nutrition_day_recommendations (per-day macro totals), nutrition_day_meals (meal-specific data such as type and time), and nutrition_meals (unique meal details - ingredients, macros, instructions, prep/cooking time)",
        bg: "Диаграма на процеса на генериране на препоръки за хранене: когато потребителят въведе своите предпочитания на `/dashboard/nutrition_plans`, данните се препращат към `/get-model-response/nutrition-plans` и оттам се пренасочват към функцията saveUserPreferences() според категорията – Хранене или Вид тренировка. Предпочитанията (цел, време за тренировка, желано тегло, здравословни проблеми, тип кухня, макроси) се запазват в nutrition_user_preferences. Функциите generateSystemPrompt(), generateUserPrompt() и generateResponseFormat() съставят заявката, изпратена чрез метода POST към OpenAI API. Необработеният отговор се валидира и анализира, след което функцията saveNutritionRecommendations() използва съхранените предпочитания, за да обработи резултата в четири таблици в Supabase – nutrition_generations (запис на най-високо ниво за генериране), nutrition_day_recommendations (дневни суми на макронутриентите), nutrition_day_meals (данни за конкретни хранения, като тип и час) и nutrition_meals (уникални подробности за храненията – съставки, макроси, инструкции, време за подготовка/готвене)"
      }
    },
    {
      src: "/mobilis30.png",
      caption: {
        en: "Diagram of the target weight accomplishment prognosis generation flow: when the user submits a target weight on `/dashboard/nutrition_plans`, a request is sent to `/get-model-response/weight-prognosis`, where generatePrognosisSystemPrompt(), generatePrognosisUserPrompt(), and generatePrognosisResponseFormat() compose the request sent via POST method to the OpenAI API. The raw response is validated and parsed, then saveWeightPrognosis() selects the linked record from the nutrition_generations table and inserts the result into nutrition_weight_prognosis (estimated weeks, estimated date, weekly change, milestones, note), before the success result is returned to the page",
        bg: "Диаграма на процеса за генериране на прогноза за постигане на целевото тегло: когато потребителят въведе целево тегло на `/dashboard/nutrition_plans`, се изпраща заявка към `/get-model-response/weight-prognosis`, където функциите generatePrognosisSystemPrompt(), generatePrognosisUserPrompt() и generatePrognosisResponseFormat() съставят заявката, изпратена чрез метода POST към API-то на OpenAI. Необработеният отговор се валидира и анализира, след което функцията saveWeightPrognosis() избира съответния запис от таблицата nutrition_generations и вмъква резултата в таблицата nutrition_weight_prognosis (прогнозирани седмици, прогнозирана дата, седмична промяна, етапи, бележки), преди резултатът за успешно изпълнение да бъде върнат на страницата"
      }
    },
    {
      src: "/mobilis31.jpg",
      caption: {
        en: "Diagram of the Supabase PostgreSQL public schema",
        bg: "Диаграма на публичната схема (public schema) на Supabase PostgreSQL"
      }
    },
    {
      src: "/mobilis32.png",
      caption: {
        en: "Diagram of the Supabase PostgreSQL auth schema",
        bg: "Диаграма на схемата за удостоверяване (auth schema) на Supabase в PostgreSQL"
      }
    }
  ],
  mindreel: [
    {
      src: "/mindreel.png",
      caption: {
        en: "MindReel - the neuroassistant that transforms brain activity and personal preferences into the perfect content - movies, TV series, books, and songs",
        bg: "MindReel - невроасистентът, който превръща мозъчната активност и субективните предпочитания в перфектното съдържание - филми, сериали, книги и песни"
      }
    },
    {
      src: "/mindreel1.png",
      caption: {
        en: "Home page statistics displaying average machine learning evaluation metrics (Precision – 82.27% for last generation, 29.48% overall; Recall – 54.49%; F1 Score – 29.44%) across all users, alongside a book adaptations counter showing how many recommended books have been adapted into movies and series (360 movie adaptations, 133 series adaptations, 493 total)",
        bg: "Статистики на началната страница, показващи средните стойности на показателите за оценка на машинно обучение (Precision – 82,27% за последното генериране, 29,48% като цяло; Recall – 54,49%; F1 Score – 29,44%) за всички потребители, както и брояч на адаптациите, показващ колко от препоръчаните книги са адаптирани във филми и сериали (360 филмови адаптации, 133 сериални адаптации, общо 493)"
      }
    },
    {
      src: "/mindreel2.png",
      caption: {
        en: "Music statistics showing average Spotify popularity (63.50/100) and YouTube engagement metrics (403.6M views, 2.4M likes, 73.6K comments) fetched via the Spotify and YouTube APIs, followed by other platform-wide stats including total users (20), most recommended genre (Drama), average box office ($90,851,285), and total awards count (21,380)",
        bg: "Музикални статистики, показващи средната популярност в Spotify (63,50/100), както и показателите за ангажираност в YouTube (403,6 млн. гледания, 2,4 млн. харесвания, 73,6 хил. коментара), извлечени чрез API-та на Spotify и YouTube. Тук присъстват и други статистически данни за цялата платформа, включително общ брой потребители (20), най-препоръчван жанр (драма), средни бокс офис приходи ($90 851 285) и общ брой награди (21 380)"
      }
    },
    {
      src: "/mindreel3.png",
      caption: {
        en: "The New Recommendations page entry point, where the user selects the type of content they want to explore - Movies & Series, Books, or Music - before being guided through a preference questionnaire that collects data for the AI prompt",
        bg: "Началната точка в страницата „Нови Препоръки“, където потребителят избира типа съдържание, което иска да разгледа – „Филми и сериали“, „Книги“ или „Музика“ – след което се преминава към въпросник за предпочитания, който събира данни за промпта към изкуствения интелект"
      }
    },
    {
      src: "/mindreel4.mov",
      caption: {
        en: "Full end-to-end walkthrough of the EEG analysis session - the NeuroSky MindWave Mobile 2 headset is placed on the head and connected via Bluetooth, after which the user runs a purpose-built Python .exe application that establishes a Socket.IO connection with the MindReel API and begins transmitting the raw brainwave data in real time. Once the connection is confirmed, the live brain activity dashboard activates, displaying the Attention and Meditation meter values as circular gauges, a combined area chart tracking both metrics over time, and eight individual brainwave frequency charts (Delta, Theta, Low Alpha, High Alpha, Low Beta, High Beta, Low Gamma, High Gamma) - all streamed for one minute until the session ends and the collected data is forwarded to the AI for recommendation generation",
        bg: ""
      }
    },
    {
      src: "/mindreel5.mov",
      caption: {
        en: "Five generated movies and series recommendations produced as a result of the EEG analysis - each card displays the title in Bulgarian and English, genre, duration, release year, IMDb rating and vote count, Metascore, Rotten Tomatoes score, description, plot summary, and additional metadata including director, writers, cast, release date, language, country, awards, and box office revenue. There is a diagnostic section that explains why the recommendation serves as a corrective for the user's recorded psycho-emotional state. Each card includes a trailer button that opens an embedded YouTube player in a modal, and a bookmark icon for adding or removing the title from the personal watchlist",
        bg: ""
      }
    },
    {
      src: "/mindreel6.png",
      caption: {
        en: "A recommendation card generated via the standard preference questionnaire, following the same structure as the EEG-based results. There is a section explaining why the movie/series was recommended based on the inputted individual preferences",
        bg: ""
      }
    },
    {
      src: "/mindreel7.png",
      caption: {
        en: "Relevance analysis panel for the last recommendation generation - each recommendation is displayed as a navigable card (with previous/next arrows) showing its relevance classification (Relevant/Irrelevant) and a breakdown score across six categories: Genres, Type, Mood, Watch Time, Creation Period, and Target Audience, each scored individually and summed into a total relevance score (e.g. 7/7). Below, a summary row shows the number of relevant recommendations, total recommendations generated, Precision percentage, and average relevance score for the generation",
        bg: ""
      }
    },
    {
      src: "/mindreel8.png",
      caption: {
        en: "A book recommendation card displaying data scraped from Goodreads - showing the cover image, genres, Goodreads rating (4.24 / 1,204,089 votes), explanation of why the book was recommended, description, characters, literary awards, adaptations (movies, series, theatre, and more), is the book part of a series, and additional metadata such as origin, language, cover type, setting, publisher, publication date, and ISBN",
        bg: ""
      }
    },
    {
      src: "/mindreel9.png",
      caption: {
        en: "A music recommendation card displaying data fetched from the Spotify and YouTube APIs - showing the thumbnail with a play button for the YouTube video, Spotify popularity score (91/100) with a direct listening link, YouTube views (383.0M) and likes (2.0M), an explanation of why the song was recommended, description, and additional metadata such as artists, album, album type, duration, release date, tracks in album, and Spotify popularity",
        bg: ""
      }
    },
    {
      src: "/mindreel10.png",
      caption: {
        en: "The VR cinema page showing the entry button to the A-Frame virtual scene, alongside a keyboard and mouse controls reference panel (WASD and arrow keys for navigation, left mouse button drag for rotation)",
        bg: ""
      }
    },
    {
      src: "/mindreel11.png",
      caption: {
        en: 'Inside the A-Frame virtual cinema hall - featuring rows of red seats, a ceiling projector and spotlights, a popcorn machine with yellow lights on the left, and navigation arrows for switching between recommendations, with the "Home Alone" recommendation card displayed on the central screen',
        bg: ""
      }
    },
    {
      src: "/mindreel12.png",
      caption: {
        en: "There are two side screens - the left displaying the per-recommendation relevance breakdown by criteria (Genres, Type, Mood, Time, Age, Target Group) with a score of 6/7, and the right showing the Overall Analysis panel with 4 relevant recommendations out of 5 generated, 80.00% Precision, and an average relevance score of 5.60",
        bg: ""
      }
    },
    {
      src: "/mindreel13.png",
      caption: {
        en: "Trailer playback view inside the VR scene - the movie trailer is downloaded via yt-dlp, stored in Google Cloud Storage, and loaded as a <video> element rendered on the cinema screen, with playback controls (play, replay, progress bar at 0:59/2:13) and a close button",
        bg: ""
      }
    },
    {
      src: "/mindreel14.png",
      caption: {
        en: "The exit door of the virtual cinema hall - a 3D double door with a glowing EXIT sign above it, rendered as part of the immersive cinema environment built in A-Frame",
        bg: ""
      }
    },
    {
      src: "/mindreel15.png",
      caption: {
        en: "AI Analyzer page showing the user-specific machine learning metrics - Precision (34.28%, 194 relevant out of 566 total generated), Recall/TPR (70.80%, 194 out of 274 relevant recommendations in the system sent to the user), and F1 Score (46.19%, balance between Precision and Recall) - alongside the four statistics used in their calculation: total recommendations generated (TP+FP: 566), relevant among generated (TP: 194), total recommendations in platform (TP+TN+FP+FN: 792), and total relevant recommendations in platform (274)",
        bg: ""
      }
    },
    {
      src: "/mindreel16.png",
      caption: {
        en: "AI Analyzer page showing two paginated line charts tracking the average Precision, Recall, and F1 Score over time (February–March 2025) - the left chart represents values across all platform users, while the right chart tracks the same metrics for the individual user, allowing direct comparison between personal AI behavior and the overall platform trend",
        bg: ""
      }
    },
    {
      src: "/mindreel17.png",
      caption: {
        en: "The visualization is showing the extended recommendation metrics - FPR (71.81%, 372 irrelevant recommendations sent out of 518 total irrelevant in the platform), Specificity (28.19%), FNR (29.2%), and Accuracy (42.93%) - with a detailed breakdown panel for the currently selected metric (FPR) displaying its formula, progress bar, and the TP/FP/FN/TN counts, alongside a legend explaining all four types of AI predictions",
        bg: ""
      }
    },
    {
      src: "/mindreel18.png",
      caption: {
        en: "The Watchlist page displaying saved movies and series recommendations as cards with poster and metadata - with the filter panel on the right, offering filtering by genre, duration, type (movies or series), actors, directors, writers, languages, IMDb rating, Metascore, box office, and release year, with Apply and Reset buttons. The Readlist and Listenlist pages have the same structure and filtering options, but for books and music respectively",
        bg: ""
      }
    },
    {
      src: "/mindreel19.png",
      caption: {
        en: "Individual statistics page showing four sections: a paginated table of the most frequently recommended movies and series (565 total) with prosperity rating, box office, and Oscar wins; a top directors/actors/writers table ranked by recommendation count with average IMDb and Rotten Tomatoes ratings; a bar chart of the user's most recommended genres; and a summary count of total recommendations split by movies (359), series (206), and combined (565)",
        bg: ""
      }
    },
    {
      src: "/mindreel20.png",
      caption: {
        en: "A reference table of the five EEG brain wave frequency bands with distributed signal power across the ranges, expressed as Power Spectral Density (PSD), used in the application's EEG analysis. It includes each wave name, frequency range, associated psycho-physiological states, and a visual example of the filtered waveform corresponding to the level of brain activity. Delta: 0-4 Hz - deep sleep; Theta: 4-7 Hz - creativity and hypnagogic state; Alpha: 8-12 Hz - calm and balanced state with normal cognitive function; Beta: 12-30 Hz - active thinking and cognitive processing; Gamma: 30-100+ Hz - intense cognitive activity and potential cognitive overload",
        bg: ""
      }
    },
    {
      src: "/mindreel21.png",
      caption: {
        en: "The Confusion Matrix used in the application to evaluate AI recommendation behavior - rows represent the actual relevance of recommendations (positive/relevant, negative/irrelevant), columns represent the AI's predictions (positive/negative), and the four resulting cells define TP (relevant and recommended), FP (irrelevant but recommended), FN (relevant but not recommended), and TN (irrelevant and not recommended). The derived metrics - Precision (share of recommended items that are actually relevant), Recall/TPR (share of all relevant items that were recommended), Specificity/TNR (share of all irrelevant items that were correctly not recommended), False Positive Rate (share of irrelevant items that were incorrectly recommended), False Negative Rate (share of relevant items that were incorrectly not recommended), and Accuracy (share of all correct predictions out of all predictions made) - are shown alongside the complementary relationships TPR + FNR = 1 and TNR + FPR = 1",
        bg: ""
      }
    },
    {
      src: "/mindreel22.png",
      caption: {
        en: "Diagram of the movies and series recommendation data flow for the `app/recommendations/movies_series` page: The user's preferences (genres, mood, free time, engagement level, target audience, creation time, type (movies or series), actors/directors/writers, action pace, themes) are saved to the MindReel DB and sent to the `/get-model-response` endpoint, where LangChain selects the AI model and returns a raw response, which is cleaned and processed into a structured JSON result. Each title's IMDb ID is then retrieved via the Google Custom Search JSON API, and full metadata (title, year, director, actors, writers, genre, ratings, awards, plot, revenue) is fetched from the OMDb API and saved to the database. In parallel, the AI analysis for the current generation is composed based on the preferences and recommendations - covering criteria scoring, average relevance calculation, and Precision. The final result is returned and visualized for the user",
        bg: ""
      }
    },
    {
      src: "/mindreel23.png",
      caption: {
        en: "Diagram of the relevance algorithm flow: The React client sends a separate request for each recommendation, passing the user's last entered preferences to the MindReel API, which checks whether the recommendation is relevant or not by scoring it against six criteria - genres (max 2 points), type (max 1 point), mood (max 1 point), creation time (max 1 point), target audience (max 1 point), and free time (max 1 point). The points are summed into a final relevance score out of 7, and if the total reaches at least 5 points the recommendation is classified as relevant. The result is returned to the React client and further processed as part of the movies and series recommendation generation flow",
        bg: ""
      }
    },
    {
      src: "/mindreel24.png",
      caption: {
        en: "Diagram of the trailer extraction flow for the VR cinema option in `app/recommendations/movies_series`: After recommendations are generated (per the movies and series recommendation data flow), the YouTube ID (URL) of each trailer is retrieved from the YouTube API, then saved to the MindReel DB. The YouTube URL is then sent to Google Cloud Run, which executes the `yt-dlp` code to download the video and store it in Google Cloud Storage. The resulting public URL (`https://storage.googleapis.com/BUCKET_NAME/video.mp4`) is returned to the application and loaded as a `<video>` element in the A-Frame VR scene",
        bg: ""
      }
    },
    {
      src: "/mindreel25.png",
      caption: {
        en: "Diagram of the book recommendation data flow for the `app/recommendations/books` page: The user's preferences (genres, authors, engagement level, target audience, origin, mood, action pace, themes) are saved to the MindReel DB and sent to the `/get-model-response` endpoint, where LangChain selects the AI model (GPT-4-Turbo) and returns a raw response, processed into a structured JSON result. Depending on the `.env` configuration, each book's ID is then retrieved via the Google Custom Search JSON API. After that, the full metadata (title, year, author, description, adaptations, ratings, publisher, awards, characters, genre, page count) is fetched from the respective source via either the Goodreads scraping mechanism (MindReel API with Beautiful Soup) or the Google Books API, and saved to the database, before the final result is returned and visualized for the user",
        bg: ""
      }
    },
    {
      src: "/mindreel26.png",
      caption: {
        en: "Diagram of the Goodreads scraping mechanism: The React client sends a request with the book's Goodreads ID to the MindReel API, which executes scraper.py - parsing the HTML of the page via Beautiful Soup and locating each data field by its HTML tag. The extracted fields (title, original title, description, genres, page count, book format, setting, collaborators, characters, rating, number of ratings, number of reviews, first publication info, publisher, cover image, series, ISBN-13, ISBN-10, ASIN, language, publication date) are returned as a JSON response from scraper.py back to the MindReel API, which forwards the response to the React client, where it is further processed as part of the book recommendation generation flow",
        bg: ""
      }
    },
    {
      src: "/mindreel27.png",
      caption: {
        en: "Diagram of the music recommendation data flow for the `app/recommendations/music` page: The user's preferences (genres, mood, producers/composers, lyrics style, target audience, creation time, countries, performers/groups, tempo, themes) are saved to the MindReel DB and sent to the `/get-model-response` endpoint, where LangChain selects the AI model and returns a raw response, processed into a structured JSON result. For each recommended song, a Spotify Access Token is obtained first, then song data is fetched in parallel from both the Spotify API and the YouTube API, with all metadata (title, release date, artists, popularity, views, likes, album details, explanation of why it was recommended, description, video link) saved to the database alongside the AI analysis, before the final result is returned and visualized for the user",
        bg: ""
      }
    }
  ],
  nutrifit: [
    {
      src: "/nutrifit.png",
      caption: {
        en: "NutriFit - platform that actively supports users in maintaining their optimal weight and healthy lifestyle",
        bg: ""
      }
    },
    {
      src: "/nutrifit2.png",
      caption: {
        en: "ChatGPT vs Gemini AI deviation comparison panel. The overall score (e.g. 12.61% vs 33.50%) represents the platform-wide average absolute deviation - calculated by taking the absolute deviation of every meal plan generation ever stored in the database, across all users and all categories, and averaging the results into a single value. Deviations are treated as absolute values, meaning both undershooting and overshooting the user's nutritional limits count equally. Below that, two category-level breakdowns are shown for each model: average deviation (absolute difference from the user's defined limit per each category, in grams and %) and maximum deviation (the largest absolute overshoot or undershoot ever recorded per category), across Calories, Protein, Carbohydrates, and Fats",
        bg: ""
      }
    },
    {
      src: "/nutrifit3.png",
      caption: {
        en: "Platform-wide user statistics dashboard showing average body metrics and nutrient intake split by gender (45 men, 36 women, 81 total), visualized as both a line chart and a bar chart",
        bg: ""
      }
    },
    {
      src: "/nutrifit4.png",
      caption: {
        en: "Weight Calculator page showing the user's BMI (26.78 - overweight, healthy range 18.5–25), ideal weight (70.99kg, currently 11.01kg above), and body composition breakdown - body fat % (24.09%), fat mass (19.75kg), and lean mass (62.25kg). Each metric includes a day-over-day comparison against the previous entry",
        bg: ""
      }
    },
    {
      src: "/nutrifit5.png",
      caption: {
        en: "Historical body composition charts tracking the user's daily progress over time - weight, BMI, body fat %, fat mass, lean mass, and kg above/below ideal weight",
        bg: ""
      }
    },
    {
      src: "/nutrifit6.png",
      caption: {
        en: "Meal plan generation page - the user selects their activity level (6 levels), a calorie goal (7 presets from mild weight loss to extreme bulk, BMR value), and a diet type (Balanced, Low Fat, Low Carb, High Protein), which auto-fills the macro targets. The user can also specify foods to exclude and choose a cuisine (Bulgarian, Spanish, Italian, French). Submitting generates a meal plan via either OpenAI or Gemini",
        bg: ""
      }
    },
    {
      src: "/nutrifit7.png",
      caption: {
        en: "AI-generated meal plan showing breakfast (1 dish) and lunch (starter, main, dessert) - each meal card displays a food image fetched via Google Custom Search API, weight in grams, and exact macros (calories, protein, carbs, fats), with a button linking to the preparation steps",
        bg: ""
      }
    },
    {
      src: "/nutrifit8.png",
      caption: {
        en: "Dinner section (main + dessert) of the meal plan, followed by the daily macro totals - summed calories, protein, carbs, and fats across all meals - with Gemini's deviation shown per category in both absolute grams and percentage, indicating how far the generated plan strayed from the current user's defined limits",
        bg: ""
      }
    },
    {
      src: "/nutrifit9.png",
      caption: {
        en: "Most recommended foods ranking - dishes sorted by how many times the system included them in generated meal plans across all users. The top entry expands to show full nutritional details (calories, macros, serving size) and a macro bar chart, with buttons to view ingredients and the recipe. The sidebar also shows the other 4 ranking pages (by calories, fats, carbs, protein)",
        bg: ""
      }
    },
    {
      src: "/nutrifit10.mov",
      caption: {
        en: "The video demonstration showcases the user interface and features of the NutriFit mobile application",
        bg: ""
      }
    },
    {
      src: "/nutrifit11.png",
      caption: {
        en: "NutriFit mobile app - welcome screen, login form, and daily measurements input (height, age, weight, neck, waist, hip circumference) used to calculate body metrics",
        bg: ""
      }
    },
    {
      src: "/nutrifit12.png",
      caption: {
        en: "Meal plan generation form - activity level selection (6 levels), calorie goal presets, diet type table with auto-filled macros, foods to exclude, cuisine selection, and generate buttons for OpenAI or Gemini - all the same as the web version",
        bg: ""
      }
    },
    {
      src: "/nutrifit13.png",
      caption: {
        en: "Info tooltips on the meal plan form explaining activity levels (1–6) and diet types. Activity levels range from Level 1 (little to no exercise, e.g. short walk or light yoga) up to Level 6 (very intense daily training, e.g. marathon prep, 2hr cycling, weightlifting). Diet types cover Balanced (even macro distribution for general health), Low Fat (reduced fat for calorie control), Low Carb (minimized carbs with adequate protein and healthy fats), and High Protein (prioritizes protein intake, ideal for muscle development and strength training)",
        bg: ""
      }
    },
    {
      src: "/nutrifit14.png",
      caption: {
        en: "Meal plan result - breakfast dishes with food images, weight, and macros, followed by daily macro totals with their deviations in absolute grams and percentage. This image also shows the diet type tooltip modal explaining each type in details",
        bg: ""
      }
    },
    {
      src: "/nutrifit15.png",
      caption: {
        en: "Recipe modal showing ingredients and preparation steps for a selected dish, alongside the full daily macro summary with deviation per category (calories, protein, carbs, fats) in both absolute and percentage values",
        bg: ""
      }
    },
    {
      src: "/nutrifit16.png",
      caption: {
        en: "Diagram of the NutriFit API data flow. The user's measurements (weight, age, gender, neck, hip, waist, height, goal) and activity level are sent to the `measurements/userData` endpoint, which batches all calculations into a single request to the Fitness Calculator API - covering body fat, daily calories, macros, ideal weight, and BMI. The response is processed by the NutriFit API and saved to Firestore (Firebase) under the `additionalUserData` collection, keyed by UID. Simultaneously, the user is redirected to `admin/default`. This architecture is designed to work only with a single API call per day",
        bg: ""
      }
    },
    {
      src: "/nutrifit17.png",
      caption: {
        en: "Diagram of the meal plan generation flow. The user's preferences (excluded foods, cuisine, protein, diet type, carbs, fats, calories) are saved and fed into an AI prompt, which is sent to either the OpenAI API or the NutriFit API (Gemini via Vertex AI library). The raw response is cleaned into a structured meal plan object. Dish names from the response are then sent to the Google Custom Search API to fetch food images, which are injected back into the final meal plan rendered on the `admin/mealplan` page",
        bg: ""
      }
    },
    {
      src: "/nutrifitDB.png",
      caption: {
        en: "Firestore database schema for NutriFit. Each user document is keyed by UID and stores gender and goal as top-level fields, with a `dataEntries` subcollection where each document is keyed by date (YYYY-MM-DD). Each daily entry holds body measurements (weight, waist, neck, hip, height, age), BMI data (bmi, health status, healthy range), perfect weight (ideal value and difference from current). Preferences are also stored (calories, nutrients per diet type), as well as the full meal plans for both OpenAI and Gemini (breakfast, lunch with appetizer/main/dessert, dinner) each with dish name, ingredients, instructions, image, recipe quantity, and deviations (absolute value, percentage, user limit) per macro category. Alongside, 'MacroNutrients' and 'DailyCalorieRequirements' are stored by being broken down across all 6 activity levels, diet types, and calorie goals (ExtremeLoss, MildLoss, Loss, Gain, MildGain, ExtremeGain)",
        bg: ""
      }
    }
  ],
  tikfluence: [
    {
      src: "/tikfluence.png",
      caption: {
        en: "TikFluence - data analytics platform proving TikTok's cross-platform music influence",
        bg: ""
      }
    },
    {
      src: "/tikfluence2.png",
      caption: {
        en: "Ranking of songs whose popularity was most influenced by TikTok. The table contains data about peak popularity dates on Spotify and TikTok, showing the time difference between them in days. There is also a section that includes the most frequently used hashtags in TikTok video descriptions",
        bg: ""
      }
    },
    {
      src: "/tikfluence3.png",
      caption: {
        en: "The visualization is representing the change in popularity, including rises and declines within the respective platform, and highlights the peak date",
        bg: ""
      }
    },
    {
      src: "/tikfluence4.png",
      caption: {
        en: "Explanation of the TikTok influence effect. A song increases in popularity across TikTok and Spotify until reaching peak interest on both platforms. When the TikTok peak happens before the Spotify peak, the song is classified as influenced by TikTok, where exposure on TikTok drives later growth on Spotify",
        bg: ""
      }
    },
    {
      src: "/tikfluence5.png",
      caption: {
        en: "Table showing songs affected by the TikTok influence effect. The dataset includes tracks that appeared in the global Top 200 TikTok songs ranking from the “ОЩЕ СТАТИСТИКИ” section, along with their peak dates on TikTok and Spotify",
        bg: ""
      }
    },
    {
      src: "/tikfluence6.png",
      caption: {
        en: "Ranking of the most streamed songs on TikTok across all platform users (Global Top 200 TikTok Songs). It shows information such as the number of recent videos created, total likes across all TikTok videos, YouTube views, and Spotify popularity index (0–100). Each song has a subpage accessed via “Вижте нарастване / Вижте детайли” button, which includes detailed popularity metrics",
        bg: ""
      }
    },
    {
      src: "/tikfluence7.png",
      caption: {
        en: "The statistics shown apply to the selected song from the respective ranking, including position in the ranking of most popular songs, changes in the popularity statistics over the time, and daily percentage growth on likes, views, videos made, and popularity index",
        bg: ""
      }
    },
    {
      src: "/tikfluence8.png",
      caption: {
        en: "After authenticating using a personal TikTok account, the user can view real-time statistics such as follower count, following count, total likes, and number of videos. This approach is relies on a self-hosted proxy server with Socket.IO for transmitting data from TikTok servers to the end user",
        bg: ""
      }
    },
    {
      src: "/tikfluence9.png",
      caption: {
        en: "Ranking of Top 200 most popular TikTok content creators. There is information such as change of follower count over time, total likes, and total number of videos created. Each creator has a subpage with detailed statistics and growth metrics",
        bg: ""
      }
    },
    {
      src: "/tikfluence10.png",
      caption: {
        en: "Main information related to the selected video from the ranking list - views, shares, and likes. Similar to the song details page, there are chronological diagrams showing growth or decline in the follower count",
        bg: ""
      }
    },
    {
      src: "/tikfluence11.png",
      caption: {
        en: "OAuth authentication flow for accessing personal TikTok account data: the server requests an access and refresh token from the TikTok API, then uses them to make two separate HTTP requests - one fetching profile statistics (follower count, following, likes, uploaded videos count), and another fetching per-video engagement metrics (likes, views, shares, comments). Both data sets are passed into Chart.js and rendered in the UI",
        bg: ""
      }
    },
    {
      src: "/tikfluence12.png",
      caption: {
        en: "Detailed 7-step Socket.IO real-time data flow: (1) the browser requests a Socket.IO connection to the server, (2) the server confirms with a success message, (3) the browser sends the access token to the server, (4) every minute the server makes an async fetch request to the TikTok API for likes and followers data, (5) the API returns the data to the server, (6) the server pushes the data to the browser via the Socket.IO connection, and (7) the data is embedded into Chart.js diagrams for real-time visualization",
        bg: ""
      }
    },
    {
      src: "/tikfluenceDB.png",
      caption: {
        en: "Structure of the MySQL Database",
        bg: ""
      }
    }
  ]
};

function renderInline(text: string, keyPrefix: string) {
  // Splits on `code` spans only - used for content already inside a bold span
  return text.split(/(`.+?`)/g).map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={`${keyPrefix}-${i}`}
          className="inline-block bg-primary/10 text-primary border border-primary/20 rounded-md px-2 py-0.5 mx-0.5 text-[0.85em]"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

function renderFormatted(text: string) {
  // Split on **bold** and `code` simultaneously, keeping the delimiters
  const parts = text.split(/(\*\*.+?\*\*|`.+?`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      const inner = part.slice(2, -2);
      return (
        <strong key={i} className="text-foreground font-semibold">
          {renderInline(inner, `b${i}`)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          className="inline-block bg-primary/10 text-primary border border-primary/20 rounded-md px-2 py-0.5 mx-0.5 text-[0.85em]"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

// ─── Project Modal ─────────────────────────────────────────────────────────
function ProjectModal({
  project,
  onClose
}: {
  project: Project;
  onClose: () => void;
}) {
  const { language } = useLanguage();
  const [imgIdx, setImgIdx] = useState(0);
  const [imgLoading, setImgLoading] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isScrollable, setIsScrollable] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const images = PROJECT_IMAGES[project.id] ?? [];

  const isVideo = (src: string) => /\.(mp4|mov|webm|ogg)$/i.test(src);

  // Guarded navigation - blocked while the current image is still loading
  const goTo = useCallback(
    (idx: number) => {
      if (imgLoading) return;
      setImgLoading(true);
      setImgIdx(idx);
      setZoom(1);
      setPan({ x: 0, y: 0 });
    },
    [imgLoading]
  );

  // Reset on project change
  useEffect(() => {
    setImgIdx(0);
    setImgLoading(false);
    setLightboxOpen(false);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [project.id]);

  // Keyboard navigation
  useEffect(() => {
    const len = images.length;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && len > 1) goTo((imgIdx + 1) % len);
      if (e.key === "ArrowLeft" && len > 1) goTo((imgIdx - 1 + len) % len);
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, images.length, imgIdx, goTo]);

  // Scroll indicator
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    setHasScrolled(false);
    setIsScrollable(el.scrollHeight > el.clientHeight + 10);

    const onScroll = () => {
      setHasScrolled(true);
      el.removeEventListener("scroll", onScroll);
    };

    const ro = new ResizeObserver(() => {
      setIsScrollable(el.scrollHeight > el.clientHeight + 10);
    });
    ro.observe(el);

    el.addEventListener("scroll", onScroll);

    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, [project.id, imgIdx]);

  const resetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const clampPan = (x: number, y: number, z: number) => {
    const maxX = (z - 1) * (window.innerWidth * 0.425); // 85vw / 2
    const maxY = (z - 1) * (window.innerHeight * 0.4); // 80vh / 2
    return {
      x: Math.max(-maxX, Math.min(maxX, x)),
      y: Math.max(-maxY, Math.min(maxY, y))
    };
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setZoom((z) => {
      const next = Math.min(5, Math.max(1, z - e.deltaY * 0.001));
      setPan((p) => clampPan(p.x, p.y, next));
      return next;
    });
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative z-10 w-full sm:max-w-2xl max-h-[92vh] bg-card border border-border rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col shadow-2xl animate-in slide-in-from-bottom-8 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1.5 w-full bg-gradient-to-r from-primary to-primary/30 shrink-0" />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-secondary flex items-center justify-center cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ── Scrollable body ── */}
        <div ref={scrollRef} className="overflow-y-auto flex flex-col">
          {/* Image gallery */}
          {images.length > 0 && (
            <div className="relative w-full max-h-[55vh] aspect-video bg-black/40 shrink-0 select-none">
              {isVideo(images[imgIdx].src) ? (
                <div
                  className="absolute inset-0 cursor-pointer group/video"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxOpen(true);
                  }}
                >
                  <video
                    src={images[imgIdx].src}
                    className={`w-full h-full object-cover transition-opacity duration-150 ${
                      imgLoading ? "opacity-40" : "opacity-100"
                    }`}
                    loop
                    playsInline
                    onCanPlay={() => setImgLoading(false)}
                    onError={() => setImgLoading(false)}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-black/50 flex items-center justify-center group-hover/video:bg-primary transition-colors duration-300">
                      <svg
                        className="w-7 h-7 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              ) : (
                <img
                  src={images[imgIdx].src}
                  alt={localize(images[imgIdx].caption, language)}
                  className={`w-full h-full object-cover cursor-zoom-in transition-opacity duration-150 ${
                    imgLoading ? "opacity-40" : "opacity-100"
                  }`}
                  onLoad={() => setImgLoading(false)}
                  onError={() => setImgLoading(false)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxOpen(true);
                  }}
                />
              )}
              {/* Loading spinner overlay */}
              {imgLoading && !isVideo(images[imgIdx].src) && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                </div>
              )}
              {/* Caption */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3">
                <p className="text-white text-xs line-clamp-1">
                  {localize(images[imgIdx].caption, language)}
                </p>
              </div>
              {/* Prev / Next */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      goTo((imgIdx - 1 + images.length) % images.length)
                    }
                    disabled={imgLoading}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white text-2xl hover:bg-primary transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    ‹
                  </button>
                  <button
                    onClick={() => goTo((imgIdx + 1) % images.length)}
                    disabled={imgLoading}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white text-2xl hover:bg-primary transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    ›
                  </button>
                </>
              )}
            </div>
          )}
          {images.length > 1 && (
            <div className="flex justify-center gap-1.5 pt-3">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  disabled={imgLoading}
                  className={`w-2 h-2 rounded-full transition-colors disabled:cursor-not-allowed ${
                    i === imgIdx ? "bg-primary" : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
          )}
          <div className="px-6 pb-6 pt-2 sm:px-8 sm:pb-8 flex flex-col gap-4">
            <div className="flex items-center justify-between mt-1">
              <h2 className="text-2xl sm:text-3xl font-bold">
                {project.title}
              </h2>
              <div className="flex items-center gap-2 shrink-0">
                <Badge variant="outline" className="rounded-full text-xs">
                  {project.year}
                </Badge>
              </div>
            </div>

            <p className="text-foreground/70 font-bold">
              {localize(project.shortDescription, language)}
            </p>

            <div>
              <h3 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-primary" />{" "}
                {t("projects.technologies", language)}
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <Badge key={t} variant="secondary" className="rounded-full">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2 pb-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm border border-border px-4 py-2 rounded-full hover:border-primary hover:text-primary transition-colors"
                >
                  <Github className="w-4 h-4" />{" "}
                  {t("projects.github", language)}
                </a>
              )}
              {project.githubMobileUrl && (
                <a
                  href={project.githubMobileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm border border-border px-4 py-2 rounded-full hover:border-primary hover:text-primary transition-colors"
                >
                  <Github className="w-4 h-4" />{" "}
                  {t("projects.githubMobile", language)}
                </a>
              )}
              {project.docs &&
                project.docs.length > 0 &&
                project.docs.map((doc, i) =>
                  doc.icon === "apk" ? (
                    <a
                      key={i}
                      href={`/documentations/${doc.filename}`}
                      download
                      className="flex items-center gap-2 text-sm border border-primary/50 text-primary px-4 py-2 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      {localize(doc.label, language)}
                      <svg
                        className="w-4 h-4 pointer-events-none"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M17.523 0.976l-1.302 2.252a7.293 7.293 0 0 0-8.442 0L6.477.976a.5.5 0 0 0-.866.5l1.312 2.27A7.271 7.271 0 0 0 4.5 9.5h15a7.271 7.271 0 0 0-2.423-5.754l1.312-2.27a.5.5 0 0 0-.866-.5ZM9 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM2 10.5a1.5 1.5 0 0 0-1.5 1.5v5a1.5 1.5 0 0 0 3 0V12A1.5 1.5 0 0 0 2 10.5Zm20 0a1.5 1.5 0 0 0-1.5 1.5v5a1.5 1.5 0 0 0 3 0V12a1.5 1.5 0 0 0-1.5-1.5ZM4.5 10.5v9A1.5 1.5 0 0 0 6 21v2.5a1.5 1.5 0 0 0 3 0V21h6v2.5a1.5 1.5 0 0 0 3 0V21a1.5 1.5 0 0 0 1.5-1.5v-9Z" />
                      </svg>
                    </a>
                  ) : (
                    <a
                      key={i}
                      href={`/documentations/${doc.filename}`}
                      download
                      className="flex items-center gap-2 text-sm border border-border px-4 py-2 rounded-full hover:border-primary hover:text-primary transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      {localize(doc.label, language)}
                      {doc.label.en !== "All Schemes & Photos" && (
                        <>
                          <Languages className="w-4 h-4" />
                          <svg
                            width="18"
                            height="12"
                            viewBox="0 0 18 12"
                            className="rounded-sm shrink-0"
                          >
                            <rect width="18" height="4" y="0" fill="#FFFFFF" />
                            <rect width="18" height="4" y="4" fill="#00966E" />
                            <rect width="18" height="4" y="8" fill="#D62612" />
                          </svg>
                        </>
                      )}
                    </a>
                  )
                )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm bg-primary text-primary-foreground px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
                >
                  <ExternalLink className="w-4 h-4" />{" "}
                  {t("projects.liveDemo", language)}
                </a>
              )}
            </div>

            <div className="space-y-2">
              {localize(project.fullDescription, language)
                .trim()
                .split("\n")
                .map((line, i) => {
                  const trimmed = line.trim();
                  if (trimmed === "") {
                    return <div key={i} className="h-2" />;
                  }
                  if (trimmed.startsWith("-")) {
                    return (
                      <div
                        key={i}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        <span>
                          {renderFormatted(trimmed.replace(/^-\s*/, ""))}
                        </span>
                      </div>
                    );
                  }
                  if (trimmed.startsWith(">")) {
                    return (
                      <p
                        key={i}
                        className="text-sm text-muted-foreground leading-relaxed pl-3.5"
                      >
                        {renderFormatted(trimmed.replace(/^>\s*/, ""))}
                      </p>
                    );
                  }
                  return (
                    <p
                      key={i}
                      className="text-sm text-muted-foreground leading-relaxed"
                    >
                      {renderFormatted(trimmed)}
                    </p>
                  );
                })}
            </div>
          </div>
        </div>
        {isScrollable && !hasScrolled && (
          <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-card to-transparent pointer-events-none flex items-end justify-center pb-2">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center animate-bounce">
              <ArrowRight className="w-4 h-4 rotate-90 text-foreground" />
            </div>
          </div>
        )}
      </div>

      {/* ── Lightbox ── */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm py-4 overflow-y-auto"
          onClick={(e) => {
            e.stopPropagation();
            setLightboxOpen(false);
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxOpen(false);
            }}
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white text-2xl hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goTo((imgIdx - 1 + images.length) % images.length);
              }}
              disabled={imgLoading}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white text-3xl hover:bg-primary transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ‹
            </button>
          )}
          {isVideo(images[imgIdx].src) ? (
            <video
              src={images[imgIdx].src}
              className="max-w-[85vw] max-h-[80vh] rounded-lg shadow-2xl"
              controls
              autoPlay
              loop
              playsInline
              onCanPlay={() => setImgLoading(false)}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <div
              className="relative overflow-hidden"
              style={{
                width: "85vw",
                maxWidth: "1200px",
                maxHeight: "80vh",
                cursor: zoom > 1 ? (dragging ? "grabbing" : "grab") : "default"
              }}
              onWheel={handleWheel}
              onMouseDown={(e) => {
                if (zoom > 1) {
                  setDragging(true);
                  setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
                }
              }}
              onMouseMove={(e) => {
                if (dragging) {
                  const raw = {
                    x: e.clientX - dragStart.x,
                    y: e.clientY - dragStart.y
                  };
                  setPan(clampPan(raw.x, raw.y, zoom));
                }
              }}
              onMouseUp={() => setDragging(false)}
              onMouseLeave={() => setDragging(false)}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[imgIdx].src}
                alt={localize(images[imgIdx].caption, language)}
                className={`w-full h-full object-contain select-none transition-opacity duration-150 ${imgLoading ? "opacity-40" : "opacity-100"}`}
                style={{
                  transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                  transformOrigin: "center",
                  transition: dragging ? "none" : "transform 0.1s"
                }}
                onLoad={() => setImgLoading(false)}
                onError={() => setImgLoading(false)}
                draggable={false}
              />
            </div>
          )}

          {imgLoading && !isVideo(images[imgIdx].src) && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
          )}

          <div className="flex flex-col items-center gap-3 mt-4 px-6 max-w-[85vw]">
            {!isVideo(images[imgIdx].src) && (
              <div className="flex items-center gap-3">
                <span className="text-white/50 text-sm">
                  {t("projects.scrollToZoom", language)}
                </span>
                {zoom > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      resetZoom();
                    }}
                    className="text-sm text-white/70 border border-white/20 px-2 py-0.5 cursor-pointer rounded-full hover:border-white/50 transition-colors"
                  >
                    {t("projects.resetZoom", language)}
                  </button>
                )}
              </div>
            )}
            {images.length > 1 && (
              <div className="flex gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      goTo(i);
                    }}
                    disabled={imgLoading}
                    className={`w-2 h-2 rounded-full transition-colors disabled:cursor-not-allowed ${
                      i === imgIdx ? "bg-primary" : "bg-white/40"
                    }`}
                  />
                ))}
              </div>
            )}
            <p className="text-white/70 text-sm text-center leading-relaxed">
              {localize(images[imgIdx].caption, language)}
            </p>
          </div>

          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goTo((imgIdx + 1) % images.length);
              }}
              disabled={imgLoading}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white text-3xl hover:bg-primary transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ›
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Projects ──────────────────────────────────────────────────────────────
function ProjectsSection() {
  const [selected, setSelected] = useState<Project | null>(null);
  const { language } = useLanguage();

  return (
    <section id="projects" className="py-24 px-6 sm:px-12 lg:px-20">
      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
      <div className="max-w-7xl mx-auto">
        <h2 className="reveal text-4xl sm:text-6xl font-bold mb-12">
          {t("projects.heading", language)}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 5).map((project) => (
            <div
              key={project.id}
              onClick={() => setSelected(project)}
              className="reveal group relative bg-card rounded-2xl overflow-hidden shadow hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-border hover:border-primary/30 cursor-pointer"
            >
              <div className="h-1 w-full bg-gradient-to-r from-primary to-primary/40" />
              <div className="aspect-[4/3] bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center relative overflow-hidden">
                <div className="w-full h-full absolute inset-0">
                  {PROJECT_CARD_IMAGES[project.id] ? (
                    <img
                      src={PROJECT_CARD_IMAGES[project.id]}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 px-4 text-center h-full justify-center">
                      <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center">
                        <span className="text-2xl font-bold text-primary">
                          {project.title.charAt(0)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 bg-primary/80 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-2">
                  <span className="text-white text-base font-semibold">
                    {t("projects.clickToExpand", language)}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-xl">{project.title}</h3>
                  <Badge
                    variant="outline"
                    className="text-sm rounded-full shrink-0"
                  >
                    {project.year}
                  </Badge>
                </div>
                <p className="text-base text-muted-foreground mt-1.5">
                  {localize(project.shortDescription, language)}
                </p>
              </div>
              <div className="absolute top-4 right-4 w-7 h-7 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                <ArrowRight className="w-3 h-3 text-primary" />
              </div>
            </div>
          ))}
          <div
            className="reveal group relative bg-card rounded-2xl overflow-hidden border-2 border-dashed border-border hover:border-primary transition-colors flex items-center justify-center aspect-[4/3] sm:min-h-[280px] cursor-pointer"
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <div className="text-center p-6">
              <div className="w-12 h-12 rounded-full border-2 border-foreground/30 flex items-center justify-center mx-auto mb-4 group-hover:border-primary group-hover:text-primary transition-colors">
                <span className="text-2xl">+</span>
              </div>
              <h3 className="font-bold text-lg">
                {t("projects.collaborateTitle", language)}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact ───────────────────────────────────────────────────────────────
function ContactSection() {
  const { language } = useLanguage();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const body = `From: ${form.name} (${form.email})\n\n${form.message}`;
    const mailtoLink = `mailto:kaloyan.kostadinov0730@gmail.com?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    await new Promise((r) => setTimeout(r, 500));
    setSubmitting(false);
    setDone(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section
      id="contact"
      className="py-24 px-6 sm:px-12 lg:px-20 bg-card/40 relative overflow-hidden"
    >
      <div
        className="blob absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.06]"
        style={{ background: "#FF001A", animationDelay: "2s" }}
      />
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="reveal text-center mb-14">
          <h2 className="text-4xl sm:text-6xl font-bold">
            {t("contact.headingLine1", language)}
            <br />
            <span className="text-primary">
              {t("contact.headingLine2", language)}
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("contact.subtitle", language)}
          </p>
        </div>
        <Card className="reveal shadow-xl">
          <CardContent className="p-8">
            {done ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  <Send className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  {t("contact.sentTitle", language)}
                </h3>
                <p className="text-muted-foreground mb-6 text-base">
                  {t("contact.sentSubtitle", language)}
                </p>
                <Button
                  size="lg"
                  className="rounded-full px-8 text-base bg-transparent border border-border font-semibold text-foreground cursor-pointer hover:bg-secondary transition-all duration-300"
                  onClick={() => setDone(false)}
                >
                  {t("contact.sendAnother", language)}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-base">
                      {t("contact.name", language)}
                    </Label>
                    <Input
                      id="name"
                      placeholder={t("contact.namePlaceholder", language)}
                      className="rounded-xl text-base"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-base">
                      {t("contact.email", language)}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t("contact.emailPlaceholder", language)}
                      className="rounded-xl text-base"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="subject" className="text-base">
                    {t("contact.subject", language)}
                  </Label>
                  <Input
                    id="subject"
                    placeholder={t("contact.subjectPlaceholder", language)}
                    className="rounded-xl text-base"
                    value={form.subject}
                    onChange={(e) =>
                      setForm({ ...form, subject: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="message" className="text-base">
                    {t("contact.message", language)}
                  </Label>
                  <Textarea
                    id="message"
                    placeholder={t("contact.messagePlaceholder", language)}
                    rows={5}
                    className="rounded-xl resize-none text-base"
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    required
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full rounded-full text-base cursor-pointer"
                  disabled={submitting}
                >
                  {submitting ? (
                    t("contact.sending", language)
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      {t("contact.sendMessage", language)}
                    </>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────
function Footer() {
  const { language } = useLanguage();
  return (
    <footer className="py-8 px-6 sm:px-12 lg:px-20 border-t border-border">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm text-muted-foreground">
          {t("footer.text", language)} &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────
export default function Home() {
  useReveal();

  return (
    <>
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
