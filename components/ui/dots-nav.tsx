const THEME = {
  // For use over dark/photo backgrounds (e.g. the lightbox overlay)
  overlay: {
    active: "bg-primary",
    inactive: "bg-white/40 hover:bg-white/70"
  },
  // For use over card/light backgrounds (e.g. inside ProjectModal)
  card: {
    active: "bg-primary",
    inactive: "bg-muted-foreground/30 hover:bg-muted-foreground/60"
  }
} as const;

export interface DotsNavProps {
  count: number;
  activeIndex?: number;
  onDotClick?: (index: number) => void;
  disabled?: boolean;
  theme?: keyof typeof THEME;
  className?: string;
}

export function DotsNav({
  count,
  activeIndex,
  onDotClick,
  disabled = false,
  theme = "overlay",
  className = ""
}: DotsNavProps) {
  const colors = THEME[theme];

  return (
    <div className={`flex flex-wrap justify-center gap-1.5 max-w-full ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => onDotClick?.(i)}
          disabled={disabled}
          className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-150 hover:scale-150 active:scale-125 disabled:cursor-not-allowed disabled:hover:scale-100 ${
            i === activeIndex ? colors.active : colors.inactive
          }`}
        />
      ))}
    </div>
  );
}
