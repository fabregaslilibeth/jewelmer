'use client';

import { motion } from 'framer-motion';
import { FC, useState, useEffect } from 'react';
import styles from './Banner.module.css';

interface BannerProps {
  title?: string;
  subtitle?: string;
  className?: string;
  imageUrl: string;
  height?: number;
}

const Banner: FC<BannerProps> = ({
  className = "",
  imageUrl,
  height = 600,
}) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const BLOCK_SIZE = 50; // Fixed block size in pixels

  useEffect(() => {
    const updateDimensions = () => {
      const { innerWidth, innerHeight } = window;
      setDimensions({ width: innerWidth, height: innerHeight });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const shuffle = (a: number[]) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const getBlocks = () => {
    const nbOfBlocks = Math.ceil(height / BLOCK_SIZE);
    const shuffledIndexes = shuffle([...Array(nbOfBlocks)].map((_, i) => i));

    return shuffledIndexes.map((randomIndex, index) => (
      <motion.div
        key={index}
        className={styles.block}
        variants={{
          initial: { opacity: 1 },
          open: {
            opacity: 0,
            transition: { duration: 0.5, delay: 0.03 * randomIndex }
          }
        }}
        initial="initial"
        animate="open"
      />
    ));
  };

  const numberOfColumns = Math.ceil(dimensions.width / BLOCK_SIZE);

  return (
    <div className={`w-full relative shadow-lg overflow-hidden ${className}`} style={{ height: `${height}px` }}>
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${imageUrl}')`
        }}
      />
      {/* <div className="relative z-10 p-8 h-full flex flex-col justify-center">
        <motion.h1 
          className="text-4xl font-bold mb-4 text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {title}
        </motion.h1>
        <motion.p 
          className="text-lg text-white opacity-90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {subtitle}
        </motion.p>
      </div> */}
      <div className="absolute inset-0 flex w-full h-full">
        {dimensions.height > 0 && [...Array(numberOfColumns)].map((_, index) => (
          <div key={index} className={styles.column}>
            {getBlocks()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
