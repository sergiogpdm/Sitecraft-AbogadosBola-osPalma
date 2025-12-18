import Button from "../ui/Button.jsx";

export default function HeroEditor({ config, setConfig }) {
  const hero = config?.copy?.hero ?? {};

  const setHero = (patchOrFn) => {
    setConfig((prev) => {
      const prevHero = prev?.copy?.hero ?? {};
      const patch =
        typeof patchOrFn === "function" ? patchOrFn(prevHero) : patchOrFn;

      return {
        ...prev,
        copy: {
          ...(prev.copy || {}),
          hero: {
            ...prevHero,
            ...patch,
          },
        },
      };
    });
  };

  // ✅ Backwards compatible: string -> {label, href, newTab}
  const primary =
    typeof hero.primaryCta === "string"
      ? { label: hero.primaryCta, href: "", newTab: false }
      : hero.primaryCta || { label: "", href: "", newTab: false };

  const secondary =
    typeof hero.secondaryCta === "string"
      ? { label: hero.secondaryCta, href: "", newTab: true }
      : hero.secondaryCta || { label: "", href: "", newTab: true };

  const setPrimary = (patch) => setHero({ primaryCta: { ...primary, ...patch } });
  const setSecondary = (patch) => setHero({ secondaryCta: { ...secondary, ...patch } });

  const setStat = (idx, patch) => {
    setHero((prevHero) => {
      const stats = Array.isArray(prevHero.stats) ? [...prevHero.stats] : [];
      stats[idx] = { ...(stats[idx] || {}), ...patch };
      return { stats };
    });
  };

  const addStat = () => {
    setHero((prevHero) => {
      const stats = Array.isArray(prevHero.stats) ? [...prevHero.stats] : [];
      stats.push({ title: "Nuevo", desc: "Descripción" });
      return { stats };
    });
  };

  const removeStat = (idx) => {
    setHero((prevHero) => {
      const stats = Array.isArray(prevHero.stats) ? [...prevHero.stats] : [];
      stats.splice(idx, 1);
      return { stats };
    });
  };

  const moveStat = (idx, dir) => {
    setHero((prevHero) => {
      const stats = Array.isArray(prevHero.stats) ? [...prevHero.stats] : [];
      const j = idx + dir;
      if (j < 0 || j >= stats.length) return {};
      [stats[idx], stats[j]] = [stats[j], stats[idx]];
      return { stats };
    });
  };

  return (
    <div className="space-y-5">
      <h3 className="text-sm font-semibold">Hero</h3>

      <Field label="Badge" value={hero.badge} onChange={(v) => setHero({ badge: v })} />
      <Field label="Título A" value={hero.titleA} onChange={(v) => setHero({ titleA: v })} />
      <Field
        label="Título Highlight"
        value={hero.titleHighlight}
        onChange={(v) => setHero({ titleHighlight: v })}
      />
      <Field label="Título B" value={hero.titleB} onChange={(v) => setHero({ titleB: v })} />

      <TextArea label="Subtítulo" value={hero.subtitle} onChange={(v) => setHero({ subtitle: v })} />

      {/* ✅ CTAs con enlace */}
      <div className="space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
        <div className="text-sm font-semibold">CTA principal</div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="Texto" value={primary.label} onChange={(v) => setPrimary({ label: v })} />
          <Field label="Enlace (href)" value={primary.href} onChange={(v) => setPrimary({ href: v })} />
        </div>
        <label className="flex items-center gap-3 text-sm">
          <input
            type="checkbox"
            checked={!!primary.newTab}
            onChange={(e) => setPrimary({ newTab: e.target.checked })}
          />
          Abrir en nueva pestaña
        </label>
      </div>

      <div className="space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
        <div className="text-sm font-semibold">CTA secundaria</div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="Texto" value={secondary.label} onChange={(v) => setSecondary({ label: v })} />
          <Field label="Enlace (href)" value={secondary.href} onChange={(v) => setSecondary({ href: v })} />
        </div>
        <label className="flex items-center gap-3 text-sm">
          <input
            type="checkbox"
            checked={!!secondary.newTab}
            onChange={(e) => setSecondary({ newTab: e.target.checked })}
          />
          Abrir en nueva pestaña
        </label>
      </div>

      {/* Stats */}
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
