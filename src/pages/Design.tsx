import React from 'react';
import { motion } from 'motion/react';
import { Palette, Layout, Box, Sparkles, Layers, MousePointer2 } from 'lucide-react';

const designFeatures = [
  {
    icon: <Palette className="text-[#0066cc]" size={32} />,
    title: "Color Theory",
    description: "We use a sophisticated palette that balances professional trust with vibrant energy."
  },
  {
    icon: <Layout className="text-[#0066cc]" size={32} />,
    title: "Grid Systems",
    description: "Our layouts are built on a precise 12-column grid for perfect alignment across all devices."
  },
  {
    icon: <Box className="text-[#0066cc]" size={32} />,
    title: "Component Library",
    description: "A robust set of reusable UI components ensures consistency and speed."
  },
  {
    icon: <Sparkles className="text-[#0066cc]" size={32} />,
    title: "Micro-interactions",
    description: "Subtle animations and transitions that guide the user and provide feedback."
  },
  {
    icon: <Layers className="text-[#0066cc]" size={32} />,
    title: "Visual Hierarchy",
    description: "Intentional use of scale, color, and spacing to prioritize information."
  },
  {
    icon: <MousePointer2 className="text-[#0066cc]" size={32} />,
    title: "Accessibility",
    description: "Designed with inclusivity in mind, meeting WCAG standards for contrast and navigation."
  }
];

export default function Design() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#0066cc] via-transparent to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-6xl font-black mb-6 tracking-tight">Our Design Philosophy</h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              At PressMart, design is not just how it looks, but how it works. We believe in creating 
              interfaces that are intuitive, beautiful, and accessible to everyone.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {designFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-2xl border border-gray-100 hover:border-[#0066cc]/20 hover:bg-blue-50/30 transition-all group"
              >
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Showcase */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-black text-gray-900 mb-6">Crafted with Precision</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Every pixel is intentional. We use a combination of modern tools and timeless design 
                principles to create an experience that feels both familiar and innovative.
              </p>
              <div className="space-y-4">
                {['Typography', 'Iconography', 'Spacing', 'Color'].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#0066cc]"></div>
                    <span className="font-bold text-gray-900">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="h-48 bg-[#0066cc] rounded-2xl"></div>
                <div className="h-64 bg-gray-200 rounded-2xl"></div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="h-64 bg-gray-900 rounded-2xl"></div>
                <div className="h-48 bg-blue-100 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
