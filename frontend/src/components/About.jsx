import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal, Overline } from "./Reveal";
import { ABOUT_PARAGRAPHS, ARETION_PUBLISHER } from "../data/journal";

const ABOUT_IMG = "https://images.unsplash.com/photo-1728506972831-193841eb2961?auto=format&fit=crop&w=900&q=80";

export const About = () => (
  <section id="about" data-testid="about-section" className="relative py-24 md:py-36">
    <div className="max-w-[1400px] mx-auto px-5 md:px-10 grid lg:grid-cols-12 gap-12 lg:gap-16">
      <div className="lg:col-span-4 relative">
        <div className="lg:sticky lg:top-32">
          <Reveal>
            <Overline>01 — About the Journal</Overline>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-serif text-4xl md:text-5xl tracking-tight leading-[1.05] text-ink mt-6">
              A platform for <span className="italic text-teal">rigorous</span> interdisciplinary scholarship.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 overflow-hidden border border-line hidden lg:block">
              <img src={ABOUT_IMG} alt="Academic library" className="w-full h-64 object-cover grayscale-[0.2]" />
            </div>
          </Reveal>
        </div>
      </div>

      <div className="lg:col-span-8 lg:col-start-6">
        <div className="space-y-8">
          {ABOUT_PARAGRAPHS.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className={`text-muted leading-relaxed ${i === 0 ? "text-xl md:text-2xl text-ink font-light" : "text-lg"}`}>
                {i === 0 ? (
                  <>
                    <span className="font-serif font-semibold text-ink">The Journal of Medicine, Law &amp; Public Health (JMLPH)</span>{" "}
                    is an interdisciplinary, peer-reviewed publication dedicated to exploring the critical intersection of medical practice, legal frameworks, and public health policy.
                  </>
                ) : (
                  p
                )}
              </p>
            </Reveal>
          ))}
          <Reveal delay={0.2}>
            <a
              href={ARETION_PUBLISHER}
              target="_blank"
              rel="noreferrer"
              data-testid="aretion-publisher-link"
              className="group inline-flex items-center gap-2 mt-4 text-ink font-medium border-b-2 border-teal pb-1 hover:gap-3 transition-all"
            >
              Published by ARETION Publishing Group
              <ArrowUpRight className="w-4 h-4 text-teal transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);
