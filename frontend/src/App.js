import { useState, useEffect, useRef } from "react";
import "@/App.css";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { 
  Menu, 
  X, 
  ExternalLink, 
  FileText, 
  Send, 
  BookOpen, 
  Scale, 
  Heart, 
  ChevronUp,
  CheckCircle,
  Globe,
  Users,
  Award,
  Calendar,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  Clock,
  BarChart3,
  TrendingUp,
  XCircle,
  FileCheck,
  Database
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// OJS Portal URL
const OJS_URL = "https://www.jmlph.net/index.php/jmlph";
const SUBMIT_URL = "https://www.jmlph.net/index.php/jmlph/login";

// Logo URL
const LOGO_URL = "https://customer-assets.emergentagent.com/job_jmlph-landing/artifacts/hw85cjoi_A_Logo-09.png";

// Library Images
const LIBRARY_IMAGE_1 = "https://customer-assets.emergentagent.com/job_jmlph-landing/artifacts/emwzjfeh_Beautifully%20captured%20by%20%40ruiaugusto%20-%20NATIONAL%20LIBRARY%20OF%20FINLAND%20-%20Tucked%20in%20the%20heart%20of%20Helsi.jpg";
const LIBRARY_IMAGE_2 = "https://customer-assets.emergentagent.com/job_jmlph-landing/artifacts/1hwguk53_La%20bibliothe%CC%80que%20de%20l%E2%80%99Assemble%CC%81e%20nationale%20%21%20%F0%9F%93%9ACre%CC%81e%CC%81e%20par%20la%20Loi%20du%2014%20Vento%CC%82se%20an%20IV%20%284%20mars%201796%29%2C.jpg";

// Publisher info
const publisherInfo = {
  name: "ARETION Publishing Group",
  statement: "Published by the ARETION Publishing Group.",
  acquisition: "The journal was acquired by Aretion Publishing Group at the end of 2025, with a full transition taking place at the beginning of 2026. The journal will maintain its strong academic standards and rigorous peer review process, ensuring impartiality and independence. It will continue to serve the academic community, particularly for policymakers in the fields of medicine, public health, and medical law and legislation."
};

// Journal Data
const journalInfo = {
  name: "Journal of Medicine, Law & Public Health",
  shortName: "JMLPH",
  issn_print: "2788-9815",
  issn_online: "2788-791X",
  frequency: "Quarterly",
  reviewType: "Double-blind Peer-review",
  journalType: "Open Access",
  email: "Editorial.Board@JMLPH.net",
  registrationNo: "2198504",
  description: "The Journal of Medicine, Law & Public Health (JMLPH) is an interdisciplinary publication that explores the intersection of medical practice, legal considerations, and public health policy. It aims to serve as a platform for professionals and academics from various fields to discuss and disseminate research findings, legal analysis, and policy discussions that impact health outcomes and healthcare delivery."
};

// Contact Information
const contactInfo = {
  londonOffice: {
    name: "London Office",
    address: "71-75, Shelton Street, Covent Garden, London, WC2H 9JQ",
    phone: "+44 20 3985 0907"
  }
};

// Indexing Databases with logos
const indexingDatabases = [
  { name: "DOAJ", url: "https://doaj.org/toc/2788-791X", logo: "https://doaj.org/static/doaj/images/logo-small.jpg" },
  { name: "MIAR", url: "https://miar.ub.edu/issn/2788-791X", logo: "https://miar.ub.edu/MIAR/images/logo-miar.svg" },
  { name: "Google Scholar", url: "https://scholar.google.com/citations?hl=en&user=cLVVO24AAAAJ", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Google_Scholar_logo.svg/512px-Google_Scholar_logo.svg.png" },
  { name: "Crossref", url: "https://search.crossref.org/?q=+2788-791X", logo: "https://www.crossref.org/images/logo_small.svg" },
  { name: "OpenAlex", url: "https://openalex.org/sources/S4210209193", logo: "https://openalex.org/img/openalex-logo-icon.png" },
  { name: "WorldCat", url: "https://search.worldcat.org/title/1427524091", logo: "https://www.worldcat.org/static/images/wc-logo.svg" },
  { name: "BASE", url: "https://www.base-search.net/Search/Results?lookfor=The+Journal+of+Medicine%2C+Law+%26+Public+Health", logo: "https://www.base-search.net/interface/images/base_logo.svg" },
  { name: "Sherpa Romeo", url: "https://v2.sherpa.ac.uk/id/publication/42301", logo: "https://v2.sherpa.ac.uk/static/images/logos/sherpa-logo.png" },
  { name: "EuroPub", url: "https://europub.co.uk/journals/the-journal-of-medicine-law-public-health-jmlph-J-30910", logo: "https://europub.co.uk/images/europub-logo.png" },
  { name: "Scilit", url: "https://www.scilit.net/publishers/17465", logo: "https://www.scilit.net/images/scilit-logo.svg" },
  { name: "Semantic Scholar", url: "https://www.semanticscholar.org/search?q=The%20Journal%20of%20Medicine%2C%20Law%20Public%20Health", logo: "https://www.semanticscholar.org/img/semantic_scholar_logo.svg" },
  { name: "Internet Archive", url: "https://archive.org/details/@editorial_board_jmlph_", logo: "https://archive.org/images/glogo.jpg" }
];

// Journal Metrics
const journalMetrics = [
  { value: 231, label: "Total Submissions", suffix: "", icon: FileText },
  { value: 35, label: "Desk Rejections", suffix: "", icon: XCircle },
  { value: 43, label: "Declined After Review", suffix: "", icon: FileCheck },
  { value: 19, label: "Days to First Decision", suffix: "", icon: Clock },
  { value: 109, label: "Days to Accept", suffix: "", icon: TrendingUp },
  { value: 46, label: "Acceptance Rate", suffix: "%", icon: BarChart3 }
];

// Current Issue Articles (Vol. 6 No. 2 - 2026)
const currentIssue = {
  volume: "Vol. 6 No. 2 (2026)",
  subtitle: "Apr-Jun",
  published: "2026-03-17",
  articles: [
    {
      id: 1,
      category: "Reviews",
      title: "Male Breast Adenoid Cystic Carcinoma \u2013 A Narrative Review of a Rare Disorder",
      authors: "Sajad Ahmad Salati",
      pages: "876-886",
      url: "https://www.jmlph.net/index.php/jmlph/article/view/274",
      pdfUrl: "https://www.jmlph.net/index.php/jmlph/article/view/274/285"
    },
    {
      id: 2,
      category: "Law and Ethics",
      title: "Quest for Legislative Intervention in Stem Cell Research and Therapy in Nigeria: Lessons from United Kingdom and South Africa",
      authors: "Folakemi Ajagunna, Omolade Olomola",
      pages: "887-905",
      url: "https://www.jmlph.net/index.php/jmlph/article/view/251",
      pdfUrl: "https://www.jmlph.net/index.php/jmlph/article/view/251/286"
    },
    {
      id: 3,
      category: "Commentary",
      title: "Digital Health Strategies for GDM Postpartum Care and Type 2 Diabetes Prevention Among Saudi Women \u2013 A New Proposed Digital Health Initiative",
      authors: "Nawaf Alnuwaysir, Kady Alsarhan",
      pages: "906-912",
      url: "https://www.jmlph.net/index.php/jmlph/article/view/249",
      pdfUrl: "https://www.jmlph.net/index.php/jmlph/article/view/249/287"
    },
    {
      id: 4,
      category: "Original Articles",
      title: "Awareness of the Effect of Environmental Factors on Skin Among Students at Jouf University, Saudi Arabia",
      authors: "Ziad Mansour Alshaalan, Amany Ghazy, Sara Abdulaziz Alenizi, Maha Mohammed Alsahli, Rawan Zaidan Alrasheedi, Lojain Abdulsalam Alkhaldi, Misk Talal Alderaan, Renad Muhawish Alanazi, Salma Ahmed Fathy Shatara, Youssef Ahmed Shatara",
      pages: "913-919",
      url: "https://www.jmlph.net/index.php/jmlph/article/view/281",
      pdfUrl: "https://www.jmlph.net/index.php/jmlph/article/view/281/293"
    },
    {
      id: 5,
      category: "Original Articles",
      title: "Assessment of Water Quality in Public Hospitals in Hail City, Saudi Arabia 2021-2024",
      authors: "Eman Suliman Aljeloud, Abdullah Salem Al-Rasheed",
      pages: "920-937",
      url: "https://www.jmlph.net/index.php/jmlph/article/view/253",
      pdfUrl: "https://www.jmlph.net/index.php/jmlph/article/view/253/292"
    },
    {
      id: 6,
      category: "Original Articles",
      title: "The Newfoundland and Labrador Geriatric Health Index (NLGHI): Design, Implementation, and Clinical Workflow-Oriented Features for Community Geriatrics",
      authors: "Mirza Niaz Zaman Elin",
      pages: "938-945",
      url: "https://www.jmlph.net/index.php/jmlph/article/view/266",
      pdfUrl: "https://www.jmlph.net/index.php/jmlph/article/view/266/289"
    },
    {
      id: 7,
      category: "Case Series",
      title: "Button Battery Code: A Case Series of Button Battery Ingestions in Children at a Tertiary Referral Center and Proposed Management Protocol",
      authors: "Dhafer Ghurman Alshehri, Abdulrahman Mohammed Alwahbi, Sharafaldeen Bin Nafisah",
      pages: "946-951",
      url: "https://www.jmlph.net/index.php/jmlph/article/view/285",
      pdfUrl: "https://www.jmlph.net/index.php/jmlph/article/view/285/290"
    },
    {
      id: 8,
      category: "Original Articles",
      title: "Exploring Nurses Perception of iAudit: A Qualitative Study",
      authors: "Cyrian Lumuma, Diosa Cueto, Zainab Jafary, Cellanie Janson, Eddylyn O'santos, Diana Lalithabai",
      pages: "952-963",
      url: "https://www.jmlph.net/index.php/jmlph/article/view/268",
      pdfUrl: "https://www.jmlph.net/index.php/jmlph/article/view/268/288"
    }
  ]
};

// Indexing information
const indexingInfo = [
  { name: "Google Scholar", status: "Indexed" },
  { name: "Directory of Open Access Journals (DOAJ)", status: "Applied" },
  { name: "PubMed Central", status: "In Progress" },
  { name: "Scopus", status: "Applied" }
];

// Policy Documents Content
const policyDocuments = {
  privacyNotice: {
    title: "Privacy Notice",
    lastUpdated: "9 Feb 2026",
    content: `We, ARETION & Company (the brand used on aretion.co.uk), understand that your privacy is important to you. We are committed to respecting your privacy and protecting your personal data. This Privacy Notice explains how we handle and protect personal data when we collect it through our website and through our externally facing activities, such as service enquiries, consultations, and communications.

1. Data Controller

When ARETION & Company collects and processes personal data in accordance with this Privacy Notice, we do so as a data controller (or joint controller where applicable). This means we determine how and why your personal data is collected, used, protected, disclosed, and disposed of.

Company details:
• Legal name: ARETION & Company
• Registered office: 71-75 SHELTON STREET COVENT GARDEN, LONDON, WC2H 9JQ
• Contact email: post@aretion.co.uk
• Data Protection Officer (if appointed): dpo@aretion.co.uk

2. Who This Notice Applies To

This Privacy Notice applies to individuals who interact with us, including:
• Website visitors
• People who contact us with general enquiries, service enquiries, or partnership enquiries
• Representatives of clients, partners, suppliers, and collaborators
• Individuals who request or receive psychotherapy services (where offered)
• Job applicants (where we receive application materials directly)

3. How We Collect Personal Data

We collect personal data:
• Directly from you (for example, when you email us or submit an enquiry)
• Automatically when you use our website (for example, through log files and similar technical records)
• From your organisation (for example, where you are a representative of a client, partner, or supplier)
• From third parties where appropriate (for example, professional advisers, or referees in recruitment), and only where permitted by law

4. Categories of Personal Data

Depending on how you interact with us, we may collect the following categories of personal data:
• Name, email address, telephone number
• Organisation and role (where relevant)
• The content of your message and our correspondence with you
• Website technical and usage data (IP address, browser information)

5. Your Rights

Subject to conditions and exceptions under UK GDPR, you may have the right to:
• Request access to personal data we hold about you
• Request rectification
• Request erasure
• Request restriction of processing
• Object to processing
• Request data portability
• Withdraw consent where processing is based on consent

6. Contact and Complaints

Contact: post@aretion.co.uk (please include "Privacy" in the subject line).
Complaints: You have the right to lodge a complaint with the UK supervisory authority, the Information Commissioner's Office (ICO).`
  },
  termsOfUse: {
    title: "Terms of Use",
    lastUpdated: "7 Feb 2026",
    content: `These Terms of Use apply to your access to and use of the ARETION & Company website at aretion.org (the Site). By using the Site, you agree to these Terms. If you do not agree, you must not use the Site.

1. About These Terms

These Terms apply to your use of the Site and all content and functionality made available through the Site. Separate terms may apply to any services we provide to you. We may update these Terms from time to time without prior notice.

2. About Us and Contact Details

The Site is operated by ARETION & Company.
Contact: Post@aretion.co.uk
Company registered office: 71-75 SHELTON STREET COVENT GARDEN, LONDON, WC2H 9JQ

3. Copyright and Intellectual Property

All Site Content, including text, graphics, logos, icons, images, videos, and the selection and arrangement of the foregoing, is owned by or licensed to ARETION and is protected by applicable intellectual property laws. Except as expressly permitted by these Terms, you may not copy, reproduce, modify, reverse engineer, alter, publish, upload, post, transmit, distribute, or otherwise exploit any Site Content without our prior written permission.

4. Trademarks

The trademarks, service marks, designs, and logos displayed on the Site are the property of ARETION or its licensors. You must not use or reproduce any trademarks in any manner that is likely to cause confusion or imply endorsement by ARETION.

5. Limited Licence

We grant you a limited, non-exclusive, non-transferable, revocable licence to access and use the Site for your internal, non-commercial use.

6. Restrictions

You may not, without our express written permission:
• Access, search, collect, mine, or extract data from the Site by any means (automated or otherwise)
• "Mirror" the Site Content or any portion of it
• Use the Site or Site Content to develop any software program, model, algorithm, or AI tool
• Use the Site in violation of applicable laws

7. Disclaimers

The Site and Site Content are provided "as is" and "as available", without warranty of any kind. Site Content is provided for general information only and should not be relied upon as professional advice.

8. Governing Law

These Terms are governed by the laws of England and Wales, and the courts of England and Wales shall have exclusive jurisdiction.

9. Contact

Questions about these Terms should be sent to: compliance@aretion.co.uk`
  },
  codeOfConduct: {
    title: "Code of Conduct",
    lastUpdated: "10 Feb 2026",
    content: `ARETION & Company and its Subsidiaries

OPENING MESSAGE: OUR COMMITMENT TO INTEGRITY

ARETION & Company and its subsidiaries—ARETION Informatics Solutions, ARETION Publishing Group, and ARETION Healthcare Consulting—are committed to the highest standards of ethical conduct, professional integrity, and legal compliance.

This Code reflects our promise to:
• Act with honesty and transparency in all dealings
• Prioritise patient safety and wellbeing in all advice and recommendations
• Provide independent, objective, evidence-based guidance free from conflicts of interest
• Comply strictly with applicable laws and regulations
• Respect human rights, dignity, and equality
• Operate sustainably and responsibly
• Speak up about misconduct without fear of retaliation

This Code applies to everyone who works for or represents ARETION & Company and its subsidiaries—employees, officers, contractors, partners, and agents.

CORE VALUES

Integrity: We act with honesty, fairness, and transparency in all our dealings.

Patient-Centred Impact: Everything we do must ultimately benefit patients and improve health outcomes.

Independence and Objectivity: We provide impartial, evidence-based advice.

Respect: We value the dignity, rights, autonomy, and wellbeing of everyone we work with.

Accountability: We take responsibility for the quality and integrity of our work.

Sustainability: We consider the long-term environmental and social impact of our work.

Transparency: We communicate openly and honestly with clients, regulators, employees, and the public.

COMPLIANCE

ARETION & Company is committed to strict compliance with all applicable laws and regulations, including:
• Anti-corruption: Bribery Act 2010
• Data protection: UK GDPR and Data Protection Act 2018
• Human rights: Modern Slavery Act 2015
• Equality: Equality Act 2010
• Health and safety: Health and Safety at Work Act 1974

SPEAKING UP

We encourage and support employees, contractors, and partners to speak up about concerns without fear of retaliation. Contact compliance@aretion.co.uk or the external whistleblowing hotline: +44 20 3985 0907

For questions about this Code, contact: compliance@aretion.co.uk`
  },
  antiBriberyPolicy: {
    title: "Anti-Bribery and Anti-Corruption Policy",
    lastUpdated: "14 Feb 2026",
    content: `ARETION & Company and its Subsidiaries

1. Policy Statement

ARETION & Company and its subsidiaries have zero tolerance for bribery and corruption in any form. We are committed to conducting business ethically, transparently, and in full compliance with all applicable anti-bribery and anti-corruption laws, including:

• United Kingdom: Bribery Act 2010, Proceeds of Crime Act 2002
• Gulf Countries: Saudi Arabia Anti-Bribery Law, UAE Federal Decree-Law No. 20 of 2016, Qatar Law No. 11 of 2004, Kuwait Law No. 1 of 1993

This policy applies to all employees, officers, directors, contractors, consultants, agents, partners, and anyone acting on behalf of ARETION & Company.

2. What is Bribery and Corruption?

Bribery is the offer, promise, giving, requesting, or acceptance of any advantage (financial or non-financial) with the intention of:
• Inducing someone to perform an improper function or activity
• Rewarding them for having done so
• Influencing them to act improperly in their position of trust

An advantage can include: cash payments, gifts, hospitality, entertainment, travel, employment opportunities, donations, sponsorships, preferential treatment, or any other benefit.

3. Prohibited Conduct

ARETION & Company strictly prohibits:
• Offering or giving bribes
• Receiving or soliciting bribes
• Using third parties for bribery
• Facilitation payments (small payments to expedite routine administrative actions)

4. Gifts and Hospitality

Modest, reasonable gifts and hospitality may be appropriate provided they:
• Are of modest value (typically under £50 GBP)
• Are not cash or cash equivalents
• Are not connected to a pending business decision
• Are transparent and properly recorded
• Do not create a perception of impropriety

5. Third-Party Intermediaries

We conduct due diligence on all third parties and include anti-bribery clauses in all contracts. We will not engage third parties who refuse to commit to anti-bribery compliance.

6. Reporting Suspected Bribery

If you suspect, become aware of, or are offered a bribe, report it immediately to:
• Your manager
• Compliance and Ethics team: compliance@aretion.co.uk
• External Whistleblowing Hotline: +44 20 3985 0907

ARETION prohibits retaliation against anyone who reports concerns in good faith.

7. Consequences of Breaches

Breaches may result in:
• Disciplinary action, up to and including dismissal
• Referral to law enforcement authorities
• Criminal prosecution (imprisonment, fines)
• Civil liability and damages

This policy reflects ARETION & Company's commitment to conducting business with integrity, transparency, and in full compliance with UK and Gulf countries' laws.`
  }
};

// Enhanced Count Up Animation Hook with faster animation
const useCountUp = (end, duration = 2500, startOnView = true) => {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (startOnView && !isInView) return;
    if (hasAnimated.current) return;
    
    hasAnimated.current = true;
    setIsAnimating(true);
    let startTime;
    
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function - starts slow, speeds up in middle, slows at end
      const easeInOutQuart = progress < 0.5
        ? 8 * progress * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 4) / 2;
      
      setCount(Math.floor(easeInOutQuart * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
        setIsAnimating(false);
      }
    };
    
    requestAnimationFrame(animate);
  }, [end, duration, isInView, startOnView]);

  return { count, ref, isAnimating };
};

