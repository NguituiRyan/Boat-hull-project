import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, FileText, Activity } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const content = contentRef.current;
    const headline = headlineRef.current;
    const sub = subRef.current;
    const cta = ctaRef.current;
    const scrollHint = scrollHintRef.current;

    if (!section || !bg || !content || !headline || !sub || !cta || !scrollHint) return;

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(bg, { opacity: 0, scale: 1.06 });
      gsap.set(headline.querySelectorAll('.word'), { y: 40, opacity: 0 });
      gsap.set([sub, cta], { y: 18, opacity: 0 });
      gsap.set(scrollHint, { opacity: 0 });

      // Auto-play entrance animation
      const entranceTl = gsap.timeline({ delay: 0.2 });
      
      entranceTl
        .to(bg, { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' })
        .to(headline.querySelectorAll('.word'), { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.06, 
          ease: 'power3.out' 
        }, '-=0.8')
        .to(sub, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.4')
        .to(cta, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.4')
        .to(scrollHint, { opacity: 1, duration: 0.5 }, '-=0.2');

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset to visible when scrolling back to top
            gsap.set(bg, { opacity: 1, scale: 1, y: 0 });
            gsap.set(content, { x: 0, opacity: 1 });
            gsap.set(headline.querySelectorAll('.word'), { y: 0, opacity: 1 });
            gsap.set([sub, cta], { y: 0, opacity: 1 });
          }
        }
      });

      // EXIT phase (70-100%)
      scrollTl
        .fromTo(content, 
          { x: 0, opacity: 1 }, 
          { x: '-18vw', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(bg, 
          { scale: 1, y: 0 }, 
          { scale: 1.08, y: '-6vh', ease: 'power2.in' }, 
          0.7
        );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="section-pinned z-10"
    >
      {/* Background Image */}
      <div 
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/hero_boat.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#070A12]/80 via-[#070A12]/40 to-transparent" />
      </div>

      {/* Content */}
      <div 
        ref={contentRef}
        className="relative z-10 w-full h-full flex flex-col justify-center px-[7vw]"
      >
        <div className="max-w-2xl mt-[10vh]">
          <h1 
            ref={headlineRef}
            className="font-heading text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.02em] text-[#F2F5FA] mb-6"
          >
            <span className="word inline-block">V-Planer</span>{' '}
            <span className="word inline-block">Hull</span>
            <br />
            <span className="word inline-block text-[#4F6DFF]">Statics</span>{' '}
            <span className="word inline-block text-[#4F6DFF]">&</span>{' '}
            <span className="word inline-block text-[#4F6DFF]">Dynamics</span>
          </h1>

          <p 
            ref={subRef}
            className="text-[#A7B1C6] text-lg md:text-xl max-w-xl leading-relaxed mb-8"
          >
            An IoT-integrated marine vessel built to validate buoyancy, stability, 
            and drag with real-time telemetry.
          </p>

          <div ref={ctaRef} className="flex flex-wrap gap-4">
            <button className="btn-accent flex items-center gap-2">
              <FileText className="w-4 h-4" />
              View Engineering Report
            </button>
            <button className="px-6 py-3 rounded-full font-medium border border-[rgba(242,245,250,0.15)] text-[#F2F5FA] hover:bg-[rgba(242,245,250,0.05)] transition-all duration-200 flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Live Telemetry
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Hint */}
      <div 
        ref={scrollHintRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#A7B1C6] text-sm"
      >
        <span className="uppercase tracking-widest text-xs">Scroll to explore</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </div>
    </section>
  );
}
