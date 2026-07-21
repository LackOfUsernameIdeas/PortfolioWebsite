import { type ButtonHTMLAttributes } from "react";

const VARIANTS = {
  modalClose:
    "w-11 h-11 rounded-full bg-secondary flex items-center justify-center cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors",
  lightboxClose:
    "w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer",
  galleryNav:
    "w-11 h-11 rounded-full bg-black/50 flex items-center justify-center text-white text-3xl hover:bg-primary transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed",
  lightboxNav:
    "w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white text-3xl hover:bg-primary transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
} as const;

export function IconCircleButton({
  variant,
  className = "",
  ...props
}: {
  variant: keyof typeof VARIANTS;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={`${VARIANTS[variant]} ${className}`} />;
}
