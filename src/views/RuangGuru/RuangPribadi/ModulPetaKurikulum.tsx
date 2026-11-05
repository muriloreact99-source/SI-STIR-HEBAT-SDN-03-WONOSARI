import React, { useState } from 'react';
import { Compass, CheckCircle2, Clock, Plus, HelpCircle, ArrowRight } from 'lucide-react';
import { HomeroomTeacher, LearningObjective } from '../../../types';
import { INITIAL_OBJECTIVES } from '../../../data/mockData';
import { DataContohBadge } from '../../../components/DataContohBadge';

interface ModulPetaKurikulumProps {
  teacher: HomeroomTeacher;
  onShowToast: (msg: string) => void;
}

export const ModulPetaKurikulum: React.FC<ModulPetaKurikulumProps> = ({
  teacher,
  onShowToast,
}) => {
  const [objectives, setObjectives] = useState<LearningObjective[]>(INITIAL_OBJECTIVES);
  const [selectedSubject, setSelectedSubject] = useState<string>('Bahasa Indonesia');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newCode, setNewCode] = useState('');
  const [newText, setNewText] = useState('');
  const [newKktp, setNewKktp] = useState('');

  const subjects = [
    'Bahasa Indonesia',
    'Matematika',
    'Pendidikan Pancasila',
    'PJOK',
    'Seni dan Budaya',
    ...(teacher.grade >= 3 ? ['IPAS'] : []),
    ...(teacher.grade >= 5 ? ['Koding dan KA (Pilihan)'] : []),
  ];

  const currentList = objectives.filter(
    (tp) => tp.subject === selectedSubject && tp.grade === teacher.grade
  );

  const handleToggleStatus = (id: string) => {
    setObjectives((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextStatus =
            item.status === 'belum_dimulai'
              ? 'sedang_berjalan'
              : item.status === 'sedang_berjalan'
              ? 'tuntas'
              : 'belum_dimulai';
          return { ...item, status: nextStatus };
        }
        return item;
      })
    );
    onShowToast('Status Tujuan Pembelajaran diperbarui.');
  };

  const handleAddObjective = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;

    const newObj: LearningObjective = {
      id: `tp-custom-${Date.now()}`,
      code: newCode.trim() || `TP.${teacher.grade}.${currentList.length + 1}`,
      subject: selectedSubject,
      grade: teacher.grade,
      semester: 1,
      text: newText,
      status: 'belum_dimulai',
      isCustom: true,
      kktp: newKktp || 'Kriteria ketercapaian dirumuskan mandiri oleh guru.',
    };

    setObjectives((prev) => [...prev, newObj]);
    setNewCode('');
    setNewText('');
    setNewKktp('');
    setShowAddModal(false);
    onShowToast('Tujuan Pembelajaran buatan guru berhasil ditambahkan.');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b-2 border-[#12383A]">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-6 h-6 text-[#359FA0]" />
            <h2 className="text-2xl font-extrabold text-[#12383A]">
              Peta Kurikulum Fase {teacher.phase} (Kelas {teacher.grade})
            </h2>
            <DataContohBadge />
          </div>
          <p className="text-xs sm:text-sm text-[#12383A]/80 font-medium mt-1">
            Mengubah Capaian Pembelajaran (CP 046/H/KR/2025) menjadi Alur Tujuan Pembelajaran konkret yang dapat dicentang tuntas.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="tactile-btn px-4 py-2 rounded-full bg-[#FF8C52] text-white text-xs font-extrabold hover:bg-[#ff7b36] flex items-center gap-1.5 self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Tujuan Sendiri</span>
        </button>
      </div>

      {/* Tabs Mata Pelajaran */}
      <div className="flex flex-wrap gap-2">
        {subjects.map((sub) => (
          <button
            key={sub}
            onClick={() => setSelectedSubject(sub)}
            className={`px-4 py-2 rounded-full text-xs font-extrabold border-2 border-[#12383A] transition-all ${
              selectedSubject === sub
                ? 'bg-[#12383A] text-[#FFF0C5] shadow-tactile-btn'
                : 'bg-white text-[#12383A] hover:bg-[#FFF0C5] shadow-tactile-mini'
            }`}
          >
            {sub}
          </button>
        ))}
      </div>

      {/* Bilah Kemajuan Mapel Terpilih */}
      <div className="tactile-card p-5 bg-white border-2 border-[#12383A] shadow-tactile-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <h3 className="font-extrabold text-base text-[#12383A]">
              Alur Tujuan Pembelajaran: {selectedSubject}
            </h3>
            <span className="text-xs text-[#12383A]/70 font-bold">
              Semester 1 • {currentList.length} Tujuan Terdaftar
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-bold">
            <span className="flex items-center gap-1 text-[#174D1F]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#CDEFD0] border border-[#174D1F]" />
              Tuntas ({currentList.filter((x) => x.status === 'tuntas').length})
            </span>
            <span className="flex items-center gap-1 text-[#12383A]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#CFEFEC] border border-[#12383A]" />
              Berjalan ({currentList.filter((x) => x.status === 'sedang_berjalan').length})
            </span>
            <span className="flex items-center gap-1 text-[#4B4524]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EADFB8] border border-[#4B4524]" />
              Belum ({currentList.filter((x) => x.status === 'belum_dimulai').length})
            </span>
          </div>
        </div>

        {/* List TP */}
        {currentList.length === 0 ? (
          <div className="p-8 text-center rounded-2xl border-2 border-dashed border-[#12383A] bg-[#FFFAE6]">
            <p className="text-sm font-bold text-[#12383A] mb-3">
              Belum ada TP untuk mata pelajaran ini di Kelas {teacher.grade}.
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="tactile-btn px-4 py-2 rounded-full bg-[#359FA0] text-white text-xs font-bold"
            >
              Tambah Tujuan Sendiri
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {currentList.map((tp) => (
              <div
                key={tp.id}
                className="p-4 rounded-2xl bg-[#FFFAE6] border-2 border-[#12383A] shadow-tactile-mini flex flex-col md:flex-row md:items-center justify-between gap-3"
              >
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-[#12383A] text-[#FFF0C5] text-[11px] font-extrabold">
                      {tp.code}
                    </span>
                    {tp.isCustom && (
                      <span className="px-2 py-0.5 rounded-md bg-[#FFF0C5] text-[#12383A] text-[10px] font-bold border border-[#12383A]">
                        Buatan Guru
                      </span>
                    )}
                  </div>
                  <p className="font-bold text-sm text-[#12383A]">{tp.text}</p>
                  {tp.kktp && (
                    <div className="text-xs text-[#12383A]/80 font-medium bg-white/70 p-2 rounded-lg border border-[#12383A]/20">
                      <strong className="text-[#359FA0]">KKTP:</strong> {tp.kktp}
                    </div>
                  )}
                  {tp.studentsNeedingSupport && tp.studentsNeedingSupport.length > 0 && (
                    <div className="flex items-center gap-1 text-[11px] font-extrabold text-[#7A2E00]">
                      <span>Perlu bimbingan:</span>
                      <span className="underline">{tp.studentsNeedingSupport.join(', ')}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 self-end md:self-center">
                  <button
                    onClick={() => handleToggleStatus(tp.id)}
                    className={`tactile-btn px-4 py-1.5 rounded-full text-xs font-extrabold transition-all ${
                      tp.status === 'tuntas'
                        ? 'bg-[#CDEFD0] text-[#174D1F]'
                        : tp.status === 'sedang_berjalan'
                        ? 'bg-[#CFEFEC] text-[#12383A]'
                        : 'bg-[#EADFB8] text-[#4B4524]'
                    }`}
                  >
                    {tp.status === 'tuntas'
                      ? '✓ Tuntas'
                      : tp.status === 'sedang_berjalan'
                      ? '▶ Sedang Berjalan'
                      : '• Belum Dimulai'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Tambah Tujuan Sendiri */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#12383A]/60 backdrop-blur-sm">
          <div className="tactile-card p-6 bg-[#FFFAE6] border-2 border-[#12383A] shadow-tactile-card max-w-lg w-full space-y-4">
            <div className="flex justify-between items-center pb-2 border-b-2 border-[#12383A]">
              <h3 className="text-lg font-extrabold text-[#12383A]">
                Tambah Tujuan Pembelajaran Sendiri
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full border border-[#12383A] bg-white font-bold text-xs"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddObjective} className="space-y-3">
              <div>
                <label className="block text-xs font-extrabold text-[#12383A] mb-1">
                  Mata Pelajaran
                </label>
                <input
                  type="text"
                  disabled
                  value={selectedSubject}
                  className="w-full p-2.5 rounded-xl border-2 border-[#12383A] bg-white/70 text-xs font-bold text-[#12383A]"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#12383A] mb-1">
                  Kode TP (Opsional)
                </label>
                <input
                  type="text"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  placeholder="Contoh: B-IND.1.4"
                  className="w-full p-2.5 rounded-xl border-2 border-[#12383A] bg-white text-xs text-[#12383A]"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#12383A] mb-1">
                  Bunyi Tujuan Pembelajaran
                </label>
                <textarea
                  rows={3}
                  required
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  placeholder="Murid dapat menceritakan gambar yang dilihat dengan kalimat sederhana..."
                  className="w-full p-2.5 rounded-xl border-2 border-[#12383A] bg-white text-xs text-[#12383A]"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#12383A] mb-1">
                  Kriteria Ketercapaian (KKTP)
                </label>
                <input
                  type="text"
                  value={newKktp}
                  onChange={(e) => setNewKktp(e.target.value)}
                  placeholder="Mampu menyebutkan 3 hal dari gambar secara runtut..."
                  className="w-full p-2.5 rounded-xl border-2 border-[#12383A] bg-white text-xs text-[#12383A]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-full border-2 border-[#12383A] bg-white text-xs font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="tactile-btn px-5 py-2 rounded-full bg-[#FF8C52] text-white text-xs font-extrabold"
                >
                  Simpan Tujuan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
