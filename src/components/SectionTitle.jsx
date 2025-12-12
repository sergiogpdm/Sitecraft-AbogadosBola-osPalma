export default function SectionTitle({ kicker, title, desc }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {kicker ? (
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1 text-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accentA)]" />
          <span className="text-zinc-200">{kicker}</span>
        </div>
      ) : null}

      <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">{title}</h2>

      {desc ? <p className="mt-3 text-zinc-300 leading-relaxed">{desc}</p> : null}
    </div>
  );
}
