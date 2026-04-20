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
    <div className="lg:hidden fixed bottom-6 left-0 right-0 z-[100] px-4 pointer-events-none">
      <div className="bg-white/85 backdrop-blur-2xl border border-gray-100 rounded-[2.75rem] shadow-[0_15px_45px_rgba(0,0,0,0.12)] h-20 flex items-center justify-around px-2 relative pointer-events-auto max-w-[500px] mx-auto">
        <Link 
          to="/" 
          className={`flex flex-col items-center gap-1 transition-all active:scale-90 ${isActive('/') ? 'text-brand-red' : 'text-gray-400'}`}
        >
          <div className={`p-1.5 rounded-xl transition-all ${isActive('/') ? 'bg-brand-red/10' : ''}`}>
            <Home size={22} strokeWidth={isActive('/') ? 3 : 2} />
          </div>
          <span className="text-[10px] font-bold tracking-tight">{lang === 'ar' ? 'الرئيسية' : 'Home'}</span>
        </Link>
        
        <Link 
          to="/catalog" 
          className={`flex flex-col items-center gap-1 transition-all active:scale-90 ${isActive('/catalog') ? 'text-brand-red' : 'text-gray-400'}`}
        >
          <div className={`p-1.5 rounded-xl transition-all ${isActive('/catalog') ? 'bg-brand-red/10' : ''}`}>
            <Search size={22} strokeWidth={isActive('/catalog') ? 3 : 2} />
          </div>
          <span className="text-[10px] font-bold tracking-tight">{lang === 'ar' ? 'الكتالوج' : 'Catalog'}</span>
        </Link>

        {/* Center Cart Button */}
        <div className="relative -mt-10">
          <button 
            onClick={onCartOpen}
            className="w-16 h-16 bg-brand-red rounded-full flex items-center justify-center text-white shadow-2xl shadow-brand-red/30 border-4 border-white active:scale-90 transition-transform"
          >
            <ShoppingBag size={26} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-brand-red text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center border-2 border-brand-red animate-bounce">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        <Link 
          to="/deals" 
          className={`flex flex-col items-center gap-1 transition-all active:scale-90 ${isActive('/deals') ? 'text-brand-red' : 'text-gray-400'}`}
        >
          <div className={`p-1.5 rounded-xl transition-all ${isActive('/deals') ? 'bg-brand-red/10' : ''}`}>
            <Heart size={22} strokeWidth={isActive('/deals') ? 3 : 2} />
          </div>
          <span className="text-[10px] font-bold tracking-tight">{lang === 'ar' ? 'العروض' : 'Deals'}</span>
        </Link>

        <button 
          onClick={onLoginOpen}
          className="flex flex-col items-center gap-1 text-gray-400 active:text-brand-red transition-all active:scale-90"
        >
          <div className="p-1.5 rounded-xl transition-all">
            <User size={22} />
          </div>
          <span className="text-[10px] font-bold tracking-tight">{lang === 'ar' ? 'حسابي' : 'Account'}</span>
        </button>
      </div>
    </div>
  );
};
