import React from 'react';
import { PORTFOLIO_CONFIG } from '../config/portfolio';
import { GraduationCap, Brain, User, MapPin } from 'lucide-react';

export default function AboutSection() {
  const infoItems = [
    {
      icon: GraduationCap,
      label: 'Degree',
      value: PORTFOLIO_CONFIG.profile.degree,
    },
    {
      icon: Brain,
      label: 'Specialization',
      value: PORTFOLIO_CONFIG.profile.specialization,
    },
    {
      icon: User,
      label: 'Role',
      value: PORTFOLIO_CONFIG.profile.role,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: PORTFOLIO_CONFIG.profile.location,
    },
  ];

  return (
    <section id="about" className="section-wrapper" aria-labelledby="about-heading">
      <div className="container-custom">
        {/* Unified Section Header */}
        <div className="mb-10 sm:mb-12">
          <div className="section-number">
            {PORTFOLIO_CONFIG.about.sectionNumber}
          </div>
          <h2
            id="about-heading"
            className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f5f5f3]"
          >
            {PORTFOLIO_CONFIG.about.heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Narrative */}
          <div className="lg:col-span-7">
            <div className="space-y-4 text-base sm:text-lg text-[#9699a6] leading-relaxed">
              {PORTFOLIO_CONFIG.about.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Philosophy Note */}
            <div className="mt-8 p-4 bg-[#121318] border-l-2 border-[#cbfb45] text-xs font-mono text-[#9699a6] rounded-r-sm">
              <span className="text-[#cbfb45] font-semibold block mb-1">
                // LEARNING APPROACH
              </span>
              Emphasizing foundational data structures, clean API design, and verifiable
              mathematical principles behind modern neural networks.
            </div>
          </div>

          {/* Right Column: Compact Info Specification */}
          <div className="lg:col-span-5 bg-[#0e0f14] border border-[#1e2029] p-6 rounded-sm">
            <div className="font-mono text-xs text-[#626573] border-b border-[#181921] pb-3 mb-5 uppercase tracking-wider">
              Profile Metadata
            </div>

            <dl className="space-y-4">
              {infoItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-start gap-3.5 pb-4 border-b border-[#161720] last:border-0 last:pb-0"
                  >
                    <div className="p-2 rounded-sm bg-[#151720] border border-[#232635] text-[#cbfb45] shrink-0">
                      <IconComponent size={16} />
                    </div>
                    <div>
                      <dt className="font-mono text-xs text-[#626573]">{item.label}</dt>
                      <dd className="text-sm font-medium text-[#f5f5f3] mt-0.5">
                        {item.value}
                      </dd>
                    </div>
                  </div>
                );
              })}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
