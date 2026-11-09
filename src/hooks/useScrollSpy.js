import { useEffect, useState } from 'react';

/**
 * Tracks which page section is currently in view for navigation highlighting.
 */
export function useScrollSpy(sectionIds, offset = 140) {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  useEffect(() => {
    let frame = null;

    const updateActiveSection = () => {
      frame = null;
      const scrollPosition = window.scrollY + offset;

      let current = sectionIds[0];
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element && element.offsetTop <= scrollPosition) {
          current = id;
        }
      }

      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 120;
      if (nearBottom) current = sectionIds[sectionIds.length - 1];

      setActiveSection((previous) => (previous === current ? previous : current));
    };

    const onScroll = () => {
      if (frame === null) frame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [sectionIds, offset]);

  return activeSection;
}
