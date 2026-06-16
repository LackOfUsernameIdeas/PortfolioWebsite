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
      "Personalized fitness & nutrition platform that analyzes body composition and personal metrics using scientific algorithms to deliver workout recommendations, meal plans, and real-time 3D posture correction via depth camera",
    fullDescription: `**Mobilis** is a comprehensive health platform that analyzes **characteristics of the users' body condition** - **BMI** (Body Mass Index), **body composition** (ratio of body fat to muscle mass via the U.S. Navy method), **BMR** (Basal Metabolic Rate, calculated using the Mifflin-St Jeor formula separately for each gender), and **TDEE** (Total Daily Energy Expenditure, derived by multiplying BMR by the user's activity level multiplier) - combined with personal metrics (height, gender, age, weight, activity level, neck/waist/hip measurements) to determine optimal daily calorie and macronutrient targets. These feed into a **goal selection algorithm** that assigns the most appropriate fitness goal based on whether the user requires a calorie deficit or a calorie surplus relative to TDEE - ranging across **Cut, Aggressive Cut, Lean Bulk, Dirty Bulk, Recomposition, Aesthetic, Strength, and Maintenance** - each paired with a scientifically grounded caloric adjustment relative to TDEE. A distinctive feature of the platform is the **corrective exercise program aimed at improving postural health**, which uses the **Orbbec Astra+ 3D camera** and specialized algorithms for real-time tracking and analysis of body movements and poses.

**Core features:**
- **Goal selection algorithm:** Critical health states always take highest priority - critically low BMI (moderate/severe undernutrition) or dangerously low body fat (below 2% for men, below 10% for women) unconditionally triggers **Dirty Bulk**; Obesity Class II/III triggers **Aggressive Cut**; Class I triggers **Cut**. Outside critical cases, the recommendation is determined by the interaction of BMI and BF% categories - for example, normal BMI with elevated BF% maps to **Recomposition**, while pre-obese BMI with athlete-level BF% (where excess weight is muscular) maps to **Maintenance**
>**Note:** Users retain full freedom **not to follow the recommended goal** and **adjust macronutrient ratios** based on individual needs, preferences, and health conditions, with medical or nutritional consultation advised for cases involving illness, pregnancy, or other health-related factors
- **Macronutrient distribution:** the daily calorie target is broken down into **carbohydrates**, **protein** (1g = 4 kcal each) and **fat** (1g = 9 kcal) according to a macro ratio assigned to each goal (e.g. calories for **Cut - 40% protein / 25% fat / 35% carbs**), with all ratios falling within **WHO/EFSA** healthy and effective ranges - **fat 20–35%**, **carbohydrates 45–60%**, **protein 25–45%**. The protein range sometimes deliberately exceeds the organizations' base recommendations to support muscle synthesis, satiety, immune function, and recovery, which is especially important for active individuals. Each goal also applies a **specific caloric offset (deficit or surplus) from TDEE**. CDC and NHS guidance supports safe rates of ~0.5–1 kg/week loss or ~0.25–0.5 kg/week gain
- **Weight forecast:** Estimates when the user will reach their target weight via **\`Weekly change = caloric offset × 7 ÷ 7700 kcal/kg\`** and **\`Weeks needed = |target weight − current weight| ÷ weekly change\`**. The forecast also considers the **user-specified training days** (minimum 2/week) as an additional factor, making projections closer to real-world outcomes. Expected and actual progress are displayed side by side - a forecast panel showing weekly milestones, and a live weight/BMI diagram updated from daily measurements. Remaining weeks update dynamically
- **3D real-time posture correction** using the **Orbbec Astra+ depth camera** with **Nuitrack SDK** and **PyNuitrack** (initialized via \`py_nuitrack.Nuitrack()\` in nuitrack_runner.py, connected over USB 3.0 with a licensed Nuitrack Runtime). A **voice assistant** (OpenAI TTS, gpt-4o-mini-tts) dictates exercise instructions step by step. The 7-exercise corrective program was developed **in consultation with kinesiotherapy specialists** to address contemporary postural issues - forward head posture is addressed via **Chin Tucks** and **Neck Side Tilts**; rounded shoulders via **Shoulder Blade Squeezes**, **Wall Angels**, and **Standing T Stretch**; pelvic and lumbar instability via **Standing Pelvic Tilts** and **Standing Lumbar Extensions**. All exercises are equipment-free and performed standing
- **Calibration and posture/angle checking algorithm:** Before starting the posture correction exercises, the system performs a 5-second scan (\`calibration.py\`) while the user stands still, computing height, arm length, shoulder/hip width, and leg length, then determining **body-proportional tolerances** (\`calculate_tolerances()\`) as percentages of the relevant body segment rather than fixed millimeter values. All pose checks are then performed relative to the **torso as origin** (0, 0, 0) via \`normalize_skeleton()\`, using the torso as the reference point for all joint coordinates. **This normalization keeps tracking consistent** even when the user shifts left or right or changes distance from the camera. \`check_relative_pose()\` handles two check types: **pose checks** (arm/leg/shoulder/spine/pelvis/head positions via joint coordinates) and **angle checks** using **vector algebra** (e.g. arm elevation via wrist-to-shoulder vector relative to the downward Y axis; knee angle via the angle between the thigh–knee and knee–ankle vectors; elbow angles via the angle between the shoulder–elbow and wrist–elbow vectors). **Angle checks also apply tolerances** (±degree tolerance bands), since requiring exact angles would make exercises impractical due to small movements, tremor or tracking noise
>After all of the checks are applied, **\`Overall accuracy\`** is calculated as **\`total points (points from poses + points from angles) ÷ total checks\`**, where pose checks award 100 pts each and angle checks award 0-100 pts: **\`max(0, 100 × (1 – diff / (2 × angle_tolerance)))\`**, where **diff** is the absolute deviation from the target angle; the smaller the deviation, the higher the score. A step completes only when **accuracy exceeds 80%** and is **held for the full required duration** without interruption - the timer resets on any violation
>The system simultaneously works in two coordinate systems: **Nuitrack's 3D space (X/Y/Z)** and **OpenCV's 2D screen space**, converted via perspective projection (\`project_world_to_screen()\`), where larger Z values reduce X and Y scaling and shift the projection toward the center. This conversion is required to map 3D skeletal data onto a flat camera image so joints, angles, and visual guides **remain correctly aligned** with the user's body **at different distances**. The transformation follows **\`screen_x = world_x × fx / world_z + cx\`** and **\`screen_y = –world_y × fy / world_z + cy\`**, with fx and fy defining scale and cx and cy centering the image. There is a color-coded distance bar guiding users to **the optimal 2.5–3.0 m range**

**Development notes:**
- **The body-proportional calibration tolerance system** was a critical aspect of the system design. Using **fixed distance thresholds** for all users would produce **inconsistent results** because body dimensions vary significantly between individuals (for example, a **20 cm wrist-to-shoulder pose deviation** may be acceptable for a **190 cm person** but indicate incorrect execution for a **160 cm person**). To address this, the system converts **absolute joint distances (in mm)** into **percentages relative to each user's body segment lengths**, allowing posture assessment to remain **accurate across users with different body proportions**
- **JWT + HMAC/SHA-256 authentication** via **Supabase Auth**, with three distinct client types across the Next.js architecture: **Browser Client** (client-side actions, annon key, auto-attaches JWT), **Server Client** (server-side actions, reads JWT from cookies), and **Service Role Client** (admin operations, service role key, server-side only). **Nearly 180 unit tests** (Vitest) across calorie, health, measurements, nutritional profiling, recommended goal, cookies, and save functions. **Trello**-managed task distribution and **GitHub branching strategy** (main, dev, per-feature branches) throughout development`,
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
    fullDescription: `**MindReel** is a comprehensive platform that integrates **live EEG bioelectric brain activity analysis** (via **NeuroSky MindWave Mobile 2** headset) with **AI-suggested content recommendations** tailored to the user's real-time emotional and cognitive state, as well as their personal preferences - where the AI itself is continuously subjected to accuracy and reliability evaluation through industry-standard ML metrics adapted to the specific needs and logic of the platform, measuring **Precision, Recall, F1 Score, Accuracy, Specificity, FPR, and FNR** against a relevance algorithm grounded in the user's own preferences. The project was developed in consultation with **qualified neurologists and specialists in that field** to validate its **science-based approach** to brainwave interpretation.
 
**Core features:**
- **Real-time EEG analysis:** Live brainwave data streamed via **Bluetooth → ThinkGear Connector → PyMindWave2 → Socket.IO → Node.js API → React app**, classified into five frequency bands using **Power Spectral Density (PSD)**. Detailed explanations for each frequency band are available in the image gallery for this project. The system also captures **Attention** and **Meditation** scores (0–100) extracted by NeuroSky's proprietary algorithms. After the 1-minute session, all data is passed to the AI to determine **corrective content recommendations**
- **AI recommendations** for movies, TV series, books, and songs, generated via **OpenAI API** (and **Gemini API** in earlier versions) using heavily engineered prompts. Model access is managed through **LangChain**, which provides a unified way to interact with different LLMs and enables structured, comparable testing across models. After extensive benchmarking - testing **Claude 3 Opus**, **Gemini 1.5 Pro**, and the OpenAI family - **GPT-4o** proved to be the most reliable for movies and series, **GPT-4-Turbo** for books, **GPT-4.1** for songs, and **GPT-5-mini** for brain analysis
- **Custom relevance algorithm** that determines whether a recommendation is relevant to certain user preferences across six criteria: **preferred genres, content type, user mood mapped to genres, available time vs. runtime, release year range, and target audience**. A score above **5 points** is deemed relevant, producing the True/False values that feed the ML evaluation metrics
- **ML evaluation metrics** that determine recommendation quality: **Precision**, **Recall / TPR**, **F1 Score**, **Accuracy**, **Specificity / TNR**, **FPR**, and **FNR**. A separate **per-generation Precision** is also calculated for the last 5 registered recommendations for the user
- **VR cinema experience** built with **A-Frame** (Three.js + WebGL) and tested with **Oculus / Meta Quest 2** headset. The scene recreates a real cinema hall with projectors, a popcorn machine, and a large screen, where users can watch movie or TV series trailers in order to decide whether the content interests them before committing to watch it
- **Content data pipelines:** a **custom Python/BeautifulSoup scraper** targeting **Goodreads** with **Google Books API** for the books; songs merging **Spotify API** (rich metadata) with **YouTube API** (view counts, likes, comments, direct video links); for the movies and series, the data is drawn from **OMDb API**
 
**Development notes:**
- Parts of the functions in the **PyMindWave2** library, related to the NeuroSky device for retrieving EEG data, were incompatible with the project's requirements and had to be rewritten from scratch
- The VR cinema faced a core blocker: **A-Frame cannot render \`<iframe>\` elements**, making **YouTube embeds impossible**. An attempt was made to work around this by creating an \`<iframe>\` dynamically in the DOM outside the A-Frame scene and positioning it to visually overlap with the 3D environment - but this also failed. Since the **YouTube API only provides a video ID for use in a link** (not a directly streamable file), downloading the trailers as MP4s was the only applicable path. The first attempt was via the **yt-dlp-wrap** wrapper and the Python version of **yt-dlp** - but running it on shared hosting was not possible (no sudo access, Python v3.6.8 only - which **does not support the library**). The final solution was making **yt-dlp run inside a containerized service on Google Cloud Run**, downloading trailers and storing them in **Google Cloud Storage (GCS)**, accessed via public GCS URLs (e.g. \`<video src="https://storage.googleapis.com/BUCKET/video.mp4" />\`). A-Frame's built-in hand controllers weren't appearing in the scene, so they also required a separate **custom fix**, since the described solution for this situation in the official documentation did not produce the expected result. Not only that, but the example that was visualized in the embed box, intended to demonstrate a working implementation, also did not work
- **Goodreads** - the most comprehensive book database - **shut down its public API in 2020**. After trying every available alternative, the scraper approach was selected due to the rich and comprehensive data for the books, including **sufficient metadata for Bulgarian books, even older titles**. It extracts a large hidden JSON object embedded in a \`<script>\` tag on Goodreads pages, containing complete book metadata, including fields not visible on the page itself
- The **Spotify API** frequently lacked data for older or less-popular tracks, which is why **YouTube API** was added as a complementary source. Early on, the AI regularly **hallucinated fictional songs** that existed on neither platform - making extensive prompt modifications and testing across different preference combinations solved it
- **JWT + HMAC/SHA-256 authentication**, **Trello**-managed task distribution throughout the development period, as well as **86 unit tests** across user, recommendation, preference, statistics, and metrics functions`,
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
- **Food ranking system** across 4 dedicated pages: sorted by calories, fat, carbs, and protein per 100g, with recipes, preparation steps, and nutritional values
- **React Native mobile app** (separate codebase) mirroring core web features
 
