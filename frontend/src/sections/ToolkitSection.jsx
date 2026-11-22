import React from 'react';
import { PORTFOLIO_CONFIG } from '../config/portfolio';
import { Code2, Globe, Wrench } from 'lucide-react';

const CATEGORY_ICONS = {
  Programming: Code2,
  Web: Globe,
  Tools: Wrench,
};

export default function ToolkitSection() {
  return (
    <section id="toolkit" className="section-wrapper" aria-labelledby="toolkit-heading">
      <div className="container-custom">
        {/* Unified Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <div className="section-number">03 — TOOLKIT</div>
            <h2
              id="toolkit-heading"
              className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f5f5f3]"
            >
              Technologies & tools.
            </h2>
          </div>
          <p className="font-mono text-xs text-[#9699a6] max-w-sm">
            Core stack currently used in coursework, systems experiments, and practical application
            development. No arbitrary percentage bars—just honest competencies.
          </p>
        </div>

        {/* Categories Grid: Equal height and aligned footers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PORTFOLIO_CONFIG.toolkit.categories.map((category) => {
            const IconComponent = CATEGORY_ICONS[category.name] || Code2;
            return (
              <div
                key={category.name}
                className="surface-card p-6 md:p-7 border border-[#1e2029] hover:border-[#2f3240] transition-colors flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 rounded-sm bg-[#151720] border border-[#232635] text-[#cbfb45]">
                      <IconComponent size={18} />
                    </div>
                    <span className="font-mono text-[0.68rem] text-[#626573] uppercase tracking-wider">
                      {category.skills.length} TECHNOLOGIES
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#f5f5f3] tracking-tight mb-2">
                    {category.name}
                  </h3>

                  <p className="text-xs text-[#9699a6] mb-6 leading-relaxed">
                    {category.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#181921]">
                  <ul className="flex flex-wrap gap-2" aria-label={`${category.name} skills`}>
                    {category.skills.map((skill) => (
                      <li
                        key={skill}
                        className="font-mono text-xs px-3 py-1.5 bg-[#0a0b0e] border border-[#1e2029] text-[#f5f5f3] rounded-sm hover:border-[#cbfb45]/50 transition-colors"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
