import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/testimonials';
import { IMAGES } from '../data/images';
import Reveal from './ui/Reveal';
import SmartImage from './ui/SmartImage';
import StarRating from './ui/StarRating';

const GAP = 24;
const COUNT = TESTIMONIALS.length;
const START = COUNT;
const LOOP_END = START + COUNT;
const SLIDES = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

function TestimonialCard({ testimonial, isClone }) {
  return (
    <article
      aria-hidden={isClone ? 'true' : undefined}
      className="group relative flex h-full flex-col rounded-2xl border border-white/[0.07] bg-ink/65 p-7 transition-colors duration-500 hover:border-accent/25 sm:p-8"
    >
      <Quote
        className="absolute right-6 top-6 h-11 w-11 text-accent/15 transition-colors duration-500 group-hover:text-accent/25"
        strokeWidth={1}
        aria-hidden="true"
      />
      <StarRating size={12} />

      <p className="mt-6 flex-1 font-serif text-[19px] leading-[1.55] text-cream/90 sm:text-[20px]">
        “{testimonial.quote}”
      </p>

      <div className="mt-7 flex items-center gap-3.5 border-t border-white/[0.06] pt-5">
        <SmartImage
          src={testimonial.avatar}
          alt={`Portrait of ${testimonial.name}`}
          className="h-11 w-11 shrink-0 rounded-full ring-1 ring-accent/30"
          sizes="44px"
        />
        <div>
          <p className="text-[13px] font-medium text-cream">{testimonial.name}</p>
          <p className="mt-0.5 text-[8.5px] font-medium uppercase tracking-[0.18em] text-muted/45">
            {testimonial.profession}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function Testimonials() {
  const viewportRef = useRef(null);
  const touchStart = useRef(null);
  const [metrics, setMetrics] = useState({ visible: 3, cardWidth: 0 });
  const [position, setPosition] = useState(START);
  const [instant, setInstant] = useState(false);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return undefined;

    const measure = () => {
      const viewportWidth = viewport.clientWidth;
      const visible = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;
      const cardWidth = Math.max(0, (viewportWidth - GAP * (visible - 1)) / visible);
      setMetrics((previous) =>
        previous.visible === visible && Math.abs(previous.cardWidth - cardWidth) < 1
          ? previous
          : { visible, cardWidth },
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let timer;

    if (position >= LOOP_END) {
      timer = window.setTimeout(() => {
        setInstant(true);
        setPosition((current) => current - COUNT);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setInstant(false));
        });
      }, 600);
    } else if (position < START) {
      timer = window.setTimeout(() => {
        setInstant(true);
        setPosition((current) => current + COUNT);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setInstant(false));
        });
      }, 600);
    }

    return () => window.clearTimeout(timer);
  }, [position]);

  const next = useCallback(() => {
    setPosition((current) => (current >= LOOP_END ? current : current + 1));
  }, []);

  const previous = useCallback(() => {
    setPosition((current) => (current <= 0 ? current : current - 1));
  }, []);

  const activeIndex = ((position % COUNT) + COUNT) % COUNT;

  const goTo = (index) => {
    if (index === activeIndex) return;
    setInstant(false);
    setPosition(START + index);
  };

  const handleTouchStart = (event) => {
    touchStart.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    if (touchStart.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStart.current;
    touchStart.current = null;
    if (Math.abs(delta) < 45) return;
    if (delta < 0) next();
    else previous();
  };

  const step = metrics.cardWidth + GAP;
  const translateX = -(position * step);

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="section-pad relative overflow-hidden border-t border-white/[0.04] bg-[#0C0C0C]"
    >
      <div
        className="pointer-events-none absolute -right-[12%] top-[8%] h-[520px] w-[520px] rounded-full bg-accent/[0.035] blur-[130px]"
        aria-hidden="true"
      />

      <div className="container relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-accent">
                <span className="h-px w-8 bg-accent/50" />
                What Our Guests Say
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="testimonials-heading"
                className="mt-5 max-w-2xl font-serif text-[clamp(2.15rem,4.6vw,3.75rem)] leading-[1.06] tracking-[-0.015em] text-cream"
              >
                Unforgettable{' '}
                <span className="italic text-accent">Experiences</span>
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.14}>
            <div className="flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-ink/50 px-5 py-4">
              <div className="flex -space-x-3">
                {IMAGES.ratingGuests.map((avatar, index) => (
                  <SmartImage
                    key={avatar}
                    src={avatar}
                    alt=""
                    className="h-9 w-9 rounded-full ring-2 ring-[#0C0C0C]"
                    sizes="36px"
                    style={{ zIndex: IMAGES.ratingGuests.length - index }}
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <StarRating size={11} />
                  <span className="font-serif text-[20px] leading-none text-cream">4.9</span>
                </div>
                <p className="mt-1.5 text-[10px] tracking-wide text-muted/55">
                  From 2,500+ happy diners
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-12">
          <div
            ref={viewportRef}
            className="overflow-hidden py-1"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{ touchAction: 'pan-y' }}
          >
            <motion.div
              className="flex gap-6"
              animate={{ x: translateX }}
              transition={
                instant
                  ? { duration: 0 }
                  : { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
              }
              style={{ opacity: metrics.cardWidth > 0 ? 1 : 0 }}
            >
              {SLIDES.map((testimonial, index) => {
                const isClone = index < START || index >= LOOP_END;
                return (
                  <div
                    key={`${testimonial.id}-${index}`}
                    className="w-full shrink-0 sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                    style={metrics.cardWidth > 0 ? { width: `${metrics.cardWidth}px` } : undefined}
                  >
                    <TestimonialCard testimonial={testimonial} isClone={isClone} />
                  </div>
                );
              })}
            </motion.div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <span className="font-serif text-[15px] italic text-cream/70">
                0{activeIndex + 1}
              </span>
              <span className="h-px w-7 bg-white/10" />
              <div className="flex items-center gap-2" role="group" aria-label="Choose testimonial">
                {TESTIMONIALS.map((testimonial, index) => {
                  const isActive = activeIndex === index;
                  return (
                    <button
                      key={testimonial.id}
                      type="button"
                      aria-pressed={isActive}
                      aria-label={`Show testimonial from ${testimonial.name}`}
                      onClick={() => goTo(index)}
                      className="group/tab flex h-6 items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                    >
                      <span
                        className={`block h-1.5 rounded-full transition-all duration-500 ${
                          isActive
                            ? 'w-7 bg-accent'
                            : 'w-1.5 bg-white/20 group-hover/tab:bg-white/40'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
              <span className="text-[10px] tracking-[0.16em] text-muted/35">
                0{COUNT}
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={previous}
                aria-label="Previous testimonial"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-cream/65 transition-all duration-300 hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 active:scale-95"
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={1.6} />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next testimonial"
                className="grid h-11 w-11 place-items-center rounded-full border border-accent/40 text-accent transition-all duration-300 hover:bg-accent hover:text-[#140D08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 active:scale-95"
              >
                <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
