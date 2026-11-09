import { scrollToSection } from '../../utils/scrollToSection';

export default function Logo({ className = '', size = 'md', onClick }) {
  const isLarge = size === 'lg';

  const handleClick = (event) => {
    event.preventDefault();
    if (onClick) {
      onClick();
      return;
    }
    scrollToSection('home');
  };

  return (
    <a
      href="#home"
      onClick={handleClick}
      aria-label="Maison Savour — back to top"
      className={`group inline-flex shrink-0 flex-col focus-visible:outline-none ${className}`}
    >
      <span
        className={`font-serif leading-none tracking-[0.16em] text-cream transition-colors duration-300 group-hover:text-white ${
          isLarge ? 'text-[26px]' : 'text-[21px] sm:text-[23px]'
        }`}
      >
        MAISON
      </span>
      <span
        className={`mt-1.5 flex items-center gap-2 text-accent ${
          isLarge ? 'text-[9px]' : 'text-[7.5px]'
        } font-semibold uppercase tracking-[0.46em]`}
      >
        <span className="h-px w-4 bg-accent/60 transition-all duration-300 group-hover:w-5" />
        SAVOUR
        <span className="h-px w-4 bg-accent/60 transition-all duration-300 group-hover:w-5" />
      </span>
    </a>
  );
}
