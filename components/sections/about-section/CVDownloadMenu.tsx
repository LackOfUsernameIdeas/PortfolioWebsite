"use client";

import { ChevronDown, Download } from "lucide-react";
import { UKFlag, BulgariaFlag } from "@/components/language-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/lib/i18n/language-context";
import { t } from "@/lib/i18n/ui-translations";

export function CVDownloadMenu() {
  const { language } = useLanguage();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          size="lg"
          className="shine-sweep group rounded-full px-7 py-5 text-base leading-none cursor-pointer"
        >
          <Download className="h-4 w-4 mr-2" />{" "}
          {t("about.downloadCV", language)}
          <ChevronDown className="h-4 w-4 ml-2 transition-transform duration-150 group-data-[state=open]:rotate-180" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="min-w-56 bg-card border border-border rounded-2xl shadow-lg p-2"
      >
        <DropdownMenuItem
          asChild
          className="cursor-pointer rounded-full px-4 py-2.5 text-sm font-medium transition-colors focus:bg-secondary focus:text-primary data-[highlighted]:bg-secondary data-[highlighted]:text-primary"
        >
          <a href="/CV/Kaloyan_Kostadinov_CV.pdf" download>
            <span className="w-4 h-4 rounded-full overflow-hidden shrink-0">
              <UKFlag />
            </span>
            {t("about.downloadCVEnglish", language)}
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="cursor-pointer rounded-full px-4 py-2.5 text-sm font-medium transition-colors focus:bg-secondary focus:text-primary data-[highlighted]:bg-secondary data-[highlighted]:text-primary"
        >
          <a href="/CV/Kaloyan_Kostadinov_CV_BG.pdf" download>
            <span className="w-4 h-4 rounded-full overflow-hidden shrink-0">
              <BulgariaFlag />
            </span>
            {t("about.downloadCVBulgarian", language)}
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
