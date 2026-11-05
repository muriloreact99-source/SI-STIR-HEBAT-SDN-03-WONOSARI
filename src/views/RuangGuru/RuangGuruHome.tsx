import React from 'react';
import { ArrowRight, CheckCircle2, Clock, Calendar, Sparkles, BookOpen } from 'lucide-react';
import { HomeroomTeacher, GradeLevel } from '../../types';
import { HOMEROOM_TEACHERS } from '../../data/mockData';
import { StatusChip } from '../../components/StatusChip';
import { DataContohBadge } from '../../components/DataContohBadge';

interface RuangGuruHomeProps {
  currentTeacher: HomeroomTeacher;
  onOpenRuangPribadi: (grade?: GradeLevel) => void;
  onSelectTeacherGrade: (grade: GradeLevel) => void;
  onShowToast: (msg: string) => void;
}

export const RuangGuruHome: React.FC<RuangGuruHomeProps> = ({
  currentTeacher,
  onOpenRuangPribadi,
  onSelectTeacherGrade,
  onShowToast,
}) => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Sapaan & Banner Profil Guru */}
      <div className="tactile-card-lg p-6 sm:p-8 bg-[#FFFAE6] border-2 border-[#12383A] shadow-tactile-card relative overflow-hidden">
        <div className="ribbon-4-strip -mt-6 sm:-mt-8 -mx-6 sm:-mx-8 mb-6">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-3xl">{currentTeacher.sticker}</span>
              <span className="px-3 py-1 rounded-full bg-[#8AD6D1] border-2 border-[#12383A] text-xs font-extrabold text-[#12383A] shadow-tactile-mini">
                Wali Kelas {currentTeacher.grade} • Fase {currentTeacher.phase}
              </span>
              <DataContohBadge />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#12383A] tracking-tight">
              Selamat datang, {currentTeacher.name}
            </h1>
            <p className="text-sm sm:text-base text-[#12383A]/80 font-medium max-w-2xl">
              Fokus kurikulum: <strong className="text-[#12383A] font-extrabold">{currentTeacher.roomTitle}</strong> ({currentTeacher.mainPita}). Ruang kerja harian ini dirancang agar administrasi tuntas cepat dan data berujung pada tindakan nyata bagi murid.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenRuangPribadi(currentTeacher.grade)}
              className="tactile-btn flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#FF8C52] text-white font-extrabold text-sm sm:text-base hover:bg-[#ff7b36] transition-all"
            >
              <Sparkles className="w-5 h-5" />
              <span>Buka Ruang Pribadi</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Kartu Besar Panggilan Utama: Ruang Pribadi Anda */}
      <div className="tactile-card p-6 bg-gradient-to-r from-[#CFEFEC] to-[#FFFAE6] border-2 border-[#12383A] shadow-tactile-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#FF8C52] text-white text-[11px] font-extrabold uppercase tracking-wider">
                Area Kerja Harian
              </span>
              <StatusChip status="Hanya Anda" size="sm" />
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#12383A]">
              Ruang Pribadi Wali Kelas {currentTeacher.grade}
            </h2>
            <p className="text-xs sm:text-sm text-[#12383A]/80 font-medium">
              Akses cepat Absen 30 murid (kurang dari 1 menit), Jurnal Mengajar harian, Peta Kurikulum, Asesmen 4 level capaian, dan Catatan Pribadi terlindungi.
            </p>
          </div>

          <button
            onClick={() => onOpenRuangPribadi(currentTeacher.grade)}
            className="tactile-btn flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#359FA0] text-white font-bold text-sm hover:bg-[#2c8586] shrink-0"
          >
            <BookOpen className="w-4 h-4" />
            <span>Masuk ke 10 Modul Pembelajaran</span>
          </button>
        </div>
      </div>

      {/* Grid: Tugas Minggu Ini & Sorotan Indikator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tugas Minggu Ini */}
        <div className="lg:col-span-2 tactile-card p-6 bg-white border-2 border-[#12383A] shadow-tactile-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b-2 border-[#12383A]">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#359FA0]" />
              <h3 className="font-extrabold text-lg text-[#12383A]">Tugas Minggu Ini</h3>
            </div>
            <span className="text-xs font-bold text-[#12383A]/70">
              3 agenda prioritas
            </span>
          </div>

          <div className="space-y-3">
            {currentTeacher.weeklyPriorities.map((task, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-[#FFFAE6] border-2 border-[#12383A] shadow-tactile-mini flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-lg bg-[#359FA0] text-white font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-[#12383A] leading-snug">{task}</p>
                  <span className="text-[11px] font-semibold text-[#12383A]/70">
                    Jatuh tempo: Jumat pekan ini
                  </span>
                </div>
                <button
                  onClick={() => onShowToast(`Tugas "${task.slice(0, 20)}..." sedang diproses.`)}
                  className="tactile-btn px-3 py-1.5 rounded-full bg-white text-xs font-bold text-[#12383A] hover:bg-[#CFEFEC] shrink-0"
                >
                  Buka
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Indikator Dampak Murid */}
        <div className="tactile-card p-6 bg-[#FFFAE6] border-2 border-[#12383A] shadow-tactile-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b-2 border-[#12383A]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#FF8C52]" />
              <h3 className="font-extrabold text-lg text-[#12383A]">Dampak Terpantau</h3>
            </div>
            <DataContohBadge />
          </div>

          <div className="space-y-3">
            {currentTeacher.highlightedMetrics.map((metric, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-white border-2 border-[#12383A] shadow-tactile-mini">
                <span className="block text-[11px] font-extrabold uppercase text-[#359FA0] tracking-wider mb-1">
                  Indikator {idx + 1}
                </span>
                <p className="text-sm font-bold text-[#12383A]">{metric}</p>
              </div>
            ))}
            <div className="p-3.5 rounded-2xl bg-[#CFEFEC] border-2 border-[#12383A] shadow-tactile-mini">
              <span className="block text-[11px] font-extrabold uppercase text-[#12383A] tracking-wider mb-1">
                Projek Kokurikuler Aktif
              </span>
              <p className="text-sm font-extrabold text-[#12383A]">
                {currentTeacher.sampleProject}
              </p>
              <span className="text-xs font-medium text-[#12383A]/80">
                Tema: {currentTeacher.projectTheme}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bagian 12 DESIGN.md: DAFTAR ENAM KELAS */}
      <div className="space-y-4 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-extrabold text-[#12383A]">Daftar Kelas SDN 03 Wonosari</h2>
              <DataContohBadge />
            </div>
            <p className="text-xs sm:text-sm text-[#12383A]/80 font-medium">
              Sesuai aturan akses SI STIR HEBAT: guru dapat membuka penuh kelas yang diampunya. Kelas lain bersifat info agregat.
            </p>
          </div>
        </div>

        {/* 6 Class Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {HOMEROOM_TEACHERS.map((teacher) => {
            const isMyClass = currentTeacher.grade === teacher.grade;
            return (
              <div
                key={teacher.id}
                className={`tactile-card p-5 border-2 border-[#12383A] shadow-tactile-card flex flex-col justify-between transition-all ${
                  isMyClass ? 'bg-[#FFFAE6] ring-2 ring-[#FF8C52]' : 'bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl">{teacher.sticker}</span>
                      <div>
                        <h3 className="font-extrabold text-lg text-[#12383A]">
                          Kelas {teacher.grade}
                        </h3>
                        <span className="text-xs font-bold text-[#359FA0]">
                          Fase {teacher.phase}
                        </span>
                      </div>
                    </div>
                    {isMyClass ? (
                      <span className="px-3 py-1 rounded-full bg-[#FF8C52] text-white font-extrabold text-xs uppercase border-2 border-[#12383A] shadow-tactile-mini">
                        Kelas Anda
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#FFFAE6] text-[#12383A] font-bold text-xs border border-[#12383A]">
                        Wali Lain
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 py-3 border-y border-[#12383A]/20 mb-4 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-[#12383A]/70">Wali kelas:</span>
                      <strong className="font-extrabold text-[#12383A]">{teacher.name}</strong>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-[#12383A]/70">Jumlah murid:</span>
                      <strong className="font-extrabold text-[#12383A]">30 murid</strong>
                    </div>
                    <div className="flex justify-between items-center pt-1">
                      <span className="font-medium text-[#12383A]/70">Absen hari ini:</span>
                      <StatusChip
                        status={isMyClass ? 'Absen hari ini sudah diisi' : 'Absen hari ini sudah diisi'}
                        size="sm"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  {isMyClass ? (
                    <button
                      onClick={() => onOpenRuangPribadi(teacher.grade)}
                      className="tactile-btn w-full py-3 px-4 rounded-full bg-[#359FA0] text-white font-extrabold text-sm hover:bg-[#2a8586] flex items-center justify-center gap-2"
                    >
                      <span>Buka Kelas Anda</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        onSelectTeacherGrade(teacher.grade);
                        onShowToast(`Beralih ke ruang kerja ${teacher.name} (Kelas ${teacher.grade}).`);
                      }}
                      className="tactile-btn w-full py-2.5 px-4 rounded-full bg-white text-[#12383A] font-bold text-xs hover:bg-[#FFF0C5] flex items-center justify-center gap-1.5"
                    >
                      <span>Lihat Sebagai Wali Kelas {teacher.grade}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Guru Mata Pelajaran (PJOK dan PAI) sesuai DESIGN.md bagian 12 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-[#FFFAE6] border-2 border-dashed border-[#12383A] flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">🏃‍♂️</span>
                <span className="font-extrabold text-sm text-[#12383A]">Guru PJOK (Pendidikan Jasmani)</span>
                <DataContohBadge />
              </div>
              <p className="text-xs text-[#12383A]/70 mt-0.5">Penugasan resmi sekolah belum ditetapkan</p>
            </div>
            <span className="text-xs font-bold text-[#12383A]/60 px-3 py-1 rounded-full bg-white border border-[#12383A]">
              Guru Mata Pelajaran
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFFAE6] border-2 border-dashed border-[#12383A] flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">📖</span>
                <span className="font-extrabold text-sm text-[#12383A]">Guru PAI (Pendidikan Agama Islam)</span>
                <DataContohBadge />
              </div>
              <p className="text-xs text-[#12383A]/70 mt-0.5">Penugasan resmi sekolah belum ditetapkan</p>
            </div>
            <span className="text-xs font-bold text-[#12383A]/60 px-3 py-1 rounded-full bg-white border border-[#12383A]">
              Guru Mata Pelajaran
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
