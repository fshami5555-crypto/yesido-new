import React from 'react';
import { Home, Search, ShoppingBag, User, Flame } from 'lucide-react';
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
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-xl border-t border-gray-100 pb-safe shadow-[0_-5px_25px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-around h-16 px-1 relative">
        <Link 
          to="/" 
          className={`flex-1 flex flex-col items-center gap-1 transition-all active:scale-95 ${isActive('/') ? 'text-brand-red' : 'text-gray-400'}`}
        >
          <Home size={22} strokeWidth={isActive('/') ? 3 : 2} />
          <span className="text-[10px] font-bold">{lang === 'ar' ? 'الرئيسية' : 'Home'}</span>
        </Link>
        
        <Link 
          to="/catalog" 
          className={`flex-1 flex flex-col items-center gap-1 transition-all active:scale-95 ${isActive('/catalog') ? 'text-brand-red' : 'text-gray-400'}`}
        >
          <Search size={22} strokeWidth={isActive('/catalog') ? 3 : 2} />
          <span className="text-[10px] font-bold">{lang === 'ar' ? 'البحث' : 'Search'}</span>
        </Link>

        {/* Cart Item in Bar */}
        <button 
          onClick={onCartOpen}
          className="flex-1 flex flex-col items-center gap-1 text-gray-400 active:text-brand-red active:scale-95 transition-all"
        >
          <div className="relative">
            <ShoppingBag size={22} />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-brand-red text-white text-[8px] font-black h-4 w-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold">{lang === 'ar' ? 'السلة' : 'Cart'}</span>
        </button>

        <Link 
          to="/deals" 
          className={`flex-1 flex flex-col items-center gap-1 transition-all active:scale-95 ${isActive('/deals') ? 'text-brand-red' : 'text-gray-400'}`}
        >
          <div className="relative">
            <Flame size={22} strokeWidth={isActive('/deals') ? 3 : 2} />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-red"></span>
            </span>
          </div>
          <span className="text-[10px] font-bold">{lang === 'ar' ? 'العروض' : 'Deals'}</span>
        </Link>

        <button 
          onClick={onLoginOpen}
          className="flex-1 flex flex-col items-center gap-1 text-gray-400 active:text-brand-red active:scale-95 transition-all"
        >
          <User size={22} />
          <span className="text-[10px] font-bold">{lang === 'ar' ? 'حسابي' : 'Profile'}</span>
        </button>
      </div>
    </div>
  );
};
