import React from 'react';
import { PORTFOLIO_CONFIG } from '../config/portfolio';
import FeedbackForm from '../components/FeedbackForm';
import { Database, ShieldCheck, Terminal, Server } from 'lucide-react';

export default function FeedbackSection() {
  return (
    <section id="feedback" className="section-wrapper" aria-labelledby="feedback-heading">
      <div className="container-custom">
        {/* Unified Section Header */}
        <div className="mb-10 sm:mb-12">
          <div className="section-number">04 — FEEDBACK</div>
          <h2
            id="feedback-heading"
            className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f5f5f3]"
          >
            {PORTFOLIO_CONFIG.feedback.heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Heading description and technical notes */}
          <div className="lg:col-span-5">
            <p className="text-base text-[#9699a6] leading-relaxed mb-8">
              {PORTFOLIO_CONFIG.feedback.subtext}
            </p>

            {/* Technical Backend Architecture Spec Card */}
            <div className="bg-[#0e0f14] border border-[#1e2029] p-5 rounded-sm font-mono text-xs">
              <div className="flex items-center gap-2 text-[#cbfb45] font-semibold text-[0.72rem] tracking-wider uppercase border-b border-[#181921] pb-2.5 mb-3.5">
                <Server size={14} />
                <span>Backend Architecture</span>
              </div>

              <div className="space-y-3.5 text-[0.75rem]">
                <div className="flex items-start gap-2.5 text-[#9699a6]">
                  <Database size={14} className="text-[#cbfb45] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#f5f5f3] font-medium block">SQLite Persistence</span>
                    <span>All entries are securely stored in parameterized SQL tables on the local disk.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-[#9699a6]">
                  <ShieldCheck size={14} className="text-[#cbfb45] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#f5f5f3] font-medium block">Security & Spam Guards</span>
                    <span>Honeypot trap, payload byte caps, and sliding-window rate limiting active.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-[#9699a6]">
                  <Terminal size={14} className="text-[#cbfb45] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#f5f5f3] font-medium block">Terminal Inspection</span>
                    <span>Developers can safely inspect rows locally via <code>view_feedback.py</code>.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Feedback Form */}
          <div className="lg:col-span-7">
            <FeedbackForm />
          </div>
        </div>
      </div>
    </section>
  );
}
