import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Drag() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const metricRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const leftCard = leftCardRef.current;
    const rightCard = rightCardRef.current;
    const header = headerRef.current;
    const body = bodyRef.current;
    const metric = metricRef.current;
    const caption = captionRef.current;

    if (!section || !leftCard || !rightCard || !header || !body || !metric || !caption) return;

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
          { x: '-55vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 
          0
        )
        .fromTo(rightCard, 
          { x: '55vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 
          0
        )
        .fromTo([header, body], 
          { y: 18, opacity: 0 }, 
          { y: 0, opacity: 1, stagger: 0.02, ease: 'none' }, 
          0.15
        )
        .fromTo(metric, 
          { scale: 0.92, opacity: 0 }, 
          { scale: 1, opacity: 1, ease: 'power2.out' }, 
          0.22
        )
        .fromTo(caption, 
          { y: 14, opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'none' }, 
          0.26
        );

      // SETTLE (30-70%) - hold

      // EXIT (70-100%)
      scrollTl
        .fromTo([leftCard, rightCard], 
          { y: 0, opacity: 1 }, 
          { y: '10vh', opacity: 0, stagger: 0.02, ease: 'power2.in' }, 
          0.7
        );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="section-pinned z-[80]"
    >
      <div className="w-full h-full flex items-center justify-center px-[6vw]">
        <div className="flex flex-col lg:flex-row gap-6 w-full max-w-[88vw]">
          {/* Left Image Card */}
          <div 
            ref={leftCardRef}
            className="glass-card flex-1 h-[40vh] lg:h-[64vh] overflow-hidden"
          >
            <img 
              src="/hull_side.jpg" 
              alt="Hull Side View"
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
              Drag & Power Estimate
            </h2>

            <p 
              ref={bodyRef}
              className="text-[#A7B1C6] text-base lg:text-lg leading-relaxed mb-10"
            >
              Drag scales with speed squared and wetted area. With a compact 
              planing surface and moderate beam, the hull keeps resistance low 
              for efficient cruising.
            </p>

            <div ref={metricRef} className="mb-4">
              <span className="font-mono text-[#A7B1C6] text-lg mr-2">F_d ≈</span>
              <span className="font-mono text-4xl lg:text-5xl text-[#4F6DFF] font-medium">
                0.11
              </span>
              <span className="font-mono text-xl text-[#A7B1C6] ml-2">
                N
              </span>
            </div>

            <p 
              ref={captionRef}
              className="text-[#A7B1C6] text-sm"
            >
              At 0.5 m/s with C_d ≈ 0.6.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
