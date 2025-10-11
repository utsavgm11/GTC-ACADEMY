'use client';

import React, { useState } from "react";

const Footer = () => {
  const [hoveredLink, setHoveredLink] = useState(null);

  // Important Links
  const importantLinks = [
    { name: "About GTC", href: "#about" },
    { name: "Courses Offered", href: "#courses" },
    { name: "IELTS Success Stories", href: "#reviews" },
    { name: "Contact Us", href: "#contact" },
  ];

  // Socials (array of objects, no nesting)
  const socialLinks = [
    {
      name: "WhatsApp",
      href: "https://wa.me/917738706169?text=Hi%20GTC%20Academy%2C%20I%E2%80%99d%20like%20to%20know%20more%20about%20your%20services.",
      target: "_blank",
      iconSrc: "/img/whatsapp white.svg",
    },
    {
      name: "Gmail",
      href: "mailto:gardenercommerce@gmail.com",
      iconSrc: "/img/gmail white.svg",
    },
  ];

  const handleScroll = (href, index, e) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const id = href.replace("#", "");
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        setHoveredLink(index);
      }
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-indigo-900 via-blue-950 to-blue-900 text-white select-none mt-16 shadow-2xl">
      {/* Background overlays */}
      <div className="absolute inset-0 bg-gradient-to-tl from-blue-900 via-blue-800 to-indigo-900 opacity-80" aria-hidden="true" />
      <div className="absolute inset-0 bg-black bg-opacity-30" aria-hidden="true" />

      {/* Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Branding Section */}
        <div className="flex flex-col space-y-3 max-w-xs">
          <div className="flex items-center space-x-3">
            <img
              src="/img/logo.png"
              alt="GTC Academy Logo"
              className="w-40 h-40 object-contain select-none"
              draggable={false}
            />
          </div>
          <p className="italic text-gray-200 text-sm sm:text-base">
            Master IELTS with India's top online tutors
          </p>
          <p className="text-gray-400 text-xs sm:text-sm max-w-[320px]">
            Expert guidance, tailored preparation, and proven strategies for the highest IELTS band scores—100% online and flexible.
          </p>
        </div>

        {/* Important Links */}
        <div>
          <h3 className="mb-4 text-xl sm:text-2xl font-semibold border-b-2 border-orange-500 pb-2">
            Quick Links
          </h3>
          <ul className="space-y-2 sm:space-y-3">
            {importantLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className={`cursor-pointer font-medium text-base sm:text-lg transition-colors duration-200 ${
                    hoveredLink === index ? "text-orange-400 underline" : "text-white hover:text-orange-300"
                  }`}
                  onClick={(e) => handleScroll(link.href, index, e)}
                  onMouseEnter={() => setHoveredLink(index)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="mb-4 text-xl sm:text-2xl font-semibold border-b-2 border-orange-500 pb-2">
            Connect with Us
          </h3>
          <div className="flex items-center space-x-6">
            {socialLinks.map(({ name, href, iconSrc }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="hover:scale-110 transition-transform"
              >
                <img
                  src={iconSrc}
                  alt={name}
                  className="w-8 h-8 select-none"
                  draggable={false}
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-3 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-gray-300 text-xs sm:text-sm space-y-2 md:space-y-0">
        <p>© {new Date().getFullYear()} GTC ACADEMY. All rights reserved.</p>
        <a
          href="https://utsav-portfolio-puce-alpha-42.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-gray-300 hover:text-orange-400 transition-colors duration-300"
          aria-label="Designed and developed by Utsav Mahyawanshi"
        >
          <img
            src="/img/Utsav white.png"
            alt="Utsav Logo"
            className="w-10 h-10 select-none"
            draggable={false}
          />
          <span className="text-xs sm:text-sm">Designed & Developed by Utsav Mahyawanshi</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
