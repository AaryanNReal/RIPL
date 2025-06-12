import React from 'react';
import HeroCarousel from "@/components/Hero/page";
import ProjectsGrid from '@/components/Project/page';
import { AboutUs } from '@/components/About/page';
import { ContactInfo } from '@/components/Contact/page';

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Simple Background with Oakwood and Ashwood Shades */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-stone-100"></div>
      
      {/* Main Content */}
      <div className="relative z-10">
        <section id="home">
          <HeroCarousel />
        </section>
        
        <section id="projects">
          <ProjectsGrid />
        </section>
        
        <section id="about">
          <AboutUs />
        </section>
        
        <section id="contact">
          <ContactInfo />
        </section>
      </div>
    </div>
  );
}