import React, { useState } from 'react';
import { BookOpen, CheckCircle, TrendingUp, AlertTriangle } from 'lucide-react';
import { HomeroomTeacher, Student } from '../../../types';
import { DataContohBadge } from '../../../components/DataContohBadge';

interface ModulLiterasiNumerasiProps {
  teacher: HomeroomTeacher;
  students: Student[];
  onShowToast: (msg: string) => void;
}

export const ModulLiterasiNumerasi: React.FC<ModulLiterasiNumerasiProps> = ({
  teacher,
  students,
  onShowToast,
}) => {
  const [domain, setDomain] = useState<'literasi' | 'numerasi'>('literasi');
  const [selectedStudent, setSelectedStudent] = useState<Student>(students[0]);

  // Pita Literasi Levels
  const levelsLiterasiFaseA = [
    { level: 1, label: 'Mengenal huruf dan bunyi' },
    { level: 2, label: 'Membaca suku kata' },
    { level: 3, label: 'Membaca kata' },
    { level: 4, label: 'Membaca kalimat sederhana' },
    { level: 5, label: 'Membaca teks pendek dengan lancar' },
    { level: 6, label: 'Membaca teks pendek dan menceritakan isinya' },
  ];

  const levelsLiterasiFaseBC = [
    { level: 1, label: 'Membaca lancar teks informasi pendek' },
    { level: 2, label: 'Menemukan gagasan pokok' },
    { level: 3, label: 'Menyimpulkan dan menjelaskan dengan kata sendiri' },
    { level: 4, label: 'Membandingkan dua teks' },
    { level: 5, label: 'Menilai ketepatan informasi' },
  ];

  const levelsNumerasi = [
    { level: 1, label: 'Membilang benda konkret sampai 10' },
    { level: 2, label: 'Membilang benda konkret sampai 20' },
    { level: 3, label: 'Membandingkan banyak benda' },
    { level: 4, label: 'Menjumlah benda konkret' },
    { level: 5, label: 'Mengurang benda konkret' },
  ];

  const activeLevels =
    domain === 'numerasi'
      ? levelsNumerasi
      : teacher.phase === 'A'
      ? levelsLiterasiFaseA
      : levelsLiterasiFaseBC;

  const currentLevel =
    domain === 'literasi' ? selectedStudent.literacyLevel : selectedStudent.numeracyLevel;

  const handleLevelChange = (lvl: number) => {
    onShowToast(`Pita ${domain} untuk ${selectedStudent.name} diperbarui ke Level ${lvl}.`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b-2 border-[#12383A]">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[#359FA0]" />
            <h2 className="text-2xl font-extrabold text-[#12383A]">
              Pita Literasi dan Numerasi (Kelas {teacher.grade})
            </h2>
            <DataContohBadge />
          </div>
          <p className="text-xs sm:text-sm text-[#12383A]/80 font-medium mt-1">
            Memantau pertumbuhan dasar belajar secara konkret. Mengukur kemajuan murid terhadap dirinya sendiri tanpa perbandingan antar murid.
          </p>
        </div>

        {/* Domain Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-white border-2 border-[#12383A] shadow-tactile-mini self-start">
          <button
            onClick={() => setDomain('literasi')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              domain === 'literasi'
                ? 'bg-[#12383A] text-[#FFF0C5] shadow-tactile-mini'
                : 'text-[#12383A] hover:bg-[#FFF0C5]'
            }`}
          >
            Pita Literasi
          </button>
          <button
            onClick={() => setDomain('numerasi')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              domain === 'numerasi'
                ? 'bg-[#12383A] text-[#FFF0C5] shadow-tactile-mini'
                : 'text-[#12383A] hover:bg-[#FFF0C5]'
            }`}
          >
            Pita Numerasi
          </button>
        </div>
      </div>

      {/* Sebaran Level Kelas */}
      <div className="tactile-card p-5 bg-[#FFFAE6] border-2 border-[#12383A] shadow-tactile-card space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-base text-[#12383A]">
            Sebaran Capaian Kelas {teacher.grade} ({domain === 'literasi' ? 'Literasi' : 'Numerasi'})
          </h3>
          <span className="text-xs font-bold text-[#359FA0]">
            30 Murid Terpantau
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center">
          {activeLevels.map((lvl) => (
            <div
              key={lvl.level}
              className="p-3 rounded-2xl bg-white border-2 border-[#12383A] shadow-tactile-mini"
            >
              <span className="text-xs font-extrabold uppercase text-[#FF8C52] block">
                Level {lvl.level}
              </span>
              <strong className="text-xl font-extrabold text-[#12383A]">
                {lvl.level === 3 ? '12 Murid' : lvl.level === 4 ? '9 Murid' : '3 Murid'}
              </strong>
              <p className="text-[10px] text-[#12383A]/70 line-clamp-2 mt-0.5">
                {lvl.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Evaluasi Pita Per Murid */}
      <div className="tactile-card p-6 bg-white border-2 border-[#12383A] shadow-tactile-card space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b-2 border-[#12383A]">
          <div>
            <span className="text-xs font-bold text-[#12383A]/70 block">Pilih Murid:</span>
            <div className="flex items-center gap-2 mt-1">
              <select
                value={selectedStudent.id}
                onChange={(e) => {
                  const st = students.find((s) => s.id === e.target.value);
                  if (st) setSelectedStudent(st);
                }}
                className="px-4 py-2 rounded-full border-2 border-[#12383A] bg-[#FFFAE6] text-sm font-extrabold text-[#12383A] shadow-tactile-mini"
              >
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} (Wali: {s.parentName})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#12383A]/80">Capaian Saat Ini:</span>
            <span className="px-3 py-1 rounded-full bg-[#FF8C52] text-white text-xs font-extrabold border-2 border-[#12383A] shadow-tactile-mini">
              Level {currentLevel}
            </span>
          </div>
        </div>

        {/* Deretan Tombol Level Besar */}
        <div className="space-y-3">
          <label className="block text-xs font-extrabold uppercase tracking-wide text-[#359FA0]">
            Tingkatan Pita {domain === 'literasi' ? 'Literasi' : 'Numerasi'} (Pilih Level yang Baru Ditunjukkan Ananda)
          </label>

          <div className="space-y-2">
            {activeLevels.map((lvl) => {
              const isAchieved = currentLevel >= lvl.level;
              const isCurrent = currentLevel === lvl.level;
              return (
                <button
                  type="button"
                  key={lvl.level}
                  onClick={() => handleLevelChange(lvl.level)}
                  className={`w-full p-4 rounded-2xl border-2 border-[#12383A] text-left transition-all flex items-center justify-between ${
                    isCurrent
                      ? 'bg-[#12383A] text-[#FFF0C5] shadow-tactile-btn -translate-y-0.5'
                      : isAchieved
                      ? 'bg-[#CDEFD0] text-[#174D1F] shadow-tactile-mini'
                      : 'bg-[#FFFAE6] text-[#12383A] hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-8 h-8 rounded-full border-2 border-[#12383A] font-extrabold text-xs flex items-center justify-center shrink-0 ${
                        isCurrent
                          ? 'bg-[#FF8C52] text-white'
                          : isAchieved
                          ? 'bg-[#359FA0] text-white'
                          : 'bg-white text-[#12383A]'
                      }`}
                    >
                      {lvl.level}
                    </span>
                    <div>
                      <span className="font-extrabold text-sm block">
                        Level {lvl.level}: {lvl.label}
                      </span>
                      <span className="text-[11px] opacity-80 block">
                        {isCurrent ? 'Posisi aktif saat ini' : isAchieved ? 'Sudah terlampaui' : 'Tahap belajar berikutnya'}
                      </span>
                    </div>
                  </div>

                  {isCurrent && (
                    <span className="px-3 py-1 rounded-full bg-[#FF8C52] text-white text-xs font-extrabold">
                      Aktif
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Pita Kesiapan Spesifik Kelas 2 & Kelas 6 */}
        {teacher.grade === 2 && (
          <div className="p-4 rounded-2xl bg-[#CFEFEC] border-2 border-[#12383A] space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">🌿</span>
              <h4 className="font-extrabold text-sm text-[#12383A]">
                Pita Kesiapan Fase B (Gerbang Kelas 3)
              </h4>
            </div>
            <p className="text-xs text-[#12383A]/80 font-medium">
              Memastikan ananda sudah lancar membaca kalimat sebelum teks informasi IPAS dimulai di Kelas 3.
            </p>
          </div>
        )}

        {teacher.grade === 6 && (
          <div className="p-4 rounded-2xl bg-[#CFEFEC] border-2 border-[#12383A] space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">🏅</span>
              <h4 className="font-extrabold text-sm text-[#12383A]">
                Pita Kesiapan Masuk SMP
              </h4>
            </div>
            <p className="text-xs text-[#12383A]/80 font-medium">
              Ceklis kemandirian, literasi bernalar kritis, dan kesiapan transisi jenjang SMP.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
