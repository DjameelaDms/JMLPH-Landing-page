import { motion } from "framer-motion";

// Simple scroll-reveal wrapper used across sections.
export const Reveal = ({ children, delay = 0, y = 32, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

// Overline label used as a section eyebrow.
export const Overline = ({ children, className = "" }) => (
  <span
    className={`inline-block text-xs uppercase tracking-[0.25em] font-bold text-teal ${className}`}
  >
    {children}
  </span>
);
