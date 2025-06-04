'use client';

import { motion } from "framer-motion";
import Banner from "./Banner";
import { collections } from "../content/collections";

export default function HomeContent() {
  return (
    <main className="min-h-screen">
      {/* Hero Banner */}
      <Banner 
        imageUrl="https://jewelmer.com/cdn/shop/files/J2505_MUOVictoria_Lifestyle_PH_3000x1000_WebBanner_2048x.jpg?v=1747567302" 
        height={600} 
      />

      {/* Featured Collections */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl text-center mb-12">Featured Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collections.filter(collection => collection.featured).slice(0, 3).map((collection, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden rounded-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="aspect-[4/5] relative">
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
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gray-50 py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl mb-6">Luxury meets Sustainability</h2>
              <p className="text-gray-600 mb-4">
                Jewelmer is an international high jewelry Maison founded in 1979, working in harmony with nature to sustainably produce the finest golden South Sea pearls.
              </p>
              <p className="text-gray-600">
                Established in 1979 by a French pearl farmer and a Filipino entrepreneur, Jewelmer has grown globally to represent a world of rarity and enduring elegance.
              </p>
            </div>
            <div className="relative aspect-square">
              <img
                src="https://jewelmer.com/cdn/shop/files/About-Us_2048x.jpg"
                alt="About Jewelmer"
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Latest Stories */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl text-center mb-12">Latest Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "His Enduring Wisdom",
              image: "https://jewelmer.com/cdn/shop/files/Fathers-Day-2024_2048x.jpg",
              excerpt: "His words of encouragement, reflecting the love he instills. His invaluable advice, passing life lessons from one generation to the next."
            },
            {
              title: "A Golden Moment",
              image: "https://jewelmer.com/cdn/shop/files/Miss-Universe-Philippines-2025_2048x.jpg",
              excerpt: "Jewelmer's golden South Sea pearls lit up the stage and stepped into the spotlight at the Miss Universe Philippines 2025 festivities."
            }
          ].map((story, index) => (
            <motion.div
              key={index}
              className="group cursor-pointer"
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
              <p className="text-gray-600">{story.excerpt}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
} 