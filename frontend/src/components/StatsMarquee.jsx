import Marquee from "react-fast-marquee";
import { MARQUEE_ITEMS } from "../data/journal";

export const StatsMarquee = () => (
  <div data-testid="stats-marquee" className="bg-ink text-paper py-5 border-y border-ink">
    <Marquee speed={40} gradient={false} autoFill>
      {MARQUEE_ITEMS.map((item, i) => (
        <div key={i} className="flex items-center">
          <span className="font-serif italic text-2xl md:text-3xl px-8 whitespace-nowrap">
            {item}
          </span>
          <span className="text-teal-light text-2xl">✦</span>
        </div>
      ))}
    </Marquee>
  </div>
);
