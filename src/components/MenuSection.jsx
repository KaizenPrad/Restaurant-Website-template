import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { MENU_ITEMS } from '../data/menuItems';
import SectionHeading from './ui/SectionHeading';
import MenuCard from './MenuCard';
import Button from './ui/Button';

const gridVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.06 },
  },
};

export default function MenuSection({ onViewMenu }) {
  return (
    <section
      id="menu"
      aria-labelledby="menu-heading"
      className="section-pad relative overflow-hidden border-t border-white/[0.04] bg-coal"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-accent/[0.035] blur-[130px]"
        aria-hidden="true"
      />

      <div className="container relative">
        <SectionHeading
          eyebrow="Chef’s Favorites"
          title={
            <span id="menu-heading">
              Signature <span className="italic text-accent">Collection</span>
            </span>
          }
          description="Handpicked favorites from our menu, crafted with passion and designed to leave a lasting impression."
        />

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12, margin: '0px 0px -80px 0px' }}
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6 xl:grid-cols-4"
        >
          {MENU_ITEMS.map((dish) => (
            <MenuCard key={dish.id} dish={dish} />
          ))}
        </motion.div>

        <div className="mt-11 flex flex-col items-center gap-4">
          <Button variant="secondary" onClick={onViewMenu} className="group">
            View Full Menu
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={1.6}
            />
          </Button>
          <p className="text-[9px] uppercase tracking-[0.24em] text-muted/35">
            Seasonal ingredients · Menu changes nightly
          </p>
        </div>
      </div>
    </section>
  );
}
