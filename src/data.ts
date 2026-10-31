// Grounded content for the Aadhaar 2036 coursework site.
// Every complaint entry carries its source URL and date. Items marked
// "historical" predate the assignment's past-year window (31 Oct 2025)
// and are kept as context only.

export const observed = {
  date: '31 October 2026',
  stats: [
    { label: 'Aadhaar enrolments', value: '145.32 crore+' },
    { label: 'eKYC transactions', value: '2,632.51 crore+' },
    { label: 'Registered devices', value: '2.45 crore+' },
  ],
  defects: [
    {
      title: 'Address Update tile points at the status-check URL',
      detail: 'The homepage "Address Update" tile\'s link target is myaadhaarbeta.uidai.gov.in/CheckAadhaarStatus/en - the same URL as the "Check Update Status" tile. Observed in the page DOM 31 Oct 2026. The portal would not load from the test network, so whether it redirects into the correct flow could not be confirmed; the link target itself is verified.',
    },
    {
      title: 'Accepted-documents button opens a blank tab',
      detail: 'The homepage "View all Accepted Documents" button opened an empty about:blank tab in our automated test browser on 31 Oct 2026. This may be environment-specific popup handling; worth a human retest.',
    },
    {
      title: 'Site-map document link has an unresolvable URL',
      detail: 'The Site Map "List of accepted documents" link carries the DOM href "base:get/files/media/document/2026-06/...", and clicking it produced no navigation in testing. Observed 31 Oct 2026.',
    },
    {
      title: 'Hero banner slide renders blank',
      detail: 'The first homepage banner slide loaded as an empty grey area. Screenshot captured 31 Oct 2026.',
    },
    {
      title: 'Centre search leaves the site with a legal disclaimer',
      detail: '"Find Aadhaar Centre" exits to ISRO\'s Bhuvan geoportal, which warns location authenticity "is in progress" and "cannot be used for any legal purpose". No centre shows whether it is operational. Observed 31 Oct 2026.',
    },
    {
      title: 'Every real service is behind an OTP wall',
      detail: 'All service tiles deep-link to the separate myAadhaar portal requiring Aadhaar number, image CAPTCHA and mobile OTP. There is no guest path for any transaction or status check. Observed 31 Oct 2026.',
    },
  ],
  languages: 'The website is English/Hindi with experimental Bhashini machine translation; the new Aadhaar app offers 13 languages. Centre forms are reported English-only.',
};

export const timedTask = {
  task: 'Find the official list of documents accepted for an Aadhaar address update',
  scope: 'A real task on the live site, actually performed and timed: started 23:24:19, ended 23:26:10 IST on 31 Oct 2026 (1 min 51 s). Executed by an automated research browser, so these are machine timings in a controlled network - accurate for what happened, not a substitute for human user timings, which the Stage 6 sessions will supply. No sign-in or personal data involved.',
  steps: [
    { time: '0:00', action: 'Open uidai.gov.in', result: 'Homepage loads in 9.5 seconds', ok: true },
    { time: '0:22', action: 'Click "View all Accepted Documents" (homepage)', result: 'Opens an empty about:blank tab. Dead end 1.', ok: false },
    { time: '0:33', action: 'Open the Site Map, find "List of accepted documents"', result: 'Link found under My Aadhaar', ok: true },
    { time: '0:47', action: 'Click the site-map link', result: 'No navigation. DOM shows an unresolvable "base:get/files/..." URL. Dead end 2.', ok: false },
    { time: '1:13', action: 'Recover via external search for the document', result: 'Two candidate official PDF URLs found', ok: true },
    { time: '1:42', action: 'Try the official PDF URLs directly', result: 'Blocked from the test network (ERR_TUNNEL_CONNECTION_FAILED) - environment-specific', ok: false },
    { time: '1:51', action: 'Verify the document exists via a second fetch service', result: 'Confirmed: "List of acceptable documents" PDF exists on uidai.gov.in', ok: true },
  ],
  outcome: 'Task could not be completed through the site\'s own navigation in 1 minute 51 seconds. Two official navigation paths are broken at DOM level (environment-independent); the document itself exists but could not be reached from the test browser network.',
};

