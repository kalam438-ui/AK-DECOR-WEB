import React from 'react';
import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative w-full h-[600px] bg-[#f5f7f9] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
        <div className="w-full md:w-1/2 z-10">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[#0066cc] font-serif italic text-2xl mb-4 block"
          >
            Season Sale
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-6xl font-black text-gray-900 mb-4 tracking-tight"
          >
            MEN'S FASHION
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl text-gray-600 mb-8"
          >
            Min. 35-70% Off
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex gap-4"
          >
            <button className="bg-[#0066cc] text-white px-8 py-3 font-bold hover:bg-[#0052a3] transition-colors uppercase tracking-wider text-sm">
              Shop Now
            </button>
            <button className="border-2 border-gray-900 text-gray-900 px-8 py-3 font-bold hover:bg-gray-900 hover:text-white transition-all uppercase tracking-wider text-sm">
              Read More
            </button>
          </motion.div>
        </div>
        
        <div className="absolute right-0 bottom-0 h-full w-1/2 flex items-end justify-end">
          <motion.img 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            src="https://images.unsplash.com/photo-1488161628813-244768e7f6e2?q=80&w=1000&auto=format&fit=crop" 
            alt="Hero Fashion"
            className="h-[90%] object-contain"
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
