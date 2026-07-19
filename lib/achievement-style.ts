/**
 * Shared "place" -> color mapping used for achievement rank badges/accents.
 * Previously duplicated between the achievements grid card and the
 * achievement detail modal.
 */
export function getPlaceColor(place: string | undefined): string {
  return place === "1st"
    ? "text-yellow-500"
    : place === "2nd"
      ? "text-slate-400"
      : "text-primary";
}
