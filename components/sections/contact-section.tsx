"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/lib/i18n/language-context";
import { t } from "@/lib/i18n/ui-translations";

export function ContactSection() {
  const { language } = useLanguage();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(false);
    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS is not configured.");
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
          time: new Date().toLocaleString()
        },
        { publicKey }
      );

      setDone(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Failed to send message:", err);
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

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
        <Card className="reveal shadow-xl">
          <CardContent className="p-8">
            {done ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  <Send className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  {t("contact.sentTitle", language)}
                </h3>
                <p className="text-muted-foreground mb-6 text-base">
                  {t("contact.sentSubtitle", language)}
                </p>
                <Button
                  size="lg"
                  className="shine-sweep shine-sweep-tint rounded-full px-8 text-base bg-transparent border border-border font-semibold text-foreground cursor-pointer hover:bg-secondary transition-all duration-300"
                  onClick={() => setDone(false)}
                >
                  {t("contact.sendAnother", language)}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-base">
                      {t("contact.name", language)}
                    </Label>
                    <Input
                      id="name"
                      placeholder={t("contact.namePlaceholder", language)}
                      className="rounded-xl text-base"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-base">
                      {t("contact.email", language)}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t("contact.emailPlaceholder", language)}
                      className="rounded-xl text-base"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="subject" className="text-base">
                    {t("contact.subject", language)}
                  </Label>
                  <Input
                    id="subject"
                    placeholder={t("contact.subjectPlaceholder", language)}
                    className="rounded-xl text-base"
                    value={form.subject}
                    onChange={(e) =>
                      setForm({ ...form, subject: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="message" className="text-base">
                    {t("contact.message", language)}
                  </Label>
                  <Textarea
                    id="message"
                    placeholder={t("contact.messagePlaceholder", language)}
                    rows={5}
                    className="rounded-xl resize-none text-base"
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    required
                  />
                </div>
                {error && (
                  <p className="text-sm text-destructive text-center">
                    {t("contact.error", language)}
                  </p>
                )}
                <Button
                  type="submit"
                  size="lg"
                  className="shine-sweep w-full rounded-full text-base cursor-pointer"
                  disabled={submitting}
                >
                  {submitting ? (
                    t("contact.sending", language)
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      {t("contact.sendMessage", language)}
                    </>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
