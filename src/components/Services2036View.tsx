import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  AlertTriangle,
  ArrowRight,
  Check,
  CheckCircle2,
  Download,
  FileCheck2,
  Fingerprint,
  Lock,
  PhoneCall,
  QrCode,
  RefreshCw,
  ScanLine,
  ShieldAlert,
  ShieldCheck,
  Truck,
  Unlock,
} from 'lucide-react';
import {
  AuthLogEntry,
  Lang,
  ServiceKey,
  SrnRecord,
} from '../data/uidaiData';
import { AadhaarSunburstMark, AshokaWheelSeal } from './UidaiEmblems';

interface Services2036ViewProps {
  lang: Lang;
  activeService: ServiceKey;
  setActiveService: (key: ServiceKey) => void;
  srnRecords: SrnRecord[];
  onAddSrn: (record: SrnRecord) => void;
  onEscalateSrn: (srn: string) => void;
  authLogs: AuthLogEntry[];
  onFlagAuthLog: (id: string) => void;
}

export function Services2036View({
  lang,
  activeService,
  setActiveService,
  srnRecords,
  onAddSrn,
  onEscalateSrn,
  authLogs,
  onFlagAuthLog,
}: Services2036ViewProps) {
  // ---- Service 1: DigiLocker Address Update State ----
  const [passkeyVerified, setPasskeyVerified] = useState(false);
  const [verifyingPasskey, setVerifyingPasskey] = useState(false);
  const [poaSource, setPoaSource] = useState<'digilocker' | 'upload'>('digilocker');
  const [simulateExpiredUpload, setSimulateExpiredUpload] = useState(false);
  const [ocrScanning, setOcrScanning] = useState(false);
  const [addressEn, setAddressEn] = useState(
    'B-42, Malviya Nagar, Sector 6, Jaipur, Rajasthan - 302017'
  );
  const [addressHi, setAddressHi] = useState(
    'बी-42, मालवीय नगर, सेक्टर 6, जयपुर, राजस्थान - 302017'
  );
  const [hindiSpellConfirmed, setHindiSpellConfirmed] = useState(false);
  const [submittedSrn, setSubmittedSrn] = useState<string | null>(null);

  // ---- Service 2: Passwordless e-Aadhaar & Selective ZKP State ----
  const [shareName, setShareName] = useState(true);
  const [shareAge18, setShareAge18] = useState(true);
  const [shareMaskedId, setShareMaskedId] = useState(true);
  const [sharePinOnly, setSharePinOnly] = useState(true);
  const [shareFullAddress, setShareFullAddress] = useState(false);
  const [cardDisplayMode, setCardDisplayMode] = useState<'zkp' | 'standard'>('zkp');
  const [zkpToken, setZkpToken] = useState<string>('ZKP-2036-JPR-9F4A');

  // ---- Service 3: Tracker Selection State ----
  const [selectedSrnId, setSelectedSrnId] = useState<string>(srnRecords[0]?.srn ?? '');
  const [callbackScheduled, setCallbackScheduled] = useState<Record<string, boolean>>({});

  // ---- Service 4: Biometric Vault State ----
  const [biometricsLocked, setBiometricsLocked] = useState(true);
  const [virtualId, setVirtualId] = useState('9148 3302 7719 5042');
  const [vidSpinning, setVidSpinning] = useState(false);

  const handlePasskeyAuth = () => {
    setVerifyingPasskey(true);
    setTimeout(() => {
      setVerifyingPasskey(false);
      setPasskeyVerified(true);
    }, 950);
  };

  const triggerOcrScan = (expired: boolean) => {
    setOcrScanning(true);
    setSimulateExpiredUpload(expired);
    setTimeout(() => {
      setOcrScanning(false);
    }, 650);
  };

  const completedStepsCount =
    (passkeyVerified ? 1 : 0) +
    (poaSource === 'digilocker' || !simulateExpiredUpload ? 1 : 0) +
    (hindiSpellConfirmed ? 1 : 0);

  const canSubmitAddress =
    passkeyVerified &&
    hindiSpellConfirmed &&
    (poaSource === 'digilocker' || !simulateExpiredUpload) &&
    addressEn.trim().length > 8 &&
    addressHi.trim().length > 8;

  const handleSubmitAddress = () => {
    if (!canSubmitAddress) return;
    const newSrnCode = `SRN-2036-ADR-${Math.floor(80000 + Math.random() * 19000)}`;
    const newRecord: SrnRecord = {
      srn: newSrnCode,
      type: {
        hi: 'डिजिलॉकर सत्यापित पता अद्यतन',
        en: 'DigiLocker Verified Address Update',
      },
      submittedDate: '20 Nov 2036',
      slaDeadline: '21 Nov 2036 (Instant SLA · On Track)',
      currentStageIndex: 2,
      nodalOfficer: 'Smt. Kavita Rathore · Regional Office, New Delhi / Jaipur',
      escalationEligible: false,
      stages: [
        {
          label: { hi: 'पासकी प्रमाणीकरण पूर्ण', en: 'Passkey Authentication Verified' },
          timestamp: '20 Nov · Just now',
          detail: {
            hi: 'डिवाइस पासकी और फेस लाइवनेस 1.2s में सत्यापित।',
            en: 'Device passkey & face liveness authenticated in 1.2s.',
          },
        },
        {
          label: { hi: 'प्री-फ्लाइट दस्तावेज़ व हिंदी जांच', en: 'Pre-Submission PoA & Devanagari Lock Passed' },
          timestamp: '20 Nov · Just now',
          detail: {
            hi:
              poaSource === 'digilocker'
                ? 'JVVNL डिजिलॉकर बिल डिजिटल हस्ताक्षर सत्यापित।'
                : '5-बिंदु OCR पूर्व-जांच व देवनागरी वर्तनी पुष्ट।',
            en:
              poaSource === 'digilocker'
                ? 'JVVNL DigiLocker utility bill cryptographically verified.'
                : '5-point OCR pre-check & Devanagari spelling confirmed.',
          },
        },
        {
          label: { hi: 'CIDR सिंक प्रगति पर', en: 'CIDR Sync In Progress' },
          timestamp: 'ETA < 4 hours',
          detail: {
            hi: `नया पता: ${addressHi}`,
            en: `New Address: ${addressEn}`,
          },
        },
        {
          label: { hi: 'यूनिकोड ई-आधार अपडेट', en: 'Unicode e-Aadhaar Refreshed' },
          timestamp: 'Pending',
          detail: {
            hi: 'वॉलेट और डिजिलॉकर में स्वतः अद्यतन।',
            en: 'Auto-synced to citizen wallet & DigiLocker.',
          },
        },
      ],
    };

    onAddSrn(newRecord);
    setSubmittedSrn(newSrnCode);
    setSelectedSrnId(newSrnCode);
  };

  const handleRegenerateZkp = () => {
    const suffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    setZkpToken(`ZKP-2036-JPR-${suffix}`);
  };

  const handleDownloadUnicodeReceipt = () => {
    const receiptText = [
      '======================================================',
      'UNIQUE IDENTIFICATION AUTHORITY OF INDIA (UIDAI)',
      'VERIFIED UTF-8 DIGITAL AADHAAR CREDENTIAL',
      '======================================================',
      `Credential Token: ${zkpToken}`,
      `Name / नाम: ${shareName || cardDisplayMode === 'standard' ? 'Rajesh Sharma / राजेश शर्मा' : '[Redacted]'}`,
      `Age Proof / आयु प्रमाण: ${shareAge18 || cardDisplayMode === 'standard' ? 'Verified 18+ (DOB Protected)' : '[Redacted]'}`,
      `Aadhaar / आधार: ${shareMaskedId || cardDisplayMode === 'standard' ? 'XXXX-XXXX-4821 (Masked)' : '[Redacted]'}`,
      `Location / पता: ${
        shareFullAddress || cardDisplayMode === 'standard'
          ? `${addressEn} | ${addressHi}`
          : sharePinOnly
          ? 'PIN 302017 · Jaipur, Rajasthan'
          : '[Redacted]'
      }`,
      'Validity: 15 Minutes (Selective Zero-Knowledge Proof)',
      'Encoding: UTF-8 Native Devanagari · Ed25519 Signed',
    ].join('\n');

    const blob = new Blob([receiptText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${zkpToken}-unicode-aadhaar.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleRotateVid = () => {
    setVidSpinning(true);
    setTimeout(() => {
      const block = () => Math.floor(1000 + Math.random() * 9000);
      setVirtualId(`${block()} ${block()} ${block()} ${block()}`);
      setVidSpinning(false);
    }, 320);
  };

  const selectedSrn =
    srnRecords.find((r) => r.srn === selectedSrnId) ?? srnRecords[0];

  const tabs: { key: ServiceKey; num: string; label: { hi: string; en: string }; icon: typeof FileCheck2 }[] = [
    {
      key: 'address',
      num: '01',
      label: { hi: 'पता अद्यतन', en: 'Update Address' },
      icon: FileCheck2,
    },
    {
      key: 'eaadhaar',
      num: '02',
      label: { hi: 'ई-आधार व ZKP', en: 'e-Aadhaar & ZKP' },
      icon: QrCode,
    },
    {
      key: 'tracker',
      num: '03',
      label: { hi: 'SRN व पीवीसी ट्रैक', en: 'Track SRN & PVC' },
      icon: Truck,
    },
    {
      key: 'vault',
      num: '04',
      label: { hi: 'बायोमेट्रिक वॉल्ट', en: 'Biometric Vault' },
      icon: Fingerprint,
    },
  ];

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Architectural Header & Hairline Service Switcher */}
      <header className="border-b border-[#E2E2DC] bg-white">
        <div className="max-w-7xl mx-auto px-6 pt-12 pb-8 space-y-6">
          <div className="space-y-3">
            <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#C8232C] font-semibold">
              {lang === 'hi'
                ? 'मेरा आधार · ऑनलाइन स्व-सेवा पोर्टल'
                : 'My Aadhaar · Resident Self-Service Portal'}
            </p>
            <h1 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-[#111111]">
              {lang === 'hi'
                ? 'नागरिक ऑनलाइन सेवाएँ'
                : 'Manage your Aadhaar online'}
            </h1>
            <p className="text-sm sm:text-base text-[#575753] max-w-3xl leading-relaxed">
              {lang === 'hi'
                ? 'डिजिलॉकर द्वारा पता अद्यतन करें, पासवर्ड-मुक्त यूनिकोड ई-आधार डाउनलोड करें, पीवीसी कार्ड ट्रैक करें और बायोमेट्रिक सुरक्षा नियंत्रित करें।'
                : 'Update your address through DigiLocker, issue selective zero-knowledge credentials, track India Post PVC dispatches, and manage biometric permissions.'}
            </p>
          </div>
        </div>

        {/* Full-Width Architectural Tab Bar */}
        <div className="border-t border-[#E2E2DC] bg-[#F5F5F2]/60">
          <div className="max-w-7xl mx-auto px-6 flex items-center overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeService === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveService(tab.key)}
                  className={`relative inline-flex items-center gap-2.5 px-5 py-4 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer border-r border-[#E2E2DC] first:pl-0 ${
                    isActive
                      ? 'text-[#111111] font-semibold bg-white'
                      : 'text-[#575753] hover:text-[#111111]'
                  }`}
                >
                  <span className={`font-mono text-[11px] ${isActive ? 'text-[#C8232C]' : 'text-[#8C8C86]'}`}>
                    {tab.num}
                  </span>
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#111111]' : 'text-[#8C8C86]'}`} />
                  <span>{tab.label[lang]}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activeServiceUnderline"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C8232C]"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 pt-10">
        <AnimatePresence mode="wait">
          {/* ================= SERVICE 1: DIGILOCKER ADDRESS UPDATE ================= */}
          {activeService === 'address' && (
            <motion.div
              key="svc-address"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              <div className="lg:col-span-8 border border-[#E2E2DC] divide-y divide-[#E2E2DC] bg-white">
                {/* Live Guided Readiness Bar */}
                <div className="p-6 bg-[#F5F5F2] space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono uppercase tracking-[0.1em] font-semibold text-[#111111]">
                      Address Update Verification Progress
                    </span>
                    <span className="font-mono font-semibold text-[#111111] tabular-nums">
                      {completedStepsCount} / 3 STEPS COMPLETE
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-[#E2E2DC] overflow-hidden">
                    <motion.div
                      className="h-full"
                      style={{
                        background:
                          completedStepsCount === 3
                            ? '#0D7A43'
                            : 'linear-gradient(90deg, #C8232C 0%, #E86F1F 100%)',
                      }}
                      initial={false}
                      animate={{ width: `${Math.round((completedStepsCount / 3) * 100)}%` }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </div>

                {/* Step A: Passkey / Face Auth with Animated Biometric Scan Beam */}
                <div className="p-6 sm:p-7 space-y-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-mono tracking-[0.12em] uppercase text-[#C8232C] font-semibold">
                        Step 01 / 03 · Authentication
                      </p>
                      <h2 className="font-display text-xl font-semibold text-[#111111] mt-1">
                        Verify Identity with Device Passkey or Face Liveness
                      </h2>
                    </div>
                    {passkeyVerified && (
                      <motion.span
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#0D7A43] shrink-0"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        VERIFIED 1.2s
                      </motion.span>
                    )}
                  </div>

                  {!passkeyVerified ? (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#E2E2DC]">
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 bg-[#111111] flex items-center justify-center overflow-hidden shrink-0">
                          <Fingerprint className="w-6 h-6 text-white" />
                          {verifyingPasskey && (
                            <motion.div
                              initial={{ y: -24 }}
                              animate={{ y: 24 }}
                              transition={{ repeat: Infinity, repeatType: 'reverse', duration: 0.45 }}
                              className="absolute inset-x-0 h-[2px] bg-[#C8232C] shadow-[0_0_10px_#C8232C]"
                            />
                          )}
                        </div>
                        <div className="text-sm text-[#575753]">
                          <p>
                            Resident: <span className="font-semibold text-[#111111]">Rajesh Sharma</span>
                          </p>
                          <p className="text-xs font-mono text-[#8C8C86] mt-0.5 tabular-nums">
                            MASKED XXXX-4821 · JAIPUR, RAJASTHAN
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handlePasskeyAuth}
                        disabled={verifyingPasskey}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#111111] hover:bg-[#C8232C] transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-75"
                      >
                        <Fingerprint className="w-4 h-4" />
                        {verifyingPasskey ? 'Verifying Passkey...' : 'Verify with Passkey'}
                      </button>
                    </div>
                  ) : (
                    <p className="text-xs text-[#0D7A43] font-medium pt-4 border-t border-[#E2E2DC]">
                      Rajesh Sharma · Cryptographic FIDO2 passkey session verified.
                    </p>
                  )}
                </div>

                {/* Step B: Document Source & Animated Pre-Submission OCR Scanner */}
                <div className="p-6 sm:p-7 space-y-5">
                  <div>
                    <p className="text-[11px] font-mono tracking-[0.12em] uppercase text-[#C8232C] font-semibold">
                      Step 02 / 03 · Proof of Address (PoA)
                    </p>
                    <h2 className="font-display text-xl font-semibold text-[#111111] mt-1">
                      Select Verified Proof of Address Source
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 border border-[#E2E2DC] divide-y sm:divide-y-0 sm:divide-x divide-[#E2E2DC]">
                    <button
                      type="button"
                      onClick={() => setPoaSource('digilocker')}
                      className={`text-left p-4 transition-colors cursor-pointer ${
                        poaSource === 'digilocker'
                          ? 'bg-[#111111] text-white'
                          : 'bg-white text-[#111111] hover:bg-[#F5F5F2]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold">DigiLocker Auto-Fetch</p>
                        <span
                          className={`text-[10px] font-mono uppercase tracking-wider ${
                            poaSource === 'digilocker' ? 'text-[#E86F1F]' : 'text-[#0D7A43]'
                          }`}
                        >
                          ₹0 Fee · Instant
                        </span>
                      </div>
                      <p
                        className={`text-xs mt-1.5 leading-relaxed ${
                          poaSource === 'digilocker' ? 'text-white/75' : 'text-[#575753]'
                        }`}
                      >
                        Jaipur Vidyut Vitran Nigam (JVVNL) · Cryptographically signed
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPoaSource('upload')}
                      className={`text-left p-4 transition-colors cursor-pointer ${
                        poaSource === 'upload'
                          ? 'bg-[#111111] text-white'
                          : 'bg-white text-[#111111] hover:bg-[#F5F5F2]'
                      }`}
                    >
                      <p className="text-sm font-semibold">Upload PDF / Photo (Pre-Check OCR)</p>
                      <p
                        className={`text-xs mt-1.5 leading-relaxed ${
                          poaSource === 'upload' ? 'text-white/75' : 'text-[#575753]'
                        }`}
                      >
                        Verifies 90-day issue date, sharpness &amp; name match before submission
                      </p>
                    </button>
                  </div>

                  {poaSource === 'digilocker' ? (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-[#F0F9F4] border border-[#0D7A43]/30 space-y-1.5"
                    >
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#0D7A43]">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        JVVNL Electricity Bill #RJ-2036-88412 Cryptographically Verified (08 Nov 2036)
                      </div>
                      <p className="text-xs text-[#575753]">
                        Name match: 100% · Issue age: 12 days (&lt; 90-day UIDAI rule) · Eligible for automatic approval.
                      </p>
                    </motion.div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-[#F5F5F2] border border-[#E2E2DC]">
                        <span className="text-xs text-[#111111] font-semibold inline-flex items-center gap-2">
                          <ScanLine className="w-3.5 h-3.5 text-[#C8232C]" />
                          Uploaded Document Sample Check:
                        </span>
                        <div className="inline-flex border border-[#E2E2DC] bg-white">
                          <button
                            type="button"
                            onClick={() => triggerOcrScan(false)}
                            className={`px-3 py-1.5 text-xs font-semibold cursor-pointer whitespace-nowrap transition-colors ${
                              !simulateExpiredUpload
                                ? 'bg-[#111111] text-white'
                                : 'text-[#575753] hover:text-[#111111]'
                            }`}
                          >
                            Recent Bill (18d)
                          </button>
                          <button
                            type="button"
                            onClick={() => triggerOcrScan(true)}
                            className={`px-3 py-1.5 text-xs font-semibold cursor-pointer whitespace-nowrap transition-colors border-l border-[#E2E2DC] ${
                              simulateExpiredUpload
                                ? 'bg-[#C8232C] text-white'
                                : 'text-[#575753] hover:text-[#111111]'
                            }`}
                          >
                            Expired Bill (114d)
                          </button>
                        </div>
                      </div>

                      <div className="relative overflow-hidden">
                        {ocrScanning && (
                          <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: '100%' }}
                            transition={{ duration: 0.6, ease: 'easeInOut' }}
                            className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-[#C8232C]/25 to-transparent pointer-events-none"
                          />
                        )}

                        {simulateExpiredUpload ? (
                          <div className="p-4 bg-[#FDF2F2] border border-[#C8232C]/35 space-y-1.5">
                            <div className="flex items-center gap-2 text-xs font-semibold text-[#C8232C]">
                              <AlertTriangle className="w-4 h-4 shrink-0" />
                              Pre-Submission Check Failed — Utility Bill Exceeds 90-Day Limit (114 Days Old)
                            </div>
                            <p className="text-xs text-[#575753]">
                              UIDAI requires utility bills issued within the last 3 months. Please select a recent bill or switch to DigiLocker Auto-Fetch above.
                            </p>
                          </div>
                        ) : (
                          <div className="p-4 bg-[#F0F9F4] border border-[#0D7A43]/30 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-[#0D7A43] font-semibold">
                            <span className="flex items-center gap-1.5">
                              <Check className="w-3.5 h-3.5" />
                              Clarity: 300 DPI Sharp
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Check className="w-3.5 h-3.5" />
                              Date: 18 days (&lt; 90d)
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Check className="w-3.5 h-3.5" />
                              Name Match: Rajesh Sharma
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Step C: Live Bilingual English & Devanagari Lock */}
                <div className="p-6 sm:p-7 space-y-5">
                  <div>
                    <p className="text-[11px] font-mono tracking-[0.12em] uppercase text-[#C8232C] font-semibold">
                      Step 03 / 03 · Bilingual Confirmation
                    </p>
                    <h2 className="font-display text-xl font-semibold text-[#111111] mt-1">
                      Review English &amp; Devanagari (Hindi) Address
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase tracking-wider text-[#575753]" htmlFor="addr-en">
                        English Address
                      </label>
                      <textarea
                        id="addr-en"
                        rows={3}
                        value={addressEn}
                        onChange={(e) => setAddressEn(e.target.value)}
                        className="w-full p-3 text-sm bg-[#F5F5F2] border border-[#E2E2DC] text-[#111111] focus:outline-none focus:border-[#111111] focus:bg-white transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase tracking-wider text-[#575753]" htmlFor="addr-hi">
                        Regional Script (UTF-8 Devanagari)
                      </label>
                      <textarea
                        id="addr-hi"
                        rows={3}
                        value={addressHi}
                        onChange={(e) => setAddressHi(e.target.value)}
                        className="w-full p-3 text-sm bg-[#F5F5F2] border border-[#E2E2DC] text-[#111111] focus:outline-none focus:border-[#111111] focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <label className="flex items-start gap-3 text-xs text-[#111111] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hindiSpellConfirmed}
                      onChange={(e) => setHindiSpellConfirmed(e.target.checked)}
                      className="mt-0.5 w-4 h-4 accent-[#C8232C]"
                    />
                    <span className="leading-relaxed">
                      I confirm both English and Hindi (Devanagari) spellings above. This verified UTF-8 address will be embedded into my digital e-Aadhaar and future PVC prints.
                    </span>
                  </label>

                  <div className="pt-5 border-t border-[#E2E2DC] flex flex-wrap items-center justify-between gap-4">
                    <p className="text-xs text-[#575753]">
                      {poaSource === 'digilocker' ? (
                        <>
                          Statutory Fee (DigiLocker Auto-Verified):{' '}
                          <span className="font-mono font-semibold text-[#0D7A43]">₹0</span>
                        </>
                      ) : (
                        <>
                          Statutory Fee (Manual Document Review):{' '}
                          <span className="font-mono font-semibold text-[#111111]">₹50</span>
                        </>
                      )}
                    </p>
                    <button
                      type="button"
                      disabled={!canSubmitAddress}
                      onClick={handleSubmitAddress}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#C8232C] hover:bg-[#A61B23] transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-35 disabled:cursor-not-allowed"
                    >
                      Submit Address Update
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {submittedSrn && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-[#F0F9F4] border border-[#0D7A43]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <p className="text-xs font-semibold text-[#0D7A43]">
                          Request Submitted · Service Request Number: <span className="font-mono">{submittedSrn}</span>
                        </p>
                        <p className="text-xs text-[#575753] mt-0.5">
                          Your update is syncing with CIDR and is live in the SRN Tracker.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveService('tracker')}
                        className="px-4 py-2 text-xs font-semibold text-white bg-[#111111] hover:bg-[#C8232C] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        Track Live SRN
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Right Context Rail — Official UIDAI Assurance & Supported Issuers */}
              <aside className="lg:col-span-4 space-y-6">
                <div className="bg-[#111111] text-white p-7 space-y-5">
                  <div className="flex items-center justify-between border-b border-white/15 pb-4">
                    <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#E86F1F] font-semibold">
                      UIDAI Citizen Safeguards
                    </p>
                    <ShieldCheck className="w-4 h-4 text-[#4ADE80]" />
                  </div>
                  <ul className="space-y-4 text-xs text-white/80 leading-relaxed">
                    <li className="pb-4 border-b border-white/10">
                      <span className="font-mono font-semibold text-white block mb-1">
                        01 · FIDO2 Passkey Login
                      </span>
                      Instant biometric or device passkey verification with zero SMS OTP wait.
                    </li>
                    <li className="pb-4 border-b border-white/10">
                      <span className="font-mono font-semibold text-white block mb-1">
                        02 · Pre-Submission OCR Check
                      </span>
                      Validates issue date, clarity, and name match before any payment is requested.
                    </li>
                    <li>
                      <span className="font-mono font-semibold text-white block mb-1">
                        03 · Native UTF-8 Scripts
                      </span>
                      Guaranteed accurate rendering across Hindi and all 21 other scheduled languages.
                    </li>
                  </ul>
                </div>

                <div className="border border-[#E2E2DC] bg-[#F5F5F2] p-6 space-y-3">
                  <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-[#575753] font-semibold">
                    Verified DigiLocker PoA Issuers
                  </p>
                  <ul className="text-xs text-[#111111] space-y-2 pt-2 border-t border-[#E2E2DC]">
                    <li>• State Electricity Discoms (JVVNL, BESCOM, MSEDCL, TSSPDCL)</li>
                    <li>• Indian Oil, Bharat Gas &amp; HPCL LPG Connections</li>
                    <li>• State Revenue &amp; Municipal Domicile Certificates</li>
                    <li>• India Post Passbooks &amp; Registered Rent Agreements</li>
                  </ul>
                </div>
              </aside>
            </motion.div>
          )}

          {/* ================= SERVICE 2: PASSWORDLESS UNICODE e-AADHAAR & ZKP ================= */}
          {activeService === 'eaadhaar' && (
            <motion.div
              key="svc-eaadhaar"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              <div className="lg:col-span-5 border border-[#E2E2DC] bg-white p-7 space-y-6">
                <div className="space-y-2">
                  <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#C8232C] font-semibold">
                    Selective Disclosure · ZKP
                  </p>
                  <h2 className="font-display text-2xl font-semibold text-[#111111]">
                    Choose what the verifier sees
                  </h2>
                  <p className="text-xs text-[#575753] leading-relaxed">
                    Toggle individual cryptographic attributes for hotel check-in, airport entry, or telecom KYC without exposing your full 12-digit Aadhaar.
                  </p>
                </div>

                <div className="divide-y divide-[#E2E2DC] border-t border-b border-[#E2E2DC]">
                  {[
                    {
                      label: 'Full Name (English & Hindi)',
                      checked: shareName,
                      toggle: () => setShareName(!shareName),
                    },
                    {
                      label: 'Age 18+ Proof Only (Hide exact DOB)',
                      checked: shareAge18,
                      toggle: () => setShareAge18(!shareAge18),
                    },
                    {
                      label: 'Masked Aadhaar (Last 4 digits: 4821)',
                      checked: shareMaskedId,
                      toggle: () => setShareMaskedId(!shareMaskedId),
                    },
                    {
                      label: 'PIN Code & City Only (302017 · Jaipur)',
                      checked: sharePinOnly,
                      toggle: () => setSharePinOnly(!sharePinOnly),
                    },
                    {
                      label: 'Full Residential Address',
                      checked: shareFullAddress,
                      toggle: () => setShareFullAddress(!shareFullAddress),
                    },
                  ].map((row, idx) => (
                    <label
                      key={idx}
                      className="flex items-center justify-between gap-3 py-3 cursor-pointer hover:bg-[#F5F5F2]/60 transition-colors"
                    >
                      <span className="text-sm text-[#111111]">{row.label}</span>
                      <input
                        type="checkbox"
                        checked={row.checked}
                        onChange={row.toggle}
                        className="w-4 h-4 accent-[#C8232C]"
                      />
                    </label>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleRegenerateZkp}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#111111] hover:bg-[#C8232C] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Generate Fresh 15m Token
                  </button>
                  <button
                    type="button"
                    onClick={handleDownloadUnicodeReceipt}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#111111] bg-[#F5F5F2] hover:bg-[#EAEAE4] border border-[#E2E2DC] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download Unicode Copy
                  </button>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E2E2DC]">
                  <span className="text-xs font-mono uppercase tracking-[0.12em] text-[#575753]">
                    Live Digital Credential
                  </span>
                  <div className="inline-flex border border-[#E2E2DC] bg-[#F5F5F2]">
                    <button
                      type="button"
                      onClick={() => setCardDisplayMode('zkp')}
                      className={`px-3 py-1.5 text-xs font-semibold cursor-pointer transition-colors ${
                        cardDisplayMode === 'zkp'
                          ? 'bg-[#111111] text-white'
                          : 'text-[#575753] hover:text-[#111111]'
                      }`}
                    >
                      Selective ZKP Pass
                    </button>
                    <button
                      type="button"
                      onClick={() => setCardDisplayMode('standard')}
                      className={`px-3 py-1.5 text-xs font-semibold cursor-pointer transition-colors border-l border-[#E2E2DC] ${
                        cardDisplayMode === 'standard'
                          ? 'bg-[#111111] text-white'
                          : 'text-[#575753] hover:text-[#111111]'
                      }`}
                    >
                      Full e-Aadhaar Card
                    </button>
                  </div>
                </div>

                <div className="bg-architectural-grid border border-[#E2E2DC] p-6 sm:p-8">
                  <AnimatePresence mode="wait">
                    {cardDisplayMode === 'standard' ? (
                      <motion.div
                        key="standard-eaadhaar"
                        initial={{ opacity: 0, rotateY: -20 }}
                        animate={{ opacity: 1, rotateY: 0 }}
                        exit={{ opacity: 0, rotateY: 20 }}
                        transition={{ duration: 0.35 }}
                        className="bg-white border border-[#111111]/15 shadow-lg overflow-hidden"
                      >
                        <div className="h-[3px] w-full flex">
                          <div className="flex-1 bg-[#E86F1F]" />
                          <div className="flex-1 bg-white" />
                          <div className="flex-1 bg-[#0D7A43]" />
                        </div>
                        <div className="p-7 space-y-5">
                          <div className="flex items-start justify-between gap-4 border-b border-[#E2E2DC] pb-4">
                            <div className="flex items-center gap-3">
                              <AshokaWheelSeal className="w-8 h-8 text-[#111111] shrink-0" />
                              <div>
                                <p className="text-[11px] font-mono uppercase tracking-wider text-[#575753]">
                                  Government of India · भारत सरकार
                                </p>
                                <h3 className="font-display text-lg font-semibold text-[#111111] mt-0.5">
                                  Official Unicode e-Aadhaar
                                </h3>
                              </div>
                            </div>
                            <AadhaarSunburstMark className="w-11 h-7 shrink-0" />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                            <div className="sm:col-span-8 space-y-3 text-sm">
                              <div>
                                <p className="text-[11px] font-mono uppercase text-[#8C8C86]">Name / नाम</p>
                                <p className="font-semibold text-[#111111] mt-0.5">
                                  Rajesh Sharma · राजेश शर्मा
                                </p>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-[11px] font-mono uppercase text-[#8C8C86]">Date of Birth</p>
                                  <p className="font-mono font-semibold text-[#111111] tabular-nums mt-0.5">
                                    14/06/1972
                                  </p>
                                </div>
                                <div>
                                  <p className="text-[11px] font-mono uppercase text-[#8C8C86]">Gender / लिंग</p>
                                  <p className="font-semibold text-[#111111] mt-0.5">Male / पुरुष</p>
                                </div>
                              </div>
                              <div>
                                <p className="text-[11px] font-mono uppercase text-[#8C8C86]">Registered Address</p>
                                <p className="text-xs text-[#111111] leading-relaxed mt-0.5">
                                  {addressHi}
                                  <span className="block text-[#575753] mt-0.5">{addressEn}</span>
                                </p>
                              </div>
                            </div>

                            <div className="sm:col-span-4 flex flex-col items-center justify-center p-4 bg-[#F5F5F2] border border-[#E2E2DC]">
                              <QrCode className="w-24 h-24 text-[#111111]" strokeWidth={1.5} />
                              <p className="font-mono text-[11px] text-[#0D7A43] font-semibold mt-2">
                                DIGITALLY SIGNED
                              </p>
                            </div>
                          </div>

                          <div className="pt-4 border-t border-[#E2E2DC] flex flex-wrap items-center justify-between gap-2 text-xs">
                            <span className="font-mono text-sm font-semibold tracking-widest text-[#111111] tabular-nums">
                              XXXX  XXXX  4821
                            </span>
                            <span className="font-mono text-[#575753]">
                              VID: {virtualId}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="horizon-zkp"
                        initial={{ opacity: 0, rotateY: 20 }}
                        animate={{ opacity: 1, rotateY: 0 }}
                        exit={{ opacity: 0, rotateY: -20 }}
                        transition={{ duration: 0.35 }}
                        className="bg-white border border-[#111111]/15 shadow-lg overflow-hidden"
                      >
                        <div className="h-[3px] w-full flex">
                          <div className="flex-1 bg-[#E86F1F]" />
                          <div className="flex-1 bg-white" />
                          <div className="flex-1 bg-[#0D7A43]" />
                        </div>
                        <div className="p-7 space-y-6">
                          <div className="flex items-start justify-between gap-4 border-b border-[#E2E2DC] pb-4">
                            <div className="flex items-center gap-3">
                              <AshokaWheelSeal className="w-8 h-8 text-[#111111] shrink-0" />
                              <div>
                                <p className="text-[11px] font-mono uppercase tracking-wider text-[#575753]">
                                  Government of India · भारत सरकार
                                </p>
                                <h3 className="font-display text-lg font-semibold text-[#111111] mt-0.5">
                                  Aadhaar Selective ZKP Credential
                                </h3>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                              <AadhaarSunburstMark className="w-10 h-6" />
                              <span className="font-mono text-[11px] font-semibold text-[#C8232C] tabular-nums">
                                {zkpToken}
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                            <div className="sm:col-span-8 space-y-4 text-sm">
                              <div>
                                <p className="text-[11px] font-mono uppercase text-[#8C8C86]">Name / नाम</p>
                                <p className="font-semibold text-[#111111] mt-0.5">
                                  {shareName ? 'Rajesh Sharma · राजेश शर्मा' : '— Redacted by resident —'}
                                </p>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-[11px] font-mono uppercase text-[#8C8C86]">Age Proof</p>
                                  <p className="font-semibold text-[#0D7A43] mt-0.5">
                                    {shareAge18 ? '18+ Verified (DOB Hidden)' : '— Hidden —'}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-[11px] font-mono uppercase text-[#8C8C86]">Aadhaar Ref</p>
                                  <p className="font-mono font-semibold text-[#111111] tabular-nums mt-0.5">
                                    {shareMaskedId ? 'XXXX-XXXX-4821' : '— Hidden —'}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <p className="text-[11px] font-mono uppercase text-[#8C8C86]">Location / Address</p>
                                <p className="text-xs text-[#111111] leading-relaxed mt-0.5">
                                  {shareFullAddress
                                    ? `${addressEn} · ${addressHi}`
                                    : sharePinOnly
                                    ? 'PIN 302017 · Jaipur, Rajasthan (Street address hidden)'
                                    : '— Redacted by resident —'}
                                </p>
                              </div>
                            </div>

                            <div className="sm:col-span-4 flex flex-col items-center justify-center p-4 bg-[#F5F5F2] border border-[#E2E2DC]">
                              <QrCode className="w-24 h-24 text-[#111111]" strokeWidth={1.5} />
                              <p className="font-mono text-[11px] text-[#575753] mt-2 tabular-nums">
                                EXPIRES 14:59
                              </p>
                            </div>
                          </div>

                          <div className="pt-4 border-t border-[#E2E2DC] flex flex-wrap items-center justify-between gap-2 text-xs text-[#575753]">
                            <span>Passkey Protected · Offline Verifiable</span>
                            <span className="font-mono font-semibold text-[#111111]">
                              UTF-8 · Ed25519 Signed
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}

          {/* ================= SERVICE 3: SRN & PVC ESCALATION LEDGER ================= */}
          {activeService === 'tracker' && (
            <motion.div
              key="svc-tracker"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 border border-[#E2E2DC] bg-white"
            >
              {/* Left Master List */}
              <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-[#E2E2DC] divide-y divide-[#E2E2DC]">
                <div className="px-5 py-4 bg-[#F5F5F2]">
                  <p className="text-[11px] font-mono tracking-[0.12em] uppercase text-[#575753] font-semibold">
                    Active Service Requests ({srnRecords.length})
                  </p>
                </div>
                {srnRecords.map((rec) => {
                  const isSelected = selectedSrn?.srn === rec.srn;
                  return (
                    <button
                      key={rec.srn}
                      type="button"
                      onClick={() => setSelectedSrnId(rec.srn)}
                      className={`w-full text-left p-5 transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#111111] text-white'
                          : 'bg-white text-[#111111] hover:bg-[#F5F5F2]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`font-mono text-xs font-semibold tabular-nums ${
                            isSelected ? 'text-[#E86F1F]' : 'text-[#111111]'
                          }`}
                        >
                          {rec.srn}
                        </span>
                        <span
                          className={`text-[11px] font-mono uppercase font-semibold ${
                            rec.escalationActive
                              ? isSelected
                                ? 'text-[#4ADE80]'
                                : 'text-[#0D7A43]'
                              : rec.escalationEligible
                              ? isSelected
                                ? 'text-[#F87171]'
                                : 'text-[#C8232C]'
                              : isSelected
                              ? 'text-white/70'
                              : 'text-[#575753]'
                          }`}
                        >
                          {rec.escalationActive
                            ? 'Escalated'
                            : rec.escalationEligible
                            ? 'SLA Breached'
                            : 'On Track'}
                        </span>
                      </div>
                      <p className="text-sm font-medium mt-1.5">{rec.type[lang]}</p>
                      <p
                        className={`text-xs mt-1 font-mono ${
                          isSelected ? 'text-white/60' : 'text-[#8C8C86]'
                        }`}
                      >
                        {rec.submittedDate}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Right Detail Timeline */}
              {selectedSrn && (
                <div className="lg:col-span-8 p-7 sm:p-8 space-y-6">
                  <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#E2E2DC] pb-5">
                    <div>
                      <p className="font-mono text-xs text-[#C8232C] font-semibold tabular-nums">
                        {selectedSrn.srn}
                        {selectedSrn.awbNumber && ` · India Post AWB ${selectedSrn.awbNumber}`}
                      </p>
                      <h2 className="font-display text-2xl font-semibold text-[#111111] mt-1">
                        {selectedSrn.type[lang]}
                      </h2>
                      <p className="text-xs text-[#575753] mt-1">
                        Assigned Nodal Officer:{' '}
                        <span className="text-[#111111] font-semibold">{selectedSrn.nodalOfficer}</span>
                      </p>
                    </div>
                    <div className="text-left sm:text-right text-xs">
                      <p className="font-mono uppercase text-[10px] tracking-wider text-[#8C8C86]">
                        SLA Deadline
                      </p>
                      <p
                        className={`font-semibold mt-1 ${
                          selectedSrn.escalationEligible && !selectedSrn.escalationActive
                            ? 'text-[#C8232C]'
                            : 'text-[#0D7A43]'
                        }`}
                      >
                        {selectedSrn.slaDeadline}
                      </p>
                    </div>
                  </div>

                  <ol className="space-y-5">
                    {selectedSrn.stages.map((st, idx) => {
                      const done = idx < selectedSrn.currentStageIndex;
                      const current = idx === selectedSrn.currentStageIndex;
                      return (
                        <li key={idx} className="flex items-start gap-4">
                          <div
                            className={`mt-0.5 w-6 h-6 flex items-center justify-center text-xs font-mono shrink-0 border ${
                              done
                                ? 'bg-[#111111] text-white border-[#111111]'
                                : current
                                ? selectedSrn.escalationEligible && !selectedSrn.escalationActive
                                  ? 'bg-[#C8232C] text-white border-[#C8232C]'
                                  : 'bg-[#E86F1F] text-white border-[#E86F1F]'
                                : 'bg-[#F5F5F2] text-[#8C8C86] border-[#E2E2DC]'
                            }`}
                          >
                            {done ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                          </div>
                          <div className="flex-1 pb-4 border-b border-[#E2E2DC] last:border-b-0">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <p className="text-sm font-semibold text-[#111111]">
                                {st.label[lang]}
                              </p>
                              <span className="font-mono text-xs text-[#575753] tabular-nums">
                                {st.timestamp}
                              </span>
                            </div>
                            <p className="text-xs text-[#575753] mt-1 leading-relaxed">
                              {st.detail[lang]}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ol>

                  {selectedSrn.escalationEligible && (
                    <div
                      className={`p-5 border space-y-3 ${
                        selectedSrn.escalationActive
                          ? 'bg-[#F0F9F4] border-[#0D7A43]/35'
                          : 'bg-[#FDF2F2] border-[#C8232C]/35'
                      }`}
                    >
                      {selectedSrn.escalationActive ? (
                        <div className="space-y-1.5">
                          <p className="text-xs font-semibold text-[#0D7A43] flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4" />
                            Nodal Officer Escalation Active (Ticket #NODAL-JPR-902) — Locked Against Auto-Closure
                          </p>
                          <p className="text-xs text-[#575753]">
                            Smt. Kavita Rathore (Regional Office) has been issued a mandatory 24-hour dispatch directive. This ticket cannot be closed without your confirmation OTP.
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="space-y-1">
                            <p className="text-xs font-semibold text-[#C8232C]">
                              72-Hour SLA Exceeded — Direct Nodal Escalation Available
                            </p>
                            <p className="text-xs text-[#575753]">
                              Escalate directly to the assigned Regional Nodal Officer with guaranteed 24-hour dispatch resolution.
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => onEscalateSrn(selectedSrn.srn)}
                            className="px-4 py-2.5 text-xs font-semibold text-white bg-[#C8232C] hover:bg-[#A61B23] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            Escalate to Nodal Officer
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#E2E2DC]">
                    <span className="text-xs text-[#575753]">
                      Need assistance? Request a direct callback from UIDAI 1947 in English or Hindi.
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setCallbackScheduled((prev) => ({
                          ...prev,
                          [selectedSrn.srn]: true,
                        }))
                      }
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#111111] bg-[#F5F5F2] hover:bg-[#111111] hover:text-white border border-[#E2E2DC] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      {callbackScheduled[selectedSrn.srn]
                        ? 'Callback Confirmed: In 4 mins'
                        : 'Schedule 1947 Callback'}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* ================= SERVICE 4: BIOMETRIC & CONSENT VAULT ================= */}
          {activeService === 'vault' && (
            <motion.div
              key="svc-vault"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 border border-[#E2E2DC] divide-y md:divide-y-0 md:divide-x divide-[#E2E2DC] bg-white">
                <div className="p-7 flex flex-col justify-between space-y-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#C8232C] font-semibold">
                        Biometric Shield
                      </p>
                      <h2 className="font-display text-2xl font-semibold text-[#111111] mt-1">
                        {biometricsLocked
                          ? 'Fingerprint & Iris Locked'
                          : 'Temporarily Unlocked (10 min)'}
                      </h2>
                    </div>
                    <div
                      className={`w-10 h-10 flex items-center justify-center shrink-0 ${
                        biometricsLocked ? 'bg-[#111111] text-white' : 'bg-[#C8232C] text-white'
                      }`}
                    >
                      {biometricsLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                    </div>
                  </div>
                  <p className="text-xs text-[#575753] leading-relaxed">
                    While locked, external AePS or telecom fingerprint and iris terminals are automatically blocked. Your FIDO2 Passkey and Selective ZKP passes remain active.
                  </p>
                  <button
                    type="button"
                    onClick={() => setBiometricsLocked(!biometricsLocked)}
                    className={`self-start px-4 py-2.5 text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                      biometricsLocked
                        ? 'bg-[#F5F5F2] text-[#111111] border border-[#E2E2DC] hover:bg-[#111111] hover:text-white'
                        : 'bg-[#111111] text-white hover:bg-[#C8232C]'
                    }`}
                  >
                    {biometricsLocked ? 'Temporarily Unlock (10 min)' : 'Re-Lock Biometrics Now'}
                  </button>
                </div>

                <div className="p-7 flex flex-col justify-between space-y-6">
                  <div>
                    <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#575753] font-semibold">
                      16-Digit Virtual ID (VID)
                    </p>
                    <motion.p
                      key={virtualId}
                      initial={{ opacity: 0.4, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="font-mono text-2xl sm:text-3xl font-semibold text-[#111111] tracking-wider tabular-nums mt-2"
                    >
                      {virtualId}
                    </motion.p>
                    <p className="text-xs text-[#575753] mt-2 leading-relaxed">
                      Rotate your revocable 16-digit Virtual ID anytime so external agencies never store your permanent 12-digit Aadhaar number.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleRotateVid}
                    className="self-start inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#111111] hover:bg-[#C8232C] transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${vidSpinning ? 'animate-spin' : ''}`} />
                    Rotate Virtual ID
                  </button>
                </div>
              </div>

              <div className="border border-[#E2E2DC] bg-white overflow-hidden">
                <div className="p-6 border-b border-[#E2E2DC] bg-[#F5F5F2]">
                  <h3 className="font-display text-xl font-semibold text-[#111111]">
                    Authentication &amp; Consent Ledger
                  </h3>
                  <p className="text-xs text-[#575753] mt-1">
                    Full transparency into every agency request, disclosed attributes, and one-click unauthorized attempt reporting.
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-[#E2E2DC] bg-white text-[11px] font-mono uppercase tracking-wider text-[#575753]">
                        <th className="py-3.5 px-5 font-semibold">Timestamp</th>
                        <th className="py-3.5 px-5 font-semibold">Requesting Agency</th>
                        <th className="py-3.5 px-5 font-semibold">Attributes Shared</th>
                        <th className="py-3.5 px-5 font-semibold">Outcome</th>
                        <th className="py-3.5 px-5 font-semibold text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E2DC] text-xs">
                      {authLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-[#F5F5F2]/60 transition-colors">
                          <td className="py-4 px-5 font-mono text-[#575753] whitespace-nowrap tabular-nums">
                            {log.timestamp}
                          </td>
                          <td className="py-4 px-5">
                            <p className="font-semibold text-[#111111]">{log.agency[lang]}</p>
                            <p className="text-[#575753] mt-0.5">{log.modality[lang]}</p>
                          </td>
                          <td className="py-4 px-5 text-[#575753]">{log.attributesShared[lang]}</td>
                          <td className="py-4 px-5 whitespace-nowrap font-semibold">
                            {log.status === 'Verified' && (
                              <span className="inline-flex items-center gap-1.5 text-[#0D7A43]">
                                <ShieldCheck className="w-3.5 h-3.5" />
                                Verified
                              </span>
                            )}
                            {log.status === 'Blocked' && (
                              <span className="inline-flex items-center gap-1.5 text-[#C8232C]">
                                <ShieldAlert className="w-3.5 h-3.5" />
                                Blocked
                              </span>
                            )}
                            {log.status === 'Flagged' && (
                              <span className="inline-flex items-center gap-1.5 text-[#111111]">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#0D7A43]" />
                                Dispute Filed
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-5 text-right whitespace-nowrap">
                            {log.status === 'Blocked' ? (
                              <button
                                type="button"
                                onClick={() => onFlagAuthLog(log.id)}
                                className="text-xs font-semibold text-[#C8232C] hover:underline cursor-pointer"
                              >
                                Flag Unauthorized
                              </button>
                            ) : (
                              <span className="text-[#8C8C86]">—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
