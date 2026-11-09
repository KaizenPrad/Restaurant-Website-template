import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Clock, Plus } from 'lucide-react';
import SmartImage from './ui/SmartImage';
import { useCart } from '../context/CartContext';

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function MenuCard({ dish }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const addedTimer = useRef(null);

  useEffect(() => () => window.clearTimeout(addedTimer.current), []);

  const handleAdd = () => {
    addItem(dish.id);
    setAdded(true);
    window.clearTimeout(addedTimer.current);
    addedTimer.current = window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <motion.article
      variants={cardVariants}
      className="group/card relative flex flex-col overflow-hidden rounded-2xl border border-accent/25 bg-card transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-[0_28px_70px_-34px_rgba(0,0,0,1)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <SmartImage
          src={dish.image}
          alt={dish.alt}
          className="h-full w-full"
          imageClassName="transition-transform duration-[1100ms] ease-out group-hover/card:scale-[1.07]"
          sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"
          aria-hidden="true"
        />
        <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-ink/70 px-3 py-1 text-[8.5px] font-semibold uppercase tracking-[0.2em] text-cream/80 backdrop-blur-md">
          {dish.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-[20px] leading-tight text-accent">
            {dish.name}
          </h3>
          <span className="shrink-0 font-serif text-[22px] leading-none text-cream">
            ${dish.price}
          </span>
        </div>

        <p className="mt-2.5 text-[12.5px] leading-[1.75] text-muted/80">
          {dish.description}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-white/[0.06] pt-4">
          <span className="flex items-center gap-1.5 text-[9px] font-medium uppercase tracking-[0.18em] text-muted/45">
            <Clock className="h-3 w-3" strokeWidth={1.5} aria-hidden="true" />
            {dish.prepTime}
          </span>
          <motion.button
            type="button"
            onClick={handleAdd}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 450, damping: 24 }}
            aria-label={
              added
                ? `${dish.name} added to shopping bag`
                : `Add ${dish.name} to shopping bag`
            }
            className={`grid h-10 w-10 place-items-center rounded-full border transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-card ${
              added
                ? 'border-accent bg-accent text-[#140D08]'
                : 'border-accent/40 text-accent hover:bg-accent hover:text-[#140D08]'
            }`}
          >
            <motion.span
              key={added ? 'added' : 'add'}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="grid place-items-center"
            >
              {added ? (
                <Check className="h-4 w-4" strokeWidth={2.2} />
              ) : (
                <Plus className="h-4 w-4" strokeWidth={1.8} />
              )}
            </motion.span>
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
