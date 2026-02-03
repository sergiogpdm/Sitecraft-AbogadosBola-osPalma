import Container from "../components/Container.jsx";
import GlassCard from "../components/GlassCard.jsx";

export default function Legal() {
  return (
    <div className="py-16">
      <Container>
        <GlassCard className="p-8">
          <div className="text-xs text-[var(--muted)]">Legal</div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Aviso Legal</h1>

          <p className="mt-4 text-sm text-[var(--muted)] leading-relaxed">
            En cumplimiento con el deber de información recogido en la normativa vigente,
            se exponen a continuación los datos identificativos del titular de este sitio web.
          </p>

          <div className="mt-8 space-y-4 text-sm text-[var(--muted)] leading-relaxed">
            <Section title="1. Datos identificativos">
              <p>
                <b className="text-[var(--text)]">JOSÉ BOLAÑOS ABOGADOS</b><br />
                CIF: xxxxxxxxxxx<br />
                Domicilio: Avenida de la Estación Nº 6, 9º - 1ª (04005 – Almería)<br />
                Correo electrónico: info@papeles26.es
              </p>
            </Section>

            <Section title="2. Objeto">
              <p>
                El presente Aviso Legal regula el acceso, navegación y uso del sitio web,
                así como las responsabilidades derivadas de la utilización de sus contenidos
                (textos, imágenes, diseños, código fuente, etc.).
              </p>
            </Section>

            <Section title="3. Condiciones de uso">
              <p>
                El acceso y uso de este sitio web atribuye la condición de usuario e implica
                la aceptación plena y sin reservas de las disposiciones incluidas en este Aviso Legal.
                El usuario se compromete a hacer un uso adecuado del sitio conforme a la ley,
                la buena fe y el orden público.
              </p>
            </Section>

            <Section title="4. Propiedad intelectual e industrial">
              <p>
                Todos los contenidos del sitio web, salvo indicación en contrario, son titularidad
                de JOSÉ BOLAÑOS ABOGADOS o de terceros que han autorizado su uso, y están protegidos
                por la normativa de propiedad intelectual e industrial.
              </p>
              <p className="mt-2">
                Queda prohibida la reproducción, distribución o modificación de dichos contenidos
                sin la autorización expresa del titular de los derechos.
              </p>
            </Section>

            <Section title="5. Responsabilidad">
              <p>
                El titular no se hace responsable de los daños o perjuicios que pudieran derivarse
                del uso del sitio web, ni de la falta de disponibilidad o continuidad del mismo.
              </p>
              <p className="mt-2">
                Tampoco se responsabiliza de posibles errores u omisiones en los contenidos ni de
                la presencia de virus u otros elementos que puedan causar alteraciones en los sistemas
                informáticos del usuario.
              </p>
            </Section>

            <Section title="6. Enlaces externos">
              <p>
                Este sitio web puede contener enlaces a páginas de terceros. JOSÉ BOLAÑOS ABOGADOS
                no se responsabiliza de los contenidos, políticas o prácticas de dichos sitios externos.
              </p>
            </Section>

            <Section title="7. Legislación aplicable y jurisdicción">
              <p>
                Las relaciones entre el titular del sitio web y los usuarios se regirán por la normativa
                española vigente. Para la resolución de cualquier conflicto que pudiera surgir, ambas partes
                se someterán a los Juzgados y Tribunales que correspondan conforme a derecho.
              </p>
            </Section>
          </div>
        </GlassCard>
      </Container>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
      <div className="text-sm font-semibold text-[var(--text)]">{title}</div>
      <div className="mt-2">{children}</div>
    </div>
  );
}
