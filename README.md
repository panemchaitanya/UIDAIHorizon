# UIDAI Horizon

An academic concept redesign of uidai.gov.in, ten years forward (2036), built for
IIIT Hyderabad's "AI for Product Managers" coursework. Unofficial student work;
not affiliated with UIDAI. All flows use fictional data - no real Aadhaar number,
OTP or personal information is requested or stored.

## Contents
- Concept cover and audit evidence (persona, timed task, five Nielsen issues, RICE priorities)
- Clickable prototype: life-event homepage, guided address update, request tracking,
  centres, selective-disclosure identity wallet, plus concept pages for the whole
  site inventory (Institute, Legal, Developers, Newsroom, Help)
- Low-fidelity wireframes and the improved user flow
- Stage 6 test plan (protocol only - real sessions pending)

## Build
```
npm install
npm run build    # outputs dist/
npm run dev      # local dev server
```
The app code imports a local `src/platform.ts`; the Vite config aliases the
platform module to `src/standalone.tsx` (react-router-dom + HashRouter) so the
same source builds standalone.
