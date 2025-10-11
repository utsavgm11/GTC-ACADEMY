'use client';

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const testimonials = [
  {
    img: "/img/testimonials-1.jpg",
    name: "Saniya Jain",
    text:
      "My IELTS journey with Nazia ma’am at GTC IELTS Academy was amazing! Her unique teaching style and constant guidance made learning easy and enjoyable. With her support, I achieved an overall band score of 7 (7.5, 7.5, 7, 6). Truly grateful for her mentorship—highly recommended!",
  },
  {
    img: "/img/testimonials-2.jpg",
    name: "Drishti Singhal",
    text:
      "Preparing for IELTS with Naazia ma’am at GTC IELTS Academy was an incredible experience. Her techniques and constant support made the exam feel easy and kept me motivated. I scored 7.5 overall and am deeply grateful to my mentor. Highly recommend this academy!",
  },
  {
    img: "/img/testimonials-3.jpg",
    name: "Darin Solanki",
    text:"Attending IELTS classes with Naazia ma’am was a game-changer! I scored an overall 7 band thanks to her clear teaching and constant support. Her feedback helped me improve quickly. Highly recommend GTC IELTS Academy!",
  },
  {
    img: "/img/testimonials-4.jpg",
    name: " Niki Modi",
    text:
      " Achieving an overall 6.5 band with Naazia ma’am at GTC IELTS Academy was a wonderful experience! 🌟 Her engaging teaching style and constant support made learning easy and motivating. Truly grateful for her guidance — highly recommend GTC to all IELTS aspirants! 👍",
  },
  {
    img: "/img/testimonials-5.jpg",
    name: "Shaurya Shetty",
    text:
      "Learning under Naazia ma’am at GTC IELTS Academy was an incredible experience. With her personalized guidance, I achieved an overall IELTS Band of 8.0 (9.0, 8.0, 7.0, 7.5). Her engaging teaching style and individual attention make learning enjoyable. Highly recommend GTC IELTS Academy!",
  },
];

const TestimonialsPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section 
      id="reviews"
      className="relative bg-white py-20 overflow-hidden"
    >
      {/* Heading and subheading */}
      <div className="max-w-4xl mx-auto text-center mb-12 px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-3 font-serif">
          GTC Academy Testimonials
        </h2>
        <p className="text-gray-500 text-lg font-medium font-sans">
          Hear how our students and clients excelled in IELTS and beyond with our guidance.
        </p>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 z-10">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            nextEl: ".custom-swiper-next",
            prevEl: ".custom-swiper-prev",
          }}
          pagination={{
            clickable: true,
            el: ".swiper-pagination",
          }}
          slidesPerView={3}
          centeredSlides={true}
          loop={true}
          spaceBetween={-60}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: -60,
            },
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="pt-6 pb-12"
          aria-label="Testimonials Slider"
        >
          {testimonials.map(({ img, name, role, text }, idx) => {
            const isActive = idx === activeIndex;
            return (
              <SwiperSlide
                key={idx}
                className="flex justify-center"
                style={{ zIndex: isActive ? 20 : 10 }}
              >
                <div
                  className={`flex flex-col items-center justify-center w-[410px] min-h-[340px] px-3 max-w-full text-center rounded-2xl shadow-xl transition-all duration-500
                    ${isActive
                      ? "bg-orange-50 text-slate-800 scale-105 shadow-orange-200"
                      : "bg-gray-100 text-gray-400 scale-95 opacity-70 backdrop-blur"
                    }`}
                  style={{
                    boxShadow: isActive
                      ? "0 8px 32px rgba(255,186,73,0.12)"
                      : "0 2px 8px rgba(150,150,150,0.09)"
                  }}
                >
                  <img
                    src={img}
                    alt={`${name} photo`}
                    loading="lazy"
                    className="w-16 h-16 mb-2 rounded-full object-cover border-2 border-orange-200"
                  />
                  <h3 className={`text-lg font-bold mb-0.5 ${isActive ? "text-orange-600" : "text-gray-500"}`}>
                    {name}
                  </h3>
                  {role && (
                    <h4 className={`text-xs mb-2 font-semibold ${isActive ? "text-slate-700" : "text-gray-400"}`}>
                      {role}
                    </h4>
                  )}
                  <p className={`${isActive ? "text-slate-700 italic" : "text-gray-500 italic"}`}>
                    “{text}”
                  </p>
                </div>
              </SwiperSlide>
            );
          })}
          <div className="swiper-pagination mt-8 text-center" aria-label="Testimonials pagination" />
        </Swiper>

        {/* Custom navigation buttons outside Swiper */}
        <button
          className="custom-swiper-prev absolute top-1/2 left-0 -translate-y-1/2 p-2 text-orange-400 hover:text-slate-800 focus:outline-none z-30"
          aria-label="Previous testimonial"
        >
          <FiChevronLeft size={34} />
        </button>
        <button
          className="custom-swiper-next absolute top-1/2 right-0 -translate-y-1/2 p-2 text-orange-400 hover:text-slate-800 focus:outline-none z-30"
          aria-label="Next testimonial"
        >
          <FiChevronRight size={34} />
        </button>
      </div>
    </section>
  );
};

export default TestimonialsPage;
