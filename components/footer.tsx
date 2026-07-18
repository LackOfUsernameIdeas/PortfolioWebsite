"use client";

import { useLanguage } from "@/lib/i18n/language-context";
import { t } from "@/lib/i18n/ui-translations";

export function Footer() {
  const { language } = useLanguage();
  return (
    <footer className="py-8 px-6 sm:px-12 lg:px-20 border-t border-border bg-card/10">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-md text-muted-foreground">
          {t("footer.text", language)} &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
