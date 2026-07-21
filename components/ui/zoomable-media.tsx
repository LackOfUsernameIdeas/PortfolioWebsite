"use client";

import { SpinnerOverlay } from "@/components/ui/spinner-overlay";

export interface ZoomableMediaProps {
  src: string;
  alt: string;
  caption?: string;
  loading: boolean;
  onLoad: () => void;
  onError?: () => void;
  onExpand?: () => void;
  /** Shown in a centered pill on hover. Omit to skip the hover hint entirely. */
  clickToExpandLabel?: string;
  objectFit?: "contain" | "cover";
  captionClamp?: 1 | 2;
  /** Set false when the caption itself needs to be interactive/clickable. */
  captionPointerEventsNone?: boolean;
}

export function ZoomableMedia({
  src,
  alt,
  caption,
  loading,
  onLoad,
  onError,
  onExpand,
  clickToExpandLabel,
  objectFit = "contain",
  captionClamp = 2,
  captionPointerEventsNone = true
}: ZoomableMediaProps) {
  return (
    <>
      <img
        src={src}
        alt={alt}
        onClick={onExpand}
        className={`w-full h-full object-${objectFit} select-none transition-opacity duration-150 ${
          onExpand ? "cursor-zoom-in" : ""
        } ${loading ? "opacity-40" : "opacity-100"}`}
        decoding="async"
        onLoad={onLoad}
        onError={onError ?? onLoad}
      />

      {loading && <SpinnerOverlay />}

      {clickToExpandLabel && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="bg-black/60 text-white text-base px-6 py-3 rounded-full font-semibold">
            {clickToExpandLabel}
          </div>
        </div>
      )}

      {caption && (
        <div
          className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3 ${
            captionPointerEventsNone ? "pointer-events-none" : ""
          }`}
        >
          <p className={`text-white text-xs line-clamp-${captionClamp}`}>
            {caption}
          </p>
        </div>
      )}
    </>
  );
}
