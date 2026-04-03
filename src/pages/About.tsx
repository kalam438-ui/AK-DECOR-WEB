import React from 'react';
import { motion } from 'motion/react';
import { Users, Globe, Award, ShieldCheck } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-[#f5f7f9] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 z-10">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[#0066cc] font-bold uppercase tracking-widest text-sm mb-4 block"
            >
              Our Story
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl font-black text-gray-900 mb-6 tracking-tight"
            >
              Redefining Modern Retail.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 leading-relaxed mb-8"
            >
              Founded in 2026, PressMart started with a simple mission: to provide high-quality, 
              fashion-forward products while maintaining a commitment to sustainability and 
              customer satisfaction.
            </motion.p>
          </div>
          <div className="lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 rounded-2xl overflow-hidden shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop" 
                alt="Our Team" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#0066cc]/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-blue-100 rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          <div>
            <div className="text-5xl font-black text-[#0066cc] mb-2">10M+</div>
            <div className="text-gray-500 font-bold uppercase text-xs tracking-widest">Happy Customers</div>
          </div>
          <div>
            <div className="text-5xl font-black text-[#0066cc] mb-2">150+</div>
            <div className="text-gray-500 font-bold uppercase text-xs tracking-widest">Global Stores</div>
          </div>
          <div>
            <div className="text-5xl font-black text-[#0066cc] mb-2">20k+</div>
            <div className="text-gray-500 font-bold uppercase text-xs tracking-widest">Products</div>
          </div>
          <div>
            <div className="text-5xl font-black text-[#0066cc] mb-2">99%</div>
            <div className="text-gray-500 font-bold uppercase text-xs tracking-widest">Satisfaction Rate</div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">The principles that guide everything we do at PressMart.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Users size={32} />, title: "Community First", desc: "We believe in building strong relationships with our customers and partners." },
              { icon: <Globe size={32} />, title: "Sustainability", desc: "Committed to reducing our environmental footprint through conscious choices." },
              { icon: <Award size={32} />, title: "Quality", desc: "We never compromise on the quality of our products or our service." },
              { icon: <ShieldCheck size={32} />, title: "Integrity", desc: "Transparency and honesty are at the heart of our business operations." }
            ].map((value, index) => (
              <div key={index} className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300">
                <div className="text-[#0066cc] mb-6 flex justify-center">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
