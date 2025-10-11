'use client';

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/Home";
import AboutUs from "@/components/AboutUs";
import ContactUs from "@/components/Contact";
import Footer from "@/components/Footer";
import TestimonialsPage from "@/components/Testimonials";
import WhyChooseUs from "@/components/WhyChooseUs";
import FeaturedCourses from "@/components/Courses";

export default function Home() {

  // 👇 Define enroll click function here
  const onEnrollClick = () => {
    // Yeh enroll form tak smooth scroll karega
    document.getElementById('enroll')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* 👇 Pass the function as prop */}
      <Navbar onEnrollClick={onEnrollClick} />
      
      <HeroSection />
      <FeaturedCourses />
      <AboutUs />
      <WhyChooseUs />
      <TestimonialsPage />
      <ContactUs />
      <Footer />
    </>
  );
}
