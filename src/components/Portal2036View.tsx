import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CalendarCheck2,
  CheckCircle2,
  MapPin,
  Mic,
  Search,
} from 'lucide-react';
import {
  ASSETS,
  DPI_PILLARS,
  INTENT_SHORTCUTS,
  Lang,
  REGIONAL_OFFICES,
  ServiceKey,
  ViewTab,
} from '../data/uidaiData';
import {
  AadhaarSunburstMark,
  AshokaWheelSeal,
  TricolorHairline,
} from './UidaiEmblems';
import { InteractiveAadhaarCard } from './InteractiveAadhaarCard';
import { AnimatedNumber } from './MotionPrimitives';

interface Portal2036ViewProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
  onOpenService: (service: ServiceKey) => void;
  onNavigate: (tab: ViewTab) => void;
}

const CITIZEN_SERVICES: {
  key: ServiceKey;
  index: string;
  category: string;
  title: { en: string; hi: string };
  summary: { en: string; hi: string };
  stat: string;
  assurance: string;
  image: string;
  imageAlt: string;
}[] = [
  {
    key: 'address',
    index: '01',
    category: 'DEMOGRAPHICS & ADDRESS',
    title: {
      en: 'Instant DigiLocker Address Update',
      hi: 'त्वरित डिजिलॉकर पता अद्यतन',
    },
    summary: {
      en: 'Fetch cryptographically signed utility bills or domicile records directly from DigiLocker at ₹0 fee, or verify uploaded Proof of Address via live 5-point OCR and bilingual Devanagari confirmation.',
      hi: 'डिजिलॉकर सत्यापित बिजली बिल से ₹0 शुल्क पर तुरंत पता अद्यतन करें या 5-बिंदु प्री-फ्लाइट OCR व शुद्ध हिंदी वर्तनी की पुष्टि करें।',
    },
    stat: '₹0 DigiLocker Verify · Under 4 hours SLA',
    assurance: 'Bilingual English & Devanagari UTF-8 verification',
    image: ASSETS.personaRajesh,
    imageAlt: 'Indian citizen verifying residential address update on smartphone with utility bill',
  },
  {
    key: 'eaadhaar',
    index: '02',
    category: 'DIGITAL PASS & PRIVACY',
    title: {
      en: 'Unicode e-Aadhaar & Selective ZKP Pass',
      hi: 'यूनिकोड ई-आधार व चयनात्मक ZKP पास',
    },
    summary: {
      en: 'Access your passkey-protected, passwordless Unicode e-Aadhaar anytime. Generate 15-minute cryptographic QR tokens for hotels, airports, and telecom KYC proving only Age 18+ or PIN Code.',
      hi: 'पासकी-सुरक्षित यूनिकोड ई-आधार डाउनलोड करें। होटल, हवाई अड्डे या बैंक के लिए केवल आयु 18+ या पिनकोड प्रमाणित करने वाला 15-मिनट QR बनाएं।',
    },
    stat: 'Embedded UTF-8 Scripts · 15-min ZKP QR',
    assurance: 'Ed25519 cryptographically signed offline & online',
    image: ASSETS.mobilePasskey,
    imageAlt: 'Indian commuter verifying contactless mobile Aadhaar passkey at transit gate',
  },
  {
    key: 'tracker',
    index: '03',
    category: 'SRN & PVC DISPATCH',
    title: {
      en: 'Live SRN Ledger & 72h Nodal Escalation',
      hi: 'लाइव SRN लेजर व 72-घंटे नोडल एस्केलेशन',
    },
    summary: {
      en: 'Track Aadhaar PVC card printing and India Post Speed Post AWB milestones in real time. Requests pending beyond 72 hours unlock one-click escalation to your named Regional Nodal Officer.',
      hi: 'पीवीसी कार्ड मुद्रण और इंडिया पोस्ट AWB की लाइव स्थिति देखें। 72 घंटे से अधिक विलंब पर क्षेत्रीय नोडल अधिकारी को सीधा एस्केलेशन।',
    },
    stat: 'Live India Post AWB · 72h Escalation Mandate',
    assurance: 'Tickets require citizen OTP confirmation before closure',
    image: ASSETS.askKiosk,
    imageAlt: 'Sunlit modern Indian Aadhaar Seva Kendra with citizens and officers at service desks',
  },
  {
    key: 'vault',
    index: '04',
    category: 'SECURITY & BAAL AADHAAR',
    title: {
      en: 'Biometric Lock, VID & Consent Ledger',
      hi: 'बायोमेट्रिक सुरक्षा, VID व सहमति लॉग',
    },
    summary: {
      en: 'Lock or temporarily unlock your Fingerprint and Iris biometrics in one tap, rotate your 16-digit Virtual ID anytime, and inspect every bank or telecom verification in plain language.',
      hi: 'एक क्लिक में फिंगरप्रिंट व आईरिस लॉक करें, 16-अंकीय वर्चुअल आईडी बदलें और हर प्रमाणीकरण का सरल इतिहास देखें।',
    },
    stat: '1-tap biometric shield · Instant fraud flagging',
    assurance: 'Full agency names and disclosed attributes logged',
    image: ASSETS.bharatFamily,
    imageAlt: 'Indian family with young child completing Baal Aadhaar assistance at a sunlit civic center',
  },
];

const heroStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function Portal2036View({
  lang,
  setLang,
  onOpenService,
  onNavigate,
}: Portal2036ViewProps) {
  const [query, setQuery] = useState('');
  const [listening, setListening] = useState(false);
  const [activeWorkflowIdx, setActiveWorkflowIdx] = useState(0);
  const [activePillarIdx, setActivePillarIdx] = useState(0);
  const [selectedRoId, setSelectedRoId] = useState<string>('ro-hyd');
  const [bookedSlots, setBookedSlots] = useState<Record<string, boolean>>({});

  const activeWorkflow = CITIZEN_SERVICES[activeWorkflowIdx];
  const activePillar = DPI_PILLARS[activePillarIdx];
  const selectedRo =
    REGIONAL_OFFICES.find((r) => r.id === selectedRoId) ?? REGIONAL_OFFICES[0];

  const handleIntentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.toLowerCase();
    if (
      q.includes('pvc') ||
      q.includes('track') ||
      q.includes('srn') ||
      q.includes('पीवीसी') ||
      q.includes('ट्रैक')
    ) {
      onOpenService('tracker');
    } else if (
      q.includes('download') ||
      q.includes('pdf') ||
      q.includes('zkp') ||
      q.includes('qr') ||
      q.includes('ई-आधार') ||
      q.includes('डाउनलोड')
    ) {
      onOpenService('eaadhaar');
    } else if (
      q.includes('lock') ||
      q.includes('bio') ||
      q.includes('history') ||
      q.includes('लॉक') ||
      q.includes('बायोमेट्रिक')
    ) {
      onOpenService('vault');
    } else if (
      q.includes('center') ||
      q.includes('kendra') ||
      q.includes('appointment') ||
      q.includes('केंद्र')
    ) {
      onNavigate('centers');
    } else {
      onOpenService('address');
    }
  };

  const handleVoiceSimulate = () => {
    if (listening) {
      setListening(false);
      return;
    }
    setListening(true);
    setTimeout(() => {
      setQuery(
        lang === 'hi'
          ? 'मेरा जयपुर का नया पता डिजिलॉकर बिजली बिल से अपडेट करना है'
          : 'Update my Jaipur residential address using my DigiLocker electricity bill'
      );
      setListening(false);
    }, 950);
  };

  return (
    <div className="bg-white">
      {/* ================= OFFICIAL GOVERNANCE UTILITY STRIP ================= */}
      <div className="border-b border-[#E2E2DC] bg-[#F5F5F2]">
        <TricolorHairline />
        <div className="max-w-7xl mx-auto px-6 py-2.5 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[#575753]">
            <span className="inline-flex items-center gap-2 font-semibold text-[#111111]">
              <AshokaWheelSeal className="w-4 h-4 text-[#111111]" />
              Unique Identification Authority of India · Government of India
            </span>
            <span aria-hidden="true">/</span>
            <span>Ministry of Electronics &amp; Information Technology</span>
            <span aria-hidden="true">/</span>
            <span className="font-mono text-[#111111]">Toll-Free 1947</span>
          </div>

          <div
            role="group"
            aria-label="Language toggle"
            className="inline-flex items-center border border-[#D4D4CE] bg-white"
          >
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-3 py-1 text-xs font-semibold transition-colors cursor-pointer ${
                lang === 'en'
                  ? 'bg-[#111111] text-white'
                  : 'text-[#575753] hover:text-[#111111]'
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setLang('hi')}
              className={`px-3 py-1 text-xs font-semibold transition-colors cursor-pointer ${
                lang === 'hi'
                  ? 'bg-[#111111] text-white'
                  : 'text-[#575753] hover:text-[#111111]'
              }`}
            >
              हिन्दी
            </button>
          </div>
        </div>
      </div>

      {/* ================= FULL-BLEED SWISS ARCHITECTURAL SPLIT HERO ================= */}
      <section className="border-b border-[#E2E2DC]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12">
          {/* Left 7 Cols: Pure Gallery White Editorial & Bhashini Command Bar */}
          <motion.div
            variants={heroStagger}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 px-6 sm:px-10 lg:pr-12 py-12 lg:py-16 flex flex-col justify-between space-y-10 lg:border-r border-[#E2E2DC]"
          >
            <div className="space-y-6">
              <motion.div variants={heroItem} className="flex items-center gap-3.5">
                <AadhaarSunburstMark className="w-11 h-7 shrink-0" />
                <div className="h-6 w-[1px] bg-[#E2E2DC]" aria-hidden="true" />
                <div className="text-xs leading-tight">
                  <p className="font-mono font-semibold tracking-wider uppercase text-[#C8232C]">
                    {lang === 'hi' ? 'मेरा आधार · मेरी पहचान' : 'MERA AADHAAR · MERI PEHCHAAN'}
                  </p>
                  <p className="text-[#575753] mt-0.5">
                    {lang === 'hi'
                      ? 'भारतीय विशिष्ट पहचान प्राधिकरण (UIDAI)'
                      : 'National Digital Identity Portal · 22 Languages'}
                  </p>
                </div>
              </motion.div>

              <motion.h1
                variants={heroItem}
                className="font-display text-4xl sm:text-5xl lg:text-[3.75rem] font-semibold text-[#111111] leading-[1.04] tracking-tight"
              >
                {lang === 'hi'
                  ? 'भारत की डिजिटल पहचान — सरल, सुरक्षित और 22 भाषाओं में।'
                  : "India's digital identity, seamless in 22 languages."}
              </motion.h1>

              <motion.p
                variants={heroItem}
                className="text-base text-[#575753] leading-relaxed max-w-xl"
              >
                {lang === 'hi'
                  ? 'डिजिलॉकर सत्यापित पता अद्यतन, पासवर्ड-मुक्त यूनिकोड ई-आधार, चयनात्मक ZKP पहचान साझाकरण और देशव्यापी सेवा केंद्र अपॉइंटमेंट — सब एक एकीकृत नागरिक पोर्टल पर।'
                  : 'Update your address via DigiLocker at zero fee, access passwordless Unicode e-Aadhaar, share privacy-preserving Age 18+ ZKP proofs, and book zero-queue Seva Kendra visits.'}
              </motion.p>

              {/* Sharp Architectural Bhashini Command Bar */}
              <motion.form
                variants={heroItem}
                onSubmit={handleIntentSubmit}
                className="flex flex-col sm:flex-row items-stretch sm:items-center border-2 border-[#111111] bg-white focus-within:border-[#C8232C] transition-colors"
              >
                <div className="flex items-center flex-1 gap-3 px-4 py-3">
                  <Search className="w-4 h-4 text-[#575753] shrink-0" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={
                      lang === 'hi'
                        ? 'भाषिणी सहायता: "मेरा पता अपडेट करें" या "पीवीसी कार्ड ट्रैक करें"...'
                        : 'Ask in any language: "Update address", "Download e-Aadhaar", "Track PVC"...'
                    }
                    className="w-full text-sm text-[#111111] placeholder:text-[#787873] bg-transparent focus:outline-none"
                    aria-label="Search Aadhaar services"
                  />
                </div>
                <div className="flex items-stretch border-t sm:border-t-0 sm:border-l border-[#E2E2DC] shrink-0">
                  <button
                    type="button"
                    onClick={handleVoiceSimulate}
                    className={`inline-flex items-center justify-center gap-1.5 px-4 py-3 text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                      listening
                        ? 'bg-[#C8232C] text-white'
                        : 'bg-[#F5F5F2] text-[#111111] hover:bg-[#ECECE7]'
                    }`}
                  >
                    <Mic className="w-3.5 h-3.5" />
                    {listening ? (
                      <span className="inline-flex items-center gap-1">
                        Listening
                        <span className="inline-flex items-end gap-0.5 h-3">
                          <motion.span
                            animate={{ height: ['25%', '100%', '30%'] }}
                            transition={{ repeat: Infinity, duration: 0.45 }}
                            className="w-0.5 bg-white"
                          />
                          <motion.span
                            animate={{ height: ['100%', '25%', '90%'] }}
                            transition={{ repeat: Infinity, duration: 0.45, delay: 0.12 }}
                            className="w-0.5 bg-white"
                          />
                          <motion.span
                            animate={{ height: ['35%', '95%', '25%'] }}
                            transition={{ repeat: Infinity, duration: 0.45, delay: 0.24 }}
                            className="w-0.5 bg-white"
                          />
                        </span>
                      </span>
                    ) : (
                      'Bhashini Voice'
                    )}
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold text-white bg-[#111111] hover:bg-[#C8232C] transition-colors whitespace-nowrap cursor-pointer"
                  >
                    {lang === 'hi' ? 'शुरू करें' : 'Go'}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.form>
            </div>

            {/* Direct Hairline Task Directory */}
            <motion.div variants={heroItem} className="border-t border-[#E2E2DC] divide-y divide-[#E2E2DC]">
              {INTENT_SHORTCUTS.map((item, idx) => (
                <motion.button
                  key={item.id}
                  type="button"
                  whileHover={{ x: 6 }}
                  transition={{ duration: 0.16 }}
                  onClick={() => onOpenService(item.service)}
                  className="w-full py-3.5 flex items-center justify-between gap-4 text-left group cursor-pointer"
                >
                  <div className="flex items-baseline gap-4 min-w-0">
                    <span className="font-mono text-xs text-[#C8232C] font-semibold shrink-0 tabular-nums">
                      0{idx + 1}
                    </span>
                    <div className="min-w-0">
                      <span className="text-sm font-semibold text-[#111111] group-hover:text-[#C8232C] transition-colors block truncate">
                        {item.prompt[lang]}
                      </span>
                      <span className="text-xs text-[#575753] block">
                        {item.sublabel[lang]}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#575753] group-hover:text-[#C8232C] shrink-0 transition-colors" />
                </motion.button>
              ))}
            </motion.div>
          </motion.div>

          {/* Right 5 Cols: Precision Architectural Specimen Stage for 3D-Flip Pass */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 bg-[#F5F5F2] bg-architectural-grid px-6 sm:px-10 py-12 lg:py-16 flex flex-col justify-center space-y-8"
          >
            <InteractiveAadhaarCard
              lang={lang}
              onLaunchZkp={() => onOpenService('eaadhaar')}
            />

            <div className="bg-white border border-[#E2E2DC] p-5 grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-[#111111] font-semibold">
                  Passwordless UTF-8
                </p>
                <p className="text-[#575753] mt-1 leading-relaxed">
                  Embedded Devanagari &amp; 21 regional scripts unlocked securely via Device Passkey.
                </p>
              </div>
              <div className="border-l border-[#E2E2DC] pl-4">
                <p className="font-mono text-[10px] uppercase tracking-wider text-[#0D7A43] font-semibold">
                  Selective ZKP QR
                </p>
                <p className="text-[#575753] mt-1 leading-relaxed">
                  Verify Age 18+ or PIN Code offline with 15-minute cryptographic expiry.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= EDGE-TO-EDGE NATIONAL DIGITAL INFRASTRUCTURE KPI RAIL ================= */}
      <section className="border-b border-[#E2E2DC] bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 divide-x divide-[#E2E2DC]">
          <div className="p-7 sm:p-9">
            <p className="font-mono text-3xl sm:text-4xl font-semibold text-[#111111] tabular-nums">
              <AnimatedNumber target={1.42} decimals={2} suffix="B+" />
            </p>
            <p className="text-xs font-semibold text-[#111111] mt-2">
              {lang === 'hi' ? 'सक्रिय आधार धारक' : 'Active Aadhaar Residents'}
            </p>
            <p className="text-xs text-[#575753] mt-0.5">
              Nationwide sovereign digital identity coverage
            </p>
          </div>
          <div className="p-7 sm:p-9">
            <p className="font-mono text-3xl sm:text-4xl font-semibold text-[#C8232C] tabular-nums">
              <AnimatedNumber target={22} />
            </p>
            <p className="text-xs font-semibold text-[#111111] mt-2">
              {lang === 'hi' ? 'अनुसूचित भारतीय भाषाएँ' : 'Scheduled Languages'}
            </p>
            <p className="text-xs text-[#575753] mt-0.5">
              Bhashini voice &amp; script parity on every screen
            </p>
          </div>
          <div className="p-7 sm:p-9">
            <p className="font-mono text-3xl sm:text-4xl font-semibold text-[#0D7A43] tabular-nums">
              &lt; <AnimatedNumber target={90} suffix="s" />
            </p>
            <p className="text-xs font-semibold text-[#111111] mt-2">
              {lang === 'hi' ? 'औसत डिजिलॉकर अद्यतन समय' : 'Median DigiLocker Update'}
            </p>
            <p className="text-xs text-[#575753] mt-0.5">
              ₹0 fee cryptographic Proof of Address fetch
            </p>
          </div>
          <div className="p-7 sm:p-9">
            <p className="font-mono text-3xl sm:text-4xl font-semibold text-[#111111] tabular-nums">
              <AnimatedNumber target={72} suffix="h" />
            </p>
            <p className="text-xs font-semibold text-[#111111] mt-2">
              {lang === 'hi' ? 'गारंटीकृत नागरिक SLA' : 'Citizen SLA Guarantee'}
            </p>
            <p className="text-xs text-[#575753] mt-0.5">
              Auto-escalation to named Regional Nodal Officers
            </p>
          </div>
        </div>
      </section>

      {/* ================= INTERACTIVE SPLIT-SCREEN CITIZEN SERVICES EXPLORER ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <p className="text-xs font-mono uppercase tracking-wider text-[#C8232C] font-semibold">
              {lang === 'hi' ? 'मेरा आधार · ऑनलाइन नागरिक सेवाएँ' : 'MY AADHAAR · ONLINE CITIZEN SERVICES'}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#111111]">
              {lang === 'hi'
                ? 'चार प्रमुख सेवाएँ। एक एकीकृत सुरक्षित पोर्टल।'
                : 'Essential Aadhaar services, unified in one place.'}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('ecosystem')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#111111] hover:text-[#C8232C] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {lang === 'hi' ? 'नागरिक चार्टर व शुल्क देखें' : 'View Citizen Charter & Fee Schedule'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Hairline Split Explorer: Left Interactive Selector + Right Morphing Media Stage */}
        <div className="border border-[#E2E2DC] grid grid-cols-1 lg:grid-cols-12">
          {/* Left 5 Cols: Interactive Index */}
          <div className="lg:col-span-5 divide-y divide-[#E2E2DC] lg:border-r border-[#E2E2DC]">
            {CITIZEN_SERVICES.map((wf, idx) => {
              const active = idx === activeWorkflowIdx;
              return (
                <button
                  key={wf.key}
                  type="button"
                  onClick={() => setActiveWorkflowIdx(idx)}
                  onMouseEnter={() => setActiveWorkflowIdx(idx)}
                  className={`w-full text-left p-6 transition-colors relative cursor-pointer ${
                    active ? 'bg-[#111111] text-white' : 'bg-white text-[#111111] hover:bg-[#F5F5F2]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 text-xs font-mono">
                    <span className={active ? 'text-[#E86F1F] font-semibold' : 'text-[#C8232C] font-semibold'}>
                      {wf.index} · {wf.category}
                    </span>
                    <ArrowRight
                      className={`w-4 h-4 transition-transform ${
                        active ? 'translate-x-1 text-white' : 'text-[#A1A19B]'
                      }`}
                    />
                  </div>
                  <h3 className="font-display text-xl font-semibold mt-2">
                    {wf.title[lang]}
                  </h3>
                  <p className={`text-xs mt-1.5 ${active ? 'text-white/75' : 'text-[#575753]'}`}>
                    {wf.stat}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right 7 Cols: Morphing Editorial Stage */}
          <div className="lg:col-span-7 bg-[#F5F5F2] flex flex-col justify-between overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeWorkflow.key}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col h-full justify-between"
              >
                <div className="relative h-72 sm:h-80 overflow-hidden border-b border-[#E2E2DC]">
                  <motion.img
                    key={activeWorkflow.image}
                    initial={{ scale: 1.05 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    src={activeWorkflow.image}
                    alt={activeWorkflow.imageAlt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-7 sm:p-8 bg-white flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <p className="text-xs font-mono uppercase tracking-wider text-[#0D7A43] font-semibold">
                      {activeWorkflow.assurance}
                    </p>
                    <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#111111]">
                      {activeWorkflow.title[lang]}
                    </h3>
                    <p className="text-sm text-[#575753] leading-relaxed">
                      {activeWorkflow.summary[lang]}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#ECECE7] flex flex-wrap items-center justify-between gap-4">
                    <span className="font-mono text-xs text-[#111111] font-medium">
                      {activeWorkflow.stat}
                    </span>
                    <button
                      type="button"
                      onClick={() => onOpenService(activeWorkflow.key)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#C8232C] hover:bg-[#A11A22] transition-colors whitespace-nowrap cursor-pointer"
                    >
                      {lang === 'hi' ? 'सेवा खोलें' : 'Open Service'}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ================= INDIA DIGITAL PUBLIC INFRASTRUCTURE BAND (MATTE CARBON) ================= */}
      <section className="bg-[#111111] text-white border-t border-b border-[#242422]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12">
          {/* Left Sculptural DPI Visual */}
          <div className="lg:col-span-5 relative min-h-[320px] lg:border-r border-white/12">
            <img
              src={ASSETS.dpiArchitecture}
              alt="India Digital Public Infrastructure architecture — Aadhaar, Bhashini, DigiLocker and Zero-Knowledge Proofs"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 font-mono text-[11px] text-white/75">
              INDIA DPI STACK · AADHAAR / BHASHINI / DIGILOCKER / ZKP
            </div>
          </div>

          {/* Right Interactive Architecture Layers */}
          <div className="lg:col-span-7 p-8 sm:p-12 space-y-8">
            <div className="space-y-2">
              <p className="text-xs font-mono tracking-widest uppercase text-[#E86F1F]">
                DIGITAL PUBLIC INFRASTRUCTURE · ARCHITECTURE
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white">
                Built on India&apos;s open sovereign trust stack
              </h2>
            </div>

            {/* Interactive Layer Selector */}
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                {DPI_PILLARS.map((pillar, idx) => {
                  const active = idx === activePillarIdx;
                  return (
                    <button
                      key={pillar.id}
                      type="button"
                      onClick={() => setActivePillarIdx(idx)}
                      className={`text-left py-2.5 px-3 border transition-colors cursor-pointer ${
                        active
                          ? 'bg-white text-[#111111] border-white'
                          : 'bg-transparent text-white/70 border-white/15 hover:border-white/40 hover:text-white'
                      }`}
                    >
                      <p className="font-mono text-xs font-semibold tabular-nums">
                        {pillar.code}
                      </p>
                      <p className="text-[11px] opacity-80 truncate mt-0.5">
                        {pillar.label}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Animated Progress Scrub Bar */}
              <div className="h-[3px] w-full bg-white/15 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#C8232C] to-[#E86F1F]"
                  animate={{ width: `${((activePillarIdx + 1) / DPI_PILLARS.length) * 100}%` }}
                  transition={{ type: 'spring', stiffness: 220, damping: 26 }}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activePillar.id}
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -14 }}
                transition={{ duration: 0.25 }}
                className="space-y-5 pt-2"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                  <span className="text-white/60">{activePillar.label}</span>
                  <span className="text-[#4ADE80] font-semibold">
                    {activePillar.standardMetric}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-semibold text-white">
                  {activePillar.title[lang]}
                </h3>
                <p className="text-sm text-white/75 leading-relaxed">
                  {activePillar.summary[lang]}
                </p>
                <ul className="space-y-2.5 pt-2 border-t border-white/12">
                  {activePillar.capabilities.map((cap, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-white/90">
                      <CheckCircle2 className="w-4 h-4 text-[#E86F1F] shrink-0 mt-0.5" />
                      <span>{cap[lang]}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ================= OFFICIAL UIDAI 8 REGIONAL OFFICES HAIRLINE DIRECTORY ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 border-b border-[#E2E2DC]">
          <div>
            <p className="text-xs font-mono tracking-wider uppercase text-[#C8232C] font-semibold">
              OFFICIAL UIDAI 8 REGIONAL OFFICES · SEVA KENDRA NETWORK
            </p>
            <h2 className="font-display text-3xl font-semibold text-[#111111] mt-1.5">
              Zero-queue Seva Kendra slots &amp; named Nodal Officers
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('centers')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#111111] hover:text-[#C8232C] transition-colors cursor-pointer"
          >
            Open Full Seva Kendra &amp; Doorstep Scheduler
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="border border-[#E2E2DC] grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-4 divide-y divide-[#E2E2DC] lg:border-r border-[#E2E2DC]">
            {REGIONAL_OFFICES.map((ro) => {
              const active = ro.id === selectedRoId;
              return (
                <button
                  key={ro.id}
                  type="button"
                  onClick={() => setSelectedRoId(ro.id)}
                  className={`w-full text-left px-5 py-3.5 flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#111111] text-white'
                      : 'bg-white text-[#111111] hover:bg-[#F5F5F2]'
                  }`}
                >
                  <span className="text-sm font-semibold">{ro.city}</span>
                  <span
                    className={`font-mono text-xs tabular-nums ${
                      active ? 'text-[#E86F1F]' : 'text-[#0D7A43]'
                    }`}
                  >
                    {ro.waitMinutes}m wait
                  </span>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-8 p-7 sm:p-9 bg-white flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedRo.id}
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.22 }}
                className="space-y-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#ECECE7] pb-5">
                  <div>
                    <p className="inline-flex items-center gap-1.5 text-xs font-mono text-[#C8232C] font-semibold">
                      <Building2 className="w-3.5 h-3.5" />
                      UIDAI REGIONAL OFFICE · {selectedRo.city.toUpperCase()}
                    </p>
                    <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#111111] mt-1">
                      {selectedRo.city} Aadhaar Seva Kendra
                    </h3>
                  </div>
                  <div className="text-right text-xs">
                    <p className="text-[#575753]">Live Queue Estimate</p>
                    <p className="font-mono font-semibold text-[#0D7A43] tabular-nums mt-0.5">
                      {selectedRo.waitMinutes} mins · {selectedRo.nextSlot}
                    </p>
                  </div>
                </div>

                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                  <div>
                    <dt className="text-[#575753] font-semibold flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C8232C]" />
                      Official Address
                    </dt>
                    <dd className="text-[#111111] mt-1.5 leading-relaxed">
                      {selectedRo.address}
                    </dd>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <dt className="text-[#575753] font-semibold">States / UTs Covered</dt>
                      <dd className="text-[#111111] mt-1 leading-relaxed">
                        {selectedRo.jurisdiction}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[#575753] font-semibold">72h SLA Nodal Officer</dt>
                      <dd className="text-[#111111] font-semibold mt-0.5">
                        {selectedRo.nodalOfficer}
                      </dd>
                    </div>
                  </div>
                </dl>

                <div className="pt-5 border-t border-[#ECECE7] flex flex-wrap items-center justify-between gap-4">
                  <p className="text-xs text-[#575753]">
                    Pre-verified via Passkey — walk straight to the biometric counter.
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      setBookedSlots((prev) => ({ ...prev, [selectedRo.id]: true }))
                    }
                    className={`inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                      bookedSlots[selectedRo.id]
                        ? 'bg-[#0D7A43] text-white'
                        : 'bg-[#111111] hover:bg-[#C8232C] text-white'
                    }`}
                  >
                    <CalendarCheck2 className="w-3.5 h-3.5" />
                    {bookedSlots[selectedRo.id]
                      ? `Slot Confirmed · ${selectedRo.nextSlot}`
                      : `Reserve ${selectedRo.nextSlot}`}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
