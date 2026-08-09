import { Mail, ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { CONTACT_EMAIL, ARETION_PUBLISHER, OJS_URL, GLANCE } from "../data/journal";

const issnPrint = GLANCE.find((g) => g.label.includes("Print"))?.value;
const issnOnline = GLANCE.find((g) => g.label.includes("Online"))?.value;

export const Footer = () => (
  <footer data-testid="site-footer" className="bg-paper pt-20 pb-10">
    <div className="max-w-[1400px] mx-auto px-5 md:px-10">
      <Reveal>
        <div className="border-t border-line pt-14 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <img src="/logo.webp" alt="JMLPH logo" className="w-12 h-12 object-contain" />
              <span className="font-serif text-2xl font-bold text-ink tracking-tight">JMLPH</span>
            </div>
            <p className="font-serif text-2xl md:text-3xl leading-snug text-ink max-w-md">
              The Journal of Medicine, Law &amp; <span className="italic text-teal">Public Health.</span>
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              data-testid="footer-contact-email"
              className="group inline-flex items-center gap-2 mt-8 text-ink font-medium border-b-2 border-teal pb-1 hover:gap-3 transition-all"
            >
              <Mail className="w-4 h-4 text-teal" /> {CONTACT_EMAIL}
            </a>
          </div>

          <div className="md:col-span-3 md:col-start-8">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-5">Identifiers</h4>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm text-muted">ISSN (Print)</dt>
                <dd className="font-mono text-ink">{issnPrint}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted">ISSN (Online)</dt>
                <dd className="font-mono text-ink">{issnOnline}</dd>
              </div>
            </dl>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-5">Publisher</h4>
            <a
              href={ARETION_PUBLISHER}
              target="_blank"
              rel="noreferrer"
              data-testid="footer-aretion-link"
              className="group inline-flex items-center gap-1.5 text-ink hover:text-teal transition-colors"
            >
              ARETION Publishing
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </Reveal>

      <div className="mt-16 pt-8 border-t border-line flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} Journal of Medicine, Law &amp; Public Health. All rights reserved.
        </p>
        <a
          href={OJS_URL}
          target="_blank"
          rel="noreferrer"
          data-testid="footer-ojs-link"
          className="text-sm text-muted hover:text-teal transition-colors inline-flex items-center gap-1.5"
        >
          Powered by OJS / PKP Publishing System
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  </footer>
);
