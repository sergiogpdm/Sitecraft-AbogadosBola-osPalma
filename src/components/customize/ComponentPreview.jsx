import GlassCard from "../GlassCard.jsx";

export default function ComponentPreview({ title = "Preview", children }) {
  return (
    <GlassCard className="p-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-xs text-[var(--muted)]">Vista del componente</div>
      </div>
      <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--border)]">
        {children}
      </div>
    </GlassCard>
  );
}
