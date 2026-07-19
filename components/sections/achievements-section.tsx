"use client";

import { useEffect, useState } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ModalShell } from "@/components/ui/modal-shell";
import { Lightbox } from "@/components/ui/lightbox";
import { SpinnerOverlay } from "@/components/ui/spinner-overlay";
import { achievements, type Achievement } from "@/lib/projects-data";
import { useLanguage, localize, Localized } from "@/lib/i18n/language-context";
import { t } from "@/lib/i18n/ui-translations";

function AchievementsGrid() {
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

// ─── Achievement Modal ─────────────────────────────────────────────────────
function AchievementModal({
  achievement,
  onClose
}: {
  achievement: Achievement;
  onClose: () => void;
}) {
  const { language } = useLanguage();
  const [activeDoc, setActiveDoc] = useState<{
    label: Localized;
    path: string;
    type?: "pdf" | "image";
    caption?: Localized;
  } | null>(achievement.docs?.[0] ?? null);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [docLoading, setDocLoading] = useState(true);

  useEffect(() => {
    setActiveDoc(achievement.docs?.[0] ?? null);
    setLightboxOpen(false);
  }, [achievement]);

  // Reset the loading spinner whenever the doc/image being displayed changes
  useEffect(() => {
    setDocLoading(true);
  }, [activeDoc?.path, achievement.fallbackImage]);

  // The image currently viewable in the lightbox - either the active image
  // doc (e.g. a certificate) or the achievement's fallback image
  const isImageDoc = activeDoc?.type === "image";
  const lightboxSrc = isImageDoc ? activeDoc?.path : achievement.fallbackImage;
  const lightboxCaption = isImageDoc
    ? activeDoc?.caption
      ? localize(activeDoc.caption, language)
      : activeDoc?.label
        ? localize(activeDoc.label, language)
        : undefined
    : achievement.fallbackImageCaption
      ? localize(achievement.fallbackImageCaption, language)
      : undefined;

  const placeColor =
    achievement.place === "1st"
      ? "text-yellow-500"
      : achievement.place === "2nd"
        ? "text-slate-400"
        : "text-primary";

  const altText = `${achievement.title} – ${achievement.competition} ${achievement.year}`;

  return (
    <>
    <ModalShell
      onClose={onClose}
      onEscape={() => (lightboxOpen ? setLightboxOpen(false) : onClose())}
      maxWidthClassName="sm:max-w-4xl"
    >
      {/* Header */}
      <div className="px-6 pt-5 pb-4 sm:px-8 shrink-0">
        <div className="pr-10">
          <p className="text-sm text-muted-foreground mb-1">
            {localize(achievement.competition, language)} · {achievement.year}
          </p>
          <h2 className="text-3xl font-bold">
            {achievement.kind !== "honor" &&
              `${t("projects.projectPrefix", language)} `}
            {localize(achievement.title, language)}
          </h2>
          {achievement.category && (
            <p className="text-base text-muted-foreground mt-1.5">
              {achievement.kind !== "honor" &&
                `${t("achievements.category", language)}: `}
              {localize(achievement.category, language)}
            </p>
          )}
        </div>

        {/* Badges, doc tabs, links - with rank floating in the empty space to the right */}
        <div className="relative pr-20 sm:pr-24">
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mt-4">
            {achievement.score && (
              <Badge variant="secondary" className="rounded-full text-sm">
                {t("achievements.grade", language)}: {achievement.score}
              </Badge>
            )}
            {achievement.points && (
              <Badge variant="secondary" className="rounded-full text-sm">
                {t("achievements.points", language)}:{" "}
                {localize(achievement.points, language)}
              </Badge>
            )}
            {achievement.extra && (
              <Badge
                variant="outline"
                className="rounded-full text-sm text-primary border-primary/30"
              >
                {localize(achievement.extra, language)}
              </Badge>
            )}
          </div>

          {/* Doc tabs - if multiple docs */}
          {achievement.docs && achievement.docs.length > 1 && (
            <div className="flex gap-2 mt-4">
              {achievement.docs.map((doc) => (
                <button
                  key={doc.path}
                  onClick={() => {
                    if (docLoading) return;
                    setActiveDoc(doc);
                  }}
                  disabled={docLoading}
                  className={`shine-sweep text-sm px-3.5 py-1.5 rounded-full border transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                    activeDoc?.path === doc.path
                      ? "bg-primary text-primary-foreground border-primary"
                      : "shine-sweep-tint border-border text-foreground hover:border-primary hover:text-primary dark:bg-secondary/60"
                  }`}
                >
                  {localize(doc.label, language)}
                </button>
              ))}
            </div>
          )}

          {/* Reference links */}
          {achievement.links && achievement.links.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-3.5">
              {achievement.links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  {localize(link.label, language)}
                </a>
              ))}
            </div>
          )}

          {achievement.place && (
            <span
              className={`absolute right-0 top-1/2 -translate-y-1/2 text-4xl font-black tabular-nums ${placeColor}`}
            >
              #{achievement.place.replace(/\D/g, "")}
            </span>
          )}
        </div>
      </div>

      {/* PDF viewer, certificate image, or fallback image */}
      <div className="flex-1 min-h-0 px-6 pb-6 sm:px-8 sm:pb-8">
        {activeDoc && isImageDoc ? (
          <div
            className="w-full h-full max-h-[55vh] rounded-xl overflow-hidden border border-border relative cursor-zoom-in group/img"
            onClick={() => setLightboxOpen(true)}
          >
            <img
              src={activeDoc.path}
              alt={`${localize(achievement.title, language)} – ${localize(activeDoc.label, language)}`}
              className={`w-full h-full object-contain transition-opacity duration-150 ${
                docLoading ? "opacity-40" : "opacity-100"
              }`}
              decoding="async"
              onLoad={() => setDocLoading(false)}
              onError={() => setDocLoading(false)}
            />
            {docLoading && <SpinnerOverlay />}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-200">
              <div className="bg-black/60 text-white text-base px-6 py-3 rounded-full font-semibold">
                {t("achievements.clickToExpand", language)}
              </div>
            </div>
            {activeDoc.caption && (
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3 pointer-events-none">
                <p className="text-white text-xs line-clamp-2">
                  {localize(activeDoc.caption, language)}
                </p>
              </div>
            )}
          </div>
        ) : activeDoc ? (
          <div className="relative w-full h-full min-h-[55vh] rounded-xl overflow-hidden border border-border">
            <iframe
              key={activeDoc.path}
              src={`${activeDoc.path}#zoom=100`}
              className={`w-full h-full transition-opacity duration-150 ${
                docLoading ? "opacity-40" : "opacity-100"
              }`}
              style={{ minHeight: "55vh", zoom: 1 }}
              title={localize(activeDoc.label, language)}
              onLoad={() => setDocLoading(false)}
            />
            {docLoading && <SpinnerOverlay />}
          </div>
        ) : achievement.fallbackImage ? (
          <div
            className="w-full h-full max-h-[55vh] rounded-xl overflow-hidden border border-border relative cursor-zoom-in group/img"
            onClick={() => setLightboxOpen(true)}
          >
            <img
              src={achievement.fallbackImage}
              alt={altText}
              className={`w-full h-full object-contain transition-opacity duration-150 ${
                docLoading ? "opacity-40" : "opacity-100"
              }`}
              decoding="async"
              onLoad={() => setDocLoading(false)}
              onError={() => setDocLoading(false)}
            />
            {docLoading && <SpinnerOverlay />}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-200">
              <div className="bg-black/60 text-white text-base px-6 py-3 rounded-full font-semibold">
                {t("achievements.clickToExpand", language)}
              </div>
            </div>
            {achievement.fallbackImageCaption && (
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3 pointer-events-none">
                <p className="text-white text-xs line-clamp-2">
                  {localize(achievement.fallbackImageCaption, language)}
                </p>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </ModalShell>

    {/* ── Image lightbox (certificate doc or fallback image), rendered as a
         sibling of the modal card rather than nested inside it - the card
         has a transform-based enter animation, which would create a
         containing block and trap this position:fixed overlay instead of
         letting it cover the full viewport ── */}
    {lightboxOpen && lightboxSrc && (
      <Lightbox
        src={lightboxSrc}
        alt={altText}
        caption={lightboxCaption}
        onClose={() => setLightboxOpen(false)}
        scrollToZoomLabel={t("achievements.scrollToZoom", language)}
        resetZoomLabel={t("achievements.resetZoom", language)}
      />
    )}
    </>
  );
}

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
