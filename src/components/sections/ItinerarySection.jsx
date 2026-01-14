export default function ItinerarySection({ data, preview }) {
  if (!data?.enabled && !preview) return null;

  return (
    <section className="py-16">
      <div className="mx-auto max-w-5xl">
        {data.kicker ? (
          <div className="text-xs font-semibold tracking-wide text-[var(--muted)]">
            {data.kicker}
          </div>
        ) : null}

        <div className="mt-2 text-3xl font-semibold">{data.title}</div>
        {data.desc ? (
          <p className="mt-2 text-sm text-[var(--muted)]">{data.desc}</p>
        ) : null}

        <div className="mt-8 space-y-3">
          {(data.items || []).map((item, idx) => (
            <div
              key={idx}
              className="flex gap-4 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-5"
            >
              <div className="min-w-[90px]">
                <div className="text-lg font-bold">{item.time}</div>
                {item.tag ? (
                  <div className="mt-1 inline-flex rounded-full border border-[var(--border)] px-2 py-1 text-[11px] font-semibold text-[var(--muted)]">
                    {item.tag}
                  </div>
                ) : null}
              </div>

              <div className="flex-1">
                <div className="text-base font-semibold">{item.title}</div>
                {item.desc ? (
                  <p className="mt-1 text-sm text-[var(--muted)]">{item.desc}</p>
                ) : null}
                {item.location ? (
                  <div className="mt-2 text-sm">
                    <span className="font-semibold">Lugar:</span>{" "}
                    <span className="text-[var(--muted)]">{item.location}</span>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
