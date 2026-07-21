import type { Language } from "./language-context";

export const uiTranslations = {
  splash: {
    welcome: {
      en: "Welcome to my personal website",
      bg: "Добре дошли в моя личен уебсайт"
    },
    prompt: { en: "Please select a language", bg: "Моля, изберете език" },
    english: { en: "English", bg: "Английски" },
    bulgarian: { en: "Bulgarian", bg: "Български" }
  },
  nav: {
    home: { en: "HOME", bg: "НАЧАЛО" },
    about: { en: "ABOUT ME", bg: "ЗА МЕН" },
    achievements: { en: "ACHIEVEMENTS", bg: "ПОСТИЖЕНИЯ" },
    projects: { en: "PROJECTS", bg: "ПРОЕКТИ" },
    contact: { en: "CONTACT", bg: "КОНТАКТИ" }
  },
  hero: {
    subtitle: {
      en: "Full-stack Software Developer | Building scalable web and mobile applications",
      bg: "Full-stack Софтуерен инженер | Занимавам се с изграждането на съвременни уеб и мобилни приложения"
    },
    viewProjects: { en: "View my projects", bg: "Разгледайте проектите ми" },
    contactMe: { en: "Contact me", bg: "Свържете се с мен" },
    scroll: { en: "SCROLL", bg: "ПЛЪЗНЕТЕ НАДОЛУ" }
  },
  about: {
    heading: { en: "About me", bg: "За мен" },
    location: { en: "Bulgaria", bg: "България" },
    paragraph1: {
      en: "I am a passionate software developer and engineer with practical knowledge in full-stack development, android development, artificial intelligence, databases, some electronical sensors and more. My work spans across multiple disciplines, combining hardware and software to create innovative solutions.",
      bg: "Аз съм отдаден софтуерен инженер с практически познания във full-stack разработката, Android приложенията, изкуствения интелект, базите данни, някои електронни сензори и други. Работата ми обхваща множество дисциплини, съчетавайки хардуер и софтуер за създаване на иновативни решения."
    },
    paragraph2: {
      en: "With a strong foundation in computer science and hands-on experience, I have achieved recognition in national competitions.",
      bg: "Благодарение на задълбочената подготовка в областта на компютърните науки, както и на практическия опит, във времето съм се отличавал на национални състезания."
    },
    paragraph3: {
      en: "Currently seeking opportunities to apply my skills in challenging projects and collaborate with like-minded professionals.",
      bg: "Търся възможности да прилагам уменията си в предизвикателни проекти и да работя с мотивирани специалисти със сходни интереси."
    },
    downloadCV: { en: "Download CV", bg: "Изтеглете CV" },
    downloadCVEnglish: { en: "English version", bg: "Английска версия" },
    downloadCVBulgarian: { en: "Bulgarian version", bg: "Българска версия" },
    skillCategories: {
      Languages: { en: "Languages", bg: "Езици за разработка" },
      "Frontend & Mobile": {
        en: "Frontend & Mobile",
        bg: "Frontend и мобилни технологии"
      },
      "Backend & Data": {
        en: "Backend & Data",
        bg: "Backend и данни"
      },
      "AI & Computer Vision": {
        en: "AI & Computer Vision",
        bg: "ИИ и компютърно зрение"
      },
      "Tools & APIs": {
        en: "Tools & APIs",
        bg: "Инструменти и API-та"
      },
      "Visualization, Desktop & Hardware": {
        en: "Visualization, Desktop apps & Hardware",
        bg: "Визуализация, десктоп приложения и хардуер"
      }
    }
  },
  achievements: {
    heading: { en: "Achievements", bg: "Постижения" },
    noit: {
      short: { en: "NOIT", bg: "НОИТ" },
      full: {
        en: "National Olympiad in Information Technologies",
        bg: "Национална Олимпиада по Информационни Технологии"
      }
    },
    netit: {
      short: { en: "NATIT", bg: "НЕТИТ" },
      full: {
        en: "National Autumn Tournament in Information Technologies",
        bg: "Национален Есенен Турнир по Информационни Технологии"
      }
    },
    grade: { en: "Grade", bg: "Оценка" },
    points: { en: "Points", bg: "Точки" },
    viewRanking: { en: "View ranking", bg: "Вижте класирането" },
    viewCertificate: { en: "View certificate", bg: "Вижте сертификата" },
    clickToExpand: { en: "Click to expand", bg: "Натиснете за уголемяване" },
    scrollToZoom: {
      en: "Zoom with your mouse wheel or touchpad · hold the left mouse button and drag to pan",
      bg: "Увеличете със скролера на мишката или тъчпада · задръжте левия бутон на мишката и плъзнете за преглед"
    },
    touchToZoom: {
      en: "Pinch to zoom · drag to pan",
      bg: "Увеличете с пръсти · плъзнете за преглед"
    },
    resetZoom: { en: "Reset zoom", bg: "Нулирайте мащаба" },
    category: { en: "Category", bg: "Категория" }
  },
  projects: {
    heading: { en: "Projects", bg: "Проекти" },
    projectPrefix: { en: "Project:", bg: "Проект:" },
    technologies: { en: "Technologies", bg: "Технологии" },
    github: { en: "GitHub", bg: "GitHub" },
    githubMobile: { en: "GitHub (Mobile)", bg: "GitHub (Mobile)" },
    liveDemo: { en: "Live Demo", bg: "Онлайн демо" },
    clickToExpand: { en: "Click to expand", bg: "Натиснете за уголемяване" },
    scrollToZoom: {
      en: "Zoom with your mouse wheel or touchpad · hold the left mouse button and drag to pan",
      bg: "Увеличете със скролера на мишката или тъчпада · задръжте левия бутон на мишката и плъзнете за преглед"
    },
    touchToZoom: {
      en: "Pinch to zoom · drag to pan",
      bg: "Увеличете с пръсти · плъзнете за преглед"
    },
    resetZoom: { en: "Reset zoom", bg: "Нулирайте мащаба" },
    collaborateTitle: {
      en: "Collaborate on a New Project",
      bg: "Сътрудничество по нов проект"
    }
  },
  contact: {
    headingLine1: { en: "Interested in", bg: "Имате интерес" },
    headingLine2: { en: "working together?", bg: "да работим заедно?" },
    subtitle: {
      en: "I look forward to hearing from you.",
      bg: "Ще се радвам да се свържете с мен."
    },
    name: { en: "Name", bg: "Име" },
    namePlaceholder: { en: "Your name", bg: "Вашето име" },
    email: { en: "Email address", bg: "Имейл адрес" },
    emailPlaceholder: { en: "Your email address", bg: "Вашият имейл адрес" },
    subject: { en: "Subject", bg: "Тема" },
    subjectPlaceholder: {
      en: "What is the message about?",
      bg: "Относно какво е съобщението?"
    },
    message: { en: "Message", bg: "Съобщение" },
    messagePlaceholder: { en: "Your message...", bg: "Вашето съобщение..." },
    sending: { en: "Sending…", bg: "Изпращане…" },
    sendMessage: { en: "Send Message", bg: "Изпратете съобщение" },
    sentTitle: { en: "Message Sent!", bg: "Съобщението е изпратено!" },
    sentSubtitle: {
      en: "I'll respond as soon as possible.",
      bg: "Ще отговоря възможно най-скоро."
    },
    sendAnother: { en: "Send Another", bg: "Изпратете друго" }
  },
  footer: {
    text: {
      en: "Designed and coded by Kaloyan Kostadinov",
      bg: "Дизайн и код от Калоян Костадинов"
    }
  }
} as const;

type TranslationNode =
  | { [key: string]: TranslationNode }
  | { en: string; bg: string };

export function t(path: string, lang: Language): string {
  const segments = path.split(".");
  let node: TranslationNode | undefined = uiTranslations;
  for (const seg of segments) {
    node = node ? (node as { [key: string]: TranslationNode })[seg] : undefined;
  }
  if (!node) return path;
  const leaf = node as { en: string; bg: string };
  return leaf[lang] ?? leaf.en ?? path;
}
