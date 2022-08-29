import { randomBytes } from "crypto"; // TODO Node v17+ only?

function generateNonce() {
  return randomBytes(16).toString("base64");
}

export function generateCSP() {
  if (process.env.NODE_ENV === "development") {
    return { csp: undefined, nonce: undefined };
  }
  const nonce = generateNonce();
  return {
    csp: `default-src 'self'; script-src 'nonce-${nonce}' 'self' 'strict-dynamic'; style-src 'self' fonts.googleapis.com; font-src fonts.gstatic.com;`,
    nonce,
  };
}
