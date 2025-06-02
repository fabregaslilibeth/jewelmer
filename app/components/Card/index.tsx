import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

interface CardProps {
  imageUrl?: string;
  name: string;
  description: string;
  pricePhp: number;
  collection: string;
  gemstones: string[];
  pearlShape: string;
  pearlColor: string;
}

export default function Card({
  imageUrl,
  name,
  description,
  pricePhp,
  collection,
  gemstones,
  pearlShape,
  pearlColor,
}: CardProps) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <motion.div
      className="relative rounded-xl shadow-lg overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Content Container */}
      <div className="p-2 absolute right-0 z-20 flex flex-col justify-between h-full">
         {/* Details */}
         <div className="flex flex-wrap gap-2 mt-2">
          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full shadow-sm">
            {collection}
          </span>
          {gemstones.map((gem, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full shadow-sm"
            >
              {gem}
            </span>
          ))}
          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full shadow-sm">
            {pearlShape}
          </span>
          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full shadow-sm">
            {pearlColor}
          </span>
        </div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-accent mb-1">{name}</h3>
          <span className="font-semibold text-accent">
            ₱{pricePhp.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Image Container */}
      <div className="relative w-full h-[300px] w-[450px]">
        {imageUrl && (
          <Image
            src={
              "https://jewelmer.com/cdn/shop/products/02LEQUI-P-A_360x.jpg?v=1599241004"
            }
            alt={name}
            fill
          />
        )}
      </div>

      {/* Hover Overlay */}
      <motion.div
        className="absolute inset-0 bg-black/5 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovering ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
}
