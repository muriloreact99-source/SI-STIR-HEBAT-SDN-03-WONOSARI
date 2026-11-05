import React from 'react';
import { X, Check } from 'lucide-react';
import { RoleType, GradeLevel } from '../types';
import { HOMEROOM_TEACHERS, PRINCIPAL_INFO } from '../data/mockData';
import { DataContohBadge } from './DataContohBadge';

interface RoleSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: RoleType;
  currentGrade: GradeLevel;
  onSelectRole: (role: RoleType, grade?: GradeLevel, studentName?: string) => void;
  activeStudent: string;
}

export const RoleSwitcherModal: React.FC<RoleSwitcherModalProps> = ({
  isOpen,
  onClose,
  currentRole,
  currentGrade,
  onSelectRole,
  activeStudent,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#12383A]/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FFFAE6] border-2 border-[#12383A] shadow-tactile-card rounded-[28px] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-5 sm:p-7 relative">
        {/* Ribbon on modal top */}
        <div className="ribbon-4-strip -mt-5 sm:-mt-7 -mx-5 sm:-mx-7 mb-5 rounded-t-[26px]">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b-2 border-[#12383A]">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#12383A]">
                Pilih Akun dan Ruang
              </h3>
              <DataContohBadge />
            </div>
            <p className="text-xs sm:text-sm text-[#12383A]/80 font-bold mt-1">
              Jelajahi SI STIR HEBAT dari sudut pandang masing masing pengguna sekolah
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full border-2 border-[#12383A] bg-[#FFF0C5] hover:bg-[#FF8C52] hover:text-white flex items-center justify-center font-bold text-[#12383A] shadow-tactile-mini transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section 1: Kepala Sekolah */}
        <div className="mb-6">
          <span className="block text-xs uppercase font-extrabold text-[#359FA0] tracking-wider mb-2">
            Pimpinan Sekolah
          </span>
          <button
            onClick={() => {
              onSelectRole('kepala_sekolah');
              onClose();
            }}
            className={`w-full p-4 rounded-2xl border-2 border-[#12383A] text-left transition-all flex items-center justify-between ${
              currentRole === 'kepala_sekolah'
                ? 'bg-[#12383A] text-[#FFF0C5] shadow-tactile-btn'
                : 'bg-white hover:bg-[#FFF0C5] text-[#12383A] shadow-tactile-mini'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">🏛️</span>
              <div>
                <span className="font-extrabold text-base block">
                  {PRINCIPAL_INFO.name}
                </span>
                <span className="text-xs opacity-90 block">
                  Kepala Sekolah • Supervisi Terintegrasi dan Persetujuan Modul
                </span>
              </div>
            </div>
            {currentRole === 'kepala_sekolah' && (
              <span className="w-7 h-7 rounded-full bg-[#FF8C52] text-white flex items-center justify-center font-extrabold text-xs">
                <Check className="w-4 h-4" />
              </span>
            )}
          </button>
        </div>

        {/* Section 2: Enam Wali Kelas (Guru) */}
        <div className="mb-6">
          <span className="block text-xs uppercase font-extrabold text-[#359FA0] tracking-wider mb-2">
            Enam Wali Kelas (Ruang Pribadi Berbasis Fase Kurikulum)
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {HOMEROOM_TEACHERS.map((teacher) => {
              const isSelected = currentRole === 'guru' && currentGrade === teacher.grade;
              return (
                <button
                  key={teacher.id}
                  onClick={() => {
                    onSelectRole('guru', teacher.grade);
                    onClose();
                  }}
                  className={`p-3.5 rounded-2xl border-2 border-[#12383A] text-left transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#12383A] text-[#FFF0C5] shadow-tactile-btn'
                      : 'bg-white hover:bg-[#FFF0C5] text-[#12383A] shadow-tactile-mini'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{teacher.sticker}</span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-sm block">
                          Kelas {teacher.grade}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded-full border border-current font-bold">
                          Fase {teacher.phase}
                        </span>
                      </div>
                      <span className="text-xs font-bold opacity-90 block">
                        {teacher.name}
                      </span>
                    </div>
                  </div>
                  {isSelected && (
                    <span className="w-6 h-6 rounded-full bg-[#FF8C52] text-white flex items-center justify-center font-extrabold text-xs shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 3: Orang Tua & Murid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Orang Tua */}
          <div>
            <span className="block text-xs uppercase font-extrabold text-[#359FA0] tracking-wider mb-2">
              Wali Murid
            </span>
            <button
              onClick={() => {
                onSelectRole('orang_tua');
                onClose();
              }}
              className={`w-full p-3.5 rounded-2xl border-2 border-[#12383A] text-left transition-all flex items-center justify-between ${
                currentRole === 'orang_tua'
                  ? 'bg-[#12383A] text-[#FFF0C5] shadow-tactile-btn'
                  : 'bg-white hover:bg-[#FFF0C5] text-[#12383A] shadow-tactile-mini'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏡</span>
                <div>
                  <span className="font-extrabold text-sm block">
                    Ibu Rina
                  </span>
                  <span className="text-xs opacity-90 block">
                    Orang tua Aisyah (Kls 1) dan Fajar (Kls 2)
                  </span>
                </div>
              </div>
              {currentRole === 'orang_tua' && (
                <span className="w-6 h-6 rounded-full bg-[#FF8C52] text-white flex items-center justify-center font-extrabold text-xs">
                  <Check className="w-3.5 h-3.5" />
                </span>
              )}
            </button>
          </div>

          {/* Murid */}
          <div>
            <span className="block text-xs uppercase font-extrabold text-[#359FA0] tracking-wider mb-2">
              Murid (Siswa)
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  onSelectRole('murid', 1, 'Aisyah');
                  onClose();
                }}
                className={`flex-1 p-3 rounded-2xl border-2 border-[#12383A] text-left transition-all flex items-center justify-between ${
                  currentRole === 'murid' && activeStudent === 'Aisyah'
                    ? 'bg-[#12383A] text-[#FFF0C5] shadow-tactile-btn'
                    : 'bg-white hover:bg-[#FFF0C5] text-[#12383A] shadow-tactile-mini'
                }`}
              >
                <div>
                  <span className="font-extrabold text-sm block">🎒 Aisyah</span>
                  <span className="text-[11px] opacity-90 block">Kelas 1 SD</span>
                </div>
                {currentRole === 'murid' && activeStudent === 'Aisyah' && (
                  <span className="w-5 h-5 rounded-full bg-[#FF8C52] text-white flex items-center justify-center font-extrabold text-xs">
                    <Check className="w-3 h-3" />
                  </span>
                )}
              </button>

              <button
                onClick={() => {
                  onSelectRole('murid', 2, 'Fajar');
                  onClose();
                }}
                className={`flex-1 p-3 rounded-2xl border-2 border-[#12383A] text-left transition-all flex items-center justify-between ${
                  currentRole === 'murid' && activeStudent === 'Fajar'
                    ? 'bg-[#12383A] text-[#FFF0C5] shadow-tactile-btn'
                    : 'bg-white hover:bg-[#FFF0C5] text-[#12383A] shadow-tactile-mini'
                }`}
              >
                <div>
                  <span className="font-extrabold text-sm block">🧢 Fajar</span>
                  <span className="text-[11px] opacity-90 block">Kelas 2 SD</span>
                </div>
                {currentRole === 'murid' && activeStudent === 'Fajar' && (
                  <span className="w-5 h-5 rounded-full bg-[#FF8C52] text-white flex items-center justify-center font-extrabold text-xs">
                    <Check className="w-3 h-3" />
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
