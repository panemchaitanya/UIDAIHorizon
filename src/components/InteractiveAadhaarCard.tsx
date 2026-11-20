import { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, QrCode, RotateCw, ShieldCheck } from 'lucide-react';
import { AadhaarSunburstMark, AshokaWheelSeal } from './UidaiEmblems';
import { Lang } from '../data/uidaiData';

interface InteractiveAadhaarCardProps {
  lang: Lang;
  onLaunchZkp?: () => void;
}

export function InteractiveAadhaarCard({
  lang,
  onLaunchZkp,
}: InteractiveAadhaarCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      rotateX: (0.5 - y) * 12,
      rotateY: (x - 0.5) * 14,
      glareX: Math.round(x * 100),
      glareY: Math.round(y * 100),
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-mono uppercase tracking-wider text-[#575753]">
          {flipped ? 'REVERSE · SELECTIVE ZKP PASS' : 'FRONT · DIGITAL AADHAAR PASS'}
        </span>
        <button
          type="button"
          onClick={() => setFlipped((f) => !f)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#111111] bg-white hover:bg-[#111111] hover:text-white border border-[#111111] transition-colors whitespace-nowrap cursor-pointer"
        >
          <RotateCw
            className={`w-3.5 h-3.5 transition-transform duration-300 ${
              flipped ? 'rotate-180' : ''
            }`}
          />
          {flipped ? 'View Front' : 'View ZKP Back'}
        </button>
      </div>

      {/* True 180-degree 3D Flip Ceramic/Carbon Hardware Pass */}
      <div
        className="perspective-1200 cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setFlipped((f) => !f)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setFlipped((f) => !f);
          }
        }}
        aria-label="Flip 3D Aadhaar Digital Pass card"
      >
        <motion.div
          animate={{
            rotateY: (flipped ? 180 : 0) + tilt.rotateY,
            rotateX: tilt.rotateX,
          }}
          transition={{ type: 'spring', stiffness: 175, damping: 20, mass: 0.85 }}
          className="relative w-full min-h-[296px] preserve-3d"
        >
          {/* ================= FRONT FACE: PURE MATTE CERAMIC WHITE ================= */}
          <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden bg-white text-[#111111] border border-[#D4D4CE] shadow-[0_24px_60px_-20px_rgba(17,17,17,0.22)] flex flex-col justify-between">
            <div
              className="pointer-events-none absolute inset-0 opacity-50 transition-opacity duration-200"
              style={{
                background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(232,111,31,0.12), rgba(255,255,255,0) 58%)`,
              }}
            />

            {/* Crisp Official Tricolor Hairline */}
            <div className="h-[3px] w-full flex shrink-0">
              <div className="flex-1 bg-[#E86F1F]" />
              <div className="flex-1 bg-white" />
              <div className="flex-1 bg-[#0D7A43]" />
            </div>

            <div className="relative p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between gap-3 border-b border-[#ECECE7] pb-3.5">
                <div className="flex items-center gap-2.5">
                  <AshokaWheelSeal className="w-7 h-7 text-[#111111] shrink-0" />
                  <div>
                    <p className="text-[10px] font-semibold tracking-widest uppercase text-[#111111]">
                      Government of India · भारत सरकार
                    </p>
                    <p className="text-[11px] text-[#575753]">
                      Unique Identification Authority of India
                    </p>
                  </div>
                </div>
                <AadhaarSunburstMark className="w-11 h-7 shrink-0" />
              </div>

              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-8 space-y-2">
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-[#C8232C] font-semibold">
                      UTF-8 Verified Credential · Passkey Protected
                    </p>
                    <p className="font-display text-xl font-semibold text-[#111111] mt-0.5 tracking-tight">
                      Rajesh Sharma · राजेश शर्मा
                    </p>
                  </div>
                  <p className="text-xs text-[#575753]">
                    DOB: <span className="font-mono text-[#111111] tabular-nums">14/06/1972</span> · Male / पुरुष
                  </p>
                  <p className="text-xs text-[#111111] leading-snug">
                    बी-42, मालवीय नगर, सेक्टर 6, जयपुर - 302017
                  </p>
                  <p className="text-[11px] text-[#575753] leading-snug">
                    B-42, Malviya Nagar, Sector 6, Jaipur, RJ
                  </p>
                </div>

                <div className="col-span-4 flex flex-col items-center justify-center p-2.5 bg-[#F5F5F2] border border-[#E2E2DC] rounded-lg">
                  <QrCode className="w-16 h-16 text-[#111111]" strokeWidth={1.5} />
                  <span className="font-mono text-[10px] text-[#0D7A43] font-semibold mt-1">
                    Ed25519 OK
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#ECECE7] flex items-center justify-between gap-2">
                <span className="font-mono text-sm font-semibold tracking-widest text-[#111111] tabular-nums">
                  XXXX  XXXX  4821
                </span>
                <span className="text-[11px] font-semibold text-[#C8232C]">
                  {lang === 'hi' ? 'ZKP बैक देखने के लिए क्लिक करें →' : 'Click card to flip →'}
                </span>
              </div>
            </div>
          </div>

          {/* ================= BACK FACE: MATTE CARBON HARDWARE ZKP MODE ================= */}
          <div
            className="absolute inset-0 backface-hidden rounded-xl overflow-hidden bg-[#111111] text-white border border-[#2C2C2A] shadow-[0_24px_60px_-20px_rgba(17,17,17,0.4)] flex flex-col justify-between p-6"
            style={{ transform: 'rotateY(180deg)' }}
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/15 pb-3.5">
              <div>
                <p className="text-[10px] font-mono tracking-widest uppercase text-[#E86F1F]">
                  SELECTIVE ZERO-KNOWLEDGE PROOF
                </p>
                <p className="font-display text-base font-semibold text-white mt-0.5">
                  Hotel · Airport · Telecom Check-In
                </p>
              </div>
              <AshokaWheelSeal className="w-7 h-7 text-white/80 shrink-0" />
            </div>

            <div className="grid grid-cols-12 gap-4 items-center py-2">
              <div className="col-span-8 space-y-2 text-xs">
                <p className="inline-flex items-center gap-1.5 font-semibold text-[#4ADE80]">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  Age 18+ Cryptographically Verified
                </p>
                <p className="text-white/85">
                  Residency: <span className="font-mono text-white">PIN 302017 · Jaipur</span>
                </p>
                <p className="text-white/65">
                  Exact DOB, Street &amp; 12-Digit ID:{' '}
                  <span className="text-white font-medium">Redacted by ZKP</span>
                </p>
              </div>
              <div className="col-span-4 flex flex-col items-center justify-center p-2.5 bg-white rounded-lg text-[#111111]">
                <QrCode className="w-16 h-16" strokeWidth={1.5} />
                <span className="font-mono text-[10px] font-semibold mt-1">15m TTL</span>
              </div>
            </div>

            <div className="pt-3 border-t border-white/15 flex items-center justify-between gap-2">
              <span className="font-mono text-xs text-white/75 tabular-nums">
                VID 9148 3302 7719 5042
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onLaunchZkp?.();
                }}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#E86F1F] hover:text-white underline underline-offset-4 cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Customize Fields
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
