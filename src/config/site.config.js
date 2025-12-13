export const siteConfig = {
  brand: {
    name: "Forno Nero",
    tagline: "Pizza contemporánea al horno",
    emojiLogo: "🍕",
  },

  links: {
    // Como has dicho "no WhatsApp", lo dejamos vacío.
    whatsapp: "",
    maps: "https://www.google.com/maps",
  },

  contact: {
    phone: "000 000 000",
    address: "Calle Ejemplo 123, Tu Ciudad",
    hours: "L–D: 13:00–16:00 • 19:30–23:30",
  },

  theme: {
    // Preset base (arranque rápido)
    preset: "roseLuxury", // amberFire | mintNight | roseLuxury

    // Modo UI (estilo de cards/blur/border)
    mode: "glass", // glass | solid | minimal

    // Overrides (ajustes finos). Solo se aplican los que pongas.
    overrides: {
      // Ejemplos:
      // "--accentA": "#fb7185",
      // "--accentB": "#a78bfa",
      // "--radius": "28px",
      // "--cardBlur": "18px",
      // "--shadowY": "30px",
      // "--shadowBlur": "110px",
      // "--shadowOpacity": "0.55",

      // Fuentes (si seleccionas Google Fonts en /customize, se rellenan aquí)
      // "--fontDisplay": "Poppins",
      // "--fontBody": "Inter",
    },
  },

  layout: {
    showFloatingOrderButton: false,
    showNavbarCta: false,
  },

  pages: {
    home: {
      sections: [
        { id: "hero", enabled: true },
        { id: "benefits", enabled: true },
        { id: "bestSellers", enabled: true },
        { id: "promoCta", enabled: true },
      ],
    },
    menu: { enabled: true },
    contact: { enabled: true },
    customize: { enabled: true }, // ponlo en false para ocultar /customize
  },

  copy: {
    hero: {
      badge: "Pizza artesanal · Ingredientes seleccionados",
      titleA: "Pizza hecha",
      titleHighlight: "con intención",
      titleB: "",
      subtitle:
        "Fermentación lenta, horno a alta temperatura y recetas pensadas para disfrutarse sin prisas.",
      primaryCta: "Ver carta",
      secondaryCta: "Ver ubicación",
      imageHint: "Imagen real de la pizza aquí",
      stats: [
        { title: "Horno", desc: "Alta temperatura" },
        { title: "Masa", desc: "Fermentación lenta" },
        { title: "Producto", desc: "Calidad seleccionada" },
      ],
    },

    benefits: {
      kicker: "Experiencia premium",
      title: "Una pizzería moderna que se nota en cada detalle",
      desc: "Pensada para que te apetezca venir antes de terminar de ver la página.",
      items: [
        {
          title: "Recetas cuidadas",
          desc: "Sabor claro, equilibrado y con ingredientes protagonistas.",
        },
        {
          title: "Calidad constante",
          desc: "Mismo estándar todos los días: masa, horno y producto.",
        },
        {
          title: "Ambiente y marca",
          desc: "Una experiencia redonda: visual, aroma, textura y ritmo.",
        },
      ],
    },

    bestSellers: {
      kicker: "Nuestra selección",
      title: "Algunas de nuestras pizzas",
      desc: "Una pequeña muestra. La carta completa estará disponible próximamente.",
      items: [
        {
          name: "Margherita Forno",
          price: "—",
          desc: "Tomate San Marzano, mozzarella fior di latte, albahaca.",
        },
        {
          name: "Diavola",
          price: "—",
          desc: "Salami picante, mozzarella, aceite aromatizado.",
        },
        {
          name: "Trufa & Setas",
          price: "—",
          desc: "Base blanca, setas salteadas y trufa.",
        },
      ],
      cta: "Ver carta completa",
    },

    promo: {
      kicker: "Ven a conocernos",
      title: "Pizza para disfrutar en el local",
      desc: "Estamos en el centro. Ven con calma y déjate sorprender.",
      primaryCta: "Ver ubicación",
      secondaryCta: "Ver carta",
    },

    menuPage: {
      kicker: "Carta",
      title: "Aquí irá la carta dinámica",
      desc: "De momento lo dejamos vacío. Luego lo conectas a tu app + BBDD y lo pintamos aquí.",
      placeholderTitle: "Próximamente",
      placeholderDesc:
        "Cuando tengas la app de gestión + API, esto mostrará categorías, productos, precios y disponibilidad.",
    },

    contactPage: {
      kicker: "Contacto",
      title: "¿Dónde estamos?",
      desc: "Cámbialo por tu dirección real. Aquí también puedes meter un Google Maps embed.",
      primaryCta: "Llamar",
      secondaryCta: "Abrir en Maps",
      mapPlaceholder: "Aquí va el mapa (embed)",
    },

    footer: {
      about:
        "Artesanal, elegante y con ingredientes que se notan. Hecha para abrir la web y tener hambre.",
    },
  },
};
