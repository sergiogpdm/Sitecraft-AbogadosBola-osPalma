import { useId, useMemo, useState } from "react";

/**
 * ContactForm
 * - 3 campos: nombre, teléfono, consulta
 * - Variantes: "card" | "split" | "minimal"
 *
 * Props principales:
 * - variant: "card" | "split" | "minimal"
 * - title, subtitle
 * - labels / placeholders
 * - submitText
 * - onSubmit: async (payload) => void
 */
export default function ContactForm({
  variant = "card",
  title = "Pide información",
  subtitle = "Rellena el formulario y te contestamos lo antes posible.",
  labels = {
    name: "Nombre",
    phone: "Teléfono",
    message: "Consulta",
  },
  placeholders = {
    name: "Tu nombre",
    phone: "+34 600 000 000",
    message: "Cuéntanos tu caso o lo que necesitas…",
  },
  submitText = "Enviar",
  privacyText = "Al enviar aceptas ser contactado por este medio.",
  required = { name: true, phone: true, message: true },
  minMessageLength = 10,
  className = "",
  onSubmit,
}) {
  const rid = useId();
  const [values, setValues] = useState({ name: "", phone: "", message: "", website: "" }); // website = honeypot
  const [status, setStatus] = useState({ type: "idle", msg: "" }); // idle | loading | ok | error

  const styles = useMemo(() => {
    const baseInput =
      "w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-2 " +
      "bg-[var(--card)] text-[var(--text)] border-[var(--border)] focus:ring-[color:var(--accentB)]";

    const baseLabel = "text-sm font-medium text-[var(--text)]";
    const baseHelp = "text-xs text-[var(--muted)]";

    const variants = {
      card: {
        wrap:
          "rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] " +
          "shadow-[0_var(--shadowY)_var(--shadowBlur)_rgba(0,0,0,var(--shadowOpacity))] " +
          "p-6 md:p-8",
        grid: "grid gap-4",
        header: "mb-5",
      },
      split: {
        wrap:
          "rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] overflow-hidden " +
          "shadow-[0_var(--shadowY)_var(--shadowBlur)_rgba(0,0,0,var(--shadowOpacity))]",
        grid: "grid md:grid-cols-2",
        header:
          "p-6 md:p-8 bg-[color:var(--bg)] border-b md:border-b-0 md:border-r border-[var(--border)]",
        form: "p-6 md:p-8",
      },
      minimal: {
        wrap: "p-0",
        grid: "grid gap-4",
        header: "mb-4",
      },
    };

    return { baseInput, baseLabel, baseHelp, v: variants[variant] ?? variants.card };
  }, [variant]);

  const setField = (key) => (e) => setValues((p) => ({ ...p, [key]: e.target.value }));

  const validate = () => {
    const errors = [];
    if (required.name && values.name.trim().length < 2) errors.push("Escribe tu nombre.");
    if (required.phone && values.phone.trim().length < 6) errors.push("Añade un teléfono válido.");
    if (required.message && values.message.trim().length < minMessageLength)
      errors.push(`La consulta debe tener al menos ${minMessageLength} caracteres.`);
    // honeypot (bots)
    if (values.website.trim()) errors.push("Validación anti-spam fallida.");
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "idle", msg: "" });

    const errs = validate();
    if (errs.length) {
      setStatus({ type: "error", msg: errs[0] });
      return;
    }

    try {
      setStatus({ type: "loading", msg: "Enviando…" });

      const payload = {
        name: values.name.trim(),
        phone: values.phone.trim(),
        message: values.message.trim(),
      };

      if (onSubmit) {
        await onSubmit(payload);
      } else {
        // Fallback: no hace nada (evita romper si aún no conectas backend)
        await new Promise((r) => setTimeout(r, 400));
      }

      setStatus({ type: "ok", msg: "¡Enviado! Te responderemos en breve." });
      setValues({ name: "", phone: "", message: "", website: "" });
    } catch (err) {
      setStatus({ type: "error", msg: "No se pudo enviar. Inténtalo de nuevo." });
    }
  };

  const Button = ({ children, disabled }) => (
    <button
      type="submit"
      disabled={disabled}
      className={
        "w-full rounded-[var(--btnRadius)] px-5 py-3 font-semibold transition " +
        "bg-[linear-gradient(135deg,var(--accentA),var(--accentB))] text-white " +
        "disabled:opacity-60 disabled:cursor-not-allowed"
      }
    >
      {children}
    </button>
  );

  const Header = () => (
    <div className={styles.v.header}>
      <h3 className="text-xl font-bold text-[var(--text)]">{title}</h3>
      {subtitle ? <p className="mt-1 text-[var(--muted)]">{subtitle}</p> : null}
    </div>
  );

  const FormFields = () => (
    <form onSubmit={handleSubmit} className={variant === "split" ? "grid gap-4" : styles.v.grid}>
      {/* Honeypot invisible */}
      <input
        tabIndex={-1}
        autoComplete="off"
        value={values.website}
        onChange={setField("website")}
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-2">
        <label className={styles.baseLabel} htmlFor={`${rid}-name`}>
          {labels.name}
        </label>
        <input
          id={`${rid}-name`}
          name="name"
          value={values.name}
          onChange={setField("name")}
          placeholder={placeholders.name}
          className={styles.baseInput}
          autoComplete="name"
          required={required.name}
        />
      </div>

      <div className="grid gap-2">
        <label className={styles.baseLabel} htmlFor={`${rid}-phone`}>
          {labels.phone}
        </label>
        <input
          id={`${rid}-phone`}
          name="phone"
          type="tel"
          inputMode="tel"
          value={values.phone}
          onChange={setField("phone")}
          placeholder={placeholders.phone}
          className={styles.baseInput}
          autoComplete="tel"
          required={required.phone}
        />
      </div>

      <div className="grid gap-2">
        <label className={styles.baseLabel} htmlFor={`${rid}-message`}>
          {labels.message}
        </label>
        <textarea
          id={`${rid}-message`}
          name="message"
          rows={5}
          value={values.message}
          onChange={setField("message")}
          placeholder={placeholders.message}
          className={styles.baseInput}
          required={required.message}
        />
        {privacyText ? <p className={styles.baseHelp}>{privacyText}</p> : null}
      </div>

      {status.type !== "idle" ? (
        <div
          className={
            "rounded-xl border px-4 py-3 text-sm " +
            (status.type === "ok"
              ? "border-emerald-200 text-emerald-700 bg-emerald-50"
              : status.type === "error"
              ? "border-rose-200 text-rose-700 bg-rose-50"
              : "border-[var(--border)] text-[var(--muted)] bg-[var(--bg)]")
          }
          role="status"
          aria-live="polite"
        >
          {status.msg}
        </div>
      ) : null}

      <Button disabled={status.type === "loading"}>{submitText}</Button>
    </form>
  );

  // Layout final por variante
  if (variant === "split") {
    return (
      <section className={`${styles.v.wrap} ${className}`}>
        <div className={styles.v.grid}>
          <div className={styles.v.header}>
            <Header />
            <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
              <li>• Respuesta rápida</li>
              <li>• Atención personalizada</li>
              <li>• Sin compromiso</li>
            </ul>
          </div>
          <div className={styles.v.form}>
            <FormFields />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`${styles.v.wrap} ${className}`}>
      <Header />
      <FormFields />
    </section>
  );
}
