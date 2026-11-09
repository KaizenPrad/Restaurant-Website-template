/**
 * Smoothly scrolls to a section while accounting for the fixed navigation bar.
 */
export function scrollToSection(id, offset = 88) {
  if (id === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const element = document.getElementById(id);
  if (!element) return;

  const top = element.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}
