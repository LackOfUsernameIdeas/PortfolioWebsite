"use client";

import { MapPin } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import { t } from "@/lib/i18n/ui-translations";
import { CVDownloadMenu } from "./CVDownloadMenu";
import { SkillsGrid } from "./SkillsGrid";

export function AboutSection() {
  const { language } = useLanguage();
  return (
    <section id="about" className="py-24 px-6 sm:px-12 lg:px-20 bg-card/40">
      <div className="max-w-7xl mx-auto">
        <div className="reveal flex items-end gap-6 mb-16">
          <h2 className="glow-underline text-4xl sm:text-6xl font-bold">
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
              <CVDownloadMenu />
            </div>
          </div>
          <SkillsGrid />
        </div>
      </div>
    </section>
  );
}
