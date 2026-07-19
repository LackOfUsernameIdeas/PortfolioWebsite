interface SkillCategory {
  category: string;
  items: string[];
}

export const skills: SkillCategory[] = [
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
      "WebXR"
    ]
  },
  {
    category: "Backend & Data",
    items: [
      "Node.js",
      "Express.js",
      "MySQL",
      "PostgreSQL",
      "Firebase",
      "Supabase",
      "Google Cloud Run",
      "Google Cloud Storage",
      "Beautiful Soup",
      "Socket.IO"
    ]
  },
  {
    category: "AI & Computer Vision",
    items: [
      "OpenAI API",
      "Gemini API",
      "Vertex AI",
      "LangChain",
      "OpenCV",
      "NumPy",
      "PyNuitrack",
      "Nuitrack SDK"
    ]
  },
  {
    category: "Tools & APIs",
    items: [
      "Git",
      "Docker",
      "Android Studio",
      "Expo Go",
      "Vitest",
      "Cronjob",
      "YouTube API",
      "Spotify API",
      "TikTok API",
      "OMDb API",
      "Google Custom Search JSON API"
    ]
  },
  {
    category: "Visualization, Desktop & Hardware",
    items: [
      "Chart.js",
      "ApexCharts",
      "Tkinter",
      "Pygame",
      "Orbbec Astra+",
      "NeuroSky MindWave Mobile 2",
      "Meta Quest 2"
    ]
  }
];
