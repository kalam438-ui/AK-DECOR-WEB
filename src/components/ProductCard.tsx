import React, { useState } from 'react';
import { Star, ShoppingCart, Heart, Eye, Check } from 'lucide-react';
import { Product } from '../types';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [adding, setAdding] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAdding(true);
    addToCart(product);
    setTimeout(() => setAdding(false), 1000);
  };

  return (
    <div className="group bg-white">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 mb-4">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.discount && (
              <span className="bg-[#4caf50] text-white text-[10px] font-bold px-2 py-1">
                {product.discount}% OFF
              </span>
            )}
            {product.featured && (
              <span className="bg-[#ff9800] text-white text-[10px] font-bold px-2 py-1 uppercase">
                Featured
              </span>
            )}
          </div>

          {/* Hover Actions */}
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button 
              onClick={handleAddToCart}
              disabled={adding}
              className={cn(
                "p-3 rounded-full transition-all shadow-lg",
                adding ? "bg-green-500 text-white" : "bg-white text-gray-900 hover:bg-[#0066cc] hover:text-white"
              )}
            >
              {adding ? <Check size={18} /> : <ShoppingCart size={18} />}
            </button>
            <button className="bg-white p-3 rounded-full text-gray-900 hover:bg-[#0066cc] hover:text-white transition-all shadow-lg">
              <Heart size={18} />
            </button>
            <div className="bg-white p-3 rounded-full text-gray-900 hover:bg-[#0066cc] hover:text-white transition-all shadow-lg">
              <Eye size={18} />
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-[10px] text-gray-400 uppercase tracking-wider">{product.category}</p>
          <h3 className="text-sm font-bold text-gray-900 line-clamp-1 group-hover:text-[#0066cc] transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={12} 
                className={cn(
                  i < Math.floor(product.rating) ? "fill-[#ffc107] text-[#ffc107]" : "text-gray-300"
                )} 
              />
            ))}
            <span className="text-[10px] text-gray-400">({product.reviews})</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-[#0066cc]">${product.price.toFixed(2)}</span>
              {product.oldPrice && (
                <span className="text-xs text-gray-400 line-through">${product.oldPrice.toFixed(2)}</span>
              )}
            </div>
            <button 
              onClick={handleAddToCart}
              disabled={adding}
              className={cn(
                "p-2 rounded-lg transition-all",
                adding ? "bg-green-500 text-white" : "bg-blue-50 text-[#0066cc] hover:bg-[#0066cc] hover:text-white"
              )}
            >
              {adding ? <Check size={16} /> : <ShoppingCart size={16} />}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
