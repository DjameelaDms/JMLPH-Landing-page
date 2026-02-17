import { useState, useEffect } from "react";
import "@/App.css";
import { motion, AnimatePresence } from "framer-motion";
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
  Linkedin,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// OJS Portal URL
const OJS_URL = "https://www.jmlph.net/index.php/jmlph";

// Journal Data
const journalInfo = {
  name: "Journal of Medicine, Law & Public Health",
  shortName: "JMLPH",
  issn_print: "2788-9815",
  issn_online: "2788-791X",
  frequency: "Quarterly",
  reviewType: "Double-blind Peer-review",
  acceptanceRate: "55%",
  journalType: "Open Access",
  email: "editorial.board@jmlph.net",
  address: "5810 Ambler Dr, Unit 14 | RUH 1529405 | Mississauga | L4W4J5 | Canada",
  registrationNo: "2198504",
  description: "The Journal of Medicine, Law & Public Health (JMLPH) is an interdisciplinary publication that explores the intersection of medical practice, legal considerations, and public health policy. It aims to serve as a platform for professionals and academics from various fields to discuss and disseminate research findings, legal analysis, and policy discussions that impact health outcomes and healthcare delivery."
};

// Current Issue Articles (Vol. 6 No. 1 - 2026)
const currentIssue = {
  volume: "Vol. 6 No. 1 (2026)",
  subtitle: "Jan-Mar",
  published: "2025-12-16",
  articles: [
    {
      id: 1,
      category: "Original Articles",
      title: "Prevalence of Probable Generalised Anxiety Disorder Among Master of Public Health Students at the University of Ibadan, Nigeria",
      authors: "Ayobami Joseph Osho, Oyediran Emmanuel Oyewole",
      pages: "869-875",
      url: "https://www.jmlph.net/index.php/jmlph/article/view/240",
      pdfUrl: "https://www.jmlph.net/index.php/jmlph/article/view/240/284"
    },
    {
      id: 2,
      category: "Original Articles",
      title: "Safety and Effectiveness of Intravenous Ferric Carboxymaltose for Moderate Anaemia in Pregnancy",
      authors: "Fiza Amin, Angraz Singh, Peerzada Ajaz Ahmad Shah, Shakir Rasool Khan, Tavseef Ahmad Tali",
      pages: "862-868",
      url: "https://www.jmlph.net/index.php/jmlph/article/view/272",
      pdfUrl: "https://www.jmlph.net/index.php/jmlph/article/view/272/283"
    },
    {
      id: 3,
      category: "Original Articles",
      title: "Translation, Validity, and Reliability of the Arabic Version of the Patient-Experienced Continuity of Care Questionnaire (PECQ)",
      authors: "Dalal Alshathri, Abdulmunim Alsuhaimi, Refal Albaijan, Dlal Almazrou, Khalid Alkhurayji",
      pages: "831-841",
      url: "https://www.jmlph.net/index.php/jmlph/article/view/239",
      pdfUrl: "https://www.jmlph.net/index.php/jmlph/article/view/239/203"
    },
    {
      id: 4,
      category: "Case Report",
      title: "Methotrexate-Induced Hepatotoxicity in a Patient with a History of Alcohol Abuse: Case Report",
      authors: "Fatih Kaya, Mohammad Jamal Abunawas, Manar Al-Suleh, Ghayda Jarrar, Yare Sahin",
      pages: "857-861",
      url: "https://www.jmlph.net/index.php/jmlph/article/view/223",
      pdfUrl: "https://www.jmlph.net/index.php/jmlph/article/view/223/206"
    },
    {
      id: 5,
      category: "Law and Ethics",
      title: "Clinical Practice Guidelines as Part of Evidence-Based Medicine and Related Legal Implications: An Analysis",
      authors: "Ayodhya Prabhashini Rathnayake",
      pages: "842-848",
      url: "https://www.jmlph.net/index.php/jmlph/article/view/258",
      pdfUrl: "https://www.jmlph.net/index.php/jmlph/article/view/258/205"
    },
    {
      id: 6,
      category: "Law and Ethics",
      title: "Intellectual Property Rights and Public Health: A Critical Examination of the AfCFTA Framework",
      authors: "Chimdessa Tsega",
      pages: "849-856",
      url: "https://www.jmlph.net/index.php/jmlph/article/view/248",
      pdfUrl: "https://www.jmlph.net/index.php/jmlph/article/view/248/207"
    }
  ]
};

