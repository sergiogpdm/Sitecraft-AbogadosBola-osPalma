export default function CountdownEditor({ config, setConfig }) {
  const data = config.copy.countdown;

  const setField = (key, value) => {
    setConfig((p) => ({
      ...p,
      copy: {
        ...p.copy,
        countdown: {
          ...p.copy.countdown,
          [key]: value,
        },
      },
    }));
  };

  return (
    <div className="space-y-4">
      <Toggle
        label="Enabled"
        checked={!!data.enabled}
        onChange={(v) => setField("enabled", v)}
      />

      <Field label="Kicker" value={data.kicker || ""} onChange={(v) => setField("kicker", v)} />
      <Field label="Title" value={data.title || ""} onChange={(v) => setField("title", v)} />
      <Field label="Desc" value={data.desc || ""} onChange={(v) => setField("desc", v)} />

      <Field
        label='Fecha y hora (ISO) — ej: "2026-06-20T18:30:00"'
        value={data.dateTime || ""}
        onChange={(v) => setField("dateTime", v)}
      />

      <Field
        label="Texto debajo (opcional)"
        value={data.dateLabel || ""}
        onChange={(v) => setField("dateLabel", v)}
      />

      <Field
        label="Texto cuando llegue (opcional)"
        value={data.doneText || ""}
        onChange={(v) => setField("doneText", v)}
      />
    </div>
  );
}

function Field({ label, value, onChange }) {
  return (
    <label className="block space-y-1">
      <div className="text-xs font-semibold text-[var(--muted)]">{label}</div>
      <input
        className="w-full rounded-2xl border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <label className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-3">
      <div className="text-sm font-semibold">{label}</div>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
    </label>
  );
}
