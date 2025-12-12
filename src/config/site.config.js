export const siteConfig = {
  brand: {
    name: "Pizzería",
    tagline: "Masa lenta • Horno fuerte",
    emojiLogo: "🍕",
  },

  links: {
    whatsapp: "https://wa.me/34000000000",
    maps: "https://www.google.com/maps",
  },

  contact: {
    phone: "000 000 000",
    address: "Calle Ejemplo 123, Tu Ciudad",
    hours: "L–D: 13:00–16:00 • 19:30–23:30",
  },

  theme: {
    preset: "amberFire", // amberFire | mintNight | roseLuxury
    radius: 24,
  },

  layout: {
    showFloatingOrderButton: true,
    showNavbarCta: true,
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
    customize: { enabled: true }, // ponlo en false si no quieres exponer /customize
  },

  copy: {
    hero: {
      badge: "Recién hechas • Ingredientes top • Mucho “wow”",
      titleA: "La pizza que",
      titleHighlight: "entra por los ojos",
      titleB: "y se queda por el sabor.",
      subtitle:
        "Masa fermentada, horno a tope y combinaciones pensadas para que te apetezca pedir antes de terminar de bajar.",
      primaryCta: "Pedir por WhatsApp",
      secondaryCta: "Ver carta",
      imageHint: "Aquí luego puedes poner una foto real brutal",
      stats: [
        { title: "4.8/5", desc: "Reseñas" },
        { title: "Rápida", desc: "Pedido ágil" },
        { title: "Calidad", desc: "Ingredientes" },
      ],
    },

    benefits: {
      kicker: "Diseñado para abrir y pedir",
      title: "Una web que vende sin parecer “agresiva”",
      desc: "Secciones tipo ecommerce: producto, confianza, urgencia y CTA claro.",
      items: [
        {
          title: "Sensación premium",
          desc: "Tipografía grande, contraste y cards glass para ese efecto “wow”.",
        },
        {
          title: "Confianza (social proof)",
          desc: "Reseñas, sellos y mensajes cortos que bajan la fricción.",
        },
        {
          title: "Acción inmediata",
          desc: "CTA fijo + WhatsApp para convertir rápido desde móvil.",
        },
      ],
    },

    bestSellers: {
      kicker: "Top de la casa",
      title: "Lo que más se pide (preview)",
      desc: "Esto luego lo alimentas desde tu BBDD. De momento, es un escaparate.",
      items: [
        { name: "Margarita Pro", price: "8,50€", desc: "Clásica, pero con presencia." },
        { name: "Diavola", price: "10,50€", desc: "Picantita, adictiva." },
        { name: "Trufa & Setas", price: "12,90€", desc: "La “cara” que enamora." },
      ],
      cta: "Ver carta completa",
    },

    promo: {
      kicker: "Promoción de lanzamiento (editable)",
      title: "¿Te apetece una ahora mismo?",
      desc: "Entra, mira dos pizzas… y cuando te des cuenta ya has abierto WhatsApp.",
      primaryCta: "Pedir ahora",
      secondaryCta: "Ver ubicación",
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
      primaryCta: "Pedir por WhatsApp",
      secondaryCta: "Abrir en Maps",
      mapPlaceholder: "Aquí va el mapa (embed)",
    },

    footer: {
      about:
        "Artesanal, rápida y con ingredientes que se notan. Hecha para abrir la web y tener hambre.",
    },
  },
};
