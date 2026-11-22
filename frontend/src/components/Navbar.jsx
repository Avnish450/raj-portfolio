import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../config/portfolio';

// Distinct main links (Feedback is highlighted as the primary CTA button)
const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Toolkit', href: '#toolkit' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'projects', 'toolkit', 'feedback'];
      const scrollPosition = window.scrollY + 220;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b ${
        isScrolled
          ? 'bg-[#0a0b0e]/95 backdrop-blur-md border-[#1e2029] py-3.5 shadow-sm'
          : 'bg-[#0a0b0e]/85 backdrop-blur-sm border-[#1e2029]/60 py-4'
      }`}
      role="banner"
    >
      <div className="container-custom flex items-center justify-between">
        {/* Left: Wordmark */}
        <a
          href="#home"
          className="font-mono text-base sm:text-lg font-bold tracking-tight text-[#f5f5f3] hover:text-[#cbfb45] transition-colors focus-visible:outline-none flex items-center gap-1"
          aria-label="Raj - Home"
        >
          <span>{PORTFOLIO_CONFIG.profile.wordmark}</span>
          <span className="text-[#cbfb45] inline-block animate-pulse">_</span>
        </a>

        {/* Right: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                className={`font-mono text-xs tracking-wider transition-colors ${
                  isActive
                    ? 'text-[#cbfb45] font-semibold'
                    : 'text-[#9699a6] hover:text-[#f5f5f3]'
                }`}
              >
                {link.label}
              </a>
            );
          })}

          <a
            href="#feedback"
            className="font-mono text-xs text-[#0b0c0f] bg-[#cbfb45] hover:bg-[#bbf036] px-3.5 py-1.5 rounded-sm font-semibold transition-all inline-flex items-center gap-1.5 shadow-sm"
          >
            Feedback
            <ArrowUpRight size={13} />
          </a>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className="md:hidden text-[#9699a6] hover:text-[#f5f5f3] p-1.5 rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#cbfb45]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-[57px] bg-[#0a0b0e]/98 backdrop-blur-xl border-b border-[#1e2029] p-6 flex flex-col justify-between md:hidden z-40 animate-fadeIn"
          role="dialog"
          aria-label="Mobile Navigation"
        >
          <div className="flex flex-col gap-4 pt-3">
            <span className="font-mono text-[0.7rem] text-[#626573] tracking-widest uppercase mb-1">
              Navigation
            </span>
            {[...NAV_LINKS, { label: 'Feedback', href: '#feedback' }].map((link, idx) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-mono text-lg py-2.5 border-b border-[#181921] flex items-center justify-between ${
                  activeSection === link.href.slice(1)
                    ? 'text-[#cbfb45] font-semibold'
                    : 'text-[#f5f5f3]'
                }`}
              >
                <span>{link.label}</span>
                <span className="font-mono text-xs text-[#626573]">0{idx + 1}</span>
              </a>
            ))}
          </div>

          <div className="pt-6 border-t border-[#181921] flex flex-col gap-1.5 text-xs">
            <span className="font-mono text-[#626573]">
              {PORTFOLIO_CONFIG.profile.specialization}
            </span>
            <span className="text-[#9699a6]">
              {PORTFOLIO_CONFIG.profile.degree}
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
