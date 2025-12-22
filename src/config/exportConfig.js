function normalize(value) {
  if (value === undefined) return null;
  if (typeof value === "number" && !Number.isFinite(value)) return null;

  if (Array.isArray(value)) return value.map(normalize);

  if (value && typeof value === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) out[k] = normalize(v);
    return out;
  }

  return value;
}

export function toConfigFileString(config) {
  const clean = normalize(config);
  const json = JSON.stringify(clean, null, 2);
  return `export const siteConfig = ${json};`;
}
