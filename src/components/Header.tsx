import React from 'react';
import { UserCheck, Sparkles } from 'lucide-react';
import { RoleType } from '../types';

interface HeaderProps {
  currentRole: RoleType;
  currentTeacherGrade: 1 | 2 | 3 | 4 | 5 | 6;
  activeView: string;
  onNavigate: (view: string) => void;
  onOpenRoleSwitcher: () => void;
  activeProfileName: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  currentTeacherGrade,
  activeView,
  onNavigate,
  onOpenRoleSwitcher,
  activeProfileName,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FFF0C5] border-b-2 border-[#12383A]">
      {/* 4-Stripe Ribbon at top of header */}
      <div className="ribbon-4-strip">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand & Tumbuh Bersama Capsule */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('beranda')}>
          <div className="w-11 h-11 rounded-2xl bg-[#359FA0] border-2 border-[#12383A] shadow-tactile-btn flex items-center justify-center font-extrabold text-white text-xl">
            ⭐
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl sm:text-2xl text-[#12383A] tracking-tight">
                SI STIR HEBAT
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#FFF0C5] border-2 border-[#12383A] shadow-tactile-mini font-extrabold text-[11px] text-[#12383A] tracking-wide uppercase">
                Tumbuh Bersama
              </span>
            </div>
            <p className="text-xs text-[#12383A]/80 font-bold hidden sm:block">
              SDN 03 Wonosari Boalemo Gorontalo
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-[#FFFAE6] p-1.5 rounded-full border-2 border-[#12383A] shadow-tactile-btn">
          <button
            onClick={() => onNavigate('beranda')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeView === 'beranda'
                ? 'bg-[#12383A] text-[#FFF0C5] shadow-tactile-mini'
                : 'text-[#12383A] hover:bg-[#FFF0C5]'
            }`}
          >
            Beranda
          </button>
          <button
            onClick={() => onNavigate('murid')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeView === 'murid'
                ? 'bg-[#12383A] text-[#FFF0C5] shadow-tactile-mini'
                : 'text-[#12383A] hover:bg-[#FFF0C5]'
            }`}
          >
            Ruang Murid
          </button>
          <button
            onClick={() => onNavigate('orang_tua')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeView === 'orang_tua'
                ? 'bg-[#12383A] text-[#FFF0C5] shadow-tactile-mini'
                : 'text-[#12383A] hover:bg-[#FFF0C5]'
            }`}
          >
            Ruang Orang Tua
          </button>
          <button
            onClick={() => onNavigate('guru')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeView === 'guru' || activeView === 'ruang_pribadi'
                ? 'bg-[#12383A] text-[#FFF0C5] shadow-tactile-mini'
                : 'text-[#12383A] hover:bg-[#FFF0C5]'
            }`}
          >
            Ruang Guru
          </button>
          <button
            onClick={() => onNavigate('kepala_sekolah')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeView === 'kepala_sekolah'
                ? 'bg-[#12383A] text-[#FFF0C5] shadow-tactile-mini'
                : 'text-[#12383A] hover:bg-[#FFF0C5]'
            }`}
          >
            Ruang Kepala Sekolah
          </button>
        </nav>

        {/* Profile Switcher CTA */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenRoleSwitcher}
            className="tactile-btn flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-[#8AD6D1] text-[#12383A] font-bold text-xs sm:text-sm hover:bg-[#359FA0] hover:text-white transition-colors"
            title="Ganti Peran atau Guru Kelas"
          >
            <UserCheck className="w-4 h-4" />
            <div className="text-left hidden sm:block">
              <span className="block text-[10px] text-[#12383A] uppercase font-extrabold leading-none">
                {currentRole === 'guru' ? `Wali Kelas ${currentTeacherGrade}` : currentRole.replace('_', ' ')}
              </span>
              <span className="truncate max-w-[120px] block leading-tight font-extrabold">
                {activeProfileName}
              </span>
            </div>
            <Sparkles className="w-3.5 h-3.5 text-[#FF8C52]" />
          </button>
        </div>
      </div>
    </header>
  );
};
