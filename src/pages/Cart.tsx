import React from 'react';
import { motion } from 'motion/react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, CreditCard } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-12 px-4">
        <div className="max-w-3xl mx-auto text-center bg-white p-12 rounded-3xl shadow-sm border border-gray-100">
          <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-[#0066cc]">
            <ShoppingBag size={48} />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-8 text-lg">Looks like you haven't added anything to your cart yet.</p>
          <button 
            onClick={() => navigate('/shop')}
            className="inline-flex items-center gap-2 bg-[#0066cc] text-white px-8 py-4 rounded-2xl font-black hover:bg-[#0052a3] transition-all"
          >
            Start Shopping <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-black text-gray-900 mb-8 tracking-tight">Shopping Cart ({totalItems})</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items List */}
          <div className="lg:w-2/3 space-y-4">
            {cart.map((item) => (
              <motion.div 
                layout
                key={item.id}
                className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6"
              >
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <div className="flex-1 text-center sm:text-left">
                  <Link to={`/product/${item.id}`} className="text-xl font-bold text-gray-900 hover:text-[#0066cc] transition-colors">
                    {item.name}
                  </Link>
                  <p className="text-gray-500 text-sm mb-2">{item.category}</p>
                  <div className="text-[#0066cc] font-black text-lg">${item.price.toFixed(2)}</div>
                </div>

                <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-xl">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm transition-all text-gray-600"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-bold text-gray-900 w-8 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm transition-all text-gray-600"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <div className="text-right min-w-[100px]">
                  <div className="text-xl font-black text-gray-900 mb-2">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 sticky top-32">
              <h2 className="text-2xl font-black text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-500 font-bold">Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span className="font-bold text-gray-900">$0.00</span>
                </div>
                <div className="h-px bg-gray-100 my-4"></div>
                <div className="flex justify-between text-xl font-black text-gray-900">
                  <span>Total</span>
                  <span className="text-[#0066cc]">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full bg-[#0066cc] text-white h-14 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-[#0052a3] hover:shadow-xl hover:-translate-y-1 transition-all">
                <CreditCard size={24} />
                Checkout
              </button>
              
              <p className="text-center text-gray-400 text-xs mt-6">
                Secure checkout powered by PressMart. All transactions are encrypted.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
