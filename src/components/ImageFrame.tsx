import { useState } from 'react';
import { ImageOff } from 'lucide-react';

type ImageFrameProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

export function ImageFrame({ src, alt, className = '', priority = false }: ImageFrameProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`frame ${className}`}>
      {!failed ? (
        <img
          alt={alt}
          className="frame__img"
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          loading={priority ? 'eager' : 'lazy'}
          onError={() => setFailed(true)}
          src={src}
        />
      ) : (
        <div aria-label={alt} className="frame__fallback" role="img">
          <ImageOff aria-hidden="true" size={32} strokeWidth={1.4} />
        </div>
      )}
    </div>
  );
}
