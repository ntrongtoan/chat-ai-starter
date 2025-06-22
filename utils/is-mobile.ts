export function isMobile() {
  const mediaQuery = window.matchMedia("(max-width: 768px)");
  return mediaQuery.matches;
}