export const nielsen = [
  {
    n: 1,
    heuristic: 'Visibility of system status',
    issue: 'Update requests disappear into a black box: "under process" for months or years, no stage, no ETA, no alerts.',
    evidence: [
      { label: 'Central Information Commission flags Aadhaar update delays, asks UIDAI to fix timelines (Mar 2026)', url: 'https://kashmirobserver.net/2026/03/19/cic-flags-aadhaar-update-delays-asks-uidai-to-fix-timelines/' },
      { label: 'Government lists connectivity, biometric mismatch and invalid OTP as live authentication grievance causes (PIB, Mar 2026)', url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2246220&lang=1&reg=1' },
      { label: 'Historical: field survey finds applications "under process" since 2022 with no status visibility (The Wire, 2025)', url: 'https://m.thewire.in/article/government/queues-rejections-ambiguity-the-daily-trials-of-wanting-a-working-aadhaar' },
    ],
    severity: 'Critical',
  },
  {
    n: 2,
    heuristic: 'Match between system and the real world',
    issue: 'English-first flows and rigid name-format rules exclude the people who need Aadhaar most; website translation is experimental machine output.',
    evidence: [
      { label: 'Site footer: translation is experimental Bhashini machine translation (observed 31 Oct 2026)', url: 'https://uidai.gov.in/en/' },
      { label: 'App Store review: broken Hindi auto-translation with no edit option (May 2026)', url: 'https://apps.apple.com/in/app/maadhaar/id1435469474?platform=iphone&see-all=reviews' },
      { label: 'Historical: child enrolment rejected over name-format mismatch, 559 upvotes (Aug 2025)', url: 'https://www.reddit.com/r/LegalAdviceIndia/comments/1n2kqdk/' },
      { label: 'Historical: centre forms available only in English (The Wire, 2025)', url: 'https://m.thewire.in/article/government/queues-rejections-ambiguity-the-daily-trials-of-wanting-a-working-aadhaar' },
    ],
    severity: 'Critical',
  },
  {
    n: 3,
    heuristic: 'Consistency and standards',
    issue: 'The experience is fragmented across uidai.gov.in, the myAadhaar portal, an appointments portal and ISRO\'s Bhuvan map, with links that dead-end or point at the wrong destination between them.',
    evidence: [
      { label: 'Address Update tile links to the Check Update Status URL (observed 31 Oct 2026)', url: 'https://uidai.gov.in/en/' },
      { label: 'Find Aadhaar Centre exits to ISRO Bhuvan with a "not legally authentic" disclaimer (observed 31 Oct 2026)', url: 'https://bhuvan-app3.nrsc.gov.in/aadhaar/' },
      { label: 'Site-map link to the official document list uses a broken "base:get" URL (observed 31 Oct 2026)', url: 'https://uidai.gov.in/en/site-map' },
    ],
    severity: 'Major',
  },
  {
    n: 4,
    heuristic: 'Error prevention',
    issue: 'Designs that guarantee avoidable dead ends: a circular Aadhaar-lock / biometric-lock dependency, and document rules that force preventable rejections.',
    evidence: [
      { label: 'App Store review: Aadhaar unlock needs face auth, face auth blocked by biometric lock - a circular dependency (Jul 2026)', url: 'https://apps.apple.com/in/app/aadhaar/id6744029871' },
      { label: 'Historical: QR-code-only document rule invalidates older documents, causing repeat rejections (The Wire, 2025)', url: 'https://m.thewire.in/article/government/queues-rejections-ambiguity-the-daily-trials-of-wanting-a-working-aadhaar' },
    ],
    severity: 'Major',
  },
  {
    n: 5,
    heuristic: 'Help users recognise, diagnose and recover from errors',
    issue: 'Rejections arrive with no actionable reason, and support dead-ends at an IVR; users resort to RTI applications to learn why their update is stuck.',
    evidence: [
      { label: 'RTI guides now teach citizens to file RTIs just to learn why an update is stuck (Jul 2026)', url: 'https://righttoinformation.wiki/rti-for-aadhaar-update' },
      { label: 'Escalation guides document the 1947 helpline dead-end and the CPGRAMS ladder (Oct 2026)', url: 'https://g.indiacustomercare.com/adhaar/complaint/' },
      { label: 'Historical: "Rejected: mismatch of details" messages give no corrective guidance (Telegraph, 2025)', url: 'https://www.telegraphindia.com/my-kolkata/people/kolkatans-struggle-to-get-aadhaar-card-updated-vs-bangladeshi-national-azad-sheikhs-ease-of-getting-a-new-one/cid/2102347' },
    ],
    severity: 'Critical',
  },
];

export const priorities = [
  {
    rank: 1,
    name: 'Track every request like a package',
    what: 'Stage-wise live status for every enrolment and update, realistic ETAs, and proactive SMS / WhatsApp / push alerts when something needs attention.',
    why: 'Attacks the single highest-volume grievance: status blindness. The CIC formally asked UIDAI to fix timelines in Mar 2026, and status opacity drives the 1947 call load and repeat centre visits.',
    rice: { reach: 'Very high (every request)', impact: 'Massive', confidence: '80%', effort: 'Medium', score: 100 },
    fixes: [1, 5],
  },
  {
    rank: 2,
    name: 'A guided update flow that prevents rejection',
    what: 'Plain-language, 13-language, voice-assisted update journeys with document pre-checks, photo guidance and specific, actionable rejection recovery.',
    why: 'Cuts the rejection loop at its source: language barriers, document confusion and opaque errors. Directly answers Nielsen issues 2, 4 and 5.',
    rice: { reach: 'Very high (every update)', impact: 'Large', confidence: '70%', effort: 'Large', score: 49 },
    fixes: [2, 4, 5],
  },
  {
    rank: 3,
    name: 'A centre network you can actually trust',
    what: 'A verified, live centre directory inside the site: operational status, real-time queue load, services offered today, and bookable appointments.',
    why: 'Prevents wasted journeys - citizens currently visit multiple centres to find working kits. Replaces the outsourced Bhuvan map that disclaims its own accuracy.',
    rice: { reach: 'High (every in-person visit)', impact: 'Moderate', confidence: '60%', effort: 'Medium', score: 30 },
    fixes: [3],
  },
];

export const pillars = [
  { title: 'Life events, not menus', body: 'People arrive with a situation - "I moved house", "my child turned 5", "I need to prove who I am". The 2036 site starts from life events and assembles the steps, documents and appointments for each.' },
  { title: 'Track everything like a package', body: 'Every request gets a live timeline, a realistic ETA and proactive alerts in the citizen\'s language. Nobody calls 1947 to ask "what happened to my update".' },
  { title: 'Everyone included', body: 'Voice-first journeys in 22 scheduled languages, human-reviewed translation, assisted mode so a family member can help remotely, and accessibility treated as a launch blocker, not a certificate.' },
  { title: 'Privacy and control by default', body: 'Selective disclosure and verifiable credentials - share that you are over 18 without sharing your birthdate. Every share leaves a consent receipt you can revoke. This extends UIDAI\'s real 2025-26 offline-verification (OVSE) direction.' },
  { title: 'A real-world network you can trust', body: 'Every Aadhaar Seva Kendra shows live operational status, current queue load and bookable slots, verified daily - because the service is the network, not just the website.' },
];

export const sources = {
  official: [
    { label: 'UIDAI homepage (observed 31 Oct 2026)', url: 'https://uidai.gov.in/en/' },
    { label: 'UIDAI Site Map (observed 31 Oct 2026)', url: 'https://uidai.gov.in/en/site-map' },
    { label: 'Aadhaar App FAQ - launch, platforms, features', url: 'https://uidai.gov.in/en/aadhaar-app-faq' },
    { label: 'UIDAI grievance & feedback page', url: 'https://uidai.gov.in/en/grievance-feedback' },
    { label: 'PIB: new Aadhaar App dedicated to the nation (28 Jan 2026)', url: 'https://www.uidai.gov.in/images/New_Aadhaar_App_Dedicated_to_the_Nation.pdf' },
    { label: 'PIB: grievances in Aadhaar authentication (Mar 2026)', url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2246220&lang=1&reg=1' },
    { label: 'PIB: third Aadhaar Samvaad - OVSE and offline verification direction (Apr 2025)', url: 'https://pib.gov.in/PressReleaseIframePage.aspx?PRID=2120162' },
    { label: 'Medianama: UIDAI Face Authentication SDK and sandbox (Sep 2026)', url: 'https://www.medianama.com/2026/09/223-uidai-face-authentication-sdk-sandbox-gff-2026/' },
    { label: 'UIDAI regulations page - names and dates read live 1 Nov 2026', url: 'https://uidai.gov.in/en/about-uidai/legal-framework/regulations.html' },
    { label: 'UIDAI press releases - titles and dates read live 1 Nov 2026', url: 'https://uidai.gov.in/en/press-releases' },
  ],
  pastYear: [
    { label: 'Kashmir Observer: CIC flags Aadhaar update delays (19 Mar 2026)', url: 'https://kashmirobserver.net/2026/03/19/cic-flags-aadhaar-update-delays-asks-uidai-to-fix-timelines/' },
    { label: 'TOI: mAadhaar retiring as the new Aadhaar app takes over (23 May 2026)', url: 'https://timesofindia.indiatimes.com/technology/tech-news/maadhaar-is-retiring-soon-the-new-aadhaar-app-brings-qr-sharing-and-face-authentication-features-heres-how-to-download/articleshow/131274238.cms' },
    { label: 'Right to Information wiki: RTI for a stuck Aadhaar update (Jul 2026)', url: 'https://righttoinformation.wiki/rti-for-aadhaar-update' },
    { label: 'India Customer Care: Aadhaar complaint escalation ladder (Oct 2026)', url: 'https://g.indiacustomercare.com/adhaar/complaint/' },
    { label: 'Google Play reviews, new Aadhaar app - 3.0 stars, 81.2K reviews (retrieved 31 Oct 2026)', url: 'https://play.google.com/store/apps/details?hl=en&id=in.gov.uidai.pehchaan' },
    { label: 'App Store reviews, new Aadhaar app - face-auth login failures, circular lock (Jul-Sep 2026)', url: 'https://apps.apple.com/in/app/aadhaar/id6744029871?platform=iphone&see-all=reviews' },
    { label: 'App Store reviews, mAadhaar - OTP friction, broken Hindi translation (May 2026)', url: 'https://apps.apple.com/in/app/maadhaar/id1435469474?platform=iphone&see-all=reviews' },
  ],
  historical: [
    { label: 'The Wire: three-month field survey at Aadhaar Seva Kendras (2025)', url: 'https://m.thewire.in/article/government/queues-rejections-ambiguity-the-daily-trials-of-wanting-a-working-aadhaar' },
    { label: 'TOI Pune: shortage of working Aadhaar kits, centres turn people away (2025)', url: 'https://timesofindia.indiatimes.com/city/pune/shortage-of-aadhaar-kits-hits-updates-at-kendras-statewide/articleshow/120440128.cms' },
    { label: 'Telegraph India: years of opaque address-update rejections (2025)', url: 'https://www.telegraphindia.com/my-kolkata/people/kolkatans-struggle-to-get-aadhaar-card-updated-vs-bangladeshi-national-azad-sheikhs-ease-of-getting-a-new-one/cid/2102347' },
    { label: 'Court record: image CAPTCHA blocks a visually impaired user (Aug 2025)', url: 'https://cdnbbsr.s3waas.gov.in/s39fb7b048c96d44a0337f049e0a61ff06/uploads/2025/08/20250821638661943.pdf' },
    { label: 'Reddit r/indiasocial: update stuck 22+ days, IVR-only support (Jun 2025)', url: 'https://www.reddit.com/r/indiasocial/comments/1ljgi5c/' },
    { label: 'Reddit r/pune: centres take 5-10 people a day (Jan 2025)', url: 'https://www.reddit.com/r/pune/comments/1i6hw7p/' },
    { label: 'Reddit r/LegalAdviceIndia: child enrolment rejected over name format (Aug 2025)', url: 'https://www.reddit.com/r/LegalAdviceIndia/comments/1n2kqdk/' },
    { label: 'Reddit r/IndiaTech: OTP-on-every-step frustration (Oct 2024)', url: 'https://www.reddit.com/r/IndiaTech/comments/1g8knhc/' },
  ],
};

// Institutional lists read live from uidai.gov.in on 1 November 2026.
// Names and dates appear exactly as published on the source pages;
// these are the latest entries shown there, not a curated selection.
export const liveReads = {
  regulations: {
    url: 'https://uidai.gov.in/en/about-uidai/legal-framework/regulations.html',
    readOn: '1 Nov 2026',
    items: [
      { name: 'Aadhaar (Enrolment and Update) First Amendment Regulations, 2026', date: '12 May 2026', type: 'not stated' },
      { name: 'Aadhaar (Authentication and Offline Verification) Amendment Regulations, 2025', date: '12 Dec 2025', type: 'not stated' },
      { name: 'Aadhaar (Enrolment and Update) Third Amendment Regulations, 2025', date: '11 Dec 2025', type: 'not stated' },
      { name: 'UIDAI (Salary, Allowances and other Terms and Conditions of Service of Employees) Amendment Regulations, 2025', date: '3 Nov 2025', type: 'not stated' },
      { name: 'UIDAI (Appointment of Officers and Employees) Third Amendment Regulations, 2025', date: '1 Nov 2025', type: 'PDF' },
      { name: 'Aadhaar (Sharing of Information) First Amendment Regulations, 2025', date: '1 Nov 2025', type: 'PDF' },
      { name: 'Aadhaar (Enrolment and Update) Second Amendment Regulations, 2025', date: '1 Nov 2025', type: 'PDF' },
      { name: 'Aadhaar (Payment of Fees for Performance of Authentication) Amendment Regulations, 2025', date: '29 Oct 2025', type: 'PDF' },
    ],
  },
  pressReleases: {
    url: 'https://uidai.gov.in/en/press-releases',
    readOn: '1 Nov 2026',
    items: [
      { title: 'UIDAI unveils five new initiatives at Aadhaar Samvaad Kolkata to further advance trusted digital identity and good governance', date: '1 Oct 2026', topic: 'Policy', size: '223 KB' },
      { title: 'UIDAI Launches Aadhaar Face Authentication SDK and Sandbox at Global Fintech Fest 2026', date: '14 Sep 2026', topic: 'Developers', size: '260 KB' },
      { title: 'Aadhaar App Crosses 5 crore Downloads, Strengthening Convenient and Resident Centric Digital Identity Services', date: '21 Aug 2026', topic: 'Aadhaar App', size: '148 KB' },
      { title: 'UIDAI Special Drive Completes over 2 Cr Mandatory Biometric Updates (MBU) in Aadhaar for School Children, covering around 1.6 lakh schools', date: '19 Aug 2026', topic: 'Enrolment', size: '143 KB' },
      { title: "Manipur's FIRST UIDAI Aadhaar Seva Kendra Opens in Imphal", date: '3 Aug 2026', topic: 'Centres', size: '229 KB' },
      { title: 'UIDAI Enables Free Email Update in Aadhaar through Aadhaar App', date: '21 Jul 2026', topic: 'Aadhaar App', size: '127 KB' },
      { title: 'Aadhaar App Crosses 40 Million Downloads, Driving Convenient Digital Identity Services', date: '21 Jul 2026', topic: 'Aadhaar App', size: '123 KB' },
    ],
  },
};
