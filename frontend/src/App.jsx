import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import ProjectsSection from './sections/ProjectsSection';
import ToolkitSection from './sections/ToolkitSection';
import FeedbackSection from './sections/FeedbackSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0b0e] text-[#f5f5f3] flex flex-col font-sans selection:bg-[#cbfb45] selection:text-[#0b0c0f]">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main id="main-content" className="flex-1">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ToolkitSection />
        <FeedbackSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
