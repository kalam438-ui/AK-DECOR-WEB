import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, db } from '../firebase';
import { Product } from '../types';
import { motion } from 'motion/react';
import { ShoppingCart, ArrowLeft, Star, ShieldCheck, Truck, RotateCcw, Loader2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { cn } from '../lib/utils';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() } as Product);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    setAdding(true);
    addToCart(product);
    setTimeout(() => setAdding(false), 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-[#0066cc]" size={48} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
        <button 
          onClick={() => navigate('/shop')}
          className="flex items-center gap-2 text-[#0066cc] font-bold hover:underline"
        >
          <ArrowLeft size={20} /> Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-[#0066cc] mb-8 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
          Back
        </button>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Image Section */}
          <div className="lg:w-1/2">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-square rounded-3xl overflow-hidden bg-gray-100 border border-gray-100"
            >
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>

          {/* Info Section */}
          <div className="lg:w-1/2">
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-blue-50 text-[#0066cc] text-xs font-bold rounded-full uppercase tracking-wider mb-4">
                {product.category}
              </span>
              <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">{product.name}</h1>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill={i < 4 ? "currentColor" : "none"} />
                  ))}
                </div>
                <span className="text-gray-400 text-sm font-medium">(120 Reviews)</span>
              </div>
              <div className="text-4xl font-black text-[#0066cc] mb-8">
                ${product.price.toFixed(2)}
              </div>
              <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                Experience premium quality with our {product.name}. Designed for durability and style, 
                this {product.category} item is a perfect addition to your collection. 
                Crafted with attention to detail and using the finest materials.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button 
                onClick={handleAddToCart}
                disabled={adding}
                className={cn(
                  "flex-1 h-14 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all duration-300",
                  adding 
                    ? "bg-green-500 text-white scale-95" 
                    : "bg-[#0066cc] text-white hover:bg-[#0052a3] hover:shadow-xl hover:-translate-y-1"
                )}
              >
                {adding ? (
                  <>Added to Cart!</>
                ) : (
                  <>
                    <ShoppingCart size={24} />
                    Add to Cart
                  </>
                )}
              </button>
              <button className="h-14 px-8 rounded-2xl border-2 border-gray-200 font-black text-gray-900 hover:border-[#0066cc] hover:text-[#0066cc] transition-all">
                Buy Now
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#0066cc]">
                  <Truck size={20} />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">Free Shipping</div>
                  <div className="text-xs text-gray-500">Orders over $100</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#0066cc]">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">2 Year Warranty</div>
                  <div className="text-xs text-gray-500">Full protection</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#0066cc]">
                  <RotateCcw size={20} />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">30 Day Return</div>
                  <div className="text-xs text-gray-500">Easy returns</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
