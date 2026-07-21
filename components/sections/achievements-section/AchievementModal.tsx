"use client";

import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ModalShell } from "@/components/ui/modal-shell";
import { Lightbox } from "@/components/ui/lightbox";
import { SpinnerOverlay } from "@/components/ui/spinner-overlay";
import { type Achievement } from "@/lib/achievements-data";
import { useLanguage, localize, Localized } from "@/lib/i18n/language-context";
import { t } from "@/lib/i18n/ui-translations";

export function AchievementModal({
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

          {/* Badges, doc tabs, links and rank */}
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

      {lightboxOpen && lightboxSrc && (
        <Lightbox
          src={lightboxSrc}
          alt={altText}
          caption={lightboxCaption}
          onClose={() => setLightboxOpen(false)}
          scrollToZoomLabel={t("achievements.scrollToZoom", language)}
          touchToZoomLabel={t("achievements.touchToZoom", language)}
          resetZoomLabel={t("achievements.resetZoom", language)}
          scrollable
        />
      )}
    </>
  );
}
