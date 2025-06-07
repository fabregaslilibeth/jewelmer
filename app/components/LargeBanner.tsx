'use client';

import { motion } from 'framer-motion';
import { FC, useState, useEffect } from 'react';
import styles from './Banner.module.css';

interface BannerProps {
  title?: string;
  subtitle?: string;
  className?: string;
  imageUrl: string;
  backgroundPosition?: string;
  backgroundSize?: string;
  backgroundRepeat?: string;
}

const Banner: FC<BannerProps> = ({
  className = "",
  imageUrl,
  backgroundPosition = 'center',
  backgroundSize = 'cover',
  backgroundRepeat = 'no-repeat',
}) => {
  const height = 600;
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
    <div className={`w-full relative shadow-lg overflow-hidden h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] ${className}`}>
      <div 
        className="absolute inset-0 bg-cover"
        style={{
          backgroundImage: `url('${imageUrl}')`,
          backgroundPosition: backgroundPosition,
          backgroundSize: backgroundSize,
          backgroundRepeat: backgroundRepeat,
        }}
      />
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
