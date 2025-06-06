'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function Footer() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const footerLinks = [
    {
      title: "Collections",
      links: ["Pearls", "Jewelry", "New Arrivals", "Best Sellers"]
    },
    {
      title: "About",
      links: ["Our Story", "Sustainability", "Craftsmanship", "Careers"]
    },
    {
      title: "Support",
      links: ["Contact Us", "Shipping", "Returns", "FAQ"]
    }
  ];

  return (
    <motion.footer 
      className="bg-accent text-white py-16 px-4 md:px-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={footerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <motion.div 
            className="col-span-1"
            variants={linkVariants}
            custom={0}
          >
            <h3 className="text-2xl font-bold mb-4">Jewelmer</h3>
            <p className="text-gray-400 mb-4">
              Luxury meets sustainability in every piece we create.
            </p>
            <div className="flex space-x-4">
              {['facebook', 'instagram', 'twitter'].map((social, index) => (
                <motion.a
                  key={social}
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  custom={index}
                >
                  {social.charAt(0).toUpperCase() + social.slice(1)}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Sections */}
          {footerLinks.map((section, sectionIndex) => (
            <motion.div 
              key={section.title}
              className="col-span-1"
              variants={linkVariants}
              custom={sectionIndex + 1}
            >
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <motion.li 
                    key={link}
                    variants={linkVariants}
                    custom={linkIndex}
                  >
                    <Link 
                      href="#" 
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div 
          className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400"
          variants={linkVariants}
          custom={4}
        >
          <p>&copy; {new Date().getFullYear()} Jewelmer. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
} 