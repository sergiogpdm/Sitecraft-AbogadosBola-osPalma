export default function PhotoStripSection({ data, preview }) {
  if (!data?.enabled && !preview) return null;

  const photos = Array.isArray(data?.photos) ? data.photos : [];

  return (
    <section className="py-10">
      <div className="mx-auto max-w-6xl px-6">
        {(data.kicker || data.title) ? (
          <div className="mb-5">
            {data.kicker ? (
              <div className="text-xs font-semibold tracking-wide text-[var(--muted)]">
                {data.kicker}
              </div>
            ) : null}
            {data.title ? (
              <div className="mt-1 text-2xl font-semibold">{data.title}</div>
            ) : null}
          </div>
        ) : null}

        <div className="grid gap-3 md:grid-cols-12">
          {photos.slice(0, 5).map((src, i) => (
            <div
              key={i}
              className={[
                "overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)]",
                i === 0 ? "md:col-span-5" : i === 1 ? "md:col-span-4" : "md:col-span-3",
              ].join(" ")}
              style={{ aspectRatio: i === 0 ? "16/10" : "1/1" }}
            >
              {/* si src es vacío, muestra placeholder */}
              {src ? (
                <img
                  src={src}
                  alt={`photo-${i + 1}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm text-[var(--muted)]">
                  Foto {i + 1}
                </div>
              )}
            </div>
          ))}
        </div>

        {data.note ? (
          <div className="mt-5 text-sm text-[var(--muted)]">{data.note}</div>
        ) : null}
      </div>
    </section>
  );
}
