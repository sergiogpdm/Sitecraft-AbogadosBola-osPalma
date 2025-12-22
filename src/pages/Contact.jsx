import { useSiteConfig } from "../context/SiteConfigContext.jsx";
import ContactSplit from "../components/sections/contact/ContactSplit.jsx";
import ContactMapLeft from "../components/sections/contact/ContactMapLeft.jsx";
import ContactStacked from "../components/sections/contact/ContactStacked.jsx";
import ContactFullMap from "../components/sections/contact/ContactFullMap.jsx";

const CONTACT_VARIANTS = {
  split: ContactSplit,
  mapLeft: ContactMapLeft,
  stacked: ContactStacked,
  fullMap: ContactFullMap,
};

export default function Contact({ data, preview = false }) {
  const { config } = useSiteConfig();
  if (!config.pages.contact?.enabled) return null;

  const c = data ?? config.copy.contactPage;
  const Variant = CONTACT_VARIANTS[c.variant] || ContactSplit;

  return <Variant data={c} preview={preview} />;
}
