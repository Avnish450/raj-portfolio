import React from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../config/portfolio';
import HeroDiagram from '../components/HeroDiagram';

export default function HeroSection() {
  return (
    <section
      id="home"
      className="pt-28 pb-16 sm:pt-32 sm:pb-20 md:pt-36 md:pb-24 relative"
      aria-labelledby="hero-heading"
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Typography & Intent */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Eyebrow */}
            <div className="eyebrow-tag" aria-label="Student specialization">
              {PORTFOLIO_CONFIG.profile.eyebrow}
            </div>

            {/* Main Headline */}
            <h1
              id="hero-heading"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#f5f5f3] leading-[1.1] mb-6"
            >
              Building ideas into{' '}
              <span className="text-[#cbfb45] inline-block">
                intelligent
              </span>{' '}
              experiences.
            </h1>

            {/* Supporting Text */}
            <p className="text-sm sm:text-base md:text-lg text-[#9699a6] max-w-xl leading-relaxed mb-8">
              {PORTFOLIO_CONFIG.profile.bio}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-8">
              <a href="#projects" className="btn-primary">
                Explore projects
                <ArrowDown size={14} />
              </a>
              <a href="#feedback" className="btn-secondary">
                Leave feedback
                <ArrowUpRight size={14} className="text-[#cbfb45]" />
              </a>
            </div>

            {/* Current Focus Pill */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-sm bg-[#121318] border border-[#1e2029] font-mono text-xs text-[#9699a6]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#cbfb45] animate-pulse" />
              <span>Focus: {PORTFOLIO_CONFIG.profile.status}</span>
            </div>
          </div>

          {/* Right Column: Abstract Minimal System Diagram */}
          <div className="lg:col-span-5 w-full mt-2 lg:mt-0">
            <HeroDiagram />
          </div>
        </div>

        {/* Section Bottom Telemetry Bar */}
        <div className="pt-12 sm:pt-16 mt-8 sm:mt-12 border-t border-[#1e2029]/80 flex items-center justify-between text-xs font-mono text-[#626573]">
          <div className="flex items-center gap-2">
            <span>PORTFOLIO // RAJ</span>
            <span>·</span>
            <span>CSE AIML</span>
          </div>
          <a
            href="#about"
            className="flex items-center gap-1.5 text-[#9699a6] hover:text-[#cbfb45] transition-colors"
            aria-label="Scroll down to About section"
          >
            <span>Scroll to explore</span>
            <ArrowDown size={12} className="animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
