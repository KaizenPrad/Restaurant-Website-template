import { useId } from 'react';

export default function Seal({ className = '', label = 'Maison Savour · Est. 2024 · Fine Dining · ' }) {
  const rawId = useId();
  const pathId = `seal-${rawId.replace(/[^a-zA-Z0-9]/g, '')}`;

  return (
    <div
      className={`relative flex items-center justify-center rounded-full border border-accent/30 bg-ink/80 backdrop-blur-md ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 120 120"
        className="absolute inset-0 h-full w-full animate-spin-slow motion-reduce:animate-none"
      >
        <defs>
          <path
            id={pathId}
            d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"
          />
        </defs>
        <text
          fontSize="7.1"
          letterSpacing="2.7"
          className="fill-accent/80 font-sans font-medium uppercase"
        >
          <textPath href={`#${pathId}`}>{label}</textPath>
        </text>
      </svg>
      <div className="relative flex h-[46%] w-[46%] flex-col items-center justify-center rounded-full border border-accent/20 bg-ink/60">
        <span className="font-serif text-[clamp(14px,1.5vw,20px)] leading-none text-cream">
          MS
        </span>
        <span className="mt-0.5 text-[5px] font-semibold uppercase tracking-[0.3em] text-accent/80">
          Est. 24
        </span>
      </div>
    </div>
  );
}
