import ContactForm from "../forms/ContactForm.jsx";

export default function ContactFormSection({ data }) {
  return (
    <section className="bg-[var(--bg)] py-16">
      <div className="mx-auto max-w-5xl px-6">
        <ContactForm
          {...(data || {})}

          infoTitle="Contacto directo"
          infoSubtitle="Pulsa para llamar, escribir o abrir la ubicación."
          infoPhoneDisplay="(+34) 614987195"
          infoPhoneTel="+34614987195"
          infoEmail="info@papeles26.es"
          infoAddress="Avda. de la Estación Nº 6 9º 1ª - 04005 – Almería"
          infoMapsUrl="https://maps.app.goo.gl/hdoJ7qvWrTF142u97"

          fields={{ 
            name: true,
            phone: true,
            message: data?.fields?.message === false ? false : true,
          }}
        />
      </div>
    </section>
  );
}
