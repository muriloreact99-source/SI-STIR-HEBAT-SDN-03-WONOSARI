import React, { useState } from 'react';
import { Heart, Sparkles, Send, Award, Users, Star } from 'lucide-react';
import { HomeroomTeacher, CocurricularProject, StudentHighlight, Student } from '../../../types';
import { HABIT_DEFINITIONS, INITIAL_PROJECTS, INITIAL_HIGHLIGHTS } from '../../../data/mockData';
import { DataContohBadge } from '../../../components/DataContohBadge';

interface ModulKarakterProjekProps {
  teacher: HomeroomTeacher;
  students: Student[];
  onShowToast: (msg: string) => void;
}

export const ModulKarakterProjek: React.FC<ModulKarakterProjekProps> = ({
  teacher,
  students,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'kebiasaan' | 'projek' | 'sorotan'>('kebiasaan');
  const [projects, setProjects] = useState<CocurricularProject[]>(INITIAL_PROJECTS);
  const [highlights, setHighlights] = useState<StudentHighlight[]>(INITIAL_HIGHLIGHTS);

  // New highlight state
  const [hlStudent, setHlStudent] = useState(students[0].name);
  const [hlTitle, setHlTitle] = useState('');
  const [hlContent, setHlContent] = useState('');
  const [hlType, setHlType] = useState<'karya' | 'kemajuan' | 'pesan'>('karya');

  const handleAddHighlight = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hlTitle.trim() || !hlContent.trim()) {
      onShowToast('Judul dan isi sorotan belum diisi.');
      return;
    }

    const newHl: StudentHighlight = {
      id: `hl-${Date.now()}`,
      studentName: hlStudent,
      grade: teacher.grade,
      type: hlType,
      title: hlTitle,
      content: hlContent,
      date: '2026-11-05',
    };

    setHighlights([newHl, ...highlights]);
    setHlTitle('');
    setHlContent('');
    onShowToast(`Sorotan untuk ananda ${hlStudent} diterbitkan ke Ruang Murid & Orang Tua.`);
  };

  const handleQuickCheer = (studentName: string) => {
    const newHl: StudentHighlight = {
      id: `hl-${Date.now()}`,
      studentName,
      grade: teacher.grade,
      type: 'pesan',
      title: 'Pesan Semangat Hari Ini',
      content: 'Terima kasih atas semangat belajarmu hari ini yang luar biasa. Ibu Guru sangat bangga padamu!',
      date: '2026-11-05',
    };
    setHighlights([newHl, ...highlights]);
    onShowToast(`Pesan semangat terkirim ke ananda ${studentName}.`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b-2 border-[#12383A]">
        <div>
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-[#FF8C52]" />
            <h2 className="text-2xl font-extrabold text-[#12383A]">
              Karakter dan Projek Kokurikuler (Kelas {teacher.grade})
            </h2>
            <DataContohBadge />
          </div>
          <p className="text-xs sm:text-sm text-[#12383A]/80 font-medium mt-1">
            Membiasakan 7 Kebiasaan Anak Indonesia Hebat, mendampingi projek berkesadaran, dan memberikan sorotan karya yang adil.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-white border-2 border-[#12383A] shadow-tactile-mini self-start">
          <button
            onClick={() => setActiveTab('kebiasaan')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'kebiasaan'
                ? 'bg-[#12383A] text-[#FFF0C5] shadow-tactile-mini'
                : 'text-[#12383A] hover:bg-[#FFF0C5]'
            }`}
          >
            7 Kebiasaan Kelas
          </button>
          <button
            onClick={() => setActiveTab('projek')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'projek'
                ? 'bg-[#12383A] text-[#FFF0C5] shadow-tactile-mini'
                : 'text-[#12383A] hover:bg-[#FFF0C5]'
            }`}
          >
            Projek Kokurikuler
          </button>
          <button
            onClick={() => setActiveTab('sorotan')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'sorotan'
                ? 'bg-[#12383A] text-[#FFF0C5] shadow-tactile-mini'
                : 'text-[#12383A] hover:bg-[#FFF0C5]'
            }`}
          >
            Sorotan dan Semangat ({highlights.length})
          </button>
        </div>
      </div>

      {/* TAB 1: 7 KEBIASAAN KELAS (RG14) */}
      {activeTab === 'kebiasaan' && (
        <div className="space-y-5">
          <div className="tactile-card p-5 bg-[#FFFAE6] border-2 border-[#12383A] shadow-tactile-card flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-extrabold text-base text-[#12383A]">
                Pemantauan 7 Kebiasaan Anak Indonesia Hebat
              </h3>
              <p className="text-xs text-[#12383A]/80 font-medium mt-0.5">
                Diisi oleh murid dan orang tua dari rumah. Guru memantau ringkasan kelas secara netral tanpa penghakiman.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#CDEFD0] text-[#174D1F] border border-[#12383A] font-extrabold text-xs">
              26 dari 30 murid aktif
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {HABIT_DEFINITIONS.map((h) => (
              <div
                key={h.id}
                className="tactile-card p-4 bg-white border-2 border-[#12383A] shadow-tactile-card space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{h.icon}</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#CFEFEC] text-[10px] font-bold text-[#12383A] border border-[#12383A]">
                    {h.dimension}
                  </span>
                </div>
                <h4 className="font-extrabold text-sm text-[#12383A]">
                  {h.id}. {h.name}
                </h4>
                <p className="text-xs text-[#12383A]/70 font-medium">
                  {h.description}
                </p>
                <div className="pt-2 border-t border-[#12383A]/20 flex justify-between items-center text-xs">
                  <span className="text-[#12383A]/70 font-semibold">Tercatat hari ini:</span>
                  <strong className="text-[#359FA0] font-extrabold">24 murid (80%)</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: PROJEK KOKURIKULER (RG15) */}
      {activeTab === 'projek' && (
        <div className="space-y-5">
          <div className="flex justify-between items-center">
            <h3 className="font-extrabold text-base text-[#12383A]">
              Projek Kokurikuler Terdaftar
            </h3>
            <button
              onClick={() => onShowToast('Fitur projek baru dibuka.')}
              className="tactile-btn px-4 py-1.5 rounded-full bg-[#FF8C52] text-white text-xs font-bold"
            >
              + Rancang Projek Baru
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projects.map((prj) => (
              <div
                key={prj.id}
                className="tactile-card p-6 bg-white border-2 border-[#12383A] shadow-tactile-card space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#FFF0C5] text-xs font-extrabold text-[#12383A] border border-[#12383A]">
                    Tema: {prj.theme}
                  </span>
                  <span className="text-xs font-bold text-[#12383A]/70">
                    Kelas {prj.grade}
                  </span>
                </div>

                <div>
                  <h4 className="text-lg font-extrabold text-[#12383A] mb-1">
                    {prj.title}
                  </h4>
                  <p className="text-xs text-[#12383A]/80 italic font-medium bg-[#FFFAE6] p-2.5 rounded-xl border border-[#12383A]/20">
                    "{prj.drivingQuestion}"
                  </p>
                </div>

                {prj.partnerTeacher && (
                  <div className="p-2.5 rounded-xl bg-[#CFEFEC] border border-[#12383A] text-xs font-bold text-[#12383A] flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-[#359FA0]" />
                    <span>Mitra Lintas Kelas: {prj.partnerTeacher}</span>
                  </div>
                )}

                {/* 5 Tahapan Projek */}
                <div className="space-y-1.5 pt-2 border-t border-[#12383A]/20">
                  <span className="text-xs font-extrabold uppercase text-[#359FA0] block mb-1">
                    5 Tahap Pelaksanaan:
                  </span>
                  {prj.stages.map((stg, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between text-xs p-1.5 rounded-lg bg-[#FFFAE6]"
                    >
                      <span className="font-bold text-[#12383A]">
                        {i + 1}. {stg.name}: {stg.description}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                          stg.completed ? 'bg-[#CDEFD0] text-[#174D1F]' : 'bg-[#EADFB8] text-[#4B4524]'
                        }`}
                      >
                        {stg.completed ? 'Selesai' : 'Berjalan'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SOROTAN KARYA DAN PESAN SEMANGAT (RG16) */}
      {activeTab === 'sorotan' && (
        <div className="space-y-6">
          {/* Penjaga Adil Callout */}
          <div className="p-4 rounded-2xl bg-[#FFF0C5] border-2 border-[#12383A] shadow-tactile-mini flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-[#FF8C52] shrink-0" />
              <div>
                <span className="font-extrabold text-sm text-[#12383A] block">
                  Penjaga Adil Perhatian Guru
                </span>
                <span className="text-xs text-[#12383A]/80 font-medium">
                  Ada 7 murid yang belum pernah Anda sorot bulan ini. Mari pastikan setiap anak merasakan apresiasi atas usahanya.
                </span>
              </div>
            </div>
            <button
              onClick={() => handleQuickCheer('Murid contoh 14')}
              className="tactile-btn px-4 py-2 rounded-full bg-[#FF8C52] text-white text-xs font-extrabold shrink-0"
            >
              Kirim Semangat Cepat
            </button>
          </div>

          {/* Form Tambah Sorotan */}
          <div className="tactile-card p-6 bg-white border-2 border-[#12383A] shadow-tactile-card space-y-4">
            <h3 className="font-extrabold text-base text-[#12383A]">
              Tambah Sorotan Karya / Kemajuan Baru
            </h3>

            <form onSubmit={handleAddHighlight} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-extrabold text-[#12383A] mb-1">
                    Pilih Murid
                  </label>
                  <select
                    value={hlStudent}
                    onChange={(e) => setHlStudent(e.target.value)}
                    className="w-full p-2.5 rounded-xl border-2 border-[#12383A] bg-[#FFFAE6] text-xs font-bold"
                  >
                    {students.map((st) => (
                      <option key={st.id} value={st.name}>
                        {st.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-[#12383A] mb-1">
                    Jenis Sorotan
                  </label>
                  <select
                    value={hlType}
                    onChange={(e) => setHlType(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border-2 border-[#12383A] bg-[#FFFAE6] text-xs font-bold"
                  >
                    <option value="karya">Sorotan Karya (Kreativitas)</option>
                    <option value="kemajuan">Kemajuan Belajar Nyata</option>
                    <option value="pesan">Pesan Semangat Guru</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#12383A] mb-1">
                  Judul Apresiasi
                </label>
                <input
                  type="text"
                  required
                  value={hlTitle}
                  onChange={(e) => setHlTitle(e.target.value)}
                  placeholder="Contoh: Sangat Berani Membaca Nyaring di Depan Kelas"
                  className="w-full p-2.5 rounded-xl border-2 border-[#12383A] bg-[#FFFAE6] text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#12383A] mb-1">
                  Uraian Apresiasi yang Menguatkan
                </label>
                <textarea
                  rows={2}
                  required
                  value={hlContent}
                  onChange={(e) => setHlContent(e.target.value)}
                  placeholder="Ceritakan usaha konkret ananda agar murid dan orang tua membacanya dengan bangga..."
                  className="w-full p-2.5 rounded-xl border-2 border-[#12383A] bg-[#FFFAE6] text-xs"
                />
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  className="tactile-btn px-6 py-2.5 rounded-full bg-[#359FA0] text-white text-xs font-extrabold hover:bg-[#2b8384]"
                >
                  Terbitkan Sorotan ke Ruang Murid & Orang Tua
                </button>
              </div>
            </form>
          </div>

          {/* Daftar Sorotan Aktif */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-base text-[#12383A]">
              Sorotan Karya yang Sedang Tampil ({highlights.length})
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {highlights.map((hl) => (
                <div
                  key={hl.id}
                  className="tactile-card p-4 bg-[#FFFAE6] border-2 border-[#12383A] shadow-tactile-card space-y-2 text-xs"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-extrabold text-sm text-[#12383A]">
                      🌟 {hl.studentName}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-white text-[10px] font-bold border border-[#12383A]">
                      {hl.type}
                    </span>
                  </div>

                  <strong className="text-sm font-extrabold text-[#FF8C52] block">
                    {hl.title}
                  </strong>
                  <p className="text-xs text-[#12383A]/90 font-medium">
                    {hl.content}
                  </p>
                  <span className="text-[10px] text-[#12383A]/60 block pt-1">
                    Diterbitkan: {hl.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
