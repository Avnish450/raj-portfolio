import React from 'react';
import { ArrowUp, Github, Linkedin } from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../config/portfolio';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hasGithub = Boolean(PORTFOLIO_CONFIG.socials.github && PORTFOLIO_CONFIG.socials.github.trim());
  const hasLinkedin = Boolean(PORTFOLIO_CONFIG.socials.linkedin && PORTFOLIO_CONFIG.socials.linkedin.trim());

  return (
    <footer className="border-t border-[#1e2029] bg-[#07080a] py-10 text-[#9699a6] text-xs font-mono" role="contentinfo">
      <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Attribution */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3 text-center md:text-left">
          <span className="font-bold text-[#f5f5f3] tracking-tight text-sm">
            {PORTFOLIO_CONFIG.profile.wordmark}
          </span>
          <span className="text-[#626573]">·</span>
          <span>Designed & built by {PORTFOLIO_CONFIG.profile.name}.</span>
          <span className="text-[#626573]">·</span>
          <span className="text-[#626573]">© {currentYear}</span>
        </div>

        {/* Right: Actions and optional socials */}
        <div className="flex items-center gap-5 sm:gap-6">
          {hasGithub && (
            <a
              href={PORTFOLIO_CONFIG.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9699a6] hover:text-[#cbfb45] transition-colors flex items-center gap-1.5"
              aria-label="GitHub profile"
            >
              <Github size={14} />
              <span>GitHub</span>
            </a>
          )}
          {hasLinkedin && (
            <a
              href={PORTFOLIO_CONFIG.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9699a6] hover:text-[#cbfb45] transition-colors flex items-center gap-1.5"
              aria-label="LinkedIn profile"
            >
              <Linkedin size={14} />
              <span>LinkedIn</span>
            </a>
          )}

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#9699a6] hover:text-[#f5f5f3] transition-colors p-1 rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#cbfb45]"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp size={13} className="text-[#cbfb45]" />
          </button>
        </div>
      </div>
    </footer>
  );
}
