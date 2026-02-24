import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const buttons = buttonsRef.current;

    if (!section || !content || !buttons) return;

    const ctx = gsap.context(() => {
      // Content reveal
      gsap.fromTo(content.children,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          }
        }
      );

      // Buttons reveal
      gsap.fromTo(buttons.children,
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: buttons,
            start: 'top 85%',
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative z-[90] py-24 lg:py-32"
      style={{ background: '#070A12' }}
    >
      <div className="px-[7vw] max-w-4xl mx-auto text-center">
        {/* Content */}
        <div ref={contentRef} className="mb-10">
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-[#F2F5FA] mb-4">
            Get the full report.
          </h2>
          <p className="text-[#A7B1C6] text-lg max-w-xl mx-auto">
            Download the PDF, or reach out to discuss the build, calibration, 
            and field tests.
          </p>
        </div>

        {/* Buttons */}
        <div ref={buttonsRef} className="flex flex-wrap justify-center gap-4 mb-16">
          <button className="btn-accent flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download Report (PDF)
          </button>
          <button className="px-6 py-3 rounded-full font-medium border border-[rgba(242,245,250,0.15)] text-[#F2F5FA] hover:bg-[rgba(242,245,250,0.05)] transition-all duration-200 flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Contact Team
          </button>
        </div>

        {/* Footer */}
        <div className="pt-8 border-t border-[rgba(242,245,250,0.08)]">
          <p className="text-[#A7B1C6] text-sm">
            Built for Statics & Dynamics • 2026
          </p>
        </div>
      </div>
    </section>
  );
}
