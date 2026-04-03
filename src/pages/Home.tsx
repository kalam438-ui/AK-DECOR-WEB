import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import CategoryBanners from '../components/CategoryBanners';
import ProductGrid from '../components/ProductGrid';
import ImageUpload from '../components/ImageUpload';

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <CategoryBanners />
      <ProductGrid />
      
      {/* Secondary Banners */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative group overflow-hidden bg-[#f5f7f9] h-[300px]">
            <img 
              src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?q=80&w=1000&auto=format&fit=crop" 
              alt="Men's Fashion"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-1/2 left-12 -translate-y-1/2">
              <span className="text-white font-bold text-sm uppercase tracking-widest mb-2 block">Weekend Sale</span>
              <h3 className="text-4xl font-black text-white mb-4">Men's Fashion</h3>
              <p className="text-white/90 text-xl mb-6">Flat <span className="text-[#0066cc] font-black">70% Off</span></p>
              <button className="text-white font-bold text-sm flex items-center gap-1 hover:underline">
                Shop Now
              </button>
            </div>
          </div>

          <div className="relative group overflow-hidden bg-[#f5f7f9] h-[300px]">
            <img 
              src="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=1000&auto=format&fit=crop" 
              alt="Women's Wear"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-1/2 left-12 -translate-y-1/2">
              <span className="text-white font-bold text-sm uppercase tracking-widest mb-2 block">Fashion Style</span>
              <h3 className="text-4xl font-black text-white mb-4">Women's Wear</h3>
              <p className="text-white/90 text-xl mb-6">Min. <span className="text-[#0066cc] font-black">35-70% Off</span></p>
              <button className="text-white font-bold text-sm flex items-center gap-1 hover:underline">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
