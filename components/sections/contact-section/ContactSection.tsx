"use client";

import { useLanguage } from "@/lib/i18n/language-context";
import { t } from "@/lib/i18n/ui-translations";
import { ContactForm } from "./ContactForm";

export function ContactSection() {
  const { language } = useLanguage();

  return (
    <section
      id="contact"
      className="py-24 px-6 sm:px-12 lg:px-20 bg-card/40 relative overflow-hidden"
    >
      <div
        className="blob absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.06]"
        style={{ background: "#FF001A", animationDelay: "2s" }}
      />
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="reveal text-center mb-14">
          <h2 className="text-4xl sm:text-6xl font-bold">
            {t("contact.headingLine1", language)}
            <br />
            <span className="text-primary">
              {t("contact.headingLine2", language)}
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("contact.subtitle", language)}
          </p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
