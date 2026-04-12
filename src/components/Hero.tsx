import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

interface HeroProps {
  title?: string;
  subtitle?: string;
  image?: string;
  badge?: string;
}

export default function Hero({ 
  title = "MODERN INTERIORS", 
  subtitle = "Elegant Design Solutions", 
  image = "https://i.pinimg.com/736x/7b/c6/0c/7bc60c2dc220d37247e278a21cd13c19.jpg",
  badge = "Exclusive Collection"
}: HeroProps) {
  return (
    <section className="relative w-full min-h-[400px] md:h-[600px] bg-[#f5f7f9] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 h-full flex flex-col md:flex-row items-center py-8 md:py-0">
        <div className="w-full md:w-1/2 z-10 text-center md:text-left mb-8 md:mb-0">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[#0066cc] font-serif italic text-xl md:text-2xl mb-4 block"
          >
            {badge}
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-gray-900 mb-4 tracking-tight uppercase"
          >
            {title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-3xl text-gray-600 mb-8"
          >
            {subtitle}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center md:justify-start gap-4"
          >
            <Link to="/shop" className="bg-[#0066cc] text-white px-6 md:px-8 py-3 font-bold hover:bg-[#0052a3] transition-colors uppercase tracking-wider text-xs md:text-sm">
              Shop Now
            </Link>
            <Link to="/about" className="border-2 border-gray-900 text-gray-900 px-6 md:px-8 py-3 font-bold hover:bg-gray-900 hover:text-white transition-all uppercase tracking-wider text-xs md:text-sm">
              Read More
            </Link>
          </motion.div>
        </div>
        
        <div className="relative md:absolute md:right-0 md:bottom-0 h-[300px] md:h-full w-full md:w-1/2 flex items-end justify-center md:justify-end">
          <motion.img 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            src={image} 
            alt="Hero Fashion"
            className="h-full md:h-[90%] object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
      
      {/* Slider Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        <div className="w-3 h-3 rounded-full bg-[#0066cc]"></div>
        <div className="w-3 h-3 rounded-full bg-gray-300"></div>
      </div>
    </section>
  );
}
