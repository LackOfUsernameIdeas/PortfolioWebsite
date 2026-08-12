interface SkillCategory {
  category: string;
  items: string[];
}

export const skills: SkillCategory[] = [
  {
    category: "Languages",
    items: [
      "TypeScript",
      "JavaScript",
      "Python",
      "Java",
      "PHP",
      "SQL",
      "HTML",
      "CSS"
    ]
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
      "A-Frame",
      "Bootstrap",
      "Chakra UI"
    ]
  },
  {
    category: "Backend & Data",
    items: [
      "Node.js",
      "Express.js",
      "Spring Boot",
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
    category: "Tools",
    items: [
      "Git",
      "Docker",
      "Maven",
      "GitHub Actions",
      "Android Studio",
      "Expo Go",
      "Vitest",
      "JUnit",
      "Cronjob"
    ]
  },
  {
    category: "AI",
    items: ["OpenAI API", "Gemini API", "Vertex AI", "LangChain"]
  },
  {
    category: "Visualization, Desktop & Hardware",
    items: [
      "Chart.js",
      "ApexCharts",
      "Tkinter",
      "Orbbec Astra+",
      "NeuroSky MindWave Mobile 2",
      "Meta Quest 2"
    ]
  }
];
