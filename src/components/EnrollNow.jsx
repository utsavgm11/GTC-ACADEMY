'use client';

import React, { useRef, useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, X } from 'lucide-react';

const modalVariants = {
  hidden: { opacity: 0, scale: 0.97, y: 40 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.97, y: 40 },
};

const EnrollNowModal = ({ isOpen, onClose }) => {
  const form = useRef();
  const modalRef = useRef();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  // Close on ESC key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Close on clicking outside modal content
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.current) return;

    // Find first invalid input and focus/scroll it
    const firstInvalid = form.current.querySelector(':invalid');
    if (firstInvalid) {
      firstInvalid.focus();
      firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setLoading(true);
    setSuccess(null);

    const formData = new FormData(form.current);
    const formBody = new URLSearchParams();
    formData.forEach((value, key) => {
      formBody.append(key, value);
    });

    try {
      const res = await fetch('/api/saveForm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formBody.toString(),
      });
      if (!res.ok) throw new Error('Unable to submit form');

      setSuccess('✅ Enrollment request submitted successfully!');
      form.current.reset();
    } catch (error) {
      console.error(error);
      setSuccess('❌ Error submitting request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.28 }}
      >
        <motion.section
          id="enroll-now-modal"
          ref={modalRef}
          className="relative max-w-md w-full mx-auto bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-orange-300 flex flex-col"
          style={{ maxHeight: '70vh' }}
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <button
            aria-label="Close modal"
            onClick={onClose}
            className="absolute top-5 right-5 text-gray-500 hover:text-orange-600 text-2xl font-bold transition"
            tabIndex={0}
          >
            <X size={28} />
          </button>

          <h2 className="text-3xl font-extrabold text-center mb-6 text-orange-700 font-Ovo">
            Enroll Now
          </h2>

          <form
            ref={form}
            onSubmit={handleSubmit}
            className="space-y-5 overflow-y-auto"
            style={{ maxHeight: 'calc(70vh - 80px)' }}
          >
            <div>
              <label htmlFor="name" className="block mb-2 font-semibold text-orange-700 text-base">
                Name<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="user_name"
                required
                placeholder="Your full name"
                className="w-full rounded-lg px-4 py-2 border border-orange-300 bg-orange-50 text-gray-800 focus:ring-2 focus:ring-orange-600 transition-shadow"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 font-semibold text-orange-700 text-base">
                Email<span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="user_email"
                required
                placeholder="your.email@example.com"
                className="w-full rounded-lg px-4 py-2 border border-orange-300 bg-white text-gray-800 focus:ring-2 focus:ring-pink-400 transition-shadow"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block mb-2 font-semibold text-orange-700 text-base">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="user_phone"
                placeholder="+91 98765 43210"
                className="w-full rounded-lg px-4 py-2 border border-orange-300 bg-orange-50 text-gray-800 focus:ring-2 focus:ring-blue-400 transition-shadow"
              />
            </div>

            <div>
              <label htmlFor="preferredCourses" className="block mb-2 font-semibold text-orange-700 text-base">
                Preferred Course
              </label>
              <select
                id="preferredCourses"
                name="preferred_courses"
                defaultValue=""
                className="w-full rounded-lg px-4 py-2 border border-orange-300 bg-white text-gray-800 focus:ring-2 focus:ring-green-400 transition-shadow"
              >
                <option value="" disabled>
                  Select a course
                </option>
                <option value="IELTS Academic Training">IELTS Academic Training</option>
                <option value="IELTS General Training">IELTS General Training</option>
                <option value="Crash Course (4 Weeks)">Crash Course (4 Weeks)</option>
                <option value="One-on-One Coaching">One-on-One Coaching</option>
                <option value="Mock Test + Feedback Package">Mock Test + Feedback Package</option>
                <option value="PTE">PTE</option>
                <option value="Soft Skills">Soft Skills</option>
                <option value="Spoken English">Spoken English</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block mb-2 font-semibold text-orange-700 text-base">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                defaultValue="Hi GTC Academy, I would like to enroll now."
                className="w-full rounded-lg px-4 py-2 border border-orange-300 bg-orange-50 text-gray-800 resize-none focus:ring-2 focus:ring-orange-600 transition-shadow"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-orange-600 text-white rounded-lg px-6 py-2 font-semibold shadow-md transition hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>

              <a
                href= "https://wa.me/917738706169?text=Hi%20GTC%20Academy%2C%20I%E2%80%99d%20like%20to%20know%20more%20about%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="flex items-center gap-2 text-orange-700 hover:text-orange-900 font-semibold text-base"
              >
                <FaWhatsapp size={22} />
                Chat on WhatsApp
              </a>
            </div>
          </form>

          <div className="mt-8 flex flex-col gap-4 max-w-md mx-auto p-5 border border-orange-300 rounded-xl bg-white shadow-lg text-center text-orange-700 font-semibold text-base">
            <div className="flex items-center justify-center gap-3">
              <Phone size={24} className="text-orange-600" />
              <a href="tel:+919819196169" className="underline hover:text-orange-800 transition">
                +91 77387 06169
              </a>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Mail size={24} className="text-orange-600" />
              <a href="mailto:gardenercommerce@gmail.com" className="underline hover:text-orange-800 transition">
                gardenercommerce@gmail.com
              </a>
            </div>
          </div>

          {success && (
            <p
              className={`mt-4 text-center font-bold ${
                success.includes('✅') ? 'text-green-600' : 'text-red-600'
              } text-base`}
            >
              {success}
            </p>
          )}
        </motion.section>
      </motion.div>
    </AnimatePresence>
  );
};

export default EnrollNowModal;
