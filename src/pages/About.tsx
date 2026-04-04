import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Users, Globe, Award, ShieldCheck, Mail, Phone, MessageCircle } from 'lucide-react';
import { STORE_PHONE, STORE_EMAIL } from '../constants';
import { db, collection, query, where, onSnapshot } from '../firebase';

export default function About() {
  const [pageContent, setPageContent] = useState<any>(null);

  useEffect(() => {
    const q = query(collection(db, 'page_content'), where('pageId', '==', 'about'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        setPageContent(snapshot.docs[0].data());
      }
    });
    return unsubscribe;
  }, []);

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
              className="text-6xl font-black text-gray-900 mb-6 tracking-tight uppercase"
            >
              {pageContent?.heroTitle || "Crafting Your Dream Spaces."}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 leading-relaxed mb-8"
            >
              {pageContent?.heroSubtitle || "Founded in 2026, AK Decor and Design is dedicated to transforming houses into homes. We combine modern aesthetics with functional design to create spaces that inspire."}
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
                src={pageContent?.heroImage || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop"} 
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

      {pageContent?.content && (
        <section className="py-24 bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4">
            <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
              {pageContent.content}
            </div>
          </div>
        </section>
      )}

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
            <p className="text-gray-500 max-w-2xl mx-auto">The principles that guide every design at AK Decor and Design.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Users size={32} />, title: "Client Focused", desc: "We listen to your needs to create spaces that truly reflect your personality." },
              { icon: <Globe size={32} />, title: "Innovation", desc: "Pushing the boundaries of modern design with creative and functional solutions." },
              { icon: <Award size={32} />, title: "Craftsmanship", desc: "We use only the finest materials and skilled artisans for every project." },
              { icon: <ShieldCheck size={32} />, title: "Timelessness", desc: "Designing interiors that remain elegant and relevant for years to come." }
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

      {/* Contact Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100 flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-black text-gray-900 mb-6 tracking-tight">Get in Touch</h2>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Have questions about our products or services? Our team is here to help you 
                find exactly what you're looking for.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-[#0066cc]">
                    <Mail size={24} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900 uppercase tracking-widest">Email Us</div>
                    <a href={`mailto:${STORE_EMAIL}`} className="text-[#0066cc] font-medium hover:underline">{STORE_EMAIL}</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-[#0066cc]">
                    <Phone size={24} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900 uppercase tracking-widest">Call Us</div>
                    <a href={`tel:${STORE_PHONE.replace(/\s/g, '')}`} className="text-[#0066cc] font-medium hover:underline">{STORE_PHONE}</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-[#25D366]">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900 uppercase tracking-widest">WhatsApp</div>
                    <a href={`https://wa.me/${STORE_PHONE.replace(/[+\s]/g, '')}`} className="text-[#25D366] font-medium hover:underline">Chat with us now</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 w-full">
              <div className="aspect-video rounded-2xl overflow-hidden bg-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=1000&auto=format&fit=crop" 
                  alt="Contact Us" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
