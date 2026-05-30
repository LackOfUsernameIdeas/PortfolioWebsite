"use client";

import { useEffect, useState } from "react";
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
  Code2
} from "lucide-react";
import { projects, achievements, type Project } from "@/lib/projects-data";

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
          Kaloyan
          <br />
          <span className="text-primary">Kostadinov</span>
        </h1>
        <p
          className={`${a ? "hero-2" : "opacity-0"} mt-6 text-lg sm:text-xl text-muted-foreground max-w-md leading-relaxed`}
        >
          Full-stack developer & engineer building innovative solutions in AI,
          IoT, and Robotics.
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
            View Projects <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex items-center gap-2 border border-border px-7 py-3 rounded-full font-semibold cursor-pointer hover:bg-secondary transition-all duration-300"
          >
            Contact Me
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
            >
              <Mail className="w-4 h-4" />
            </a>
            <span className="absolute top-12 left-0 px-2.5 py-1 rounded-md bg-popover border border-border text-md text-foreground whitespace-nowrap opacity-0 pointer-events-none group-hover/email:opacity-100 transition-opacity duration-200 shadow-md">
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
          SCROLL
        </span>
      </div>
    </section>
  );
}

// ─── About ─────────────────────────────────────────────────────────────────
const skills = [
  {
    category: "Languages",
    items: ["Python", "TypeScript", "C++", "Solidity", "Rust"]
  },
  {
    category: "Frameworks",
    items: ["React", "Next.js", "Node.js", "FastAPI", "ROS"]
  },
  {
    category: "AI / ML",
    items: ["TensorFlow", "PyTorch", "OpenCV", "Scikit-learn"]
  },
  {
    category: "Hardware",
    items: ["Arduino", "Raspberry Pi", "ESP32", "CAD/CAM"]
  },
  { category: "Tools", items: ["Git", "Docker", "Linux", "AWS", "Figma"] }
];