// Editorial Board
const editorialBoard = {
  trustees: [
    { name: "Dr. Dania AlJaroudi", role: "Executive Director of the Research Center", affiliation: "Obstetrics and Gynecology, Minimally Invasive Surgery, Reproductive Endocrine and Infertility. Second Healthcare Cluster, Saudi Arabia", linkedin: "https://sa.linkedin.com/in/dr-dania-al-jaroudi-b863742b" },
    { name: "Dr. Erich Gregory Hanel", role: "Board of Trustees", affiliation: "Family Medicine and Emergency Medicine, McMaster University, ON, Canada", linkedin: "https://ca.linkedin.com/in/erich-hanel-66b3a528" },
    { name: "Dr. Teresa Chan", role: "Board of Trustees", affiliation: "Emergency Medicine, Faculty of Health Sciences at McMaster University, ON, Canada", linkedin: "https://ca.linkedin.com/in/tchanmd" }
  ],
  editorInChief: { name: "Dr. Bandr Mzahim", role: "Editor-In-Chief", affiliation: "EMS/Disaster, Emergency Department & Disaster Department and Emergency Operation Center, King Fahd Medical City, Riyadh, Saudi Arabia", email: "Editor-in-chief@JMLPH.net", linkedin: "https://sa.linkedin.com/in/bandar-mzahim-b40b2526" },
  deputyEditor: { name: "Dr. Nawaf Masaad Almutairi", role: "Deputy Editor-In-Chief", affiliation: "Anesthesia and Pain Management Department, Security Forces Hospital, Riyadh, Saudi Arabia", email: "Deputy-Editor@JMLPH.net" },
  sectionEditors: [
    { name: "Dr. Abdulrahman Yasin Sabbagh", affiliation: "Simulation, Emergency Medicine, Events Planning and Sports Medicine, King Fahd Medical City, Riyadh, Saudi Arabia" },
    { name: "Dr. Adnan Ali S. AlMaghlouth", affiliation: "Research Services and Applied Clinical Administration, Periodontology, Oral Implant Rehabilitation, King Fahd Medical City, Riyadh, Saudi Arabia" },
    { name: "Dr. Arslan Ahmed", affiliation: "Epidemiologist at College of Physicians & Surgeons, Pakistan" },
    { name: "Dr. Rosario Barranco", affiliation: "Department of Legal and Forensic Medicine, University of Genoa, Italy" },
    { name: "Dr. Mohammed Badawy", affiliation: "Emergency Medicine and Disaster Medicine Consultant, Royal Commission Hospital - Jubail" },
    { name: "Dr. Saba Imdad", affiliation: "Biosciences Institute, APC Microbiome Ireland, College of Medicine & Health, University College Cork, Ireland" }
  ]
};

// Indexing information
const indexingInfo = [
  { name: "Google Scholar", status: "Indexed" },
  { name: "Directory of Open Access Journals (DOAJ)", status: "Applied" },
  { name: "PubMed Central", status: "In Progress" },
  { name: "Scopus", status: "Applied" }
];

