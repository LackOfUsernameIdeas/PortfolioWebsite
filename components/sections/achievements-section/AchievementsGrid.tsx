"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { achievements, type Achievement } from "@/lib/achievements-data";
import { useLanguage, localize } from "@/lib/i18n/language-context";
import { t } from "@/lib/i18n/ui-translations";
import { AchievementModal } from "./AchievementModal";

export function AchievementsGrid() {
  const [openAchievement, setOpenAchievement] = useState<Achievement | null>(
    null
  );
  const { language } = useLanguage();

  return (
    <>
      {openAchievement && (
        <AchievementModal
          achievement={openAchievement}
          onClose={() => setOpenAchievement(null)}
        />
      )}

      <div className="space-y-16">
        {(["2026", "2025", "2024", "2023"] as const).map((year) => {
          const items = achievements.filter((a) => a.year === year);
          return (
            <div key={year} className="reveal">
              <div className="flex items-center gap-4 mb-7">
                <h4 className="text-2xl font-bold text-primary">{year}</h4>
                <div className="flex-1 h-px bg-border" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {items.map((a, i) => {
                  const placeNum = a.place ? a.place.replace(/\D/g, "") : null;
                  const placeColor =
                    a.place === "1st"
                      ? "text-yellow-500"
                      : a.place === "2nd"
                        ? "text-slate-400"
                        : "text-primary";
                  const accentColor =
                    a.place === "1st"
                      ? "bg-yellow-500"
                      : a.place === "2nd"
                        ? "bg-slate-400"
                        : "bg-primary/60";
                  const glowClass =
                    a.place === "1st"
                      ? "hover:shadow-[0_0_28px_-6px_rgba(234,179,8,0.45)]"
                      : a.place === "2nd"
                        ? "hover:shadow-[0_0_22px_-6px_rgba(148,163,184,0.4)]"
                        : "hover:shadow-md";
                  const hasViewer =
                    (a.docs && a.docs.length > 0) || a.fallbackImage;

                  return (
                    <Card
                      key={i}
                      className={`flex flex-col overflow-hidden transition-[transform,box-shadow,border-color] duration-300 will-change-transform [backface-visibility:hidden] ${glowClass} ${hasViewer ? "hover:border-primary/30 hover:-translate-y-1 cursor-pointer" : ""}`}
                      onClick={() => hasViewer && setOpenAchievement(a)}
                    >
                      <div className={`h-1.5 w-full shrink-0 ${accentColor}`} />

                      <CardContent className="flex flex-col gap-2.5 flex-1">
                        <p className="text-md text-muted-foreground">
                          {localize(a.competition, language)}
                        </p>
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-bold text-2xl leading-snug">
                            {a.kind !== "honor" &&
                              `${t("projects.projectPrefix", language)} `}
                            {localize(a.title, language)}
                          </p>
                          {placeNum && (
                            <span
                              className={`text-3xl font-black tabular-nums leading-none shrink-0 ${placeColor}`}
                            >
                              #{placeNum}
                            </span>
                          )}
                        </div>
                        {a.category && (
                          <p className="text-sm text-muted-foreground">
                            {a.kind !== "honor" &&
                              `${t("achievements.category", language)}: `}
                            {localize(a.category, language)}
                          </p>
                        )}

                        {(a.score || a.points || a.extra) && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {a.score && (
                              <Badge
                                variant="secondary"
                                className="rounded-full text-sm"
                              >
                                {t("achievements.grade", language)}: {a.score}
                              </Badge>
                            )}
                            {a.points && (
                              <Badge
                                variant="secondary"
                                className="rounded-full text-sm"
                              >
                                {t("achievements.points", language)}:{" "}
                                {localize(a.points, language)}
                              </Badge>
                            )}
                            {a.extra && (
                              <Badge
                                variant="outline"
                                className="rounded-full text-sm text-primary border-primary/30"
                              >
                                {localize(a.extra, language)}
                              </Badge>
                            )}
                          </div>
                        )}

                        {hasViewer && (
                          <div className="mt-auto pt-3">
                            <span className="flex items-center gap-1.5 text-sm text-primary font-medium">
                              <ExternalLink className="w-3.5 h-3.5" />
                              {t(
                                a.kind === "honor"
                                  ? "achievements.viewCertificate"
                                  : "achievements.viewRanking",
                                language
                              )}
                            </span>
                          </div>
                        )}

                        {a.links && a.links.length > 0 && (
                          <div className="flex flex-wrap gap-2 pt-1">
                            {a.links.map((link, li) => (
                              <a
                                key={li}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                {localize(link.label, language)}
                              </a>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
