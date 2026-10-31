import React from 'react';
import { nielsen, observed, priorities, timedTask } from '../data';
import personaImg from '../photos/persona-ravi.png';
import currentShot from '../photos/current-home.png';

export function Research() {
  return <>
    <div className="a36-section">
      <div className="eyebrow">Stage 1 · Understand the user</div>
      <h2>One persona, one job</h2>
      <p className="lede">An evidence-informed persona built from the complaint record, kept deliberately tentative until class fieldwork confirms it. He represents the largest, most failed-on group: people who must update Aadhaar because life moved.</p>
      <div className="a36-persona">
        <img src={personaImg} alt="Illustration of Ravi, a fictional 34-year-old migrant construction worker holding a basic smartphone" />
        <div className="card">
          <h3>Ravi Kumar</h3>
          <div className="role">34 · construction worker · moved to Hyderabad for work</div>
          <div className="a36-kv">
            <div className="row"><div className="k">Devices</div><div>Basic Android phone, prepaid data, shared with family</div></div>
            <div className="row"><div className="k">Languages</div><div>Speaks Telugu and Hindi; reads simple Telugu; limited English</div></div>
            <div className="row"><div className="k">Goal</div><div>Update his Aadhaar address so he can keep his bank account, rations and daily-wage work</div></div>
            <div className="row"><div className="k">Frustrations</div><div>Took a day's leave twice; centre queues from 6am; rejection SMS he cannot decode; no way to ask a human</div></div>
            <div className="row"><div className="k">Reality</div><div>Years of physical labour have worn his fingerprints; his old documents have no QR codes</div></div>
          </div>
          <div className="a36-jtbd"><strong>Job to be done:</strong> when I move for work, help me prove my new address once, correctly, in my language - and tell me exactly what is happening until it is done - so I never burn a day's wages on a rejection I could have prevented.</div>
          <p className="a36-note">Grounding: The Wire's 2025 field survey of 100 applicants (queues, worn fingerprints, English-only forms, QR-code document rule), 2026 app reviews, and UIDAI's own grievance reporting. Tentative persona - not human-research findings.</p>
        </div>
      </div>
    </div>

    <div className="a36-section">
      <div className="eyebrow">Stage 2 · Complete a real task</div>
      <h2>A simple question, three dead ends</h2>
      <p className="lede">{timedTask.task}. {timedTask.scope}</p>
      <div className="a36-tl">
        {timedTask.steps.map(s => <div className={'row' + (s.ok ? '' : ' fail')} key={s.time}><div className="t">{s.time}</div><div><div className="a">{s.action}</div><div className="r">{s.result}</div></div></div>)}
      </div>
      <div className="a36-outcome"><strong>Outcome:</strong> {timedTask.outcome}</div>
      <p className="a36-note">Pain points surfaced: two navigation paths that dead-end, no in-page answer to the most common pre-update question, and a hard dependency on portals that may not load. This guest-completable task was chosen precisely because it needs no sign-in; the timed run above is the assignment's real-task evidence, with the caveat that it was machine-executed. Human timings for the same task and for full authenticated journeys are part of the Stage 6 sessions.</p>
    </div>

    <div className="a36-section">
      <div className="eyebrow">Stage 3 · Audit the experience</div>
      <h2>Five usability issues, evidence attached</h2>
      <p className="lede">Mapped to Nielsen's heuristics. "Observed" findings were verified on the live site on {observed.date}; sourced complaints are dated, and anything older than the past year is labelled historical context.</p>
      {nielsen.map(i => <div className="a36-issue" key={i.n}>
        <div className="top"><div className="n">{i.n}</div><h3>{i.heuristic}</h3><span className={'sev ' + i.severity.toLowerCase()}>{i.severity}</span></div>
        <p>{i.issue}</p>
        <div className="a36-ev">{i.evidence.map(e => <a key={e.url} href={e.url} target="_blank" rel="noreferrer">{e.label} ↗</a>)}</div>
      </div>)}
    </div>

    <div className="a36-section">
      <div className="eyebrow">Stage 3b · Defects observed live</div>
      <h2>What the site itself showed us</h2>
      <p className="lede">Direct observations from a live browse of uidai.gov.in on {observed.date} - each independently checkable.</p>
      <div className="a36-grid cols-2">
        {observed.defects.map(d => <div className="a36-pillar" key={d.title}><h3 style={{ fontSize: 14.5 }}>{d.title}</h3><p>{d.detail}</p></div>)}
      </div>
      <div className="a36-ba">
        <div className="pane before">
          <div className="tag">Before · uidai.gov.in today</div>
          <img src={currentShot} alt="Screenshot of the current UIDAI homepage with a blank hero banner area" />
          <div className="notes">Captured 31 Oct 2026: the hero banner loaded blank, and the top tasks behind it lead to broken or outsourced destinations.</div>
        </div>
        <div className="pane after">
          <div className="tag">After · the 2036 concept</div>
          <div className="notes" style={{ padding: '18px 16px' }}>
            <li>Start from the citizen's situation, not the department's org chart</li>
            <li>Every request is trackable with an ETA and alerts</li>
            <li>Answers in-page, in the citizen's language - no broken hops</li>
            <li>Centre information is verified, live and legal</li>
            <li><a href="#/prototype" style={{ color: 'var(--navy-2)', fontWeight: 700 }}>Walk through it in the prototype →</a></li>
          </div>
        </div>
      </div>
    </div>

    <div className="a36-section">
      <div className="eyebrow">Stage 4 · Prioritise improvements</div>
      <h2>The top three, scored with RICE</h2>
      <p className="lede">RICE scores here are explicit hypotheses, not measured values: reach, impact and confidence are argued from the cited evidence, effort from comparable government digital programmes. The numbers exist to make the argument inspectable; the ranking is the defensible part.</p>
      <div className="a36-rice">
        {priorities.map(p => <div className="card" key={p.rank}>
          <div className="rank">{p.rank}</div>
          <h3>{p.name}</h3>
          <p className="what">{p.what}</p>
          <p className="why"><strong>Why it wins:</strong> {p.why}</p>
          <div className="scores">
            <span className="chip">Reach: {p.rice.reach}</span>
            <span className="chip">Impact: {p.rice.impact}</span>
            <span className="chip">Confidence: {p.rice.confidence}</span>
            <span className="chip">Effort: {p.rice.effort}</span>
            <span className="chip score">RICE {p.rice.score}</span>
          </div>
          <div className="fixes">Directly fixes audit issue{p.fixes.length > 1 ? 's' : ''} {p.fixes.join(', ')} from Stage 3.</div>
        </div>)}
      </div>
    </div>
  </>;
}
