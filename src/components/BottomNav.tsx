import React from 'react';
import { Home, Search, ShoppingBag, User, Heart } from 'lucide-react';
import { useTranslation } from '../LanguageContext';
import { useCart } from '../CartContext';
import { Link, useLocation } from 'react-router-dom';

interface BottomNavProps {
  onCartOpen: () => void;
  onLoginOpen: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ onCartOpen, onLoginOpen }) => {
  const { lang } = useTranslation();
  const { totalItems } = useCart();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-[400px]">
      <div className="bg-white/90 backdrop-blur-xl border border-gray-100 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] h-20 flex items-center justify-around px-4">
        <Link 
          to="/" 
          className={`flex flex-col items-center gap-1 transition-colors ${isActive('/') ? 'text-brand-red' : 'text-gray-400'}`}
        >
          <Home size={22} strokeWidth={isActive('/') ? 3 : 2} />
          <span className="text-[10px] font-bold">{lang === 'ar' ? 'الرئيسية' : 'Home'}</span>
        </Link>
        
        <Link 
          to="/catalog" 
          className={`flex flex-col items-center gap-1 transition-colors ${isActive('/catalog') ? 'text-brand-red' : 'text-gray-400'}`}
        >
          <Search size={22} strokeWidth={isActive('/catalog') ? 3 : 2} />
          <span className="text-[10px] font-bold">{lang === 'ar' ? 'الكتالوج' : 'Catalog'}</span>
        </Link>

        {/* Center Cart Button */}
        <div className="relative -mt-12">
          <button 
            onClick={onCartOpen}
            className="w-16 h-16 bg-brand-red rounded-full flex items-center justify-center text-white shadow-xl shadow-brand-red/30 border-4 border-white active:scale-90 transition-transform"
          >
            <ShoppingBag size={26} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-brand-red text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center border-2 border-brand-red">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        <Link 
          to="/deals" 
          className={`flex flex-col items-center gap-1 transition-colors ${isActive('/deals') ? 'text-brand-red' : 'text-gray-400'}`}
        >
          <Heart size={22} strokeWidth={isActive('/deals') ? 3 : 2} />
          <span className="text-[10px] font-bold">{lang === 'ar' ? 'العروض' : 'Deals'}</span>
        </Link>

        <button 
          onClick={onLoginOpen}
          className="flex flex-col items-center gap-1 text-gray-400 active:text-brand-red transition-colors"
        >
          <User size={22} />
          <span className="text-[10px] font-bold">{lang === 'ar' ? 'حسابي' : 'Account'}</span>
        </button>
      </div>
    </div>
  );
};
