import { ArrowUpRight, ChefHat } from 'lucide-react';
import { IMAGES } from '../data/images';
import Reveal from './ui/Reveal';
import SmartImage from './ui/SmartImage';
import CountUp from './ui/CountUp';

const STATS = [
  { value: 12, suffix: '+', label: 'Years of Excellence' },
  { value: 50, suffix: '+', label: 'Signature Dishes' },
  { value: 10, suffix: 'k+', label: 'Happy Guests' },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="section-pad relative overflow-hidden border-t border-white/[0.04]"
    >
      <div
        className="pointer-events-none absolute -left-[15%] top-[20%] h-[560px] w-[560px] rounded-full bg-accent/[0.03] blur-[140px]"
        aria-hidden="true"
      />

      <div className="container relative grid items-center gap-14 lg:grid-cols-2 lg:gap-16 xl:gap-20">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-accent">
              <span className="h-px w-8 bg-accent/50" />
              Our Story
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h2
              id="about-heading"
              className="mt-5 font-serif text-[clamp(2.15rem,4.6vw,3.75rem)] leading-[1.06] tracking-[-0.015em] text-cream"
            >
              Passion in Every{' '}
              <span className="italic text-accent">Plate</span>
            </h2>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-5 max-w-lg text-[14px] leading-[1.9] text-muted sm:text-[15px]">
              At Maison Savour, we believe that great food brings people together.
              Our chefs craft each dish with passion, using the finest ingredients
              to create unforgettable flavors.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-4 max-w-lg text-[13px] leading-[1.9] text-muted/60">
              From the first sear to the final garnish, every detail is considered —
              a quiet devotion to craft that has defined our table since the day we opened.
            </p>
          </Reveal>

          <Reveal delay={0.26}>
            <div className="mt-8 flex items-center gap-4">
              <span className="h-10 w-px bg-gradient-to-b from-accent/60 to-transparent" />
              <div>
                <p className="font-script text-[38px] leading-none text-accent">
                  Maison Savour
                </p>
                <p className="mt-2 text-[8.5px] font-semibold uppercase tracking-[0.28em] text-muted/50">
                  Founder &amp; Executive Chef
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <div className="mt-10 grid grid-cols-3 border-t border-white/[0.08] pt-8">
              {STATS.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`${index === 0 ? 'pr-3' : 'border-l border-white/[0.07] pl-4 sm:pl-6'}`}
                >
                  <p className="font-serif text-[30px] leading-none text-cream sm:text-[38px]">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-2 text-[8.5px] font-medium uppercase leading-relaxed tracking-[0.18em] text-muted/50 sm:text-[9.5px]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="relative">
          <div
            className="absolute -left-4 -top-4 hidden h-28 w-28 rounded-tl-[2rem] border-l border-t border-accent/25 sm:block"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-4 -right-4 hidden h-28 w-28 rounded-br-[2rem] border-b border-r border-accent/25 sm:block"
            aria-hidden="true"
          />

          <div className="grid h-[460px] grid-cols-5 grid-rows-6 gap-3 sm:h-[560px] sm:gap-4 lg:h-[590px]">
            <div className="group relative col-span-3 row-span-6 overflow-hidden rounded-[1.4rem] border border-white/10">
              <SmartImage
                src={IMAGES.aboutChef}
                alt="Executive chef carefully preparing a gourmet dish in the Maison Savour kitchen"
                className="h-full w-full"
                imageClassName="transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                sizes="(min-width: 1024px) 30vw, 55vw"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent"
                aria-hidden="true"
              />
              <div className="absolute inset-x-4 bottom-4 rounded-xl border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-md">
                <p className="flex items-center gap-2 text-[8px] font-semibold uppercase tracking-[0.24em] text-accent">
                  <ChefHat className="h-3 w-3" strokeWidth={1.5} />
                  The Kitchen
                </p>
                <p className="mt-1.5 font-serif text-[15px] leading-tight text-cream">
                  Where craft meets fire
                </p>
              </div>
            </div>

            <div className="group relative col-span-2 row-span-3 overflow-hidden rounded-[1.4rem] border border-white/10">
              <SmartImage
                src={IMAGES.aboutPlating}
                alt="Fine-dining plated salmon with seasonal vegetables"
                className="h-full w-full"
                imageClassName="transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                sizes="(min-width: 1024px) 20vw, 35vw"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 to-transparent"
                aria-hidden="true"
              />
              <span className="absolute bottom-3 left-3 text-[8px] font-semibold uppercase tracking-[0.2em] text-cream/75">
                Fine Dining
              </span>
            </div>

            <div className="group relative col-span-2 row-span-3 overflow-hidden rounded-[1.4rem] border border-white/10">
              <SmartImage
                src={IMAGES.aboutInterior}
                alt="Elegant Maison Savour dining room with warm lighting and set tables"
                className="h-full w-full"
                imageClassName="transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                sizes="(min-width: 1024px) 20vw, 35vw"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 to-transparent"
                aria-hidden="true"
              />
              <span className="absolute bottom-3 left-3 flex items-center gap-1.5 text-[8px] font-semibold uppercase tracking-[0.2em] text-cream/75">
                The Dining Room
                <ArrowUpRight className="h-3 w-3 text-accent" strokeWidth={1.6} />
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
