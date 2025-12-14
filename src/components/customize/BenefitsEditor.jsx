import Button from "../ui/Button.jsx";

export default function BenefitsEditor({ config, setConfig }) {
  const benefits = config.copy.benefits;

  const setBenefits = (patch) => {
    setConfig((p) => ({
      ...p,
      copy: {
        ...p.copy,
        benefits: {
          ...p.copy.benefits,
          ...patch,
        },
      },
    }));
  };

  const setItem = (idx, patch) => {
    const items = Array.isArray(benefits.items) ? [...benefits.items] : [];
    items[idx] = { ...(items[idx] || {}), ...patch };
    setBenefits({ items });
  };

  const addItem = () => {
    const items = Array.isArray(benefits.items) ? [...benefits.items] : [];
    items.push({ title: "Nuevo beneficio", desc: "Descripción del beneficio" });
    setBenefits({ items });
  };

  const removeItem = (idx) => {
    const items = Array.isArray(benefits.items) ? [...benefits.items] : [];
    items.splice(idx, 1);
    setBenefits({ items });
  };

  const moveItem = (idx, dir) => {
    const items = Array.isArray(benefits.items) ? [...benefits.items] : [];
    const j = idx + dir;
    if (j < 0 || j >= items.length) return;
    [items[idx], items[j]] = [items[j], items[idx]];
    setBenefits({ items });
  };

  return (
    <div className="space-y-5">
      <h3 className="text-sm font-semibold">Benefits</h3>

      <Field label="Kicker" value={benefits.kicker} onChange={(v) => setBenefits({ kicker: v })} />
      <Field label="Título" value={benefits.title} onChange={(v) => setBenefits({ title: v })} />
      <TextArea label="Descripción" value={benefits.desc} onChange={(v) => setBenefits({ desc: v })} />

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">Items</div>
          <Button variant="primary" onClick={addItem}>
            + Añadir
          </Button>
        </div>

        {(benefits.items || []).map((it, idx) => (
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
              <Field label="Título" value={it?.title ?? ""} onChange={(v) => setItem(idx, { title: v })} />
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
