import { motion } from 'framer-motion';
import { ArrowUpRight, ShoppingBag, UtensilsCrossed } from 'lucide-react';
import { IMAGES } from '../data/images';
import { scrollToSection } from '../utils/scrollToSection';
import Button from './ui/Button';
import SmartImage from './ui/SmartImage';
import Seal from './ui/Seal';
import TrustIndicators from './TrustIndicators';

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

function Sprig({ className = '' }) {
  return (
    <svg
      viewBox="0 0 120 160"
      fill="none"
      aria-hidden="true"
      className={className}
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
    >
      <path d="M61 156C61 110 58 72 48 34C44 18 36 8 24 2" />
      <path d="M55 118C42 114 30 104 24 90C40 90 52 100 55 118Z" />
      <path d="M53 96C65 92 76 82 80 68C65 69 55 80 53 96Z" />
      <path d="M48 73C37 70 27 61 23 49C36 49 46 58 48 73Z" />
      <path d="M44 52C55 48 64 39 67 27C54 28 46 38 44 52Z" />
      <path d="M36 26C28 23 21 16 18 7C28 8 35 15 36 26Z" />
    </svg>
  );
}

export default function Hero({ onReserve }) {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-10 pt-28 sm:pt-32 lg:pb-14 lg:pt-36"
      aria-labelledby="hero-heading"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -right-[18%] -top-[22%] h-[720px] w-[720px] rounded-full bg-accent/[0.055] blur-[130px]" />
        <div className="absolute -bottom-[30%] -left-[18%] h-[600px] w-[600px] rounded-full bg-accent-soft/[0.03] blur-[130px]" />
        <div className="absolute inset-y-0 left-1/2 hidden w-px bg-gradient-to-b from-transparent via-white/[0.035] to-transparent lg:block" />
        <Sprig className="absolute bottom-8 right-[4%] hidden h-40 w-28 rotate-[10deg] text-accent/15 lg:block" />
        <span className="absolute right-[14%] top-[22%] h-1.5 w-1.5 rounded-full bg-accent/60" />
        <span className="absolute left-[46%] top-[64%] h-1 w-1 rounded-full bg-accent/40" />
      </div>

      <div className="container relative z-10">
        <div className="grid items-center gap-14 lg:grid-cols-[1.04fr_0.96fr] lg:gap-8 xl:gap-12">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-[620px]"
          >
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.34em] text-accent">
                <span className="h-px w-9 bg-accent/50" />
                Exceptional Cuisine
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              id="hero-heading"
              className="mt-6 font-serif text-[clamp(2.85rem,6.3vw,5.55rem)] font-normal leading-[0.98] tracking-[-0.025em] text-cream"
            >
              <span className="block">Taste Crafted</span>
              <span className="mt-1 block">
                to{' '}
                <span className="relative inline-block italic text-accent">
                  Perfection
                  <span className="absolute -bottom-1 left-0 h-px w-[92%] bg-gradient-to-r from-accent/60 to-transparent" />
                </span>
              </span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 max-w-md text-[14px] leading-[1.9] text-muted sm:text-[15px]"
            >
              Crafting Exceptional Coffee Experiences, One Cup at a Time.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4"
            >
              <Button
                onClick={() => scrollToSection('menu')}
                size="lg"
                className="group"
              >
                <ShoppingBag className="h-3.5 w-3.5" strokeWidth={1.8} />
                Order Now
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={onReserve}
                className="group"
              >
                Reserve Table
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.7}
                />
              </Button>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-10 flex items-center gap-5"
            >
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-full border border-accent/25 bg-accent/[0.06] text-accent">
                  <UtensilsCrossed className="h-3.5 w-3.5" strokeWidth={1.5} />
                </span>
                <p className="text-[9px] font-semibold uppercase leading-relaxed tracking-[0.24em] text-muted/70">
                  Fine Dining
                  <span className="mt-0.5 block font-normal tracking-[0.18em] text-muted/40">
                    Düsseldorf · Est. 2024
                  </span>
                </p>
              </div>
              <span className="h-8 w-px bg-white/[0.08]" />
              <p className="text-[9px] uppercase leading-relaxed tracking-[0.22em] text-muted/50">
                Chef-led kitchen
                <span className="mt-0.5 block tracking-[0.18em] text-muted/35">
                  Seasonal menus
                </span>
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.05, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[520px] lg:max-w-[560px]"
          >
            <div className="relative aspect-square w-full">
              <div
                className="absolute left-1/2 top-1/2 h-[108%] w-[108%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/15"
                aria-hidden="true"
              />
              <div
                className="absolute left-1/2 top-1/2 h-[118%] w-[118%] -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full border border-dashed border-accent/[0.11] motion-reduce:animate-none"
                aria-hidden="true"
              />

              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 7,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'easeInOut',
                }}
                className="relative h-full w-full"
              >
                <div className="absolute inset-6 rounded-full bg-accent/10 blur-3xl" aria-hidden="true" />

                <div className="relative h-full w-full rounded-full border border-[rgba(217,130,54,0.45)] p-2 shadow-[0_45px_120px_-40px_rgba(0,0,0,0.95)] sm:p-3">
                  <SmartImage
                    src={IMAGES.heroDish}
                    alt="Premium grilled steak with colorful seasonal vegetables served on a dark ceramic plate"
                    loading="eager"
                    fetchpriority="high"
                    className="h-full w-full rounded-full border border-white/[0.04]"
                    imageClassName="scale-[1.02] transition-transform duration-[1600ms] ease-out hover:scale-[1.08]"
                    sizes="(min-width: 1024px) 45vw, 90vw"
                  />
                  <div
                    className="pointer-events-none absolute inset-2 rounded-full bg-gradient-to-t from-black/55 via-transparent to-black/10 sm:inset-3"
                    aria-hidden="true"
                  />
                </div>

                <div className="absolute -right-1 bottom-[18%] flex items-center gap-3 rounded-2xl border border-accent/25 bg-[#0E0E0E]/90 px-4 py-3 shadow-soft backdrop-blur-xl sm:right-2">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-accent/10 text-accent">
                    <UtensilsCrossed className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="text-[8px] font-semibold uppercase tracking-[0.24em] text-muted/60">
                      Chef’s Signature
                    </p>
                    <p className="mt-0.5 font-serif text-[15px] leading-none text-cream">
                      Angus Steak
                    </p>
                  </div>
                </div>

                <Seal className="absolute -bottom-3 -left-1 h-[92px] w-[92px] sm:h-[112px] sm:w-[112px]" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <TrustIndicators />
        </motion.div>
      </div>
    </section>
  );
}
