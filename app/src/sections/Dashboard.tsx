import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface MetricCardProps {
  label: string;
  value: string;
  unit: string;
  status: string;
  sparklineData: number[];
  delay: number;
}

function MetricCard({ label, value, unit, status, sparklineData }: MetricCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const sparklineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const sparkline = sparklineRef.current;
    if (!card || !sparkline) return;

    // Animate sparkline draw
    const length = sparkline.getTotalLength();
    gsap.set(sparkline, { strokeDasharray: length, strokeDashoffset: length });

    ScrollTrigger.create({
      trigger: card,
      start: 'top 60%',
      onEnter: () => {
        gsap.to(sparkline, { strokeDashoffset: 0, duration: 1, ease: 'power2.out' });
      },
    });
  }, []);

  // Generate sparkline path
  const width = 120;
  const height = 40;
  const maxVal = Math.max(...sparklineData);
  const minVal = Math.min(...sparklineData);
  const range = maxVal - minVal || 1;
  
  const pathD = sparklineData.map((val, i) => {
    const x = (i / (sparklineData.length - 1)) * width;
    const y = height - ((val - minVal) / range) * height * 0.8 - height * 0.1;
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  return (
    <div 
      ref={cardRef}
      className="glass-card p-6 lg:p-8 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-[#A7B1C6] text-sm uppercase tracking-wider">
          {label}
        </span>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#4F6DFF] live-dot" />
          <span className="text-[#4F6DFF] text-xs uppercase tracking-wider">LIVE</span>
        </div>
      </div>

      {/* Value */}
      <div className="mb-6">
        <span className="font-mono text-4xl lg:text-5xl text-[#F2F5FA] font-medium">
          {value}
        </span>
        <span className="font-mono text-lg text-[#A7B1C6] ml-2">
          {unit}
        </span>
      </div>

      {/* Sparkline */}
      <div className="mb-4">
        <svg width="100%" height="40" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
          <path
            ref={sparklineRef}
            d={pathD}
            fill="none"
            stroke="#4F6DFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Status */}
      <div className="mt-auto pt-4 border-t border-[rgba(242,245,250,0.08)]">
        <span className="text-[#A7B1C6] text-xs uppercase tracking-wider">Status</span>
        <span className="text-[#4F6DFF] text-sm ml-2 font-medium">{status}</span>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Simulated live data
  const [metrics] = useState([
    {
      label: 'Heel Angle (Roll)',
      value: '+2.4',
      unit: '°',
      status: 'Stable',
      sparklineData: [2.1, 2.3, 2.2, 2.5, 2.4, 2.3, 2.4, 2.6, 2.4, 2.5],
    },
    {
      label: 'Pitch Angle',
      value: '−0.8',
      unit: '°',
      status: 'Level',
      sparklineData: [-0.5, -0.7, -0.6, -0.9, -0.8, -0.7, -0.8, -1.0, -0.8, -0.9],
    },
    {
      label: 'Dynamic Draft',
      value: '18.2',
      unit: 'mm',
      status: 'Planing',
      sparklineData: [19.5, 19.2, 18.8, 18.5, 18.3, 18.2, 18.1, 18.0, 18.2, 18.2],
    },
  ]);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;

    if (!section || !header || !cards) return;

    const cardElements = cards.querySelectorAll('.glass-card');

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(header,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          }
        }
      );

      // Cards stagger reveal
      gsap.fromTo(cardElements,
        { y: '10vh', opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cards,
            start: 'top 75%',
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative z-50 py-20 lg:py-32"
      style={{ background: '#0B1220' }}
    >
      <div className="px-[7vw]">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 lg:mb-16">
          <h2 className="font-heading text-3xl lg:text-5xl font-bold text-[#F2F5FA] mb-4">
            Live Telemetry Dashboard
          </h2>
          <p className="text-[#A7B1C6] text-lg max-w-xl mx-auto">
            Real-time heel, pitch, and draft while underway.
          </p>
        </div>

        {/* Cards Grid */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {metrics.map((metric, index) => (
            <MetricCard
              key={index}
              {...metric}
              delay={index * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
