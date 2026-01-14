export const siteConfig = {
  "brand": {
    "name": "Sitecraft",
    "tagline": "Webs personalizables",
    "emojiLogo": "🖥️"
  },
  "links": {
    "whatsapp": "",
    "maps": "https://www.google.com/maps"
  },
  "contact": {
    "phone": "",
    "address": "",
    "hours": ""
  },
  "theme": {
    "preset": "mintNight",
    "mode": "glass",
    "scheme": "light",
    "overrides": {
      "--accentA": "#D4A373",
      "--accentB": "#E9C46A",
      "--bg": "#FFF8F2",
      "--text": "#1F2937",
      "--muted": "#000000",
      "--border": "#F1E3D6",
      "--card": "#FFFFFF",
      "--radius": "28px",
      "--cardBlur": "14px",
      "--shadowY": "20px",
      "--shadowBlur": "90px",
      "--shadowOpacity": "0.18",
      "--glowBlur": "70px",
      "--glowA": "#F3D3BD",
      "--glowB": "#FEF3C7",
      "--fontDisplay": "Playfair Display",
      "--fontBody": "Inter",
      "--heroPattern": ""
    }
  },
  "layout": {
    "showFloatingOrderButton": false,
    "showNavbarCta": false
  },
  "pages": {
    "home": {
      "sections": [
        {
          "id": "hero",
          "enabled": true
        },
        {
          "id": "countdown",
          "enabled": true
        },
        {
          "id": "itinerary",
          "enabled": true
        },
        {
          "id": "benefits",
          "enabled": true
        },
        {
          "id": "gallery",
          "enabled": true
        },
        {
          "id": "bestSellers",
          "enabled": false
        },
        {
          "id": "promoCta",
          "enabled": false
        }
      ]
    },
    "menu": {
      "enabled": false
    },
    "contact": {
      "enabled": false
    },
    "customize": {
      "enabled": true
    }
  },
  "copy": {
    "hero": {
      "badge": "Guardar la fecha · 21 de junio de 2026",
      "titleA": "Lucía",
      "titleHighlight": "&",
      "titleB": "Pedro",
      "subtitle": "¡Nos casamos! Nos haría muchísima ilusión celebrar este día contigo. Aquí tienes toda la info del evento.",
      "primaryCta": {
        "label": "Ver ubicación",
        "href": "https://maps.app.goo.gl/SSQDhXhWR61J4rDz5",
        "newTab": true
      },
      "secondaryCta": {
        "label": "",
        "type": "link",
        "href": "",
        "value": "",
        "message": "",
        "newTab": true
      },
      "imageHint": "Imagen real de la pizza aquí",
      "stats": [],
      "visual": {
        "imageSrc": "",
        "enabled": true,
        "kicker": ""
      },
      "variant": "fullBleed",
      "background": {
        "style": "center",
        "pattern": true
      },
      "quickInfo": {
        "enabled": false
      }
    },
    "benefits": {
      "kicker": "",
      "title": "Detalles",
      "desc": "",
      "items": [
        {
          "title": "Dress code",
          "desc": "Elegante · tonos claros (si te apetece)."
        },
        {
          "title": "Regalos",
          "desc": "Lo más importante es tu presencia. Si quieres, un detalle nos hará ilusión."
        },
        {
          "title": "Fotos",
          "desc": "Habrá fotógrafo, pero si subes stories usa #BodaLuciaPedro"
        }
      ]
    },
    "bestSellers": {
      "kicker": "Componentes",
      "title": "Algunos bloques disponibles",
      "desc": "Ejemplos de secciones listas para usar y adaptar.",
      "items": [
        {
          "name": "Hero avanzado",
          "price": "—",
          "desc": "Headers con animaciones y glows"
        },
        {
          "name": "Landing blocks",
          "price": "—",
          "desc": "Secciones de venta modernas"
        },
        {
          "name": "Footers legales",
          "price": "—",
          "desc": "Cumple normativa sin esfuerzo"
        }
      ],
      "cta": ""
    },
    "promo": {
      "kicker": "Empieza hoy",
      "title": "Crea tu próxima web con Sitecraft",
      "desc": "Duplica el proyecto, cambia el customize y lanza en minutos.",
      "primaryCta": "",
      "secondaryCta": ""
    },
    "menuPage": {
      "kicker": "Carta",
      "title": "Aquí irá la carta dinámica",
      "desc": "De momento lo dejamos vacío. Luego lo conectas a tu app + BBDD y lo pintamos aquí.",
      "placeholderTitle": "Próximamente",
      "placeholderDesc": "Cuando tengas la app de gestión + API, esto mostrará categorías, productos, precios y disponibilidad."
    },
    "contactPage": {
      "kicker": "",
      "title": "Ubicación",
      "desc": "Si tienes dudas, escríbenos.",
      "primaryCta": "Contactar",
      "secondaryCta": "Ver en Github",
      "mapPlaceholder": "Aquí va el mapa (embed)",
      "variant": "split",
      "map": {
        "type": "image",
        "imageSrc": "",
        "enabled": true,
        "embedSrc": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3755.499569586344!2d-3.689876870019901!3d40.452585517764604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4228e2fe54acd3%3A0x7bdf12a106fcb23e!2sSantiago%20Bernab%C3%A9u!5e1!3m2!1ses!2ses!4v1766419634369!5m2!1ses!2ses\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade"
      }
    },
    "footer": {
      "about": "Sitecraft es una plataforma modular para crear webs modernas, escalables y personalizables.",
      "social": {
        "instagram": {
          "enabled": true,
          "url": ""
        },
        "facebook": {
          "enabled": true,
          "url": ""
        },
        "tiktok": {
          "enabled": true,
          "url": ""
        },
        "x": {
          "enabled": true,
          "url": ""
        }
      }
    },
    "gallery": {
      "enabled": true,
      "kicker": "Momentos",
      "title": "Un poquito de nosotros antes del gran día",
      "desc": "",
      "items": [
        {
          "imageSrc": "/demo/gallery/1.jpg",
          "alt": "Imagen",
          "caption": ""
        },
        {
          "imageSrc": "/demo/gallery/2.webp",
          "alt": "Imagen",
          "caption": ""
        },
        {
          "imageSrc": "/demo/gallery/3.webp",
          "alt": "Imagen",
          "caption": ""
        },
        {
          "imageSrc": "/demo/gallery/4.jpeg",
          "alt": "Imagen",
          "caption": ""
        },
        {
          "imageSrc": "/demo/gallery/7.webp",
          "alt": "Imagen",
          "caption": ""
        }
      ]
    },
    "countdown": {
      "enabled": true,
      "kicker": "Cuenta atrás",
      "title": "Falta muy poquito...",
      "dateTime": "2026-06-21T17:58:00",
      "timezone": "",
      "note": "¡Te esperamos para celebrarlo juntos!",
      "location": "Finca Los Olivos - Sevilla"
    },
    "itinerary": {
      "enabled": true,
      "kicker": "Horario",
      "title": "Itinerario del día",
      "desc": "Para que no te pierdas nada 💛",
      "items": [
        {
          "time": "18:00",
          "title": "Ceremonia",
          "desc": "Por favor, llega 15 min antes",
          "location": "Iglesia"
        },
        {
          "time": "19:30",
          "title": "Cóctel",
          "desc": "Brindis, fotos y aperitivos",
          "location": "Jardín"
        },
        {
          "time": "21:00",
          "title": "Banquete",
          "desc": "Cena y sorpresas",
          "location": "Salón principal"
        },
        {
          "time": "23:30",
          "title": "Fiesta",
          "desc": "Bara libre y baile",
          "location": "Zona Dj"
        }
      ]
    }
  }
};