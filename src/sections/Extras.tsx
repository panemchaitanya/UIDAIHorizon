import React from 'react';
import { sources } from '../data';

export function Wireframes() {
  return <>
    <div className="a36-section">
      <div className="eyebrow">Stage 5 · Process</div>
      <h2>Low-fidelity first</h2>
      <p className="lede">The redesign was sketched as wireframes before pixels: structure and flow decided in grey boxes, then lifted into the interactive prototype. The brief names Figma for this artefact; the frames below mirror what the Figma file will carry, and the file itself is a pending owner decision.</p>
      <div className="a36-wf">
        <div>
          <div className="frame">
            <div className="bar dark" style={{ height: 18, width: '40%' }} />
            <div className="bar" style={{ height: 34, marginTop: 14 }} />
            <div className="row"><div className="bar" style={{ height: 60, flex: 1 }} /><div className="bar" style={{ height: 60, flex: 1 }} /><div className="bar" style={{ height: 60, flex: 1 }} /></div>
            <div className="bar dark" style={{ height: 26, marginTop: 12, width: '70%' }} />
            <div className="row"><div className="bar" style={{ height: 44, flex: 1 }} /><div className="bar" style={{ height: 44, flex: 1 }} /></div>
          </div>
          <div className="cap">W1 · Home: greeting + voice search, proactive strip, life-event grid</div>
        </div>
        <div>
          <div className="frame">
            <div className="row">{[1, 2, 3, 4].map(i => <div key={i} className="bar dark" style={{ height: 8, flex: 1 }} />)}</div>
            <div className="bar dark" style={{ height: 18, width: '50%', marginTop: 14 }} />
            <div className="bar" style={{ height: 40, marginTop: 12 }} />
            <div className="bar" style={{ height: 40, marginTop: 8 }} />
            <div className="bar" style={{ height: 40, marginTop: 8 }} />
            <div className="bar dark" style={{ height: 30, marginTop: 12, width: '35%' }} />
          </div>
          <div className="cap">W2 · Guided update: progress rail, one decision per screen</div>
        </div>
        <div>
          <div className="frame">
            <div className="bar dark" style={{ height: 14, width: '55%' }} />
            {[1, 2, 3, 4, 5].map(i => <div key={i} className="row"><div className="bar dark" style={{ width: 22, height: 22, borderRadius: 11 }} /><div className="bar" style={{ height: 22, flex: 1 }} /></div>)}
            <div className="bar" style={{ height: 30, marginTop: 10, background: '#bcd9d2' }} />
          </div>
          <div className="cap">W3 · Track: vertical timeline, current stage highlighted, ETA panel</div>
        </div>
        <div>
          <div className="frame">
            <div className="bar dark" style={{ height: 52, borderRadius: 12 }} />
            {[1, 2, 3].map(i => <div key={i} className="row"><div className="bar" style={{ height: 24, flex: 1 }} /><div className="bar dark" style={{ width: 34, height: 16, borderRadius: 8 }} /></div>)}
            <div className="bar" style={{ height: 24, marginTop: 10 }} />
            <div className="bar" style={{ height: 24, marginTop: 6 }} />
          </div>
          <div className="cap">W4 · My identity: masked card, per-field share toggles, receipts</div>
        </div>
      </div>
    </div>

    <div className="a36-section">
      <div className="eyebrow">Stage 5 · Improved user flow</div>
      <h2>Address update: before vs after</h2>
      <div className="a36-grid cols-2">
        <div className="a36-pillar">
          <h3>Today</h3>
          <p><strong>Observed tonight, no sign-in:</strong> homepage → tile pointing at the status URL → a separate myAadhaar portal that would not load from the test network → the accepted-documents answer unreachable through two official navigation paths.</p>
          <p style={{ marginTop: 8 }}><strong>Reported journey after login</strong> (from official documentation and dated user complaints, not measured tonight): Aadhaar number + CAPTCHA + OTP → find the right section → upload documents unguided → pay → receive an SRN → limited status visibility → complaints describe rejections without a clear reason → start over.</p>
        </div>
        <div className="a36-pillar">
          <h3>2036 concept</h3>
          <p>Say "I moved" in your language → situation picker → exact documents, pre-checked → review read back to you → tracked submission → proactive alerts until done → specific recovery if rejected.</p>
        </div>
      </div>
      <div className="a36-flow">
        {[
          ['Entry by intent', 'Voice or text in 22 languages, or a life-event tile. No menu knowledge required.'],
          ['Situation, not form', 'Three situations cover most movers; the journey adapts instead of presenting one giant form.'],
          ['Prevention before submission', 'Document pre-checks and photo guidance eliminate the top rejection causes before they happen.'],
          ['Confirmed understanding', 'Details read back in the citizen\'s language; fee shown before commitment.'],
          ['Tracked outcome', 'Live timeline with ETA and proactive alerts; rejection comes with a specific fix, not a dead end.'],
        ].map(([t, d], i) => <div className="f" key={t}><div className="n">{i + 1}</div><div><h4>{t}</h4><p>{d}</p></div></div>)}
      </div>
    </div>
  </>;
}

