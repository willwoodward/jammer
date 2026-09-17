// Builds the URL a QR code points at. The app uses HashRouter and is served
// from /jammer/ on GitHub Pages, so the join route lives after the hash.
export function joinUrl(code: string): string {
  return `${window.location.origin}${import.meta.env.BASE_URL}#/join?auto=${encodeURIComponent(code)}`
}
