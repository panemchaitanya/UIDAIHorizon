import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  FileText,
  Mail,
  PhoneCall,
  ShieldCheck,
} from 'lucide-react';
import {
  CITIZEN_CHARTER_ROWS,
  Lang,
  OFFICIAL_FAQS,
  ServiceKey,
} from '../data/uidaiData';

interface EcosystemHelpViewProps {
  lang: Lang;
  onOpenService: (service: ServiceKey) => void;
}

export function EcosystemHelpView({ lang, onOpenService }: EcosystemHelpViewProps) {
  const [openFaqId, setOpenFaqId] = useState<string>(OFFICIAL_FAQS[0].id);
  const [grievanceTopic, setGrievanceTopic] = useState('PVC Card Dispatch Delay');
  const [grievanceSrn, setGrievanceSrn] = useState('SRN-2036-PVC-19044');
  const [grievanceLang, setGrievanceLang] = useState('English / हिन्दी');
  const [grievanceFiled, setGrievanceFiled] = useState<string | null>(null);

  const handleFileGrievance = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `UIDAI-GRV-${Math.floor(100000 + Math.random() * 899999)}`;
    setGrievanceFiled(id);
  };

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Header Banner */}
      <header className="border-b border-[#E2E2DC] bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-4">
          <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#C8232C] font-semibold">
            {lang === 'hi'
              ? 'नागरिक चार्टर · शुल्क अनुसूची व 1947 शिकायत निवारण'
              : 'Citizen Charter · Statutory Fees & 1947 Grievance Redressal'}
          </p>
          <h1 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-[#111111]">
            {lang === 'hi'
              ? 'नागरिक अधिकार, आधिकारिक शुल्क व 1947 सहायता'
              : 'Transparent fees, service SLAs & 1947 support'}
          </h1>
          <p className="text-sm sm:text-base text-[#575753] max-w-3xl leading-relaxed">
            Review official UIDAI statutory fees, service-level guarantees backed by named Regional Nodal Officers, and instant grievance filing in 22 scheduled Indian languages.
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 pt-12 space-y-20">
        {/* ================= SECTION 1: CITIZEN CHARTER & STATUTORY FEE TABLE ================= */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#C8232C] font-semibold">
                STATUTORY FEE SCHEDULE · ZERO HIDDEN CHARGES
              </p>
              <h2 className="font-display text-3xl font-semibold text-[#111111]">
                UIDAI Citizen Service Charter
              </h2>
            </div>
            <p className="text-xs text-[#575753]">
              Overcharging at any center can be reported directly to 1947 for immediate suspension.
            </p>
          </div>

          <div className="border border-[#E2E2DC] bg-white overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-[#E2E2DC] bg-[#F5F5F2] text-[11px] font-mono uppercase tracking-wider text-[#575753]">
                    <th className="py-3.5 px-5 font-semibold">Aadhaar Service</th>
                    <th className="py-3.5 px-5 font-semibold">Available Channel</th>
                    <th className="py-3.5 px-5 font-semibold text-right">Official Fee</th>
                    <th className="py-3.5 px-5 font-semibold text-right">Guaranteed SLA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E2DC] text-xs">
                  {CITIZEN_CHARTER_ROWS.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#F5F5F2]/60 transition-colors">
                      <td className="py-4 px-5 font-semibold text-[#111111]">
                        {row.service[lang]}
                      </td>
                      <td className="py-4 px-5 text-[#575753]">
                        {row.channel[lang]}
                      </td>
                      <td className="py-4 px-5 text-right font-mono font-semibold tabular-nums whitespace-nowrap">
                        <span
                          className={
                            row.statutoryFee.includes('₹0')
                              ? 'text-[#0D7A43]'
                              : 'text-[#111111]'
                          }
                        >
                          {row.statutoryFee}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-right font-mono text-[#111111] whitespace-nowrap">
                        {row.guaranteedSla[lang]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ================= SECTION 2: 1947 GRIEVANCE DESK & FAQS ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pt-10 border-t border-[#E2E2DC]">
          {/* Left 7 Cols: Official FAQs Accordion */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-1.5">
              <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#C8232C] font-semibold">
                FREQUENTLY ASKED QUESTIONS
              </p>
              <h2 className="font-display text-3xl font-semibold text-[#111111]">
                Citizen Guidance &amp; Standards
              </h2>
            </div>

            <div className="border border-[#E2E2DC] divide-y divide-[#E2E2DC]">
              {OFFICIAL_FAQS.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div key={faq.id} className="bg-white">
                    <button
                      type="button"
                      onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                      className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 hover:bg-[#F5F5F2]/60 transition-colors cursor-pointer"
                    >
                      <div className="space-y-1">
                        <p className="text-[10px] font-mono uppercase tracking-wider text-[#C8232C] font-semibold">
                          {faq.category}
                        </p>
                        <p className="font-display text-base sm:text-lg font-semibold text-[#111111]">
                          {faq.question[lang]}
                        </p>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-[#575753] shrink-0 mt-1 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#111111]' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 sm:px-6 pb-6 text-sm text-[#575753] leading-relaxed border-t border-[#E2E2DC]/60 pt-4 bg-[#F5F5F2]/40">
                            {faq.answer[lang]}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right 5 Cols: Direct 1947 Grievance & Human Callback Desk */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#111111] text-white p-7 space-y-5">
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#E86F1F] font-semibold">
                    24×7 NATIONAL HELPLINE
                  </p>
                  <p className="font-mono text-3xl font-semibold text-white mt-1 tabular-nums">
                    1947
                  </p>
                </div>
                <PhoneCall className="w-6 h-6 text-[#E86F1F]" />
              </div>
              <div className="space-y-2 text-xs text-white/80">
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-white/60" />
                  help@uidai.gov.in
                </p>
                <p className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#4ADE80]" />
                  Citizen OTP required before closing any escalated ticket
                </p>
              </div>
            </div>

            <form
              onSubmit={handleFileGrievance}
              className="border border-[#E2E2DC] bg-white p-7 space-y-5"
            >
              <div className="space-y-1">
                <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-[#C8232C] font-semibold">
                  DIRECT GRIEVANCE &amp; CALLBACK
                </p>
                <h3 className="font-display text-xl font-semibold text-[#111111]">
                  File a Ticket or Request Agent Callback
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <div className="space-y-1.5">
                  <label htmlFor="grv-topic" className="font-semibold text-[#575753] block">
                    Issue Category
                  </label>
                  <select
                    id="grv-topic"
                    value={grievanceTopic}
                    onChange={(e) => setGrievanceTopic(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#F5F5F2] border border-[#E2E2DC] text-[#111111] focus:outline-none focus:border-[#111111]"
                  >
                    <option value="PVC Card Dispatch Delay">PVC Card Dispatch Delay</option>
                    <option value="Address / Demographic Update Query">Address / Demographic Update Query</option>
                    <option value="Seva Kendra Overcharging Complaint">Seva Kendra Overcharging Complaint</option>
                    <option value="Unauthorized Authentication Alert">Unauthorized Authentication Alert</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="grv-srn" className="font-semibold text-[#575753] block">
                    Service Request Number (Optional)
                  </label>
                  <input
                    id="grv-srn"
                    type="text"
                    value={grievanceSrn}
                    onChange={(e) => setGrievanceSrn(e.target.value)}
                    className="w-full px-3 py-2.5 font-mono bg-[#F5F5F2] border border-[#E2E2DC] text-[#111111] focus:outline-none focus:border-[#111111]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="grv-lang" className="font-semibold text-[#575753] block">
                    Preferred Callback Language (22 Languages)
                  </label>
                  <select
                    id="grv-lang"
                    value={grievanceLang}
                    onChange={(e) => setGrievanceLang(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#F5F5F2] border border-[#E2E2DC] text-[#111111] focus:outline-none focus:border-[#111111]"
                  >
                    <option value="English / हिन्दी">English / हिन्दी</option>
                    <option value="తెలుగు (Telugu)">తెలుగు (Telugu)</option>
                    <option value="தமிழ் (Tamil)">தமிழ் (Tamil)</option>
                    <option value="বাংলা (Bengali)">বাংলা (Bengali)</option>
                    <option value="मराठी (Marathi)">मराठी (Marathi)</option>
                    <option value="ಕನ್ನಡ (Kannada)">ಕನ್ನಡ (Kannada)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold text-white bg-[#C8232C] hover:bg-[#A61B23] transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                Submit &amp; Request 1947 Callback
              </button>

              {grievanceFiled && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-[#F0F9F4] border border-[#0D7A43]/35 space-y-1"
                >
                  <p className="text-xs font-semibold text-[#0D7A43] inline-flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Ticket Logged: <span className="font-mono">{grievanceFiled}</span>
                  </p>
                  <p className="text-xs text-[#575753]">
                    Callback scheduled in {grievanceLang} within 5 minutes. Locked against auto-closure.
                  </p>
                </motion.div>
              )}
            </form>

            <div className="border border-[#E2E2DC] bg-[#F5F5F2] p-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-[#111111]">
                  Already have an SRN or PVC order?
                </p>
                <p className="text-xs text-[#575753] mt-0.5">
                  Check live India Post AWB &amp; Nodal Officer status directly.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onOpenService('tracker')}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#111111] hover:bg-[#C8232C] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Track SRN
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
