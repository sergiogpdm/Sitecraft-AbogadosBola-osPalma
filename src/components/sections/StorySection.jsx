export default function StorySection({ data, preview }) {
  if (!data?.enabled && !preview) return null;

  const items = Array.isArray(data?.items) ? data.items : [];

  return (
    <section className="py-16">
      <div className="mx-auto max-w-5xl px-6">
        {data.kicker ? (
          <div className="text-xs font-semibold tracking-wide text-[var(--muted)]">
            {data.kicker}
          </div>
        ) : null}

        <div className="mt-2 text-3xl font-semibold">{data.title}</div>
        {data.desc ? (
          <p className="mt-2 text-sm text-[var(--muted)]">{data.desc}</p>
        ) : null}

        <div className="mt-10 space-y-5">
          {items.map((it, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6"
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-start">
                {/* Foto opcional */}
                {it.image ? (
                  <div className="w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg)] md:w-[220px]">
                    <img
                      src={it.image}
                      alt={it.title || `story-${idx + 1}`}
                      className="h-[160px] w-full object-cover md:h-[180px]"
                      loading="lazy"
                    />
                  </div>
                ) : null}

                <div className="flex-1">
                  {it.date ? (
                    <div className="text-xs font-semibold text-[var(--muted)]">
                      {it.date}
                    </div>
                  ) : null}
                  <div className="mt-1 text-lg font-semibold">{it.title}</div>
                  {it.text ? (
                    <p className="mt-2 text-sm text-[var(--muted)]">{it.text}</p>
                  ) : null}
                </div>
              </div>
            </div>
          ))}

          {items.length === 0 ? (
            <div className="text-sm text-[var(--muted)]">
              Añade hitos en /customize → Story para ver la línea temporal.
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
