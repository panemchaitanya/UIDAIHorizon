import React from 'react';
import { FileCard, Link, NavLink, Route, Routes } from './platform';
import './style.css';
import { Research } from './sections/Research';
import { PrototypeHome, PrototypeUpdate, PrototypeStatus, PrototypeCentres, PrototypeWallet, PrototypeServices } from './sections/Prototype';
import { PrototypeEverything, PrototypeAbout, PrototypeLegal, PrototypeDevelopers, PrototypeNewsroom, PrototypeHelp } from './sections/Coverage';
import { Wireframes, Testing, Sources } from './sections/Extras';
import { observed, pillars } from './data';
import heroArt from './photos/hero-2036.png';

function Cover() {
  return <>
    <div className="a36-hero">
      <div className="kicker">Academic concept · IIIT Hyderabad · AI for Product Managers</div>
      <h1>UIDAI <span>Horizon</span></h1>
      <p className="sub">A product manager's reimagining of uidai.gov.in, ten years forward: from a portal of menus to a proactive identity companion for 145 crore people. Grounded in a six-stage UX audit of the live site.</p>
      <div className="badges">
        <span className="a36-badge">UX audit</span>
        <span className="a36-badge">Clickable prototype</span>
        <span className="a36-badge">RICE priorities</span>
        <span className="a36-badge">Test plan</span>
      </div>
      <img className="hero-art" src={heroArt} alt="Illustration of Indian citizens using simple digital identity services at sunrise" />
    </div>
    <div className="a36-disclaimer">
      <strong>Unofficial academic project.</strong> This is a student design concept for coursework. It is not affiliated with, endorsed by, or connected to UIDAI or the Government of India. It never asks for a real Aadhaar number, OTP or any personal data - every person, request and data point shown is fictional. For real Aadhaar services, only use <strong>uidai.gov.in</strong>.
    </div>

    <div className="a36-section">
      <div className="eyebrow">The assignment</div>
      <h2>Six stages, one story</h2>
      <p className="lede">The brief: understand the user, complete a real task on the current site, audit it against Nielsen's heuristics, prioritise fixes, redesign the experience, and test it. Each stage is a page here.</p>
      <div className="a36-grid cols-3">
        <Link className="a36-cardlink" to="/research"><div className="num">Stages 1-4</div><h3>The evidence</h3><p>Persona and job-to-be-done, a timed real task on uidai.gov.in, five Nielsen issues with sources, and the top three fixes scored with RICE.</p><span className="go">Read the audit →</span></Link>
        <Link className="a36-cardlink" to="/prototype"><div className="num">Stage 5 · Concept</div><h3>The 2036 prototype</h3><p>A clickable mockup of the redesigned site: life-event homepage, guided update flow, live status tracking, trusted centres and identity control.</p><span className="go">Open the prototype →</span></Link>
        <Link className="a36-cardlink" to="/wireframes"><div className="num">Stage 5 · Process</div><h3>Wireframes and flow</h3><p>The low-fidelity thinking behind the screens and the improved end-to-end user flow for the most painful journey.</p><span className="go">See the process →</span></Link>
        <Link className="a36-cardlink" to="/testing"><div className="num">Stage 6</div><h3>Test and measure</h3><p>The usability test protocol for 3-5 users and the before/after scoreboard - ready to fill with real sessions, no invented results.</p><span className="go">See the plan →</span></Link>
        <Link className="a36-cardlink" to="/sources"><div className="num">Appendix</div><h3>Sources and method</h3><p>Every claim's evidence: official UIDAI pages, past-year complaints, historical context, and what was observed live on 31 Oct 2026.</p><span className="go">Check the evidence →</span></Link>
        <a className="a36-cardlink" href="https://uidai.gov.in/en/" target="_blank" rel="noreferrer"><div className="num">The baseline</div><h3>The current site</h3><p>uidai.gov.in today: the real website this concept audits and reimagines. Opens the official site in a new tab.</p><span className="go">Visit uidai.gov.in →</span></a>
      </div>
    </div>

    <div className="a36-section">
      <div className="eyebrow">Product direction</div>
      <h2>From portal to proactive companion</h2>
      <p className="lede">Today's UIDAI website is organised around the institution's departments. In 2036 it should be organised around the citizen's life. Five pillars carry the redesign - each one answers evidence from the audit, not decoration.</p>
      <div className="a36-pillars">
        {pillars.map((p, i) => <div className="a36-pillar" key={p.title}><div className="pn">{i + 1}</div><h3>{p.title}</h3><p>{p.body}</p></div>)}
      </div>
    </div>

    <div className="a36-section">
      <div className="eyebrow">The scale at stake, on {observed.date}</div>
      <h2>One of the largest identity systems on Earth</h2>
      <div className="a36-stats">
        {observed.stats.map(s => <div className="a36-stat" key={s.label}><div className="v">{s.value}</div><div className="l">{s.label}</div></div>)}
      </div>
      <p className="a36-note">Figures from the official Aadhaar dashboard shown on uidai.gov.in, observed {observed.date}. At this scale, a one-percent failure rate is over a crore people having a bad day.</p>
    </div>
  </>;
}

export function App() {
  return <FileCard>
    <div className="a36">
      <nav className="file-nav" aria-label="File pages">
        <NavLink to="/" end>Concept</NavLink>
        <NavLink to="/research">Audit</NavLink>
        <NavLink to="/prototype">Prototype</NavLink>
        <NavLink to="/wireframes">Wireframes</NavLink>
        <NavLink to="/testing">Testing</NavLink>
        <NavLink to="/sources">Sources</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Cover />} />
        <Route path="/research" element={<Research />} />
        <Route path="/prototype" element={<PrototypeHome />} />
        <Route path="/prototype/services" element={<PrototypeServices />} />
        <Route path="/prototype/update" element={<PrototypeUpdate />} />
        <Route path="/prototype/status" element={<PrototypeStatus />} />
        <Route path="/prototype/centres" element={<PrototypeCentres />} />
        <Route path="/prototype/wallet" element={<PrototypeWallet />} />
        <Route path="/prototype/everything" element={<PrototypeEverything />} />
        <Route path="/prototype/about" element={<PrototypeAbout />} />
        <Route path="/prototype/legal" element={<PrototypeLegal />} />
        <Route path="/prototype/developers" element={<PrototypeDevelopers />} />
        <Route path="/prototype/newsroom" element={<PrototypeNewsroom />} />
        <Route path="/prototype/help" element={<PrototypeHelp />} />
        <Route path="/wireframes" element={<Wireframes />} />
        <Route path="/testing" element={<Testing />} />
        <Route path="/sources" element={<Sources />} />
      </Routes>
    </div>
  </FileCard>;
}
