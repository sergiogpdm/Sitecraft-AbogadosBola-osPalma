# Sitecraft — Configurable Web Template Engine ⚡

**Sitecraft** es una plantilla web moderna y reutilizable para negocios locales (pizzerías, restaurantes, cafeterías, tiendas, etc.).  
Está pensada para construir webs que **impactan, convierten y se personalizan rápido** usando un sistema de configuración + presets visuales.

> **Craft once. Launch everywhere.**

---

## ✨ Características

- ⚡ **React + Vite** (rápido y moderno)
- 🎨 **Presets completos** (paleta, radius, sombras, blur, densidad, tipografías, glows)
- 🧩 **Secciones enchufables** (activar/desactivar desde configuración)
- 🧠 **Configuración central** (`src/config/site.config.js`)
- 🛠️ **Panel visual** `/customize` para personalizar sin tocar código
- 📤 **Export / Import de configuración** (copiar/pegar y listo)
- 📱 Diseño **mobile-first** orientado a conversión
- 🔌 Preparada para conectar **API + BBDD** (carta dinámica + app admin)

---

## 🧱 Stack

- **React**
- **Vite**
- **Tailwind CSS**
- **React Router**
- **Framer Motion**
- **Lucide Icons**

---

## 📁 Estructura

```txt
src/
 ├─ components/
 │   ├─ ui/                 # Componentes base (Button, etc.)
 │   ├─ sections/           # Secciones enchufables (Hero, Benefits, etc.)
 │   └─ Navbar, Footer, Layout…
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
