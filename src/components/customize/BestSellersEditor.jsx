import Button from "../ui/Button.jsx";

export default function BestSellersEditor({ config, setConfig }) {
  const best = config.copy.bestSellers;

  const setBest = (patch) => {
    setConfig((p) => ({
      ...p,
      copy: {
        ...p.copy,
        bestSellers: {
          ...p.copy.bestSellers,
          ...patch,
        },
      },
    }));
  };

  const setItem = (idx, patch) => {
    const items = Array.isArray(best.items) ? [...best.items] : [];
    items[idx] = { ...(items[idx] || {}), ...patch };
    setBest({ items });
  };

  const addItem = () => {
    const items = Array.isArray(best.items) ? [...best.items] : [];
    items.push({ name: "Nuevo producto", price: "—", desc: "Descripción" });
    setBest({ items });
  };

  const removeItem = (idx) => {
    const items = Array.isArray(best.items) ? [...best.items] : [];
    items.splice(idx, 1);
    setBest({ items });
  };

  const moveItem = (idx, dir) => {
    const items = Array.isArray(best.items) ? [...best.items] : [];
    const j = idx + dir;
    if (j < 0 || j >= items.length) return;
    [items[idx], items[j]] = [items[j], items[idx]];
    setBest({ items });
  };

  return (
    <div className="space-y-5">
      <h3 className="text-sm font-semibold">Best Sellers</h3>

      <Field label="Kicker" value={best.kicker} onChange={(v) => setBest({ kicker: v })} />
      <Field label="Título" value={best.title} onChange={(v) => setBest({ title: v })} />
      <TextArea label="Descripción" value={best.desc} onChange={(v) => setBest({ desc: v })} />
      <Field label="Texto CTA" value={best.cta} onChange={(v) => setBest({ cta: v })} />

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">Items</div>
          <Button variant="primary" onClick={addItem}>
            + Añadir
          </Button>
        </div>

        {(best.items || []).map((it, idx) => (
          <div key={idx} className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-3">
            <div className="flex items-center justify-between gap-2">
              <div className="text-xs text-[var(--muted)]">Item #{idx + 1}</div>
              <div className="flex gap-2">
                <Button variant="default" className="px-3 py-2" onClick={() => moveItem(idx, -1)}>↑</Button>
                <Button variant="default" className="px-3 py-2" onClick={() => moveItem(idx, +1)}>↓</Button>
                <Button variant="default" className="px-3 py-2" onClick={() => removeItem(idx)}>✕</Button>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-3">
              <Field label="Nombre" value={it?.name ?? ""} onChange={(v) => setItem(idx, { name: v })} />

              <div className="grid grid-cols-2 gap-3">
                <Field label="Precio" value={it?.price ?? ""} onChange={(v) => setItem(idx, { price: v })} />
                <Field label="Badge/extra (opcional)" value={it?.badge ?? ""} onChange={(v) => setItem(idx, { badge: v })} />
              </div>

              <TextAreaSmall label="Descripción" value={it?.desc ?? ""} onChange={(v) => setItem(idx, { desc: v })} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({ label, value, onChange }) {
  return (
    <label className="block">
      <div className="text-xs text-zinc-400">{label}</div>
      <input
        className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--text)] outline-none"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function TextArea({ label, value, onChange }) {
  return (
    <label className="block">
      <div className="text-xs text-zinc-400">{label}</div>
      <textarea
        className="mt-2 h-24 w-full resize-none rounded-2xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--text)] outline-none"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function TextAreaSmall({ label, value, onChange }) {
  return (
    <label className="block">
      <div className="text-xs text-zinc-400">{label}</div>
      <textarea
        className="mt-2 h-20 w-full resize-none rounded-2xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--text)] outline-none"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
