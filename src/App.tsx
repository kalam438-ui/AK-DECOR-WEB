import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Admin from './pages/Admin';
import Design from './pages/Design';
import About from './pages/About';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { db, doc, getDoc } from './firebase';
import { STORE_NAME, ADMIN_EMAIL, STORE_PHONE, STORE_EMAIL } from './constants';

function AppContent() {
  const { user } = useAuth();
  useEffect(() => {
    const testConnection = async () => {
      try {
        await getDoc(doc(db, '_connection_test_', 'ping'));
      } catch (error) {
        if (error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Please check your Firebase configuration. The client is offline.");
        }
      }
    };
    testConnection();
  }, []);

  return (
    <Router>
      <SettingsProvider>
        <CartProvider>
          <div className="min-h-screen bg-white font-sans selection:bg-[#0066cc] selection:text-white">
          <Header />
          <WhatsAppButton />
          
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/design" element={<Design />} />
              <Route path="/about" element={<About />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight">
                {STORE_NAME}<span className="text-[#0066cc]">.</span>
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                Premium modern home decor and interior design solutions. Discover elegant furniture, wall units, and bespoke design services tailored to your lifestyle.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 uppercase text-xs tracking-widest">Quick Links</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/design" className="hover:text-white transition-colors">Design Gallery</Link></li>
                <li><Link to="/shop" className="hover:text-white transition-colors">Shop Collection</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 uppercase text-xs tracking-widest">Categories</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><Link to="/shop" className="hover:text-white transition-colors">Wall Units</Link></li>
                <li><Link to="/shop" className="hover:text-white transition-colors">Furniture</Link></li>
                <li><Link to="/shop" className="hover:text-white transition-colors">Lighting</Link></li>
                <li><Link to="/shop" className="hover:text-white transition-colors">Home Decor</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 uppercase text-xs tracking-widest">Contact Us</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex flex-col">
                  <span className="text-white font-bold">Email:</span>
                  <a href={`mailto:${STORE_EMAIL}`} className="hover:text-[#0066cc] transition-colors">{STORE_EMAIL}</a>
                </li>
                <li className="flex flex-col">
                  <span className="text-white font-bold">Phone:</span>
                  <a href={`tel:${STORE_PHONE.replace(/\s/g, '')}`} className="hover:text-[#0066cc] transition-colors">{STORE_PHONE}</a>
                </li>
                <li className="flex flex-col">
                  <span className="text-white font-bold">WhatsApp:</span>
                  <a href={`https://wa.me/${STORE_PHONE.replace(/[+\s]/g, '')}`} className="hover:text-[#0066cc] transition-colors">Chat with us</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-xs">© 2026 {STORE_NAME}. All Rights Reserved.</p>
            <div className="flex items-center gap-6">
              {user?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase() && (
                <Link to="/admin" className="text-xs text-[#0066cc] font-bold hover:underline">Admin Dashboard</Link>
              )}
              <div className="flex gap-4">
                <img src="https://i.pinimg.com/736x/7b/c6/0c/7bc60c2dc220d37247e278a21cd13c19.jpg" alt="Visa" className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all" referrerPolicy="no-referrer" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all" referrerPolicy="no-referrer" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png" alt="Paypal" className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </footer>
        </div>
        </CartProvider>
      </SettingsProvider>
    </Router>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
