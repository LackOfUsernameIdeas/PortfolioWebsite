"use client";

import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";
import { IconCircleButton } from "@/components/ui/icon-circle-button";

export interface ModalShellProps {
  onClose: () => void;
  onEscape?: () => void;
  maxWidthClassName?: string;
  children: ReactNode;
}

export function ModalShell({
  onClose,
  onEscape,
  maxWidthClassName = "sm:max-w-2xl",
  children
}: ModalShellProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") (onEscape ?? onClose)();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, onEscape]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className={`relative z-10 w-full ${maxWidthClassName} max-h-[85vh] bg-card border border-border rounded-3xl overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1.5 w-full bg-gradient-to-r from-primary to-primary/30 shrink-0" />
        <IconCircleButton
          variant="modalClose"
          className="absolute top-4 right-4 z-10"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </IconCircleButton>
        <div className="flex-1 min-h-0 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
