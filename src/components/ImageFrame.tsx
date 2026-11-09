import { useState } from 'react';
import { ImageOff } from 'lucide-react';

type ImageFrameProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
};

export function ImageFrame({
  src,
  alt,
  className = '',
  imageClassName = '',
  priority = false,
}: ImageFrameProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`image-frame ${className}`}>
      {!failed ? (
        <img
          alt={alt}
          className={`image-frame__image ${imageClassName}`}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          loading={priority ? 'eager' : 'lazy'}
          onError={() => setFailed(true)}
          src={src}
        />
      ) : (
        <div aria-label={alt} className="image-frame__fallback" role="img">
          <ImageOff aria-hidden="true" size={32} strokeWidth={1.4} />
        </div>
      )}
    </div>
  );
}
