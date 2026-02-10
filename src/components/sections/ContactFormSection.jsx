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
          infoAddress="Av. de la Estación, 6, 9-1, 04005 Almería"
          infoMapsUrl="https://maps.app.goo.gl/ybsPTQMxcBcF5ttL6"

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
