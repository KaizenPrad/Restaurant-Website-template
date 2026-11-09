import Reveal from './Reveal';

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className = '',
  titleClassName = '',
}) {
  const isCenter = align === 'center';

  return (
    <div
      className={`${isCenter ? 'mx-auto items-center text-center' : 'items-start text-left'} flex max-w-3xl flex-col ${className}`}
    >
      <Reveal>
        <span className="inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-accent">
          <span className="h-px w-8 bg-accent/50" />
          {eyebrow}
          <span className={`h-px w-8 bg-accent/50 ${isCenter ? '' : 'hidden'}`} />
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          className={`mt-5 text-balance font-serif text-[clamp(2.15rem,4.6vw,3.75rem)] font-normal leading-[1.06] tracking-[-0.015em] text-cream ${titleClassName}`}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.14}>
          <p
            className={`mt-5 max-w-2xl text-[14px] leading-[1.9] text-muted sm:text-[15px] ${
              isCenter ? 'mx-auto' : ''
            }`}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
