import Container from "../components/Container.jsx";
import GlassCard from "../components/GlassCard.jsx";

export default function Cookies() {
  return (
    <div className="py-16">
      <Container>
        <GlassCard className="p-8">
          <div className="text-xs text-[var(--muted)]">Legal</div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Política de Cookies</h1>

          <div className="mt-8 space-y-4 text-sm text-[var(--muted)] leading-relaxed">
            <Block title="¿Qué son las cookies?">
              <p>
                Las cookies son pequeños archivos de texto que se almacenan en su dispositivo
                cuando visita una página web. Sirven para garantizar el funcionamiento del
                sitio, mejorar la experiencia de usuario y obtener información estadística.
              </p>
            </Block>

            <Block title="Tipos de cookies utilizadas">
              <ul className="list-disc pl-5 space-y-1">
                <li><b className="text-[var(--text)]">Cookies técnicas:</b> necesarias para el funcionamiento de la web.</li>
                <li><b className="text-[var(--text)]">Cookies de análisis:</b> permiten obtener estadísticas de uso de la web.</li>
              </ul>
            </Block>

            <Block title="Cómo gestionar las cookies">
              <p>
                Puede configurar su navegador para bloquear o eliminar las cookies. Sin
                embargo, algunas funcionalidades del sitio pueden verse afectadas.
              </p>
            </Block>

            <Block title="Base legal">
              <p>
                El uso de cookies técnicas se basa en el interés legítimo del titular. Las
                cookies analíticas o no esenciales se utilizarán únicamente con el
                consentimiento del usuario.
              </p>
            </Block>
          </div>
        </GlassCard>
      </Container>
    </div>
  );
}

function Block({ title, children }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
      <div className="text-sm font-semibold text-[var(--text)]">{title}</div>
      <div className="mt-2">{children}</div>
    </div>
  );
}
