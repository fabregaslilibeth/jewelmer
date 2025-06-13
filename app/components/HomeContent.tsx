"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import LargeButton from "./Buttons/LargeButton";
import LargeBanner from "./LargeBanner";
import { collections } from "../content/collections";

export default function HomeContent() {
  const featuredRef = useRef(null);
  const aboutRef = useRef(null);
  const storiesRef = useRef(null);

  const isFeaturedInView = useInView(featuredRef, {
    once: true,
    margin: "-20%",
  });
  const isAboutInView = useInView(aboutRef, { once: true, margin: "-20%" });
  const isStoriesInView = useInView(storiesRef, { once: true, margin: "-20%" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: (index: number) => ({
      opacity: 0,
      x: index === 0 ? -50 : index === 1 ? 0 : 50,
      y: index === 1 ? 50 : 0,
    }),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <main className="overflow-hidden">
      {/* Hero Banner */}
      <LargeBanner
        imageUrl="https://jewelmer.com/cdn/shop/files/J2505_MUOVictoria_Lifestyle_PH_3000x1000_WebBanner_2048x.jpg?v=1747567302"
      />

      {/* Featured Collections */}
      <section
        ref={featuredRef}
        className="py-16 px-4 md:px-8 max-w-7xl mx-auto"
      >
        <h2 className="text-3xl text-center mb-12">Featured Collections</h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isFeaturedInView ? "visible" : "hidden"}
        >
          {collections
            .filter((collection) => collection.featured)
            .slice(0, 3)
            .map((collection, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden rounded-lg"
                variants={cardVariants}
                custom={index}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  <img
                    src={collection.imageUrl}
                    alt={collection.name}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-background bg-opacity-40 opacity-0 group-hover:opacity-100 group-hover:shadow-lg transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-foreground text-center p-4">
                      <h3 className="text-2xl mb-2">{collection.name}</h3>
                      <p>{collection.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
        </motion.div>
        <div className="flex justify-center pt-12">
          <LargeButton text="View All Collections" href="/collections" />
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef}>
       <div className="bg-secondary">
       <motion.div
          variants={cardVariants}
          custom={1}
          className="relative w-full bg-secondary"
          initial="hidden"
          animate={isAboutInView ? "visible" : "hidden"}
        >
          <img
            src="https://jewelmer.com/cdn/shop/files/J2506_BrandCampaign2024_Lifestyle_PH_3000x1000_WebBanner_2048x.jpg?v=1748852819"
            alt="About Jewelmer"
            className="object-contain w-full"
          />
        </motion.div>
        <div className="px-4 pt-4 pb-16 md:py-16 md:px-8 max-w-7xl mx-auto text-center">
          <motion.div 
            variants={cardVariants} 
            custom={0}
            initial="hidden"
            animate={isAboutInView ? "visible" : "hidden"}
          >
            <h2 className="text-3xl mb-6">Luxury meets sustainability</h2>
            <p className="mb-4">
              Jewelmer is an international high jewelry Maison founded in 1979,
              working in harmony with nature to sustainably produce the finest
              golden South Sea pearls.
            </p>
            <p className="">
              Established in 1979 by a French pearl farmer and a Filipino
              entrepreneur, Jewelmer has grown globally to represent a world of
              rarity and enduring elegance.
            </p>
          </motion.div>
          <div className="flex justify-center pt-12">
            <LargeButton text="Learn more" href="/about" />
          </div>
        </div>
       </div>
      </section>

      {/* Latest Stories */}
      <section ref={storiesRef}>
        <div className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl text-center mb-12">Latest Stories</h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isStoriesInView ? "visible" : "hidden"}
          >
            {[
              {
                title: "His Enduring Wisdom",
                image:
                  "https://jewelmer.com/cdn/shop/articles/Father_s_Day_-_Lifestyle_1_720x.jpg?v=1748420411",
                excerpt:
                  "His words of encouragement, reflecting the love he instills. His invaluable advice, passing life lessons from one generation to the next.",
              },
              {
                title: "A Golden Moment",
                image:
                  "https://jewelmer.com/cdn/shop/articles/Miss_Universe_Philippines_2025_-_Ahtisa_Manalo_1080x.jpg?v=1747385661",
                excerpt:
                  "Jewelmer's golden South Sea pearls lit up the stage and stepped into the spotlight at the Miss Universe Philippines 2025 festivities.",
              },
              {
                title: "2024 Continental Queens",
                image:
                  "https://jewelmer.com/cdn/shop/articles/Continental_Queens_x_Jewelmer_540x.jpg?v=1747384465",
                excerpt:
                  "Jewelmer takes pride in welcoming the Miss Universe 2024 Continental Queens into the captivating world of the golden South Sea pearl.",
              },
            ].map((story, index) => (
              <motion.div
                key={index}
                className="group cursor-pointer"
                variants={cardVariants}
                custom={index}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="aspect-[16/9] relative mb-4">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
                <h3 className="text-xl mb-2">{story.title}</h3>
                <p>{story.excerpt}</p>
              </motion.div>
            ))}
          </motion.div>
          <div className="flex justify-center pt-12">
            <LargeButton text="View All Stories" href="/stories" />
          </div>
        </div>
      </section>

      {/* Store Locator */}
      <section className="bg-white">
        <div className="mx-auto">
          <LargeBanner
            imageUrl="https://jewelmer.com/cdn/shop/files/BANNER_FOR_BOUTIQUE_SECTION_PH_1296x.jpg?v=1658215609"
          />
          <div className="flex flex-col items-center justify-cente py-16 px-4 md:px-8">
            <h2 className="text-2xl tracking-wider mb-4 text-center">
              Find your nearest Jewelmer boutique or authorized retailer through
              the store locator.
            </h2>
            <p className="mb-4">
              Please note that this search feature includes all authorized
              retailers — if a retailer&apos;s name is not found here, they are
              not an authorized Jewelmer retailer.
            </p>
            <LargeButton />
          </div>
        </div>
      </section>
    </main>
  );
}
