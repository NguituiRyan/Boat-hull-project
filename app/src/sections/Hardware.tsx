import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, Radio, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hardware() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;

    if (!section || !header || !cards) return;

    const cardElements = cards.querySelectorAll('.hardware-card');
    const textElements = cards.querySelectorAll('.card-text');

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
        .fromTo(header, 
          { y: '-18vh', opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'none' }, 
          0
        )
        .fromTo(cardElements[0], 
          { x: '-40vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 
          0.05
        )
        .fromTo(cardElements[1], 
          { y: '60vh', opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'none' }, 
          0.08
        )
        .fromTo(cardElements[2], 
          { x: '40vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 
          0.11
        )
        .fromTo(textElements, 
          { y: 14, opacity: 0 }, 
          { y: 0, opacity: 1, stagger: 0.015, ease: 'none' }, 
          0.2
        );

      // SETTLE (30-70%) - hold

      // EXIT (70-100%)
      scrollTl
        .fromTo(cardElements, 
          { y: 0, opacity: 1 }, 
          { y: '-18vh', opacity: 0, stagger: 0.02, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(header, 
          { opacity: 1 }, 
          { opacity: 0, ease: 'power2.in' }, 
          0.75
        );

    }, section);

    return () => ctx.revert();
  }, []);

  const hardwareData = [
    {
      icon: Cpu,
      title: 'Microcontroller',
      specs: [
        { label: 'Board', value: 'Arduino UNO R4 WiFi' },
        { label: 'Comms', value: 'HTTP + JSON API' },
        { label: 'Role', value: 'Control + logging' },
      ]
    },
    {
      icon: Radio,
      title: 'Sensors',
      specs: [
        { label: 'IMU', value: 'MPU6050 (pitch/roll)' },
        { label: 'Depth', value: 'Ultrasonic (draft)' },
        { label: 'Rate', value: '10 Hz' },
      ]
    },
    {
      icon: Zap,
      title: 'Actuation',
      specs: [
        { label: 'Driver', value: 'L9110S' },
        { label: 'Motor', value: 'DC propeller' },
        { label: 'Power', value: '9V (6x AA)' },
      ]
    },
  ];

  return (
    <section 
      ref={sectionRef} 
      className="section-pinned z-30"
    >
      <div className="w-full h-full flex flex-col justify-center px-[7vw]">
        {/* Header */}
        <div ref={headerRef} className="mb-10">
          <h2 className="font-heading text-3xl lg:text-5xl font-bold text-[#F2F5FA] mb-3">
            Hardware & IoT Integration
          </h2>
          <p className="text-[#A7B1C6] text-lg">
            Microcontroller, sensors, and actuation.
          </p>
        </div>

        {/* Cards Grid */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {hardwareData.map((item, index) => (
            <div 
              key={index}
              className="hardware-card glass-card p-8 flex flex-col"
            >
              <div className="card-icon w-12 h-12 rounded-xl bg-[rgba(79,109,255,0.15)] flex items-center justify-center mb-6">
                <item.icon className="w-6 h-6 text-[#4F6DFF]" />
              </div>

              <h3 className="card-text font-heading text-xl font-semibold text-[#F2F5FA] mb-6">
                {item.title}
              </h3>

              <div className="space-y-4">
                {item.specs.map((spec, specIndex) => (
                  <div key={specIndex} className="card-text">
                    <span className="text-[#A7B1C6] text-xs uppercase tracking-wider block mb-1">
                      {spec.label}
                    </span>
                    <span className="font-mono text-[#F2F5FA] text-sm">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
