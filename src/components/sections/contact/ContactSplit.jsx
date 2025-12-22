import Container from "../../Container.jsx";
import SectionTitle from "../../SectionTitle.jsx";
import { useContactComputed, ContactInfoCard, ContactMapCard } from "./ContactCommon.jsx";

export default function ContactSplit({ data, preview = false }) {
  const { config, c, map, hasWhatsapp, hasMaps, handle } = useContactComputed(data, preview);

  return (
    <div className="py-16 sm:py-20">
      <Container>
        <SectionTitle kicker={c.kicker} title={c.title} desc={c.desc} />

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <ContactInfoCard c={c} config={config} hasWhatsapp={hasWhatsapp} hasMaps={hasMaps} handle={handle} />
          <ContactMapCard c={c} map={map} />
        </div>
      </Container>
    </div>
  );
}
