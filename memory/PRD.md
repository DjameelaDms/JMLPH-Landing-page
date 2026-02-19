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
- Animated journal metrics with count-up
- Submission information and guidelines
- Newsletter subscription functionality
- Contact form with dual office locations
- Policy documents in modal pop-ups
- Mobile responsive design
- Aretion-inspired color scheme (amber/orange accent with clean professional aesthetic)

## What's Been Implemented (February 2026)

### Frontend (React + Tailwind CSS + shadcn/ui)
- [x] Clean white header with navigation and mobile menu
- [x] Hero section with compelling tagline and CTAs
- [x] Journal Metrics section with animated count-up (6 metrics)
- [x] About the Journal section with 4 feature cards
- [x] OJS Portal access section with prominent links
- [x] Current Issue section with article cards (6 articles)
- [x] Submission Information section with journal info
- [x] Newsletter subscription form with backend integration
- [x] Contact section with London office location only
- [x] Policy modal pop-ups (Privacy Notice, Terms of Use, Code of Conduct, Anti-Bribery Policy)
- [x] Footer with ARETION copyright and policy links
- [x] Back to top button
- [x] Framer Motion animations
- [x] Fully responsive design

### Backend (FastAPI + MongoDB)
- [x] Newsletter subscription endpoint (POST /api/newsletter/subscribe)
- [x] Newsletter unsubscribe endpoint (DELETE /api/newsletter/unsubscribe/{email})
- [x] Contact form endpoint (POST /api/contact)
- [x] Admin endpoints for viewing subscriptions and messages
- [x] Health check endpoint

### Journal Metrics Displayed
- Total Submissions: 231
- Desk Rejections: 35
- Declined After Review: 43
- Days to First Decision: 19
- Days to Accept: 109
- Acceptance Rate: 46%

### Contact Information
- London Office: 71-75 Shelton Street, Covent Garden, London, WC2H 9JQ | +44 20 3985 0907

### Policy Documents (Modal Pop-ups)
- Privacy Notice (Last updated: 9 Feb 2026)
- Terms of Use (Last updated: 7 Feb 2026)
- Code of Conduct (Last updated: 10 Feb 2026)
- Anti-Bribery and Anti-Corruption Policy (Last updated: 14 Feb 2026)

## Design System
- Primary: Dark Slate (#0f172a)
- Accent: Amber (#d97706)
- Background: White/Light Gray
- Fonts: Playfair Display (headings) + Inter (body)
- Sharp corners for academic aesthetic

## Prioritized Backlog

### P0 (Critical) - COMPLETED
- All core landing page sections
- OJS portal integration
- Newsletter and contact forms
- Policy document modals
- Animated metrics

### P1 (High Priority) - Future
- SEO optimization (meta tags, structured data)
- Admin dashboard for newsletter/contact management
- Analytics integration

### P2 (Medium Priority) - Future
- Multi-language support
- Article search functionality
- RSS feed integration

## Next Tasks
1. Add meta tags and Open Graph data for SEO
2. Implement admin dashboard for managing subscriptions
3. Add structured data markup for Google Scholar
4. Consider adding article abstract previews

## Technical Stack
- Frontend: React 19, Tailwind CSS, shadcn/ui, Framer Motion
- Backend: FastAPI, Motor (async MongoDB driver)
- Database: MongoDB
- Deployment: Kubernetes (Emergent Platform)
