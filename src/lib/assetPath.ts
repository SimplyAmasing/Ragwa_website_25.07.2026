/**
 * Turns a root-relative static asset path (e.g. "/categories/01.png", one of
 * the bundled files under public/) into one that respects Vite's `base`
 * config. GitHub Pages serves this site under a subpath
 * (/Ragwa_website_25.07.2026/), not the domain root, so a hardcoded leading
 * "/..." string 404s in production even though it resolves fine on
 * localhost's own root-served dev server. Vite-processed imports (import img
 * from '...') get this for free; a plain string literal referencing
 * public/ does not.
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL // e.g. "/" locally, "/Ragwa_website_25.07.2026/" on Pages
  return `${base.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`
}
