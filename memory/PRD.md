# JMLPH Landing Page Redesign — PRD

## Original Problem Statement
Modern, responsive, award-worthy redesign of the JMLPH (Journal of Medicine, Law & Public Health) homepage (`jmlph.net/index.php/jmlph/index`). Same content and links, dramatically better visual design, structure and mobile experience. React front end mirroring the existing information architecture. Content is static for v1. Directive: Awwwards Site-of-the-Day level — kinetic hero with masked line-by-line reveal, editorial marquee, numbered "manifesto" Most Read, smooth momentum scrolling, subtle hero parallax, purposeful motion throughout.

## Architecture
- **Frontend only** (no backend/DB). React 19 + CRA (craco), Tailwind, framer-motion (scroll reveals + hero motion), lenis (smooth scrolling), react-fast-marquee (stats marquee), lucide-react (icons).
- Static content lives in `/app/frontend/src/data/journal.js` (single source of truth; all external URLs preserved exactly).
- Section components in `/app/frontend/src/components/`: Header, Hero, StatsMarquee, About, PublicationFee, CurrentIssue, MostRead, Information, Footer, Reveal (helper).
- Design system: Playfair Display (serif headings), Outfit (body), JetBrains Mono (metadata); palette deep navy `#0A192F` + teal `#0F4C5C` on bone `#F7F5F0`; grain overlay; 1px editorial grid borders.
- Assets in `/app/frontend/public/`: `logo.webp` (uploaded monogram, used in header+footer), `hero-journal.jpg` (the journal's own homepage library image).

## User Personas
- Researchers/authors evaluating the journal and submitting manuscripts.
- Readers/clinicians/policymakers browsing the current issue and downloading PDFs.
- Librarians checking ISSNs, frequency, indexing info.

## Core Requirements (static)
- Preserve all existing content and links (articles, PDFs, info pages, submission, feeds, ARETION, ISSNs).
- Sections: Header/Nav, Hero, About, Publication Fee notice, Current Issue (grouped by section), At-a-Glance stats, Most Read, Information + Feeds, Footer.
- Fully responsive, accessible contrast, prominent "Make a Submission" and PDF CTAs.

## Implemented (2026-06-09)
- All 9 sections built and verified (frontend testing agent: 100% pass, no blocking issues).
- Kinetic hero: masked line-by-line reveal, clipped/parallax library image, floating 46% stat, badges, dual CTAs.
- Editorial marquee of at-a-glance stats; dark high-contrast Publication Fee card.
- Current Issue as rigorous Swiss-grid index grouped into Original Articles / Commentary / Law & Ethics with authors, page range, PDF buttons (all links → jmlph.net).
- Most Read numbered-manifesto list with view counts.
- Information + RSS/Atom feeds; footer with contact email, ISSNs, ARETION, OJS/PKP credit.
- Sticky glassmorphism header + mobile hamburger menu; smooth scrolling + scroll-reveal motion.
- Uploaded logo applied to header + footer; hero image swapped to the live site's homepage image.

## Backlog / Remaining
- **P2** Make current issue editable via admin (FastAPI + MongoDB) — deferred (static for v1).
- **P2** Add remaining static pages (article, archive, submission) — out of scope; currently link out to OJS.
- **P2** Optional SEO/meta/OpenGraph images and sitemap.

## Notes
- Screenshot tool only captures the top viewport (Lenis owns scroll); full-page content verified via crawl + testing agent.
