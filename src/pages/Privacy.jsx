import Container from "../components/Container.jsx";
import GlassCard from "../components/GlassCard.jsx";

export default function Privacy() {
  return (
    <div className="py-16">
      <Container>
        <GlassCard className="p-8">
          <div className="text-xs text-[var(--muted)]">Legal</div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Política de Protección de Datos
          </h1>

          <div className="mt-8 space-y-4 text-sm text-[var(--muted)] leading-relaxed">
            <Block title="Responsable del Tratamiento">
              <p>
                <b className="text-[var(--text)]">
                  JOSÉ BOLAÑOS ABOGADOS (en adelante, “el Responsable”)
                </b>
                <br />
                NIF: 06228945Q
                <br />
                Domicilio: Avenida de la Estación Nº 6, 9º - 1ª (04005 – Almería)
                <br />
                Email de contacto: info@papeles26.es
              </p>
            </Block>

            <Block title="Delegado de Protección de Datos">
              <p>
                Puede contactar con el Delegado de Protección de Datos escribiendo a{" "}
                info@papeles26.es e indicando la referencia{" "}
                <b className="text-[var(--text)]">
                  “Delegado de Protección de Datos”
                </b>.
              </p>
            </Block>

            <Block title="Alcance">
              <p>
                Esta política se aplica exclusivamente a los datos recabados a través de los
                formularios y canales digitales habilitados en la página web.
              </p>
            </Block>

            <Block title="Procedencia y categoría de datos">
              <p>
                Los datos personales tratados son únicamente los facilitados por el usuario
                mediante formularios o canales digitales. No se obtienen datos de otras fuentes.
              </p>
              <p className="mt-2">
                Categorías de datos tratados: nombre, apellidos, email y cualquier otro dato
                personal que el usuario incluya en el mensaje.
              </p>
            </Block>

            <Block title="Finalidad del tratamiento">
              <p>
                Atender de manera eficaz y personalizada las consultas y solicitudes de
                información enviadas a través de los formularios y canales digitales.
              </p>
              <p className="mt-2">
                No se realizan transferencias internacionales de datos ni decisiones
                automatizadas o elaboración de perfiles.
              </p>
            </Block>

            <Block title="Legitimación">
              <p>
                La base legal para el tratamiento es la ejecución de medidas precontractuales
                o contractuales a solicitud del interesado, así como el interés legítimo del
                responsable del tratamiento.
              </p>
            </Block>

            <Block title="Conservación de los datos">
              <p>
                Los datos se conservarán durante el tiempo necesario para atender la solicitud.
                Posteriormente, se mantendrán bloqueados durante los plazos legales exigidos
                para atender posibles responsabilidades y, finalmente, serán eliminados.
              </p>
            </Block>

            <Block title="Destinatarios">
              <p>
                Los datos podrán ser tratados por proveedores de servicios contratados por
                el Responsable cuando sea necesario, siempre bajo contrato y con las
                garantías legales correspondientes. No se cederán datos a terceros salvo
                obligación legal.
              </p>
            </Block>

            <Block title="Derechos del usuario">
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <b className="text-[var(--text)]">Derecho de acceso:</b> Derecho a conocer
                  qué tipo de datos estamos tratando y las características de los tratamientos
                  que estamos llevando a cabo.
                </li>
                <li>
                  <b className="text-[var(--text)]">Derecho de rectificación:</b> Derecho a
                  solicitar la modificación de tus datos personales por ser éstos inexactos,
                  no veraces o desactualizados.
                </li>
                <li>
                  <b className="text-[var(--text)]">Derecho de oposición:</b> Derecho a
                  solicitar que no se traten tus datos personales para determinadas finalidades.
                </li>
                <li>
                  <b className="text-[var(--text)]">Derecho de supresión:</b> Derecho a
                  solicitar la supresión de tus datos personales cuando el tratamiento ya no
                  resulte necesario.
                </li>
                <li>
                  <b className="text-[var(--text)]">Derecho a la limitación del tratamiento:</b>{" "}
                  Derecho a solicitar la limitación del tratamiento de tus datos, únicamente
                  para su conservación para el ejercicio o la defensa de reclamaciones,
                  atención a requerimientos judiciales o a exigencias legales.
                </li>
                <li>
                  <b className="text-[var(--text)]">Derecho a la portabilidad:</b> Derecho a
                  solicitar la portabilidad de los datos que nos hayas facilitado, para
                  recibirlos en un formato estructurado, de uso común y lectura mecánica, y a
                  que se transmitan a otro responsable.
                </li>
                <li>
                  <b className="text-[var(--text)]">Revocación del consentimiento:</b> En
                  cualquier momento puedes revocar el consentimiento que hayas prestado, sin
                  ningún tipo de detrimento o perjuicio.
                </li>
                <li>
                  <b className="text-[var(--text)]">Presentación de una reclamación:</b> En
                  cualquier momento puedes presentar reclamación ante la autoridad de control
                  competente (en España, la Agencia Española de Protección de Datos).
                </li>
              </ul>

              <p className="mt-3">
                Para el ejercicio de cualquiera de los derechos enunciados, puedes dirigir tu
                solicitud mediante escrito dirigido al responsable en la dirección de correo
                electrónico{" "}
                <b className="text-[var(--text)]">info@papeles26.es</b>.
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
