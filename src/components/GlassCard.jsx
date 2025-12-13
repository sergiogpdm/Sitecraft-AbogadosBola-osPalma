export default function GlassCard({ className = "", children }) {
  return (
    <div
      style={{
        borderRadius: "var(--radius)",
        backdropFilter: `blur(var(--cardBlur))`,
        WebkitBackdropFilter: `blur(var(--cardBlur))`,
        boxShadow: `0 var(--shadowY) var(--shadowBlur) rgba(0,0,0,var(--shadowOpacity))`,
      }}
      className={[
        "border bg-[var(--card)] border-[var(--border)]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
