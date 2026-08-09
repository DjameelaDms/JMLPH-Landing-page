import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { NAV, SUBMIT_URL } from "../data/journal";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      data-testid="site-header"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-paper/85 backdrop-blur-xl border-b border-black/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 flex items-center justify-between h-[72px] md:h-[84px]">
        <a href="#top" data-testid="logo-link" className="flex items-center gap-3 group">
          <img
            src="/logo.webp"
            alt="JMLPH logo"
            className="w-11 h-11 object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <span className="hidden sm:flex flex-col leading-none">
            <span className="font-serif text-lg font-bold text-ink tracking-tight">JMLPH</span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted mt-0.5">
              Medicine · Law · Public Health
            </span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
              className="relative text-sm font-medium text-ink/80 hover:text-teal transition-colors duration-300 group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-teal transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={SUBMIT_URL}
            target="_blank"
            rel="noreferrer"
            data-testid="header-submit-btn"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-ink text-paper text-sm font-medium px-5 py-2.5 hover:bg-ink-hover transition-colors duration-300 group"
          >
            Make a Submission
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <button
            data-testid="mobile-menu-toggle"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-ink"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden bg-paper/95 backdrop-blur-xl border-b border-line"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {NAV.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  data-testid={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className="py-3 font-serif text-2xl text-ink border-b border-line/60 hover:text-teal transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={SUBMIT_URL}
                target="_blank"
                rel="noreferrer"
                data-testid="mobile-submit-btn"
                className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-full bg-ink text-paper text-sm font-medium px-5 py-3.5"
              >
                Make a Submission <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
