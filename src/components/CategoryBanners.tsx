import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function CategoryBanners() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Large Banner */}
        <div className="lg:col-span-2 relative group overflow-hidden bg-[#f3f3f3] h-[450px]">
          <img 
            src="https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=1000&auto=format&fit=crop" 
            alt="Living Room"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-12 left-12">
            <span className="text-[#0066cc] font-bold text-sm uppercase tracking-widest mb-2 block">New Arrivals</span>
            <h3 className="text-4xl font-black text-gray-900 mb-4">Modern Living</h3>
            <p className="text-gray-600 mb-6">Up to 30% Off</p>
            <button className="bg-white text-gray-900 px-6 py-2 font-bold border border-gray-200 hover:bg-gray-900 hover:text-white transition-all text-sm">
              Shop Now
            </button>
          </div>
        </div>

        {/* Small Banners Column */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Wall Units */}
          <div className="relative group overflow-hidden bg-[#e9e4df] h-[215px]">
            <img 
              src="https://images.unsplash.com/photo-1594620302200-9a762244a156?q=80&w=1000&auto=format&fit=crop" 
              alt="Wall Units"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-6 left-6">
              <span className="bg-[#0066cc] text-white text-[10px] font-bold px-2 py-1 mb-2 inline-block">25% OFF</span>
              <h3 className="text-2xl font-black text-gray-900 mb-2">Wall Units</h3>
              <button className="text-gray-900 font-bold text-xs flex items-center gap-1 hover:text-[#0066cc]">
                Shop Now <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Lighting */}
          <div className="relative group overflow-hidden bg-[#f5f5f5] h-[215px]">
            <img 
              src="https://images.unsplash.com/photo-1524484485831-a92ffc0bb03f?q=80&w=1000&auto=format&fit=crop" 
              alt="Lighting"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-6 left-6">
              <span className="bg-[#0066cc] text-white text-[10px] font-bold px-2 py-1 mb-2 inline-block">45% OFF</span>
              <h3 className="text-2xl font-black text-gray-900 mb-2">Lighting</h3>
              <button className="text-gray-900 font-bold text-xs flex items-center gap-1 hover:text-[#0066cc]">
                Shop Now <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Furniture */}
          <div className="md:col-span-2 relative group overflow-hidden bg-[#dcdcdc] h-[215px]">
            <img 
              src="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1000&auto=format&fit=crop" 
              alt="Furniture"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-6 left-6">
              <span className="text-gray-600 font-bold text-xs uppercase tracking-widest mb-1 block">Furniture</span>
              <h3 className="text-3xl font-black text-gray-900 mb-2">Modern Tables</h3>
              <p className="text-gray-600 text-sm mb-4">Min. 20-50% Off</p>
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
