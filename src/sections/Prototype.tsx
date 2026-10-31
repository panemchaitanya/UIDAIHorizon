import React, { useState } from 'react';
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

export function PrototypeHome() {
  return <>
    <div className="a36-section">
      <div className="eyebrow">Stage 5 · The redesign</div>
      <h2>The 2036 homepage: start from your life</h2>
      <p className="lede">No department menus. A voice-first search in your language, life-event entries, and one proactive strip that tells you about anything that needs you - before you go looking.</p>
    </div>
    <MockFrame url="aadhaar2036.gov.in (concept)">
      <div className="a36p-hero">
        <h2>Namaste, Ravi.<br />What do you need <span>today</span>?</h2>
        <p>Say it or type it - in any of 22 languages. UIDAI Horizon understands your situation and walks you through it, step by step.</p>
        <div className="a36p-search"><div className="box">Try: "I moved to a new house" · "मेरा पता बदल गया है"</div><div className="mic">🎙 Speak</div></div>
        <div className="a36p-strip"><span className="pulse" />Your address update was approved yesterday. Your new card is on its way - track it any time.</div>
      </div>
      <div className="a36p-life">
        <h3>What brings you here?</h3>
        <div className="sub">Every journey ends with tracked progress, not a receipt you must decode.</div>
        <div className="a36p-lifegrid">
          <Link to="/prototype/update" className="tile"><div className="ic">🏠</div><h4>I moved house</h4><p>Update your address in minutes, in your language, with document checks before you submit.</p></Link>
          <Link to="/prototype/services" className="tile"><div className="ic">👶</div><h4>A child in the family</h4><p>Baal Aadhaar, the free biometric update at 5 and 15, school needs - one guided path.</p></Link>
          <Link to="/prototype/wallet" className="tile"><div className="ic">🪪</div><h4>Prove who I am</h4><p>Share only what's needed: your age, not your birthdate. Every share leaves a receipt.</p></Link>
          <Link to="/prototype/status" className="tile"><div className="ic">📦</div><h4>Track a request</h4><p>Live stage, realistic date, and alerts - no SRN decoder ring required.</p></Link>
          <Link to="/prototype/centres" className="tile"><div className="ic">📍</div><h4>Visit a centre</h4><p>See which centres are actually working today, the live queue, and book a slot.</p></Link>
          <Link to="/prototype/services" className="tile"><div className="ic">🤝</div><h4>Help a family member</h4><p>Assisted mode: manage an elder's or child's request with their consent, from your phone.</p></Link>
        </div>
      </div>
      <FicNote />
    </MockFrame>
    <p className="a36-note">Design answers: audit issues 1 (proactive status strip), 2 (voice + 22 languages), 3 (one site, no outsourced dead ends) and 4 (life events over menus).</p>
  </>;
}

export function PrototypeServices() {
  const groups = [
    { g: 'Your details', items: ['Update address, mobile or email', 'Correct name or date of birth', 'Free document refresh every 10 years', 'Photo and biometric refresh'] },
    { g: 'Your card and identity', items: ['Download e-Aadhaar', 'Order a PVC card, tracked', 'Masked Aadhaar and Virtual ID', 'Verifiable credentials for apps'] },
    { g: 'Your family', items: ['Baal Aadhaar for a newborn', 'Mandatory biometric updates at 5 and 15', 'Head-of-family address proof', 'Assisted mode with consent'] },
    { g: 'Your security', items: ['Lock or unlock biometrics', 'Authentication history, explained', 'Report misuse in one tap', 'Consent receipts and revocations'] },
  ];
  return <>
    <div className="a36-section">
      <div className="eyebrow">2036 prototype</div>
      <h2>All services, organised by your life</h2>
      <p className="lede">The same services UIDAI offers today - mapped from its own site map - regrouped around people instead of departments. Nothing is three portals away.</p>
    </div>
    <MockFrame url="aadhaar2036.gov.in/services (concept)">
      <div className="a36p-life">
        {groups.map(g => <div key={g.g} style={{ marginBottom: 18 }}>
          <h3>{g.g}</h3>
          <div className="a36p-lifegrid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
            {g.items.map(i => <Link key={i} to="/prototype/update" className="tile"><h4>{i}</h4><p>Guided, tracked, in your language.</p></Link>)}
          </div>
        </div>)}
      </div>
      <FicNote />
    </MockFrame>
  </>;
}

const docsFor: Record<string, string[]> = {
  rent: ['Rent agreement or a photo of it on your phone - we check it instantly', 'Any one backup: electricity bill, bank passbook, or employer letter', 'Nothing needs a QR code - a human reviews unclear documents within a day'],
  family: ['Your parent or spouse\'s Aadhaar consent - they approve with one tap on their phone', 'No separate address proof needed for the whole family'],
  hostel: ['A letter from your hostel, college or employer - photo is enough', 'We tell you within minutes if the letter is missing anything'],
};

