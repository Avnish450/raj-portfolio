import React from 'react';
import { PORTFOLIO_CONFIG } from '../config/portfolio';
import ProjectCard from '../components/ProjectCard';

export default function ProjectsSection() {
  return (
    <section id="projects" className="section-wrapper" aria-labelledby="projects-heading">
      <div className="container-custom">
        {/* Unified Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <div className="section-number">02 — SELECTED WORK</div>
            <h2
              id="projects-heading"
              className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f5f5f3]"
            >
              A few things I've explored.
            </h2>
          </div>
          <p className="font-mono text-xs text-[#9699a6] max-w-sm">
            Curated architectural experiments and development projects. Editable placeholders ready
            for customized project documentation.
          </p>
        </div>

        {/* Project Cards Stack */}
        <div className="space-y-8">
          {PORTFOLIO_CONFIG.projects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
