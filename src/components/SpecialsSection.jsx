import { ArrowUpRight, Check, Wine } from 'lucide-react';
import { SPECIAL_MENU } from '../data/menuItems';
import { scrollToSection } from '../utils/scrollToSection';
import Reveal from './ui/Reveal';
import SmartImage from './ui/SmartImage';
import Button from './ui/Button';

export default function SpecialsSection({ onReserve }) {
  return (
    <section id="specials" aria-labelledby="specials-heading" className="relative pb-20 sm:pb-24 lg:pb-32">
      <div className="container">
        <Reveal>
          <div className="relative overflow-hidden rounded-[1.75rem] border border-accent/20 bg-panel">
            <div className="pointer-events-none absolute -right-20 -top-24 h-[380px] w-[380px] rounded-full bg-accent/[0.06] blur-[100px]" aria-hidden="true" />

            <div className="grid lg:grid-cols-[1.02fr_1fr]">
              <div className="group relative min-h-[300px] overflow-hidden sm:min-h-[380px] lg:min-h-[560px]">
                <SmartImage
                  src={SPECIAL_MENU.image}
                  alt={SPECIAL_MENU.alt}
                  className="absolute inset-0 h-full w-full"
                  imageClassName="transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-black/10 lg:to-panel"
                  aria-hidden="true"
                />

                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-accent/35 bg-ink/75 px-3.5 py-1.5 backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="text-[8.5px] font-semibold uppercase tracking-[0.22em] text-cream/85">
                    Limited Seats
                  </span>
                </div>

                <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 lg:hidden">
                  <div>
                    <p className="text-[8px] font-semibold uppercase tracking-[0.24em] text-accent">
                      Friday &amp; Saturday
                    </p>
                    <p className="mt-1 font-serif text-lg text-cream">Five courses. One table.</p>
                  </div>
                </div>
              </div>

              <div className="relative flex flex-col justify-center p-7 sm:p-10 lg:p-14">
                <Reveal>
                  <span className="inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-accent">
                    <span className="h-px w-8 bg-accent/50" />
                    {SPECIAL_MENU.eyebrow}
                  </span>
                </Reveal>

                <Reveal delay={0.07}>
                  <h2
                    id="specials-heading"
                    className="mt-5 font-serif text-[clamp(1.9rem,3.4vw,2.9rem)] leading-[1.08] tracking-[-0.015em] text-cream"
                  >
                    The Chef’s Table{' '}
                    <span className="italic text-accent">Experience</span>
                  </h2>
                </Reveal>

                <Reveal delay={0.13}>
                  <p className="mt-4 max-w-md text-[13px] leading-[1.9] text-muted/80">
                    {SPECIAL_MENU.description}
                  </p>
                </Reveal>

                <Reveal delay={0.19}>
                  <ul className="mt-7 space-y-3">
                    {SPECIAL_MENU.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-center gap-3 text-[12px] text-cream/75">
                        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-accent/30 text-accent">
                          <Check className="h-2.5 w-2.5" strokeWidth={2.4} />
                        </span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </Reveal>

                <Reveal delay={0.25}>
                  <div className="mt-8 flex flex-wrap items-end justify-between gap-5 border-t border-white/[0.08] pt-6">
                    <div>
                      <p className="text-[8px] font-semibold uppercase tracking-[0.24em] text-muted/45">
                        From
                      </p>
                      <p className="mt-1 flex items-baseline gap-2">
                        <span className="font-serif text-[34px] leading-none text-cream">
                          ${SPECIAL_MENU.price}
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.16em] text-muted/50">
                          per guest
                        </span>
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="secondary" size="sm" onClick={() => scrollToSection('menu')}>
                        Explore Menu
                      </Button>
                      <Button size="sm" onClick={onReserve} className="group">
                        Reserve
                        <ArrowUpRight
                          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          strokeWidth={1.7}
                        />
                      </Button>
                    </div>
                  </div>
                </Reveal>

                <div className="mt-5 hidden items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-muted/35 lg:flex">
                  <Wine className="h-3.5 w-3.5 text-accent/60" strokeWidth={1.4} />
                  Limited to twelve guests each evening
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
