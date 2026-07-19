"use client";

import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import { t } from "@/lib/i18n/ui-translations";
import { AchievementsGrid } from "./AchievementsGrid";

export function AchievementsSection() {
  const { language } = useLanguage();
  return (
    <section id="achievements" className="py-24 px-6 sm:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="reveal glow-underline text-4xl sm:text-6xl font-bold mb-6">
          {t("achievements.heading", language)}
        </h2>
        <div className="reveal flex flex-wrap gap-3 mb-12">
          <div className="flex items-center gap-2 text-sm bg-card border border-border rounded-full px-3.5 py-2 text-muted-foreground">
            <span className="font-semibold text-foreground">
              {t("achievements.noit.short", language)}
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
            <span>{t("achievements.noit.full", language)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm bg-card border border-border rounded-full px-3.5 py-2 text-muted-foreground">
            <span className="font-semibold text-foreground">
              {t("achievements.netit.short", language)}
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
            <span>{t("achievements.netit.full", language)}</span>
          </div>
        </div>
        <AchievementsGrid />
      </div>
    </section>
  );
}
