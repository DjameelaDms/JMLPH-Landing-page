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
- Editorial board showcase
- Submission information and guidelines
- Journal metrics and indexing information
- Newsletter subscription functionality
- Contact form for inquiries
- Mobile responsive design
- Aretion-inspired color scheme (amber/orange accent with dark sophisticated palette)

## What's Been Implemented (December 2025)

### Frontend (React + Tailwind CSS + shadcn/ui)
- [x] Header with sticky navigation and mobile menu
- [x] Hero section with compelling tagline and CTAs
- [x] OJS Portal access section with prominent links
- [x] About the Journal section with 4 feature cards (Medicine, Law & Ethics, Public Health, Global Impact)
- [x] Current Issue section with Bento grid layout showcasing 7 articles
- [x] Submission Information section with journal metrics
- [x] Editorial Board section (Editor-in-Chief, Board of Trustees, Section Editors)
- [x] Newsletter subscription form with backend integration
- [x] Contact form with backend integration
- [x] Footer with quick links, policies, and company information
- [x] Back to top button
- [x] Smooth scroll navigation
- [x] Framer Motion animations
- [x] Fully responsive design

### Backend (FastAPI + MongoDB)
- [x] Newsletter subscription endpoint (POST /api/newsletter/subscribe)
- [x] Newsletter unsubscribe endpoint (DELETE /api/newsletter/unsubscribe/{email})
- [x] Contact form endpoint (POST /api/contact)
- [x] Admin endpoints for viewing subscriptions and messages
- [x] Health check endpoint
- [x] Duplicate email handling for newsletter

### Design System
- Primary: Dark Navy (#0f172a)
- Accent: Amber (#d97706)
- Fonts: Playfair Display (headings) + Inter (body)
- Sharp corners (rounded-none) for academic aesthetic
- Category badges for article types

### Data Synced from JMLPH.net
- Current Issue: Vol. 6 No. 1 (2026) - Jan-Mar
- 7 featured articles with categories, authors, and page numbers
- Editorial Board: Editor-in-Chief, 3 Trustees, Deputy Editor, 6 Section Editors
- Journal metrics: ISSN, frequency, acceptance rate, review type

## Prioritized Backlog

### P0 (Critical) - COMPLETED
- All core landing page sections
- OJS portal integration
- Newsletter and contact forms

### P1 (High Priority) - Future
- Admin dashboard for newsletter/contact management
- SEO optimization (meta tags, structured data)
- Analytics integration

### P2 (Medium Priority) - Future
- Multi-language support
- Dark mode toggle
- Article search functionality
- RSS feed integration

### P3 (Low Priority) - Future
- Author submission tracking widget
- Social media feed integration
- Citation export tools

## Next Tasks
1. Add meta tags and Open Graph data for SEO
2. Implement admin dashboard for managing subscriptions
3. Add structured data markup for Google Scholar
4. Consider adding article abstract previews
5. Add RSS/Atom feed widget

## Technical Stack
- Frontend: React 19, Tailwind CSS, shadcn/ui, Framer Motion
- Backend: FastAPI, Motor (async MongoDB driver)
- Database: MongoDB
- Deployment: Kubernetes (Emergent Platform)
