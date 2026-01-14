import Button from "../ui/Button.jsx";

export default function StoryEditor({ config, setConfig }) {
  const data = config.copy?.story || {};
  const items = Array.isArray(data.items) ? data.items : [];

  const setField = (key, value) => {
    setConfig((p) => ({
      ...p,
      copy: {
        ...p.copy,
        story: {
          enabled: true,
          kicker: "",
          title: "",
          desc: "",
          items: [],
          ...(p.copy?.story || {}),
          [key]: value,
        },
      },
    }));
  };

  const updateItem = (idx, patch) => {
    setConfig((p) => {
      const cur = p.copy?.story || {};
      const arr = Array.isArray(cur.items) ? [...cur.items] : [];
      arr[idx] = { ...(arr[idx] || {}), ...patch };
      return { ...p, copy: { ...p.copy, story: { ...cur, items: arr } } };
    });
  };

  const addItem = () => {
    setConfig((p) => {
      const cur = p.copy?.story || {};
      const arr = Array.isArray(cur.items) ? [...cur.items] : [];
      arr.push({ date: "2022", title: "Nos conocimos", text: "", image: "" });
      return { ...p, copy: { ...p.copy, story: { ...cur, items: arr } } };
    });
  };

  const removeItem = (idx) => {
    setConfig((p) => {
      const cur = p.copy?.story || {};
      const arr = Array.isArray(cur.items) ? [...cur.items] : [];
      arr.splice(idx, 1);
      return { ...p, copy: { ...p.copy, story: { ...cur, items: arr } } };
    });
  };

  const move = (idx, dir) => {
    setConfig((p) => {
      const cur = p.copy?.story || {};
      const arr = Array.isArray(cur.items) ? [...cur.items] : [];
      const j = idx + dir;
      if (j < 0 || j >= arr.length) return p;
      [arr[idx], arr[j]] = [arr[j], arr[idx]];
      return { ...p, copy: { ...p.copy, story: { ...cur, items: arr } } };
    });
  };

  return (
    <div className="space-y-5">
      <Toggle
        label="Enabled"
        checked={data.enabled !== false}
        onChange={(v) => setField("enabled", v)}
      />

      <Field label="Kicker" value={data.kicker || ""} onChange={(v) => setField("kicker", v)} />
      <Field label="Title" value={data.title || ""} onChange={(v) => setField("title", v)} />
      <Field label="Desc" value={data.desc || ""} onChange={(v) => setField("desc", v)} />

      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold">Hitos</div>
        <Button variant="default" className="px-3 py-2" onClick={addItem}>
          + Añadir
        </Button>
      </div>

      <div className="space-y-4">
        {items.map((it, idx) => (
          <div key={idx} className="rounded-3xl border border-[var(--border)] bg-[var(--bg)] p-4 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="text-sm font-semibold">Hito #{idx + 1}</div>
              <div className="flex gap-2">
                <Button className="px-3 py-2" onClick={() => move(idx, -1)}>↑</Button>
                <Button className="px-3 py-2" onClick={() => move(idx, +1)}>↓</Button>
                <Button className="px-3 py-2" onClick={() => removeItem(idx)}>🗑</Button>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <Field label="Fecha (texto)" value={it.date || ""} onChange={(v) => updateItem(idx, { date: v })} />
              <Field label="Título" value={it.title || ""} onChange={(v) => updateItem(idx, { title: v })} />
            </div>

            <Field label="Texto" value={it.text || ""} onChange={(v) => updateItem(idx, { text: v })} />
            <Field label="Imagen URL (opcional)" value={it.image || ""} onChange={(v) => updateItem(idx, { image: v })} />
          </div>
        ))}

        {items.length === 0 ? (
          <div className="text-sm text-[var(--muted)]">
            Añade 3–4 hitos (nos conocimos, viaje, pedida, gran día).
          </div>
        ) : null}
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
