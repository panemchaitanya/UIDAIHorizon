import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  Building2,
  CalendarCheck2,
  CheckCircle2,
  Clock,
  Home,
  MapPin,
  Search,
  Users,
} from 'lucide-react';
import { ASSETS, Lang, REGIONAL_OFFICES, RegionalOffice } from '../data/uidaiData';
import { MediaFrame } from './MediaFrame';

interface SevaKendrasViewProps {
  lang: Lang;
}

const SERVICE_TYPES = [
  'All Centers',
  'Biometric Update',
  'Baal Aadhaar (Age 5/15)',
  'Mobile Number Link',
  'Senior Doorstep Desk',
] as const;

const TIME_SLOTS = ['11:15 IST', '12:00 IST', '14:30 IST', '16:00 IST'] as const;

export function SevaKendrasView({ lang }: SevaKendrasViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [serviceFilter, setServiceFilter] = useState<(typeof SERVICE_TYPES)[number]>('All Centers');
  const [selectedCenter, setSelectedCenter] = useState<RegionalOffice>(REGIONAL_OFFICES[0]);
  const [bookingService, setBookingService] = useState('Mandatory Biometric Update (Age 5/15)');
  const [bookingSlot, setBookingSlot] = useState<string>(TIME_SLOTS[0]);
  const [bookedToken, setBookedToken] = useState<{
    tokenId: string;
    city: string;
    slot: string;
    service: string;
    counter: number;
  } | null>(null);

  const [doorstepPin, setDoorstepPin] = useState('302017');
  const [doorstepRequested, setDoorstepRequested] = useState(false);

  const filteredCenters = useMemo(() => {
    return REGIONAL_OFFICES.filter((ro) => {
      const matchesSearch =
        searchTerm.trim() === '' ||
        ro.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ro.jurisdiction.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ro.state.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesService =
        serviceFilter === 'All Centers' || ro.services.includes(serviceFilter);
      return matchesSearch && matchesService;
    });
  }, [searchTerm, serviceFilter]);

  const handleBookAppointment = () => {
    const num = Math.floor(1000 + Math.random() * 8999);
    setBookedToken({
      tokenId: `ASK-2036-${selectedCenter.city.slice(0, 3).toUpperCase()}-${num}`,
      city: selectedCenter.city,
      slot: bookingSlot,
      service: bookingService,
      counter: Math.floor(2 + Math.random() * Math.max(2, selectedCenter.countersOpen - 2)),
    });
  };

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Header Banner */}
      <header className="border-b border-[#E2E2DC] bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-4">
          <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#C8232C] font-semibold">
            {lang === 'hi'
              ? 'आधार सेवा केंद्र · देशव्यापी नेटवर्क व अपॉइंटमेंट'
              : 'Aadhaar Seva Kendras · Nationwide Locator & Appointments'}
          </p>
          <h1 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-[#111111]">
            {lang === 'hi'
              ? 'नजदीकी आधार सेवा केंद्र और शून्य-कतार अपॉइंटमेंट'
              : 'Find an Aadhaar Seva Kendra & book a zero-queue slot'}
          </h1>
          <p className="text-sm sm:text-base text-[#575753] max-w-3xl leading-relaxed">
            Reserve a pre-verified Passkey appointment for biometric updates, Baal Aadhaar milestones (Age 5 &amp; 15), mobile number linking, or request an India Post doorstep visit for senior citizens.
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 pt-10 space-y-16">
        {/* Search & Filter Strip */}
        <section className="space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3 px-4 py-2.5 border border-[#111111] bg-white w-full lg:max-w-md">
              <Search className="w-4 h-4 text-[#575753] shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by city or state (e.g. Hyderabad, Rajasthan, UP)..."
                aria-label="Search Seva Kendras by city or state"
                className="w-full text-sm text-[#111111] placeholder:text-[#787873] bg-transparent focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center border border-[#E2E2DC] bg-[#F5F5F2]">
              {SERVICE_TYPES.map((type) => {
                const active = serviceFilter === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setServiceFilter(type)}
                    className={`relative px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                      active ? 'text-white' : 'text-[#575753] hover:text-[#111111]'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="centerServiceFilter"
                        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                        className="absolute inset-0 bg-[#111111]"
                      />
                    )}
                    <span className="relative z-10">{type}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Master-Detail Seva Kendra Directory & Booking Console */}
          <div className="border border-[#E2E2DC] grid grid-cols-1 lg:grid-cols-12 bg-white">
            {/* Left List */}
            <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-[#E2E2DC] divide-y divide-[#E2E2DC]">
              <div className="px-5 py-3.5 bg-[#F5F5F2] flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[#575753]">
                <span>Regional Seva Kendras ({filteredCenters.length})</span>
                <span>Live Wait</span>
              </div>
              {filteredCenters.length === 0 ? (
                <div className="p-8 text-xs text-[#575753]">
                  No centers match your current filter. Clear search or choose &ldquo;All Centers&rdquo;.
                </div>
              ) : (
                filteredCenters.map((ro) => {
                  const isSelected = selectedCenter.id === ro.id;
                  return (
                    <button
                      key={ro.id}
                      type="button"
                      onClick={() => {
                        setSelectedCenter(ro);
                        setBookedToken(null);
                      }}
                      className={`w-full text-left p-5 transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#111111] text-white'
                          : 'bg-white text-[#111111] hover:bg-[#F5F5F2]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-display text-lg font-semibold">{ro.city}</p>
                        <span
                          className={`font-mono text-xs tabular-nums font-semibold ${
                            isSelected ? 'text-[#E86F1F]' : 'text-[#0D7A43]'
                          }`}
                        >
                          {ro.waitMinutes}m wait
                        </span>
                      </div>
                      <p
                        className={`text-xs mt-1 ${
                          isSelected ? 'text-white/75' : 'text-[#575753]'
                        }`}
                      >
                        {ro.jurisdiction}
                      </p>
                      <p
                        className={`text-[11px] font-mono mt-2 ${
                          isSelected ? 'text-white/60' : 'text-[#8C8C86]'
                        }`}
                      >
                        {ro.countersOpen} Active Counters · Next: {ro.nextSlot}
                      </p>
                    </button>
                  );
                })
              )}
            </div>

            {/* Right Booking Desk */}
            <div className="lg:col-span-7 p-7 sm:p-9 space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCenter.id}
                  initial={{ opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.22 }}
                  className="space-y-6"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#E2E2DC] pb-5">
                    <div>
                      <p className="inline-flex items-center gap-1.5 text-xs font-mono text-[#C8232C] font-semibold">
                        <Building2 className="w-3.5 h-3.5" />
                        UIDAI REGIONAL SEVA KENDRA · {selectedCenter.city.toUpperCase()}
                      </p>
                      <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#111111] mt-1">
                        {selectedCenter.city} Flagship Center
                      </h2>
                    </div>
                    <div className="text-left sm:text-right text-xs">
                      <p className="text-[#575753]">Active Biometric Counters</p>
                      <p className="font-mono text-base font-semibold text-[#0D7A43] tabular-nums">
                        {selectedCenter.countersOpen} Open · {selectedCenter.waitMinutes}m wait
                      </p>
                    </div>
                  </div>

                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                    <div>
                      <dt className="text-[#575753] font-semibold flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#C8232C]" />
                        Center Address
                      </dt>
                      <dd className="text-[#111111] mt-1.5 leading-relaxed">
                        {selectedCenter.address}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[#575753] font-semibold">Assigned Regional Nodal Officer</dt>
                      <dd className="text-[#111111] font-semibold mt-1.5">
                        {selectedCenter.nodalOfficer}
                      </dd>
                      <p className="text-[#575753] mt-1">
                        Services: {selectedCenter.services.join(' · ')}
                      </p>
                    </div>
                  </dl>

                  {/* Appointment Slot Configurator */}
                  <div className="p-6 bg-[#F5F5F2] border border-[#E2E2DC] space-y-5">
                    <p className="text-xs font-mono uppercase tracking-[0.12em] font-semibold text-[#111111]">
                      Instant Passkey Appointment Reservation
                    </p>

                    <div className="space-y-2">
                      <label htmlFor="ask-service" className="text-xs font-semibold text-[#575753] block">
                        Select In-Person Service
                      </label>
                      <select
                        id="ask-service"
                        value={bookingService}
                        onChange={(e) => setBookingService(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E2E2DC] text-[#111111] focus:outline-none focus:border-[#111111]"
                      >
                        <option value="Mandatory Biometric Update (Age 5/15 — ₹0 Free)">
                          Mandatory Biometric Update (Age 5/15 — ₹0 Free)
                        </option>
                        <option value="Mobile Number / Email Linking (₹50)">
                          Mobile Number / Email Linking (₹50)
                        </option>
                        <option value="Adult Biometric & Photo Refresh (₹100)">
                          Adult Biometric &amp; Photo Refresh (₹100)
                        </option>
                        <option value="New Resident / Baal Aadhaar Enrolment (₹0 Free)">
                          New Resident / Baal Aadhaar Enrolment (₹0 Free)
                        </option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-semibold text-[#575753] block">
                        Choose Today&apos;s Express Slot
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {TIME_SLOTS.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setBookingSlot(slot)}
                            className={`py-2 px-3 text-xs font-mono font-semibold border transition-colors cursor-pointer tabular-nums ${
                              bookingSlot === slot
                                ? 'bg-[#111111] text-white border-[#111111]'
                                : 'bg-white text-[#111111] border-[#E2E2DC] hover:border-[#111111]'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#E2E2DC]">
                      <span className="inline-flex items-center gap-1.5 text-xs text-[#575753]">
                        <Clock className="w-3.5 h-3.5 text-[#0D7A43]" />
                        Zero paper forms required — Passkey pre-fills desk terminal
                      </span>
                      <button
                        type="button"
                        onClick={handleBookAppointment}
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#C8232C] hover:bg-[#A61B23] transition-colors whitespace-nowrap cursor-pointer"
                      >
                        <CalendarCheck2 className="w-3.5 h-3.5" />
                        Confirm Express Slot
                      </button>
                    </div>
                  </div>

                  {bookedToken && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-5 bg-[#F0F9F4] border border-[#0D7A43]/35 space-y-2"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-xs font-semibold text-[#0D7A43] inline-flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" />
                          Appointment Token Issued: <span className="font-mono">{bookedToken.tokenId}</span>
                        </p>
                        <span className="font-mono text-xs font-semibold text-[#111111] tabular-nums">
                          COUNTER #{bookedToken.counter} · TODAY {bookedToken.slot}
                        </span>
                      </div>
                      <p className="text-xs text-[#575753]">
                        {bookedToken.city} Aadhaar Seva Kendra · {bookedToken.service}. Present your Passkey QR at entry for direct counter routing.
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Baal Aadhaar & Senior Citizen Doorstep Services */}
        <section className="grid grid-cols-1 lg:grid-cols-2 border border-[#E2E2DC] divide-y lg:divide-y-0 lg:divide-x divide-[#E2E2DC]">
          <div className="flex flex-col justify-between">
            <MediaFrame
              src={ASSETS.bharatFamily}
              alt="Indian family completing Baal Aadhaar enrollment with an officer at a sunlit Seva Kendra"
              imgClassName="w-full h-64 object-cover"
            />
            <div className="p-7 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <p className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.12em] text-[#C8232C] font-semibold">
                  <Users className="w-3.5 h-3.5" />
                  BAAL AADHAAR · MANDATORY MILESTONES
                </p>
                <h2 className="font-display text-2xl font-semibold text-[#111111]">
                  Free Biometric Updates at Age 5 &amp; Age 15
                </h2>
                <p className="text-xs text-[#575753] leading-relaxed">
                  Children enrolled under age 5 receive a Blue Baal Aadhaar linked to a parent&apos;s UID. Updating fingerprints, iris, and photograph at age 5 and age 15 is 100% free at any Aadhaar Seva Kendra with priority family counters.
                </p>
              </div>
              <p className="text-xs font-mono text-[#0D7A43] font-semibold pt-3 border-t border-[#E2E2DC]">
                STATUTORY FEE: ₹0 (FREE) · PROCESSING SLA: 24 HOURS
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <MediaFrame
              src={ASSETS.askKiosk}
              alt="Modern sunlit Indian Aadhaar Seva Kendra service hall"
              imgClassName="w-full h-64 object-cover"
            />
            <div className="p-7 sm:p-8 space-y-5 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <p className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.12em] text-[#E86F1F] font-semibold">
                  <Home className="w-3.5 h-3.5" />
                  INDIA POST PAYMENTS BANK · DOORSTEP SERVICE
                </p>
                <h2 className="font-display text-2xl font-semibold text-[#111111]">
                  Senior Citizen &amp; Divyangjan Home Visit
                </h2>
                <p className="text-xs text-[#575753] leading-relaxed">
                  Residents aged 70+ or with mobility needs can request an India Post Payments Bank (IPPB) postman with a portable biometric kit to visit their home for mobile linking, child enrolment, or biometric refresh within 48 hours.
                </p>
              </div>

              <div className="pt-4 border-t border-[#E2E2DC] space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={doorstepPin}
                    onChange={(e) => {
                      setDoorstepPin(e.target.value.replace(/\D/g, ''));
                      setDoorstepRequested(false);
                    }}
                    placeholder="Enter 6-digit PIN Code"
                    aria-label="Enter 6-digit PIN code for doorstep visit"
                    className="px-3.5 py-2 text-xs font-mono bg-[#F5F5F2] border border-[#E2E2DC] text-[#111111] w-full sm:w-44 focus:outline-none focus:border-[#111111]"
                  />
                  <button
                    type="button"
                    onClick={() => setDoorstepRequested(true)}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#111111] hover:bg-[#C8232C] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Request IPPB Home Visit
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                {doorstepRequested && (
                  <p className="text-xs font-semibold text-[#0D7A43]">
                    Doorstep request logged for PIN {doorstepPin || '302017'} · Local Post Office will confirm a 48h slot via SMS &amp; Voice.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
