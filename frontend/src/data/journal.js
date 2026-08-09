// Static content mirrored from jmlph.net — links preserved exactly.
export const BASE = "https://jmlph.net/index.php/jmlph";

export const NAV = [
  { label: "About", href: `${BASE}/about` },
  { label: "Current Issue", href: "#current-issue" },
  { label: "Archive", href: `${BASE}/issue/archive` },
  { label: "For Authors", href: `${BASE}/information/authors` },
  { label: "Most Read", href: "#most-read" },
];

export const SUBMIT_URL = `${BASE}/about/submissions`;
export const ARETION_PUBLISHER = "https://publishing.aretion.co.uk/";
export const ARETION_CSR = "https://aretion.org/?lang=en";
export const CONTACT_EMAIL = "editorial.board@jmlph.net";
export const OJS_URL = `${BASE}/about/aboutThisPublishingSystem`;

export const ABOUT_PARAGRAPHS = [
  "The Journal of Medicine, Law & Public Health (JMLPH) is an interdisciplinary, peer-reviewed publication dedicated to exploring the critical intersection of medical practice, legal frameworks, and public health policy.",
  "The journal publishes original research articles, comprehensive reviews, insightful case studies, and thought-provoking commentaries, all subject to a rigorous peer-review process to uphold the highest standards of quality and relevance.",
  "Designed for a broad readership — healthcare providers, legal experts, public health practitioners, researchers, and policymakers — JMLPH aims to inform and shape practice and policy, foster multidisciplinary collaboration, and promote the integration of health, law, and public health principles in addressing contemporary health challenges.",
];

export const GLANCE = [
  { label: "Publication Frequency", value: "Quarterly" },
  { label: "ISSN (Print)", value: "2788-9815" },
  { label: "ISSN (Online)", value: "2788-791X" },
  { label: "Review Type", value: "Double-blind Peer-review" },
  { label: "Journal Type", value: "Open Access" },
  { label: "Area of Publication", value: "Medicine, Public Health & Medical Law/Ethics" },
  { label: "Acceptance Rate", value: "46%" },
];

export const MARQUEE_ITEMS = [
  "Quarterly",
  "Double-blind Peer-review",
  "Open Access",
  "ISSN 2788-9815 / 2788-791X",
  "46% Acceptance Rate",
  "Medicine · Law · Public Health",
];

export const CURRENT_ISSUE = {
  volume: "Vol. 6 No. 3 (2026): Jul–Sept",
  published: "2026-06-30",
  sections: [
    {
      name: "Original Articles",
      articles: [
        {
          title:
            "Responses and Reproductive Outcomes Across Four Ovarian Stimulation Protocols in Poor Responders: A Retrospective Cohort Study",
          authors: "Dania AlJaroudi, Aljazi M. Mnikhr, Amani Abu Shaheen, Motasim Badri",
          pages: "964–975",
          url: `${BASE}/article/view/196`,
          pdf: `${BASE}/article/view/196/294`,
        },
        {
          title:
            "The Newfoundland and Labrador Population Health Index (NLPHI): A Computerized Framework for Population-Level Longitudinal Health Outcome Monitoring",
          authors: "Mirza Niaz Zaman Elin",
          pages: "981–988",
          url: `${BASE}/article/view/264`,
          pdf: `${BASE}/article/view/264/297`,
        },
        {
          title:
            "Sociodemographic Factors and Health Literacy Among Hypertensive Patients in a Health Centre in West Africa: A Cross-Sectional Study",
          authors:
            "Kouamé Rodolphe Dje, Koussoh Simone Malik, Guanga David Meless, Marie Laure Tiade, Desquith Angèle Aka, Julie Ghislaine Sackou-kouakou",
          pages: "1010–1021",
          url: `${BASE}/article/view/299`,
          pdf: `${BASE}/article/view/299/300`,
        },
        {
          title:
            "Enhancing Cross-Level Coordination in Healthcare Incident Command Through Virtual Incident Command System (VICS) Integration",
          authors: "Salem S. Alammi, Abdullah Alshareef, Ahmed Alyami, Ali Alammi, Abdullatif Bin Khunayn",
          pages: "989–1003",
          url: `${BASE}/article/view/312`,
          pdf: `${BASE}/article/view/312/298`,
        },
      ],
    },
    {
      name: "Commentary",
      articles: [
        {
          title:
            "The Unit Commensurability Problem in the Nutri-Score Algorithm: a Construct Validity Analysis",
          authors: "José A. Martínez",
          pages: "976–980",
          url: `${BASE}/article/view/313`,
          pdf: `${BASE}/article/view/313/295`,
        },
      ],
    },
    {
      name: "Law and Ethics",
      articles: [
        {
          title:
            "Evolving Jurisprudence on Organ Transplantation in India: An Analytical Study of the Transplantation of Human Organs and Tissues Act",
          authors: "Ruby Dubey",
          pages: "1004–1009",
          url: `${BASE}/article/view/287`,
          pdf: `${BASE}/article/view/287/299`,
        },
      ],
    },
  ],
};

export const MOST_READ = [
  {
    title: "Evaluating Patient Satisfaction With Nurse-Led Wound Care Services",
    views: 602,
    url: `${BASE}/article/view/130`,
  },
  {
    title:
      "Failure Rate of Oral Nitrofurantoin in Treating UTIs caused by ESBL-Producing Escherichia coli and Klebsiella pneumoniae: A Retrospective Cohort Study",
    views: 583,
    url: `${BASE}/article/view/233`,
  },
  {
    title: "Effects of Bans on Prostitution on Prevalence of Induced Abortions",
    views: 448,
    url: `${BASE}/article/view/167`,
  },
  {
    title: "Non-Pharmacological Interventions for Chronic Pain Management: A Narrative Review",
    views: 322,
    url: `${BASE}/article/view/207`,
  },
  {
    title:
      "Digital Health in Saudi Arabia: A Descriptive Study of User Perspectives, Adoption Rates, Benefits, and Challenges of Digital Health Applications",
    views: 310,
    url: `${BASE}/article/view/229`,
  },
];

export const INFORMATION = [
  { label: "For Readers", href: `${BASE}/information/readers` },
  { label: "For Authors", href: `${BASE}/information/authors` },
  { label: "For Librarians", href: `${BASE}/information/librarians` },
];

export const FEEDS = [
  { label: "Atom", href: `${BASE}/gateway/plugin/WebFeedGatewayPlugin/atom` },
  { label: "RSS 2.0", href: `${BASE}/gateway/plugin/WebFeedGatewayPlugin/rss2` },
  { label: "RSS 1.0", href: `${BASE}/gateway/plugin/WebFeedGatewayPlugin/rss` },
];
