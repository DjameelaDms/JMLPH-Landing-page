import { motion } from "framer-motion";
import { Eye, ArrowUpRight } from "lucide-react";
import { Reveal, Overline } from "./Reveal";
import { MOST_READ } from "../data/journal";

export const MostRead = () => (
  <section id="most-read" data-testid="most-read-section" className="py-24 md:py-36">
    <div className="max-w-[1400px] mx-auto px-5 md:px-10">
      <div className="mb-16 max-w-3xl">
        <Reveal>
          <Overline>03 — Most Read</Overline>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-serif text-4xl md:text-6xl tracking-tight leading-[1.02] text-ink mt-6">
            The papers our readers <span className="italic text-teal">return to.</span>
          </h2>
        </Reveal>
      </div>

      <div>
        {MOST_READ.map((article, i) => (
          <motion.a
            key={article.title}
            href={article.url}
            target="_blank"
            rel="noreferrer"
            data-testid="most-read-item"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="group grid grid-cols-12 gap-4 md:gap-8 items-center border-t border-line py-8 md:py-10 hover:bg-bone/50 transition-colors duration-300 px-1 md:px-4"
          >
            <div className="col-span-3 md:col-span-2">
              <span className="font-serif font-light text-5xl md:text-8xl text-ink/15 group-hover:text-teal transition-colors duration-500 leading-none">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="col-span-7 md:col-span-8">
              <h3 className="font-serif text-xl md:text-3xl leading-snug text-ink group-hover:text-teal transition-colors duration-300">
                {article.title}
              </h3>
            </div>
            <div className="col-span-2 flex flex-col items-end justify-center gap-2">
              <span className="inline-flex items-center gap-1.5 font-mono text-sm md:text-base text-muted">
                <Eye className="w-4 h-4" /> {article.views}
              </span>
              <ArrowUpRight className="w-5 h-5 text-teal opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </div>
          </motion.a>
        ))}
        <div className="border-t border-line" />
      </div>
    </div>
  </section>
);
