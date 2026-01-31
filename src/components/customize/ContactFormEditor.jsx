import Button from "../ui/Button.jsx";

export default function ContactFormEditor({ config, setConfig }) {
  const data = config.copy?.contactForm || {};

  const setField = (key, value) => {
    setConfig((p) => ({
      ...p,
      copy: {
        ...p.copy,
        contactForm: {
          variant: "card",
          title: "Pide información",
          subtitle: "Rellena el formulario y te contestamos lo antes posible.",
          submitText: "Enviar",
          minMessageLength: 10,
          labels: { name: "Nombre", phone: "Teléfono", message: "Consulta" },
          placeholders: {
            name: "Tu nombre",
            phone: "+34 600 000 000",
            message: "Cuéntanos tu caso…",
          },
          ...(p.copy?.contactForm || {}),
          [key]: value,
        },
      },
    }));
  };

  const setNested = (path, value) => {
    setConfig((p) => {
      const cur = p.copy?.contactForm || {};
      const next = structuredClone ? structuredClone(cur) : JSON.parse(JSON.stringify(cur));
      // path ej "labels.name"
      const parts = path.split(".");
      let obj = next;
      for (let i = 0; i < parts.length - 1; i++) {
        const k = parts[i];
        obj[k] = obj[k] && typeof obj[k] === "object" ? obj[k] : {};
        obj = obj[k];
      }
      obj[parts[parts.length - 1]] = value;
      return { ...p, copy: { ...p.copy, contactForm: next } };
    });
  };

  return (
    <div className="space-y-4">
      <div className="text-sm font-semibold">ContactForm</div>

      <label className="block">
        <div className="text-xs text-zinc-400">Diseño (variant)</div>
        <select
          className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm outline-none"
          value={data.variant || "card"}
          onChange={(e) => setField("variant", e.target.value)}
        >
          <option value="card">card</option>
          <option value="split">split</option>
          <option value="minimal">minimal</option>
        </select>
      </label>

      <TextField label="Título" value={data.title ?? ""} onChange={(v) => setField("title", v)} />
      <TextField label="Subtítulo" value={data.subtitle ?? ""} onChange={(v) => setField("subtitle", v)} />
      <TextField label="Texto botón" value={data.submitText ?? ""} onChange={(v) => setField("submitText", v)} />

      <NumberField
        label="Mínimo caracteres en consulta"
        value={data.minMessageLength ?? 10}
        onChange={(v) => setField("minMessageLength", Number(v || 0))}
      />

      <div className="mt-2 text-sm font-semibold">Labels</div>
      <TextField label="Label nombre" value={data.labels?.name ?? ""} onChange={(v) => setNested("labels.name", v)} />
      <TextField label="Label teléfono" value={data.labels?.phone ?? ""} onChange={(v) => setNested("labels.phone", v)} />
      <TextField label="Label consulta" value={data.labels?.message ?? ""} onChange={(v) => setNested("labels.message", v)} />

      <div className="mt-2 text-sm font-semibold">Placeholders</div>
      <TextField label="PH nombre" value={data.placeholders?.name ?? ""} onChange={(v) => setNested("placeholders.name", v)} />
      <TextField label="PH teléfono" value={data.placeholders?.phone ?? ""} onChange={(v) => setNested("placeholders.phone", v)} />
      <TextField label="PH consulta" value={data.placeholders?.message ?? ""} onChange={(v) => setNested("placeholders.message", v)} />

      <div className="pt-2">
        <Button
          variant="default"
          onClick={() =>
            setConfig((p) => ({
              ...p,
              copy: { ...p.copy, contactForm: undefined },
            }))
          }
        >
          Reset ContactForm
        </Button>
      </div>
    </div>
  );
}

/* helpers (igual estilo que Customize) */
function TextField({ label, value, onChange }) {
  return (
    <label className="block">
      <div className="text-xs text-zinc-400">{label}</div>
      <input
        className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm outline-none"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function NumberField({ label, value, onChange }) {
  return (
    <label className="block">
      <div className="text-xs text-zinc-400">{label}</div>
      <input
        type="number"
        className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm outline-none"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
