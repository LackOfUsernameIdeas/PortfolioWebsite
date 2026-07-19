import type { ReactNode } from "react";

const CODE_CLASS =
  "inline-block bg-primary/10 text-primary border border-primary/20 rounded-md px-2 py-0.5 mx-0.5 text-[0.85em] dark:bg-primary/15 dark:text-foreground dark:border-primary/30 dark:font-medium";

/** Renders `text` spans only - used for content already inside a **bold** span */
function renderInline(text: string, keyPrefix: string): ReactNode[] {
  return text.split(/(`.+?`)/g).map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={`${keyPrefix}-${i}`} className={CODE_CLASS}>
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

/** Splits on **bold** and `text` simultaneously, keeping the delimiters */
export function renderFormatted(text: string): ReactNode[] {
  const parts = text.split(/(\*\*.+?\*\*|`.+?`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      const inner = part.slice(2, -2);
      return (
        <strong key={i} className="text-foreground font-semibold">
          {renderInline(inner, `b${i}`)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className={CODE_CLASS}>
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}
