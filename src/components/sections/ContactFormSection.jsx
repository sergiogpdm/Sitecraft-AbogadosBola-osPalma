import ContactForm from "../forms/ContactForm.jsx";

export default function ContactFormSection({ data }) {
  return (
    <section className="bg-[var(--bg)] py-16">
      <div className="mx-auto max-w-2xl px-6">
        <ContactForm {...(data || {})} />
      </div>
    </section>
  );
}
