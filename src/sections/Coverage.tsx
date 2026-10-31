import React from 'react';
import { Link, NavLink } from '../platform';

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

function MapCard({ title, today, to, note }: { title: string; today: string[]; to: string; note: string }) {
  return <div className="a36-pillar">
    <h3>{title}</h3>
    <p style={{ fontSize: 13, color: 'var(--muted, #666)' }}>Today on uidai.gov.in: {today.join(' · ')}</p>
    <p><strong>In Horizon:</strong> {to}</p>
    <p style={{ fontSize: 13 }}>{note}</p>
  </div>;
}

export function PrototypeEverything() {
  return <>
    <div className="a36-section">
      <div className="eyebrow">Stage 5 · Whole-site coverage</div>
      <h2>Everything today's site does, mapped</h2>
      <p className="lede">The current site map lists seven top-level areas and roughly ninety destinations. None of them disappear in 2036 - each one gets a clearer home. This is the full inventory, observed on the live site map on 31 October 2026, mapped to its place in the concept.</p>
    </div>
    <MockFrame url="aadhaar2036.gov.in/everything (concept)">
      <div className="a36-grid cols-2">
        <MapCard title="My Aadhaar - 18 citizen services"
          today={['enrolment', 'Baal Aadhaar', 'address update', 'photo/biometric update', 'check update status', 'download Aadhaar', 'order PVC card + status', 'Generate VID', 'Retrieve Lost UID', 'Masked Aadhaar', 'lock/unlock biometrics + Aadhaar', 'Book an Appointment', 'check enrolment status', 'forms', 'charges', 'accepted-documents list']}
          to="the Services catalogue, the guided Update journey, Track, and My identity."
          note="Every service becomes a guided path with pre-checks and tracking, not a form behind a portal login. Interactive demos: Services, Update, Track, Centres, My identity on this site." />
        <MapCard title="Understand your Aadhaar"
          today={['about/features/usage', 'enrolment explained', 'generation', 'updating data']}
          to="plain-language explainers inside each journey, in 22 languages."
          note="Learning moves from a separate reading section into the moment it is needed - the update flow explains what documents count, right where you upload them." />
        <MapCard title="About UIDAI"
          today={['who we are', 'people', 'HQ + 8 regional + state offices + tech centre', 'careers', 'vision', "Citizens' Charter", 'departments', 'RTI', 'annual reports', 'budget', 'parliament questions']}
          to="the Institute page - live public dashboard first, structure after."
          note="Concept built at /prototype/about with the real dashboard figures observed tonight." />
        <MapCard title="Legal"
          today={['Aadhaar Act', 'regulations', 'gazetted notifications', 'rules', 'judgements']}
          to="a Legal library with plain-language summaries beside every document."
          note="Concept at /prototype/legal. Summaries never replace the gazetted text - they sit next to it." />
        <MapCard title="Build with Us"
          today={['enrolment ecosystem', 'authentication ecosystem/devices', 'OVSE offline verification', 'registrars/agencies', 'Aadhaar Seva Kendra', 'training/certification', 'Developer Sandbox', 'SITAA', 'tenders', 'discussion forum']}
          to="a Developers home that leads with the sandbox and live API status."
          note="Concept at /prototype/developers. Partners see uptime and onboarding progress, not PDF lists." />
        <MapCard title="Media and Documents"
          today={['press releases', 'gallery', 'brand resources', 'Aadhaar in print/media', 'IEC', 'handbooks', 'circulars', 'notifications', 'annual reports', 'compendium', 'archives']}
          to="a Newsroom and a searchable Document library with version history."
          note="Concept at /prototype/newsroom. Every document carries its date and what it replaced." />
        <MapCard title="Help"
          today={['FAQs', 'Grievance & Feedback', 'Vikaspedia', 'glossary', 'Mythbusters', 'how-to videos', 'Aadhaar App']}
          to="Help that starts from your problem, with the 1947 helpline and grievance status built in."
          note="Concept at /prototype/help. A grievance becomes a tracked request like any other - you can watch it move." />
      </div>
      <FicNote />
    </MockFrame>
    <p className="a36-note">Coverage note: citizen journeys (Services, Update, Track, Centres, My identity) are fully interactive. Institute, Legal, Developers, Newsroom and Help are first-pass concept pages with real observed content; deeper interactivity there is future work, listed on the Testing page.</p>
  </>;
}

