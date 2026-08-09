import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, ShieldCheck, BookOpen } from "lucide-react";
import { SUBMIT_URL } from "../data/journal";

const line = {
  hidden: { y: "110%" },
  visible: (i) => ({
    y: "0%",
    transition: { duration: 1, delay: 0.35 + i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const HERO_IMG = "/hero-journal.jpg";

export const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <section ref={ref} id="top" className="relative min-h-[100svh] pt-[72px] md:pt-[84px] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 grid lg:grid-cols-12 gap-8 lg:gap-6 items-center min-h-[calc(100svh-84px)]">
        {/* Left: kinetic type */}
        <div className="lg:col-span-7 pt-10 lg:pt-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-wrap items-center gap-3 mb-8"
          >
            <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] font-semibold text-teal border border-teal/30 rounded-full px-3 py-1.5">
              <BookOpen className="w-3.5 h-3.5" /> Open Access
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] font-semibold text-teal border border-teal/30 rounded-full px-3 py-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> Peer-Reviewed
            </span>
          </motion.div>

          <h1 className="font-serif font-bold text-ink tracking-tighter leading-[0.95] text-[13vw] sm:text-7xl lg:text-[5.6rem] xl:text-[6.4rem]">
            {["Medicine,", "Law &", "Public Health"].map((t, i) => (
              <span key={t} className="block overflow-hidden">
                <motion.span
                  custom={i}
                  variants={line}
                  initial="hidden"
                  animate="visible"
                  className={`block ${i === 1 ? "italic text-teal font-medium" : ""}`}
                >
                  {t}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-8 max-w-xl text-lg md:text-xl text-muted leading-relaxed"
          >
            An interdisciplinary, peer-reviewed journal exploring the critical intersection of
            medical practice, legal frameworks, and public health policy.
          </motion.p>

          <div className="mt-10 flex flex-wrap items-center gap-4 opacity-100">
            <a
              href="#current-issue"
              data-testid="hero-read-btn"
              className="inline-flex items-center gap-2 rounded-full bg-ink text-paper px-7 py-3.5 text-sm font-medium hover:bg-ink-hover transition-colors group"
            >
              Read Current Issue
              <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href={SUBMIT_URL}
              target="_blank"
              rel="noreferrer"
              data-testid="hero-submit-btn"
              className="inline-flex items-center gap-2 rounded-full border border-ink/25 text-ink px-7 py-3.5 text-sm font-medium hover:border-teal hover:text-teal transition-colors group"
            >
              Submit a Manuscript
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* Right: clipped, spotlighted image frame */}
        <div className="lg:col-span-5 relative h-[360px] sm:h-[480px] lg:h-[76vh]">
          <motion.div
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0% 0 0 0)" }}
            transition={{ delay: 0.55, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 overflow-hidden border border-line bg-bone"
          >
            <motion.img
              src={HERO_IMG}
              alt="Medical research"
              style={{ y: imgY, scale: imgScale }}
              className="w-full h-[120%] object-cover grayscale-[0.15]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/90">
                Vol. 6 · No. 3 · 2026
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/90">
                ISSN 2788-791X
              </div>
            </div>
          </motion.div>
          {/* floating stat block */}
          <motion.div
            initial={{ opacity: 0, y: 30, x: -20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ delay: 1.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-6 -left-4 sm:-left-8 bg-teal text-paper px-6 py-5 hidden sm:block"
          >
            <div className="font-serif text-4xl leading-none">46%</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] mt-2 opacity-80">
              Acceptance Rate
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
