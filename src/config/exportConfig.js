export function toConfigFileString(configObj) {
  const json = JSON.stringify(configObj, null, 2);
  return `export const siteConfig = ${json};\n`;
}
