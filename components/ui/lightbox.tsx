"use client";

import { useEffect, useState } from "react";
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
  resetZoomLabel
}: LightboxProps) {
  const [loading, setLoading] = useState(true);
  const {
    zoom,
    pan,
    dragging,
    resetZoom,
    handleWheel,
    handleMouseDown,
    handleMouseMove,
    stopDragging
  } = useZoomPanDrag();

  // Reset loading + zoom/pan whenever the displayed media changes
  useEffect(() => {
    setLoading(true);
    resetZoom();
  }, [src]);

  const showNav = !!dotsCount && dotsCount > 1;

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm py-4${scrollable ? " overflow-y-auto" : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <IconCircleButton
        variant="lightboxClose"
        className="absolute top-4 right-4"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <X className="w-6 h-6" />
      </IconCircleButton>

      {showNav && onPrev && (
        <IconCircleButton
          variant="lightboxNav"
          className="absolute left-4 top-1/2 -translate-y-1/2"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          disabled={navDisabled}
        >
          ‹
        </IconCircleButton>
      )}

      {isVideo ? (
        <video
          src={src}
          className="max-w-[85vw] max-h-[80vh] rounded-lg shadow-2xl"
          controls
          autoPlay
          loop
          playsInline
          onCanPlay={() => setLoading(false)}
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <div
          className="relative overflow-hidden"
          style={{
            width: "85vw",
            maxWidth: "1200px",
            maxHeight: "80vh",
            cursor: zoom > 1 ? (dragging ? "grabbing" : "grab") : "default"
          }}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={stopDragging}
          onMouseLeave={stopDragging}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={src}
            alt={alt}
            className={`w-full h-full object-contain select-none transition-opacity duration-150 ${loading ? "opacity-40" : "opacity-100"}`}
            style={{
              transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
              transformOrigin: "center",
              transition: dragging ? "none" : "transform 0.1s"
            }}
            decoding="async"
            onLoad={() => setLoading(false)}
            onError={() => setLoading(false)}
            draggable={false}
          />
        </div>
      )}

      {showNav && onNext && (
        <IconCircleButton
          variant="lightboxNav"
          className="absolute right-4 top-1/2 -translate-y-1/2"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          disabled={navDisabled}
        >
          ›
        </IconCircleButton>
      )}

      {loading && !isVideo && <SpinnerOverlay variant="dark" />}

      <div className="flex flex-col items-center gap-3 mt-4 px-6 max-w-[85vw]">
        {!isVideo && (
          <div className="flex items-center gap-3">
            <span className="text-white/50 text-sm">{scrollToZoomLabel}</span>
            {zoom > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  resetZoom();
                }}
                className="text-sm text-white/70 border border-white/20 px-2 py-0.5 cursor-pointer rounded-full hover:border-white/50 transition-colors"
              >
                {resetZoomLabel}
              </button>
            )}
          </div>
        )}
        {showNav && (
          <div className="flex gap-1.5">
            {Array.from({ length: dotsCount! }).map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  onDotClick?.(i);
                }}
                disabled={navDisabled}
                className={`w-2 h-2 rounded-full transition-colors disabled:cursor-not-allowed ${
                  i === activeIndex ? "bg-primary" : "bg-white/40"
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
