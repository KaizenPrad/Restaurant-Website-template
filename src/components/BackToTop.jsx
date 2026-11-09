import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 640);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 14, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.92 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="fixed bottom-5 right-5 z-40 grid h-11 w-11 place-items-center rounded-full border border-accent/35 bg-ink/85 text-accent shadow-soft backdrop-blur-md transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-[#140D08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 sm:bottom-7 sm:right-7"
        >
          <ArrowUp className="h-4 w-4" strokeWidth={1.7} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
