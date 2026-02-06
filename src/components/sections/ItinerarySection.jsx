export default function ItinerarySection({ data, preview }) {
  if (!data?.enabled && !preview) return null;

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-0">
        {data.kicker ? (
          <div className="text-xs font-semibold tracking-wide text-[var(--muted)]">
            {data.kicker}
          </div>
        ) : null}

        <div className="mt-2 text-2xl sm:text-3xl font-semibold">{data.title}</div>

        {data.desc ? (
          <p className="mt-2 text-sm sm:text-base text-[var(--muted)] max-w-prose">
            {data.desc}
          </p>
        ) : null}

        <div className="mt-6 sm:mt-8 space-y-4">
          {(data.items || []).map((item, idx) => (
            <div
              key={idx}
              className={[
                // 🔧 Quitamos overflow-hidden para que no “corte” el texto
                "group relative rounded-3xl border border-[var(--border)] bg-[var(--card)] p-4 sm:p-5",
                "transition-all duration-200",
                "hover:-translate-y-[1px] hover:shadow-[0_var(--shadowY)_var(--shadowBlur)_rgba(0,0,0,var(--shadowOpacity))]",
              ].join(" ")}
            >
              {/* Acento lateral */}
              <div
                className="absolute left-0 top-0 h-full w-[4px] opacity-70"
                style={{
                  background:
                    "linear-gradient(180deg, var(--heroAccentA, var(--accentA)), var(--heroAccentB, var(--accentB)))",
                }}
                aria-hidden="true"
              />

              <div className="flex items-start gap-4">
                {/* Número tipo sello */}
                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-white/70 text-sm font-extrabold text-[var(--accentA)] backdrop-blur">
                  {item.time}
                  <div
                    className="absolute -inset-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      boxShadow: "0 0 0 3px rgba(177,18,38,0.12)",
                    }}
                    aria-hidden="true"
                  />
                </div>

                {/* Contenido */}
                {/* 🔧 w-full + min-w-0 para que el texto calcule bien el ancho en flex */}
                <div className="min-w-0 w-full flex-1 pr-1">
                  <div className="flex items-start gap-2">
                    {item.icon ? (
                      <span className="mt-[2px] inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-white/60 text-base">
                        {item.icon}
                      </span>
                    ) : null}

                    {/* 🔧 En vez de truncate, permitimos wrap (2 líneas en móvil) */}
                    <div className="min-w-0">
                      <div className="text-base font-semibold leading-snug break-words">
                        <span className="block sm:line-clamp-2">
                          {item.title}
                        </span>
                      </div>

                      {item.desc ? (
                        <p className="mt-1 text-sm text-[var(--muted)] leading-relaxed break-words">
                          {item.desc}
                        </p>
                      ) : null}

                      {item.location ? (
                        <div className="mt-2 text-sm flex flex-wrap gap-x-1">
                          <span className="font-semibold">Lugar:</span>
                          <span className="text-[var(--muted)] break-words">
                            {item.location}
                          </span>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
