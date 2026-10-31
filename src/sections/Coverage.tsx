import React, { useState } from 'react';
import { Link, NavLink } from '../platform';
import { liveReads } from '../data';

function MockFrame({ url, children }: { url: string; children: React.ReactNode }) {
  return <div className="a36-mock">
    <div className="a36-mockbar">
      <span className="dot" style={{ background: '#ed6a5e' }} /><span className="dot" style={{ background: '#f4bf4f' }} /><span className="dot" style={{ background: '#61c454' }} />
      <span className="url">{url}</span>
      <span className="fic">Concept</span>
    </div>
    <div className="a36p-nav">
      <span className="brand"><span className="sun" />UIDAI Horizon</span>
      <NavLink to="/prototype" end>Home</NavLink>
      <NavLink to="/prototype/services">Services</NavLink>
      <NavLink to="/prototype/update">Update</NavLink>
      <NavLink to="/prototype/status">Track</NavLink>
      <NavLink to="/prototype/centres">Centres</NavLink>
      <NavLink to="/prototype/wallet">My identity</NavLink>
      <NavLink to="/prototype/everything">Everything</NavLink>
    </div>
    <div className="a36p-body">{children}</div>
  </div>;
}

function FicNote() {
  return <p className="a36p-fic">Concept demonstration with fictional data. No real Aadhaar number, OTP or personal information is requested or stored.</p>;
}

const inputStyle: React.CSSProperties = { flex: 1, border: 0, background: 'transparent', font: 'inherit', outline: 'none', padding: '2px 4px', minWidth: 0 };

const chipStyle = (active: boolean): React.CSSProperties => ({
  border: '1px solid var(--line, #ddd)', borderRadius: 999, padding: '4px 12px', fontSize: 12.5, cursor: 'pointer',
  background: active ? 'var(--navy, #123c6e)' : '#fff', color: active ? '#fff' : 'inherit', fontWeight: active ? 700 : 500,
});

function MapCard({ title, today, to, note }: { title: string; today: string[]; to: string; note: string }) {
  return <div className="a36-pillar">
    <h3>{title}</h3>
    <p style={{ fontSize: 13, color: 'var(--muted, #666)' }}>Today on uidai.gov.in: {today.join(' · ')}</p>
    <p><strong>In Horizon:</strong> {to}</p>
    <p style={{ fontSize: 13 }}>{note}</p>
  </div>;
}

const EVERYTHING_CARDS = [
  { title: 'My Aadhaar - 18 citizen services',
    today: ['enrolment', 'Baal Aadhaar', 'address update', 'photo/biometric update', 'check update status', 'download Aadhaar', 'order PVC card + status', 'Generate VID', 'Retrieve Lost UID', 'Masked Aadhaar', 'lock/unlock biometrics + Aadhaar', 'Book an Appointment', 'check enrolment status', 'forms', 'charges', 'accepted-documents list'],
    to: 'the Services catalogue, the guided Update journey, Track, and My identity.',
    note: 'Every service becomes a guided path with pre-checks and tracking, not a form behind a portal login. Interactive demos: Services, Update, Track, Centres, My identity on this site.' },
  { title: 'Understand your Aadhaar',
    today: ['about/features/usage', 'enrolment explained', 'generation', 'updating data'],
    to: 'plain-language explainers inside each journey, in 22 languages.',
    note: 'Learning moves from a separate reading section into the moment it is needed - the update flow explains what documents count, right where you upload them.' },
  { title: 'About UIDAI',
    today: ['who we are', 'people', 'HQ + 8 regional + state offices + tech centre', 'careers', 'vision', "Citizens' Charter", 'departments', 'RTI', 'annual reports', 'budget', 'parliament questions'],
    to: 'the Institute page - live public dashboard first, structure after.',
    note: 'Concept built at /prototype/about with the real dashboard figures observed on 31 Oct 2026 and press-room momentum read live on 1 Nov 2026.' },
  { title: 'Legal',
    today: ['Aadhaar Act', 'regulations', 'gazetted notifications', 'rules', 'judgements'],
    to: 'a Legal library with plain-language summaries beside every document.',
    note: 'Concept at /prototype/legal, now carrying the real regulations list read live from uidai.gov.in on 1 Nov 2026, with search. Summaries never replace the gazetted text - they sit next to it.' },
  { title: 'Build with Us',
    today: ['enrolment ecosystem', 'authentication ecosystem/devices', 'OVSE offline verification', 'registrars/agencies', 'Aadhaar Seva Kendra', 'training/certification', 'Developer Sandbox', 'SITAA', 'tenders', 'discussion forum'],
    to: 'a Developers home that leads with the sandbox and live API status.',
    note: 'Concept at /prototype/developers. Partners see uptime and onboarding progress, not PDF lists. The sandbox direction is real: UIDAI launched a Face Authentication SDK and sandbox at Global Fintech Fest 2026.' },
  { title: 'Media and Documents',
    today: ['press releases', 'gallery', 'brand resources', 'Aadhaar in print/media', 'IEC', 'handbooks', 'circulars', 'notifications', 'annual reports', 'compendium', 'archives'],
    to: 'a Newsroom and a searchable Document library with version history.',
    note: 'Concept at /prototype/newsroom, carrying the real dated press-release list read live on 1 Nov 2026. Every document carries its date and what it replaced.' },
  { title: 'Help',
    today: ['FAQs', 'Grievance & Feedback', 'Vikaspedia', 'glossary', 'Mythbusters', 'how-to videos', 'Aadhaar App'],
    to: 'Help that starts from your problem, with the 1947 helpline and grievance status built in.',
    note: 'Concept at /prototype/help. A grievance becomes a tracked request like any other - you can watch it move.' },
];

