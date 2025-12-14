import Button from "../ui/Button.jsx";

export default function PromoEditor({ config, setConfig }) {
  const promo = config.copy.promo;

  const setPromo = (patch) => {
    setConfig((p) => ({
      ...p,
      copy: {
        ...p.copy,
        promo: {
          ...p.copy.promo,
          ...patch,
        },
      },
    }));
  };

  return (
    <div className="space-y-5">
      <h3 className="text-sm font-semibold">Promo CTA</h3>

      <Field label="Kicker" value={promo.kicker} onChange={(v) => setPromo({ kicker: v })} />
      <Field label="Título" value={promo.title} onChange={(v) => setPromo({ title: v })} />
      <TextArea label="Descripción" value={promo.desc} onChange={(v) => setPromo({ desc: v })} />

      <div className="grid grid-cols-2 gap-3">
        <Field label="CTA principal" value={promo.primaryCta} onChange={(v) => setPromo({ primaryCta: v })} />
        <Field label="CTA secundaria" value={promo.secondaryCta} onChange={(v) => setPromo({ secondaryCta: v })} />
      </div>

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-3 text-xs text-[var(--muted)]">
        Tip: el CTA principal abre <b>Maps</b> (links.maps) y el secundario hace scroll a <b>#menu</b>.
      </div>

      <div className="flex gap-2">
        <Button
          variant="default"
          onClick={() =>
            setPromo({
              kicker: "Ven a conocernos",
              title: "Pizza para disfrutar en el local",
              desc: "Estamos en el centro. Ven con calma y déjate sorprender.",
              primaryCta: "Ver ubicación",
              secondaryCta: "Ver carta",
            })
          }
        >
          Reset ejemplo
        </Button>
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
