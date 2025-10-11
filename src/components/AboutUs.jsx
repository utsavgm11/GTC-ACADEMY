'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { GraduationCap, CalendarCheck, MessageSquare } from 'lucide-react';

const slides = [
  {
    src: '/img/about1.jpg',
    message: '5+ Years of Excellence in Tutoring'
  },
  {
    src: '/img/about2.jpg',
    message: 'Modern Facilities & Creative Learning'
  },
  {
    src: '/img/about3.jpg',
    message: 'Personalized Guidance from Experts'
  },
  {
    src: '/img/about4.jpg',
    message: 'Thousands of Successful Students'
  }
];

const imageVariant = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  exit: { opacity: 0, x: -60, transition: { duration: 0.6, ease: 'easeIn' } }
};

const textVariant = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay: 0.1 } },
  exit: { opacity: 0, y: 20, transition: { duration: 0.4, ease: 'easeIn' } }
};

const sectionVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: 'easeOut' } }
};

const AboutUs = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      id="about"
      className="max-w-7xl mx-auto py-20 px-4 sm:px-6 md:px-10 lg:px-16 bg-white rounded-2xl shadow-lg"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={sectionVariants}
    >
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-center">
        {/* LEFT: Carousel */}
        <div className="relative flex justify-center items-center w-full lg:w-1/2">
          <div className="relative w-full max-w-[440px] h-[260px] sm:h-[320px] md:h-[380px] lg:h-[440px] rounded-2xl overflow-hidden shadow-xl bg-indigo-50 flex items-center justify-center mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={slides[current].src}
                className="absolute inset-0"
                variants={imageVariant}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Image
                  src={slides[current].src}
                  alt={`About Slide ${current + 1}`}
                  fill
                  className="object-cover w-full h-full"
                  priority
                  sizes="(max-width: 1024px) 100vw, 440px"
                />
              </motion.div>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.div
                key={slides[current].message}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white bg-opacity-80 px-4 sm:px-6 py-2 sm:py-3 rounded-xl shadow text-sm sm:text-base font-semibold text-indigo-800 max-w-[90%] text-center"
                variants={textVariant}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {slides[current].message}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT: Info card & features */}
        <motion.div
          className="lg:w-2/5 w-full bg-indigo-50 p-2 sm:p-6 rounded-2xl shadow flex flex-col gap-3"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div>
            <span className="uppercase tracking-widest text-xs font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded mb-1 inline-block">
              About Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-2 font-serif text-slate-800">
              Our Academy <span className="text-orange-500">Inspires</span> Success.
            </h2>
            <p className="text-base sm:text-lg text-indigo-900 leading-relaxed">
              We are a passionate team of IELTS educators dedicated to helping students and professionals reach their language goals. Experience tailored guidance and modern learning environment with us.
            </p>
          </div>
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-white rounded-xl shadow-md p-4 flex items-center gap-2 hover:shadow-xl transition">
              <GraduationCap size={30} className="text-indigo-500 bg-indigo-100 p-2 rounded-full" />
              <div>
                <div className="text-lg font-semibold text-indigo-700">Expert Tutors</div>
                <div className="text-gray-600 text-sm">Certified IELTS professionals guiding your progress.</div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-4 flex items-center gap-2 hover:shadow-xl transition">
              <CalendarCheck size={30} className="text-pink-500 bg-pink-100 p-2 rounded-full" />
              <div>
                <div className="text-lg font-semibold text-pink-600">Flexible Schedules</div>
                <div className="text-gray-600 text-sm">Attend online/offline classes, whenever suits you.</div>
              </div>
            </div>
          </div>
          {/* Testimonial/Quote */}
          <motion.div
            className="bg-white rounded-xl p-4 shadow text-gray-700 flex flex-col gap-1 mt-2"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <MessageSquare size={20} className="text-orange-400 mb-1" />
            <div>
              “This academy provides expert guidance, materials, and support. My IELTS score improved much faster than I expected!”
            </div>
            <span className="text-gray-500 text-sm mt-1">— Satisfied Student</span>
          </motion.div>

          {/* CTA */}
          <div className="flex justify-center gap-2 mt-2">
            <button className="bg-orange-400 text-white font-bold px-4 py-2 rounded-xl shadow hover:bg-orange-500 transition">
              Call Us: +91 77387 06169
            </button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutUs;
