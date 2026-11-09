import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const WRAPPER_CLASSES = {
  center: 'items-center justify-center p-4 sm:p-6',
  search: 'items-start justify-center px-4 pb-8 pt-[9vh] sm:pt-[12vh]',
  drawer: 'items-stretch justify-end',
};

const PANEL_MOTION = {
  center: {
    initial: { opacity: 0, y: 26, scale: 0.97 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 18, scale: 0.98 },
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
  },
  search: {
    initial: { opacity: 0, y: -18, scale: 0.985 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -12, scale: 0.99 },
    transition: { duration: 0.36, ease: [0.22, 1, 0.36, 1] },
  },
  drawer: {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '100%' },
    transition: { duration: 0.46, ease: [0.32, 0.72, 0, 1] },
  },
};

export default function Modal({
  open,
  onClose,
  children,
  variant = 'center',
  className = '',
  labelledBy,
  describedBy,
}) {
  const panelRef = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (!open) return undefined;

    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const focusTimer = window.setTimeout(() => {
      const panel = panelRef.current;
      if (!panel) return;
      const autoFocus = panel.querySelector('[data-autofocus]');
      const firstFocusable = panel.querySelector(FOCUSABLE);
      (autoFocus || firstFocusable || panel).focus({ preventScroll: true });
    }, 70);

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeRef.current?.();
        return;
      }

      if (event.key !== 'Tab') return;

      const panel = panelRef.current;
      if (!panel) return;
      const focusable = Array.from(panel.querySelectorAll(FOCUSABLE)).filter(
        (node) =>
          !node.hasAttribute('disabled') &&
          node.getAttribute('aria-hidden') !== 'true' &&
          (node.offsetWidth > 0 || node.offsetHeight > 0 || node === panel),
      );

      if (focusable.length === 0) {
        event.preventDefault();
        panel.focus({ preventScroll: true });
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus({ preventScroll: true });
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus({ preventScroll: true });
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
        previouslyFocused.focus({ preventScroll: true });
      }
    };
  }, [open]);

  const panelMotion = PANEL_MOTION[variant];

  return createPortal(
    <AnimatePresence>
      {open && (
        <div
          className={`fixed inset-0 z-[100] flex ${WRAPPER_CLASSES[variant]}`}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => closeRef.current?.()}
            className="absolute inset-0 bg-[#040404]/80 backdrop-blur-[6px]"
            aria-hidden="true"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            aria-describedby={describedBy}
            tabIndex={-1}
            {...panelMotion}
            className={`relative z-10 outline-none ${className}`}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
