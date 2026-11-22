import React from 'react';
import { ArrowUpRight, Github, ExternalLink, Terminal, Cpu, Database } from 'lucide-react';

export default function ProjectCard({ project, index }) {
  const hasGithub = Boolean(project.githubUrl && project.githubUrl.trim());
  const hasDemo = Boolean(project.demoUrl && project.demoUrl.trim());

  if (project.layoutStyle === 'asymmetric-split') {
    return (
      <article
        className="surface-card p-6 md:p-8 border border-[#1e2029] hover:border-[#2f3240] transition-colors relative group"
        aria-labelledby={`project-title-${project.id}`}
      >
        {/* Full-width Card Header Bar */}
        <div className="flex items-center justify-between pb-3.5 mb-6 border-b border-[#181921]">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[#cbfb45] font-semibold tracking-wider">
              PROJECT_{project.number}
            </span>
            <span className="font-mono text-xs text-[#626573] hidden sm:inline">
              // {project.tagline}
            </span>
          </div>
          <span className="font-mono text-[0.68rem] px-2 py-0.5 rounded-sm bg-[#1a1b24] text-[#9699a6] border border-[#262835]">
            {project.status}
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-stretch">
          {/* Left Column: Details */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h3
                id={`project-title-${project.id}`}
                className="text-xl md:text-2xl font-bold text-[#f5f5f3] tracking-tight mb-2"
              >
                {project.name}
              </h3>

              <p className="text-sm text-[#9699a6] leading-relaxed mb-6">
                {project.description}
              </p>
            </div>

            <div>
              {/* Stack tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[0.7rem] px-2.5 py-1 bg-[#0d0e13] border border-[#1e2029] text-[#f5f5f3] rounded-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action buttons (only rendered if URLs are configured) */}
              {(hasGithub || hasDemo) && (
                <div className="flex items-center gap-3 pt-3 border-t border-[#1e2029]">
                  {hasGithub && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary text-xs"
                      aria-label={`View ${project.name} code on GitHub`}
                    >
                      <Github size={14} /> Code
                    </a>
                  )}
                  {hasDemo && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-xs"
                      aria-label={`View live demo of ${project.name}`}
                    >
                      <ExternalLink size={14} /> Live Demo
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Architectural preview box */}
          <div className="lg:w-[42%] bg-[#0a0b0e] border border-[#1e2029] p-4 rounded-sm flex flex-col justify-between font-mono">
            <div className="flex items-center justify-between text-[0.68rem] text-[#626573] border-b border-[#181921] pb-2 mb-3">
              <span>TOPOLOGY_MAP</span>
              <span className="text-[#cbfb45]">SYS.ACTIVE</span>
            </div>

            <div className="my-auto py-5 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-sm border border-[#2c2f3c] flex items-center justify-center text-[#cbfb45] mb-3">
                <Cpu size={22} />
              </div>
              <span className="text-xs text-[#f5f5f3] font-medium">Model Pipeline Diagram</span>
              <span className="text-[0.7rem] text-[#626573] mt-1 max-w-[200px]">
                Placeholder architectural schema to be configured with project assets
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#181921] text-[0.7rem]">
              {project.metrics.map((metric) => (
                <div key={metric.label}>
                  <span className="block text-[#626573] text-[0.65rem]">{metric.label}</span>
                  <span className="text-[#9699a6] font-medium">{metric.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>
    );
  }

  if (project.layoutStyle === 'spec-grid') {
    return (
      <article
        className="surface-card p-6 md:p-8 border border-[#1e2029] hover:border-[#2f3240] transition-colors relative"
        aria-labelledby={`project-title-${project.id}`}
      >
        <div className="flex items-center justify-between pb-3.5 mb-6 border-b border-[#181921]">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[#cbfb45] font-semibold tracking-wider">
              PROJECT_{project.number}
            </span>
            <span className="font-mono text-xs text-[#626573] hidden sm:inline">
              // {project.tagline}
            </span>
          </div>
          <span className="font-mono text-[0.68rem] px-2 py-0.5 rounded-sm bg-[#1a1b24] text-[#9699a6] border border-[#262835]">
            {project.status}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <h3
                id={`project-title-${project.id}`}
                className="text-xl md:text-2xl font-bold text-[#f5f5f3] tracking-tight mb-2"
              >
                {project.name}
              </h3>
              <p className="text-sm text-[#9699a6] leading-relaxed mb-6">
                {project.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[0.7rem] px-2.5 py-1 bg-[#0d0e13] border border-[#1e2029] text-[#f5f5f3] rounded-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Technical Data Sheet Table */}
          <div className="lg:col-span-5 bg-[#0a0b0e] border border-[#1e2029] p-4 rounded-sm font-mono text-xs">
            <div className="flex items-center gap-2 border-b border-[#181921] pb-2 mb-3 text-[#9699a6]">
              <Database size={14} className="text-[#cbfb45]" />
              <span className="text-[0.72rem] font-semibold">DATASHEET PARAMETERS</span>
            </div>
            <dl className="space-y-2.5">
              <div className="flex justify-between border-b border-[#14151b] pb-1.5">
                <dt className="text-[#626573]">Interface:</dt>
                <dd className="text-[#f5f5f3]">Async Event Webhooks</dd>
              </div>
              <div className="flex justify-between border-b border-[#14151b] pb-1.5">
                <dt className="text-[#626573]">State Management:</dt>
                <dd className="text-[#f5f5f3]">Decoupled Schema</dd>
              </div>
              <div className="flex justify-between border-b border-[#14151b] pb-1.5">
                <dt className="text-[#626573]">Concurrency:</dt>
                <dd className="text-[#f5f5f3]">Thread-safe pool</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#626573]">Deployment:</dt>
                <dd className="text-[#cbfb45]">Pending Configuration</dd>
              </div>
            </dl>
          </div>
        </div>

        {(hasGithub || hasDemo) && (
          <div className="flex items-center gap-3 pt-5 mt-6 border-t border-[#1e2029]">
            {hasGithub && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-xs"
              >
                <Github size={14} /> Code
              </a>
            )}
            {hasDemo && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs"
              >
                <ExternalLink size={14} /> Live Demo
              </a>
            )}
          </div>
        )}
      </article>
    );
  }

  // Style 3: terminal-log
  return (
    <article
      className="surface-card p-6 md:p-8 border border-[#1e2029] hover:border-[#2f3240] transition-colors relative"
      aria-labelledby={`project-title-${project.id}`}
    >
      <div className="flex items-center justify-between pb-3.5 mb-6 border-b border-[#181921]">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-[#cbfb45]" />
          <span className="font-mono text-xs text-[#cbfb45] font-semibold tracking-wider">
            PROJECT_{project.number}
          </span>
          <span className="font-mono text-xs text-[#626573] hidden sm:inline">
            // {project.tagline}
          </span>
        </div>
        <span className="font-mono text-[0.68rem] px-2 py-0.5 rounded-sm bg-[#1a1b24] text-[#9699a6] border border-[#262835]">
          {project.status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div>
            <h3
              id={`project-title-${project.id}`}
              className="text-xl md:text-2xl font-bold text-[#f5f5f3] tracking-tight mb-2"
            >
              {project.name}
            </h3>
            <p className="text-sm text-[#9699a6] leading-relaxed mb-6">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[0.7rem] px-2.5 py-1 bg-[#0d0e13] border border-[#1e2029] text-[#f5f5f3] rounded-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Minimalist Terminal Output Box */}
        <div className="lg:col-span-6 bg-[#07080a] border border-[#1e2029] p-4 rounded-sm font-mono text-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[0.65rem] text-[#626573] border-b border-[#181921] pb-2 mb-2">
            <span>TERMINAL_OUTPUT // STDOUT</span>
            <span className="text-[#cbfb45]">EXIT: 0</span>
          </div>
          <pre className="text-[0.72rem] text-[#9699a6] overflow-x-auto leading-relaxed py-1.5">
            <code>
              <span className="text-[#cbfb45]">$</span> compile --opt=level3 --target=native{'\n'}
              <span className="text-[#626573]">[INFO]</span> Vectorization pass complete: 4 lanes{'\n'}
              <span className="text-[#626573]">[INFO]</span> Cache miss rate: 0.04%{'\n'}
              <span className="text-[#cbfb45]">[SUCCESS]</span> Benchmark verification passed
            </code>
          </pre>
          <div className="pt-2 border-t border-[#181921] flex items-center justify-between text-[0.65rem] text-[#626573]">
            <span>THREAD_POOL: 8</span>
            <span>LATENCY: 0.84ms</span>
          </div>
        </div>
      </div>

      {(hasGithub || hasDemo) && (
        <div className="flex items-center gap-3 pt-5 mt-6 border-t border-[#1e2029]">
          {hasGithub && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-xs"
            >
              <Github size={14} /> Code
            </a>
          )}
          {hasDemo && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs"
            >
              <ExternalLink size={14} /> Live Demo
            </a>
          )}
        </div>
      )}
    </article>
  );
}
