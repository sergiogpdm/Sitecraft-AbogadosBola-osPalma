export default function HeroBackdrop({ bg }) {
  const style = String(bg?.style || "corners").toLowerCase();
  const patternOn = (bg?.pattern ?? true) !== false;

  const Glow = ({ className, colorVar }) => (
    <div
      className={`absolute rounded-full ${className}`}
      style={{
        background: `var(${colorVar})`,
        filter: `blur(var(--glowBlur, 64px))`,
        opacity: "var(--shadowOpacity, 0.55)",
      }}
    />
  );

  return (
    <div className="absolute inset-0">
      {style === "none" ? null : null}

      {style === "corners" ? (
        <>
          <Glow className="-top-40 -left-40 h-[520px] w-[520px]" colorVar="--glowA" />
          <Glow className="-bottom-40 -right-40 h-[520px] w-[520px]" colorVar="--glowB" />
        </>
      ) : null}

      {style === "center" ? (
        <>
          <Glow className="-top-24 left-1/2 h-[760px] w-[760px] -translate-x-1/2" colorVar="--glowA" />
          <Glow className="top-24 left-1/2 h-[560px] w-[560px] -translate-x-1/2" colorVar="--glowB" />
        </>
      ) : null}

      {style === "top" ? (
        <>
          <Glow className="-top-52 left-1/2 h-[900px] w-[900px] -translate-x-1/2" colorVar="--glowA" />
          <Glow className="-top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2" colorVar="--glowB" />
        </>
      ) : null}

      {style === "diagonal" ? (
        <>
          <Glow className="-top-56 -right-56 h-[720px] w-[720px]" colorVar="--glowA" />
          <Glow className="-bottom-56 -left-56 h-[720px] w-[720px]" colorVar="--glowB" />
        </>
      ) : null}

      {/* ✅ RING */}
      {style === "ring" ? (
        <>
          <div
            className="absolute left-1/2 top-1/2 h-[780px] w-[780px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              backgroundImage: `
                radial-gradient(circle,
                  rgba(0,0,0,0) 42%,
                  var(--glowA) 54%,
                  rgba(0,0,0,0) 72%
                ),
                radial-gradient(circle,
                  rgba(0,0,0,0) 48%,
                  var(--glowB) 58%,
                  rgba(0,0,0,0) 78%
                )
              `,
              filter: `blur(calc(var(--glowBlur, 64px) * 0.55))`,
              opacity: "var(--shadowOpacity, 0.55)",
            }}
          />
          <Glow className="top-[55%] left-1/2 h-[520px] w-[520px] -translate-x-1/2" colorVar="--glowB" />
        </>
      ) : null}

      {/* ✅ BARS */}
      {style === "bars" ? (
        <>
          <div
            className="absolute -left-24 top-[-10%] h-[120%] w-[35vw] rounded-[999px]"
            style={{
              background: `linear-gradient(180deg, var(--glowA), rgba(0,0,0,0))`,
              filter: `blur(calc(var(--glowBlur, 64px) * 0.75))`,
              opacity: "var(--shadowOpacity, 0.55)",
              transform: "rotate(8deg)",
            }}
          />
          <div
            className="absolute -right-24 top-[-10%] h-[120%] w-[35vw] rounded-[999px]"
            style={{
              background: `linear-gradient(0deg, var(--glowB), rgba(0,0,0,0))`,
              filter: `blur(calc(var(--glowBlur, 64px) * 0.75))`,
              opacity: "var(--shadowOpacity, 0.55)",
              transform: "rotate(-8deg)",
            }}
          />
          <Glow className="left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2" colorVar="--glowA" />
        </>
      ) : null}

      {/* fallback */}
      {["none", "corners", "center", "top", "diagonal", "ring", "bars"].includes(style) ? null : (
        <>
          <Glow className="-top-40 -left-40 h-[520px] w-[520px]" colorVar="--glowA" />
          <Glow className="-bottom-40 -right-40 h-[520px] w-[520px]" colorVar="--glowB" />
        </>
      )}

      {(bg?.pattern ?? true) !== false ? (
        <div className="absolute inset-0" style={{ background: "var(--heroPattern)" }} />
      ) : null}
    </div>
  );
}
