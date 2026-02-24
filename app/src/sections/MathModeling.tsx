import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MathModeling() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const equationsRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const leftCard = leftCardRef.current;
    const rightCard = rightCardRef.current;
    const header = headerRef.current;
    const equations = equationsRef.current;
    const caption = captionRef.current;

    if (!section || !leftCard || !rightCard || !header || !equations || !caption) return;

    const equationElements = equations.querySelectorAll('.equation-item');

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
        .fromTo(header, 
          { y: 18, opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'none' }, 
          0.15
        )
        .fromTo(equationElements, 
          { x: '-6vw', opacity: 0 }, 
          { x: 0, opacity: 1, stagger: 0.03, ease: 'none' }, 
          0.2
        )
        .fromTo(caption, 
          { y: 14, opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'none' }, 
          0.28
        );

      // SETTLE (30-70%) - hold

      // EXIT (70-100%)
      scrollTl
        .fromTo(leftCard, 
          { x: 0, opacity: 1 }, 
          { x: '-22vw', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(rightCard, 
          { x: 0, opacity: 1 }, 
          { x: '22vw', opacity: 0, ease: 'power2.in' }, 
          0.7
        );

    }, section);

    return () => ctx.revert();
  }, []);

  const equations = [
    {
      symbol: '∇',
      name: 'Displacement Volume',
      value: '2.95 × 10⁻⁴',
      unit: 'm³',
    },
    {
      symbol: 'm_max',
      name: 'Max Supported Mass',
      value: '295',
      unit: 'g',
    },
    {
      symbol: 'GM',
      name: 'Metacentric Height',
      value: '0.02285',
      unit: 'm',
      note: 'Derived from KM − KG',
    },
    {
      symbol: 'F_d',
      name: 'Theoretical Drag Force',
      value: '0.11',
      unit: 'N',
      note: 'Assuming C_d = 0.6, v = 0.5 m/s',
    },
    {
      symbol: 'RM',
      name: 'Restoring Moment',
      value: '0.011',
      unit: 'N·m',
      note: 'At 10° heel angle',
    },
  ];

  return (
    <section 
      ref={sectionRef} 
      className="section-pinned z-40"
    >
      <div className="w-full h-full flex items-center justify-center px-[6vw]">
        <div className="flex flex-col lg:flex-row gap-6 w-full max-w-[88vw]">
          {/* Left Equation Card */}
          <div 
            ref={leftCardRef}
            className="glass-card flex-1 h-auto lg:h-[64vh] p-8 lg:p-12 flex flex-col justify-center"
          >
            <h2 
              ref={headerRef}
              className="font-heading text-3xl lg:text-4xl font-bold text-[#F2F5FA] mb-8"
            >
              Mathematical Modeling
            </h2>

            <div ref={equationsRef} className="space-y-5">
              {equations.map((eq, index) => (
                <div 
                  key={index} 
                  className="equation-item py-3 border-b border-[rgba(242,245,250,0.08)]"
                >
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="font-mono text-2xl lg:text-3xl text-[#4F6DFF] font-medium">
                      {eq.symbol}
                    </span>
                    <span className="text-[#A7B1C6] text-sm">
                      {eq.name}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-xl lg:text-2xl text-[#F2F5FA]">
                      = {eq.value}
                    </span>
                    <span className="font-mono text-[#A7B1C6]">
                      {eq.unit}
                    </span>
                  </div>
                  {eq.note && (
                    <span className="text-[#A7B1C6] text-xs mt-1 block">
                      {eq.note}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <p 
              ref={captionRef}
              className="text-[#A7B1C6] text-sm mt-6"
            >
              Derived from hydrostatics and moment balance.
            </p>
          </div>

          {/* Right Image Card */}
          <div 
            ref={rightCardRef}
            className="glass-card flex-1 h-[40vh] lg:h-[64vh] overflow-hidden"
          >
            <img 
              src="/hull_front.jpg" 
              alt="V-Planer Hull Front View"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
