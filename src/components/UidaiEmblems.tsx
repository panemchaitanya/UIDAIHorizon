interface EmblemProps {
  className?: string;
}

/**
 * Custom crisp SVG inspired by UIDAI Aadhaar's iconic red/saffron
 * radiant fingerprint sunburst identity mark.
 */
export function AadhaarSunburstMark({ className = 'w-11 h-8' }: EmblemProps) {
  return (
    <svg
      viewBox="0 0 88 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Aadhaar Emblem"
    >
      {/* Radiating solar rays */}
      <g stroke="#F28C28" strokeWidth="2.4" strokeLinecap="round">
        <line x1="44" y1="4" x2="44" y2="12" />
        <line x1="27" y1="8" x2="31" y2="15" />
        <line x1="61" y1="8" x2="57" y2="15" />
        <line x1="14" y1="19" x2="21" y2="23" />
        <line x1="74" y1="19" x2="67" y2="23" />
        <line x1="8" y1="34" x2="16" y2="35" />
        <line x1="80" y1="34" x2="72" y2="35" />
      </g>
      {/* Concentric fingerprint / sun dome arcs */}
      <path
        d="M18 46C18 31.64 29.64 20 44 20C58.36 20 70 31.64 70 46"
        stroke="#C62828"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M25 46C25 35.51 33.51 27 44 27C54.49 27 63 35.51 63 46"
        stroke="#C62828"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeDasharray="24 5 18 4"
      />
      <path
        d="M32 46C32 39.37 37.37 34 44 34C50.63 34 56 39.37 56 46"
        stroke="#F28C28"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M38.5 46C38.5 42.96 40.96 40.5 44 40.5C47.04 40.5 49.5 42.96 49.5 46"
        stroke="#C62828"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      {/* Horizon base line */}
      <line
        x1="12"
        y1="52"
        x2="76"
        y2="52"
        stroke="#C62828"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Refined geometric Ashoka Chakra 24-spoke institutional seal
 * representing Government of India · MeitY · UIDAI governance.
 */
export function AshokaWheelSeal({ className = 'w-9 h-9' }: EmblemProps) {
  const spokes = Array.from({ length: 24 }, (_, i) => i * 15);
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Ashoka Chakra Emblem"
    >
      <circle cx="32" cy="32" r="27" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="32" cy="32" r="22.5" stroke="currentColor" strokeWidth="0.9" opacity="0.55" />
      <circle cx="32" cy="32" r="5" fill="currentColor" />
      {spokes.map((deg) => (
        <line
          key={deg}
          x1="32"
          y1="32"
          x2="32"
          y2="7.5"
          stroke="currentColor"
          strokeWidth="1.25"
          transform={`rotate(${deg} 32 32)`}
        />
      ))}
    </svg>
  );
}

/**
 * Subtle 3px architectural tricolor accent ribbon (Saffron · White · India Green)
 */
export function TricolorHairline() {
  return (
    <div className="w-full h-[3px] flex" aria-hidden="true">
      <div className="flex-1 bg-[#F28C28]" />
      <div className="flex-1 bg-white" />
      <div className="flex-1 bg-[#137A4B]" />
    </div>
  );
}
