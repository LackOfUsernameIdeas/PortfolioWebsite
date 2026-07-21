"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { X } from "lucide-react";
import { IconCircleButton } from "@/components/ui/icon-circle-button";
import { SpinnerOverlay } from "@/components/ui/spinner-overlay";
import { useZoomPanDrag } from "@/hooks/use-zoom-pan-drag";

export interface LightboxProps {
  src: string;
  isVideo?: boolean;
  alt: string;
  caption?: string;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  dotsCount?: number;
  activeIndex?: number;
  onDotClick?: (index: number) => void;
  navDisabled?: boolean;
  scrollable?: boolean;
  scrollToZoomLabel: string;
  touchToZoomLabel: string;
  resetZoomLabel: string;
}

export function Lightbox({
  src,
  isVideo = false,
  alt,
  caption,
  onClose,
  onPrev,
  onNext,
  dotsCount,
  activeIndex,
  onDotClick,
  navDisabled = false,
  scrollable = false,
  scrollToZoomLabel,
  touchToZoomLabel,
  resetZoomLabel
}: LightboxProps) {
  const [loading, setLoading] = useState(true);
  const {
    zoom,
    pan,
    dragging,
    resetZoom,
    wheelRef,
    handleMouseDown,
    handleMouseMove,
    stopDragging,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  } = useZoomPanDrag();

  const closeBtnWrapperRef = useRef<HTMLDivElement>(null);
  const contentAreaRef = useRef<HTMLDivElement>(null);
  const imageBoxRef = useRef<HTMLDivElement>(null);
  const imgElRef = useRef<HTMLImageElement>(null);
  const videoElRef = useRef<HTMLVideoElement>(null);
  const [pushDown, setPushDown] = useState(0);
  const pushDownRef = useRef(0);

  const getVisibleMediaRect = useCallback(() => {
    if (isVideo) {
      const el = videoElRef.current;
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      return {
        top: rect.top - pushDownRef.current,
        left: rect.left,
        right: rect.right,
        bottom: rect.bottom - pushDownRef.current
      };
    }

    const box = imageBoxRef.current;
    const img = imgElRef.current;
    if (!box || !img || !img.naturalWidth || !img.naturalHeight) return null;

    const boxRect = box.getBoundingClientRect();
    const boxTop = boxRect.top - pushDownRef.current;
    const containerRatio = boxRect.width / boxRect.height;
    const mediaRatio = img.naturalWidth / img.naturalHeight;

    let width: number, height: number;
    if (mediaRatio > containerRatio) {
      width = boxRect.width;
      height = width / mediaRatio;
    } else {
      height = boxRect.height;
      width = height * mediaRatio;
    }

    const left = boxRect.left + (boxRect.width - width) / 2;
    const top = boxTop + (boxRect.height - height) / 2;
    return { top, left, right: left + width, bottom: top + height };
  }, [isVideo]);

  const recalcOverlap = useCallback(() => {
    const btn = closeBtnWrapperRef.current;
    const mediaRect = getVisibleMediaRect();
    if (!btn || !mediaRect) return;

    const btnRect = btn.getBoundingClientRect();
    const gap = 12; // breathing room below the button
    const requiredTop = btnRect.bottom + gap;

    const horizontalOverlap =
      mediaRect.right > btnRect.left && mediaRect.left < btnRect.right;

    const needed =
      horizontalOverlap && mediaRect.top < requiredTop
        ? Math.ceil(requiredTop - mediaRect.top)
        : 0;

    if (needed !== pushDownRef.current) {
      pushDownRef.current = needed;
      setPushDown(needed);
    }
  }, [getVisibleMediaRect]);

  // Reset loading + zoom/pan + push whenever the displayed media changes
  useEffect(() => {
    setLoading(true);
    resetZoom();
    pushDownRef.current = 0;
    setPushDown(0);

    if (isVideo) return;

    const img = imgElRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setLoading(false);
      requestAnimationFrame(recalcOverlap);
    }

    const timeoutId = window.setTimeout(() => {
      setLoading(false);
      recalcOverlap();
    }, 150);

    return () => window.clearTimeout(timeoutId);
  }, [src, isVideo, resetZoom, recalcOverlap]);

  useEffect(() => {
    const target: VisualViewport | Window = window.visualViewport ?? window;
    target.addEventListener("resize", recalcOverlap);
    return () => target.removeEventListener("resize", recalcOverlap);
  }, [recalcOverlap]);

  const showNav = !!dotsCount && dotsCount > 1;

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col lg:items-center lg:justify-center bg-black/90 backdrop-blur-sm lg:py-4${scrollable ? " overflow-y-auto" : ""}`}
    >
      <div ref={closeBtnWrapperRef} className="absolute top-4 right-4 z-10">
        <IconCircleButton variant="lightboxClose" onClick={onClose}>
          <X className="w-6 h-6" />
        </IconCircleButton>
      </div>

      <div
        ref={contentAreaRef}
        className="relative flex-1 min-h-[45vh] lg:min-h-0 flex items-center justify-center w-full px-4 py-4 overflow-hidden"
        style={{ marginTop: pushDown }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {showNav && onPrev && (
            <div className="hidden lg:block">
              <IconCircleButton
                variant="lightboxNav"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10"
                onClick={onPrev}
                disabled={navDisabled}
              >
                ‹
              </IconCircleButton>
            </div>
          )}

          {isVideo ? (
            <video
              ref={videoElRef}
              src={isVideo ? `${src}#t=0.1` : src}
              className="max-w-[85vw] max-h-full lg:max-h-[80vh] rounded-lg shadow-2xl"
              controls
              autoPlay
              loop
              playsInline
              preload="auto"
              onCanPlay={() => {
                setLoading(false);
                requestAnimationFrame(recalcOverlap);
              }}
            />
          ) : (
            <div
              ref={(el) => {
                imageBoxRef.current = el;
                wheelRef(el);
              }}
              className="relative overflow-hidden h-full max-h-full lg:max-h-[80vh]"
              style={{
                width: "85vw",
                maxWidth: "1200px",
                cursor: zoom > 1 ? (dragging ? "grabbing" : "grab") : "default",
                touchAction: zoom > 1 ? "none" : "pan-y"
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={stopDragging}
              onMouseLeave={stopDragging}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchEnd}
            >
              <img
                ref={imgElRef}
                src={src}
                alt={alt}
                className={`w-full h-full object-contain select-none transition-opacity duration-150 ${loading ? "opacity-40" : "opacity-100"}`}
                style={{
                  transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                  transformOrigin: "center",
                  transition: dragging ? "none" : "transform 0.1s"
                }}
                decoding="async"
                onLoad={() => {
                  setLoading(false);
                  requestAnimationFrame(recalcOverlap);
                }}
                onError={() => setLoading(false)}
                draggable={false}
              />
            </div>
          )}

          {showNav && onNext && (
            <div className="hidden lg:block">
              <IconCircleButton
                variant="lightboxNav"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10"
                onClick={onNext}
                disabled={navDisabled}
              >
                ›
              </IconCircleButton>
            </div>
          )}
        </div>

        {loading && !isVideo && <SpinnerOverlay variant="dark" />}
      </div>

      {showNav && (
        <div className="flex lg:hidden items-center justify-center gap-6 pb-1 shrink-0">
          <button
            onClick={() => onPrev?.()}
            disabled={navDisabled}
            className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white text-3xl hover:bg-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            ‹
          </button>
          <button
            onClick={() => onNext?.()}
            disabled={navDisabled}
            className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white text-3xl hover:bg-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            ›
          </button>
        </div>
      )}

      <div className="flex flex-col items-center gap-3 pt-2 pb-4 px-6 shrink-0 mx-auto max-w-[85vw]">
        {!isVideo && (
          <div className="flex items-center gap-3">
            <span className="text-white/50 text-sm hidden sm:inline">
              {scrollToZoomLabel}
            </span>
            <span className="text-white/50 text-sm sm:hidden">
              {touchToZoomLabel}
            </span>
            {zoom > 1 && (
              <button
                onClick={resetZoom}
                className="text-sm text-white/70 border border-white/20 px-2 py-0.5 cursor-pointer rounded-full hover:border-white/50 transition-colors"
              >
                {resetZoomLabel}
              </button>
            )}
          </div>
        )}
        {showNav && (
          <div className="flex flex-wrap justify-center gap-1.5 max-w-full">
            {Array.from({ length: dotsCount! }).map((_, i) => (
              <button
                key={i}
                onClick={() => onDotClick?.(i)}
                disabled={navDisabled}
                className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-150 hover:scale-150 active:scale-125 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                  i === activeIndex
                    ? "bg-primary"
                    : "bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        )}
        {caption && (
          <p className="text-white/70 text-sm text-center leading-relaxed">
            {caption}
          </p>
        )}
      </div>
    </div>
  );
}
