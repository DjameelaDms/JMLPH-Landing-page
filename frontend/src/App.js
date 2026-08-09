import "@/App.css";
import { ReactLenis } from "lenis/react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { StatsMarquee } from "@/components/StatsMarquee";
import { About } from "@/components/About";
import { PublicationFee } from "@/components/PublicationFee";
import { CurrentIssue } from "@/components/CurrentIssue";
import { MostRead } from "@/components/MostRead";
import { Information } from "@/components/Information";
import { Footer } from "@/components/Footer";

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.09, smoothWheel: true, anchors: true }}>
      <div className="App" data-testid="jmlph-landing">
        <div className="grain-overlay" aria-hidden="true" />
        <Header />
        <main>
          <Hero />
          <StatsMarquee />
          <About />
          <PublicationFee />
          <CurrentIssue />
          <MostRead />
          <Information />
        </main>
        <Footer />
      </div>
    </ReactLenis>
  );
}

export default App;
