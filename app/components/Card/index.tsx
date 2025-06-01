import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';

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
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x, y });
  };

  return (
    <div className="group relative">
      {/* Image Container */}
      <div 
        className="relative h-[300px] rounded-2xl shadow-lg overflow-hidden cursor-zoom-in"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Base Image */}
        <Image 
          src={"https://jewelmer.com/cdn/shop/products/02LEQUI-P-A_360x.jpg?v=1599241004"} 
          alt={name} 
          fill
          className={`object-cover transition-all duration-300 ${isHovering ? 'blur-md' : 'group-hover:scale-105'}`}
        />
        
        {/* Magnified View */}
        {isHovering && (
          <div 
            className="absolute inset-0"
            style={{
              clipPath: `circle(150px at ${position.x}% ${position.y}%)`
            }}
          >
            <Image 
              src={"https://jewelmer.com/cdn/shop/products/02LEQUI-P-A_360x.jpg?v=1599241004"} 
              alt={name}
              fill
              className="object-cover scale-150"
              style={{
                objectPosition: `${position.x}% ${position.y}%`
              }}
            />
            {/* Magnifying Glass Border */}
            <div 
              className="absolute border-2 border-white/50 rounded-full pointer-events-none"
              style={{
                width: '300px',
                height: '300px',
                left: `${position.x}%`,
                top: `${position.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            />
          </div>
        )}

        {/* Magnifying Glass Icon */}
        {/* <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-lg">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 text-gray-700" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </div> */}
      </div>

      {/* Content */}
      <motion.div 
        initial={{ y: -64 }}
        whileHover={{ y: -48 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="mx-2 p-3 bg-transparent text-foreground z-20 relative rounded-2xl group-hover:bg-accent group-hover:shadow-lg"
      >
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
          <span className="text-lg font-bold text-gray-900">₱{pricePhp.toLocaleString()}</span>
        </div>
        
        {/* <motion.p 
          initial={{ opacity: 0, height: 0 }}
          whileHover={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.2 }}
          className="text-sm text-gray-600 mb-4 line-clamp-2"
        >
          {description}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          whileHover={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.2 }}
          className="space-y-1"
        >
          <p className="text-sm text-gray-500">{collection}</p>
          <p className="text-sm text-gray-500">{gemstones.join(', ')}</p>
          <div className="flex gap-2 text-sm text-gray-500">
            <span>{pearlShape}</span>
            <span>•</span>
            <span>{pearlColor}</span>
          </div>
        </motion.div> */}
      </motion.div>
    </div>
  );
}
