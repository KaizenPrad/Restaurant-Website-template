import { useEffect, useMemo, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  ArrowUpRight,
  Clock,
  MapPin,
  Menu,
  Phone,
  Search,
  ShoppingBag,
  UserRound,
  X,
} from 'lucide-react';
import { NAV_LINKS, CONTACT } from '../data/site';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { useCart } from '../context/CartContext';
import { scrollToSection } from '../utils/scrollToSection';
import Logo from './ui/Logo';
import Button from './ui/Button';
import Modal from './ui/Modal';

const SECTION_IDS = NAV_LINKS.map((link) => link.id);

function IconButton({ label, children, onClick, badge, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`relative grid h-9 w-9 place-items-center rounded-full text-cream/70 transition-all duration-300 hover:bg-white/[0.04] hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 sm:h-10 sm:w-10 ${className}`}
    >
      {children}
      {badge !== undefined && badge > 0 && (
        <motion.span
          key={badge}
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 22 }}
          aria-live="polite"
          className="absolute -right-0.5 -top-0.5 grid h-[17px] min-w-[17px] place-items-center rounded-full bg-accent px-1 text-[9px] font-bold leading-none text-[#140D08] ring-2 ring-ink"
        >
          {badge > 9 ? '9+' : badge}
        </motion.span>
      )}
    </button>
  );
}

export default function Navbar({ onOpenSearch, onOpenCart, onOpenAccount, onReserve }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count } = useCart();
  const activeSection = useScrollSpy(SECTION_IDS);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  const activeLabel = useMemo(
    () => NAV_LINKS.find((link) => link.id === activeSection)?.label ?? 'Home',
    [activeSection],
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleNavClick = (event, id) => {
    event.preventDefault();
    scrollToSection(id);
  };

  const handleMobileNavClick = (event, id) => {
    event.preventDefault();
    setMobileOpen(false);
    window.setTimeout(() => scrollToSection(id), 90);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || mobileOpen
            ? 'border-b border-white/[0.06] bg-ink/85 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="container grid h-[72px] grid-cols-[auto_1fr] items-center gap-4 sm:h-[78px] lg:grid-cols-[1fr_auto_1fr]">
          <Logo />

          <nav
            aria-label="Primary navigation"
            className="hidden items-center justify-center gap-7 lg:flex xl:gap-9"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(event) => handleNavClick(event, link.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`group relative py-2 text-[10.5px] font-semibold uppercase tracking-[0.24em] transition-colors duration-300 ${
                    isActive ? 'text-accent' : 'text-cream/65 hover:text-cream'
                  }`}
                >
                  {link.label}
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active-indicator"
                      className="absolute inset-x-0 -bottom-0.5 mx-auto h-px w-5 bg-accent"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-0.5 mx-auto h-px w-0 bg-cream/40 transition-all duration-300 group-hover:w-4"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center justify-end gap-0.5 sm:gap-1">
            <IconButton label="Search the menu" onClick={onOpenSearch}>
              <Search className="h-[17px] w-[17px]" strokeWidth={1.6} />
            </IconButton>
            <IconButton label={`Open shopping bag, ${count} items`} onClick={onOpenCart} badge={count}>
              <ShoppingBag className="h-[17px] w-[17px]" strokeWidth={1.6} />
            </IconButton>
            <IconButton label="Open guest account" onClick={onOpenAccount}>
              <UserRound className="h-[17px] w-[17px]" strokeWidth={1.6} />
            </IconButton>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              className="ml-0.5 grid h-9 w-9 place-items-center rounded-full text-cream transition-colors hover:bg-white/[0.04] hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 lg:hidden"
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <motion.span
          style={{ scaleX: progress }}
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-accent/0 via-accent/60 to-accent/0"
          aria-hidden="true"
        />
      </header>

      <Modal
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        variant="drawer"
        className="flex h-full w-[88%] max-w-[380px] flex-col border-l border-accent/20 bg-[#0B0B0B]"
        labelledBy="mobile-nav-title"
      >
        <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-5">
          <Logo
            onClick={() => {
              setMobileOpen(false);
              window.setTimeout(() => scrollToSection('home'), 90);
            }}
          />
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation menu"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-cream/70 transition-colors hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          >
            <X className="h-[18px] w-[18px]" strokeWidth={1.6} />
          </button>
        </div>

        <nav
          aria-label="Mobile navigation"
          className="flex flex-1 flex-col overflow-y-auto px-6 py-7"
        >
          <h2 id="mobile-nav-title" className="sr-only">
            Navigation
          </h2>
          <ul className="space-y-1">
            {NAV_LINKS.map((link, index) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(event) => handleMobileNavClick(event, link.id)}
                    aria-current={isActive ? 'page' : undefined}
                    className="group flex items-baseline gap-4 border-b border-white/[0.05] py-4"
                  >
                    <span className="text-[9px] font-semibold tracking-[0.2em] text-accent/60">
                      0{index + 1}
                    </span>
                    <span
                      className={`font-serif text-[28px] leading-none transition-colors duration-300 ${
                        isActive
                          ? 'text-accent'
                          : 'text-cream/85 group-hover:text-cream'
                      }`}
                    >
                      {link.label}
                    </span>
                    <ArrowUpRight
                      className={`ml-auto h-4 w-4 transition-all duration-300 ${
                        isActive
                          ? 'text-accent'
                          : 'translate-y-1 text-transparent group-hover:translate-y-0 group-hover:text-accent'
                      }`}
                      strokeWidth={1.4}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 space-y-3 text-[12px] text-muted">
            <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-accent/70">
              Reservations
            </p>
            <a
              href={`tel:${CONTACT.phone.replace(/[^+\d]/g, '')}`}
              className="flex items-center gap-3 transition-colors hover:text-cream"
            >
              <Phone className="h-3.5 w-3.5 text-accent" strokeWidth={1.6} />
              {CONTACT.phone}
            </a>
            <p className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" strokeWidth={1.6} />
              {CONTACT.address}
            </p>
            <p className="flex items-center gap-3">
              <Clock className="h-3.5 w-3.5 text-accent" strokeWidth={1.6} />
              {CONTACT.hours}
            </p>
          </div>
        </nav>

        <div className="border-t border-white/[0.06] p-6">
          <Button
            onClick={() => {
              setMobileOpen(false);
              window.setTimeout(onReserve, 120);
            }}
            className="w-full"
            size="sm"
          >
            Reserve a Table
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.8} />
          </Button>
          <p className="mt-4 text-center text-[9px] uppercase tracking-[0.24em] text-muted/45">
            Currently viewing · {activeLabel}
          </p>
        </div>
      </Modal>
    </>
  );
}
