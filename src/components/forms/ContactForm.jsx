import { useId, useMemo, useRef, useState } from "react";

export default function ContactForm({
  variant = "card",
  title = "Pide información",
  subtitle = "Rellena el formulario y te contestamos lo antes posible.",
  submitText = "Enviar",
  privacyText = "Al enviar aceptas ser contactado por este medio.",

  labels = { name: "Nombre", phone: "Teléfono", message: "Consulta" },
  placeholders = {
    name: "Tu nombre",
    phone: "+34 600 000 000",
    message: "Cuéntanos tu caso o lo que necesitas…",
  },

  minMessageLength = 10,
  fields = { name: true, phone: true, message: true },

  destination = {
    type: "none",
    emailTo: "",
    whatsappTo: "",
    subject: "Nueva consulta desde la web",
  },

  // Panel izquierdo
  infoTitle = "Contacto directo",
  infoSubtitle = "Pulsa para llamar, escribir o abrir la ubicación.",
  infoPhoneDisplay = "",
  infoPhoneTel = "",
  infoEmail = "",
  infoAddress = "",
  infoMapsUrl = "",

  // Protección de datos
  pdTitle = "Información sobre Protección de Datos",
  pdEmail = "info@papeles26.es",

  className = "",
}) {
  const rid = useId();

  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const msgRef = useRef(null);

  const [values, setValues] = useState({
    name: "",
    phone: "",
    message: "",
    website: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    phone: false,
    message: false,
  });

  const [status, setStatus] = useState({ type: "idle", msg: "" });

  const styles = useMemo(() => {
    const baseInput =
      "w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-2 " +
      "bg-[var(--card)] text-[var(--text)] border-[var(--border)] focus:ring-[color:var(--accentB)]";

    const baseLabel = "text-sm font-medium text-[var(--text)]";
    const baseHelp = "text-xs text-[var(--muted)]";

    return { baseInput, baseLabel, baseHelp };
  }, []);

  const setField = (key) => (e) => {
    const val = e.target.value;
    setValues((p) => ({ ...p, [key]: val }));
    if (status.type !== "sending") setStatus({ type: "idle", msg: "" });
  };

  const onBlur = (key) => () => setTouched((p) => ({ ...p, [key]: true }));

  const normalizePhone = (s) => String(s || "").replace(/[^\d+]/g, "").trim();
  const isValidName = (s) => s.trim().length >= 2;
  const isValidPhone = (s) => normalizePhone(s).replace(/[^\d]/g, "").length >= 9;

  const errors = useMemo(() => {
    const e = {};
    if (fields?.name !== false && !isValidName(values.name))
      e.name = "Escribe un nombre válido.";
    if (fields?.phone !== false && !isValidPhone(values.phone))
      e.phone = "Escribe un teléfono válido.";
    if (values.website.trim()) e.website = "Anti-spam activado.";
    return e;
  }, [values, fields]);

  const fieldError = (key) => (touched[key] ? errors[key] : "");

  const touchAll = () =>
    setTouched({
      name: true,
      phone: true,
      message: fields?.message !== false,
    });

  const focusFirstError = () => {
    if (errors.name) nameRef.current?.focus();
    else if (errors.phone) phoneRef.current?.focus();
  };

  const buildText = () => `Nombre: ${values.name}\nTeléfono: ${values.phone}`;

  const openWhatsApp = () => {
    const to = String(destination.whatsappTo || "").replace(/[^\d]/g, "");
    const text = buildText();
    window.open(`https://wa.me/${to}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    touchAll();
    if (Object.keys(errors).length) {
      setStatus({ type: "error", msg: "Revisa los campos." });
      focusFirstError();
      return;
    }
    openWhatsApp();
    setStatus({ type: "ok", msg: "Se ha abierto WhatsApp." });
  };

  const InfoItem = ({ label, value, href }) =>
    value ? (
      <a
        href={href}
        className="block rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 hover:shadow"
      >
        <div className="text-xs text-[var(--muted)]">{label}</div>
        <div className="font-semibold text-[var(--text)]">{value}</div>
      </a>
    ) : null;

  const mapsUrl =
    infoMapsUrl ||
    (infoAddress
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(infoAddress)}`
      : "");

  return (
    <section className={className}>
      <div className="grid gap-6 md:grid-cols-2">
        {/* IZQUIERDA */}
        <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] p-6 md:p-8">
          <h3 className="text-xl font-bold">{infoTitle}</h3>
          <p className="text-[var(--muted)] mb-4">{infoSubtitle}</p>
          <div className="grid gap-3">
            <InfoItem
              label="Número de teléfono"
              value={infoPhoneDisplay || infoPhoneTel}
              href={`tel:${infoPhoneTel}`}
            />
            <InfoItem
              label="Correo electrónico"
              value={infoEmail}
              href={`mailto:${infoEmail}`}
            />
            <InfoItem label="Dirección" value={infoAddress} href={mapsUrl} />
          </div>
        </div>

        {/* DERECHA */}
        <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] p-6 md:p-8">
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-[var(--muted)] mb-4">{subtitle}</p>

          <form onSubmit={handleSubmit} className="grid gap-4">
            <div>
              <label className={styles.baseLabel}>Nombre</label>
              <input
                ref={nameRef}
                value={values.name}
                onChange={setField("name")}
                onBlur={onBlur("name")}
                className={styles.baseInput}
                placeholder="Tu nombre"
              />
              <div className="text-xs text-rose-500">{fieldError("name")}</div>
            </div>

            <div>
              <label className={styles.baseLabel}>Teléfono</label>
              <input
                ref={phoneRef}
                value={values.phone}
                onChange={setField("phone")}
                onBlur={onBlur("phone")}
                className={styles.baseInput}
                placeholder="+34 600 000 000"
              />
              <div className="text-xs text-rose-500">{fieldError("phone")}</div>
            </div>

            {/* 🔒 PD FIJO (NO PLEGABLE) */}
            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3">
              <div className="text-sm font-semibold">{pdTitle}</div>
              <div className="mt-2 text-xs text-[var(--muted)] leading-relaxed">
                Responsable: “José Bolaños Abogados”. Finalidad: Ponernos en contacto contigo y atender las consultas.
                Legitimación: Medidas precontractuales e interés legítimo. Destinatarios: No se cederán datos salvo obligación legal.
                Derechos: Puedes ejercerlos escribiendo a{" "}
                <a
                  href={`mailto:${pdEmail}`}
                  className="underline font-medium text-[var(--text)]"
                >
                  {pdEmail}
                </a>
                . Información adicional en el apartado “Protección de datos” de nuestra web.
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 rounded-[var(--btnRadius)] bg-[linear-gradient(135deg,var(--accentA),var(--accentB))] text-white py-3 font-semibold"
            >
              {submitText}
            </button>

            {status.msg && (
              <div className="text-sm text-[var(--muted)]">{status.msg}</div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
