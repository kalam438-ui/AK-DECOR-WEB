import React, { useState } from 'react';
import { Search, User, Heart, ShoppingCart, Menu, ChevronDown, LogOut, Settings, Globe, DollarSign, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useSettings } from '../contexts/SettingsContext';
import { signInWithGoogle, logout } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { ADMIN_EMAIL, STORE_NAME, STORE_PHONE, STORE_EMAIL } from '../constants';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const { user } = useAuth();
  const { totalItems } = useCart();
  const { language, setLanguage, currency, setCurrency, t } = useSettings();
  const navigate = useNavigate();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isCurrOpen, setIsCurrOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी (Hindi)' },
    { code: 'mr', name: 'मराठी (Marathi)' },
    { code: 'ar', name: 'العربية (Arabic)' },
    { code: 'bn', name: 'বাংলা (Bangla)' },
  ];

  const currencies = [
    { code: 'USD', name: '$ Dollar (US)' },
    { code: 'INR', name: '₹ Rupee (India)' },
    { code: 'AED', name: 'د.إ Dirham (UAE)' },
    { code: 'BDT', name: '৳ Taka (BD)' },
    { code: 'OMR', name: 'ر.ع. Rial (Oman)' },
  ];

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-[#0066cc] text-white text-[10px] sm:text-xs py-2 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2 sm:gap-4 overflow-hidden">
          <span className="flex items-center gap-1 whitespace-nowrap">
            <span className="opacity-80 hidden md:inline">{STORE_EMAIL}</span>
          </span>
          <span className="flex items-center gap-1 whitespace-nowrap">
            <span className="opacity-80">{STORE_PHONE}</span>
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="hidden lg:inline">{t('welcome')}</span>
          
          {/* Language Selector */}
          <div className="relative">
            <button 
              onClick={() => { setIsLangOpen(!isLangOpen); setIsCurrOpen(false); }}
              className="flex items-center gap-1 cursor-pointer hover:text-blue-200 transition-colors"
            >
              <Globe size={12} />
              <span>{languages.find(l => l.code === language)?.name.split(' ')[0]}</span>
              <ChevronDown size={12} className={cn("transition-transform", isLangOpen && "rotate-180")} />
            </button>
            {isLangOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white text-gray-900 rounded-lg shadow-xl border border-gray-100 py-2 min-w-[140px] z-[60]">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { setLanguage(lang.code as any); setIsLangOpen(false); }}
                    className={cn(
                      "w-full text-left px-4 py-2 text-xs hover:bg-blue-50 transition-colors flex items-center justify-between",
                      language === lang.code ? "text-[#0066cc] font-bold" : "text-gray-600"
                    )}
                  >
                    {lang.name}
                    {language === lang.code && <div className="w-1.5 h-1.5 rounded-full bg-[#0066cc]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Currency Selector */}
          <div className="relative">
            <button 
              onClick={() => { setIsCurrOpen(!isCurrOpen); setIsLangOpen(false); }}
              className="flex items-center gap-1 cursor-pointer hover:text-blue-200 transition-colors"
            >
              <DollarSign size={12} />
              <span>{currency}</span>
              <ChevronDown size={12} className={cn("transition-transform", isCurrOpen && "rotate-180")} />
            </button>
            {isCurrOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white text-gray-900 rounded-lg shadow-xl border border-gray-100 py-2 min-w-[140px] z-[60]">
                {currencies.map((curr) => (
                  <button
                    key={curr.code}
                    onClick={() => { setCurrency(curr.code as any); setIsCurrOpen(false); }}
                    className={cn(
                      "w-full text-left px-4 py-2 text-xs hover:bg-blue-50 transition-colors flex items-center justify-between",
                      currency === curr.code ? "text-[#0066cc] font-bold" : "text-gray-600"
                    )}
                  >
                    {curr.name}
                    {currency === curr.code && <div className="w-1.5 h-1.5 rounded-full bg-[#0066cc]" />}
                  </button>
                ))}
              </div>
            )}
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
            <Link to="/" className="flex items-center gap-1 hover:text-[#0066cc]">{t('home')} <ChevronDown size={14} /></Link>
            <Link to="/shop" className="flex items-center gap-1 hover:text-[#0066cc]">{t('shop')} <ChevronDown size={14} /></Link>
            <Link to="/design" className="flex items-center gap-1 hover:text-[#0066cc]">{t('design')} <ChevronDown size={14} /></Link>
            <Link to="/about" className="flex items-center gap-1 hover:text-[#0066cc]">{t('about')} <ChevronDown size={14} /></Link>
            {user?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase() && (
              <Link to="/admin" className="text-[#0066cc] font-bold flex items-center gap-1">
                <Settings size={14} /> {t('admin')}
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
                  <img src={user.photoURL} alt={user.displayName || ''} className="w-8 h-8 rounded-full border border-gray-200" referrerPolicy="no-referrer" />
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
                title={t('logout')}
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
              <span className="text-sm font-medium hidden sm:inline">{t('login')}</span>
            </button>
          )}
          <button className="hover:text-[#0066cc] transition-colors" title={t('search')}>
            <Search size={24} />
          </button>
          <button className="hover:text-[#0066cc] transition-colors relative">
            <Heart size={24} />
            <span className="absolute -top-2 -right-2 bg-[#0066cc] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
          </button>
          <Link to="/cart" className="hover:text-[#0066cc] transition-colors relative group" title={t('cart')}>
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#0066cc] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white group-hover:scale-110 transition-transform">
                {totalItems}
              </span>
            )}
          </Link>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden hover:text-[#0066cc] transition-colors"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden shadow-lg"
          >
            <div className="py-4 px-4 space-y-4">
              <nav className="flex flex-col gap-4 text-sm font-bold text-gray-900">
                <Link to="/" onClick={() => setIsMenuOpen(false)} className="hover:text-[#0066cc] py-2 border-b border-gray-50">{t('home')}</Link>
                <Link to="/shop" onClick={() => setIsMenuOpen(false)} className="hover:text-[#0066cc] py-2 border-b border-gray-50">{t('shop')}</Link>
                <Link to="/design" onClick={() => setIsMenuOpen(false)} className="hover:text-[#0066cc] py-2 border-b border-gray-50">{t('design')}</Link>
                <Link to="/about" onClick={() => setIsMenuOpen(false)} className="hover:text-[#0066cc] py-2 border-b border-gray-50">{t('about')}</Link>
                {user?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase() && (
                  <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="text-[#0066cc] py-2 border-b border-gray-50 flex items-center gap-2">
                    <Settings size={16} /> {t('admin')}
                  </Link>
                )}
              </nav>
              <div className="pt-4 flex items-center gap-4">
                <button className="flex-grow bg-gray-100 text-gray-900 py-3 rounded-xl font-bold text-sm">
                  {t('search')}
                </button>
                <button className="flex-grow bg-[#0066cc] text-white py-3 rounded-xl font-bold text-sm">
                  {t('cart')} ({totalItems})
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
