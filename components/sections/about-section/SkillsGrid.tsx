"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/lib/i18n/language-context";
import { t } from "@/lib/i18n/ui-translations";
import { skills } from "@/lib/skills-data";

export function SkillsGrid() {
  const { language } = useLanguage();

  return (
    <div className="reveal grid grid-cols-1 sm:grid-cols-2 gap-3 auto-rows-fr">
      {skills.map((group) => (
        <Card
          key={group.category}
          className="bg-card/80 hover:border-primary/30 transition-colors flex flex-col h-full"
        >
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-primary">
              {t(`about.skillCategories.${group.category}`, language)}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex items-center">
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((s) => (
                <Badge key={s} variant="secondary" className="rounded-full text-sm">
                  {s}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
