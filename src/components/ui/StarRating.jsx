import { Star } from 'lucide-react';

export default function StarRating({ count = 5, size = 14, className = '' }) {
  return (
    <div
      className={`flex items-center gap-1 text-accent ${className}`}
      role="img"
      aria-label={`${count} out of 5 stars`}
    >
      {Array.from({ length: count }).map((_, index) => (
        <Star
          key={index}
          width={size}
          height={size}
          fill="currentColor"
          strokeWidth={0}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
