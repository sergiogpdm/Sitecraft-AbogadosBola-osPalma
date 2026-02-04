// LanguageToggle.jsx
const SOURCE_LANG = "es";

function setCookie(name, value, opts = {}) {
  let cookie = `${name}=${value}; path=/`;
  if (opts.domain) cookie += `; domain=${opts.domain}`;
  if (window.location.protocol === "https:") cookie += "; Secure";
  cookie += "; SameSite=Lax";
  document.cookie = cookie;
}

function setGoogTrans(lang) {
  // Si vuelve a español, mejor borrar traducción
  if (lang === SOURCE_LANG) {
    setCookie("googtrans", "", { domain: window.location.hostname });
    setCookie("googtrans", "");
  } else {
    const value = `/${SOURCE_LANG}/${lang}`;
    setCookie("googtrans", value);
    setCookie("googtrans", value, { domain: window.location.hostname });
  }

  // Dirección del texto
  document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
  document.documentElement.setAttribute("lang", lang);

  // Guardamos preferencia
  localStorage.setItem("site_lang", lang);

  window.location.reload();
}

// Aplicar idioma guardado al cargar la web
export function initSavedLanguage() {
  const saved = localStorage.getItem("site_lang");
  if (!saved) return;

  document.documentElement.setAttribute("dir", saved === "ar" ? "rtl" : "ltr");
  document.documentElement.setAttribute("lang", saved);
}

export default function LanguageToggle() {
  return (
    <div className="inline-flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 p-1 backdrop-blur">
      <button
        onClick={() => setGoogTrans("es")}
        className="rounded-lg px-3 py-1.5 text-sm font-medium text-[var(--text)] hover:bg-white/10 transition"
      >
        ES
      </button>

      <button
        onClick={() => setGoogTrans("ar")}
        className="rounded-lg px-3 py-1.5 text-sm font-medium text-[var(--text)] hover:bg-white/10 transition"
      >
        AR
      </button>
    </div>
  );
}