// Metric Card Component with enhanced Count Up
const MetricCard = ({ value, label, suffix, icon: Icon, delay = 0 }) => {
  const { count, ref, isAnimating } = useCountUp(value, 2500);
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay }}
      className="metric-card p-8 text-center group"
    >
      <div className="w-14 h-14 bg-[#1e3a5f] flex items-center justify-center mx-auto mb-5">
        <Icon className="w-7 h-7 text-[#c9a77d]" />
      </div>
      <div className={`stat-number text-5xl md:text-6xl mb-3 ${isAnimating ? 'counting' : ''}`} style={{ color: '#1a2f4a' }}>
        {count}{suffix}
      </div>
      <p className="stat-label">{label}</p>
    </motion.div>
  );
};

// Navigation component
const Header = ({ scrolled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Metrics", href: "#metrics" },
    { name: "Current Issue", href: "#current-issue" },
    { name: "Submit", href: "#submission" }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#faf8f5]/95 backdrop-blur-md shadow-sm border-b border-[#e8dcc8]' : 'bg-[#faf8f5]'
      }`}
      data-testid="header"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-4" data-testid="logo">
            <img src={LOGO_URL} alt="Aretion Publishing Group Logo" className="h-14 w-auto" />
            <div className="hidden sm:block">
              <span className="logo-text text-lg block leading-tight" style={{ color: '#1a2f4a' }}>ARETION Publishing Group</span>
              <span className="text-xs subheader-text" style={{ color: '#a0522d', letterSpacing: '0.08em' }}>Medicine • Law • Public Health</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8" data-testid="desktop-nav">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="nav-link text-sm body-text font-medium transition-colors"
                style={{ color: '#1e3a5f' }}
                data-testid={`nav-${item.name.toLowerCase().replace(' ', '-')}`}
              >
                {item.name}
              </a>
            ))}
            <a
              href={OJS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium transition-all btn-lift"
              style={{ backgroundColor: '#1e3a5f', color: '#faf8f5' }}
              data-testid="nav-ojs-portal"
            >
              Access Journal
              <ExternalLink className="w-4 h-4" />
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2"
            style={{ color: '#1a2f4a' }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="mobile-menu-button"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden pb-6 border-t"
              style={{ backgroundColor: '#faf8f5', borderColor: '#e8dcc8' }}
              data-testid="mobile-nav"
            >
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block py-3 transition-colors body-text"
                  style={{ color: '#1e3a5f' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <a
                href={OJS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 mt-4 px-6 py-3 text-sm font-medium w-full justify-center"
                style={{ backgroundColor: '#1e3a5f', color: '#faf8f5' }}
                data-testid="mobile-nav-ojs"
              >
                Access Journal Portal
                <ExternalLink className="w-4 h-4" />
              </a>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

// Hero Section
const HeroSection = () => (
  <section 
    id="home" 
    className="relative min-h-screen flex items-center justify-center pt-20"
    style={{ backgroundColor: '#faf8f5' }}
    data-testid="hero-section"
  >
    {/* Subtle pattern */}
    <div className="absolute inset-0 opacity-20" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a77d' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
    }} />
    
    <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium mb-6 subheader-text" style={{ backgroundColor: 'rgba(160, 82, 45, 0.1)', border: '1px solid rgba(160, 82, 45, 0.2)', color: '#8b4513' }}>
            <Award className="w-4 h-4" />
            Peer-Reviewed • Open Access
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6" style={{ color: '#1a2f4a', fontFamily: "'Cormorant Garamond', serif" }}>
            The Journal of<br />
            <span style={{ color: '#a0522d' }}>Medicine, Law</span><br />
            & Public Health
          </h1>
          
          <p className="text-lg max-w-xl mb-4 leading-relaxed body-text" style={{ color: '#2d4a6f' }}>
            An interdisciplinary peer-reviewed journal exploring the intersection of 
            healthcare, legal frameworks, and public health policy. {publisherInfo.statement}
          </p>
          
          <p className="text-sm max-w-xl mb-8 leading-relaxed body-text" style={{ color: '#6b8ab0' }}>
            {publisherInfo.acquisition}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={`${OJS_URL}/about/submissions`}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="hero-submit-btn"
            >
              <Button className="w-full sm:w-auto px-8 py-6 text-sm font-medium tracking-wide uppercase btn-lift" style={{ backgroundColor: '#1e3a5f', color: '#faf8f5' }}>
                <Send className="w-4 h-4 mr-2" />
                Submit Manuscript
              </Button>
            </a>
            <a
              href="#current-issue"
              data-testid="hero-explore-btn"
            >
              <Button variant="outline" className="w-full sm:w-auto px-8 py-6 text-sm font-medium tracking-wide uppercase" style={{ borderColor: '#c9a77d', color: '#1e3a5f' }}>
                <BookOpen className="w-4 h-4 mr-2" />
                Current Issue
              </Button>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden lg:block"
        >
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-72 h-72 -z-10" style={{ backgroundColor: '#e8dcc8' }} />
            <img 
              src={LIBRARY_IMAGE_1} 
              alt="National Library of Finland"
              className="w-full h-96 object-cover"
            />
            <div className="absolute -bottom-6 -right-6 p-6" style={{ backgroundColor: '#1e3a5f' }}>
              <p className="text-3xl font-bold" style={{ color: '#c9a77d', fontFamily: "'Cormorant Garamond', serif" }}>Vol. 6 No. 2</p>
              <p className="text-sm" style={{ color: '#d4b896' }}>Current Issue</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

// Metrics Section with enhanced Count Up Animation
const MetricsSection = () => (
  <section id="metrics" className="py-20 md:py-28" style={{ backgroundColor: '#f5f0e8' }} data-testid="metrics-section">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="text-center mb-16">
        <span className="subheader-text text-sm font-semibold tracking-widest" style={{ color: '#a0522d' }}>Performance</span>
        <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-2" style={{ color: '#1a2f4a', fontFamily: "'Cormorant Garamond', serif" }}>
          Journal Metrics
        </h2>
        <p className="text-sm body-text mb-4" style={{ color: '#a0522d' }}>(as of 2026)</p>
        <p className="text-lg max-w-2xl mx-auto body-text" style={{ color: '#2d4a6f' }}>
          Transparency in our editorial process and publication statistics
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {journalMetrics.map((metric, idx) => (
          <MetricCard
            key={metric.label}
            value={metric.value}
            label={metric.label}
            suffix={metric.suffix}
            icon={metric.icon}
            delay={idx * 0.1}
          />
        ))}
      </div>
    </div>
  </section>
);

// About Section
const AboutSection = () => (
  <section id="about" className="py-20 md:py-28" style={{ backgroundColor: '#faf8f5' }} data-testid="about-section">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="subheader-text text-sm font-semibold tracking-widest" style={{ color: '#a0522d' }}>About the Journal</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6" style={{ color: '#1a2f4a', fontFamily: "'Cormorant Garamond', serif" }}>
            Advancing Interdisciplinary Research
          </h2>
          <p className="text-lg leading-relaxed mb-6 body-text" style={{ color: '#2d4a6f' }}>
            {journalInfo.description}
          </p>
          <p className="text-lg leading-relaxed mb-8 body-text" style={{ color: '#2d4a6f' }}>
            The journal publishes a range of content, including original research, review articles, 
            case studies, and commentaries, all of which undergo a rigorous double-blind peer-review 
            process to ensure high-quality contributions.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 px-4 py-2" style={{ backgroundColor: '#f5f0e8' }}>
              <span className="text-sm font-medium" style={{ color: '#1e3a5f' }}>ISSN (P): {journalInfo.issn_print}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2" style={{ backgroundColor: '#f5f0e8' }}>
              <span className="text-sm font-medium" style={{ color: '#1e3a5f' }}>ISSN (E): {journalInfo.issn_online}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2" style={{ backgroundColor: 'rgba(160, 82, 45, 0.1)', border: '1px solid rgba(160, 82, 45, 0.2)' }}>
              <span className="text-sm font-medium" style={{ color: '#8b4513' }}>{journalInfo.journalType}</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8"
            style={{ backgroundColor: '#1e3a5f' }}
          >
            <Heart className="w-10 h-10 mb-4" style={{ color: '#c9a77d' }} />
            <h3 className="text-xl font-semibold mb-2" style={{ color: '#faf8f5', fontFamily: "'Cormorant Garamond', serif" }}>Medicine</h3>
            <p className="text-sm body-text" style={{ color: '#d4b896' }}>Clinical research, healthcare delivery, and medical practice innovations.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-8"
            style={{ backgroundColor: '#f5f0e8' }}
          >
            <Scale className="w-10 h-10 mb-4" style={{ color: '#a0522d' }} />
            <h3 className="text-xl font-semibold mb-2" style={{ color: '#1a2f4a', fontFamily: "'Cormorant Garamond', serif" }}>Law & Ethics</h3>
            <p className="text-sm body-text" style={{ color: '#2d4a6f' }}>Legal analysis, medical ethics, and regulatory frameworks.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-8"
            style={{ backgroundColor: '#f5f0e8' }}
          >
            <Users className="w-10 h-10 mb-4" style={{ color: '#a0522d' }} />
            <h3 className="text-xl font-semibold mb-2" style={{ color: '#1a2f4a', fontFamily: "'Cormorant Garamond', serif" }}>Public Health</h3>
            <p className="text-sm body-text" style={{ color: '#2d4a6f' }}>Population health, epidemiology, and health policy.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="p-8"
            style={{ backgroundColor: '#1e3a5f' }}
          >
            <Globe className="w-10 h-10 mb-4" style={{ color: '#c9a77d' }} />
            <h3 className="text-xl font-semibold mb-2" style={{ color: '#faf8f5', fontFamily: "'Cormorant Garamond', serif" }}>Global Impact</h3>
            <p className="text-sm body-text" style={{ color: '#d4b896' }}>International perspectives on healthcare challenges.</p>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

// OJS Portal Access Section
const OJSPortalSection = () => (
  <section className="py-16" style={{ backgroundColor: '#1e3a5f' }} data-testid="ojs-portal-section">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <Send className="w-6 h-6" style={{ color: '#c9a77d' }} />
            <span className="subheader-text text-sm font-semibold tracking-widest" style={{ color: '#c9a77d' }}>Submit</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#faf8f5', fontFamily: "'Cormorant Garamond', serif" }}>
            Submit Your Article
          </h2>
          <p className="text-lg leading-relaxed body-text" style={{ color: '#d4b896' }}>
            Ready to share your research? Submit your manuscript through our Open Journal Systems portal. 
            Access submission guidelines, track your peer review status, and browse our complete archive.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href={SUBMIT_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="submit-article-link"
          >
            <Button className="px-8 py-6 text-sm font-medium tracking-wide uppercase btn-lift" style={{ backgroundColor: '#a0522d', color: '#faf8f5' }}>
              Submit Your Article
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </a>
          <a
            href={`${OJS_URL}/issue/archive`}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="ojs-archive-link"
          >
            <Button variant="outline" className="px-8 py-6 text-sm font-medium tracking-wide uppercase" style={{ borderColor: '#c9a77d', color: '#c9a77d' }}>
              Browse Archives
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  </section>
);

// Current Issue Section
const CurrentIssueSection = () => (
  <section id="current-issue" className="py-20 md:py-28" style={{ backgroundColor: '#faf8f5' }} data-testid="current-issue-section">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="text-center mb-16">
        <span className="subheader-text text-sm font-semibold tracking-widest" style={{ color: '#a0522d' }}>Latest Research</span>
        <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4" style={{ color: '#1a2f4a', fontFamily: "'Cormorant Garamond', serif" }}>
          Current Issue
        </h2>
        <div className="flex items-center justify-center gap-4 body-text" style={{ color: '#2d4a6f' }}>
          <span className="font-semibold">{currentIssue.volume}</span>
          <span className="w-1 h-1 rounded-full" style={{ backgroundColor: '#c9a77d' }} />
          <span>{currentIssue.subtitle}</span>
          <span className="w-1 h-1 rounded-full" style={{ backgroundColor: '#c9a77d' }} />
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            Published: {currentIssue.published}
          </span>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentIssue.articles.map((article, idx) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <a 
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="article-card group block h-full p-6"
              style={{ backgroundColor: '#f5f0e8', border: '1px solid #e8dcc8' }}
              data-testid={`article-${article.id}`}
            >
              <span className="category-badge">{article.category}</span>
              <h3 className="text-lg font-semibold mt-4 mb-3 leading-snug transition-colors line-clamp-3" style={{ color: '#1a2f4a', fontFamily: "'Cormorant Garamond', serif" }}>
                {article.title}
              </h3>
              <p className="text-sm mb-4 line-clamp-1 body-text" style={{ color: '#2d4a6f' }}>{article.authors}</p>
              <div className="flex items-center justify-between mt-auto pt-4" style={{ borderTop: '1px solid #e8dcc8' }}>
                <span className="text-xs" style={{ color: '#a0522d' }}>Pages {article.pages}</span>
                <span className="flex items-center gap-1 text-sm font-medium transition-colors" style={{ color: '#1e3a5f' }}>
                  <FileText className="w-4 h-4" />
                  Read
                </span>
              </div>
            </a>
          </motion.div>
        ))}
      </div>

      {/* View All Link */}
      <div className="text-center mt-12">
        <a
          href={`${OJS_URL}/issue/archive`}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="view-all-issues"
        >
          <Button variant="outline" className="px-8 py-6 text-sm font-medium tracking-wide uppercase" style={{ borderColor: '#c9a77d', color: '#1e3a5f' }}>
            View All Issues
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </a>
      </div>
    </div>
  </section>
);

// Submission Section
const SubmissionSection = () => (
  <section id="submission" className="py-20 md:py-28" style={{ backgroundColor: '#f5f0e8' }} data-testid="submission-section">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <span className="subheader-text text-sm font-semibold tracking-widest" style={{ color: '#a0522d' }}>For Authors</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6" style={{ color: '#1a2f4a', fontFamily: "'Cormorant Garamond', serif" }}>
            Submit Your Research
          </h2>
          <p className="text-lg leading-relaxed mb-8 body-text" style={{ color: '#2d4a6f' }}>
            JMLPH welcomes submissions from healthcare providers, legal experts, public health 
            practitioners, researchers, and policymakers worldwide. Our double-blind peer-review 
            process ensures the highest standards of academic integrity.
          </p>

          <div className="space-y-4">
            {[
              { title: "Original Research", desc: "Novel findings in medicine, law, and public health" },
              { title: "Review Articles", desc: "Comprehensive literature reviews and analyses" },
              { title: "Case Reports", desc: "Unique clinical cases with educational value" },
              { title: "Commentaries", desc: "Expert opinions on current healthcare issues" }
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4" style={{ backgroundColor: '#faf8f5', border: '1px solid #e8dcc8' }}>
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#a0522d' }} />
                <div>
                  <h3 className="font-semibold" style={{ color: '#1a2f4a' }}>{item.title}</h3>
                  <p className="text-sm body-text" style={{ color: '#2d4a6f' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <a
              href={`${OJS_URL}/about/submissions`}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="submission-guidelines-link"
            >
              <Button className="px-8 py-6 text-sm font-medium tracking-wide uppercase btn-lift" style={{ backgroundColor: '#1e3a5f', color: '#faf8f5' }}>
                View Submission Guidelines
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>
        </div>

        {/* Journal Info */}
        <div className="p-8 md:p-10" style={{ backgroundColor: '#faf8f5', border: '1px solid #e8dcc8' }}>
          <h3 className="text-2xl font-bold mb-8" style={{ color: '#1a2f4a', fontFamily: "'Cormorant Garamond', serif" }}>Publication Information</h3>
          
          <div className="space-y-5">
            {[
              { label: "ISSN (Print)", value: journalInfo.issn_print },
              { label: "ISSN (Online)", value: journalInfo.issn_online },
              { label: "Publication Frequency", value: journalInfo.frequency },
              { label: "Review Type", value: journalInfo.reviewType },
              { label: "Access Type", value: journalInfo.journalType, highlight: true }
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between items-center pb-4" style={{ borderBottom: idx < 4 ? '1px solid #e8dcc8' : 'none' }}>
                <span className="body-text" style={{ color: '#2d4a6f' }}>{item.label}</span>
                <span className="font-semibold" style={{ color: item.highlight ? '#a0522d' : '#1a2f4a' }}>{item.value}</span>
              </div>
            ))}
          </div>

          {/* Indexing Databases */}
          <div className="mt-10 pt-8" style={{ borderTop: '1px solid #e8dcc8' }}>
            <h4 className="text-lg font-semibold mb-4" style={{ color: '#1a2f4a' }}>Indexing Databases</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {indexingDatabases.map((db, idx) => (
                <a 
                  key={idx} 
                  href={db.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm p-3 transition-all hover:shadow-md cursor-pointer group"
                  style={{ backgroundColor: '#faf8f5', border: '1px solid #e8dcc8' }}
                >
                  <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-white rounded overflow-hidden">
                    <img 
                      src={db.logo} 
                      alt={db.name}
                      className="w-6 h-6 object-contain"
                      onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<span style="font-size:10px;color:#a0522d;font-weight:600">' + db.name.charAt(0) + '</span>'; }}
                    />
                  </div>
                  <span className="body-text truncate group-hover:text-[#a0522d] transition-colors" style={{ color: '#2d4a6f' }}>{db.name}</span>
                </a>
              ))}
            </div>
            <a 
              href={`${OJS_URL}/Indexing`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-4 text-sm font-medium transition-colors hover:underline"
              style={{ color: '#a0522d' }}
            >
              View all indexing databases
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Newsletter Section
const NewsletterSection = () => (
  <section className="py-20" style={{ backgroundColor: '#1e3a5f' }} data-testid="newsletter-section">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="max-w-2xl mx-auto text-center">
        <Mail className="w-12 h-12 mx-auto mb-6" style={{ color: '#c9a77d' }} />
        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#faf8f5', fontFamily: "'Cormorant Garamond', serif" }}>
          Stay Updated
        </h2>
        <p className="text-lg mb-8 body-text" style={{ color: '#d4b896' }}>
          Get notifications about new issues, call for papers, 
          and important journal announcements directly from our editorial team.
        </p>

        <a
          href={`mailto:${journalInfo.email}?subject=Newsletter Subscription&body=I would like to subscribe to the JMLPH newsletter.`}
          data-testid="newsletter-email-link"
        >
          <Button className="px-10 py-6 text-sm font-medium tracking-wide uppercase btn-lift" style={{ backgroundColor: '#a0522d', color: '#faf8f5' }}>
            <Mail className="w-4 h-4 mr-2" />
            Subscribe via Email
          </Button>
        </a>

        <p className="text-sm mt-6 body-text" style={{ color: '#6b8ab0' }}>
          Contact us at: <a href={`mailto:${journalInfo.email}`} className="underline hover:text-[#c9a77d] transition-colors">{journalInfo.email}</a>
        </p>
      </div>
    </div>
  </section>
);

// Contact Section - Links to email
const ContactSection = () => (
  <section className="py-20 md:py-28" style={{ backgroundColor: '#faf8f5' }} data-testid="contact-section">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <span className="subheader-text text-sm font-semibold tracking-widest" style={{ color: '#a0522d' }}>Get in Touch</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6" style={{ color: '#1a2f4a', fontFamily: "'Cormorant Garamond', serif" }}>
            Contact Us
          </h2>
          <p className="text-lg leading-relaxed mb-10 body-text" style={{ color: '#2d4a6f' }}>
            Have questions about submissions, peer review, or general inquiries? 
            We're here to help.
          </p>

          {/* London Office */}
          <div className="mb-8">
            <h3 className="font-semibold text-lg mb-4" style={{ color: '#1a2f4a' }}>{contactInfo.londonOffice.name}</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#a0522d' }} />
                <p className="body-text" style={{ color: '#2d4a6f' }}>{contactInfo.londonOffice.address}</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0" style={{ color: '#a0522d' }} />
                <a href={`tel:${contactInfo.londonOffice.phone}`} className="body-text transition-colors hover:underline" style={{ color: '#2d4a6f' }}>
                  {contactInfo.londonOffice.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 flex-shrink-0" style={{ color: '#a0522d' }} />
            <a href={`mailto:${journalInfo.email}`} className="font-medium hover:underline" style={{ color: '#a0522d' }}>
              {journalInfo.email}
            </a>
          </div>
        </div>

        {/* Contact Card - Links to Email */}
        <div className="p-8 md:p-10" style={{ backgroundColor: '#f5f0e8', border: '1px solid #e8dcc8' }}>
          <h3 className="text-xl font-semibold mb-6" style={{ color: '#1a2f4a', fontFamily: "'Cormorant Garamond', serif" }}>Send a Message</h3>
          
          <p className="body-text mb-8" style={{ color: '#2d4a6f' }}>
            Click the button below to send us an email directly. Our editorial team will respond to your inquiry as soon as possible.
          </p>

          {/* Library Image */}
          <div className="mb-8 relative overflow-hidden" style={{ height: '200px' }}>
            <img 
              src={LIBRARY_IMAGE_2} 
              alt="Library"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(30, 58, 95, 0.3), transparent)' }} />
          </div>

          <a
            href={`mailto:${journalInfo.email}?subject=Inquiry from JMLPH Website`}
            data-testid="contact-email-btn"
          >
            <Button 
              className="w-full py-6 text-sm font-medium tracking-wide uppercase btn-lift"
              style={{ backgroundColor: '#1e3a5f', color: '#faf8f5' }}
            >
              <Mail className="w-4 h-4 mr-2" />
              Send Email to Editorial Board
            </Button>
          </a>

          <p className="text-sm mt-4 text-center body-text" style={{ color: '#a0522d' }}>
            {journalInfo.email}
          </p>
        </div>
      </div>
    </div>
  </section>
);

// Policy Modal Component
const PolicyModal = ({ isOpen, onClose, policy }) => {
  if (!policy) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[85vh] p-0" style={{ backgroundColor: '#faf8f5' }}>
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl" style={{ color: '#1a2f4a', fontFamily: "'Cormorant Garamond', serif" }}>{policy.title}</DialogTitle>
          <DialogDescription className="text-sm body-text" style={{ color: '#a0522d' }}>Last updated: {policy.lastUpdated}</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh] px-6 pb-6">
          <div className="prose prose-slate prose-sm max-w-none">
            {policy.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="leading-relaxed mb-4 whitespace-pre-line body-text" style={{ color: '#2d4a6f' }}>
                {paragraph}
              </p>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

// Footer
const Footer = () => {
  const [activePolicy, setActivePolicy] = useState(null);
  
  return (
    <>
      <PolicyModal 
        isOpen={!!activePolicy} 
        onClose={() => setActivePolicy(null)} 
        policy={activePolicy ? policyDocuments[activePolicy] : null}
      />
      <footer className="py-16" style={{ backgroundColor: '#1a2f4a' }} data-testid="footer">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <img src={LOGO_URL} alt="Aretion Publishing Group Logo" className="h-12 w-auto" />
                <span className="logo-text text-lg" style={{ color: '#faf8f5' }}>ARETION Publishing Group</span>
              </div>
              <p className="leading-relaxed mb-6 max-w-md body-text" style={{ color: '#d4b896' }}>
                The Journal of Medicine, Law & Public Health is an interdisciplinary, 
                peer-reviewed publication exploring the intersection of medical practice, 
                legal considerations, and public health policy.
              </p>
              <p className="text-sm body-text" style={{ color: '#6b8ab0' }}>
                {publisherInfo.statement}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-6" style={{ color: '#faf8f5' }}>Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { name: 'OJS Portal', url: OJS_URL },
                  { name: 'Submit Your Article', url: SUBMIT_URL },
                  { name: 'Archives', url: `${OJS_URL}/issue/archive` },
                  { name: 'Editorial Team', url: `${OJS_URL}/about/editorialTeam` },
                  { name: 'For Authors', url: `${OJS_URL}/information/authors` },
                  { name: 'Indexing Databases', url: `${OJS_URL}/Indexing` }
                ].map((link, idx) => (
                  <li key={idx}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="footer-link text-sm body-text">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8" style={{ borderTop: '1px solid #2d4a6f' }}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
              <p className="text-sm body-text" style={{ color: '#c9a77d' }}>
                © 2026 ARETION & Company. All rights reserved.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                <button 
                  onClick={() => setActivePolicy('privacyNotice')}
                  className="text-sm transition-colors body-text hover:text-[#c9a77d]"
                  style={{ color: '#d4b896' }}
                  data-testid="footer-privacy-notice"
                >
                  Privacy Notice
                </button>
                <span style={{ color: '#2d4a6f' }} className="hidden md:inline">|</span>
                <button 
                  onClick={() => setActivePolicy('termsOfUse')}
                  className="text-sm transition-colors body-text hover:text-[#c9a77d]"
                  style={{ color: '#d4b896' }}
                  data-testid="footer-terms-of-use"
                >
                  Terms of Use
                </button>
                <span style={{ color: '#2d4a6f' }} className="hidden md:inline">|</span>
                <button 
                  onClick={() => setActivePolicy('codeOfConduct')}
                  className="text-sm transition-colors body-text hover:text-[#c9a77d]"
                  style={{ color: '#d4b896' }}
                  data-testid="footer-code-of-conduct"
                >
                  Code of Conduct
                </button>
                <span style={{ color: '#2d4a6f' }} className="hidden md:inline">|</span>
                <button 
                  onClick={() => setActivePolicy('antiBriberyPolicy')}
                  className="text-sm transition-colors body-text hover:text-[#c9a77d]"
                  style={{ color: '#d4b896' }}
                  data-testid="footer-anti-bribery"
                >
                  Anti-Bribery Policy
                </button>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6" style={{ borderTop: '1px solid rgba(45, 74, 111, 0.5)' }}>
              <span className="text-xs body-text" style={{ color: '#6b8ab0' }}>Registration No. {journalInfo.registrationNo}</span>
              <a 
                href="https://aretion.co.uk/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs transition-colors body-text hover:text-[#c9a77d]"
                style={{ color: '#6b8ab0' }}
              >
                An Aretion Publishing Group Journal
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

// Back to Top Button
const BackToTop = ({ visible }) => (
  <AnimatePresence>
    {visible && (
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 flex items-center justify-center shadow-lg transition-colors z-50"
        style={{ backgroundColor: '#1e3a5f', color: '#faf8f5' }}
        data-testid="back-to-top"
      >
        <ChevronUp className="w-6 h-6" />
      </motion.button>
    )}
  </AnimatePresence>
);

// Main App Component
function App() {
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      <Toaster position="top-right" richColors />
      <Header scrolled={scrolled} />
      <HeroSection />
      <MetricsSection />
      <AboutSection />
      <OJSPortalSection />
      <CurrentIssueSection />
      <SubmissionSection />
      <NewsletterSection />
      <ContactSection />
      <Footer />
      <BackToTop visible={showBackToTop} />
    </div>
  );
}

export default App;
