"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Code2,
  Download,
  ExternalLink,
  Github,
  Languages
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ModalShell } from "@/components/ui/modal-shell";
import { Lightbox } from "@/components/ui/lightbox";
import { IconCircleButton } from "@/components/ui/icon-circle-button";
import { SpinnerOverlay } from "@/components/ui/spinner-overlay";
import { type Project } from "@/lib/projects-data";
import { PROJECT_IMAGES } from "@/lib/project-images-data";
import { renderFormatted } from "@/lib/text-format";
import { useLanguage, localize } from "@/lib/i18n/language-context";
import { t } from "@/lib/i18n/ui-translations";

export function ProjectModal({
  project,
  onClose
}: {
  project: Project;
  onClose: () => void;
}) {
  const { language } = useLanguage();
  const [imgIdx, setImgIdx] = useState(0);
  const [imgLoading, setImgLoading] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const images = PROJECT_IMAGES[project.id] ?? [];

  const isVideo = (src: string) => /\.(mp4|mov|webm|ogg)$/i.test(src);

  const goTo = useCallback(
    (idx: number) => {
      if (imgLoading) return;
      if (!isVideo(images[idx].src)) {
        setImgLoading(true);
      }
      setImgIdx(idx);
    },
    [imgLoading, images]
  );

  // Reset on project change
  useEffect(() => {
    setImgIdx(0);
    setImgLoading(false);
    setLightboxOpen(false);
  }, [project.id]);

  // Arrow-key gallery navigation (Escape + body-scroll lock are handled by ModalShell)
  useEffect(() => {
    const len = images.length;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && len > 1) goTo((imgIdx + 1) % len);
      if (e.key === "ArrowLeft" && len > 1) goTo((imgIdx - 1 + len) % len);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [images.length, imgIdx, goTo]);

  // Scroll indicator
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    setHasScrolled(false);
    setIsScrollable(el.scrollHeight > el.clientHeight + 10);

    const onScroll = () => {
      setHasScrolled(true);
      el.removeEventListener("scroll", onScroll);
    };

    const ro = new ResizeObserver(() => {
      setIsScrollable(el.scrollHeight > el.clientHeight + 10);
    });
    ro.observe(el);

    el.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, [project.id, imgIdx]);

  return (
    <>
      <ModalShell onClose={onClose} maxWidthClassName="sm:max-w-2xl">
        {/* ── Scrollable body ── */}
        <div ref={scrollRef} className="overflow-y-auto flex flex-col">
          {/* Image gallery */}
          {images.length > 0 && (
            <div className="relative w-full max-h-[55vh] aspect-video bg-black/40 shrink-0 select-none">
              {isVideo(images[imgIdx].src) ? (
                <div
                  className="absolute inset-0 cursor-pointer group/video"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxOpen(true);
                  }}
                >
                  <video
                    src={`${images[imgIdx].src}#t=0.1`}
                    className={`w-full h-full object-cover transition-opacity duration-150 ${
                      imgLoading ? "opacity-40" : "opacity-100"
                    }`}
                    loop
                    playsInline
                    preload="auto"
                    onCanPlay={() => setImgLoading(false)}
                    onError={() => setImgLoading(false)}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-black/50 flex items-center justify-center group-hover/video:bg-primary transition-colors duration-300">
                      <svg
                        className="w-7 h-7 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              ) : (
                <img
                  src={images[imgIdx].src}
                  alt={localize(images[imgIdx].caption, language)}
                  className={`w-full h-full object-cover cursor-zoom-in transition-opacity duration-150 ${
                    imgLoading ? "opacity-40" : "opacity-100"
                  }`}
                  decoding="async"
                  onLoad={() => setImgLoading(false)}
                  onError={() => setImgLoading(false)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxOpen(true);
                  }}
                />
              )}
              {/* Loading spinner overlay */}
              {imgLoading && !isVideo(images[imgIdx].src) && <SpinnerOverlay />}
              {/* Caption */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3">
                <p className="text-white text-xs line-clamp-1">
                  {localize(images[imgIdx].caption, language)}
                </p>
              </div>
              {/* Prev / Next */}
              {images.length > 1 && (
                <>
                  <IconCircleButton
                    variant="galleryNav"
                    className="absolute left-2 top-1/2 -translate-y-1/2"
                    onClick={() =>
                      goTo((imgIdx - 1 + images.length) % images.length)
                    }
                    disabled={imgLoading}
                  >
                    ‹
                  </IconCircleButton>
                  <IconCircleButton
                    variant="galleryNav"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => goTo((imgIdx + 1) % images.length)}
                    disabled={imgLoading}
                  >
                    ›
                  </IconCircleButton>
                </>
              )}
            </div>
          )}
          {images.length > 1 && (
            <div className="flex flex-wrap justify-center gap-1.5 pt-3 px-6 max-w-full">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  disabled={imgLoading}
                  className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-150 hover:scale-150 active:scale-125 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                    i === imgIdx
                      ? "bg-primary"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
                  }`}
                />
              ))}
            </div>
          )}
          <div className="px-6 pb-6 pt-2 sm:px-8 sm:pb-8 flex flex-col gap-4">
            <div className="flex items-center justify-between mt-1">
              <h2 className="text-2xl sm:text-3xl font-bold">
                {project.title}
              </h2>
              <div className="flex items-center gap-2 shrink-0">
                <Badge variant="outline" className="rounded-full text-xs">
                  {project.year}
                </Badge>
              </div>
            </div>

            <p className="text-foreground/70 font-bold">
              {localize(project.shortDescription, language)}
            </p>

            <div>
              <h3 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-primary" />{" "}
                {t("projects.technologies", language)}
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="rounded-full"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2 pb-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shine-sweep shine-sweep-tint flex items-center gap-2 text-sm border border-border px-4 py-2 rounded-full hover:border-primary hover:text-primary transition-colors dark:bg-secondary/60"
                >
                  <Github className="w-4 h-4" />{" "}
                  {t("projects.github", language)}
                </a>
              )}
              {project.githubMobileUrl && (
                <a
                  href={project.githubMobileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shine-sweep shine-sweep-tint flex items-center gap-2 text-sm border border-border px-4 py-2 rounded-full hover:border-primary hover:text-primary transition-colors dark:bg-secondary/60"
                >
                  <Github className="w-4 h-4" />{" "}
                  {t("projects.githubMobile", language)}
                </a>
              )}
              {project.docs &&
                project.docs.length > 0 &&
                project.docs.map((doc, i) =>
                  doc.icon === "apk" ? (
                    <a
                      key={i}
                      href={`/documentations/${doc.filename}`}
                      download
                      className="shine-sweep shine-sweep-tint flex items-center gap-2 text-sm border border-primary/50 text-primary px-4 py-2 rounded-full hover:border-primary hover:text-primary transition-colors dark:bg-secondary/60"
                    >
                      <Download className="w-4 h-4" />
                      {localize(doc.label, language)}
                      <svg
                        className="w-4 h-4 pointer-events-none"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M17.523 0.976l-1.302 2.252a7.293 7.293 0 0 0-8.442 0L6.477.976a.5.5 0 0 0-.866.5l1.312 2.27A7.271 7.271 0 0 0 4.5 9.5h15a7.271 7.271 0 0 0-2.423-5.754l1.312-2.27a.5.5 0 0 0-.866-.5ZM9 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM2 10.5a1.5 1.5 0 0 0-1.5 1.5v5a1.5 1.5 0 0 0 3 0V12A1.5 1.5 0 0 0 2 10.5Zm20 0a1.5 1.5 0 0 0-1.5 1.5v5a1.5 1.5 0 0 0 3 0V12a1.5 1.5 0 0 0-1.5-1.5ZM4.5 10.5v9A1.5 1.5 0 0 0 6 21v2.5a1.5 1.5 0 0 0 3 0V21h6v2.5a1.5 1.5 0 0 0 3 0V21a1.5 1.5 0 0 0 1.5-1.5v-9Z" />
                      </svg>
                    </a>
                  ) : (
                    <a
                      key={i}
                      href={`/documentations/${doc.filename}`}
                      download
                      className={`shine-sweep shine-sweep-tint flex items-center gap-2 text-sm px-4 py-2 rounded-full transition-colors dark:bg-secondary/60 ${
                        doc.label.en === "All Schemes & Photos"
                          ? "border border-primary/50 text-primary hover:border-primary hover:text-primary"
                          : "border border-border hover:border-primary hover:text-primary"
                      }`}
                    >
                      <Download className="w-4 h-4" />
                      {localize(doc.label, language)}
                      {doc.label.en !== "All Schemes & Photos" && (
                        <>
                          <Languages className="w-4 h-4" />
                          <svg
                            width="18"
                            height="12"
                            viewBox="0 0 18 12"
                            className="rounded-sm shrink-0"
                          >
                            <rect width="18" height="4" y="0" fill="#FFFFFF" />
                            <rect width="18" height="4" y="4" fill="#00966E" />
                            <rect width="18" height="4" y="8" fill="#D62612" />
                          </svg>
                        </>
                      )}
                    </a>
                  )
                )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shine-sweep flex items-center gap-2 text-sm bg-primary text-primary-foreground px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
                >
                  <ExternalLink className="w-4 h-4" />{" "}
                  {t("projects.liveDemo", language)}
                </a>
              )}
            </div>

            <div className="space-y-2">
              {localize(project.fullDescription, language)
                .trim()
                .split("\n")
                .map((line, i) => {
                  const trimmed = line.trim();
                  if (trimmed === "") {
                    return <div key={i} className="h-2" />;
                  }
                  if (trimmed.startsWith("-")) {
                    return (
                      <div
                        key={i}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        <span>
                          {renderFormatted(trimmed.replace(/^-\s*/, ""))}
                        </span>
                      </div>
                    );
                  }
                  if (trimmed.startsWith(">")) {
                    return (
                      <p
                        key={i}
                        className="text-sm text-muted-foreground leading-relaxed pl-3.5"
                      >
                        {renderFormatted(trimmed.replace(/^>\s*/, ""))}
                      </p>
                    );
                  }
                  return (
                    <p
                      key={i}
                      className="text-sm text-muted-foreground leading-relaxed"
                    >
                      {renderFormatted(trimmed)}
                    </p>
                  );
                })}
            </div>
          </div>
        </div>
        {isScrollable && !hasScrolled && (
          <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-card to-transparent pointer-events-none flex items-end justify-center pb-2">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center animate-bounce">
              <ArrowRight className="w-4 h-4 rotate-90 text-foreground" />
            </div>
          </div>
        )}
      </ModalShell>

      {lightboxOpen && images.length > 0 && (
        <Lightbox
          src={images[imgIdx].src}
          isVideo={isVideo(images[imgIdx].src)}
          alt={localize(images[imgIdx].caption, language)}
          caption={localize(images[imgIdx].caption, language)}
          onClose={() => setLightboxOpen(false)}
          scrollable
          onPrev={
            images.length > 1
              ? () => goTo((imgIdx - 1 + images.length) % images.length)
              : undefined
          }
          onNext={
            images.length > 1
              ? () => goTo((imgIdx + 1) % images.length)
              : undefined
          }
          dotsCount={images.length}
          activeIndex={imgIdx}
          onDotClick={goTo}
          navDisabled={imgLoading}
          scrollToZoomLabel={t("projects.scrollToZoom", language)}
          touchToZoomLabel={t("projects.touchToZoom", language)}
          resetZoomLabel={t("projects.resetZoom", language)}
        />
      )}
    </>
  );
}
