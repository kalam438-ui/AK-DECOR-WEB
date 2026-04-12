import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CategoryBanners() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Large Banner */}
        <div className="lg:col-span-2 relative group overflow-hidden bg-[#f3f3f3] h-[450px]">
          <img 
            src="https://i.pinimg.com/1200x/a1/0e/a7/a10ea7a5b6b6fb5ddbd136e55cfd2cc2.jpg" 
            alt="Living Room"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-12 left-12">
            <span className="text-[#0066cc] font-bold text-sm uppercase tracking-widest mb-2 block">New Arrivals</span>
            <h3 className="text-4xl font-black text-gray-900 mb-4">Modern Living Room</h3>
            <p className="text-gray-600 mb-6">Up to 30% Off</p>
            <Link to="/design" className="bg-white text-gray-900 px-6 py-2 font-bold border border-gray-200 hover:bg-gray-900 hover:text-white transition-all text-sm">
              View Design
            </Link>
          </div>
        </div>

        {/* Small Banners Column */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Wall Units */}
          <div className="relative group overflow-hidden bg-[#e9e4df] h-[215px]">
            <img 
              src="https://i.pinimg.com/1200x/3a/15/60/3a15601cf4ff1a6f1050b5f053694311.jpg" 
              alt="Wall Units"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-6 left-6">
              <span className="bg-[#0066cc] text-white text-[10px] font-bold px-2 py-1 mb-2 inline-block">25% OFF</span>
              <h3 className="text-2xl font-black text-gray-900 mb-2">MODERN Bed Room</h3>
              <Link to="/design" className="text-gray-900 font-bold text-xs flex items-center gap-1 hover:text-[#0066cc]">
                View Design <ChevronRight size={14} />
              </Link>
            </div>
          </div>

          {/* Lighting */}
          <div className="relative group overflow-hidden bg-[#f5f5f5] h-[215px]">
            <img 
              src="https://i.pinimg.com/1200x/1c/23/da/1c23daef00b9fb26899b8b306b157de3.jpg" 
              alt="Lighting"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-6 left-6">
              <span className="bg-[#0066cc] text-white text-[10px] font-bold px-2 py-1 mb-2 inline-block">45% OFF</span>
              <h3 className="text-2xl font-black text-gray-900 mb-2">Wall kabat & Glass</h3>
              <Link to="/design" className="text-gray-900 font-bold text-xs flex items-center gap-1 hover:text-[#0066cc]">
                View Design <ChevronRight size={14} />
              </Link>
            </div>
          </div>

          {/* Furniture */}
          <div className="md:col-span-2 relative group overflow-hidden bg-[#dcdcdc] h-[215px]">
            <img 
              src="https://i.pinimg.com/736x/27/ed/b5/27edb59fa3a610bdaa28d050f886ae41.jpg" 
              alt="Furniture"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-6 left-6">
              <span className="text-gray-600 font-bold text-xs uppercase tracking-widest mb-1 block">Furniture</span>
              <h3 className="text-3xl font-black text-gray-900 mb-2">Modern wall TV box & kabat</h3>
              <p className="text-gray-600 text-sm mb-4">Min. 20-50% Off</p>
              <Link to="/design" className="text-gray-900 font-bold text-xs flex items-center gap-1 hover:text-[#0066cc]">
                View Design <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
