import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Loader2,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { scrollToSection } from '../utils/scrollToSection';
import Modal from './ui/Modal';
import SmartImage from './ui/SmartImage';

export default function CartDrawer({ open, onClose }) {
  const { items, count, subtotal, updateQuantity, removeItem, clearCart } = useCart();
  const { showToast } = useToast();
  const [processing, setProcessing] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  useEffect(() => {
    if (!open) setProcessing(false);
  }, [open]);

  const handleBrowseMenu = () => {
    onClose();
    window.setTimeout(() => scrollToSection('menu'), 160);
  };

  const handleCheckout = () => {
    if (items.length === 0 || processing) return;
    setProcessing(true);
    timerRef.current = window.setTimeout(() => {
      setProcessing(false);
      clearCart();
      onClose();
      showToast(
        'Demo checkout complete — no payment was processed. Thank you for visiting Maison Savour.',
        'success',
      );
    }, 950);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      variant="drawer"
      className="flex h-full w-full max-w-[440px] flex-col border-l border-accent/20 bg-[#0A0A0A] shadow-card"
      labelledBy="cart-drawer-title"
    >
      <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-5 sm:px-6">
        <div>
          <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-accent/80">
            Your Selection
          </p>
          <h2
            id="cart-drawer-title"
            className="mt-1.5 flex items-baseline gap-2 font-serif text-[26px] leading-none text-cream"
          >
            Your Bag
            <span className="text-[15px] italic text-accent">({count})</span>
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close shopping bag"
          className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-cream/60 transition-colors hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
        >
          <X className="h-[18px] w-[18px]" strokeWidth={1.6} />
        </button>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
          <span className="relative grid h-24 w-24 place-items-center rounded-full border border-accent/20 bg-accent/[0.04] text-accent">
            <span
              className="absolute inset-3 rounded-full border border-dashed border-accent/20"
              aria-hidden="true"
            />
            <ShoppingBag className="h-8 w-8" strokeWidth={1.2} />
          </span>
          <h3 className="mt-7 font-serif text-2xl text-cream">Your bag is empty</h3>
          <p className="mt-3 max-w-[260px] text-[12.5px] leading-[1.8] text-muted/60">
            Explore the signature collection and add something unforgettable to
            your evening.
          </p>
          <button
            type="button"
            onClick={handleBrowseMenu}
            className="mt-7 inline-flex items-center gap-2 rounded-full border border-accent/45 px-6 py-3 text-[9.5px] font-semibold uppercase tracking-[0.22em] text-cream transition-colors duration-300 hover:bg-accent hover:text-[#140D08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          >
            Browse the Menu
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.8} />
          </button>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
            <ul className="space-y-3">
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.li
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 24, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="flex gap-3.5 overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.015] p-3"
                  >
                    <SmartImage
                      src={item.image}
                      alt={item.alt}
                      className="h-[76px] w-[76px] shrink-0 rounded-lg"
                      sizes="76px"
                    />
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate font-serif text-[15px] text-cream">
                            {item.name}
                          </p>
                          <p className="mt-0.5 text-[8.5px] uppercase tracking-[0.18em] text-muted/40">
                            {item.category}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          aria-label={`Remove ${item.name} from bag`}
                          className="shrink-0 rounded-full p-1 text-muted/35 transition-colors hover:text-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                        >
                          <Trash2 className="h-3.5 w-3.5" strokeWidth={1.5} />
                        </button>
                      </div>

                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center rounded-full border border-white/10">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            aria-label={`Decrease quantity of ${item.name}`}
                            className="grid h-7 w-7 place-items-center rounded-full text-cream/60 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/60"
                          >
                            <Minus className="h-3 w-3" strokeWidth={1.8} />
                          </button>
                          <span className="w-6 text-center text-[11px] font-medium text-cream">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label={`Increase quantity of ${item.name}`}
                            className="grid h-7 w-7 place-items-center rounded-full text-cream/60 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/60"
                          >
                            <Plus className="h-3 w-3" strokeWidth={1.8} />
                          </button>
                        </div>
                        <p className="font-serif text-[16px] text-cream">
                          ${item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>

            <p className="mt-5 flex items-center justify-center gap-2 text-[9px] uppercase tracking-[0.2em] text-muted/30">
              <span className="h-px w-5 bg-white/10" />
              Crafted fresh to order
              <span className="h-px w-5 bg-white/10" />
            </p>
          </div>

          <div className="border-t border-white/[0.07] bg-white/[0.015] px-5 py-5 sm:px-6">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted/60">
                Subtotal
              </span>
              <span className="font-serif text-[26px] leading-none text-cream">
                ${subtotal}
              </span>
            </div>
            <p className="mt-2 text-[9px] leading-relaxed text-muted/35">
              Taxes and service charges calculated at checkout.
            </p>

            <button
              type="button"
              onClick={handleCheckout}
              disabled={processing}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#140D08] transition-colors duration-300 hover:bg-accent-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A] disabled:opacity-75"
            >
              {processing ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={2} />
                  Confirming
                </>
              ) : (
                <>
                  Proceed to Checkout
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.8} />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="mt-2.5 w-full rounded-full py-2.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-muted/45 transition-colors hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
            >
              Continue Browsing
            </button>

            <p className="mt-1.5 text-center text-[8.5px] uppercase tracking-[0.18em] text-muted/25">
              Demo checkout · No payment will be processed
            </p>
          </div>
        </>
      )}
    </Modal>
  );
}
