"use client";

import { ChevronDown, Download, MapPin } from "lucide-react";
import { UKFlag, BulgariaFlag } from "@/components/language-toggle";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/lib/i18n/language-context";
import { t } from "@/lib/i18n/ui-translations";
import { skills } from "@/lib/skills-data";

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
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="lg"
                    className="shine-sweep group rounded-full px-7 py-5 text-base leading-none cursor-pointer"
                  >
                    <Download className="h-4 w-4 mr-2" />{" "}
                    {t("about.downloadCV", language)}
                    <ChevronDown className="h-4 w-4 ml-2 transition-transform duration-150 group-data-[state=open]:rotate-180" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="min-w-56 bg-card border border-border rounded-2xl shadow-lg p-2"
                >
                  <DropdownMenuItem
                    asChild
                    className="cursor-pointer rounded-full px-4 py-2.5 text-sm font-medium transition-colors focus:bg-secondary focus:text-primary data-[highlighted]:bg-secondary data-[highlighted]:text-primary"
                  >
                    <a href="/CV/Kaloyan_Kostadinov_CV.pdf" download>
                      <span className="w-4 h-4 rounded-full overflow-hidden shrink-0">
                        <UKFlag />
                      </span>
                      {t("about.downloadCVEnglish", language)}
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    asChild
                    className="cursor-pointer rounded-full px-4 py-2.5 text-sm font-medium transition-colors focus:bg-secondary focus:text-primary data-[highlighted]:bg-secondary data-[highlighted]:text-primary"
                  >
                    <a href="/CV/Kaloyan_Kostadinov_CV_BG.pdf" download>
                      <span className="w-4 h-4 rounded-full overflow-hidden shrink-0">
                        <BulgariaFlag />
                      </span>
                      {t("about.downloadCVBulgarian", language)}
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
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
                      <Badge
                        key={s}
                        variant="secondary"
                        className="rounded-full text-sm"
                      >
                        {s}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