export function PrototypeUpdate() {
  const [step, setStep] = useState(0);
  const [situation, setSituation] = useState<string>('');
  const situations = [
    { id: 'rent', t: 'I rent a new place', s: 'Most common. You need one proof document - we check it before you submit.' },
    { id: 'family', t: 'I live with family', s: 'Easiest path. Your parent or spouse\'s Aadhaar vouches for the address.' },
    { id: 'hostel', t: 'Hostel, PG or work camp', s: 'A letter from the institution works. Photo is fine.' },
  ];
  return <>
    <div className="a36-section">
      <div className="eyebrow">2036 prototype · Priority 2</div>
      <h2>The guided address update</h2>
      <p className="lede">The most painful real journey, redesigned: prevention before submission, plain language, and a tracked outcome. Click through it - it is fully interactive, with fictional data.</p>
    </div>
    <MockFrame url="aadhaar2036.gov.in/update/address (concept)">
      <div className="a36p-wiz">
        <div className="crumb">{[0, 1, 2, 3].map(i => <div key={i} className={'cstep' + (step >= i ? ' on' : '')} />)}</div>
        {step === 0 && <>
          <h3>What changed?</h3>
          <p className="hint">Pick the closest - the steps adapt. సహాయం కావాలా? · मदद चाहिए? Help is one tap away in your language.</p>
          <div className="a36p-opts">
            {situations.map(s => <button key={s.id} className={'a36p-opt' + (situation === s.id ? ' sel' : '')} onClick={() => setSituation(s.id)}>{s.t}<small>{s.s}</small></button>)}
          </div>
          <div className="a36p-actions"><button className="a36p-btn" disabled={!situation} style={!situation ? { opacity: .4 } : {}} onClick={() => situation && setStep(1)}>Continue</button></div>
        </>}
        {step === 1 && <>
          <h3>What you need - and nothing more</h3>
          <p className="hint">Checked against the official 2026 document list. If it is not clear, a human reviews it within one working day - not a silent rejection months later.</p>
          <div className="a36p-check">
            {(docsFor[situation] || docsFor.rent).map(d => <div className="ci" key={d}><span className="tick">✓</span><span>{d}</span></div>)}
          </div>
          <div className="a36p-actions"><button className="a36p-btn ghost" onClick={() => setStep(0)}>Back</button><button className="a36p-btn" onClick={() => setStep(2)}>I have these - continue</button></div>
        </>}
        {step === 2 && <>
          <h3>Check it before it goes</h3>
          <p className="hint">Every field is read back in your language before submission. Nothing is submitted without your confirmation.</p>
          <div className="a36p-review">
            <div className="r"><span className="k">Name</span><span>Ravi Kumar (fictional)</span></div>
            <div className="r"><span className="k">New address</span><span>Flat 4B, Sunrise Residency, Gachibowli, Hyderabad 500032 (fictional)</span></div>
            <div className="r"><span className="k">Proof</span><span>Rent agreement - checked ✓</span></div>
            <div className="r"><span className="k">Fee</span><span>₹75, shown before you confirm</span></div>
          </div>
          <div className="a36p-actions"><button className="a36p-btn ghost" onClick={() => setStep(1)}>Back</button><button className="a36p-btn" onClick={() => setStep(3)}>Confirm and submit</button></div>
        </>}
        {step === 3 && <div className="a36p-done">
          <div className="big">🎉</div>
          <h3>Submitted - and tracked for you</h3>
          <div className="tid">Request DEMO-2036-0042</div>
          <p className="note">You will get a message at every stage, in Telugu. Expected completion: 5 working days. If anything needs attention, we tell you what and how to fix it - no silent rejections.</p>
          <div className="a36p-actions" style={{ justifyContent: 'center' }}><Link className="a36p-btn" style={{ textDecoration: 'none' }} to="/prototype/status">Track this request</Link></div>
        </div>}
      </div>
      <FicNote />
    </MockFrame>
  </>;
}

