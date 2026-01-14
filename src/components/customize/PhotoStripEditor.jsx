import Button from "../ui/Button.jsx";

export default function PhotoStripEditor({ config, setConfig }) {
  const data = config.copy?.photoStrip || {};
  const photos = Array.isArray(data.photos) ? data.photos : [];

  const setField = (key, value) => {
    setConfig((p) => ({
      ...p,
      copy: {
        ...p.copy,
        photoStrip: {
          enabled: true,
          kicker: "",
          title: "",
          note: "",
          photos: [],
          ...(p.copy?.photoStrip || {}),
          [key]: value,
        },
      },
    }));
  };

  const setPhoto = (idx, value) => {
    setConfig((p) => {
      const cur = p.copy?.photoStrip || {};
      const arr = Array.isArray(cur.photos) ? [...cur.photos] : [];
      arr[idx] = value;
      return {
        ...p,
        copy: {
          ...p.copy,
          photoStrip: {
            enabled: true,
            kicker: "",
            title: "",
            note: "",
            photos: [],
            ...cur,
            photos: arr,
          },
        },
      };
    });
  };

  const addPhoto = () => {
    setConfig((p) => {
      const cur = p.copy?.photoStrip || {};
      const arr = Array.isArray(cur.photos) ? [...cur.photos] : [];
      arr.push("");
      return { ...p, copy: { ...p.copy, photoStrip: { ...cur, photos: arr } } };
    });
  };

  const removePhoto = (idx) => {
    setConfig((p) => {
      const cur = p.copy?.photoStrip || {};
      const arr = Array.isArray(cur.photos) ? [...cur.photos] : [];
      arr.splice(idx, 1);
      return { ...p, copy: { ...p.copy, photoStrip: { ...cur, photos: arr } } };
    });
  };

  return (
    <div className="space-y-4">
      <Toggle
        label="Enabled"
        checked={data.enabled !== false}
        onChange={(v) => setField("enabled", v)}
      />

      <Field label="Kicker" value={data.kicker || ""} onChange={(v) => setField("kicker", v)} />
      <Field label="Title" value={data.title || ""} onChange={(v) => setField("title", v)} />
      <Field label="Note (opcional)" value={data.note || ""} onChange={(v) => setField("note", v)} />

      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold">Fotos (URLs)</div>
        <Button variant="default" className="px-3 py-2" onClick={addPhoto}>
          + Añadir
        </Button>
      </div>

      <div className="space-y-3">
        {photos.map((src, idx) => (
          <div key={idx} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-3">
            <div className="flex items-center justify-between gap-2">
              <div className="text-sm font-semibold">Foto #{idx + 1}</div>
              <Button className="px-3 py-2" onClick={() => removePhoto(idx)}>
                🗑
              </Button>
            </div>

            <input
              className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm outline-none"
              value={src || ""}
              onChange={(e) => setPhoto(idx, e.target.value)}
              placeholder="https://..."
            />
          </div>
        ))}

        {photos.length === 0 ? (
          <div className="text-sm text-[var(--muted)]">Añade 3–5 fotos para la tira.</div>
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
