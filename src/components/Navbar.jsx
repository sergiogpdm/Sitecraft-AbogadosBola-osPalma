import { NavLink, Link } from "react-router-dom";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Container from "./Container.jsx";
import Button from "./ui/Button.jsx";
import { useSiteConfig } from "../context/SiteConfigContext.jsx";

const navLink = ({ isActive }) =>
  "text-sm transition " + (isActive ? "text-white" : "text-zinc-300 hover:text-white");

export default function Navbar() {
  const { config } = useSiteConfig();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 10));

  return (
    <motion.header
      className={[
        "fixed inset-x-0 top-0 z-50",
        scrolled ? "border-b border-[var(--border)] bg-zinc-950/70 backdrop-blur-xl" : "bg-transparent",
      ].join(" ")}
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <Container className="h-16 flex items-center justify-between">
        <Link to="/" className="group inline-flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-[var(--border)] bg-[var(--card)]">
            {config.brand.emojiLogo}
          </span>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-wide">{config.brand.name}</div>
            <div className="text-[11px] text-zinc-400 -mt-0.5">{config.brand.tagline}</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          <NavLink to="/" className={navLink}>Inicio</NavLink>
          {config.pages.menu?.enabled ? <NavLink to="/carta" className={navLink}>Carta</NavLink> : null}
          {config.pages.contact?.enabled ? <NavLink to="/contacto" className={navLink}>Contacto</NavLink> : null}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          {config.layout.showNavbarCta ? (
            <Button
              as="a"
              href={config.links.whatsapp}
              target="_blank"
              rel="noreferrer"
              variant="primary"
            >
              Pedir por WhatsApp
            </Button>
          ) : null}
        </div>

        <button
          className="md:hidden rounded-xl border border-[var(--border)] bg-[var(--card)] p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </Container>

      {open ? (
        <div className="md:hidden border-t border-[var(--border)] bg-zinc-950/80 backdrop-blur-xl">
          <Container className="py-4 flex flex-col gap-3">
            <NavLink onClick={() => setOpen(false)} to="/" className={navLink}>Inicio</NavLink>
            {config.pages.menu?.enabled ? (
              <NavLink onClick={() => setOpen(false)} to="/carta" className={navLink}>
                Carta
              </NavLink>
            ) : null}
            {config.pages.contact?.enabled ? (
              <NavLink onClick={() => setOpen(false)} to="/contacto" className={navLink}>
                Contacto
              </NavLink>
            ) : null}

            {config.layout.showNavbarCta ? (
              <div className="pt-2">
                <Button
                  as="a"
                  href={config.links.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full"
                  variant="primary"
                >
                  Pedir por WhatsApp
                </Button>
              </div>
            ) : null}
          </Container>
        </div>
      ) : null}
    </motion.header>
  );
}
