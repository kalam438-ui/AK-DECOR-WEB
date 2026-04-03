import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function CategoryBanners() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Large Banner */}
        <div className="lg:col-span-2 relative group overflow-hidden bg-[#f3f3f3] h-[450px]">
          <img 
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop" 
            alt="Women's Style"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-12 left-12">
            <span className="text-[#0066cc] font-bold text-sm uppercase tracking-widest mb-2 block">New Arrivals</span>
            <h3 className="text-4xl font-black text-gray-900 mb-4">Women's Style</h3>
            <p className="text-gray-600 mb-6">Up to 70% Off</p>
            <button className="bg-white text-gray-900 px-6 py-2 font-bold border border-gray-200 hover:bg-gray-900 hover:text-white transition-all text-sm">
              Shop Now
            </button>
          </div>
        </div>

        {/* Small Banners Column */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Handbag */}
          <div className="relative group overflow-hidden bg-[#e9e4df] h-[215px]">
            <img 
              src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop" 
              alt="Handbag"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-6 left-6">
              <span className="bg-[#0066cc] text-white text-[10px] font-bold px-2 py-1 mb-2 inline-block">25% OFF</span>
              <h3 className="text-2xl font-black text-gray-900 mb-2">Handbag</h3>
              <button className="text-gray-900 font-bold text-xs flex items-center gap-1 hover:text-[#0066cc]">
                Shop Now <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Watch */}
          <div className="relative group overflow-hidden bg-[#f5f5f5] h-[215px]">
            <img 
              src="https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1000&auto=format&fit=crop" 
              alt="Watch"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-6 left-6">
              <span className="bg-[#0066cc] text-white text-[10px] font-bold px-2 py-1 mb-2 inline-block">45% OFF</span>
              <h3 className="text-2xl font-black text-gray-900 mb-2">Watch</h3>
              <button className="text-gray-900 font-bold text-xs flex items-center gap-1 hover:text-[#0066cc]">
                Shop Now <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Backpack */}
          <div className="md:col-span-2 relative group overflow-hidden bg-[#dcdcdc] h-[215px]">
            <img 
              src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop" 
              alt="Backpack"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-6 left-6">
              <span className="text-gray-600 font-bold text-xs uppercase tracking-widest mb-1 block">Accessories</span>
              <h3 className="text-3xl font-black text-gray-900 mb-2">Backpack</h3>
              <p className="text-gray-600 text-sm mb-4">Min. 40-80% Off</p>
              <button className="text-gray-900 font-bold text-xs flex items-center gap-1 hover:text-[#0066cc]">
                Shop Now <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
