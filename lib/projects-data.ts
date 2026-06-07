export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  videoUrl?: string;
  documentationUrl?: string;
  githubUrl?: string;
  githubMobileUrl?: string;
  liveUrl?: string;
  images?: string[];
  year: string;
  // Documentation download files
  docs?: {
    label: string;
    filename: string; // relative to /documentations/ in public/
    icon?: "pdf" | "docx" | "zip";
  }[];
}

export const projects: Project[] = [
  {
    id: "mobilis",
    title: "Mobilis",
    shortDescription:
      "Personalized fitness & nutrition platform using AI, 3D posture analysis, and medical-grade body composition algorithms",
    fullDescription: `Mobilis is a comprehensive health platform that analyzes user **body composition (BMI, BF%, LBM, BMR, TDEE)** combined with personal metrics and uses a **scientific recommendation algorithm** to determine the optimal fitness goal for each user.

**Core features:**
- **AI-generated personalized meal plans and workout recommendations** (fitness, calisthenics, yoga) via OpenAI API
- **3D real-time posture correction** using the Orbbec Astra+ depth camera with Nuitrack SDK and custom skeletal tracking algorithms
- **Weight forecast engine:** projects when the user will hit their target weight, updated dynamically based on daily logged measurements
- **Nearly 180 unit tests** across calorie calculation, health metrics, measurements, nutritional profiling, and more
- **Scientific macronutrient distribution** (WHO/EFSA-based) tailored to 8 different goals: Cut, Aggressive Cut, Lean Bulk, Dirty Bulk, Recomposition, Aesthetic, Strength, Maintenance
- **PostgreSQL + Supabase** backend, **Next.js** frontend with full TypeScript

Key algorithms include the **U.S. Navy body fat formula**, **Mifflin-St Jeor BMR**, and a **multi-priority goal selection algorithm** that detects critical health states and adjusts recommendations accordingly.`,
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Python",
      "Supabase",
      "PostgreSQL",
      "OpenAI API",
      "YouTube API",
      "Nuitrack SDK",
      "OpenCV",
      "PyNuitrack",
      "Tailwind CSS",
      "ShadCN/UI",
      "Vitest"
    ],
    githubUrl: "https://github.com/LackOfUsernameIdeas/Mobilis",
    liveUrl: "https://mobilis.noit.eu/",
    docs: [
      {
        label: "Documentation",
        filename: "mobilis_documentation.docx",
        icon: "docx"
      }
    ],
    year: "2026"
  },
  {
    id: "mindreel",
    title: "MindReel",
    shortDescription:
      "Recommendation platform that analyzes live EEG brainwave signals and user preferences in order to understand psycho-emotional state, stress levels and cognitive performance, then suggests the most suitable movies, TV series, books, and songs",
    fullDescription: `MindReel is a comprehensive platform that integrates **live EEG bioelectric brain activity analysis** (via NeuroSky MindWave Mobile 2 headset) with **AI-suggested content recommendations** tailored to the user's real-time emotional and cognitive state, as well as their personal preferences — where the AI itself is continuously subjected to accuracy and reliability evaluation through industry-standard ML metrics adapted to the specific needs and logic of the platform, measuring **Precision, Recall, F1 Score, Accuracy, Specificity, FPR, and FNR** against a relevance algorithm grounded in the user's own preferences. The project was developed in consultation with **qualified neurologists and specialists in that field** to validate its **science-based approach** to brainwave interpretation.

**Core features:**
- **Real-time EEG analysis:** The human brain produces bioelectrical signals — **brainwaves** — that can be measured via **Electroencephalography (EEG)**. Using **Power Spectral Density (PSD)**, these signals are classified into five frequency bands: **Delta (0–4 Hz)** — deep relaxation or sleep; **Theta (4–7 Hz)** — creativity, intuition, hypnagogic state; **Alpha (8–12 Hz)** — calm, balanced, mentally coordinated; **Beta (12–30 Hz)** — active thinking, focus, logical processing; **Gamma (30+ Hz)** — intense cognitive activity, fast decision-making. Each band is further divided into sub-bands (e.g. Low/High Alpha, SMR/Mid/High Beta, Low/High Gamma). Alongside these, NeuroSky's proprietary algorithms extract two key scores (0–100): **Attention** (concentration intensity) and **Meditation** (calmness/relaxation level). The analysis runs for ~1 minute while the headset streams data in **real time** via **Bluetooth → ThinkGear Connector → PyMindWave2 → Socket.IO → Node.js API → React app**, where it is visualized live. Parts of the PyMindWave2 library were incompatible with our requirements and had to be **rewritten from scratch**. After the session, the aggregated data is passed to the AI to determine the appropriate content corrective for the user's cognitive state
- **AI recommendations** for films, TV series, books, and songs, generated via **OpenAI** and **Gemini APIs** using heavily engineered prompts. To manage model access cleanly, we used **LangChain** — a library that abstracts LLM integration and allowed us to run structured, comparable tests across models. After extensive prompt engineering and benchmarking — testing **Claude 3 Opus (AnthropicLLM)**, **Mistral Large**, **BgGPT-7B**, **Gemini 1.5 Pro**, and the OpenAI family — **GPT-4o** proved most reliable for films and series, and **GPT-4-Turbo** for books. Gemini produced valid but overly generic justifications; the others were dominated by GPT across all criteria
- **Custom relevance algorithm** that determines whether a given film or series recommendation is *relevant* to a user's preferences. Six criteria are scored: preferred genres (2pts — highest weight), content type (film vs. series), user mood mapped to matching genres, available time vs. runtime, release year range, and target audience. A recommendation crossing **5 points** is deemed relevant. This scoring produces the True/False Positive/Negative values that feed the ML evaluation suite. The algorithm intentionally doesn't force a single direction — a user selecting contradictory mood + genre inputs will yield lower Precision but higher Recall, and the **F1 Score** surfaces that trade-off honestly
- **ML evaluation suite** measuring the AI's recommendation quality with 7 metrics: **Precision** (what share of recommended content is actually relevant), **Recall / True Positive Rate** (what share of all relevant content in the system was recommended to the user), **F1 Score** (harmonic mean of Precision and Recall), **Accuracy** (correct predictions overall, including true negatives), **Specificity / True Negative Rate** (how well the model avoids recommending irrelevant content), **FPR** (irrelevant content incorrectly recommended), and **FNR** (relevant content incorrectly skipped). A separate **per-generation Precision** is also calculated specifically for the 5 most recently generated recommendations — Recall and F1 can't be computed at this scope because negatives (all content the AI *didn't* recommend) aren't available for a single generation. All of this is backed by **86 unit tests** across user, recommendation, preference, statistics, and metrics functions
- **VR cinema experience** built with **A-Frame** (based on Three.js + WebGL), targeting **Oculus / Meta Quest 2** — the second most-used VR device globally at 26.17% per Steam Hardware Survey (Sept. 2025), with all Meta devices at ~65.51%. The scene recreates a real cinema hall with projectors, a popcorn machine, and a large screen. The core problem: **A-Frame cannot render \`<iframe>\` elements**, so YouTube embed links are impossible. Attempts to overlay a DOM iframe on top of the 3D scene also failed. The solution required downloading trailer videos as MP4 files — via **yt-dlp** — and streaming them from a direct URL. Running yt-dlp on our shared hosting was impossible (no sudo, Python 3.6.8 only supports an outdated non-functional yt-dlp version), and calling an external .exe from Node.js was equally blocked. The final architecture: **yt-dlp runs inside a Dockerized Python service deployed on Google Cloud Run**, which downloads the trailer and stores it in **Google Cloud Storage (GCS)** — the MP4 is then served via a public GCS URL directly into the A-Frame \`<video>\` element. A-Frame's built-in hand controllers also didn't appear or function — the official documentation's own embedded demo was broken — and required a separate custom fix
- **Book data pipeline:** Goodreads — the most comprehensive book database available — shut down its public API on 08.12.2020. **Google Books API** was used as a temporary fallback but lacked variety and was missing most Bulgarian titles. After exhausting every available book API, the solution was a **custom Python/Beautiful Soup scraper** that fetches Goodreads page HTML and, crucially, extracts a large hidden JSON object embedded in a \`<script>\` tag — this object contains the complete book metadata, including fields not shown in the visible page. Google Books remains integrated alongside the scraper as supplementary enrichment
- **Song data pipeline:** Spotify API was the first choice for its rich metadata (artists, albums, genres, popularity), but it frequently lacked data for older or less-popular tracks. **YouTube API** was added as a complementary source, providing view counts, likes, comment counts, and a direct link to the official music video. The two are combined after the AI returns song names. A major early problem: the AI regularly hallucinated entirely fictional songs that existed on neither platform, producing corrupt records and failed data fetches. Resolved through extensive prompt iteration and testing across genre/preference combinations
- **Scraped and enriched content metadata** from **IMDb, OMDb API, Goodreads, Google Books API, YouTube API, and Spotify API**, with platform-wide and per-user statistics rendered via **ApexCharts** — covering ML metric averages, trending creators, content popularity, watchlist/readlist analytics, and more
- **JWT + HMAC/SHA-256 authentication**, CORS-restricted API, GitHub branching strategy (main / dev / per-feature branches), and Trello-managed task distribution throughout the ~1 year development period`,
    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "Node.js",
      "ExpressJS",
      "MySQL",
      "Docker",
      "Python",
      "Socket.IO",
      "OpenAI API",
      "Gemini API",
      "A-Frame",
      "Three.js",
      "LangChain",
      "Tailwind CSS",
      "ApexCharts",
      "OMDb API",
      "Spotify API",
      "YouTube API"
    ],
    githubUrl: "https://github.com/LackOfUsernameIdeas/MindReel",
    liveUrl: "https://mindreel.noit.eu",
    docs: [
      {
        label: "Documentation",
        filename: "mindreel_documentation.docx",
        icon: "docx"
      },
      {
        label: "Schemes & Photos",
        filename: "schemes_and_photos.zip",
        icon: "zip"
      }
    ],
    year: "2025"
  },
  {
    id: "nutrifit",
    title: "NutriFit",
    shortDescription:
      "A modern platform that takes advantage of the power of GPT-4 Turbo & Gemini Pro to actively support users in maintaining their optimal weight and healthy lifestyle",
    fullDescription: `NutriFit is an integrated web and mobile nutrition platform focused entirely on **AI-driven meal planning** - the project that later inspired Mobilis, where the concept expanded to include movement and physical activity. NutriFit's core idea is to make **two AI models generate a truly personalized, nutritionally accurate meal plan**, measure how far they deviate from the user's defined limits, and compare their performance against each other.

**Core features:**
- **Meal generation:** full daily menus with breakfast, lunch (starter + main + dessert), and dinner - each with exact macros, ingredients, and recipes. Food images are fetched via **Google Custom Search API** with custom-configured Search Engines
- **AI deviation algorithm:** measures how closely **ChatGPT vs Gemini** adhere to user-defined nutritional limits - tracking average deviation %, max deviation per category (calories, protein, fat, carbs), and overall AI deviation score
- **Weight regulation algorithm:** compares current vs ideal weight for the user's height and recommends whether to reduce, maintain, or gain weight, with guidance on diet and activity adjustments
- **Nearly 40 interactive statistics** and Chart.js diagrams: BMI, body fat %, lean mass, fat mass, daily macro intake over time, platform-wide aggregated user data, and a **head-to-head AI comparison panel** on the home page
- **Food ranking system** across 4 dedicated pages: sorted by calories, fat, carbs, and protein per 100g, with recipes, preparation steps, and nutritional values
- **Weight Calculator page:** shows BMI range, ideal vs current weight, body fat %, lean mass, fat mass - all with day-over-day progress tracking
- **User measurement flow:** height, weight, age, waist/hip/neck entered once per 24h; persisted via cookie if the user opts in, yesterday's values pre-filled via localStorage on any device
- **NutriFit API** (Node.js/Express + Firebase Admin SDK): proxies Fitness Calculator API calls server-side so the flood of per-page-load requests is reduced to one batch per day, regardless of whether the user stays on the page - data is safe in Firestore either way
- **Firebase Admin SDK over client SDK:** after a month of debugging, discovered the client SDK was failing to reliably deliver data at scale; switching to Admin SDK via the Node.js backend resolved it entirely
- **React Native mobile app** (separate codebase) mirroring core web features
- **GitHub branching strategy:** main, dev, and per-feature branches. Unit tests included.

**Engineering notes:**
- One of the hardest problems was **prompt engineering:** early GPT-3.5 and Gemini builds generated objects and activities instead of food. Upgrading to **GPT-4 Turbo** and rewriting the entire prompt from scratch was the breakthrough
- Gemini is accessed via **Vertex AI (Google Cloud)** because the Gemini API is unavailable in Bulgaria
- Meal generation went through **two rejected APIs** (Spoonacular, then Edamam) before landing on AI - limited recipe variety and inability to represent Bulgarian cuisine were the dealbreakers`,
    technologies: [
      "ReactJS",
      "TypeScript",
      "Node.js",
      "Express.js",
      "Firebase",
      "React Native",
      "Android Studio",
      "Chart.js",
      "OpenAI API",
      "Vertex AI (Gemini Pro)",
      "Google Custom Search API",
      "Fitness Calculator API",
      "Chakra-UI",
      "React Spring",
      "Galio"
    ],
    githubUrl: "https://github.com/LackOfUsernameIdeas/NutriFit",
    githubMobileUrl: "https://github.com/LackOfUsernameIdeas/NutriFitMobile",
    liveUrl: "https://nutri.noit.eu",
    docs: [
      {
        label: "Documentation",
        filename: "nutrifit_documentation.docx",
        icon: "docx"
      }
    ],
    year: "2024"
  },
  {
    id: "tikfluence",
    title: "TikFluence",
    shortDescription:
      "Data analytics platform that proves TikTok's influence on songs' popularity, with different stats and real-time personal profile information",
    fullDescription: `TikFluence was my first serious project, built primarily as a **learning exercise** to get comfortable working with the technologies involved. The core idea explores a real phenomenon: when a song gets used repeatedly across TikTok videos, the platform's exposure gradually pushes up that song's popularity on **Spotify and YouTube** over time - TikTok acts as a launchpad that influences a track's trajectory across other music platforms.

Note: The live demo is visitable but **some features may not function** as the project is no longer actively maintained.

**Core features:**
- **Influence Algorithm:** identifies songs whose TikTok popularity peak predates their Spotify peak - proving cross-platform influence. Notable constraint: Spotify doesn't expose raw play counts, only a **proprietary 0-100 popularity score** - understanding and working around this was essential to making the algorithm applicable
- **Growth Algorithm:** flags songs that are currently surging (last 2 days' popularity > all-time average) in real time
- **Charts & leaderboards** for: Top 200 Global TikTok songs, Top 200 TikTok songs in Bulgaria, Top 200 most-followed TikTokers, Top 200 most-viewed videos - all updated daily via **Cronjob + Chartex API** scraping
- **Per-song stats pages:** TikTok videos count, YouTube views, Spotify popularity (0-100 scale), historical popularity change charts
- **Nearly 60 interactive statistics** and diagrams across the platform
- **"My Statistics" page:** live personal TikTok profile stats (followers, likes, following, videos) updated every minute via **Socket.IO + proxy server** (CORS workaround). The only page requiring TikTok OAuth login - session key is stored in a cookie valid for 1 hour. All other pages are publicly accessible
- **14 API approval attempts** with TikTok Developer team before gaining access - documented in full email correspondence
- All rankings rendered with **jQuery Datatables**; diagrams with **Chart.js**; real-time data via **Socket.IO** WebSocket / HTTP Long Polling`,
    technologies: [
      "PHP",
      "PDO",
      "MySQL",
      "JavaScript",
      "jQuery",
      "Chart.js",
      "Node.js",
      "Express.js",
      "Socket.IO",
      "TikTok API",
      "Spotify API",
      "YouTube API",
      "Chartex API",
      "Bootstrap",
      "Apache",
      "Cronjob"
    ],
    githubUrl: "https://github.com/LackOfUsernameIdeas/TikFluence",
    liveUrl: "https://fluence.noit.eu/",
    docs: [
      {
        label: "Documentation",
        filename: "tikfluence_documentation.docx",
        icon: "docx"
      }
    ],
    year: "2023"
  }
];