// Navigation component
const Header = ({ scrolled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Current Issue", href: "#current-issue" },
    { name: "Editorial Board", href: "#editorial-board" },
    { name: "Submit", href: "#submission" }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
      data-testid="header"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3" data-testid="logo">
            <div className="w-10 h-10 bg-amber-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg font-serif">J</span>
            </div>
            <span className="logo-text text-xl text-white">JMLPH</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8" data-testid="desktop-nav">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="nav-link text-sm font-medium text-slate-300 hover:text-white transition-colors"
                data-testid={`nav-${item.name.toLowerCase().replace(' ', '-')}`}
              >
                {item.name}
              </a>
            ))}
            <a
              href={OJS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 text-sm font-semibold tracking-wide uppercase transition-all btn-lift"
              data-testid="nav-ojs-portal"
            >
              Access Journal
              <ExternalLink className="w-4 h-4" />
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-white p-2"
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
              className="lg:hidden bg-slate-900/95 backdrop-blur-md pb-6"
              data-testid="mobile-nav"
            >
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block py-3 text-slate-300 hover:text-white transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <a
                href={OJS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 mt-4 bg-amber-600 hover:bg-amber-700 text-white px-5 py-3 text-sm font-semibold tracking-wide uppercase w-full justify-center"
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
    className="relative min-h-screen flex items-center justify-center overflow-hidden"
    data-testid="hero-section"
  >
    {/* Background */}
    <div 
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1646700611766-070d793c67c5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwyfHxhYnN0cmFjdCUyMG1lZGljYWwlMjBzY2llbmNlJTIwY29ubmVjdGlvbiUyMGRhcmt8ZW58MHx8fHwxNzcxMzI5MzE4fDA&ixlib=rb-4.1.0&q=85')`
      }}
    />
    <div className="hero-overlay absolute inset-0" />
    
    <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-amber-500 text-sm font-semibold tracking-widest uppercase mb-6">
          Peer-Reviewed • Open Access • Interdisciplinary
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6 font-serif">
          Bridging Medicine,<br />
          <span className="text-amber-500">Law</span>, and Public Health
        </h1>
        <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
          A leading peer-reviewed journal dedicated to the intersection of healthcare, 
          legal frameworks, and global well-being. Published in partnership with 
          Riyadh Second Health Cluster Research Center.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`${OJS_URL}/about/submissions`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
            data-testid="hero-submit-btn"
          >
            <Button className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700 text-white px-8 py-6 text-sm font-semibold tracking-wide uppercase rounded-none btn-lift">
              <Send className="w-4 h-4 mr-2" />
              Submit Your Manuscript
            </Button>
          </a>
          <a
            href="#current-issue"
            className="w-full sm:w-auto"
            data-testid="hero-explore-btn"
          >
            <Button variant="outline" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 px-8 py-6 text-sm font-semibold tracking-wide uppercase rounded-none">
              <BookOpen className="w-4 h-4 mr-2" />
              Explore Current Research
            </Button>
          </a>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-10 border-t border-white/10"
      >
        <div className="text-center">
          <p className="text-3xl md:text-4xl font-bold text-amber-500 font-serif">6</p>
          <p className="text-sm text-slate-400 mt-2 uppercase tracking-wider">Volumes</p>
        </div>
        <div className="text-center">
          <p className="text-3xl md:text-4xl font-bold text-amber-500 font-serif">55%</p>
          <p className="text-sm text-slate-400 mt-2 uppercase tracking-wider">Acceptance Rate</p>
        </div>
        <div className="text-center">
          <p className="text-3xl md:text-4xl font-bold text-amber-500 font-serif">Open</p>
          <p className="text-sm text-slate-400 mt-2 uppercase tracking-wider">Access</p>
        </div>
        <div className="text-center">
          <p className="text-3xl md:text-4xl font-bold text-amber-500 font-serif">Global</p>
          <p className="text-sm text-slate-400 mt-2 uppercase tracking-wider">Reach</p>
        </div>
      </motion.div>
    </div>

    {/* Scroll indicator */}
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
      >
        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
      </motion.div>
    </div>
  </section>
);