export function PrototypeAbout() {
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
      <FicNote />
    </MockFrame>
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
        <div className="a36-pillar"><h3>Regulations and rules</h3><p>Enrolment, authentication, data security regulations and rules, listed newest-first with "what changed" notes - today they sit as undated PDF lists.</p></div>
        <div className="a36-pillar"><h3>Gazetted notifications</h3><p>Searchable, dated, and linked to the services they affect - so a fee change shows up inside the journey it changes.</p></div>
        <div className="a36-pillar"><h3>Judgements</h3><p>Key court decisions with plain-language outcomes, starting from the constitutional bench ruling on Aadhaar's validity.</p></div>
      </div>
      <FicNote />
    </MockFrame>
  </>;
}

export function PrototypeDevelopers() {
  return <>
    <div className="a36-section">
      <div className="eyebrow">Concept · Build with us</div>
      <h2>For developers and partners: status before paperwork</h2>
    </div>
    <MockFrame url="aadhaar2036.gov.in/developers (concept)">
      <div className="a36p-strip" style={{ marginBottom: 12 }}><span className="pulse" />All authentication services operational - concept status bar; today's site shows no live status anywhere.</div>
      <div className="a36-grid cols-2">
        <div className="a36-pillar"><h3>Developer Sandbox</h3><p>Self-serve keys in minutes, not a form and a wait. Documentation, sample apps and test data in one place.</p></div>
        <div className="a36-pillar"><h3>Authentication ecosystem</h3><p>Devices, registered devices and certification requirements, with the training/certification path tracked like any other request.</p></div>
        <div className="a36-pillar"><h3>Offline verification (OVSE)</h3><p>Onboarding for Offline Verification Seeking Entities - the direction UIDAI itself is pushing (PIB, third Aadhaar Samvaad, Apr 2025) - as a guided, tracked application.</p></div>
        <div className="a36-pillar"><h3>Tenders and SITAA</h3><p>Open tenders and the SITAA innovation programme with deadline alerts instead of a static list.</p></div>
      </div>
      <FicNote />
    </MockFrame>
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
        <div className="a36-pillar"><h3>Press releases</h3><p>Newest first, each tagged with the services it touches. Example from the live site: launch of the new Aadhaar App (PIB, 28 Jan 2026).</p></div>
        <div className="a36-pillar"><h3>Document library</h3><p>Handbooks, circulars, notifications, annual reports and compendium with version history - what changed, when, and what it replaced. No more undated PDF hunts.</p></div>
        <div className="a36-pillar"><h3>Brand resources and IEC</h3><p>Logos, campaign material and awareness content in one download area.</p></div>
        <div className="a36-pillar"><h3>Aadhaar in the world</h3><p>Media coverage and global words about Aadhaar, curated and dated.</p></div>
      </div>
      <FicNote />
    </MockFrame>
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
        <div className="a36-pillar"><h3>A grievance you can watch</h3><p>File a grievance and it becomes a tracked request with a stage and a date - the same timeline as any update. Today's portal gives a number and silence; PIB (Mar 2026) records authentication-grievance volumes that say why this matters.</p></div>
        <div className="a36-pillar"><h3>Real channels, kept</h3><p>The 1947 helpline and the grievance portal stay one tap away - the concept adds status, never removes a door.</p></div>
        <div className="a36-pillar"><h3>Mythbusters, in your language</h3><p>The existing Mythbusters content, glossary and how-to videos, surfaced inside the journeys where the doubt actually appears.</p></div>
        <div className="a36-pillar"><h3>The Aadhaar App</h3><p>Site and app hand off cleanly: start on the web, finish in the app, same tracked request on both.</p></div>
      </div>
      <FicNote />
    </MockFrame>
  </>;
}
