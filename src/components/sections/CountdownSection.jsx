import { useEffect, useMemo, useState } from "react";

function pad2(n) {
  return String(n).padStart(2, "0");
}

function getDiffParts(targetMs) {
  const now = Date.now();
  const diff = Math.max(0, targetMs - now);

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { diff, days, hours, minutes, seconds };
}

export default function CountdownSection({ data, preview }) {
  if (!data?.enabled && !preview) return null;

  const targetMs = useMemo(() => {
    // Acepta "2026-06-20T18:30:00" o "2026-06-20"
    const d = new Date(data.dateTime || "");
    const ms = d.getTime();
    return Number.isFinite(ms) ? ms : 0;
  }, [data?.dateTime]);

  const [parts, setParts] = useState(() => getDiffParts(targetMs));

  useEffect(() => {
    if (!targetMs) return;
    const id = setInterval(() => setParts(getDiffParts(targetMs)), 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  const isDone = targetMs && parts.diff === 0;

  return (
    <section className="py-16">
      <div className="mx-auto max-w-5xl rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8">
        {data.kicker ? (
          <div className="text-xs font-semibold tracking-wide text-[var(--muted)]">
            {data.kicker}
          </div>
        ) : null}

        <div className="mt-2 text-3xl font-semibold">{data.title}</div>
        {data.desc ? (
          <p className="mt-2 text-sm text-[var(--muted)]">{data.desc}</p>
        ) : null}

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          <Stat label="Días" value={String(parts.days)} />
          <Stat label="Horas" value={pad2(parts.hours)} />
          <Stat label="Min" value={pad2(parts.minutes)} />
          <Stat label="Seg" value={pad2(parts.seconds)} />
        </div>

        <div className="mt-6 text-sm text-[var(--muted)]">
          {isDone ? (data.doneText || "¡Ha llegado el día!") : (data.dateLabel || "")}
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-4 text-center">
      <div className="text-3xl font-bold">{value}</div>
      <div className="mt-1 text-xs font-semibold text-[var(--muted)]">{label}</div>
    </div>
  );
}
