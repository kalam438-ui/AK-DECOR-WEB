import React, { useState, useEffect } from 'react';
import { Product, MOCK_PRODUCTS } from '../types';
import { ProductCard } from './ProductCard';
import { cn } from '../lib/utils';
import { db, collection, onSnapshot, query, where, limit, handleFirestoreError, OperationType } from '../firebase';

const TABS = [
  { id: 'new', label: 'New Arrival' },
  { id: 'best', label: 'Best Selling' },
  { id: 'top', label: 'Top Rated' }
];

export default function ProductGrid() {
  const [activeTab, setActiveTab] = useState('new');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products from Firestore
    const q = query(collection(db, 'products'), limit(10));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items: Product[] = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as Product);
      });
      
      // Fallback to mock data if Firestore is empty
      if (items.length === 0) {
        setProducts(MOCK_PRODUCTS);
      } else {
        setProducts(items);
      }
      setLoading(false);
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, 'products');
      setProducts(MOCK_PRODUCTS);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const filteredProducts = products.filter(p => {
    if (activeTab === 'new') return p.isNew;
    if (activeTab === 'best') return p.isBestSeller;
    if (activeTab === 'top') return p.isTopRated || p.rating >= 4.5;
    return true;
  });

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-gray-900 mb-8">Curated Collection</h2>
          
          <div className="flex justify-center gap-8 border-b border-gray-100">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "pb-4 text-sm font-bold transition-all relative",
                  activeTab === tab.id ? "text-gray-900" : "text-gray-400 hover:text-gray-600"
                )}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0066cc]"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0066cc]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
