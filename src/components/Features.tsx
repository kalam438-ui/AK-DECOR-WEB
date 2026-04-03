import React from 'react';
import { Truck, CreditCard, RotateCcw, Headphones } from 'lucide-react';

const features = [
  {
    icon: <Truck className="text-[#0066cc]" size={32} />,
    title: "Free Shipping",
    description: "On All Orders Over $99"
  },
  {
    icon: <CreditCard className="text-[#0066cc]" size={32} />,
    title: "Secure Payment",
    description: "We ensure secure payment"
  },
  {
    icon: <RotateCcw className="text-[#0066cc]" size={32} />,
    title: "100% Money Back",
    description: "30 Days Return Policy"
  },
  {
    icon: <Headphones className="text-[#0066cc]" size={32} />,
    title: "Online Support",
    description: "24/7 Dedicated Support"
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
