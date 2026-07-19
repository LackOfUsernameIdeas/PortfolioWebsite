export function SpinnerOverlay({
  variant = "light"
}: {
  variant?: "light" | "dark";
}) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div
        className={
          variant === "light"
            ? "w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin"
            : "w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin"
        }
      />
    </div>
  );
}