function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 sm:px-12 lg:px-20 bg-card/40">
      <div className="max-w-7xl mx-auto">
        <div className="reveal flex items-end gap-6 mb-16">
          <h2 className="text-4xl sm:text-6xl font-bold">About Me</h2>
          <div className="hidden sm:flex items-center gap-2 pb-2 text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm">Bulgaria</span>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="reveal space-y-5 text-lg text-muted-foreground leading-relaxed">
            <p>
              I am a passionate software developer and engineer with expertise
              in full-stack development, IoT systems, artificial intelligence,
              and robotics. My work spans across multiple disciplines, combining
              hardware and software to create innovative solutions.
            </p>
            <p>
              With a strong foundation in computer science and hands-on
              experience in competitive programming, I have achieved recognition
              in national and international competitions.
            </p>
            <p>
              Currently seeking opportunities to apply my skills in challenging
              projects and collaborate with like-minded professionals.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="rounded-full px-8" asChild>
                <a href="/cv-europass.pdf" download>
                  <Download className="h-5 w-5 mr-2" /> Download CV
                </a>
              </Button>
              <Button
                size="lg"
                className="rounded-full px-8 bg-transparent border border-border font-semibold text-foreground cursor-pointer hover:bg-secondary transition-all duration-300"
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Contact Me
              </Button>
            </div>
          </div>
          <div className="reveal grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skills.map((group) => (
              <Card
                key={group.category}
                className="bg-card/80 hover:border-primary/30 transition-colors"
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold text-primary">
                    {group.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((s) => (
                      <Badge
                        key={s}
                        variant="secondary"
                        className="rounded-full text-xs"
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

        {/* Achievements — no `group` on Card, icon uses plain hover: */}
        <div className="mt-24">
          <h3 className="reveal text-3xl sm:text-4xl font-bold mb-12">
            Achievements
          </h3>
          <div className="space-y-10">
            {Object.entries(
              achievements.reduce(
                (acc, a) => {
                  if (!acc[a.year]) acc[a.year] = [];
                  acc[a.year].push(a);
                  return acc;
                },
                {} as Record<string, typeof achievements>
              )
            )
              .sort((a, b) => b[0].localeCompare(a[0]))
              .map(([year, items]) => (
                <div key={year} className="reveal">
                  <h4 className="text-xl font-semibold text-primary mb-4">
                    {year}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map((a, i) => {
                      const Icon =
                        a.type === "competition"
                          ? Trophy
                          : a.type === "award"
                            ? Award
                            : GraduationCap;
                      return (
                        <Card
                          key={i}
                          className="hover:border-primary/30 transition-colors"
                        >
                          <CardHeader className="pb-2">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-xl bg-primary/10 text-primary">
                                <Icon className="h-4 w-4" />
                              </div>
                              <Badge
                                variant="outline"
                                className="rounded-full text-xs capitalize"
                              >
                                {a.type}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="font-semibold text-sm">{a.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {a.description}
                            </p>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Project Modal ─────────────────────────────────────────────────────────
function ProjectModal({
  project,
  onClose
}: {
  project: Project;
  onClose: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

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
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-secondary flex items-center justify-center cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="overflow-y-auto p-6 sm:p-8 flex flex-col gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="rounded-full text-xs">
                {project.year}
              </Badge>
              <Badge className="rounded-full text-xs bg-primary/10 text-primary border-0">
                {project.category}
              </Badge>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold">{project.title}</h2>
            <p className="text-muted-foreground mt-2">
              {project.shortDescription}
            </p>
          </div>
          <div className="space-y-2">
            {project.fullDescription
              .trim()
              .split("\n")
              .map((line, i) =>
                line.trim() === "" ? null : line.trim().startsWith("-") ? (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span>{line.replace(/^-\s*/, "")}</span>
                  </div>
                ) : (
                  <p
                    key={i}
                    className="text-sm text-muted-foreground leading-relaxed"
                  >
                    {line.trim()}
                  </p>
                )
              )}
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-primary" /> Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <Badge key={t} variant="secondary" className="rounded-full">
                  {t}
                </Badge>
              ))}
            </div>
          </div>
          {project.rankings && project.rankings.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-primary" /> Rankings & Awards
              </h3>
              <div className="space-y-1.5">
                {project.rankings.map((r, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {r}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="flex flex-wrap gap-3 pt-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm border border-border px-4 py-2 rounded-full hover:border-primary hover:text-primary transition-colors"
              >
                <Github className="w-4 h-4" /> GitHub
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm bg-primary text-primary-foreground px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
              >
                <ExternalLink className="w-4 h-4" /> Live Demo
              </a>
            )}
            {project.documentationUrl && (
              <a
                href={project.documentationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm border border-border px-4 py-2 rounded-full hover:border-primary hover:text-primary transition-colors"
              >
                <ExternalLink className="w-4 h-4" /> Docs
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Projects ──────────────────────────────────────────────────────────────
function ProjectsSection() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 px-6 sm:px-12 lg:px-20">
      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
      <div className="max-w-7xl mx-auto">
        <h2 className="reveal text-4xl sm:text-6xl font-bold mb-12">
          Projects
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 5).map((project) => (
            <div
              key={project.id}
              onClick={() => setSelected(project)}
              className="reveal group relative bg-card rounded-2xl overflow-hidden shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border hover:border-primary/30 cursor-pointer"
            >
              <div className="h-1 w-full bg-gradient-to-r from-primary to-primary/40" />
              <div className="aspect-[4/3] bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center relative overflow-hidden">
                <div className="w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">
                    {project.title.charAt(0)}
                  </span>
                </div>
                <div className="absolute inset-0 bg-primary/80 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-2">
                  <span className="text-white text-sm font-semibold">
                    Click to expand
                  </span>
                  <span className="text-white/70 text-xs">
                    {project.technologies.slice(0, 3).join(" · ")}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-base">{project.title}</h3>
                  <Badge
                    variant="outline"
                    className="text-xs rounded-full shrink-0"
                  >
                    {project.year}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {project.shortDescription}
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
              <h3 className="font-semibold">Start a new project</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact ───────────────────────────────────────────────────────────────
function ContactSection() {
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
            {"Let's work"}
            <br />
            <span className="text-primary">together!</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Have a project in mind? I'd love to hear from you.
          </p>
        </div>
        <Card className="reveal shadow-xl">
          <CardContent className="p-8">
            {done ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  <Send className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                <p className="text-muted-foreground mb-6 text-sm">
                  I'll respond as soon as possible.
                </p>
                <Button
                  variant="outline"
                  className="rounded-full px-8"
                  onClick={() => setDone(false)}
                >
                  Send Another
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      className="rounded-xl"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@email.com"
                      className="rounded-xl"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="What is this about?"
                    className="rounded-xl"
                    value={form.subject}
                    onChange={(e) =>
                      setForm({ ...form, subject: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Your message..."
                    rows={5}
                    className="rounded-xl resize-none"
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
                  className="w-full rounded-full cursor-pointer"
                  disabled={submitting}
                >
                  {submitting ? (
                    "Sending…"
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
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
  return (
    <footer className="py-8 px-6 sm:px-12 lg:px-20 border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Legal Notice
          </a>
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Kaloyan Kostadinov
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
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
