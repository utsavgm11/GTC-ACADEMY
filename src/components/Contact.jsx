'use client';

import React, { useState, useRef } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Phone, Mail } from 'lucide-react'; 

const ContactUs = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
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

      setSuccess('✅ Response submitted successfully!');
      form.current.reset();
    } catch (error) {
      console.error(error);
      setSuccess('❌ Error submitting response. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      id="contact"
      className="relative w-full py-6 px-4 sm:px-6"
      aria-label="Contact Us"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Pastel background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-pink-50 via-blue-50 to-orange-50 -z-10 blur-lg opacity-80" />
      <div className="max-w-xl mx-auto bg-white/80 rounded-2xl p-5 sm:p-6 shadow-2xl">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-5 text-blue-900">
          Contact Us
        </h2>
        <form ref={form} onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block mb-1 font-semibold text-blue-900 text-sm sm:text-base"
            >
              Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="user_name"
              required
              className="w-full rounded-md px-3 py-2 border border-blue-100 bg-pink-50 text-gray-900 text-sm sm:text-base focus:ring-2 focus:ring-orange-400 transition-shadow"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-1 font-semibold text-blue-900 text-sm sm:text-base"
            >
              Email<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="user_email"
              required
              className="w-full rounded-md px-3 py-2 border border-blue-100 bg-blue-50 text-gray-900 text-sm sm:text-base focus:ring-2 focus:ring-pink-400 transition-shadow"
              placeholder="your.email@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block mb-1 font-semibold text-blue-900 text-sm sm:text-base"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="user_phone"
              className="w-full rounded-md px-3 py-2 border border-blue-100 bg-orange-50 text-gray-900 text-sm sm:text-base focus:ring-2 focus:ring-blue-400 transition-shadow"
              placeholder="+91 77387 06169"
            />
          </div>

<div>
  <label
    htmlFor="preferredCourse"
    className="block mb-1 font-semibold text-blue-900 text-sm sm:text-base"
  >
    Preferred Course
  </label>
  <select
    id="preferredCourse"
    name="preferred_courses"
    className="w-full rounded-md px-3 py-2 border border-blue-100 bg-green-50 focus:ring-green-400 text-gray-900 text-sm sm:text-base focus:ring-2  transition-shadow"
    defaultValue=""
    required
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
            <label
              htmlFor="message"
              className="block mb-1 font-semibold text-blue-900 text-sm sm:text-base"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              defaultValue="Hi GTC Academy, I would like to get in touch with you."
              rows={2}
              className="w-full rounded-md px-3 py-2 border border-blue-100 bg-pink-50 text-gray-900 text-sm sm:text-base focus:ring-2 focus:ring-orange-400 transition-shadow resize-none"
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className="bg-orange-400 text-white rounded-md shadow-md px-5 py-2 font-semibold transition-all hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              {loading ? 'Sending...' : 'Submit'}
            </button>
            <a
              href="https://wa.me/917738706169?text=Hi%20GTC%20Academy%2C%20I%E2%80%99d%20like%20to%20know%20more%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="flex items-center gap-2 text-blue-700 hover:text-orange-600 font-semibold text-sm sm:text-base"
            >
              <FaWhatsapp size={20} />
              Chat on WhatsApp
            </a>
          </div>
          {success && (
            <p
              className={`mt-3 text-center font-bold ${
                success.includes('✅') ? 'text-green-500' : 'text-red-500'
              } text-sm sm:text-base`}
            >
              {success}
            </p>
          )}
        </form>
        {/* Contact info underneath the form */}
<div className="mt-6 flex flex-col justify-center items-center gap-4 bg-pink-50 bg-opacity-70 shadow-lg rounded-xl p-4 max-w-md mx-auto text-[#473056] font-semibold text-sm sm:text-base">
  <div className="flex items-center gap-2">
    <Phone size={20} className="text-[#e37bbd]" />
    <a href="tel:+917738706169" className="underline hover:text-pink-600 transition">
      +91 7738706169
    </a>
  </div>
  <div className="flex items-center gap-2">
    <Mail size={20} className="text-[#6b4eb6]" />
    <a href="mailto:gardenercommerce@gmail.com" className="underline hover:text-purple-600 transition">
      gardenercommerce@gmail.com
    </a>
  </div>
</div>

      </div>
    </motion.section>
  );
};

export default ContactUs;
