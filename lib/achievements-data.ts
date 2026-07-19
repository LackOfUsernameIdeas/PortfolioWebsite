import type { Localized } from "./i18n/language-context";

export interface Achievement {
  year: string;
  title: Localized;
  competition: Localized;
  category?: Localized;
  place?: string;
  score?: string;
  points?: Localized;
  extra?: Localized;
  kind?: "competition" | "honor";
  docs?: {
    label: Localized;
    path: string;
    type?: "pdf" | "image";
    caption?: Localized;
  }[];
  links?: { label: Localized; url: string }[];
  fallbackImage?: string;
  fallbackImageCaption?: Localized;
}

export const achievements: Achievement[] = [
  {
    year: "2023",
    title: { en: "TikFluence", bg: "TikFluence" },
    competition: { en: 'NATIT "John Atanasov"', bg: "НЕТИТ „Джон Атанасов“" },
    category: {
      en: "Software Applications · 8–10 grade",
      bg: "Софтуерни приложения · 8–10 клас"
    },
    place: "2nd",
    extra: { en: "First NATIT participation", bg: "Първо участие в НЕТИТ" },
    docs: [
      {
        label: { en: "Newspaper clipping", bg: "Извадка от статия" },
        path: "/achievements/netit-2023-newspaper.png",
        type: "image",
        caption: {
          en: "Newspaper clipping from “Glashatai” covering the awards ceremony at the National Autumn Tournament in Information Technologies “John Atanasov”, held December 1–3 (2023) in Sofia. I won 2nd place in the “Software Applications” category with the “TikFluence” project",
          bg: "Извадка от „Глашатай“, показваща церемонията по връчването на наградите на Националния есенен турнир по информационни технологии „Джон Атанасов“, проведен от 1 до 3 декември (2023) в София. Спечелих 2-ро място в категорията „Софтуерни приложения“ с проекта „TikFluence“"
        }
      },
      {
        label: {
          en: "Certificate of participation",
          bg: "Грамота за участие"
        },
        path: "/achievements/certificates/2023_NATIT_certificate.png",
        type: "image"
      }
    ],
    links: [
      {
        label: { en: "Newspaper Article", bg: "Новинарска статия" },
        url: "https://glashatai.com/article/24722-golqm-yspeh-na-ychenicite-ot-pgi-na-nacionalnoto-s"
      },
      {
        label: { en: "School News", bg: "Училищни новини" },
        url: "https://pgi-pernik.bg-schools.com/novini.php?id=823"
      }
    ]
  },
  {
    year: "2023",
    title: { en: "TikFluence", bg: "TikFluence" },
    competition: { en: "NOIT", bg: "НОИТ" },
    category: {
      en: "Software Applications · 8–10 grade",
      bg: "Софтуерни приложения · 8–10 клас"
    },
    place: "4th",
    score: "6.00",
    points: {
      en: "88 project · 86 individual",
      bg: "88 на проект · 86 индивидуално"
    },
    docs: [
      {
        label: { en: "Project ranking", bg: "Класиране на проект" },
        path: "/achievements/noit-2023-project.pdf"
      },
      {
        label: { en: "Individual ranking", bg: "Индивидуално класиране" },
        path: "/achievements/noit-2023-individual.pdf"
      },
      {
        label: {
          en: "Certificate of participation",
          bg: "Грамота за участие"
        },
        path: "/achievements/certificates/2023_NOIT_certificate.png",
        type: "image"
      },
      {
        label: {
          en: "School certificate of excellence",
          bg: "Училищна грамота"
        },
        caption: {
          en: "School certificate for excellent performance in the National Olympiad in Information Technology",
          bg: "Грамота от училището за отлично представяне в Националната олимпиада по информационни технологии"
        },
        path: "/achievements/certificates/2023_NOIT_certificate_of_excellence.png",
        type: "image"
      }
    ],
    links: [
      {
        label: { en: "Official results", bg: "Официални резултати" },
        url: "https://edusoft.fmi.uni-sofia.bg/news/view/171"
      }
    ]
  },
  {
    year: "2024",
    title: { en: "NutriFit", bg: "NutriFit" },
    competition: { en: 'NATIT "John Atanasov"', bg: "НЕТИТ „Джон Атанасов“" },
    category: {
      en: "Software Applications",
      bg: "Софтуерни приложения"
    },
    place: "1st",
    points: { en: "96 project", bg: "96 на проект" },
    docs: [
      {
        label: { en: "Project ranking", bg: "Класиране на проект" },
        path: "/achievements/netit-2024.pdf"
      }
    ],
    links: [
      {
        label: { en: "Official results", bg: "Официални резултати" },
        url: "https://122ou.com/netit2024/"
      }
    ]
  },
  {
    year: "2024",
    title: { en: "NutriFit", bg: "NutriFit" },
    competition: { en: "NOIT", bg: "НОИТ" },
    category: {
      en: "Software Applications · 8–10 grade",
      bg: "Софтуерни приложения · 8–10 клас"
    },
    place: "4th",
    score: "5.75",
    points: {
      en: "85 project · 77 individual",
      bg: "85 на проект · 77 индивидуално"
    },
    docs: [
      {
        label: { en: "Project ranking", bg: "Класиране на проект" },
        path: "/achievements/noit-2024-project.pdf"
      },
      {
        label: { en: "Individual ranking", bg: "Индивидуално класиране" },
        path: "/achievements/noit-2024-individual.pdf"
      },
      {
        label: {
          en: "Certificate of participation",
          bg: "Сертификат за участие"
        },
        path: "/achievements/certificates/2024_NOIT_certificate.png",
        type: "image"
      }
    ],
    links: [
      {
        label: { en: "Official results", bg: "Официални резултати" },
        url: "https://edusoft.fmi.uni-sofia.bg/news/view/182"
      }
    ]
  },
  {
    year: "2025",
    title: { en: "MindReel", bg: "MindReel" },
    competition: { en: "NOIT", bg: "НОИТ" },
    category: {
      en: "Big Data · 11–12 grade",
      bg: "Големи обеми от данни · 11–12 клас"
    },
    place: "5th",
    score: "5.75",
    points: {
      en: "78 project · 83 individual",
      bg: "78 на проект · 83 индивидуално"
    },
    extra: {
      en: "known in its early stage as ArtCompass",
      bg: "познат в ранния си етап като ArtCompass"
    },
    docs: [
      {
        label: { en: "Ministry attestation", bg: "Служебна бележка" },
        caption: {
          en: "Official recognition from the Ministry of Education and Science for excellent performance at the National Olympiad in Information Technology",
          bg: "Служебна бележка от Министерството на образованието и науката за отлично представяне на Националната олимпиада по информационни технологии"
        },
        path: "/achievements/certificates/2025_Ministry_of_education_official_confirmation_of_excellent_performance.png",
        type: "image"
      },
      {
        label: { en: "Project ranking", bg: "Класиране на проект" },
        path: "/achievements/noit-2025-project.pdf"
      },
      {
        label: { en: "Individual ranking", bg: "Индивидуално класиране" },
        path: "/achievements/noit-2025-individual.pdf"
      },
      {
        label: {
          en: "Certificate of participation",
          bg: "Грамота за участие"
        },
        path: "/achievements/certificates/2025_NOIT_certificate.png",
        type: "image"
      }
    ],
    links: [
      {
        label: { en: "Official results", bg: "Официални резултати" },
        url: "https://edusoft.fmi.uni-sofia.bg/news/view/193"
      }
    ]
  },
  {
    year: "2026",
    title: {
      en: "Academic Excellence & Graduation with Distinction",
      bg: "„Отличник на випуск 2026“"
    },
    kind: "honor",
    competition: {
      en: "Award from the Mayor of Municipality Pernik",
      bg: "Награда от кмета на Община Перник"
    },
    docs: [
      {
        label: { en: "Certificate from the Mayor", bg: "Сертификат от кмета" },
        path: "/achievements/certificates/2026_certificate_of_academic_excellence_mayor.png",
        type: "image"
      },
      {
        label: { en: "Ceremony photo", bg: "Снимка от церемонията" },
        caption: {
          en: "Photo from the award ceremony",
          bg: "Снимка от церемонията по връчване на наградата"
        },
        path: "/achievements/certificate_of_excellence_mayor_ceremony.png",
        type: "image"
      },
      {
        label: { en: "School certificate", bg: "Училищна грамота" },
        caption: {
          en: "School certificate for excellent academic performance",
          bg: "Училищна грамота за отличен успех"
        },
        path: "/achievements/certificates/2026_certificate_of_academic_excellence_school.png",
        type: "image"
      }
    ]
  }
];