export function Testing() {
  const tasks = [
    ['T1', 'Find which documents you need to update your address', 'Measures findability of the most common pre-update question'],
    ['T2', 'Start and complete an address update (demo data)', 'Measures the guided flow end to end'],
    ['T3', 'Find out what is happening with a request you made', 'Measures status transparency'],
    ['T4', 'Find a working centre near you and book a slot', 'Measures centre trust and appointment clarity'],
    ['T5', 'Share only proof that you are over 18 with a service', 'Measures selective-disclosure control'],
  ];
  return <>
    <div className="a36-section">
      <div className="eyebrow">Stage 6 · Test and measure</div>
      <h2>The test plan - ready for real users</h2>
      <p className="lede">Five tasks, run with 3-5 users on both the current site and the prototype. No results are shown here, because no sessions have happened yet - inventing them would fail the assignment's own standard of evidence.</p>
      <div className="a36-tasks">
        {tasks.map(([id, t, m]) => <div className="a36-task" key={id}><b>{id}.</b> {t}<br /><span style={{ color: 'var(--ink-2)', fontSize: 12.5 }}>{m}</span></div>)}
      </div>
      <div className="a36-pending">
        <strong>Scoreboard to fill per user and task:</strong> success (yes / partial / no), time on task, errors, and a one-line verbatim. Plus a 10-question SUS score per site. The before/after table ships empty on purpose - it becomes honest the moment the first real session is done.
      </div>
      <div className="a36-pending">
        <strong>Recruitment note for the owner:</strong> classmates or family are fine per the brief (3-5 users). Run the current site first, then the prototype, same tasks, same order. Session template: consent line, think-aloud prompt, task list, SUS form.
      </div>
    </div>
  </>;
}

function SrcGroup({ title, note, items }: { title: string; note?: string; items: { label: string; url: string }[] }) {
  return <div className="a36-section">
    <div className="eyebrow">{title}</div>
    {note && <p className="lede" style={{ marginTop: 4 }}>{note}</p>}
    <div className="a36-src">{items.map(s => <a key={s.url} href={s.url} target="_blank" rel="noreferrer">{s.label}</a>)}</div>
  </div>;
}

export function Sources() {
  return <>
    <div className="a36-section">
      <div className="eyebrow">Appendix</div>
      <h2>Sources and method</h2>
      <p className="lede">Every claim on this site traces here. Complaints are dated; material older than the past year is kept separately as historical context. Live-site findings were observed and screenshotted on 31 October 2026 from a research browser; network-specific failures are labelled as such rather than attributed to the site.</p>
    </div>
    <SrcGroup title="Official UIDAI and government sources" items={sources.official} />
    <SrcGroup title="Complaints and reporting within the past year" items={sources.pastYear} />
    <SrcGroup title="Historical context (before 31 Oct 2025)" note="Older than the assignment's past-year window; retained because the patterns they document are corroborated by the in-window sources above." items={sources.historical} />
    <div className="a36-section">
      <div className="eyebrow">Method notes</div>
      <p className="lede">Persona, RICE scores and all 2036 capabilities are hypotheses and proposals, labelled as such. Machine timings in Stage 2 are from an automated browser, not human users. No real Aadhaar data was accessed, entered or requested at any point.</p>
    </div>
  </>;
}
