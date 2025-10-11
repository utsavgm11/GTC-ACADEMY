'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

const cardBg = [
  'bg-[#f3edfa]', 'bg-[#e7f6fa]', 'bg-[#fdece4]', 'bg-[#eafbee]',
  'bg-[#fff7e9]', 'bg-[#e2f1ff]', 'bg-[#fff1f5]', 'bg-[#f8ffe5]'
];
const accent = 'text-[#9d7bd8]';

const courses = [
  { title: 'IELTS Academic Training', imageSrc: '/img/ielts-academic.png', points: ['Ideal for university admissions or professional licensing', 'Intensive reading, writing, speaking, listening preparation', 'Weekly mock tests with feedback'] },
  { title: 'IELTS General Training', imageSrc: '/img/ielts-general.png', points: ['Tailored for immigration and work', 'Practical English for everyday use', 'Letters, essays & general topics in-depth'] },
  { title: 'Crash Course (4 Weeks)', imageSrc: '/img/ielts-crash.png', points: ['Fast-track last-minute preparation', 'Daily lessons & mock tests', 'Quick score boost tips'] },
  { title: 'One-on-One Coaching', imageSrc: '/img/one-on-one.png', points: ['Personalized coaching for weaknesses', 'Flexible timing & customized plans'] },
  { title: 'Mock Test + Feedback Package', imageSrc: '/img/mock-test.png', points: ['Real IELTS test simulation', 'Band estimation & detailed report'] },
  { title: 'Person Test of English', imageSrc: '/img/pte.png', points: ['Person Test of English preparation', 'Speaking, writing, reading, listening modules'] },
  { title: 'Soft Skills', imageSrc: '/img/soft-skills.png', points: ['Communication & workplace skills', 'Public speaking & interview training'] },
  { title: 'Spoken English', imageSrc: '/img/spoken-english.png', points: ['Fluency & confidence training', 'Daily & professional conversation skills'] }
];

const CARD_WIDTH = 264;

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 30 },
  visible: i => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.09, duration: 0.6 }
  })
};

const FeaturedCourses = () => {
  const scrollRef = useRef();
  const [current, setCurrent] = useState(0);

  const scrollTo = idx => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: idx * CARD_WIDTH, behavior: 'smooth' });
      setCurrent(idx);
    }
  };

  const onScroll = e => setCurrent(Math.round(e.target.scrollLeft / CARD_WIDTH));

  return (
    <>
      <motion.section
        id="courses"
        className="bg-white py-12 px-2 sm:px-6 w-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={sectionVariants}
      >
        <div className="max-w-7xl mx-auto mb-6">
          <div className="text-center text-[#b7a1dd] uppercase text-xs tracking-widest mb-2">Find a Course</div>
          <h2 className="text-[#473056] text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-3 font-serif">
            Featured Courses
          </h2>
          <div className="mx-auto h-[3px] w-12 bg-[#e7f6fa] rounded mb-8" />
        </div>
        <div className="max-w-7xl mx-auto relative">
          {/* Navigation icons - only on mobile */}
          <div className="flex justify-end mb-2 pr-2 lg:hidden">
            <button
              onClick={() => scrollTo(Math.max(current - 1, 0))}
              aria-label="Scroll left"
              className="inline-flex items-center mr-2 p-2 rounded-full bg-[#f0d8ff] bg-opacity-75 text-[#9466d7] hover:bg-opacity-100 transition"
              disabled={current === 0}
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={() => scrollTo(Math.min(current + 1, courses.length - 1))}
              aria-label="Scroll right"
              className="inline-flex items-center p-2 rounded-full bg-[#f0d8ff] bg-opacity-75 text-[#9466d7] hover:bg-opacity-100 transition"
              disabled={current === courses.length - 1}
            >
              <ChevronRight size={22} />
            </button>
          </div>
          {/* Card grid and scroll logic */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto md:grid gap-4 md:gap-8 snap-x scroll-smooth pb-6 no-scrollbar courses-grid"
            onScroll={onScroll}
            style={{ scrollBehavior: 'smooth' }}
          >
            {courses.map((course, idx) => (
              <motion.div
                key={course.title}
                className={`snap-center flex-shrink-0 w-[240px] md:w-[264px] rounded-2xl shadow-xl p-4 flex flex-col items-center cursor-pointer transition duration-300 ${cardBg[idx % cardBg.length]}`}
                custom={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.75 }}
                variants={cardVariants}
                whileHover={{
                  scale: 1.07,
                  boxShadow: "0 8px 28px #bbb9ee60",
                  transition: { duration: 0.22 }
                }}
              >
                <div className="w-[88%] aspect-square mb-3 rounded-xl shadow-md overflow-hidden border border-[#ece0f6]">
                  <Image
                    src={course.imageSrc}
                    alt={course.title}
                    width={210}
                    height={210}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className={`${accent} text-base font-bold mb-2 text-center`}>
                  {course.title}
                </div>
                <ul className="text-[#473056] text-xs sm:text-sm flex flex-col gap-2 mb-2 mt-2">
                  {course.points.map((pt, pi) => (
                    <li key={pi} className="flex gap-2 items-start justify-start">
                      <CheckCircle size={15} className="text-[#b7a1dd] mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          {/* Dots - only on mobile */}
          <div className="flex justify-center mt-1 lg:hidden">
            {courses.map((_, idx) => (
              <span
                key={idx}
                className={`mx-1 h-2 w-2 rounded-full inline-block ${
                  idx === current ? 'bg-[#b7a1dd]' : 'bg-[#e7f6fa] bg-opacity-50'
                } transition-all`}
              />
            ))}
          </div>
        </div>
        
      </motion.section>
      <style jsx>{`
        @media (min-width: 768px) and (max-width: 1110px) {
          .courses-grid {
            display: grid !important;
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          }
          .courses-grid.flex {
            overflow-x: visible !important;
          }
        }
        @media (min-width: 1111px) {
          .courses-grid {
            display: grid !important;
            grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
          }
        }

        /* Hide scrollbar for all */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
};

export default FeaturedCourses;
