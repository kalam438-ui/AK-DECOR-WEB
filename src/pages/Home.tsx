import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import CategoryBanners from '../components/CategoryBanners';
import ProductGrid from '../components/ProductGrid';
import { db, collection, query, where, onSnapshot } from '../firebase';
import { Link } from 'react-router-dom';

export default function Home() {
  const [pageContent, setPageContent] = useState<any>(null);

  useEffect(() => {
    const q = query(collection(db, 'page_content'), where('pageId', '==', 'home'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        setPageContent(snapshot.docs[0].data());
      }
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <Hero 
        title={pageContent?.heroTitle}
        subtitle={pageContent?.heroSubtitle}
        image={pageContent?.heroImage}
      />
      <Features />
      <CategoryBanners />
      <ProductGrid />
      
      {pageContent?.content && (
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-xl text-gray-600 leading-relaxed italic">
              "{pageContent.content}"
            </p>
          </div>
        </section>
      )}
      
      {/* Secondary Banners */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative group overflow-hidden bg-[#f5f7f9] h-[300px]">
            <img 
              src="https://i.pinimg.com/736x/3c/7c/f9/3c7cf918371aa1f20ce7a2d91cb13e93.jpg" 
              alt="Premium Seating"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-1/2 left-12 -translate-y-1/2">
              <span className="text-white font-bold text-sm uppercase tracking-widest mb-2 block">New Collection</span>
              <h3 className="text-4xl font-black text-white mb-4">Premium Seating</h3>
              <p className="text-white/90 text-xl mb-6">Up to <span className="text-[#0066cc] font-black">30% Off</span></p>
              <Link to="/shop" className="text-white font-bold text-sm flex items-center gap-1 hover:underline">
                Shop Now
              </Link>
            </div>
          </div>

          <div className="relative group overflow-hidden bg-[#f5f7f9] h-[300px]">
            <img 
              src="https://images.unsplash.com/photo-1581783898377-1c85bf937427?q=80&w=1000&auto=format&fit=crop" 
              alt="Home Accents"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-1/2 left-12 -translate-y-1/2">
              <span className="text-white font-bold text-sm uppercase tracking-widest mb-2 block">Decor Style</span>
              <h3 className="text-4xl font-black text-white mb-4">Home Accents</h3>
              <p className="text-white/90 text-xl mb-6">Min. <span className="text-[#0066cc] font-black">15-40% Off</span></p>
              <Link to="/shop" className="text-white font-bold text-sm flex items-center gap-1 hover:underline">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