export function PrototypeStatus() {
  const steps = [
    { t: 'Request received', d: 'Today, 09:41 · confirmed by SMS in Telugu', state: 'done' },
    { t: 'Documents verified', d: 'Today, 10:03 · rent agreement accepted', state: 'done' },
    { t: 'Verification with records', d: 'Under way · usually completes in 2-3 working days', state: 'now' },
    { t: 'Address updated', d: 'Expected by Friday, 6 Nov', state: '' },
    { t: 'New e-Aadhaar ready', d: 'Download immediately; card delivery tracked separately', state: '' },
  ];
  return <>
    <div className="a36-section">
      <div className="eyebrow">2036 prototype · Priority 1</div>
      <h2>Track it like a package</h2>
      <p className="lede">The answer to the single biggest grievance: not knowing. Stage, evidence, realistic date, and proactive alerts - no 1947 call, no RTI application.</p>
    </div>
    <MockFrame url="aadhaar2036.gov.in/track/DEMO-2036-0042 (concept)">
      <div className="a36p-track">
        <div className="id">Address update · Request <strong>DEMO-2036-0042</strong> · Ravi Kumar (fictional)</div>
        <div className="steps">
          {steps.map(s => <div className={'a36p-tstep ' + s.state} key={s.t}><div className="d">{s.state === 'done' ? '✓' : s.state === 'now' ? '●' : ''}</div><div><h5>{s.t}</h5><p>{s.d}</p></div></div>)}
        </div>
      </div>
      <div className="a36p-eta"><strong>Expected: Friday, 6 November.</strong> Running late? You will hear from us first - with the reason and one-tap ways to fix it. This promise is the product.</div>
      <FicNote />
    </MockFrame>
  </>;
}

export function PrototypeCentres() {
  const centres = [
    { n: 'ASK Gachibowli', d: '1.2 km', live: 'open', queue: 'Now serving token 214 · about 25 min wait', services: 'All updates, biometrics, child enrolment', slots: ['11:30', '12:15', '14:00'] },
    { n: 'ASK Kondapur', d: '2.8 km', live: 'busy', queue: 'Now serving token 402 · about 1 hr 10 min wait', services: 'All updates; biometric kit serviced today ✓', slots: ['15:30', '16:00'] },
    { n: 'Post Office Aadhaar Desk, Madhapur', d: '3.1 km', live: 'open', queue: 'Walk-in quiet right now', services: 'Address and mobile updates only', slots: ['Book for tomorrow'] },
  ];
  return <>
    <div className="a36-section">
      <div className="eyebrow">2036 prototype · Priority 3</div>
      <h2>Centres you can trust before you travel</h2>
      <p className="lede">Every centre is verified daily: is it open, are the kits working, how long is the queue, what can you actually get done there today. No more three-bus journeys to a locked door.</p>
    </div>
    <MockFrame url="aadhaar2036.gov.in/centres (concept)">
      <div className="a36p-centres">
        {centres.map(c => <div className="a36p-centre" key={c.n}>
          <div className="top"><h4>{c.n}</h4><span className="dist">{c.d}</span><span className={'live ' + c.live}>{c.live === 'open' ? '● Open and verified today' : '● Open, busy'}</span></div>
          <div className="meta"><span>{c.queue}</span><span>{c.services}</span></div>
          <div className="slots">{c.slots.map(s => <span className="slot" key={s}>{s}</span>)}</div>
        </div>)}
      </div>
      <FicNote />
    </MockFrame>
  </>;
}

export function PrototypeWallet() {
  const [share, setShare] = useState({ name: true, age: true, photo: false, address: false });
  const toggle = (k: keyof typeof share) => setShare(s => ({ ...s, [k]: !s[k] }));
  return <>
    <div className="a36-section">
      <div className="eyebrow">2036 prototype · Privacy pillar</div>
      <h2>Your identity, in your hands</h2>
      <p className="lede">Selective disclosure by default: prove you are over 18 without revealing your birthdate. Every share leaves a revocable consent receipt. This extends UIDAI's own 2025-26 verifiable-credential and offline-verification direction.</p>
    </div>
    <MockFrame url="aadhaar2036.gov.in/me (concept)">
      <div className="a36p-wallet">
        <div className="a36p-idcard">
          <div className="nm">Ravi Kumar (fictional)</div>
          <div className="no">XXXX XXXX 2036</div>
          <div className="mask">Full number visible only to you, behind your face unlock</div>
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, marginTop: 4 }}>Sharing with "City Bus Pass (demo)" - choose exactly what it sees:</div>
        {([['name', 'Name'], ['age', 'That I am over 18 (not my birthdate)'], ['photo', 'Photo'], ['address', 'Address']] as const).map(([k, label]) =>
          <button key={k} className="a36p-toggle" onClick={() => toggle(k)} style={{ cursor: 'pointer', width: '100%', border: '1px solid var(--line)' }}>{label}<span className={'sw' + (share[k] ? ' on' : '')} /></button>)}
        <div style={{ fontSize: 13, fontWeight: 700, marginTop: 6 }}>Consent receipts (fictional)</div>
        <div className="a36p-receipt"><span className="w">City Bus Pass</span><span className="d">Shared: name, over-18 · 28 Oct 2026 · Revoke any time</span></div>
        <div className="a36p-receipt"><span className="w">Sunrise Bank eKYC</span><span className="d">Shared: name, photo, masked Aadhaar · 12 Oct 2026 · Revoke any time</span></div>
      </div>
      <FicNote />
    </MockFrame>
  </>;
}
