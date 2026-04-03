import React, { useState, useEffect } from 'react';
import { Product, MOCK_PRODUCTS } from '../types';
import { ProductCard } from '../components/ProductCard';
import { db, collection, onSnapshot, query, orderBy, handleFirestoreError, OperationType } from '../firebase';
import { Search, Filter, ChevronDown, Grid, List as ListIcon } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const q = query(collection(db, 'products'), orderBy('name'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const firestoreProducts: Product[] = [];
      snapshot.forEach((doc) => {
        firestoreProducts.push({ id: doc.id, ...doc.data() } as Product);
      });
      
      // Merge with mock products if firestore is empty for demo purposes
      if (firestoreProducts.length === 0) {
        setProducts(MOCK_PRODUCTS);
      } else {
        setProducts(firestoreProducts);
      }
      setLoading(false);
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, 'products');
      setProducts(MOCK_PRODUCTS); // Fallback
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = products
    .filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-gray-50 py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-black text-gray-900 mb-2">Shop</h1>
          <p className="text-gray-500">Home / Shop</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 space-y-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4 uppercase text-xs tracking-widest">Search</h3>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border border-gray-200 px-4 py-2 text-sm focus:ring-1 focus:ring-[#0066cc] outline-none"
                />
                <Search className="absolute right-3 top-2.5 text-gray-400" size={16} />
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-4 uppercase text-xs tracking-widest">Categories</h3>
              <div className="space-y-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "block w-full text-left text-sm py-1 transition-colors",
                      selectedCategory === cat ? "text-[#0066cc] font-bold" : "text-gray-500 hover:text-gray-900"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#0066cc]/5 p-6 rounded-xl">
              <h4 className="font-bold text-gray-900 mb-2">Special Offer</h4>
              <p className="text-sm text-gray-600 mb-4">Get 20% off on your first purchase!</p>
              <button className="text-[#0066cc] font-bold text-xs uppercase tracking-widest hover:underline">
                Learn More
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-grow">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 pb-4 border-b border-gray-100">
              <p className="text-sm text-gray-500">
                Showing <span className="font-bold text-gray-900">{filteredProducts.length}</span> results
              </p>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Sort by:</span>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-sm font-bold text-gray-900 outline-none bg-transparent cursor-pointer"
                  >
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 border-l border-gray-200 pl-6">
                  <button className="text-[#0066cc]"><Grid size={18} /></button>
                  <button className="text-gray-400 hover:text-gray-900"><ListIcon size={18} /></button>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0066cc]"></div>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-500">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
