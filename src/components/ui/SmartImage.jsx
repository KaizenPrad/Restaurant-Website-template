import { useState } from 'react';
import { ImageOff } from 'lucide-react';

export default function SmartImage({
  src,
  alt,
  className = '',
  imageClassName = '',
  loading = 'lazy',
  sizes,
  style,
  fetchpriority,
}) {
  const [status, setStatus] = useState('loading');

  return (
    <div className={`relative overflow-hidden bg-[#191816] ${className}`} style={style}>
      {status === 'loading' && (
        <div
          aria-hidden="true"
          className="absolute inset-0 animate-pulse bg-gradient-to-br from-[#262320] via-[#1b1917] to-[#121110] motion-reduce:animate-none"
        />
      )}

      {status === 'error' ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2.5 p-4 text-center">
          <ImageOff className="h-6 w-6 text-accent/50" strokeWidth={1.4} aria-hidden="true" />
          <span className="max-w-[80%] text-[10px] uppercase leading-relaxed tracking-[0.18em] text-muted/50">
            {alt}
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          sizes={sizes}
          fetchpriority={fetchpriority}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={`h-full w-full object-cover transition-opacity duration-700 ${
            status === 'loaded' ? 'opacity-100' : 'opacity-0'
          } ${imageClassName}`}
        />
      )}
    </div>
  );
}
