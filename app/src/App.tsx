import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import HullDesign from './sections/HullDesign';
import Hardware from './sections/Hardware';
import MathModeling from './sections/MathModeling';
import Dashboard from './sections/Dashboard';
import Buoyancy from './sections/Buoyancy';
import Stability from './sections/Stability';
import Drag from './sections/Drag';
import Contact from './sections/Contact';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function App() {
  useEffect(() => {
    // Wait for all ScrollTriggers to be created
    const timeout = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      // Build ranges and snap targets from pinned sections
      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Create global snap
      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (with buffer)
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            
            if (!inPinned) return value; // Flowing section: free scroll

            // Find nearest pinned center
            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        }
      });
    }, 100);

    return () => {
      clearTimeout(timeout);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="relative">
      {/* Grid Overlay */}
      <div className="grid-overlay" />
      
      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative">
        <div id="hero">
          <Hero />
        </div>
        <div id="design">
          <HullDesign />
        </div>
        <div id="hardware">
          <Hardware />
        </div>
        <div id="math">
          <MathModeling />
        </div>
        <div id="telemetry">
          <Dashboard />
        </div>
        <div id="buoyancy">
          <Buoyancy />
        </div>
        <div id="stability">
          <Stability />
        </div>
        <div id="drag">
          <Drag />
        </div>
        <div id="report">
          <Contact />
        </div>
      </main>
    </div>
  );
}

export default App;
