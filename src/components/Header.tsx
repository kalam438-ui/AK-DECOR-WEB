import React from 'react';
import { Search, User, Heart, ShoppingCart, Menu, ChevronDown, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { signInWithGoogle, logout } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { ADMIN_EMAIL, STORE_NAME, STORE_PHONE, STORE_EMAIL } from '../constants';

export default function Header() {
  const { user } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  return (
    <header className="w-full bg-white border-b border-gray-100">
      {/* Top Bar */}
      <div className="bg-[#0066cc] text-white text-xs py-2 px-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <span className="opacity-80">{STORE_EMAIL}</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="opacity-80">{STORE_PHONE}</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span>Welcome to Our Store!</span>
          <div className="flex items-center gap-2 cursor-pointer">
            <span>English</span>
            <ChevronDown size={12} />
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <span>$ Dollar (US)</span>
            <ChevronDown size={12} />
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {STORE_NAME}<span className="text-[#0066cc]">.</span>
            </h1>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link to="/" className="flex items-center gap-1 hover:text-[#0066cc]">Home <ChevronDown size={14} /></Link>
            <Link to="/shop" className="flex items-center gap-1 hover:text-[#0066cc]">Shop <ChevronDown size={14} /></Link>
            <Link to="/design" className="flex items-center gap-1 hover:text-[#0066cc]">Design <ChevronDown size={14} /></Link>
            <Link to="/about" className="flex items-center gap-1 hover:text-[#0066cc]">About <ChevronDown size={14} /></Link>
            {user?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase() && (
              <Link to="/admin" className="text-[#0066cc] font-bold flex items-center gap-1">
                <Settings size={14} /> Admin
              </Link>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-6 text-gray-700">
          {user?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase() && (
            <Link to="/admin" className="md:hidden text-[#0066cc] p-2 hover:bg-blue-50 rounded-lg transition-all" title="Admin Dashboard">
              <Settings size={24} />
            </Link>
          )}
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || ''} className="w-8 h-8 rounded-full border border-gray-200" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <User size={16} />
                  </div>
                )}
                <span className="text-sm font-medium hidden sm:inline">{user.displayName}</span>
              </div>
              <button 
                onClick={logout}
                className="hover:text-red-500 transition-colors"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <button 
              onClick={signInWithGoogle}
              className="flex items-center gap-2 hover:text-[#0066cc] transition-colors"
            >
              <User size={24} />
              <span className="text-sm font-medium hidden sm:inline">Login</span>
            </button>
          )}
          <button className="hover:text-[#0066cc] transition-colors">
            <Search size={24} />
          </button>
          <button className="hover:text-[#0066cc] transition-colors relative">
            <Heart size={24} />
            <span className="absolute -top-2 -right-2 bg-[#0066cc] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
          </button>
          <Link to="/cart" className="hover:text-[#0066cc] transition-colors relative group">
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#0066cc] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white group-hover:scale-110 transition-transform">
                {totalItems}
              </span>
            )}
          </Link>
          <button className="md:hidden hover:text-[#0066cc] transition-colors">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}
