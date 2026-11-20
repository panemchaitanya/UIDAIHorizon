import { useState } from 'react';
import { ShieldCheck } from 'lucide-react';

interface MediaFrameProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  imgClassName?: string;
}

export function MediaFrame({
  src,
  alt,
  caption,
  className = '',
  imgClassName = 'w-full h-full object-cover',
}: MediaFrameProps) {
  const [failed, setFailed] = useState(false);

  return (
    <figure className={`overflow-hidden ${className}`}>
      <div className="relative w-full h-full bg-[#F5F5F2] border border-[#E2E2DC] overflow-hidden">
        {!failed ? (
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            onError={() => setFailed(true)}
            className={imgClassName}
          />
        ) : (
          <div className="w-full h-full min-h-[240px] flex flex-col items-center justify-center p-8 text-center bg-[#F5F5F2] text-[#111111]">
            <ShieldCheck className="w-8 h-8 mb-3 text-[#C8232C]" />
            <p className="text-sm font-medium text-[#111111] max-w-xs">{alt}</p>
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="mt-2.5 text-xs text-[#575753]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
