"use client";

import { useCallback, useEffect, useState } from "react";
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
  const [emailTipOpen, setEmailTipOpen] = useState(false);

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
          Full-stack Software Developer | Building scalable web and mobile
          applications
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
      "PyNuitrack",
      "Nuitrack SDK",
      "BeautifulSoup"
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

function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 sm:px-12 lg:px-20 bg-card/40">
      <div className="max-w-7xl mx-auto">
        <div className="reveal flex items-end gap-6 mb-16">
          <h2 className="text-4xl sm:text-6xl font-bold">About Me</h2>
          <div className="hidden sm:flex items-center gap-2 pb-2 text-muted-foreground">
            <MapPin className="w-5 h-5 text-primary" />
            <span className="text-lg">Bulgaria</span>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="reveal space-y-5 text-lg text-muted-foreground leading-relaxed">
            <p>
              I am a passionate software developer and engineer with practical
              knowledge in full-stack development, android development,
              artificial intelligence, databases, electronical sensors and more.
              My work spans across multiple disciplines, combining hardware and
              software to create innovative solutions.
            </p>
            <p>
              With a strong foundation in computer science and hands-on
              experience in competitive programming, I have achieved recognition
              in national competitions.
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
          <div className="reveal grid grid-cols-1 sm:grid-cols-2 gap-3 auto-rows-fr">
            {skills.map((group) => (
              <Card
                key={group.category}
                className="bg-card/80 hover:border-primary/30 transition-colors flex flex-col h-full"
              >
                <CardHeader>
                  <CardTitle className="text-base font-semibold text-primary">
                    {group.category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex items-center">
                  <div className="flex flex-wrap gap-1">
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

        {/* Achievements */}
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

// ─── Project image map ─────────────────────────────────────────────────────
const PROJECT_CARD_IMAGES: Record<string, string> = {
  mobilis: "/mobilis.png",
  mindreel: "/mindreel.png",
  nutrifit: "/nutrifit.png",
  tikfluence: "/tikfluence.png"
};

const PROJECT_IMAGES: Record<string, { src: string; caption: string }[]> = {
  mobilis: [
    {
      src: "/mobilis.png",
      caption:
        "Mobilis - AI-powered fitness companion for personalized health insights"
    },
    {
      src: "https://i.imgur.com/3QkqjmP.png",
      caption: "Dashboard - BMI, body fat %, lean mass & weight forecast"
    },
    {
      src: "https://i.imgur.com/KgmV9pP.png",
      caption: "AI-generated meal plan with macros, ingredients & recipes"
    },
    {
      src: "https://i.imgur.com/QH3t4Ls.png",
      caption: "Orbbec Astra+ 3D posture correction in real time"
    }
  ],
  mindreel: [
    {
      src: "/mindreel.png",
      caption:
        "MindReel - neuroassistant platform that transforms brain activity and personal preferences into the perfect content - movies, TV series, books, and songs"
    },
    {
      src: "/mindreel1.png",
      caption:
        "Home page statistics displaying average machine learning evaluation metrics (Precision – 82.27% for last generation, 29.48% overall; Recall – 54.49%; F1 Score – 29.44%) across all users, alongside a book adaptations counter showing how many recommended books have been adapted into movies and series (360 movie adaptations, 133 series adaptations, 493 total)"
    },
    {
      src: "/mindreel2.png",
      caption:
        "Music statistics showing average Spotify popularity (63.50/100) and YouTube engagement metrics (403.6M views, 2.4M likes, 73.6K comments) fetched via the Spotify and YouTube APIs, followed by other platform-wide stats including total users (20), most recommended genre (Drama), average box office ($90,851,285), and total awards count (21,380)"
    },
    {
      src: "/mindreel3.png",
      caption:
        "The New Recommendations page entry point, where the user selects the type of content they want to explore - Movies & Series, Books, or Music - before being guided through a preference questionnaire that collects data for the AI prompt"
    },
    {
      src: "/mindreel4.mov",
      caption:
        "Full end-to-end walkthrough of the EEG analysis session - the NeuroSky MindWave Mobile 2 headset is placed on the head and connected via Bluetooth, after which the user runs a purpose-built Python .exe application that establishes a Socket.IO connection with the MindReel API and begins transmitting the raw brainwave data in real time. Once the connection is confirmed, the live brain activity dashboard activates, displaying the Attention and Meditation meter values as circular gauges, a combined area chart tracking both metrics over time, and eight individual brainwave frequency charts (Delta, Theta, Low Alpha, High Alpha, Low Beta, High Beta, Low Gamma, High Gamma) - all streamed for one minute until the session ends and the collected data is forwarded to the AI for recommendation generation"
    },
    {
      src: "/mindreel5.mov",
      caption:
        "Five generated movies and series recommendations produced as a result of the EEG analysis - each card displays the title in Bulgarian and English, genre, duration, release year, IMDb rating and vote count, Metascore, Rotten Tomatoes score, description, plot summary, and additional metadata including director, writers, cast, release date, language, country, awards, and box office revenue. There is a diagnostic section that explains why the recommendation serves as a corrective for the user's recorded psycho-emotional state. Each card includes a trailer button that opens an embedded YouTube player in a modal, and a bookmark icon for adding or removing the title from the personal watchlist"
    },
    {
      src: "/mindreel6.png",
      caption:
        "A recommendation card generated via the standard preference questionnaire, following the same structure as the EEG-based results. There is a section explaining why the title was recommended based on the inputted individual preferences"
    },
    {
      src: "/mindreel7.png",
      caption:
        "Relevance analysis panel for the last recommendation generation - each recommendation is displayed as a navigable card (with previous/next arrows) showing its relevance classification (Relevant/Irrelevant) and a breakdown score across six categories: Genres, Type, Mood, Watch Time, Creation Period, and Target Audience, each scored individually and summed into a total relevance score (e.g. 7/7). Below, a summary row shows the number of relevant recommendations, total recommendations generated, Precision percentage, and average relevance score for the generation"
    },
    {
      src: "/mindreel8.png",
      caption:
        "A book recommendation card displaying data scraped from Goodreads — showing the cover image, genres, Goodreads rating (4.24 / 1,204,089 votes), explanation of why the book was recommended, description, characters, literary awards, adaptations (movies, series, theatre, and more), is the book part of a series, and additional metadata such as origin, language, cover type, setting, publisher, publication date, and ISBN"
    },
    {
      src: "/mindreel9.png",
      caption:
        "A music recommendation card displaying data fetched from the Spotify and YouTube APIs — showing the thumbnail with a play button for the YouTube video, Spotify popularity score (91/100) with a direct listening link, YouTube views (383.0M) and likes (2.0M), an explanation of why the song was recommended, description, and additional metadata such as artists, album, album type, duration, release date, tracks in album, and Spotify popularity"
    },
    {
      src: "/mindreel10.png",
      caption:
        "The VR cinema page showing the entry button to the A-Frame virtual scene, alongside a keyboard and mouse controls reference panel (WASD and arrow keys for navigation, left mouse button drag for rotation)"
    },
    {
      src: "/mindreel11.png",
      caption:
        'Inside the A-Frame virtual cinema hall — featuring rows of red seats, a ceiling projector and spotlights, a popcorn machine with yellow lights on the left, and navigation arrows for switching between recommendations, with the "Home Alone" recommendation card displayed on the central screen'
    },
    {
      src: "/mindreel12.png",
      caption:
        "There are two side screens — the left displaying the per-recommendation relevance breakdown by criteria (Genres, Type, Mood, Time, Age, Target Group) with a score of 6/7, and the right showing the Overall Analysis panel with 4 relevant recommendations out of 5 generated, 80.00% Precision, and an average relevance score of 5.60"
    },
    {
      src: "/mindreel13.png",
      caption:
        "Trailer playback view inside the VR scene — the movie trailer is downloaded via yt-dlp, stored in Google Cloud Storage, and loaded as a <video> element rendered on the cinema screen, with playback controls (play, replay, progress bar at 0:59/2:13) and a close button"
    },
    {
      src: "/mindreel14.png",
      caption:
        "The exit door of the virtual cinema hall — a 3D double door with a glowing EXIT sign above it, rendered as part of the immersive cinema environment built in A-Frame"
    },
    {
      src: "/mindreel15.png",
      caption:
        "AI Analyzer page showing the user-specific machine learning metrics — Precision (34.28%, 194 relevant out of 566 total generated), Recall/TPR (70.80%, 194 out of 274 relevant recommendations in the system sent to the user), and F1 Score (46.19%, balance between Precision and Recall) — alongside the four statistics used in their calculation: total recommendations generated (TP+FP: 566), relevant among generated (TP: 194), total recommendations in platform (TP+TN+FP+FN: 792), and total relevant recommendations in platform (274)"
    },
    {
      src: "/mindreel16.png",
      caption:
        "AI Analyzer page showing two paginated line charts tracking the average Precision, Recall, and F1 Score over time (February–March 2025) — the left chart represents values across all platform users, while the right chart tracks the same metrics for the individual user, allowing direct comparison between personal AI behavior and the overall platform trend"
    },
    {
      src: "/mindreel17.png",
      caption:
        "The visualization is showing the extended recommendation metrics — FPR (71.81%, 372 irrelevant recommendations sent out of 518 total irrelevant in the platform), Specificity (28.19%), FNR (29.2%), and Accuracy (42.93%) — with a detailed breakdown panel for the currently selected metric (FPR) displaying its formula, progress bar, and the TP/FP/FN/TN counts, alongside a legend explaining all four types of AI predictions"
    },
    {
      src: "/mindreel18.png",
      caption:
        "The Watchlist page displaying saved movies and series recommendations as cards with poster and metadata — with the filter panel on the right, offering filtering by genre, duration, type (movies or series), actors, directors, writers, languages, IMDb rating, Metascore, box office, and release year, with Apply and Reset buttons. The Readlist and Listenlist pages have the same structure and filtering options, but for books and music respectively"
    },
    {
      src: "/mindreel19.png",
      caption:
        "Individual statistics page showing four sections: a paginated table of the most frequently recommended movies and series (565 total) with prosperity rating, box office, and Oscar wins; a top directors/actors/writers table ranked by recommendation count with average IMDb and Rotten Tomatoes ratings; a bar chart of the user's most recommended genres; and a summary count of total recommendations split by movies (359), series (206), and combined (565)"
    },
    {
      src: "/mindreel20.png",
      caption:
        "MindReel - neuroassistant platform that transforms brain activity and personal preferences into the perfect content - movies, TV series, books, and songs"
    },
    {
      src: "/mindreel21.png",
      caption:
        "MindReel - neuroassistant platform that transforms brain activity and personal preferences into the perfect content - movies, TV series, books, and songs"
    },
    {
      src: "/mindreel22.png",
      caption:
        "MindReel - neuroassistant platform that transforms brain activity and personal preferences into the perfect content - movies, TV series, books, and songs"
    },
    {
      src: "/mindreel23.png",
      caption:
        "MindReel - neuroassistant platform that transforms brain activity and personal preferences into the perfect content - movies, TV series, books, and songs"
    },
    {
      src: "/mindreel24.png",
      caption:
        "MindReel - neuroassistant platform that transforms brain activity and personal preferences into the perfect content - movies, TV series, books, and songs"
    },
    {
      src: "/mindreel25.png",
      caption:
        "MindReel - neuroassistant platform that transforms brain activity and personal preferences into the perfect content - movies, TV series, books, and songs"
    },
    {
      src: "/mindreel26.png",
      caption:
        "MindReel - neuroassistant platform that transforms brain activity and personal preferences into the perfect content - movies, TV series, books, and songs"
    },
    {
      src: "/mindreel27.png",
      caption:
        "MindReel - neuroassistant platform that transforms brain activity and personal preferences into the perfect content - movies, TV series, books, and songs"
    },
    {
      src: "/mindreel28.png",
      caption:
        "MindReel - neuroassistant platform that transforms brain activity and personal preferences into the perfect content - movies, TV series, books, and songs"
    },
    {
      src: "/mindreel29.png",
      caption:
        "MindReel - neuroassistant platform that transforms brain activity and personal preferences into the perfect content - movies, TV series, books, and songs"
    }
  ],
  nutrifit: [
    {
      src: "/nutrifit.png",
      caption:
        "NutriFit - platform that actively supports users in maintaining their optimal weight and healthy lifestyle"
    },
    {
      src: "/nutrifit2.png",
      caption:
        "ChatGPT vs Gemini AI deviation comparison panel. The overall score (e.g. 12.61% vs 33.50%) represents the platform-wide average absolute deviation - calculated by taking the absolute deviation of every meal plan generation ever stored in the database, across all users and all categories, and averaging the results into a single value. Deviations are treated as absolute values, meaning both undershooting and overshooting the user's nutritional limits count equally. Below that, two category-level breakdowns are shown for each model: average deviation (absolute difference from the user's defined limit per each category, in grams and %) and maximum deviation (the largest absolute overshoot or undershoot ever recorded per category), across Calories, Protein, Carbohydrates, and Fats."
    },
    {
      src: "/nutrifit3.png",
      caption:
        "Platform-wide user statistics dashboard showing average body metrics and nutrient intake split by gender (45 men, 36 women, 81 total), visualized as both a line chart and a bar chart."
    },
    {
      src: "/nutrifit4.png",
      caption:
        "Weight Calculator page showing the user's BMI (26.78 - overweight, healthy range 18.5–25), ideal weight (70.99kg, currently 11.01kg above), and body composition breakdown - body fat % (24.09%), fat mass (19.75kg), and lean mass (62.25kg). Each metric includes a day-over-day comparison against the previous entry."
    },
    {
      src: "/nutrifit5.png",
      caption:
        "Historical body composition charts tracking the user's daily progress over time - weight, BMI, body fat %, fat mass, lean mass, and kg above/below ideal weight."
    },
    {
      src: "/nutrifit6.png",
      caption:
        "Meal plan generation page - the user selects their activity level (6 levels), a calorie goal (7 presets from mild weight loss to extreme bulk, BMR value), and a diet type (Balanced, Low Fat, Low Carb, High Protein), which auto-fills the macro targets. The user can also specify foods to exclude and choose a cuisine (Bulgarian, Spanish, Italian, French). Submitting generates a meal plan via either OpenAI or Gemini."
    },
    {
      src: "/nutrifit7.png",
      caption:
        "AI-generated meal plan showing breakfast (1 dish) and lunch (starter, main, dessert) - each meal card displays a food image fetched via Google Custom Search API, weight in grams, and exact macros (calories, protein, carbs, fats), with a button linking to the preparation steps."
    },
    {
      src: "/nutrifit8.png",
      caption:
        "Dinner section (main + dessert) of the meal plan, followed by the daily macro totals - summed calories, protein, carbs, and fats across all meals - with Gemini's deviation shown per category in both absolute grams and percentage, indicating how far the generated plan strayed from the current user's defined limits."
    },
    {
      src: "/nutrifit9.png",
      caption:
        "Most recommended foods ranking - dishes sorted by how many times the system included them in generated meal plans across all users. The top entry expands to show full nutritional details (calories, macros, serving size) and a macro bar chart, with buttons to view ingredients and the recipe. The sidebar also shows the other 4 ranking pages (by calories, fats, carbs, protein)."
    },
    {
      src: "/nutrifit10.mov",
      caption:
        "The video demonstration showcases the user interface and features of the NutriFit mobile application."
    },
    {
      src: "/nutrifit11.png",
      caption:
        "NutriFit mobile app - welcome screen, login form, and daily measurements input (height, age, weight, neck, waist, hip circumference) used to calculate body metrics."
    },
    {
      src: "/nutrifit12.png",
      caption:
        "Meal plan generation form - activity level selection (6 levels), calorie goal presets, diet type table with auto-filled macros, foods to exclude, cuisine selection, and generate buttons for OpenAI or Gemini - all the same as the web version."
    },
    {
      src: "/nutrifit13.png",
      caption:
        "Info tooltips on the meal plan form explaining activity levels (1–6) and diet types. Activity levels range from Level 1 (little to no exercise, e.g. short walk or light yoga) up to Level 6 (very intense daily training, e.g. marathon prep, 2hr cycling, weightlifting). Diet types cover Balanced (even macro distribution for general health), Low Fat (reduced fat for calorie control), Low Carb (minimized carbs with adequate protein and healthy fats), and High Protein (prioritizes protein intake, ideal for muscle development and strength training)."
    },
    {
      src: "/nutrifit14.png",
      caption:
        "Meal plan result - breakfast dishes with food images, weight, and macros, followed by daily macro totals with their deviations in absolute grams and percentage. This image also shows the diet type tooltip modal explaining each type in details."
    },
    {
      src: "/nutrifit15.png",
      caption:
        "Recipe modal showing ingredients and preparation steps for a selected dish, alongside the full daily macro summary with deviation per category (calories, protein, carbs, fats) in both absolute and percentage values."
    },
    {
      src: "/nutrifit16.png",
      caption:
        "Diagram of the NutriFit API data flow. The user's measurements (weight, age, gender, neck, hip, waist, height, goal) and activity level are sent to the `measurements/userData` endpoint, which batches all calculations into a single request to the Fitness Calculator API - covering body fat, daily calories, macros, ideal weight, and BMI. The response is processed by the NutriFit API and saved to Firestore (Firebase) under the `additionalUserData` collection, keyed by UID. Simultaneously, the user is redirected to `admin/default`. This architecture is designed to work only with a single API call per day."
    },
    {
      src: "/nutrifit17.png",
      caption:
        "Diagram of the meal plan generation flow. The user's preferences (excluded foods, cuisine, protein, diet type, carbs, fats, calories) are saved and fed into an AI prompt, which is sent to either the OpenAI API or the NutriFit API (Gemini via Vertex AI library). The raw response is cleaned into a structured meal plan object. Dish names from the response are then sent to the Google Custom Search API to fetch food images, which are injected back into the final meal plan rendered on the `admin/mealplan` page."
    },
    {
      src: "/nutrifitDB.png",
      caption:
        "Firestore database schema for NutriFit. Each user document is keyed by UID and stores gender and goal as top-level fields, with a `dataEntries` subcollection where each document is keyed by date (YYYY-MM-DD). Each daily entry holds body measurements (weight, waist, neck, hip, height, age), BMI data (bmi, health status, healthy range), perfect weight (ideal value and difference from current). Preferences are also stored (calories, nutrients per diet type), as well as the full meal plans for both OpenAI and Gemini (breakfast, lunch with appetizer/main/dessert, dinner) each with dish name, ingredients, instructions, image, recipe quantity, and deviations (absolute value, percentage, user limit) per macro category. Alongside, 'MacroNutrients' and 'DailyCalorieRequirements' are stored by being broken down across all 6 activity levels, diet types, and calorie goals (ExtremeLoss, MildLoss, Loss, Gain, MildGain, ExtremeGain)."
    }
  ],
  tikfluence: [
    {
      src: "/tikfluence.png",
      caption:
        "TikFluence - data analytics platform proving TikTok's cross-platform music influence."
    },
    {
      src: "/tikfluence2.png",
      caption:
        "Ranking of songs whose popularity was most influenced by TikTok. The table contains data about peak popularity dates on Spotify and TikTok, showing the time difference between them in days. There is also a section that includes the most frequently used hashtags in TikTok video descriptions."
    },
    {
      src: "/tikfluence3.png",
      caption:
        "The visualization is representing the change in popularity, including rises and declines within the respective platform, and highlights the peak date."
    },
    {
      src: "/tikfluence4.png",
      caption:
        "Explanation of the TikTok influence effect. A song increases in popularity across TikTok and Spotify until reaching peak interest on both platforms. When the TikTok peak happens before the Spotify peak, the song is classified as influenced by TikTok, where exposure on TikTok drives later growth on Spotify."
    },
    {
      src: "/tikfluence5.png",
      caption:
        "Table showing songs affected by the TikTok influence effect. The dataset includes tracks that appeared in the global Top 200 TikTok songs ranking from the “ОЩЕ СТАТИСТИКИ” section, along with their peak dates on TikTok and Spotify."
    },
    {
      src: "/tikfluence6.png",
      caption:
        "Ranking of the most streamed songs on TikTok across all platform users (Global Top 200 TikTok Songs). It shows information such as the number of recent videos created, total likes across all TikTok videos, YouTube views, and Spotify popularity index (0–100). Each song has a subpage accessed via “Вижте нарастване / Вижте детайли” button, which includes detailed popularity metrics."
    },
    {
      src: "/tikfluence7.png",
      caption:
        "The statistics shown apply to the selected song from the respective ranking, including position in the ranking of most popular songs, changes in the popularity statistics over the time, and daily percentage growth on likes, views, videos made, and popularity index."
    },
    {
      src: "/tikfluence8.png",
      caption:
        "After authenticating using a personal TikTok account, the user can view real-time statistics such as follower count, following count, total likes, and number of videos. This approach is relies on a self-hosted proxy server with Socket.IO for transmitting data from TikTok servers to the end user."
    },
    {
      src: "/tikfluence9.png",
      caption:
        "Ranking of Top 200 most popular TikTok content creators. There is information such as change of follower count over time, total likes, and total number of videos created. Each creator has a subpage with detailed statistics and growth metrics."
    },
    {
      src: "/tikfluence10.png",
      caption:
        "Main information related to the selected video from the ranking list - views, shares, and likes. Similar to the song details page, there are chronological diagrams showing growth or decline in the follower count."
    },
    {
      src: "/tikfluence11.png",
      caption:
        "OAuth authentication flow for accessing personal TikTok account data: the server requests an access and refresh token from the TikTok API, then uses them to make two separate HTTP requests - one fetching profile statistics (follower count, following, likes, uploaded videos count), and another fetching per-video engagement metrics (likes, views, shares, comments). Both data sets are passed into Chart.js and rendered in the UI."
    },
    {
      src: "/tikfluence12.png",
      caption:
        "Detailed 7-step Socket.IO real-time data flow: (1) the browser requests a Socket.IO connection to the server, (2) the server confirms with a success message, (3) the browser sends the access token to the server, (4) every minute the server makes an async fetch request to the TikTok API for likes and followers data, (5) the API returns the data to the server, (6) the server pushes the data to the browser via the Socket.IO connection, and (7) the data is embedded into Chart.js diagrams for real-time visualization."
    },
    {
      src: "/tikfluenceDB.png",
      caption: "Structure of the MySQL Database."
    }
  ]
};

function renderBold(text: string) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="text-foreground font-semibold">
        {part}
      </strong>
    ) : (
      part
    )
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
  const [imgIdx, setImgIdx] = useState(0);
  const [imgLoading, setImgLoading] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

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
        <div className="overflow-y-auto flex flex-col">
          {/* Image gallery */}
          {images.length > 0 && (
            <div className="relative w-full aspect-video bg-black/40 shrink-0 select-none">
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
                    muted
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
                  alt={images[imgIdx].caption}
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
                  {images[imgIdx].caption}
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
          <div className="px-6 pb-6 pt-1 sm:px-8 sm:pb-8 flex flex-col gap-6">
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
              {project.shortDescription}
            </p>

            <div className="space-b-2">
              {project.fullDescription
                .trim()
                .split("\n")
                .map((line, i) =>
                  line.trim() === "" ? (
                    <div key={i} className="h-2" />
                  ) : line.trim().startsWith("-") ? (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      <span>{renderBold(line.replace(/^-\s*/, ""))}</span>
                    </div>
                  ) : (
                    <p
                      key={i}
                      className="text-sm text-muted-foreground leading-relaxed"
                    >
                      {renderBold(line.trim())}
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
            <div className="flex flex-wrap gap-3 pt-2 pb-2">
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
              {project.githubMobileUrl && (
                <a
                  href={project.githubMobileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm border border-border px-4 py-2 rounded-full hover:border-primary hover:text-primary transition-colors"
                >
                  <Github className="w-4 h-4" /> GitHub (Mobile)
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
              {project.docs &&
                project.docs.length > 0 &&
                project.docs.map((doc, i) => (
                  <a
                    key={i}
                    href={`/documentations/${doc.filename}`}
                    download
                    className="flex items-center gap-2 text-sm border border-border px-4 py-2 rounded-full hover:border-primary hover:text-primary transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    {doc.label}
                    {doc.label !== "All Schemes & Photos" && (
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
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm"
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
              muted
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
                alt={images[imgIdx].caption}
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
                  Scroll to zoom · drag to pan
                </span>
                {zoom > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      resetZoom();
                    }}
                    className="text-sm text-white/70 border border-white/20 px-2 py-0.5 cursor-pointer rounded-full hover:border-white/50 transition-colors"
                  >
                    Reset zoom
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
              {images[imgIdx].caption}
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
                    Click to expand
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
              <h3 className="font-semibold">Collaborate on a New Project</h3>
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
            Interested in working together? I'd love to hear from you.
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
                  size="lg"
                  className="rounded-full px-8 bg-transparent border border-border font-semibold text-foreground cursor-pointer hover:bg-secondary transition-all duration-300"
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
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm text-muted-foreground">
          Designed and coded by Kaloyan Kostadinov &copy;{" "}
          {new Date().getFullYear()}
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
