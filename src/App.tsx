/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import {
  AuthLogEntry,
  INITIAL_AUTH_LOGS,
  INITIAL_SRN_RECORDS,
  Lang,
  ServiceKey,
  SrnRecord,
  ViewTab,
} from './data/uidaiData';
import { Portal2036View } from './components/Portal2036View';
import { Services2036View } from './components/Services2036View';
import { SevaKendrasView } from './components/SevaKendrasView';
import { EcosystemHelpView } from './components/EcosystemHelpView';
import { AadhaarSunburstMark, AshokaWheelSeal } from './components/UidaiEmblems';
import { ScrollProgressHairline } from './components/MotionPrimitives';

export default function App() {
  const [lang, setLang] = useState<Lang>('en');
  const [activeTab, setActiveTab] = useState<ViewTab>('portal');
  const [activeService, setActiveService] = useState<ServiceKey>('address');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [srnRecords, setSrnRecords] = useState<SrnRecord[]>(INITIAL_SRN_RECORDS);
  const [authLogs, setAuthLogs] = useState<AuthLogEntry[]>(INITIAL_AUTH_LOGS);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const handleNavigate = (tab: ViewTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenService = (service: ServiceKey) => {
    setActiveService(service);
    setActiveTab('services');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddSrn = (record: SrnRecord) => {
    setSrnRecords((prev) => [record, ...prev]);
  };

  const handleEscalateSrn = (srn: string) => {
    setSrnRecords((prev) =>
      prev.map((rec) =>
        rec.srn === srn
          ? {
              ...rec,
              escalationActive: true,
              slaDeadline: '21 Nov 2036 (Nodal Officer 24h Mandate)',
            }
          : rec
      )
    );
  };

  const handleFlagAuthLog = (id: string) => {
    setAuthLogs((prev) =>
      prev.map((entry) =>
        entry.id === id ? { ...entry, status: 'Flagged' } : entry
      )
    );
  };

  const navLinks: { id: ViewTab; label: { hi: string; en: string } }[] = [
    { id: 'portal', label: { en: 'Home', hi: 'मुख्य पृष्ठ' } },
    { id: 'services', label: { en: 'My Aadhaar', hi: 'मेरा आधार' } },
    { id: 'centers', label: { en: 'Seva Kendras', hi: 'सेवा केंद्र' } },
    { id: 'ecosystem', label: { en: 'Help & Charter', hi: 'सहायता व चार्टर' } },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#111111]">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E2E2DC]">
        <ScrollProgressHairline />
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Official Brand Wordmark */}
          <button
            type="button"
            onClick={() => handleNavigate('portal')}
            className="inline-flex items-center gap-2.5 font-display text-lg sm:text-xl font-bold tracking-tight text-[#111111] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <AadhaarSunburstMark className="w-7 h-5 shrink-0" />
            <span>UIDAI · Aadhaar</span>
          </button>

          {/* Zone 2: 4 Clean Single-Line Nav Links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-8 text-sm font-medium"
          >
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleNavigate(link.id)}
                  className={`relative py-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'text-[#111111] font-semibold'
                      : 'text-[#575753] hover:text-[#111111]'
                  }`}
                >
                  {link.label[lang]}
                  {isActive && (
                    <motion.span
                      layoutId="navActiveUnderline"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      className="absolute left-0 right-0 -bottom-[1px] h-[2.5px] bg-[#C8232C]"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action Button */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => handleOpenService('address')}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#111111] hover:bg-[#C8232C] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {lang === 'hi' ? 'पता अद्यतन करें' : 'Update Address'}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 text-[#111111] hover:bg-[#F5F5F2] cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22 }}
              className="md:hidden overflow-hidden border-t border-[#E2E2DC] bg-white px-6 py-3 space-y-1"
            >
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleNavigate(link.id)}
                  className={`block w-full text-left py-2.5 text-sm font-medium cursor-pointer ${
                    activeTab === link.id ? 'text-[#C8232C] font-semibold' : 'text-[#575753]'
                  }`}
                >
                  {link.label[lang]}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content Canvas with Tactile Horizontal Glide Transitions */}
      <main className="flex-1 overflow-x-clip">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {activeTab === 'portal' && (
              <Portal2036View
                lang={lang}
                setLang={setLang}
                onOpenService={handleOpenService}
                onNavigate={handleNavigate}
              />
            )}
            {activeTab === 'services' && (
              <Services2036View
                lang={lang}
                activeService={activeService}
                setActiveService={setActiveService}
                srnRecords={srnRecords}
                onAddSrn={handleAddSrn}
                onEscalateSrn={handleEscalateSrn}
                authLogs={authLogs}
                onFlagAuthLog={handleFlagAuthLog}
              />
            )}
            {activeTab === 'centers' && <SevaKendrasView lang={lang} />}
            {activeTab === 'ecosystem' && (
              <EcosystemHelpView lang={lang} onOpenService={handleOpenService} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Authentic Government of India UIDAI Institutional Footer */}
      <footer className="border-t border-[#E2E2DC] bg-[#F5F5F2] text-[#575753]">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 text-xs">
          <div className="flex items-start gap-4">
            <div className="flex items-center gap-2.5 shrink-0 pt-0.5">
              <AshokaWheelSeal className="w-7 h-7 text-[#111111]" />
              <AadhaarSunburstMark className="w-9 h-6" />
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-[#111111]">
                Unique Identification Authority of India (UIDAI) · Government of India
              </p>
              <p>
                Bangla Sahib Road, Behind Kali Mandir, Gole Market, New Delhi - 110001
              </p>
              <p className="font-mono text-[#111111]">
                Toll-Free 1947 · help@uidai.gov.in · Ministry of Electronics &amp; Information Technology (MeitY)
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => handleNavigate('centers')}
              className="hover:text-[#111111] underline-offset-4 hover:underline cursor-pointer"
            >
              Aadhaar Seva Kendras
            </button>
            <span aria-hidden="true">/</span>
            <button
              type="button"
              onClick={() => handleNavigate('ecosystem')}
              className="hover:text-[#111111] underline-offset-4 hover:underline cursor-pointer"
            >
              Citizen Charter &amp; 1947 Help
            </button>
            <span aria-hidden="true">/</span>
            <button
              type="button"
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="font-semibold text-[#C8232C] hover:underline cursor-pointer"
            >
              {lang === 'en' ? 'हिन्दी में देखें' : 'Switch to English'}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
