'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react'
import Image from 'next/image'
import { motion, useAnimation } from 'framer-motion'
import EnrollNowModal from './EnrollNow' // Adjust the path as needed

const SECTIONS = [
  { id: 'Home', label: 'Home' },
  { id: 'courses', label: 'Courses' },
  { id: 'about', label: 'About' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'contact', label: 'Contact' }
]

const Navbar = () => {
  const [isScroll, setIsScroll] = useState(false)
  const [activeSection, setActiveSection] = useState('top')
  const [showModal, setShowModal] = useState(false)
  const sideMenuRef = useRef()
  const controls = useAnimation()

  const openMenu = () => {
    sideMenuRef.current.style.transform = 'translateX(-16rem)'
  }

  const closeMenu = () => {
    sideMenuRef.current.style.transform = 'translateX(16rem)'
  }

  const scrollToSection = (id) => (e) => {
    e.preventDefault()
    const sectionId = id === 'top' ? 'top' : id
    const section =
      sectionId === 'top'
        ? document.documentElement
        : document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
      closeMenu()
    }
  }

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setActiveSection(entry.target.id === '' ? 'top' : entry.target.id)
          }
        })
      },
      { rootMargin: '-64px 0px 0px 0px', threshold: 0.5 }
    )

    SECTIONS.forEach(({ id }) => {
      const el =
        id === 'top'
          ? document.documentElement
          : document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onScroll = () => setIsScroll(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (isScroll) {
      controls.start({
        y: 0,
        opacity: 1,
        boxShadow: '0 2px 8px rgb(36 54 92 / 0.08)',
        backdropFilter: 'blur(8px)',
      })
    } else {
      controls.start({
        y: -30,
        opacity: 0.98,
        boxShadow: '0 0px 0px transparent',
        backdropFilter: 'none',
      })
    }
  }, [isScroll, controls])

  return (
    <>
      {/* Sparkle Effect */}
      <div className="fixed top-0 left-0 w-full flex items-center pl-8 pt-2 -z-10 pointer-events-none">
        <Sparkles size={36} color="#c7d2fe" />
      </div>

      {/* Navbar */}
      <motion.nav
        className={`w-full fixed px-3 md:px-6 lg:px-12 xl:px-[8%] py-4 flex items-center justify-between z-50 ${
          isScroll ? 'bg-blue-90 bg-opacity-90 backdrop-blur-lg' : ''
        }`}
        initial={{ y: -30, opacity: 0.98 }}
        animate={controls}
        transition={{ type: 'spring', stiffness: 60, damping: 14 }}
      >
        <a href="#top" className="block">
          <Image
            src="/img/logo.png"
            alt="GTC Academy Logo"
            className="cursor-pointer mr-4 w-24 md:w-32 lg:w-36 pt-4"
            width={110}
            height={38}
          />
        </a>

        {/* Desktop Menu */}
        <ul
          className={`hidden md:flex items-center gap-4 md:gap-6 lg:gap-8 rounded-full px-3 md:px-6 lg:px-12 py-2 ${
            !isScroll ? 'bg-white/60 shadow-sm' : ''
          }`}
        >
          {SECTIONS.map(({ id, label }) => (
            <li key={id} className="relative py-1">
              <a
                href={`#${id}`}
                onClick={scrollToSection(id)}
                className={`font-Ovo px-3 py-3 transition text-base ${
                  activeSection === id
                    ? 'text-blue-700 font-semibold'
                    : 'text-gray-700 hover:text-blue-700'
                }`}
              >
                {label}
                {activeSection === id && (
                  <span className="absolute left-2 right-2 -bottom-[2px] h-[3px] bg-blue-700 rounded-full" />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowModal(true)}
            className="hidden lg:flex items-center gap-3 px-8 py-2 border border-gray-200 rounded-full ml-2 font-Ovo bg-orange-50 text-orange-800"
          >
            Enroll Now <ArrowRight size={18} className="ml-1 text-orange-800" />
          </button>
          <button className="block md:hidden ml-auto" onClick={openMenu}>
            <Menu size={24} className="text-blue-700" />
          </button>
        </div>

        {/* Mobile Menu */}
        <ul
          ref={sideMenuRef}
          className="flex md:hidden flex-col gap-4 py-20 px-8 fixed -right-64 top-0 bottom-0 w-64 z-50 h-screen bg-blue-50 transition duration-500"
        >
          <div className="absolute right-6 top-6" onClick={closeMenu}>
            <X size={20} className="cursor-pointer text-blue-900" />
          </div>
          {SECTIONS.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={scrollToSection(id)}
                className={`font-Ovo px-3 py-2 rounded-lg block w-full ${
                  activeSection === id
                    ? 'text-blue-700 font-semibold bg-blue-100'
                    : 'text-gray-700'
                }`}
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <button
              onClick={() => {
                closeMenu()
                setShowModal(true)
              }}
              className="mt-4 px-5 py-2 rounded-full bg-orange-50 text-orange-800 font-Ovo text-center border border-orange-200 flex items-center justify-center gap-2 w-full"
            >
              Enroll Now <ArrowRight size={16} className="text-orange-800" />
            </button>
          </li>
        </ul>
      </motion.nav>

      {/* Render the feature-rich modal */}
      <EnrollNowModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  )
}

export default Navbar
