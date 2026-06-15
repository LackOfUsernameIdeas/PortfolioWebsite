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
      "Personalized fitness & nutrition platform that analyzes body composition and personal metrics using scientific algorithms to deliver meal plans, workout recommendations, and real-time 3D posture correction via depth camera",
    fullDescription: `**Mobilis** is a comprehensive health platform that analyzes **characteristics of the users' body condition** (BMI – body mass index, body composition – ratio of body fat to muscle mass, BMR – basal metabolic rate, TDEE – total daily energy expenditure) combined with personal metrics (height, gender, age, weight, activity level, neck/waist/hip measurements) and uses a **goal selection algorithm** to determine **the optimal fitness goal** for each user to follow, detecting critical health states and providing workout and nutrition recommendations accordingly. A distinctive feature of the platform is **the corrective exercise program** aimed at **improving postural health**, which uses the Orbbec Astra+ 3D camera and specialized algorithms for real-time tracking and analysis of body movements and posture.

**Core features:**
- **AI-generated personalized meal plans and workout recommendations** (fitness, calisthenics, yoga) via **OpenAI API** (GPT-5.2, chosen after extensive benchmarking against GPT-4o), including pre/post-workout meals and optional intermediate snacks — each with nutritional values, ingredients, recipes, and suggested consumption times
- **3D real-time posture correction** using the **Orbbec Astra+ depth camera** with **Nuitrack SDK** and **PyNuitrack**, featuring a **custom calibration process** that computes personalized skeletal tolerances based on individual proportions (arm length, shoulder/hip width, leg length). A **voice assistant** (OpenAI TTS, gpt-4o-mini-tts) dictates exercise instructions step by step in Bulgarian
- **Posture checking algorithm** using **relative skeleton normalization** (torso as origin), **pose checks** (arm/leg/shoulder/spine/pelvis/head positions via joint coordinates), and **angle checks** via **vector algebra** (arm elevation, knee angle, elbow angle). A step is completed only when overall accuracy exceeds **80%** and the correct pose is held for the required duration without interruption
- **Weight forecast engine:** projects when the user will reach their target weight based on goal-specific caloric deficit/surplus, updated dynamically based on daily logged measurements and training frequency
- **Scientific macronutrient distribution** (WHO/EFSA-based, with elevated protein ranges for active users) tailored to **8 different goals:** Cut, Aggressive Cut, Lean Bulk, Dirty Bulk, Recomposition, Aesthetic, Strength, Maintenance
- **Nearly 180 unit tests** across calorie calculation, health metrics, measurements, nutritional profiling, recommended goal logic, cookies, and save functions (Vitest)
- **JWT + HMAC/SHA-256 authentication** via Supabase Auth and three distinct Supabase client types (Browser, Server, Service Role) used contextually across the Next.js architecture
- **Trello**-managed task distribution and **GitHub branching strategy** (main, dev, per-feature branches) throughout development

Key algorithms include the **U.S. Navy body fat formula**, **Mifflin-St Jeor BMR**, a **multi-priority goal selection algorithm**, and a **3D-to-2D perspective projection** (project_world_to_screen()) for rendering the skeleton overlay on the OpenCV video stream regardless of the user's distance from the camera.

**Development notes:**
- The posture program's 7 exercises were selected in **consultation with kinesiotherapy specialists** to ensure they address contemporary postural issues (forward head posture, rounded shoulders, lower back instability) and can be performed without equipment
- After benchmarking multiple models, **GPT-5.2** proved the most reliable for generating relevant, logically connected fitness and nutrition recommendations — GPT-4o was initially preferred due to prior experience, but its output was not sufficiently relevant
- The forecast engine accounts for **training frequency** (user-specified training days) as an additional factor, making weight change projections closer to real-world outcomes`,
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
      "shadcn/ui",
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
    fullDescription: `**MindReel** is a comprehensive platform that integrates **live EEG bioelectric brain activity analysis** (via NeuroSky MindWave Mobile 2 headset) with **AI-suggested content recommendations** tailored to the user's real-time emotional and cognitive state, as well as their personal preferences - where the AI itself is continuously subjected to accuracy and reliability evaluation through industry-standard ML metrics adapted to the specific needs and logic of the platform, measuring **Precision, Recall, F1 Score, Accuracy, Specificity, FPR, and FNR** against a relevance algorithm grounded in the user's own preferences. The project was developed in consultation with **qualified neurologists and specialists in that field** to validate its **science-based approach** to brainwave interpretation.

**Core features:**
- **Real-time EEG analysis:** Live brainwave data streamed via **Bluetooth → ThinkGear Connector → PyMindWave2 → Socket.IO → Node.js API → React app**, classified into five frequency bands using **Power Spectral Density (PSD)**. Detailed explanations for each frequency band are available in the image gallery for this project. The system also captures **Attention** and **Meditation** scores (0–100) extracted by NeuroSky's proprietary algorithms. After the 1-minute session, all data is passed to the AI to determine **corrective content recommendations**.
- **AI recommendations** for movies, TV series, books, and songs, generated via **OpenAI API** (and **Gemini API** in earlier versions) using heavily engineered prompts. Model access is managed through **LangChain**, which provides a unified way to interact with different LLMs and enables structured, comparable testing across models. After extensive benchmarking - testing **Claude 3 Opus**, **Gemini 1.5 Pro**, and the OpenAI family - **GPT-4o** proved to be the most reliable for movies and series, **GPT-4-Turbo** for books, **GPT-4.1** for songs, and **GPT-5-mini** for brain analysis
- **Custom relevance algorithm** that determines whether a recommendation is relevant to certain user preferences across six criteria: **preferred genres, content type, user mood mapped to genres, available time vs. runtime, release year range, and target audience**. A score above **5 points** is deemed relevant, producing the True/False values that feed the ML evaluation metrics
- **ML evaluation metrics** that determine recommendation quality: **Precision**, **Recall / TPR**, **F1 Score**, **Accuracy**, **Specificity / TNR**, **FPR**, and **FNR**. A separate **per-generation Precision** is also calculated for the last 5 registered recommendations for the user
- **VR cinema experience** built with **A-Frame** (Three.js + WebGL) and tested with **Oculus / Meta Quest 2** headset. The scene recreates a real cinema hall with projectors, a popcorn machine, and a large screen, where users can watch movie or TV series trailers in order to decide whether the content interests them before committing to watch it
- **Content data pipelines:** a **custom Python/BeautifulSoup scraper** targeting **Goodreads** with **Google Books API** for the books; songs merging **Spotify API** (rich metadata) with **YouTube API** (view counts, likes, comments, direct video links); for the movies and series, the data is drawn from **OMDb API**
- **JWT + HMAC/SHA-256 authentication**, **Trello**-managed task distribution throughout the development period, as well as **86 unit tests** across user, recommendation, preference, statistics, and metrics functions

**Development notes:**
- Parts of the functions in the **PyMindWave2** library, related to the NeuroSky device for retrieving EEG data, were incompatible with the project's requirements and had to be rewritten from scratch
- The VR cinema faced a core blocker: **A-Frame cannot render \`<iframe>\` elements**, making **YouTube embeds impossible**. An attempt was made to work around this by creating an \`<iframe>\` dynamically in the DOM outside the A-Frame scene and positioning it to visually overlap with the 3D environment - but this also failed. Since the **YouTube API only provides a video ID for use in a link** (not a directly streamable file), downloading the trailers as MP4s was the only applicable path. The first attempt was via the **yt-dlp-wrap** wrapper and the Python version of **yt-dlp** - but running it on shared hosting was not possible (no sudo access, Python v3.6.8 only - which **does not support the library**). The final solution was making **yt-dlp run inside a containerized service on Google Cloud Run**, downloading trailers and storing them in **Google Cloud Storage (GCS)**, accessed via public GCS URLs (e.g. \`<video src="https://storage.googleapis.com/BUCKET/video.mp4" />\`). A-Frame's built-in hand controllers weren't appearing in the scene, so they also required a separate **custom fix**, since the described solution for this situation in the official documentation did not produce the expected result. Not only that, but the example that was visualized in the embed box, intended to demonstrate a working implementation, also did not work
- **Goodreads** - the most comprehensive book database - **shut down its public API in 2020**. After trying every available alternative, the scraper approach was selected due to the rich and comprehensive data for the books, including **sufficient metadata for Bulgarian books, even older titles**. It extracts a large hidden JSON object embedded in a \`<script>\` tag on Goodreads pages, containing complete book metadata, including fields not visible on the page itself
- The **Spotify API** frequently lacked data for older or less-popular tracks, which is why **YouTube API** was added as a complementary source. Early on, the AI regularly **hallucinated fictional songs** that existed on neither platform - making extensive prompt modifications and testing across different preference combinations solved it`,
    technologies: [
      "React",
      "TypeScript",
      "Python",
      "Vite",
      "Node.js",
      "Express.js",
      "MySQL",
      "Tailwind CSS",
      "shadcn/ui",
      "Docker",
      "Jest",
      "Socket.IO",
      "ThinkGear Connector",
      "PyMindWave2",
      "Beautiful Soup",
      "LangChain",
      "OpenAI API",
      "Gemini API",
      "OMDb API",
      "Goodreads",
      "Google Books API",
      "YouTube API",
      "Spotify API",
      "Google Custom Search JSON API",
      "A-Frame",
      "Three.js",
      "ApexCharts"
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
        label: "All Schemes & Photos",
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
    fullDescription: `**NutriFit** is an integrated web and mobile nutrition platform focused entirely on **AI-driven meal planning** - the project that later inspired **Mobilis**, where the concept expanded to include movement and physical activity. NutriFit's core idea is to make **two AI models generate a truly personalized, nutritionally accurate meal plan**, measure how far they deviate from the user's defined limits, and compare their performance against each other.

**Core features:**
- **Meal generation:** full daily menus with breakfast, lunch (starter + main + dessert), and dinner - each with exact macros, ingredients, and recipes. Food images are fetched via **Google Custom Search API** with custom-configured Search Engines
- **AI deviation algorithm:** measures how closely **ChatGPT vs Gemini** adhere to user-defined nutritional limits - tracking average deviation %, max deviation per category (calories, protein, fat, carbs), and overall AI deviation score
- **Weight regulation algorithm:** compares current vs ideal weight for the user's height and recommends whether to reduce, maintain, or gain weight, with guidance on diet and activity adjustments
- **Nearly 40 interactive statistics** and Chart.js diagrams: BMI, body fat %, lean mass, fat mass, daily macro intake over time, platform-wide aggregated user data, and a **head-to-head AI comparison panel** on the home page
- **Weight Calculator page:** shows BMI range, ideal vs current weight, body fat %, lean mass, fat mass - all with day-over-day progress tracking
- **User measurement flow:** height, weight, age, waist/hip/neck entered once per 24h; persisted via cookie if the user opts in, yesterday's values pre-filled via localStorage on any device
- **NutriFit API** (Node.js/Express + Firebase Admin SDK): proxies **Fitness Calculator API** calls server-side so the flood of per-page-load requests is reduced to one batch per day, regardless of whether the user stays on the page - data is safe in Firestore either way
- **Firebase Admin SDK over client SDK:** after a month of debugging, discovered the client SDK was failing to reliably deliver data at scale; switching to **Admin SDK** via the Node.js backend resolved it entirely
- **Food ranking system** across 4 dedicated pages: sorted by calories, fat, carbs, and protein per 100g, with recipes, preparation steps, and nutritional values
- **React Native mobile app** (separate codebase) mirroring core web features
- **GitHub branching strategy:** main, dev, and per-feature branches
- **Unit tests included**

**Development notes:**
- One of the hardest problems was **prompt engineering:** early GPT-3.5 and Gemini builds generated objects and activities instead of food. Upgrading to **GPT-4 Turbo** and rewriting the entire prompt from scratch was the breakthrough
- Gemini is accessed via **Vertex AI (Google Cloud)** because the Gemini API is unavailable in Bulgaria
- Meal generation went through **two rejected APIs** (Spoonacular, then Edamam) before landing on AI - limited recipe variety and inability to represent Bulgarian cuisine were the dealbreakers`,
    technologies: [
      "React",
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
      "Chakra UI",
      "react-spring",
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
    fullDescription: `**TikFluence** was my **first serious project**, built primarily as a **learning exercise** to get comfortable working with the technologies involved. The core idea explores a real phenomenon: when a song gets used repeatedly across TikTok videos, the platform's exposure gradually pushes up that song's popularity on **Spotify and YouTube** over time - TikTok acts as a launchpad that influences a track's trajectory across other music platforms.

**Note:** The live demo is visitable but **some features may not function** as the project is no longer actively maintained.

**Core features:**
- **Influence Algorithm:** identifies songs whose **TikTok popularity** peak predates their **Spotify peak** - proving cross-platform influence. One noticeable constraint is that Spotify doesn't expose raw play counts, only a **proprietary 0-100 popularity score** - understanding and working around this was essential to making the algorithm applicable
- **Growth Algorithm:** flags songs that are currently surging (last 2 days' popularity > all-time average)
- **Charts & leaderboards** for: Top 200 Global TikTok songs, Top 200 TikTok songs in Bulgaria, Top 200 most-followed TikTokers, Top 200 most-viewed videos - all updated daily via **Cronjob + Chartex API** scraping
- **Per-song stats pages:** TikTok videos count, YouTube views, Spotify popularity (0-100 scale), historical popularity change charts
- **Nearly 60 interactive statistics** and diagrams across the platform
- **"My Statistics" page:** live personal TikTok profile stats (followers, likes, following, videos) updated every minute via **Socket.IO + proxy server** (CORS mechanism did not allow requests to be sent directly from a browser to a different domain). This is the only page requiring TikTok OAuth login - session key is stored in a cookie valid for 1 hour. All other pages are publicly accessible
- **14 API approval attempts** with TikTok Developer team before gaining access - images from the email correspondence are included in the documentation
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
