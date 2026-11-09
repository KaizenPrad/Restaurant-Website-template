import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Plus, Search, SearchX, X } from 'lucide-react';
import { MENU_ITEMS } from '../data/menuItems';
import { useCart } from '../context/CartContext';
import Modal from './ui/Modal';
import SmartImage from './ui/SmartImage';

export default function SearchModal({ open, onClose }) {
  const { addItem } = useCart();
  const [query, setQuery] = useState('');
  const [justAdded, setJustAdded] = useState(null);
  const addedTimer = useRef(null);

  useEffect(() => {
    if (!open) {
      setQuery('');
      setJustAdded(null);
    }
  }, [open]);

  useEffect(() => () => window.clearTimeout(addedTimer.current), []);

  const normalizedQuery = query.trim().toLowerCase();
  const results = normalizedQuery
    ? MENU_ITEMS.filter((dish) => dish.name.toLowerCase().includes(normalizedQuery))
    : MENU_ITEMS;

  const handleAdd = (id) => {
    addItem(id);
    setJustAdded(id);
    window.clearTimeout(addedTimer.current);
    addedTimer.current = window.setTimeout(() => setJustAdded(null), 1300);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      variant="search"
      className="flex max-h-[78dvh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-accent/20 bg-[#0C0C0C] shadow-card"
      labelledBy="search-modal-title"
    >
      <div className="flex items-start justify-between gap-4 px-5 pt-5 sm:px-6 sm:pt-6">
        <div>
          <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-accent/80">
            Maison Savour
          </p>
          <h2
            id="search-modal-title"
            className="mt-1.5 font-serif text-[26px] leading-none text-cream"
          >
            Explore the Menu
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close search"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 text-cream/60 transition-colors hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
        >
          <X className="h-4 w-4" strokeWidth={1.6} />
        </button>
      </div>

      <div className="px-5 pb-5 pt-4 sm:px-6">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-accent/70"
            strokeWidth={1.7}
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search dishes by name..."
            aria-label="Search dishes by name"
            data-autofocus
            className="field py-3.5 pl-11 pr-4 text-[13px] [&::-webkit-search-cancel-button]:hidden"
          />
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto border-t border-white/[0.06] px-2 py-2 sm:px-3">
        <div className="flex items-center justify-between px-3 py-2.5">
          <p className="text-[8.5px] font-semibold uppercase tracking-[0.22em] text-muted/40">
            {normalizedQuery ? `${results.length} result${results.length === 1 ? '' : 's'}` : 'Full menu'}
          </p>
          <p className="text-[8.5px] uppercase tracking-[0.18em] text-muted/30">
            Tap + to add
          </p>
        </div>

        <AnimatePresence mode="popLayout" initial={false}>
          {results.length > 0 ? (
            <ul className="space-y-1.5">
              {results.map((dish) => (
                <motion.li
                  key={dish.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center gap-3.5 rounded-xl border border-transparent px-2 py-2 transition-colors hover:border-white/[0.06] hover:bg-white/[0.02] sm:px-3"
                >
                  <SmartImage
                    src={dish.image}
                    alt={dish.alt}
                    className="h-14 w-14 shrink-0 rounded-lg"
                    sizes="56px"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-serif text-[16px] text-cream">{dish.name}</p>
                    <p className="mt-0.5 text-[8.5px] uppercase tracking-[0.18em] text-muted/40">
                      {dish.category} · {dish.prepTime}
                    </p>
                  </div>
                  <span className="shrink-0 font-serif text-[17px] text-cream/85">
                    ${dish.price}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleAdd(dish.id)}
                    aria-label={`Add ${dish.name} to shopping bag`}
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 ${
                      justAdded === dish.id
                        ? 'border-accent bg-accent text-[#140D08]'
                        : 'border-accent/35 text-accent hover:bg-accent hover:text-[#140D08]'
                    }`}
                  >
                    {justAdded === dish.id ? (
                      <Check className="h-4 w-4" strokeWidth={2} />
                    ) : (
                      <Plus className="h-4 w-4" strokeWidth={1.8} />
                    )}
                  </button>
                </motion.li>
              ))}
            </ul>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center px-6 py-12 text-center"
            >
              <span className="grid h-14 w-14 place-items-center rounded-full border border-white/10 text-muted/40">
                <SearchX className="h-6 w-6" strokeWidth={1.4} />
              </span>
              <p className="mt-5 font-serif text-xl text-cream/85">No dishes found</p>
              <p className="mt-2 max-w-[280px] text-[12px] leading-relaxed text-muted/50">
                We couldn’t find anything matching “{query.trim()}”. Try a different
                dish or browse the full menu.
              </p>
              <button
                type="button"
                onClick={() => setQuery('')}
                className="mt-5 rounded-full border border-accent/35 px-5 py-2.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-accent transition-colors hover:bg-accent hover:text-[#140D08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
              >
                Clear Search
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between border-t border-white/[0.06] px-5 py-3 text-[8.5px] uppercase tracking-[0.18em] text-muted/30 sm:px-6">
        <span>Demo menu · Prices in USD</span>
        <span className="hidden sm:inline">Press Esc to close</span>
      </div>
    </Modal>
  );
}
