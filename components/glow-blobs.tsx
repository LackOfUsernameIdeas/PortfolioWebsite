interface GlowBlobsProps {
  /** Position classes for the larger, top blob. Varies slightly between sections. */
  primaryPositionClassName?: string;
}

export function GlowBlobs({
  primaryPositionClassName = "-top-32 -right-32"
}: GlowBlobsProps) {
  return (
    <>
      <div
        className={`blob absolute ${primaryPositionClassName} w-[600px] h-[600px] rounded-full opacity-[0.12]`}
        style={{ background: "#FF001A" }}
      />
      <div
        className="blob absolute bottom-0 -left-40 w-[400px] h-[400px] rounded-full opacity-[0.06]"
        style={{ background: "#FF001A", animationDelay: "4s" }}
      />
    </>
  );
}
