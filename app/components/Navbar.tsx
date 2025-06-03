'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Lenis from '@studio-freight/lenis'
import ThemeSwitcher from './ThemeSwitcher';
import { navItems } from '../content/navigation';
import { perspective, mobilePerspective } from '../animations/navigation';

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeNestedDropdown, setActiveNestedDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleDropdownClick = (itemTitle: string) => {
    setActiveDropdown(activeDropdown === itemTitle ? null : itemTitle);
    setActiveNestedDropdown(null);
  };

  const handleNestedDropdownClick = (itemTitle: string) => {
    setActiveNestedDropdown(activeNestedDropdown === itemTitle ? null : itemTitle);
  };

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      lerp: 0.1,
      smoothWheel: true,
      touchMultiplier: 2
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    lenis.start();

    return () => {
      lenis.stop();
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setActiveDropdown(null);
        setActiveNestedDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 shadow-md bg-menu-bg xl:bg-background">
      {/* Top row with logo and icons */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left icons - hidden on mobile */}
          <div className="hidden xl:flex items-center space-x-4">
          <button className="p-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="p-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="xl:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md"
            >
              <span className="sr-only">Open main menu</span>
              <motion.div
                animate={isMobileMenuOpen ? "open" : "closed"}
                className="w-6 h-6 flex flex-col justify-center items-center"
              >
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 6 }
                  }}
                  className="w-6 h-0.5 bg-foreground block dark:bg-foreground"
                />
                <motion.span
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 }
                  }}
                  className="w-6 h-0.5 bg-foreground block my-1 dark:bg-foreground"
                />
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -6 }
                  }}
                  className="w-6 h-0.5 bg-foreground block dark:bg-foreground"
                />
              </motion.div>
            </button>
          </div>

          {/* Center logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link href="/" className="text-2xl tracking-widest">
              JEWELMER
            </Link>
          </div>

          {/* Right icons */}
          <div className="flex items-center space-x-1 sm:space-x-4">
            <button className="p-1 sm:p-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </button>
            <button className="p-1 sm:p-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <ThemeSwitcher />
          </div>
        </div>
      </div>

      {/* Bottom row with menu */}
      <div className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center xl:h-16">
            <div className="hidden xl:flex xl:space-x-8 items-center">
              {navItems.map((item) => (
                <div key={item.title} className="relative dropdown-container">
                  <button
                    onClick={() => handleDropdownClick(item.title)}
                    className={'inline-flex items-center p-2 link'}
                  >
                    {item.title}
                    {item.dropdown && (
                      <svg
                        className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                          activeDropdown === item.title ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </button>
                  {item.dropdown && (
                    <AnimatePresence>
                      {activeDropdown === item.title && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                          className="absolute left-0 mt-2 w-48 shadow-lg z-60"
                          style={{ perspective: '120px', perspectiveOrigin: 'left' }}
                        >
                          <div className="">
                            {item.dropdown.map((dropdownItem, index) => (
                              <div key={dropdownItem.title} className="relative">
                                  <motion.button
                                    custom={index}
                                    variants={perspective}
                                    initial="initial"
                                    animate="enter"
                                    exit="exit"
                                    transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                                    onClick={() => {
                                      if (dropdownItem.dropdown) {
                                        handleNestedDropdownClick(dropdownItem.title);
                                      } else if (dropdownItem.href) {
                                        window.location.href = dropdownItem.href;
                                        setActiveDropdown(null);
                                        setActiveNestedDropdown(null);
                                      }
                                    }}
                                    className="w-full text-left px-4 py-4 text-sm group link link-border"
                                    style={{ transform: 'translateX(4px)', perspective: '120px', perspectiveOrigin: 'right' }}
                                  >
                                    {dropdownItem.title}
                                    {dropdownItem.dropdown && 
                                    <svg
                                      className={`ml-2 h-4 w-4 transition-transform duration-200 absolute right-5 top-1/2 -translate-y-1/2 ${
                                        activeNestedDropdown === dropdownItem.title ? 'rotate-90' : ''
                                      }`}
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                      />
                                    </svg>
                                    }
                                  </motion.button>
                                {dropdownItem.dropdown && (
                                  <AnimatePresence>
                                    {activeNestedDropdown === dropdownItem.title && (
                                      <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                                        className="absolute left-full -top-2 w-48 shadow-lg"
                                        style={{ transform: 'translateX(4px)', perspective: '120px', perspectiveOrigin: 'left' }}
                                      >
                                        <div className="">
                                          {dropdownItem.dropdown.map((nestedItem, index) => (
                                            <motion.div
                                              key={nestedItem.title}
                                              custom={index}
                                              variants={perspective}
                                              initial="initial"
                                              animate="enter"
                                              exit="exit"
                                            >
                                              <Link
                                                href={nestedItem.href}
                                                className="block px-4 py-4 text-sm link link-border"
                                                onClick={() => {
                                                  setActiveDropdown(null);
                                                  setActiveNestedDropdown(null);
                                                }}
                                              >
                                                {nestedItem.title}
                                              </Link>
                                            </motion.div>
                                          ))}
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                )}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, rotateX: 90, translateY: 80, translateX: -20 }}
            animate={{ opacity: 1, rotateX: 0, translateY: 0, translateX: 0 }}
            exit={{ opacity: 0, rotateX: 90, translateY: 80, translateX: 0 }}
            transition={{ duration: 0.65, ease: [0.215, 0.61, 0.355, 1] }}
            className="xl:hidden overflow-hidden bg-menu-bg"
            style={{ perspective: '120px', perspectiveOrigin: 'top', transformOrigin: 'top' }}
          >
            <div className="pt-2 pb-3 space-y-1 max-h-[calc(100vh-5rem)] overflow-y-auto">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  custom={index}
                  variants={mobilePerspective}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                >
                  <Link
                    href={item.href}
                    className="block px-3 py-2 uppercase font-semibold"
                  >
                    {item.title}
                  </Link>
                  {item.dropdown && (
                    <div className="pl-4">
                      {item.dropdown.map((dropdownItem, dropdownIndex) => (
                        <motion.div
                          key={dropdownItem.title}
                          custom={dropdownIndex + navItems.length}
                          variants={mobilePerspective}
                          initial="initial"
                          animate="enter"
                          exit="exit"
                        >
                          <Link
                            href={dropdownItem.href}
                            className="block px-3 py-2 text-sm"
                          >
                            {dropdownItem.title}
                          </Link>
                          {dropdownItem.dropdown && (
                            <div className="pl-4 flex space-x-2 space-y-2 flex-wrap pb-4 border-b border-gray-200">
                              {dropdownItem.dropdown.map((nestedItem, nestedIndex) => (
                                <motion.div
                                  key={nestedItem.title}
                                  custom={nestedIndex + navItems.length + item.dropdown!.length}
                                  variants={mobilePerspective}
                                  initial="initial"
                                  animate="enter"
                                  exit="exit"
                                >
                                  <Link
                                    href={nestedItem.href}
                                    className="block p-3 text-xs shadow-md border border-gray-200"
                                  >
                                    {nestedItem.title}
                                  </Link>
                                </motion.div>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