export function PrototypeEverything() {
  const [q, setQ] = useState('');
  const query = q.trim().toLowerCase();
  const shown = EVERYTHING_CARDS.filter(c => !query || (c.title + ' ' + c.today.join(' ')).toLowerCase().includes(query));
  return <>
    <div className="a36-section">
      <div className="eyebrow">Stage 5 · Whole-site coverage</div>
      <h2>Everything today's site does, mapped</h2>
      <p className="lede">The current site map lists seven top-level areas and roughly ninety destinations. None of them disappear in 2036 - each one gets a clearer home. This is the full inventory, observed on the live site map on 31 October 2026, mapped to its place in the concept. Use the search to find where anything lands.</p>
    </div>
    <MockFrame url="aadhaar2036.gov.in/everything (concept)">
      <div className="a36p-search" style={{ marginBottom: 12 }}>
        <input className="box" style={inputStyle} value={q} onChange={e => setQ(e.target.value)} placeholder='Where does it live in 2036? Try "gazette", "PVC card", "RTI"...' aria-label="Search the site inventory" />
      </div>
      <div className="a36-grid cols-2">
        {shown.map(c => <MapCard key={c.title} {...c} />)}
      </div>
      {shown.length === 0 && <p style={{ fontSize: 13 }}>No match - the inventory holds every area of today's site, so try a broader word.</p>}
      <FicNote />
    </MockFrame>
    <p className="a36-note">Coverage note: citizen journeys (Services, Update, Track, Centres, My identity) are fully interactive. Institute, Legal, Developers, Newsroom and Help now carry real live-read lists (1 Nov 2026) with concept search, filters and trackers; full guided interactivity there remains future work, listed on the Testing page.</p>
  </>;
}

export function PrototypeAbout() {
  const pr = liveReads.pressReleases;
  return <>
    <div className="a36-section">
      <div className="eyebrow">Concept · Institute</div>
      <h2>About UIDAI, 2036: the dashboard is the homepage</h2>
    </div>
    <MockFrame url="aadhaar2036.gov.in/institute (concept)">
      <h3>The institute in numbers</h3>
      <p style={{ fontSize: 13 }}>Live figures observed on uidai.gov.in's dashboard, 31 Oct 2026:</p>
      <div className="a36p-stats">
        <div className="stat"><div className="n">145.32 cr</div><div className="l">Aadhaar enrolments</div></div>
        <div className="stat"><div className="n">2,632.51 cr</div><div className="l">eKYC transactions</div></div>
        <div className="stat"><div className="n">2.45 cr</div><div className="l">Authentication devices</div></div>
      </div>
      <div className="a36-grid cols-2" style={{ marginTop: 14 }}>
        <div className="a36-pillar"><h3>Who we are</h3><p>A statutory authority under the Aadhaar Act, 2016. Headquarters in New Delhi, 8 regional offices, state offices and a technology centre - observed on the live site.</p></div>
        <div className="a36-pillar"><h3>Accountability, one tap away</h3><p>Citizens' Charter, RTI, annual reports, budget and parliament questions - grouped under one "How we answer to you" section instead of five menu items.</p></div>
      </div>
      <div className="a36-grid cols-2" style={{ marginTop: 14 }}>
        <div className="a36-pillar" style={{ gridColumn: '1 / -1' }}>
          <h3>Momentum, with dates</h3>
          <p style={{ fontSize: 13 }}>From UIDAI's own press room, titles and dates read live on {pr.readOn} (<a href={pr.url}>uidai.gov.in/en/press-releases</a>):</p>
          <div className="a36-tl">
            <div className="row" style={{ gridTemplateColumns: '96px 1fr' }}><div className="t">21 Aug 2026</div><div><div className="a">Aadhaar App crosses 5 crore downloads</div><div className="r">The app-first direction is no longer a plan - it is adoption, measured by UIDAI itself.</div></div></div>
            <div className="row" style={{ gridTemplateColumns: '96px 1fr' }}><div className="t">19 Aug 2026</div><div><div className="a">MBU special drive: over 2 crore biometric updates across ~1.6 lakh schools</div><div className="r">The mandatory biometric update for children runs at national scale - Horizon designs for these drives, not around them.</div></div></div>
            <div className="row" style={{ gridTemplateColumns: '96px 1fr' }}><div className="t">3 Aug 2026</div><div><div className="a">Manipur's first Aadhaar Seva Kendra opens in Imphal</div><div className="r">The physical network is still growing in 2026 - the 2036 site treats centres as first-class, trackable infrastructure.</div></div></div>
          </div>
          <p style={{ fontSize: 12.5, marginTop: 10 }}>2036 concept layer: every public figure on one live page, with its methodology one tap away - so "how many" never needs an RTI.</p>
        </div>
      </div>
      <FicNote />
    </MockFrame>
  </>;
}

function RegLibrary() {
  const [q, setQ] = useState('');
  const { url, readOn, items } = liveReads.regulations;
  const query = q.trim().toLowerCase();
  const shown = items.filter(i => !query || i.name.toLowerCase().includes(query));
  return <>
    <h3 style={{ marginTop: 18 }}>The real list, newest first</h3>
    <p style={{ fontSize: 13 }}>Latest entries exactly as published on <a href={url}>uidai.gov.in's regulations page</a>, read live {readOn}. Today's page is a flat list; Horizon's concept layer adds search and a plain-language door on every entry. Any summary in this concept is a reading aid, never legal advice.</p>
    <div className="a36p-search" style={{ margin: '10px 0' }}>
      <input className="box" style={inputStyle} value={q} onChange={e => setQ(e.target.value)} placeholder='Search regulations - try "offline verification" or "fees"' aria-label="Search regulations" />
    </div>
    <div className="a36-tl">
      {shown.map(i => <div className="row" style={{ gridTemplateColumns: '96px 1fr' }} key={i.name}>
        <div className="t">{i.date}</div>
        <div>
          <div className="a">{i.name}</div>
          <div className="r">Document type on source: {i.type} · <span style={{ color: 'var(--navy-2, #345)', fontWeight: 600 }}>2036: plain-language summary + "what changed" note (concept)</span></div>
        </div>
      </div>)}
      {shown.length === 0 && <div className="row" style={{ gridTemplateColumns: '1fr' }}><div className="r">No match - try a broader word.</div></div>}
    </div>
  </>;
}

export function PrototypeLegal() {
  return <>
    <div className="a36-section">
      <div className="eyebrow">Concept · Legal library</div>
      <h2>Every rule, with a plain-language door</h2>
    </div>
    <MockFrame url="aadhaar2036.gov.in/legal (concept)">
      <div className="a36-grid cols-2">
        <div className="a36-pillar"><h3>Aadhaar Act, 2016</h3><p>The founding law. In Horizon each section opens with a two-line summary in your language, with the gazetted text one tap away - the summary never replaces the law.</p></div>
        <div className="a36-pillar"><h3>Regulations and rules</h3><p>Enrolment, authentication, data security regulations and rules, listed newest-first with "what changed" notes - below, the real current list straight from the live site.</p></div>
        <div className="a36-pillar"><h3>Gazetted notifications</h3><p>Searchable, dated, and linked to the services they affect - so a fee change shows up inside the journey it changes.</p></div>
        <div className="a36-pillar"><h3>Judgements</h3><p>Key court decisions with plain-language outcomes, starting from the constitutional bench ruling on Aadhaar's validity.</p></div>
      </div>
      <RegLibrary />
      <FicNote />
    </MockFrame>
  </>;
}

function SandboxDemo() {
  const [k, setK] = useState<string | null>(null);
  return <div className="a36-pillar" style={{ gridColumn: '1 / -1' }}>
    <h3>Try the sandbox (concept)</h3>
    <p style={{ fontSize: 13.5 }}>The direction is real, not our invention: UIDAI launched a Face Authentication SDK and developer sandbox at Global Fintech Fest 2026 (<a href={liveReads.pressReleases.url}>press release, 14 Sep 2026</a>; <a href="https://www.medianama.com/2026/09/223-uidai-face-authentication-sdk-sandbox-gff-2026/">Medianama, Sep 2026</a>). Horizon makes getting started self-serve:</p>
    {k
      ? <p><code style={{ fontSize: 15, background: '#f3f5f8', padding: '6px 10px', borderRadius: 8 }}>{k}</code> <span style={{ fontSize: 12.5 }}>- demo key generated in your browser. Fictional; it grants no access to anything.</span></p>
      : <button className="a36p-btn" onClick={() => setK('HZ-SBX-' + Math.random().toString(36).slice(2, 6).toUpperCase() + '-DEMO')}>Generate a demo sandbox key</button>}
  </div>;
}

export function PrototypeDevelopers() {
  return <>
    <div className="a36-section">
      <div className="eyebrow">Concept · Build with us</div>
      <h2>For developers and partners: status before paperwork</h2>
    </div>
    <MockFrame url="aadhaar2036.gov.in/developers (concept)">
      <div className="a36p-strip" style={{ marginBottom: 12, background: 'var(--navy)', border: 'none' }}><span className="pulse" />All authentication services operational - concept status bar. Across the uidai.gov.in pages observed on 31 Oct 2026 we found no public service-status page; Horizon would put one first.</div>
      <div className="a36-grid cols-2">
        <div className="a36-pillar"><h3>Developer Sandbox</h3><p>Self-serve keys in minutes, not a form and a wait. Documentation, sample apps and test data in one place.</p></div>
        <div className="a36-pillar"><h3>Authentication ecosystem</h3><p>Devices, registered devices and certification requirements, with the training/certification path tracked like any other request.</p></div>
        <div className="a36-pillar"><h3>Offline verification (OVSE)</h3><p>Onboarding for Offline Verification Seeking Entities - the direction UIDAI itself is pushing (PIB, third Aadhaar Samvaad, Apr 2025) - as a guided, tracked application.</p></div>
        <div className="a36-pillar"><h3>Tenders and SITAA</h3><p>Open tenders and the SITAA innovation programme with deadline alerts instead of a static list.</p></div>
        <SandboxDemo />
      </div>
      <FicNote />
    </MockFrame>
  </>;
}

function PressList() {
  const { url, readOn, items } = liveReads.pressReleases;
  const topics = ['All', 'Policy', 'Developers', 'Aadhaar App', 'Enrolment', 'Centres'];
  const [t, setT] = useState('All');
  const shown = items.filter(i => t === 'All' || i.topic === t);
  return <>
    <h3 style={{ marginTop: 18 }}>The real press room, newest first</h3>
    <p style={{ fontSize: 13 }}>Latest releases exactly as published on <a href={url}>uidai.gov.in/en/press-releases</a>, read live {readOn}. Topic tags are Horizon's concept layer - one tap narrows the room.</p>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '10px 0' }}>
      {topics.map(x => <button key={x} style={chipStyle(t === x)} onClick={() => setT(x)}>{x}</button>)}
    </div>
    <div className="a36-tl">
      {shown.map(i => <div className="row" style={{ gridTemplateColumns: '96px 1fr' }} key={i.title}>
        <div className="t">{i.date}</div>
        <div>
          <div className="a">{i.title}</div>
          <div className="r">{i.topic} · PDF {i.size} <span style={{ color: 'var(--navy-2, #345)', fontWeight: 600 }}>· 2036: linked into every service it changes (concept)</span></div>
        </div>
      </div>)}
    </div>
  </>;
}

export function PrototypeNewsroom() {
  return <>
    <div className="a36-section">
      <div className="eyebrow">Concept · Newsroom and documents</div>
      <h2>Everything published, dated and searchable</h2>
    </div>
    <MockFrame url="aadhaar2036.gov.in/newsroom (concept)">
      <div className="a36-grid cols-2">
        <div className="a36-pillar"><h3>Press releases</h3><p>Newest first, each tagged with the services it touches. Below: the live site's actual latest releases.</p></div>
        <div className="a36-pillar"><h3>Document library</h3><p>Handbooks, circulars, notifications, annual reports and compendium with version history - what changed, when, and what it replaced, so no one hunts for the current version.</p></div>
        <div className="a36-pillar"><h3>Brand resources and IEC</h3><p>Logos, campaign material and awareness content in one download area.</p></div>
        <div className="a36-pillar"><h3>Aadhaar in the world</h3><p>Media coverage and global words about Aadhaar, curated and dated.</p></div>
      </div>
      <PressList />
      <FicNote />
    </MockFrame>
  </>;
}

function GrievanceDemo() {
  const [ref, setRef] = useState('');
  const [tracked, setTracked] = useState(false);
  const steps = [
    { s: 'Received', d: 'Logged and acknowledged by SMS and WhatsApp in your language, with a realistic resolution date.' },
    { s: 'Assigned', d: 'Routed to the regional grievance cell that owns your case - no call-centre relay.' },
    { s: 'Action', d: 'The officer re-verifies the case and records the specific reason for any rejection.' },
    { s: 'Resolved', d: 'You get the reason and the exact fix, in writing, in your language.' },
  ];
  return <>
    <h3 style={{ marginTop: 18 }}>Track a grievance (concept)</h3>
    <p style={{ fontSize: 13 }}>Complaint-escalation guides (<a href="https://g.indiacustomercare.com/adhaar/complaint/">Oct 2026</a>) describe a reference number with no trackable status and a 1947 IVR dead-end - attributed user guidance, not our test. Horizon treats a grievance like every other request - a timeline you can watch. Try it:</p>
    <div className="a36p-search" style={{ margin: '10px 0' }}>
      <input className="box" style={inputStyle} value={ref} onChange={e => setRef(e.target.value)} placeholder="Grievance reference - any text, this is a demo" aria-label="Grievance reference" />
      <button className="a36p-btn" onClick={() => setTracked(true)}>Track</button>
    </div>
    {tracked && <>
      <p style={{ fontSize: 12.5, fontWeight: 700 }}>Fictional demonstration{ref ? ` for "${ref}"` : ''} - no real grievance was filed or looked up.</p>
      <div className="a36-tl">
        {steps.map((x, i) => <div className="row" style={{ gridTemplateColumns: '96px 1fr' }} key={x.s}>
          <div className="t">Stage {i + 1}</div>
          <div><div className="a">{x.s}</div><div className="r">{x.d}</div></div>
        </div>)}
      </div>
    </>}
  </>;
}

export function PrototypeHelp() {
  return <>
    <div className="a36-section">
      <div className="eyebrow">Concept · Help</div>
      <h2>Help that starts from your problem</h2>
    </div>
    <MockFrame url="aadhaar2036.gov.in/help (concept)">
      <div className="a36p-search" style={{ marginBottom: 12 }}><div className="box">Try: "my update was rejected" · "मेरा अपडेट रद्द हो गया"</div><div className="mic">🎙 Speak</div></div>
      <div className="a36-grid cols-2">
        <div className="a36-pillar"><h3>A grievance you can watch</h3><p>File a grievance and it becomes a tracked request with a stage and a date - the same timeline as any update. Escalation guides (Oct 2026) document the 1947 dead-end citizens report, and PIB (Mar 2026) records authentication-grievance volumes that say why this matters. Live demo below.</p></div>
        <div className="a36-pillar"><h3>Real channels, kept</h3><p>The 1947 helpline and the <a href="https://uidai.gov.in/en/grievance-feedback">grievance portal</a> stay one tap away - the concept adds status, never removes a door.</p></div>
        <div className="a36-pillar"><h3>Mythbusters, in your language</h3><p>The existing Mythbusters content, glossary and how-to videos, surfaced inside the journeys where the doubt actually appears.</p></div>
        <div className="a36-pillar"><h3>The Aadhaar App</h3><p>Site and app hand off cleanly: start on the web, finish in the app, same tracked request on both. The app crossed 5 crore downloads by Aug 2026 (<a href={liveReads.pressReleases.url}>UIDAI press release</a>).</p></div>
      </div>
      <GrievanceDemo />
      <FicNote />
    </MockFrame>
  </>;
}
