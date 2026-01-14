import Button from "../ui/Button.jsx";

export default function ItineraryEditor({ config, setConfig }) {
  const data = config.copy.itinerary;

  const setField = (key, value) => {
    setConfig((p) => ({
      ...p,
      copy: { ...p.copy, itinerary: { ...p.copy.itinerary, [key]: value } },
    }));
  };

  const updateItem = (idx, patch) => {
    setConfig((p) => {
      const items = [...(p.copy.itinerary.items || [])];
      items[idx] = { ...items[idx], ...patch };
      return { ...p, copy: { ...p.copy, itinerary: { ...p.copy.itinerary, items } } };
    });
  };

  const addItem = () => {
    setConfig((p) => {
      const items = [...(p.copy.itinerary.items || [])];
      items.push({ time: "12:30", title: "Ceremonia", desc: "", location: "", tag: "" });
      return { ...p, copy: { ...p.copy, itinerary: { ...p.copy.itinerary, items } } };
    });
  };

  const removeItem = (idx) => {
    setConfig((p) => {
      const items = [...(p.copy.itinerary.items || [])].filter((_, i) => i !== idx);
      return { ...p, copy: { ...p.copy, itinerary: { ...p.copy.itinerary, items } } };
    });
  };

  const move = (idx, dir) => {
    setConfig((p) => {
      const items = [...(p.copy.itinerary.items || [])];
      const j = idx + dir;
      if (j < 0 || j >= items.length) return p;
      [items[idx], items[j]] = [items[j], items[idx]];
      return { ...p, copy: { ...p.copy, itinerary: { ...p.copy.itinerary, items } } };
    });
  };

  return (
    <div className="space-y-5">
      <Toggle
        label="Enabled"
        checked={!!data.enabled}
        onChange={(v) => setField("enabled", v)}
      />

      <Field label="Kicker" value={data.kicker || ""} onChange={(v) => setField("kicker", v)} />
      <Field label="Title" value={data.title || ""} onChange={(v) => setField("title", v)} />
      <Field label="Desc" value={data.desc || ""} onChange={(v) => setField("desc", v)} />

      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold">Items</div>
        <Button variant="default" className="px-3 py-2" onClick={addItem}>
          + Añadir
        </Button>
      </div>

      <div className="space-y-4">
        {(data.items || []).map((it, idx) => (
          <div
            key={idx}
            className="rounded-3xl border border-[var(--border)] bg-[var(--bg)] p-4 space-y-3"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="text-sm font-semibold">Bloque #{idx + 1}</div>
              <div className="flex gap-2">
                <Button className="px-3 py-2" onClick={() => move(idx, -1)}>↑</Button>
                <Button className="px-3 py-2" onClick={() => move(idx, +1)}>↓</Button>
                <Button className="px-3 py-2" onClick={() => removeItem(idx)}>🗑</Button>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <Field label="Hora" value={it.time || ""} onChange={(v) => updateItem(idx, { time: v })} />
              <Field label="Tag (opcional)" value={it.tag || ""} onChange={(v) => updateItem(idx, { tag: v })} />
            </div>

            <Field label="Título" value={it.title || ""} onChange={(v) => updateItem(idx, { title: v })} />
            <Field label="Descripción (opcional)" value={it.desc || ""} onChange={(v) => updateItem(idx, { desc: v })} />
            <Field label="Lugar (opcional)" value={it.location || ""} onChange={(v) => updateItem(idx, { location: v })} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({ label, value, onChange }) {
  return (
    <label className="block space-y-1">
      <div className="text-xs font-semibold text-[var(--muted)]">{label}</div>
      <input
        className="w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm outline-none"
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
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
    </label>
  );
}
