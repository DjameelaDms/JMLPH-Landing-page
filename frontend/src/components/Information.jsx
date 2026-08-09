import { motion } from "framer-motion";
import { ArrowUpRight, Rss, Users, PenLine, Library } from "lucide-react";
import { Reveal, Overline } from "./Reveal";
import { INFORMATION, FEEDS, SUBMIT_URL } from "../data/journal";

const INFO_ICONS = { "For Readers": Users, "For Authors": PenLine, "For Librarians": Library };
const INFO_IMG = "https://images.unsplash.com/photo-1526930382372-67bf22c0fce2?auto=format&fit=crop&w=900&q=80";

export const Information = () => (
  <section data-testid="information-section" className="py-24 md:py-32 bg-ink text-paper">
    <div className="max-w-[1400px] mx-auto px-5 md:px-10 grid lg:grid-cols-12 gap-12">
      <div className="lg:col-span-5">
        <Reveal>
          <Overline className="text-teal-light">04 — Information &amp; Feeds</Overline>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight leading-[1.05] mt-6">
            Everything you need to <span className="italic text-teal-light">read, write &amp; index.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-paper/60">Subscribe</span>
            {FEEDS.map((f) => (
              <a
                key={f.label}
                href={f.href}
                target="_blank"
                rel="noreferrer"
                data-testid={`feed-${f.label.toLowerCase().replace(/[\s.]+/g, "-")}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-paper/25 px-4 py-2 text-sm hover:border-teal-light hover:text-teal-light transition-colors"
              >
                <Rss className="w-3.5 h-3.5" /> {f.label}
              </a>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-8 overflow-hidden border border-white/10 hidden lg:block">
            <img src={INFO_IMG} alt="Microscope research" className="w-full h-56 object-cover grayscale opacity-80" />
          </div>
        </Reveal>
      </div>

      <div className="lg:col-span-6 lg:col-start-7">
        <div className="border-t border-white/15">
          {INFORMATION.map((item, i) => {
            const Icon = INFO_ICONS[item.label] || Users;
            return (
              <motion.a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                data-testid={`info-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group flex items-center justify-between gap-4 border-b border-white/15 py-7 md:py-8 hover:pl-3 transition-all duration-300"
              >
                <span className="flex items-center gap-4">
                  <Icon className="w-6 h-6 text-teal-light" />
                  <span className="font-serif text-2xl md:text-3xl">{item.label}</span>
                </span>
                <ArrowUpRight className="w-6 h-6 text-paper/50 group-hover:text-teal-light group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
              </motion.a>
            );
          })}
        </div>
        <Reveal delay={0.2}>
          <a
            href={SUBMIT_URL}
            target="_blank"
            rel="noreferrer"
            data-testid="information-submit-btn"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-paper text-ink px-7 py-4 text-sm font-medium hover:bg-teal-light hover:text-paper transition-colors group"
          >
            Make a Submission
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Reveal>
      </div>
    </div>
  </section>
);
