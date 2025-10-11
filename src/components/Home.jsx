'use client';
import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const handleScrollToCourses = (e) => {
    e.preventDefault();
    const section = document.getElementById('courses');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="Home"
      className="relative w-full min-h-[80vh] flex items-center justify-center"
      aria-label="Hero section – modern IELTS coaching"
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        src="/videos/hero-bg.mp4"
        className="absolute inset-0 w-full h-full object-cover brightness-125 z-0"
        poster="/poster.jpg"
        aria-hidden="true"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" aria-hidden="true" />

      {/* Hero Content - Two Column Layout */}
      <div className="relative z-20 flex flex-col md:flex-row max-w-4xl w-full px-4 sm:px-6 items-center justify-center text-white">
        {/* Logo Left */}
        <div className="flex-shrink-0 mb-8 md:mb-0 md:mr-10 md:pr-10 flex justify-center items-center">
          <img
            src="/img/logo.png"
            alt="GTC Academy Logo"
            className="w-64 h-64 sm:w-80 sm:h-80 object-contain"
            style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.25))' }}
            draggable={false}
          />
        </div>

        {/* Hero Text Right */}
        <div className="text-center md:text-left md:pl-8 flex-1 flex flex-col items-center md:items-start">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: 'spring' }}
            className="text-3xl sm:text-4xl md:text-4xl font-bold leading-tight mb-4 tracking-tight"
          >
            Achieve Your Future with <br />
            <span className="text-orange-400">Expert IELTS Coaching</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, type: 'spring' }}
            className="text-base sm:text-lg md:text-xl font-medium mb-8"
          >
            IELTS · PTE · Soft Skills · Spoken English <br />
            Personalized, proven support for every global dream.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, type: 'spring' }}
            className="flex flex-col sm:flex-row gap-4 items-center md:items-start justify-center md:justify-start"
          >
            <a
              href="#courses"
              onClick={handleScrollToCourses}
              className="bg-white/20 border border-orange-100 text-white px-7 py-3 rounded-full font-semibold text-lg shadow hover:bg-white/30 transition whitespace-nowrap"
              aria-label="View Courses"
            >
              View Courses
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
