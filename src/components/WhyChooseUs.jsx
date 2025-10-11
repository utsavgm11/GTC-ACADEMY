'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, CalendarCheck, BarChart2 } from 'lucide-react';

const features = [
  {
    icon: <GraduationCap size={36} className="text-indigo-600" />,
    title: 'Personalized Guidance',
    desc: 'Individual learning plans and expert support every step of the way.',
  },
  {
    icon: <BookOpen size={36} className="text-pink-500" />,
    title: 'Certified IELTS Experts',
    desc: 'Learn from tutors with a track record of top IELTS results.',
  },
  {
    icon: <CalendarCheck size={36} className="text-blue-500" />,
    title: 'Flexible & Accessible',
    desc: 'Attend sessions online or offline at times that suit your schedule.',
  },
  {
    icon: <BarChart2 size={36} className="text-green-600" />,
    title: 'Proven Results',
    desc: 'Thousands of students have reached their English goals with us.',
  },
];

const WhyChooseUs = () => (
  <section className="bg-white py-16 px-5 md:px-14">
    <motion.div
      className="text-center mb-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <h2 className="text-4xl font-extrabold font-serif text-slate-800 mb-3">
        Why Choose GTC Academy?
      </h2>
      <p className="text-lg font-medium font-sans text-gray-500">
        Achieve your IELTS and English goals with expert guidance, proven methods, and flexible learning.
      </p>
    </motion.div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
      {features.map((feat, i) => (
        <motion.div
          key={i}
          className="bg-white rounded-xl p-8 shadow-md flex flex-col items-center text-center transition-transform hover:-translate-y-2 hover:shadow-xl border border-gray-100"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + i * 0.15, duration: 0.7, ease: 'easeOut' }}
        >
          {feat.icon}
          <div className="mt-3 mb-2 text-xl font-semibold">{feat.title}</div>
          <div className="text-gray-600 text-sm">{feat.desc}</div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default WhyChooseUs;
