import ContactForm from "../forms/ContactForm";

export const ContactFormBlock = (props) => {
  return (
    <div style={{ padding: props?.padding ?? 0 }}>
      <ContactForm {...props} />
    </div>
  );
};
