"use client";

interface HeroPhotoPanelProps {
  mounted: boolean;
}

export function HeroPhotoPanel({ mounted }: HeroPhotoPanelProps) {
  return (
    <div
      className={`${mounted ? "hero-photo" : "opacity-0"} absolute right-0 top-0 h-full w-[55%] hidden lg:block pointer-events-none`}
    >
      <div
        className="absolute"
        style={{
          top: "49%",
          right: "9%",
          transform: "translateY(-50%)",
          width: "420px",
          height: "750px"
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "12px",
            background:
              "linear-gradient(115deg, transparent 35%, rgba(255,0,26,0.08) 35%, rgba(255,0,26,0.13) 50%, rgba(255,0,26,0.08) 65%, transparent 65%)"
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            borderRadius: "12px"
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "2px",
              height: "160%",
              top: "-30%",
              left: "32%",
              background:
                "linear-gradient(to bottom, transparent, rgba(255,0,26,0.6) 30%, rgba(255,0,26,0.6) 70%, transparent)",
              transform: "rotate(-20deg)",
              transformOrigin: "top center"
            }}
          />
          <div
            style={{
              position: "absolute",
              width: "1px",
              height: "160%",
              top: "-30%",
              left: "55%",
              background:
                "linear-gradient(to bottom, transparent, rgba(255,0,26,0.25) 30%, rgba(255,0,26,0.25) 70%, transparent)",
              transform: "rotate(-20deg)",
              transformOrigin: "top center"
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            top: "10%",
            bottom: "10%",
            left: "-3px",
            width: "3px",
            background:
              "linear-gradient(to bottom, transparent, rgba(255,0,26,0.9) 20%, rgba(255,0,26,0.9) 80%, transparent)",
            borderRadius: "2px"
          }}
        />
      </div>
      <div
        className="glow-halo absolute top-[44%] right-[10%] -translate-y-1/2 w-[70%] h-[75%] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,0,26,0.22) 0%, rgba(255,0,26,0.08) 45%, transparent 70%)",
          filter: "blur(30px)"
        }}
      />
      <img
        src="/hero-photo.png"
        alt="Kaloyan Kostadinov"
        className="absolute top-[44%] right-[3%] -translate-y-1/2 h-[92%] w-auto object-contain"
        decoding="async"
        fetchPriority="high"
      />
    </div>
  );
}
