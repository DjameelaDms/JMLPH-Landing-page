# JMLPH Landing Page - Product Requirements Document

## Original Problem Statement
Creating a professional landing page for JMLPH.net (Journal of Medicine, Law, and Public Health) that serves as a gateway to the OJS portal. Design inspired by The Lancet and BMJ academic journals, with colors matching the parent company Aretion Co UK.

## User Personas
1. **Researchers/Authors** - Looking to submit manuscripts and explore publication guidelines
2. **Healthcare Professionals** - Seeking peer-reviewed research at the intersection of medicine, law, and public health
3. **Legal Experts** - Interested in medical law and healthcare ethics research
4. **Public Health Practitioners** - Looking for policy-relevant research and interdisciplinary studies
5. **Academic Institutions** - Evaluating journal credibility for citation purposes

## Core Requirements (Static)
- Professional academic journal landing page
- Clear navigation to OJS portal (https://www.jmlph.net/index.php/jmlph)
- Display current issue articles with links to full content
- Animated journal metrics with count-up and "(as of 2026)" subtitle
- Submission information and guidelines
- Contact/Newsletter via mailto links to Editorial.Board@JMLPH.net
- Contact section with London Office only (Gulf Office removed)
- London address: 71-75, Shelton Street, Covent Garden, London, WC2H 9JQ
- Policy documents in modal pop-ups (Privacy Notice, Terms of Use, Code of Conduct, Anti-Bribery)
- Mobile responsive design
- Aretion branding with ARETION Publishing Group logo
- Acquisition statement about transition in 2025/2026
- 12 indexing database logos with links
- Emergent badge hidden

## What's Been Implemented (February-March 2026)

### Frontend (React + Tailwind CSS + shadcn/ui)
- [x] Clean white header with Aretion Publishing Group logo and navigation
- [x] Hero section with acquisition statement and CTAs
- [x] Journal Metrics section with animated count-up and "(as of 2026)" subtitle
- [x] About the Journal section with 4 feature cards
- [x] OJS Portal access section
- [x] Current Issue section with 3 articles (Vol. 6 No. 2, Apr-Jun 2026)
- [x] Submission Information section with publication info
- [x] 12 Indexing databases with clickable logos
- [x] Newsletter section (mailto link)
- [x] Contact section with London Office only (Gulf Office removed)
- [x] Policy modal pop-ups with proper accessibility (DialogDescription)
- [x] Footer with ARETION copyright and policy links
- [x] Back to top button
- [x] Framer Motion animations
- [x] Fully responsive design with mobile menu
- [x] Emergent badge hidden via CSS
- [x] Browser tab title: "ARETION Publishing Group"

### Backend (FastAPI)
- [x] Health check endpoint (GET /api/health)

## Design System
- Primary: Dark Slate (#1a2f4a, #1e3a5f)
- Accent: Sienna (#a0522d), Gold (#c9a77d)
- Background: Warm White (#faf8f5), Cream (#f5f0e8)
- Fonts: Cormorant Garamond (headings) + body text
- Aretion-inspired professional academic aesthetic

## Prioritized Backlog

### P0 (Critical) - ALL COMPLETED
- All core landing page sections
- OJS portal integration
- Mailto links for contact/newsletter
- Policy document modals with accessibility
- Animated metrics with "(as of 2026)"
- Gulf Office removal, London address update
- Aretion branding and logo

### P1 (High Priority) - Future
- SEO optimization (meta tags, Open Graph, structured data)
- Google Scholar structured data markup

### P2 (Medium Priority) - Future
- Recent Publications section with RSS feed from OJS
- Refactoring App.js into smaller component files
- Multi-language support
- Article search functionality

## Technical Stack
- Frontend: React 19, Tailwind CSS, shadcn/ui, Framer Motion
- Backend: FastAPI
- Deployment: Kubernetes (Emergent Platform)

## Testing Status
- Iteration 1: Previous fork testing
- Iteration 2: 100% pass rate (16/16 tests) - All features verified
