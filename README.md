# 🍕 Gondola Web — Plantilla Web Personalizable

Gondola Web es una **plantilla web moderna, visual y altamente personalizable**, pensada para negocios locales (pizzerías, restaurantes, cafeterías, tiendas, etc.) que quieren una web que **impacte, convierta y se pueda reutilizar fácilmente**.

El proyecto está construido con **React + Vite + Tailwind**, e incluye un **sistema de configuración centralizado**, presets visuales y un **panel interno de personalización**.

---

## ✨ Características principales

- ⚡ **React + Vite** (rápido y moderno)
- 🎨 **Presets completos de diseño** (colores, radios, sombras, densidad, tipografías)
- 🧩 **Secciones activables/desactivables** desde configuración
- 🧠 **Configuración central (`site.config.js`)**
- 🛠️ **Panel visual `/customize`** para personalizar sin tocar código
- 📤 **Export / Import de configuración**
- 📱 Diseño **mobile-first** y orientado a conversión
- 🔌 Preparada para conectar **API + BBDD** (carta dinámica, app admin)

---

## 🧱 Stack tecnológico

- **React**
- **Vite**
- **Tailwind CSS**
- **React Router**
- **Framer Motion**
- **Lucide Icons**

---

## 📁 Estructura del proyecto

```txt
src/
 ├─ components/
 │   ├─ ui/                 # Botones y componentes base
 │   ├─ sections/           # Secciones enchufables (Hero, Benefits, etc.)
 │   └─ Layout, Navbar, Footer…
 │
 ├─ pages/
 │   ├─ Home.jsx
 │   ├─ Menu.jsx            # Placeholder (futura carta dinámica)
 │   ├─ Contact.jsx
 │   ├─ Customize.jsx       # Panel de personalización
 │
 ├─ config/
 │   ├─ site.config.js      # Configuración principal del sitio
 │   ├─ presets.js          # Presets visuales completos
 │   └─ exportConfig.js     # Utilidades export/import
 │
 ├─ context/
 │   └─ SiteConfigContext.jsx
 │
 ├─ theme/
 │   └─ theme.css           # Variables CSS base
 │
 ├─ App.jsx
 ├─ main.jsx
 └─ index.css



🚀 Instalación y uso
1️⃣ Instalar dependencias
npm install

2️⃣ Arrancar el proyecto
npm run dev

La web estará disponible en:
http://localhost:5173



🎛️ Personalización rápida (modo plantilla)
👉 Opción A: Editar directamente la configuración

Edita:
src/config/site.config.js

Aquí puedes cambiar:

Nombre, textos, enlaces

Secciones visibles

Preset visual activo

CTA, botones, layout

👉 Opción B: Panel visual /customize

Entra en el navegador:
/customize

Desde ahí puedes:

Cambiar preset visual

Activar / desactivar secciones

Mostrar u ocultar CTAs

Exportar la configuración final

🔒 Cuando termines, puedes ocultar esta ruta:
pages: {
  customize: { enabled: false }
}


♻️ Crear una nueva web con esta plantilla

Duplica el repositorio

Entra a /customize

Ajusta diseño y contenido

Pulsa Exportar configuración

Pega el resultado en site.config.js

(Opcional) Desactiva /customize

Deploy 🚀

🧩 Próximos pasos previstos

📦 Conectar API + Base de Datos

🧾 Carta dinámica desde backend

🔐 Panel admin (login + gestión de productos)

🌍 SEO avanzado

🌙 Modo claro / oscuro por preset

📄 Licencia

Proyecto de uso libre para fines educativos y comerciales.
Personalízalo, reutilízalo y mejóralo sin restricciones.

🧠 Autor

Desarrollado como proyecto base para webs modernas y reutilizables.

“Una sola base. Infinitas webs.”
::contentReference[oaicite:0]{index=0}
