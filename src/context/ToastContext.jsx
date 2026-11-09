import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

const TOAST_META = {
  success: {
    icon: CheckCircle2,
    accent: 'text-accent',
    border: 'border-accent/30',
  },
  error: {
    icon: AlertCircle,
    accent: 'text-red-400',
    border: 'border-red-400/30',
  },
  info: {
    icon: Info,
    accent: 'text-cream/80',
    border: 'border-white/15',
  },
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Map());

  const dismissToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const showToast = useCallback(
    (message, type = 'success') => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      setToasts((current) => [...current.slice(-2), { id, message, type }]);
      const timer = setTimeout(() => dismissToast(id), 3400);
      timers.current.set(id, timer);
      return id;
    },
    [dismissToast],
  );

  useEffect(() => {
    const activeTimers = timers.current;
    return () => {
      activeTimers.forEach((timer) => clearTimeout(timer));
      activeTimers.clear();
    };
  }, []);

  const value = useMemo(() => ({ showToast, dismissToast }), [showToast, dismissToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="false"
        className="pointer-events-none fixed inset-x-4 top-24 z-[130] flex flex-col items-end gap-3 sm:left-auto sm:right-6 sm:top-28 sm:w-[380px]"
      >
        <AnimatePresence initial={false}>
          {toasts.map((toast) => {
            const meta = TOAST_META[toast.type] ?? TOAST_META.info;
            const Icon = meta.icon;
            return (
              <motion.div
                key={toast.id}
                layout
                initial={{ opacity: 0, x: 32, scale: 0.97 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 24, scale: 0.97 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                role="status"
                className={`pointer-events-auto flex w-full items-start gap-3 rounded-xl border ${meta.border} bg-[#111111]/95 p-4 shadow-soft backdrop-blur-xl`}
              >
                <Icon className={`mt-0.5 h-[18px] w-[18px] shrink-0 ${meta.accent}`} strokeWidth={1.7} />
                <p className="flex-1 text-[13px] leading-relaxed text-cream/90">{toast.message}</p>
                <button
                  type="button"
                  onClick={() => dismissToast(toast.id)}
                  className="rounded-full p-0.5 text-muted/60 transition-colors hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                  aria-label="Dismiss notification"
                >
                  <X className="h-4 w-4" strokeWidth={1.7} />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used inside a ToastProvider');
  }
  return context;
}
