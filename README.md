# Vanguard & Juris | Chambers of Senior Advocates & Counsel

> Premier Supreme Court of India & High Courts Appellate Litigation Chambers

Vanguard & Juris is an elite digital presence designed specifically for top-tier appellate counsel, senior advocates, and constitutional litigators. The platform combines high-end editorial typography with a custom-engineered 3D vector perspective scroll engine, word-by-word scroll-scrubbed typography reveals, pinned horizontal case precedent tracks, and interactive conflict check and retainer computation systems.

Live Production URL: https://sabhyamtrivedycoder.github.io/vanguard-law-chambers/

---

## Key Architectural & Visual Features

### 1. Interactive 3D Perspective Canvas Engine
- Custom mathematical 3D rendering engine built directly in vanilla JavaScript and HTML5 Canvas (zero heavy 3D library overhead).
- Real-time 3D projection of the Imperial Scales of Justice, balanced fulcrum, hanging suspension chords, and temple pedestal.
- Continuous lerping (`0.08` exponential smoothing) tracking `window.scrollY` and mouse tilt coordinates `(rotX, rotY, rotZ)`.
- Subtle upward-drifting golden embers reacting to viewport scroll velocity.

### 2. High-Performance Scroll Mechanics
- Word-by-Word Kinetic Scrubbing: Extracts text into individual word spans, dynamically adjusting opacity and burnished gold color based on element viewport traversal.
- Pinned Horizontal Track: Multi-billion rupee landmark precedent cards translate horizontally along the X-axis while pinned in viewport during vertical scroll.
- Staggered Entrance Reveal: IntersectionObserver pipeline driving smooth transform transitions across practice cards, judicial citations, and counsel profiles.

### 3. Interactive Retainer & Procedural Timeline Calculator
- Real-time retainer assessment tool for Corporate and High-Stakes Individual disputes.
- Dynamically calculates litigation brackets, expected hearing intervals, and procedural stages (SLPs, Interim Stays, Final Arguments).
- One-click encrypted WhatsApp briefing dispatch with pre-filled case brief parameters.

### 4. BCI Rule 36 Statutory Compliance
- Strictly compliant with Bar Council of India Rule 36 (Standards of Professional Conduct and Etiquette).
- Editorial, matter-of-fact tone highlighting reported judicial citations, court bench precedents, and academic credentials without solicitation or advertisement.
- Clear statutory acknowledgment disclaimer accessible across all pages.

---

## Directory Structure

```
vanguard-law-chambers/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated GitHub Actions deployment pipeline
├── public/
│   ├── favicon.svg             # Imperial Scales of Justice vector seal
│   └── images/
│       └── logo/
│           └── vanguard_logo.svg
├── src/
│   ├── main.js                 # Application bootstrap
│   ├── scrollEngine.js         # 3D canvas engine & scroll interaction controllers
│   └── style.css               # Obsidian & Imperial Roman Gold styling system
├── index.html                  # Flagship 3D scroll showcase & executive overview
├── practice-areas.html         # Constitutional writs, IBC, PMLA, & Arbitration
├── case-victories.html         # Landmark Supreme Court & High Court reported judgments
├── attorneys.html              # Senior Advocates, Managing Partners & Counsel
├── consultation.html           # Retainer calculator & confidential conflict check
├── contact.html                # Supreme Court Chambers & High Court annexes
├── privacy.html                # Attorney-Client Privilege under Indian Evidence Act 126
├── disclaimer.html             # BCI Rule 36 statutory declaration
├── package.json
└── vite.config.js              # Multi-page Rollup configuration
```

---

## Local Development

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Setup & Execution
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the local development server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```
4. Preview production build:
   ```bash
   npm run preview
   ```

---

## Deployment

The repository is configured for automated GitHub Actions deployment. Every push to the `main` branch triggers the workflow in `.github/workflows/deploy.yml` which builds the Vite project and deploys the generated `dist/` directory to GitHub Pages.

---

## Legal & Compliance Notice

This portal is intended solely for informative purposes regarding Vanguard & Juris Chambers in accordance with the regulations established under the Advocates Act, 1961 and Bar Council of India rules. No information contained herein constitutes formal legal advice or the solicitation of legal representation.
