export default function GlassCard({ className = "", children }) {
  return (
    <div
      style={{ borderRadius: "var(--radius)" }}
      className={[
        "border bg-[var(--card)] backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.45)]",
        "border-[var(--border)]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
