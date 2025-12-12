import Container from "./Container.jsx";
import { useSiteConfig } from "../context/SiteConfigContext.jsx";

export default function Footer() {
  const { config } = useSiteConfig();

  return (
    <footer className="border-t border-[var(--border)] bg-zinc-950">
      <Container className="py-10 grid gap-8 sm:grid-cols-2">
        <div className="space-y-2">
          <div className="text-sm font-semibold">{config.brand.name}</div>
          <p className="text-sm text-zinc-400">{config.copy.footer.about}</p>
          <p className="text-xs text-zinc-500">© {new Date().getFullYear()} • Todos los derechos reservados</p>
        </div>

        <div className="sm:text-right space-y-2">
          <div className="text-sm font-semibold">Horario</div>
          <p className="text-sm text-zinc-400">{config.contact.hours}</p>
          <p className="text-sm text-zinc-400">📍 {config.contact.address} • 📞 {config.contact.phone}</p>
        </div>
      </Container>
    </footer>
  );
}