// OJS Portal Access Section
const OJSPortalSection = () => (
  <section className="py-16 bg-slate-900 relative overflow-hidden" data-testid="ojs-portal-section">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-6 h-6 text-amber-500" />
            <span className="text-amber-500 text-sm font-semibold tracking-widest uppercase">OJS Portal</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-serif mb-4">
            Access the Journal's Full Content
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Visit our Open Journal Systems portal for complete access to all current and archived issues, 
            article submissions, peer review tracking, and comprehensive submission guidelines.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href={OJS_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="ojs-portal-link"
          >
            <Button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-6 text-sm font-semibold tracking-wide uppercase rounded-none btn-lift">
              Go to OJS Portal
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </a>
          <a
            href={`${OJS_URL}/issue/archive`}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="ojs-archive-link"
          >
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-6 text-sm font-semibold tracking-wide uppercase rounded-none">
              Browse Archives
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  </section>
);

// About Section
const AboutSection = () => (
  <section id="about" className="py-20 md:py-32 bg-white" data-testid="about-section">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-amber-600 text-sm font-semibold tracking-widest uppercase">About the Journal</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-serif mt-4 mb-6">
              Where Healthcare, Law & Policy Converge
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              {journalInfo.description}
            </p>
            <p className="text-slate-600 text-lg leading-relaxed">
              The journal publishes a range of content, including original research, review articles, 
              case studies, and commentaries, all of which undergo a rigorous peer-review process to 
              ensure high-quality and relevant contributions to the literature.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="feature-border pl-6 py-4"
          >
            <Heart className="w-10 h-10 text-amber-600 mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 font-serif mb-2">Medicine</h3>
            <p className="text-slate-600">Clinical research, healthcare delivery, and medical practice innovations.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="feature-border pl-6 py-4"
          >
            <Scale className="w-10 h-10 text-amber-600 mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 font-serif mb-2">Law & Ethics</h3>
            <p className="text-slate-600">Legal analysis, medical ethics, and regulatory frameworks.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="feature-border pl-6 py-4"
          >
            <Users className="w-10 h-10 text-amber-600 mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 font-serif mb-2">Public Health</h3>
            <p className="text-slate-600">Population health, epidemiology, and health policy discussions.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="feature-border pl-6 py-4"
          >
            <Globe className="w-10 h-10 text-amber-600 mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 font-serif mb-2">Global Impact</h3>
            <p className="text-slate-600">International perspectives on healthcare challenges and solutions.</p>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

// Current Issue Section
const CurrentIssueSection = () => (
  <section id="current-issue" className="py-20 md:py-32 bg-slate-50" data-testid="current-issue-section">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="text-center mb-16">
        <span className="text-amber-600 text-sm font-semibold tracking-widest uppercase">Latest Research</span>
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-serif mt-4 mb-4">
          Current Issue
        </h2>
        <div className="flex items-center justify-center gap-4 text-slate-600">
          <span className="font-semibold">{currentIssue.volume}</span>
          <span>•</span>
          <span>{currentIssue.subtitle}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            Published: {currentIssue.published}
          </span>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Featured Article */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-7 md:row-span-2"
        >
          <a 
            href={currentIssue.articles[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="article-card block h-full bg-slate-900 text-white p-8 md:p-10"
            data-testid="featured-article"
          >
            <span className="category-badge bg-amber-600/20 text-amber-400 border-amber-500/30">
              {currentIssue.articles[0].category}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold font-serif mt-6 mb-4 leading-snug">
              {currentIssue.articles[0].title}
            </h3>
            <p className="text-slate-400 mb-6">{currentIssue.articles[0].authors}</p>
            <div className="flex items-center gap-4 mt-auto">
              <span className="text-sm text-slate-500">Pages {currentIssue.articles[0].pages}</span>
              <span className="flex items-center gap-2 text-amber-500 font-medium">
                Read Article <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </a>
        </motion.div>

        {/* Secondary Articles */}
        {currentIssue.articles.slice(1, 5).map((article, idx) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="md:col-span-5"
          >
            <a 
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="article-card block h-full bg-white border border-slate-100 p-6"
              data-testid={`article-${article.id}`}
            >
              <span className="category-badge">{article.category}</span>
              <h3 className="text-lg font-semibold font-serif mt-4 mb-3 text-slate-900 leading-snug line-clamp-2">
                {article.title}
              </h3>
              <p className="text-sm text-slate-500 mb-4 line-clamp-1">{article.authors}</p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                <span className="text-xs text-slate-400">Pages {article.pages}</span>
                <span className="flex items-center gap-1 text-amber-600 text-sm font-medium">
                  <FileText className="w-4 h-4" />
                  PDF
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
          <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-100 px-8 py-6 text-sm font-semibold tracking-wide uppercase rounded-none">
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
  <section id="submission" className="py-20 md:py-32 bg-white" data-testid="submission-section">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <span className="text-amber-600 text-sm font-semibold tracking-widest uppercase">For Authors</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-serif mt-4 mb-6">
            Submit Your Research
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed mb-8">
            JMLPH welcomes submissions from healthcare providers, legal experts, public health 
            practitioners, researchers, and policymakers worldwide. Our double-blind peer-review 
            process ensures the highest standards of academic integrity.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-amber-100 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Original Research</h3>
                <p className="text-slate-600 text-sm">Novel findings in medicine, law, and public health</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-amber-100 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Review Articles</h3>
                <p className="text-slate-600 text-sm">Comprehensive literature reviews and analyses</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-amber-100 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Case Reports</h3>
                <p className="text-slate-600 text-sm">Unique clinical cases with educational value</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-amber-100 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Commentaries</h3>
                <p className="text-slate-600 text-sm">Expert opinions on current healthcare issues</p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <a
              href={`${OJS_URL}/about/submissions`}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="submission-guidelines-link"
            >
              <Button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-6 text-sm font-semibold tracking-wide uppercase rounded-none btn-lift">
                View Submission Guidelines
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>
        </div>

        {/* Journal Metrics */}
        <div className="bg-slate-50 p-8 md:p-12">
          <h3 className="text-2xl font-bold text-slate-900 font-serif mb-8">Journal Metrics</h3>
          
          <div className="space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-slate-200">
              <span className="text-slate-600">ISSN (Print)</span>
              <span className="font-semibold text-slate-900">{journalInfo.issn_print}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-slate-200">
              <span className="text-slate-600">ISSN (Online)</span>
              <span className="font-semibold text-slate-900">{journalInfo.issn_online}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-slate-200">
              <span className="text-slate-600">Publication Frequency</span>
              <span className="font-semibold text-slate-900">{journalInfo.frequency}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-slate-200">
              <span className="text-slate-600">Review Type</span>
              <span className="font-semibold text-slate-900">{journalInfo.reviewType}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-slate-200">
              <span className="text-slate-600">Acceptance Rate</span>
              <span className="font-semibold text-slate-900">{journalInfo.acceptanceRate}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Access Type</span>
              <span className="font-semibold text-amber-600">{journalInfo.journalType}</span>
            </div>
          </div>

          {/* Indexing */}
          <div className="mt-10 pt-8 border-t border-slate-200">
            <h4 className="text-lg font-semibold text-slate-900 mb-4">Indexing Status</h4>
            <div className="grid grid-cols-2 gap-4">
              {indexingInfo.map((index, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span className="text-sm text-slate-600">{index.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Editorial Board Section
const EditorialBoardSection = () => (
  <section id="editorial-board" className="py-20 md:py-32 bg-slate-50" data-testid="editorial-board-section">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="text-center mb-16">
        <span className="text-amber-600 text-sm font-semibold tracking-widest uppercase">Our Team</span>
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-serif mt-4 mb-4">
          Editorial Board
        </h2>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Distinguished experts from medicine, law, and public health guiding our publication standards.
        </p>
      </div>

      {/* Editor in Chief */}
      <div className="mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white p-8 md:p-10 border border-slate-100 max-w-3xl mx-auto"
        >
          <div className="text-center">
            <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white font-serif">BM</span>
            </div>
            <span className="text-amber-600 text-sm font-semibold tracking-wider uppercase">Editor-In-Chief</span>
            <h3 className="text-2xl font-bold text-slate-900 font-serif mt-2">{editorialBoard.editorInChief.name}</h3>
            <p className="text-slate-600 mt-2">{editorialBoard.editorInChief.affiliation}</p>
            {editorialBoard.editorInChief.linkedin && (
              <a
                href={editorialBoard.editorInChief.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-amber-600 mt-4 hover:underline"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn Profile
              </a>
            )}
          </div>
        </motion.div>
      </div>

      {/* Board of Trustees */}
      <div className="mb-12">
        <h3 className="text-xl font-semibold text-slate-900 font-serif text-center mb-8">Board of Trustees</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {editorialBoard.trustees.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="profile-card bg-white p-6 border border-slate-100"
            >
              <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-semibold text-slate-600">
                  {member.name.split(' ').slice(1).map(n => n[0]).join('')}
                </span>
              </div>
              <h4 className="font-semibold text-slate-900 text-center">{member.name}</h4>
              <p className="text-sm text-slate-500 text-center mt-1">{member.role}</p>
              <p className="text-xs text-slate-400 text-center mt-2 line-clamp-2">{member.affiliation}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Section Editors */}
      <div>
        <h3 className="text-xl font-semibold text-slate-900 font-serif text-center mb-8">Section Editors</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {editorialBoard.sectionEditors.map((editor, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="profile-card bg-white p-6 border border-slate-100"
            >
              <h4 className="font-semibold text-slate-900">{editor.name}</h4>
              <p className="text-sm text-slate-500 mt-2 line-clamp-2">{editor.affiliation}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* View Full Team Link */}
      <div className="text-center mt-12">
        <a
          href={`${OJS_URL}/about/editorialTeam`}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="view-full-team"
        >
          <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-100 px-8 py-6 text-sm font-semibold tracking-wide uppercase rounded-none">
            View Full Editorial Team
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </a>
      </div>
    </div>
  </section>
);

// Newsletter Section
const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    
    setLoading(true);
    try {
      await axios.post(`${API}/newsletter/subscribe`, { email });
      toast.success('Successfully subscribed to the newsletter!');
      setEmail('');
    } catch (error) {
      if (error.response?.status === 409) {
        toast.info('This email is already subscribed');
      } else {
        toast.error('Failed to subscribe. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-slate-900" data-testid="newsletter-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-2xl mx-auto text-center">
          <Mail className="w-12 h-12 text-amber-500 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white font-serif mb-4">
            Stay Updated
          </h2>
          <p className="text-slate-400 text-lg mb-8">
            Subscribe to receive notifications about new issues, call for papers, 
            and important journal announcements.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 rounded-none py-6 input-academic"
              data-testid="newsletter-email-input"
            />
            <Button 
              type="submit" 
              disabled={loading}
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-6 text-sm font-semibold tracking-wide uppercase rounded-none btn-lift"
              data-testid="newsletter-submit-btn"
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>

          <p className="text-slate-500 text-sm mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API}/contact`, formData);
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 md:py-32 bg-white" data-testid="contact-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <span className="text-amber-600 text-sm font-semibold tracking-widest uppercase">Get in Touch</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-serif mt-4 mb-6">
              Contact Us
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              Have questions about submissions, peer review, or general inquiries? 
              We're here to help.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Email</h3>
                  <a href={`mailto:${journalInfo.email}`} className="text-amber-600 hover:underline">
                    {journalInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Address</h3>
                  <p className="text-slate-600">{journalInfo.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <Linkedin className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">LinkedIn</h3>
                  <a 
                    href="https://www.linkedin.com/company/the-journal-of-medicine-law-public-health-jmlph/about/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-amber-600 hover:underline"
                  >
                    Follow us on LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-slate-50 p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Name *</label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-none border-slate-200 input-academic"
                  data-testid="contact-name-input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-none border-slate-200 input-academic"
                  data-testid="contact-email-input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                <Input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full rounded-none border-slate-200 input-academic"
                  data-testid="contact-subject-input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Message *</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full rounded-none border-slate-200 input-academic resize-none"
                  data-testid="contact-message-input"
                />
              </div>
              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-6 text-sm font-semibold tracking-wide uppercase rounded-none btn-lift"
                data-testid="contact-submit-btn"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => (
  <footer className="bg-slate-900 py-20" data-testid="footer">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-amber-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg font-serif">J</span>
            </div>
            <span className="logo-text text-xl text-white">JMLPH</span>
          </div>
          <p className="text-slate-400 leading-relaxed mb-6 max-w-md">
            The Journal of Medicine, Law & Public Health is an interdisciplinary, 
            peer-reviewed publication exploring the intersection of medical practice, 
            legal considerations, and public health policy.
          </p>
          <p className="text-slate-500 text-sm">
            Published in partnership with Riyadh Second Health Cluster Research Center
          </p>
          <div className="mt-6">
            <img 
              src="https://www.jmlph.net/public/site/images/admin/screenshot-2023-12-29-at-21.04.06.png" 
              alt="Research Center Logo" 
              className="h-12 opacity-70"
            />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-6">Quick Links</h4>
          <ul className="space-y-3">
            <li>
              <a href={OJS_URL} target="_blank" rel="noopener noreferrer" className="footer-link text-sm">
                OJS Portal
              </a>
            </li>
            <li>
              <a href={`${OJS_URL}/about/submissions`} target="_blank" rel="noopener noreferrer" className="footer-link text-sm">
                Submit Manuscript
              </a>
            </li>
            <li>
              <a href={`${OJS_URL}/issue/archive`} target="_blank" rel="noopener noreferrer" className="footer-link text-sm">
                Archives
              </a>
            </li>
            <li>
              <a href={`${OJS_URL}/about/editorialTeam`} target="_blank" rel="noopener noreferrer" className="footer-link text-sm">
                Editorial Team
              </a>
            </li>
            <li>
              <a href={`${OJS_URL}/information/authors`} target="_blank" rel="noopener noreferrer" className="footer-link text-sm">
                For Authors
              </a>
            </li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h4 className="text-white font-semibold mb-6">Policies</h4>
          <ul className="space-y-3">
            <li>
              <a href={`${OJS_URL}/about`} target="_blank" rel="noopener noreferrer" className="footer-link text-sm">
                About the Journal
              </a>
            </li>
            <li>
              <a href="#" className="footer-link text-sm">Publication Ethics</a>
            </li>
            <li>
              <a href="#" className="footer-link text-sm">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="footer-link text-sm">Terms of Service</a>
            </li>
            <li>
              <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer" className="footer-link text-sm">
                CC BY 4.0 License
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()} Journal of Medicine, Law & Public Health. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <span className="text-slate-500 text-sm">Registration No. {journalInfo.registrationNo}</span>
          <a 
            href="https://aretion.co.uk/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-amber-500 text-sm transition-colors"
          >
            An Aretion Publishing Group Journal
          </a>
        </div>
      </div>
    </div>
  </footer>
);

// Back to Top Button
const BackToTop = ({ visible }) => (
  <AnimatePresence>
    {visible && (
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-amber-600 hover:bg-amber-700 text-white flex items-center justify-center shadow-lg transition-colors z-50"
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
      <OJSPortalSection />
      <AboutSection />
      <CurrentIssueSection />
      <SubmissionSection />
      <EditorialBoardSection />
      <NewsletterSection />
      <ContactSection />
      <Footer />
      <BackToTop visible={showBackToTop} />
    </div>
  );
}

export default App;