export interface Achievement {
  year: string;
  title: string;
  description: string;
  type: "competition" | "certification" | "award";
}

export const achievements: Achievement[] = [
  {
    year: "2025",
    title: "NOIT National Finals – Mobilis",
    description:
      "AI fitness platform with Orbbec 3D posture correction and scientific goal algorithms",
    type: "competition"
  },
  {
    year: "2025",
    title: "NOIT National Finals – MindReel",
    description:
      "EEG-powered neuro-assistant with VR cinema and ML recommendation evaluation",
    type: "competition"
  },
  {
    year: "2024",
    title: "1st Place – Regional Round, NOIT 2024",
    description:
      "NutriFit – AI meal planning with GPT-4 & Gemini deviation analysis",
    type: "competition"
  },
  {
    year: "2024",
    title: "NOIT National Finals – NutriFit",
    description:
      "Finalist at the National IT Competition with AI-powered nutrition platform",
    type: "competition"
  },
  {
    year: "2023",
    title: "1st Place – Regional Round, NOIT 2023",
    description:
      "TikFluence – data analytics platform proving TikTok's cross-platform music influence",
    type: "competition"
  },
  {
    year: "2023",
    title: "NOIT National Finals – TikFluence",
    description:
      "Finalist at the National IT Competition with original influence-detection algorithms",
    type: "competition"
  }
];
