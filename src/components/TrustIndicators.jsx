import { Award, ChefHat, Leaf } from 'lucide-react';

const INDICATORS = [
  {
    icon: Leaf,
    title: 'Fresh Ingredients',
    subtitle: 'Sourced Daily',
  },
  {
    icon: Award,
    title: 'Award Winning',
    subtitle: 'Culinary Excellence',
  },
  {
    icon: ChefHat,
    title: 'Expertly Crafted',
    subtitle: 'By Passionate Chefs',
  },
];

export default function TrustIndicators() {
  return (
    <div className="mt-14 border-t border-white/[0.07] pt-1 lg:mt-20">
      <div className="grid grid-cols-1 divide-y divide-white/[0.06] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {INDICATORS.map(({ icon: Icon, title, subtitle }, index) => (
          <div
            key={title}
            className={`flex items-center gap-4 py-5 sm:py-6 ${
              index === 0 ? 'sm:pr-8' : 'sm:px-8'
            } ${index === INDICATORS.length - 1 ? 'sm:pr-0' : ''}`}
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-accent/25 bg-accent/[0.05] text-accent">
              <Icon className="h-[18px] w-[18px]" strokeWidth={1.4} aria-hidden="true" />
            </span>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cream/90">
                {title}
              </p>
              <p className="mt-1 text-[11px] tracking-[0.04em] text-muted/60">
                {subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
