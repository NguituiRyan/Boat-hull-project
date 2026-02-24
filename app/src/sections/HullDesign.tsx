import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HullDesign() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const leftCard = leftCardRef.current;
    const rightCard = rightCardRef.current;
    const header = headerRef.current;
    const body = bodyRef.current;
    const specs = specsRef.current;
    const cta = ctaRef.current;

    if (!section || !leftCard || !rightCard || !header || !body || !specs || !cta) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0-30%)
      scrollTl
        .fromTo(leftCard, 
          { x: '-55vw', opacity: 0, rotate: -1.5 }, 
          { x: 0, opacity: 1, rotate: 0, ease: 'none' }, 
          0
        )
        .fromTo(rightCard, 
          { x: '55vw', opacity: 0, rotate: 1.5 }, 
          { x: 0, opacity: 1, rotate: 0, ease: 'none' }, 
          0
        )
        .fromTo(header, 
          { y: 24, opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'none' }, 
          0.15
        )
        .fromTo(body, 
          { y: 18, opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'none' }, 
          0.18
        )
        .fromTo(specs.children, 
          { y: 18, opacity: 0 }, 
          { y: 0, opacity: 1, stagger: 0.02, ease: 'none' }, 
          0.22
        )
        .fromTo(cta, 
          { y: 14, opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'none' }, 
          0.28
        );

      // SETTLE (30-70%) - hold position

      // EXIT (70-100%)
      scrollTl
        .fromTo(leftCard, 
          { x: 0, opacity: 1 }, 
          { x: '-28vw', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(rightCard, 
          { x: 0, opacity: 1 }, 
          { x: '28vw', opacity: 0, ease: 'power2.in' }, 
          0.7
        );

    }, section);

    return () => ctx.revert();
  }, []);

  const specs = [
    { label: 'Length', value: '201.77 mm' },
    { label: 'Beam', value: '75.02 mm' },
    { label: 'Hull Mass', value: '90 g' },
  ];

  return (
    <section 
      ref={sectionRef} 
      className="section-pinned z-20"
    >
      <div className="w-full h-full flex items-center justify-center px-[6vw]">
        <div className="flex flex-col lg:flex-row gap-6 w-full max-w-[88vw]">
          {/* Left Image Card */}
          <div 
            ref={leftCardRef}
            className="glass-card flex-1 h-[50vh] lg:h-[64vh] overflow-hidden"
          >
            <img 
              src="/hull_side.jpg" 
              alt="V-Planer Hull Side Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Info Card */}
          <div 
            ref={rightCardRef}
            className="glass-card flex-1 h-auto lg:h-[64vh] p-8 lg:p-12 flex flex-col justify-center"
          >
            <h2 
              ref={headerRef}
              className="font-heading text-3xl lg:text-4xl font-bold text-[#F2F5FA] mb-6"
            >
              Hull Design
            </h2>

            <p 
              ref={bodyRef}
              className="text-[#A7B1C6] text-base lg:text-lg leading-relaxed mb-8"
            >
              A V-planing hull with a fine entry bow, hard chines, and a flat aft 
              section for early planing and predictable roll stability. The 
              hydrodynamic profile minimizes drag while maintaining directional 
              stability at varying speeds.
            </p>

            <div ref={specsRef} className="space-y-4 mb-8">
              {specs.map((spec, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-[rgba(242,245,250,0.08)]">
                  <span className="text-[#A7B1C6] text-sm uppercase tracking-wider">{spec.label}</span>
                  <span className="font-mono text-[#F2F5FA] text-lg">{spec.value}</span>
                </div>
              ))}
            </div>

            <a 
              ref={ctaRef}
              href="#specs"
              className="inline-flex items-center gap-2 text-[#4F6DFF] font-medium hover:gap-3 transition-all duration-200"
            >
              See full specs
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
