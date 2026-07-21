import { type ButtonHTMLAttributes } from "react";

const VARIANTS = {
  modalClose:
    "w-10 h-10 rounded-full bg-secondary flex items-center justify-center cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors",
  lightboxClose:
    "w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer",
  galleryNav:
    "w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white text-2xl hover:bg-primary transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed",
  lightboxNav:
    "w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white text-2xl hover:bg-primary transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
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
