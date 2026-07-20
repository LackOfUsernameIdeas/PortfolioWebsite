"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { projects, type Project } from "@/lib/projects-data";
import { PROJECT_CARD_IMAGES } from "@/lib/project-images-data";
import { useLanguage, localize } from "@/lib/i18n/language-context";
import { t } from "@/lib/i18n/ui-translations";
import { ProjectModal } from "./ProjectModal";

export function ProjectsSection() {
  const [selected, setSelected] = useState<Project | null>(null);
  const { language } = useLanguage();

  return (
    <section
      id="projects"
      className="py-24 px-6 sm:px-12 lg:px-20 bg-muted/30 dark:bg-muted/20"
    >
      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
      <div className="max-w-7xl mx-auto">
        <h2 className="reveal glow-underline text-4xl sm:text-6xl font-bold mb-12">
          {t("projects.heading", language)}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 5).map((project) => (
            <div
              key={project.id}
              onClick={() => setSelected(project)}
              className="reveal glow-card group relative bg-card rounded-2xl overflow-hidden shadow hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-border hover:border-primary/30 cursor-pointer"
            >
              <div className="h-1 w-full bg-gradient-to-r from-primary to-primary/40" />
              <div className="aspect-[4/3] bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center relative overflow-hidden">
                <div className="w-full h-full absolute inset-0">
                  {PROJECT_CARD_IMAGES[project.id] ? (
                    <img
                      src={PROJECT_CARD_IMAGES[project.id]}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 px-4 text-center h-full justify-center">
                      <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center">
                        <span className="text-2xl font-bold text-primary">
                          {project.title.charAt(0)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 bg-primary/80 dark:bg-primary/95 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-2">
                  <span className="text-white text-base font-semibold">
                    {t("projects.clickToExpand", language)}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-xl">{project.title}</h3>
                  <Badge
                    variant="outline"
                    className="text-sm rounded-full shrink-0"
                  >
                    {project.year}
                  </Badge>
                </div>
                <p className="text-base text-muted-foreground dark:text-foreground/85 mt-1.5">
                  {localize(project.shortDescription, language)}
                </p>
              </div>
              <div className="absolute top-4 right-4 w-7 h-7 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                <ArrowRight className="w-3 h-3 text-primary" />
              </div>
            </div>
          ))}
          <div
            className="reveal group relative bg-card rounded-2xl overflow-hidden border-2 border-dashed border-border hover:border-primary transition-colors flex items-center justify-center aspect-[4/3] sm:aspect-auto sm:h-[280px] cursor-pointer"
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <div className="text-center p-6">
              <div className="w-12 h-12 rounded-full border-2 border-foreground/30 flex items-center justify-center mx-auto mb-4 group-hover:border-primary group-hover:text-primary transition-colors">
                <span className="text-2xl">+</span>
              </div>
              <h3 className="font-bold text-lg">
                {t("projects.collaborateTitle", language)}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
