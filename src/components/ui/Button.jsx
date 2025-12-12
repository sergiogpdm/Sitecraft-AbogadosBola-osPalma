export default function Button({
  as: Comp = "button",
  variant = "default",
  className = "",
  style,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold transition active:scale-[0.99]";

  const styles = {
    default: "border border-[var(--border)] bg-[var(--card)] hover:bg-white/10",
    ghost: "hover:bg-white/10",
    primary: "text-zinc-950 hover:brightness-110",
  };

  const mergedStyle =
    variant === "primary"
      ? {
          background: "linear-gradient(90deg, var(--accentA), var(--accentB))",
          ...style,
        }
      : style;

  return (
    <Comp className={`${base} ${styles[variant]} ${className}`} style={mergedStyle} {...props} />
  );
}
