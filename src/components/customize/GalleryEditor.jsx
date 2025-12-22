import Button from "../ui/Button.jsx";

export default function GalleryEditor({ config, setConfig }) {
  const g = config?.copy?.gallery ?? {
    kicker: "",
    title: "",
    desc: "",
    items: [],
  };

  const items = Array.isArray(g.items) ? g.items : [];

  const setGallery = (patchOrFn) => {
    setConfig((prev) => {
      const prevG = prev.copy.gallery || {};
      const patch = typeof patchOrFn === "function" ? patchOrFn(prevG) : patchOrFn;

      return {
        ...prev,
        copy: {
          ...prev.copy,
          gallery: {
            ...prevG,
            ...patch,
          },
        },
      };
    });
  };

  const setItem = (idx, patch) => {
    setGallery((prevG) => {
      const arr = Array.isArray(prevG.items) ? [...prevG.items] : [];
      arr[idx] = { ...(arr[idx] || {}), ...patch };
      return { items: arr };
    });
  };

  const addItem = () => {
    setGallery((prevG) => {
      const arr = Array.isArray(prevG.items) ? [...prevG.items] : [];
      arr.push({
        imageSrc: "",
        alt: "Imagen",
        caption: "",
      });
      return { items: arr };
    });
  };

  const removeItem = (idx) => {
    setGallery((prevG) => {
      const arr = Array.isArray(prevG.items) ? [...prevG.items] : [];
      arr.splice(idx, 1);
      return { items: arr };
    });
  };

  const moveItem = (idx, dir) => {
    setGallery((prevG) => {
      const arr = Array.isArray(prevG.items) ? [...prevG.items] : [];
      const j = idx + dir;
      if (j < 0 || j >= arr.length) return {};
      [arr[idx], arr[j]] = [arr[j], arr[idx]];
      return { items: arr };
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-sm font-semibold">Gallery</h3>

      {/* Textos */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 space-y-3">
        <Field
          label="Kicker"
          value={g.kicker}
          onChange={(v) => setGallery({ kicker: v })}
        />
        <Field
          label="Título"
          value={g.title}
          onChange={(v) => setGallery({ title: v })}
        />
        <TextArea
          label="Descripción"
          value={g.desc}
          onChange={(v) => setGallery({ desc: v })}
        />
      </div>

      {/* Imágenes */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">Imágenes</div>
          <Button variant="primary" onClick={addItem}>
            + Añadir
          </Button>
        </div>

        {items.length ? (
          items.map((it, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="text-xs text-[var(--muted)]">
                  Imagen #{idx + 1}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="default"
                    className="px-3 py-2"
                    onClick={() => moveItem(idx, -1)}
                  >
                    ↑
                  </Button>
                  <Button
                    variant="default"
                    className="px-3 py-2"
                    onClick={() => moveItem(idx, +1)}
                  >
                    ↓
                  </Button>
                  <Button
                    variant="default"
                    className="px-3 py-2"
                    onClick={() => removeItem(idx)}
                  >
                    ✕
                  </Button>
                </div>
              </div>

              {/* Preview */}
              {it.imageSrc ? (
                <div className="overflow-hidden rounded-xl border border-[var(--border)]">
                  <img
                    src={it.imageSrc}
                    alt={it.alt}
                    className="h-40 w-full object-cover"
                  />
                </div>
              ) : null}

              <Field
                label="Imagen (ruta o URL)"
                value={it.imageSrc}
                placeholder="/demo/gallery/1.jpg o https://images.unsplash.com/..."
                onChange={(v) => setItem(idx, { imageSrc: v })}
              />

              <div className="text-xs text-[var(--muted)]">
                Usa una ruta a una imagen en <code>/public</code> o una URL externa.
                <br />
                Ejemplo: <code>/demo/gallery/1.jpg</code> ·{" "}
                <code>https://images.unsplash.com/...</code>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Field
                  label="Alt"
                  value={it.alt}
                  onChange={(v) => setItem(idx, { alt: v })}
                />
                <Field
                  label="Caption"
                  value={it.caption}
                  onChange={(v) => setItem(idx, { caption: v })}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 text-sm text-[var(--muted)]">
            No hay imágenes todavía. Añade una ruta o URL para empezar.
          </div>
        )}
      </div>
    </div>
  );
}

/* ---- helpers ---- */

function Field({ label, value, onChange, placeholder }) {
  return (
    <label className="block">
      <div className="text-xs text-zinc-400">{label}</div>
      <input
        className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm outline-none"
        value={value ?? ""}
        placeholder={placeholder}
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
        className="mt-2 h-24 w-full resize-none rounded-2xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm outline-none"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
