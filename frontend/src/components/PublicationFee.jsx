import { motion } from "framer-motion";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { Reveal, Overline } from "./Reveal";
import { ARETION_CSR } from "../data/journal";

export const PublicationFee = () => (
  <section data-testid="publication-fee-section" className="px-5 md:px-10 pb-24 md:pb-32">
    <div className="max-w-[1400px] mx-auto">
      <Reveal>
        <div className="relative overflow-hidden bg-ink text-paper border border-ink">
          {/* decorative oversized watermark */}
          <div className="pointer-events-none absolute -right-10 -top-16 font-serif text-[16rem] leading-none text-white/[0.04] select-none">
            £0
          </div>
          <div className="relative grid lg:grid-cols-12 gap-8 p-10 md:p-16">
            <div className="lg:col-span-4">
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] font-bold text-teal-light">
                <Sparkles className="w-4 h-4" /> Announcement
              </span>
              <h2 className="font-serif text-4xl md:text-5xl tracking-tight leading-[1.05] mt-6">
                All publication fees are <span className="italic text-teal-light">currently covered.</span>
              </h2>
            </div>
            <div className="lg:col-span-7 lg:col-start-6 flex flex-col justify-center gap-6">
              <p className="text-lg md:text-xl text-paper/85 leading-relaxed">
                JMLPH does not charge any submission or peer-review fees. While a publication fee
                of <span className="font-mono text-teal-light">£70</span> would ordinarily apply to
                accepted articles, all fees are presently covered through the corporate social
                responsibility initiative of ARETION (Arkan AlRay Co).
              </p>
              <p className="text-paper/70">
                Authors may submit and publish accepted articles with{" "}
                <span className="text-paper font-medium">no fees payable</span> at this time.
              </p>
              <a
                href={ARETION_CSR}
                target="_blank"
                rel="noreferrer"
                data-testid="aretion-csr-link"
                className="group inline-flex items-center gap-2 self-start text-paper font-medium border-b-2 border-teal-light pb-1 hover:gap-3 transition-all"
              >
                Learn about the ARETION CSR initiative
                <ArrowUpRight className="w-4 h-4 text-teal-light transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);
