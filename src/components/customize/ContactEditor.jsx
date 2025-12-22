import Button from "../ui/Button.jsx";

export default function ContactEditor({ config, setConfig }) {
  const c = config.copy.contactPage;
  const map = c.map || {};

  const setContactPage = (patch) => {
    setConfig((p) => ({
      ...p,
      copy: {
        ...p.copy,
        contactPage: {
          ...p.copy.contactPage,
          ...patch,
        },
      },
    }));
  };

  const setMap = (patch) => {
    setContactPage({
      map: {
        ...(c.map || {}),
        ...patch,
      },
    });
  };

  const setContact = (patch) => {
    setConfig((p) => ({
      ...p,
      contact: {
        ...p.contact,
        ...patch,
      },
    }));
  };

  const setLinks = (patch) => {
    setConfig((p) => ({
      ...p,
      links: {
        ...p.links,
        ...patch,
      },
    }));
  };

  const onPickImage = (file) => {
    if (!file || !file.type?.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => setMap({ imageSrc: String(reader.result || ""), type: "image" });
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-sm font-semibold">Contacto</h3>

      {/* Layout / Variante */}
      <div className="space-y-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
        <div className="text-sm font-semibold">Layout</div>
        <Select
          label="Diseño del bloque"
          value={c.variant || "split"}
          onChange={(v) => setContactPage({ variant: v })}
          options={[
            ["split", "Split (Info izq / Mapa dcha)"],
            ["mapLeft", "Mapa izq / Info dcha)"],
            ["stacked", "Stacked (Info arriba / Mapa abajo)"],
            ["fullMap", "Full Map (mapa + card flotante)"],
          ]}
        />
      </div>

      {/* Textos */}
      <div className="space-y-3">
        <div className="text-sm font-semibold">Textos</div>

        <Field label="Kicker" value={c.kicker} onChange={(v) => setContactPage({ kicker: v })} />
        <Field label="Título" value={c.title} onChange={(v) => setContactPage({ title: v })} />
        <TextArea label="Descripción" value={c.desc} onChange={(v) => setContactPage({ desc: v })} />

        {/* ✅ CTAs + enlaces debajo */}
        <div className="space-y-4">
          <div className="text-sm font-semibold">CTAs</div>

          {/* CTA principal */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 space-y-3">
            <div className="text-sm font-semibold">CTA principal</div>

            <Field
              label="Texto del botón"
              value={c.primaryCta}
              onChange={(v) => setContactPage({ primaryCta: v })}
            />

            <Field
              label="Enlace (WhatsApp)"
              value={config.links.whatsapp}
              placeholder="https://wa.me/..."
              onChange={(v) => setLinks({ whatsapp: v })}
            />

            <div className="text-xs text-[var(--muted)]">
              Si está vacío, el botón no se mostrará.
            </div>
          </div>

          {/* CTA secundaria */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 space-y-3">
            <div className="text-sm font-semibold">CTA secundaria</div>

            <Field
              label="Texto del botón"
              value={c.secondaryCta}
              onChange={(v) => setContactPage({ secondaryCta: v })}
            />

            <Field
              label="Enlace (Maps)"
              value={config.links.maps}
              placeholder="https://www.google.com/maps?..."
              onChange={(v) => setLinks({ maps: v })}
            />

            <div className="text-xs text-[var(--muted)]">
              Se abre en una nueva pestaña.
            </div>
          </div>
        </div>

        <Field
          label="Placeholder mapa"
          value={c.mapPlaceholder}
          onChange={(v) => setContactPage({ mapPlaceholder: v })}
        />
      </div>

      {/* Mapa */}
      <div className="space-y-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">Mapa</div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={map.enabled !== false}
              onChange={(e) => setMap({ enabled: e.target.checked })}
            />
            Mostrar
          </label>
        </div>

        {map.enabled !== false ? (
          <>
            <Select
              label="Tipo"
              value={map.type || "placeholder"}
              onChange={(v) => setMap({ type: v })}
              options={[
                ["placeholder", "Placeholder"],
                ["image", "Imagen"],
                ["embed", "Google Maps embed"],
              ]}
            />

            {map.type === "image" ? (
              <>
                <Field
                  label="Imagen (URL o dataURL)"
                  value={map.imageSrc}
                  onChange={(v) => setMap({ imageSrc: v })}
                />
                <Field
                  label="Alt"
                  value={map.alt}
                  onChange={(v) => setMap({ alt: v })}
                />

                <label className="block">
                  <div className="text-xs text-zinc-400">Subir imagen</div>
                  <input
                    type="file"
                    accept="image/*"
                    className="mt-2 block w-full text-sm"
                    onChange={(e) => onPickImage(e.target.files?.[0])}
                  />
                </label>

                <div className="flex gap-2">
                  <Button variant="default" onClick={() => setMap({ imageSrc: "" })}>
                    Quitar imagen
                  </Button>
                </div>
              </>
            ) : null}

            {map.type === "embed" ? (
              <TextArea
                label="Embed src (iframe src)"
                value={map.embedSrc}
                onChange={(v) => setMap({ embedSrc: v })}
              />
            ) : null}
          </>
        ) : (
          <div className="text-xs text-[var(--muted)]">Mapa desactivado.</div>
        )}
      </div>

      {/* Datos del local */}
      <div className="space-y-3">
        <div className="text-sm font-semibold">Datos del local</div>

        <Field
          label="Dirección"
          value={config.contact.address}
          onChange={(v) => setContact({ address: v })}
        />
        <Field
          label="Teléfono"
          value={config.contact.phone}
          onChange={(v) => setContact({ phone: v })}
        />
        <Field
          label="Horario"
          value={config.contact.hours}
          onChange={(v) => setContact({ hours: v })}
        />
      </div>

      <div className="flex gap-2">
        <Button
          variant="default"
          onClick={() => {
            setContactPage({
              variant: "split",
              kicker: "Contacto",
              title: "¿Dónde estamos?",
              desc: "Cámbialo por tu dirección real. Aquí también puedes meter un Google Maps embed.",
              primaryCta: "WhatsApp",
              secondaryCta: "Abrir en Maps",
              mapPlaceholder: "Aquí va el mapa (embed)",
              map: {
                enabled: true,
                type: "placeholder",
                imageSrc: "",
                embedSrc: "",
                alt: "Mapa del local",
              },
            });

            setContact({
              address: "Calle Ejemplo 123, Tu Ciudad",
              phone: "000 000 000",
              hours: "L–D: 13:00–16:00 • 19:30–23:30",
            });

            setLinks({
              maps: "https://www.google.com/maps",
              whatsapp: "",
            });
          }}
        >
          Reset ejemplo
        </Button>
      </div>
    </div>
  );
}

/* helpers */
function Field({ label, value, onChange, placeholder }) {
  return (
    <label className="block">
      <div className="text-xs text-zinc-400">{label}</div>
      <input
        className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--text)] outline-none"
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
        className="mt-2 h-28 w-full resize-none rounded-2xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--text)] outline-none"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <label className="block">
      <div className="text-xs text-zinc-400">{label}</div>
      <select
        className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--text)] outline-none"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map(([v, t]) => (
          <option key={v} value={v}>
            {t}
          </option>
        ))}
      </select>
    </label>
  );
}
