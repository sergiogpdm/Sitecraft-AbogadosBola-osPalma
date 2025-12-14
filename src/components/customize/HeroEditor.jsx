import Button from "../ui/Button.jsx";

export default function HeroEditor({ config, setConfig }) {
  const hero = config.copy.hero;

  const setHero = (patch) => {
    setConfig((p) => ({
      ...p,
      copy: {
        ...p.copy,
        hero: {
          ...p.copy.hero,
          ...patch,
        },
      },
    }));
  };

  const setStat = (idx, patch) => {
    const stats = Array.isArray(hero.stats) ? [...hero.stats] : [];
    stats[idx] = { ...(stats[idx] || {}), ...patch };
    setHero({ stats });
  };

  const addStat = () => {
    const stats = Array.isArray(hero.stats) ? [...hero.stats] : [];
    stats.push({ title: "Nuevo", desc: "Descripción" });
    setHero({ stats });
  };

  const removeStat = (idx) => {
    const stats = Array.isArray(hero.stats) ? [...hero.stats] : [];
    stats.splice(idx, 1);
    setHero({ stats });
  };

  const moveStat = (idx, dir) => {
    const stats = Array.isArray(hero.stats) ? [...hero.stats] : [];
    const j = idx + dir;
    if (j < 0 || j >= stats.length) return;
    [stats[idx], stats[j]] = [stats[j], stats[idx]];
    setHero({ stats });
  };

  return (
    <div className="space-y-5">
      <h3 className="text-sm font-semibold">Hero</h3>

      <Field label="Badge" value={hero.badge} onChange={(v) => setHero({ badge: v })} />
      <Field label="Título A" value={hero.titleA} onChange={(v) => setHero({ titleA: v })} />
      <Field label="Título Highlight" value={hero.titleHighlight} onChange={(v) => setHero({ titleHighlight: v })} />
      <Field label="Título B" value={hero.titleB} onChange={(v) => setHero({ titleB: v })} />

      <TextArea label="Subtítulo" value={hero.subtitle} onChange={(v) => setHero({ subtitle: v })} />

      <div className="grid grid-cols-2 gap-3">
        <Field label="CTA principal" value={hero.primaryCta} onChange={(v) => setHero({ primaryCta: v })} />
        <Field label="CTA secundaria" value={hero.secondaryCta} onChange={(v) => setHero({ secondaryCta: v })} />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">Stats</div>
          <Button variant="primary" onClick={addStat}>
            + Añadir
          </Button>
        </div>

        {(hero.stats || []).map((s, idx) => (
          <div key={idx} className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-3">
            <div className="flex items-center justify-between gap-2">
              <div className="text-xs text-[var(--muted)]">Stat #{idx + 1}</div>
              <div className="flex gap-2">
                <Button variant="default" className="px-3 py-2" onClick={() => moveStat(idx, -1)}>↑</Button>
                <Button variant="default" className="px-3 py-2" onClick={() => moveStat(idx, +1)}>↓</Button>
                <Button variant="default" className="px-3 py-2" onClick={() => removeStat(idx)}>✕</Button>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field label="Título" value={s?.title ?? ""} onChange={(v) => setStat(idx, { title: v })} />
              <Field label="Descripción" value={s?.desc ?? ""} onChange={(v) => setStat(idx, { desc: v })} />
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
