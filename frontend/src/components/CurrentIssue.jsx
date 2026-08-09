import { motion } from "framer-motion";
import { FileDown, ArrowUpRight } from "lucide-react";
import { Reveal, Overline } from "./Reveal";
import { CURRENT_ISSUE, GLANCE } from "../data/journal";

const ArticleRow = ({ article, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
    data-testid="article-row"
    className="group relative border-t border-line py-7 md:py-8 hover:bg-bone/60 transition-colors duration-300"
  >
    <div className="grid md:grid-cols-12 gap-4 md:gap-6 items-start px-1 md:px-4">
      <div className="md:col-span-8">
        <a
          href={article.url}
          target="_blank"
          rel="noreferrer"
          data-testid="article-title-link"
          className="font-serif text-xl md:text-2xl leading-snug text-ink group-hover:text-teal transition-colors duration-300 inline-flex gap-2"
        >
          {article.title}
          <ArrowUpRight className="w-5 h-5 shrink-0 mt-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-teal" />
        </a>
        <p className="mt-3 text-muted text-sm md:text-base">{article.authors}</p>
      </div>
      <div className="md:col-span-2 flex md:justify-center">
        <span className="font-mono text-xs md:text-sm text-muted bg-bone md:bg-transparent px-2 py-1 md:p-0">
          pp. {article.pages}
        </span>
      </div>
      <div className="md:col-span-2 flex md:justify-end">
        <a
          href={article.pdf}
          target="_blank"
          rel="noreferrer"
          data-testid="article-pdf-link"
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-ink border border-ink/25 rounded-full px-4 py-2 hover:bg-ink hover:text-paper transition-colors duration-300"
        >
          <FileDown className="w-3.5 h-3.5" /> PDF
        </a>
      </div>
    </div>
  </motion.div>
);

export const CurrentIssue = () => (
  <section id="current-issue" data-testid="current-issue-section" className="py-24 md:py-32 bg-surface border-y border-line">
    <div className="max-w-[1400px] mx-auto px-5 md:px-10">
      <div className="grid lg:grid-cols-12 gap-6 items-end mb-16">
        <div className="lg:col-span-8">
          <Reveal>
            <Overline>02 — Current Issue</Overline>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-serif text-4xl md:text-6xl tracking-tight leading-[1.02] text-ink mt-6">
              {CURRENT_ISSUE.volume}
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.15} className="lg:col-span-4 lg:text-right">
          <span className="font-mono text-sm text-muted uppercase tracking-[0.15em]">
            Published · {CURRENT_ISSUE.published}
          </span>
        </Reveal>
      </div>

      <div className="space-y-16">
        {CURRENT_ISSUE.sections.map((section) => (
          <div key={section.name} data-testid={`issue-section-${section.name.toLowerCase().replace(/\s+/g, "-")}`}>
            <Reveal>
              <div className="flex items-baseline gap-4 mb-2">
                <h3 className="font-serif italic text-2xl md:text-3xl text-teal">{section.name}</h3>
                <span className="font-mono text-xs text-muted">
                  ({String(section.articles.length).padStart(2, "0")})
                </span>
              </div>
            </Reveal>
            <div className="border-b border-line">
              {section.articles.map((a, i) => (
                <ArticleRow key={a.title} article={a} index={i} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* At-a-glance strip */}
      <div className="mt-20 grid grid-cols-2 md:grid-cols-4 border-t border-l border-line" data-testid="at-a-glance">
        {GLANCE.map((g, i) => (
          <motion.div
            key={g.label}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.04 }}
            className="border-b border-r border-line p-5 md:p-6"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{g.label}</div>
            <div className="font-serif text-lg md:text-xl text-ink mt-2 leading-tight">{g.value}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
