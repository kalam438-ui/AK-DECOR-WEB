import React from 'react';
import { Truck, ShieldCheck, Palette, Headphones } from 'lucide-react';

const features = [
  {
    icon: <Truck className="text-[#0066cc]" size={32} />,
    title: "Safe Delivery",
    description: "Expert handling for all items"
  },
  {
    icon: <Palette className="text-[#0066cc]" size={32} />,
    title: "Custom Design",
    description: "Bespoke interior solutions"
  },
  {
    icon: <ShieldCheck className="text-[#0066cc]" size={32} />,
    title: "Quality Assured",
    description: "Premium materials & finish"
  },
  {
    icon: <Headphones className="text-[#0066cc]" size={32} />,
    title: "Expert Support",
    description: "Consult with our designers"
  }
];

export default function Features() {
  return (
    <section className="py-12 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="flex-shrink-0">
              {feature.icon}
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{feature.title}</h3>
              <p className="text-sm text-gray-500">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
