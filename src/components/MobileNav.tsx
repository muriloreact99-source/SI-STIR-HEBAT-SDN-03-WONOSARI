import React from 'react';
import { Home, Smile, Users, BookOpen, ShieldCheck } from 'lucide-react';

interface MobileNavProps {
  activeView: string;
  onNavigate: (view: string) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ activeView, onNavigate }) => {
  const navItems = [
    { id: 'beranda', label: 'Beranda', icon: Home },
    { id: 'murid', label: 'Murid', icon: Smile },
    { id: 'orang_tua', label: 'Orang Tua', icon: Users },
    { id: 'guru', label: 'Guru', icon: BookOpen },
    { id: 'kepala_sekolah', label: 'Kepala Sekolah', icon: ShieldCheck },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#FFF0C5] border-t-2 border-[#12383A] shadow-[0_-4px_10px_rgba(18,56,58,0.1)] px-2 py-2">
      <div className="flex items-center justify-around gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            activeView === item.id ||
            (item.id === 'guru' && activeView === 'ruang_pribadi');

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-2xl min-w-[56px] transition-all ${
                isActive
                  ? 'bg-[#12383A] text-[#FFF0C5] border border-[#12383A] shadow-tactile-mini -translate-y-1'
                  : 'text-[#12383A] hover:bg-[#FFFAE6]'
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] font-bold leading-none text-center">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
