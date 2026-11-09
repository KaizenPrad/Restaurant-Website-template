import { motion } from 'framer-motion';

const VARIANTS = {
  primary:
    'bg-accent text-[#140D08] shadow-[0_14px_35px_-16px_rgba(217,130,54,0.65)] hover:bg-accent-light',
  secondary:
    'border border-accent/45 bg-transparent text-cream hover:border-accent hover:bg-accent/[0.07]',
  dark:
    'border border-white/10 bg-panel/80 text-cream hover:border-accent/45 hover:bg-panel',
  ghost: 'bg-transparent text-cream/80 hover:text-accent',
};

const SIZES = {
  sm: 'px-5 py-2.5 text-[10px]',
  md: 'px-7 py-3.5 text-[10.5px]',
  lg: 'px-8 py-4 text-[11px]',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  ...props
}) {
  return (
    <motion.button
      type={type}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 420, damping: 28 }}
      className={`inline-flex items-center justify-center gap-2.5 rounded-full font-semibold uppercase tracking-[0.22em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:pointer-events-none disabled:opacity-55 ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
