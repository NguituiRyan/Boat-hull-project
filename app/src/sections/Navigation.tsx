import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: 'Design', target: '#design' },
  { label: 'Hardware', target: '#hardware' },
  { label: 'Math', target: '#math' },
  { label: 'Telemetry', target: '#telemetry' },
  { label: 'Report', target: '#report' },
];

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    // Show nav after scrolling past hero
    ScrollTrigger.create({
      trigger: document.body,
      start: '100vh top',
      onEnter: () => setIsVisible(true),
      onLeaveBack: () => setIsVisible(false),
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === document.body) st.kill();
      });
    };
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    gsap.to(nav, {
      y: isVisible ? 0 : -100,
      opacity: isVisible ? 1 : 0,
      duration: 0.3,
      ease: 'power2.out',
    });
  }, [isVisible]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    setMobileOpen(false);
    
    const element = document.querySelector(target);
    if (element) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: element, offsetY: 0 },
        ease: 'power2.inOut',
      });
    }
  };

  return (
    <nav 
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-[100] px-6 py-4"
      style={{ 
        opacity: 0, 
        transform: 'translateY(-100px)',
        background: 'rgba(7, 10, 18, 0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(242, 245, 250, 0.06)',
      }}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <a href="#" className="font-heading text-xl font-bold text-[#F2F5FA]">
          V-Planer
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.target}
              onClick={(e) => handleNavClick(e, link.target)}
              className="text-[#A7B1C6] text-sm hover:text-[#F2F5FA] transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-[#F2F5FA]"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[rgba(7,10,18,0.95)] backdrop-blur-xl border-b border-[rgba(242,245,250,0.06)] py-4">
          <div className="flex flex-col items-center gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.target}
                onClick={(e) => handleNavClick(e, link.target)}
                className="text-[#A7B1C6] text-sm hover:text-[#F2F5FA] transition-colors duration-200 py-2"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