**Development notes:**
- After a month of debugging, the **Firebase client SDK** was found to be failing to reliably deliver data at scale; switching to the **Firebase Admin SDK** via the Node.js backend resolved it entirely
- One of the hardest problems was **prompt engineering:** early GPT-3.5 and Gemini builds generated objects and activities instead of food. Upgrading to **GPT-4 Turbo** and rewriting the entire prompt from scratch was the breakthrough
- Gemini is accessed via **Vertex AI (Google Cloud)** because the Gemini API is unavailable in Bulgaria
- Meal generation went through **two rejected APIs** (Spoonacular, then Edamam) before landing on AI - limited recipe variety and inability to represent Bulgarian cuisine were the dealbreakers
- **Unit tests included** and **GitHub branching strategy** (main, dev, per-feature branches)`,
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
 
**Note:** The live demo is visitable but **some features may not function** as the project is **no longer actively maintained**
 
**Core features:**
- **Influence Algorithm:** identifies songs whose **TikTok popularity** peak predates their **Spotify peak** - proving cross-platform influence. One noticeable constraint is that Spotify doesn't expose raw play counts, only a **proprietary 0-100 popularity score** - understanding and working around this was essential to making the algorithm applicable
- **Growth Algorithm:** flags songs that are currently surging (last 2 days' popularity > all-time average)
- **Charts & leaderboards** for: Top 200 Global TikTok songs, Top 200 TikTok songs in Bulgaria, Top 200 most-followed TikTokers, Top 200 most-viewed videos - all updated daily via **Cronjob + Chartex API** scraping
- **Per-song stats pages:** TikTok videos count, YouTube views, Spotify popularity (0-100 scale), historical popularity change charts
- **Nearly 60 interactive statistics** and diagrams across the platform
- **"My Statistics" page:** live personal TikTok profile stats (followers, likes, following, videos) updated every minute via **Socket.IO + proxy server** (CORS mechanism did not allow requests to be sent directly from a browser to a different domain). This is the only page requiring TikTok OAuth login - session key is stored in a cookie valid for 1 hour. All other pages are publicly accessible
- All rankings rendered with **jQuery Datatables**; diagrams with **Chart.js**; real-time data via **Socket.IO** WebSocket / HTTP Long Polling
 
**Development notes:**
- **14 API approval attempts** with TikTok Developer team before gaining access - images from the email correspondence are included in the documentation`,
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
