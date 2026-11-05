import React, { useState } from 'react';
import { Award, Users, Plus, CheckCircle, ChevronLeft, ChevronRight, Eye, ShieldAlert } from 'lucide-react';
import { HomeroomTeacher, AssessmentItem, LearningGroup, AchievementLevel, Student } from '../../../types';
import { INITIAL_ASSESSMENTS, INITIAL_LEARNING_GROUPS } from '../../../data/mockData';
import { StatusChip } from '../../../components/StatusChip';
import { DataContohBadge } from '../../../components/DataContohBadge';

interface ModulAsesmenNilaiProps {
  teacher: HomeroomTeacher;
  students: Student[];
  onShowToast: (msg: string) => void;
}

export const ModulAsesmenNilai: React.FC<ModulAsesmenNilaiProps> = ({
  teacher,
  students,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'daftar' | 'input' | 'kelompok'>('daftar');
  const [assessments, setAssessments] = useState<AssessmentItem[]>(INITIAL_ASSESSMENTS);
  const [selectedAssessmentId, setSelectedAssessmentId] = useState<string>(assessments[0].id);
  const [groups, setGroups] = useState<LearningGroup[]>(INITIAL_LEARNING_GROUPS);

  // Input Penilaian: index of active student for mobile card navigation
  const [currentStudentIdx, setCurrentStudentIdx] = useState<number>(0);

  // Active assessment item
  const activeAssessment = assessments.find((a) => a.id === selectedAssessmentId) || assessments[0];

  // Results map for active assessment
  const [resultsMap, setResultsMap] = useState<Record<string, { level: AchievementLevel; notes: string }>>(() => {
    const map: Record<string, { level: AchievementLevel; notes: string }> = {};
    students.forEach((st, idx) => {
      const existing = activeAssessment.results.find((r) => r.studentId === st.id);
      if (existing) {
        map[st.id] = { level: existing.level, notes: existing.notes || '' };
      } else {
        const lvl: AchievementLevel = idx % 4 === 0 ? 'sangat_baik' : idx % 3 === 0 ? 'perlu_bimbingan' : 'sesuai_harapan';
        map[st.id] = { level: lvl, notes: '' };
      }
    });
    return map;
  });

  const levelOptions: { key: AchievementLevel; labelGuru: string; labelMurid: string; bg: string; text: string }[] = [
    { key: 'perlu_bimbingan', labelGuru: 'Perlu bimbingan', labelMurid: 'Terus berlatih', bg: '#FFD9C2', text: '#7A2E00' },
    { key: 'mulai_terlihat', labelGuru: 'Mulai terlihat', labelMurid: 'Mulai terlihat', bg: '#EADFB8', text: '#4B4524' },
    { key: 'sesuai_harapan', labelGuru: 'Sesuai harapan', labelMurid: 'Sudah sesuai', bg: '#CFEFEC', text: '#12383A' },
    { key: 'sangat_baik', labelGuru: 'Sangat baik', labelMurid: 'Hebat', bg: '#CDEFD0', text: '#174D1F' },
  ];

  // Toggle publish
  const handleTogglePublish = (asmId: string) => {
    setAssessments((prev) =>
      prev.map((asm) => {
        if (asm.id === asmId) {
          const nextState = !asm.isPublished;
          if (nextState) {
            onShowToast('Nilai sudah terlihat oleh murid dan orang tua.');
          } else {
            onShowToast('Nilai ditarik. Murid dan orang tua tidak lagi melihatnya.');
          }
          return {
            ...asm,
            isPublished: nextState,
            publishedAt: nextState ? '2026-11-05' : undefined,
          };
        }
        return asm;
      })
    );
  };

  const currentStudent = students[currentStudentIdx] || students[0];
  const currentResult = resultsMap[currentStudent.id] || { level: 'sesuai_harapan', notes: '' };

  const handleUpdateStudentLevel = (level: AchievementLevel) => {
    setResultsMap((prev) => ({
      ...prev,
      [currentStudent.id]: {
        ...prev[currentStudent.id],
        level,
      },
    }));
  };

  const handleUpdateStudentNote = (notes: string) => {
    setResultsMap((prev) => ({
      ...prev,
      [currentStudent.id]: {
        ...prev[currentStudent.id],
        notes,
      },
    }));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b-2 border-[#12383A]">
        <div>
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-[#FF8C52]" />
            <h2 className="text-2xl font-extrabold text-[#12383A]">
              Asesmen dan Nilai (Kelas {teacher.grade})
            </h2>
            <DataContohBadge />
          </div>
          <p className="text-xs sm:text-sm text-[#12383A]/80 font-medium mt-1">
            Asesmen diagnostik, formatif, dan sumatif dengan 4 level capaian ramah anak tanpa pemeringkatan.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-white border-2 border-[#12383A] shadow-tactile-mini self-start">
          <button
            onClick={() => setActiveTab('daftar')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'daftar'
                ? 'bg-[#12383A] text-[#FFF0C5] shadow-tactile-mini'
                : 'text-[#12383A] hover:bg-[#FFF0C5]'
            }`}
          >
            Daftar Asesmen
          </button>
          <button
            onClick={() => setActiveTab('input')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'input'
                ? 'bg-[#12383A] text-[#FFF0C5] shadow-tactile-mini'
                : 'text-[#12383A] hover:bg-[#FFF0C5]'
            }`}
          >
            Input Penilaian (30 Murid)
          </button>
          <button
            onClick={() => setActiveTab('kelompok')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'kelompok'
                ? 'bg-[#12383A] text-[#FFF0C5] shadow-tactile-mini'
                : 'text-[#12383A] hover:bg-[#FFF0C5]'
            }`}
          >
            Kelompok Belajar ({groups.length})
          </button>
        </div>
      </div>

      {/* TAB 1: DAFTAR ASESMEN (RG10) */}
      {activeTab === 'daftar' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assessments.map((asm) => (
              <div
                key={asm.id}
                className="tactile-card p-5 bg-white border-2 border-[#12383A] shadow-tactile-card flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FFFAE6] border border-[#12383A] text-xs font-extrabold uppercase">
                      {asm.kind} • {asm.subject}
                    </span>
                    <StatusChip
                      status={asm.isPublished ? 'Terlihat murid dan orang tua' : 'Hanya Anda'}
                      size="sm"
                    />
                  </div>

                  <h3 className="font-extrabold text-base text-[#12383A] mb-1">
                    {asm.title}
                  </h3>
                  <p className="text-xs text-[#12383A]/70 font-semibold mb-3">
                    Kode Tujuan: {asm.objectiveCode} • {asm.results.length} Murid Ternilai
                  </p>

                  <div className="p-3 rounded-xl bg-[#FFFAE6] border border-[#12383A] text-xs space-y-1 mb-3">
                    <span className="font-extrabold text-[#359FA0] block">
                      Analisis Capaian Kelas:
                    </span>
                    <p className="text-[#12383A]/80 font-medium">
                      Mayoritas murid berada di level <strong className="text-[#12383A]">Sesuai Harapan</strong>. Tersedia 3 murid perlu bimbingan fonik.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#12383A]/20">
                  <button
                    onClick={() => {
                      setSelectedAssessmentId(asm.id);
                      setActiveTab('input');
                    }}
                    className="tactile-btn px-4 py-2 rounded-full bg-[#359FA0] text-white text-xs font-extrabold hover:bg-[#2b8384]"
                  >
                    Buka Lembar Nilai
                  </button>

                  <button
                    onClick={() => handleTogglePublish(asm.id)}
                    className={`tactile-btn px-4 py-2 rounded-full text-xs font-extrabold transition-all ${
                      asm.isPublished
                        ? 'bg-[#FFD9C2] text-[#7A2E00] hover:bg-[#ffc6a3]'
                        : 'bg-[#FF8C52] text-white hover:bg-[#ff7b36]'
                    }`}
                  >
                    {asm.isPublished ? 'Tarik Nilai' : 'Terbitkan Nilai'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: INPUT PENILAIAN CEPAT (RG11) */}
      {activeTab === 'input' && (
        <div className="space-y-5">
          {/* Top Bar for Selected Assessment */}
          <div className="p-4 rounded-2xl bg-[#CFEFEC] border-2 border-[#12383A] shadow-tactile-mini flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-[#12383A]/70 block">Sedang Menilai:</span>
              <h3 className="font-extrabold text-base text-[#12383A]">
                {activeAssessment.title} ({activeAssessment.subject})
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleTogglePublish(activeAssessment.id)}
                className={`tactile-btn px-4 py-2 rounded-full text-xs font-extrabold ${
                  activeAssessment.isPublished
                    ? 'bg-[#FFD9C2] text-[#7A2E00]'
                    : 'bg-[#FF8C52] text-white'
                }`}
              >
                {activeAssessment.isPublished ? 'Tarik Nilai' : 'Terbitkan Nilai ke Orang Tua'}
              </button>
            </div>
          </div>

          {/* Single Student Card for Focus Evaluation (Mobile & Desktop Friendly) */}
          <div className="tactile-card p-6 bg-white border-2 border-[#12383A] shadow-tactile-card space-y-5">
            {/* Student Progress Header */}
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#12383A]">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-[#FF8C52] text-white font-extrabold text-sm flex items-center justify-center border-2 border-[#12383A] shadow-tactile-mini">
                  {currentStudentIdx + 1}
                </span>
                <div>
                  <h3 className="text-xl font-extrabold text-[#12383A]">
                    {currentStudent.name}
                  </h3>
                  <span className="text-xs text-[#12383A]/70 font-bold">
                    Murid ke {currentStudentIdx + 1} dari {students.length}
                  </span>
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-2">
                <button
                  disabled={currentStudentIdx === 0}
                  onClick={() => setCurrentStudentIdx(currentStudentIdx - 1)}
                  className="tactile-btn p-2 rounded-full bg-white border-2 border-[#12383A] disabled:opacity-30"
                  title="Murid Sebelumnya"
                >
                  <ChevronLeft className="w-5 h-5 text-[#12383A]" />
                </button>
                <button
                  disabled={currentStudentIdx === students.length - 1}
                  onClick={() => setCurrentStudentIdx(currentStudentIdx + 1)}
                  className="tactile-btn p-2 rounded-full bg-white border-2 border-[#12383A] disabled:opacity-30"
                  title="Murid Berikutnya"
                >
                  <ChevronRight className="w-5 h-5 text-[#12383A]" />
                </button>
              </div>
            </div>

            {/* 4 Level Capaian Selector */}
            <div>
              <label className="block text-xs font-extrabold uppercase text-[#359FA0] tracking-wide mb-2">
                Tingkat Capaian Kompetensi (Satu Ketukan)
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {levelOptions.map((opt) => {
                  const isSelected = currentResult.level === opt.key;
                  return (
                    <button
                      type="button"
                      key={opt.key}
                      onClick={() => handleUpdateStudentLevel(opt.key)}
                      className={`p-4 rounded-2xl border-2 border-[#12383A] text-left transition-all ${
                        isSelected
                          ? 'shadow-tactile-btn -translate-y-1 ring-2 ring-[#FF8C52]'
                          : 'bg-white opacity-85 hover:opacity-100 shadow-tactile-mini'
                      }`}
                      style={{ backgroundColor: opt.bg, color: opt.text }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-extrabold text-sm block">
                          {opt.labelGuru}
                        </span>
                        {isSelected && <span className="font-extrabold text-xs">✓</span>}
                      </div>
                      <span className="text-[11px] font-bold block opacity-90">
                        Terlihat murid: "{opt.labelMurid}"
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Catatan Deskriptif Positif */}
            <div>
              <label className="block text-xs font-extrabold text-[#12383A] mb-1">
                Catatan Umpan Balik Menguatkan
              </label>
              <input
                type="text"
                value={currentResult.notes}
                onChange={(e) => handleUpdateStudentNote(e.target.value)}
                placeholder="Contoh: Sudah sangat lancar menyebutkan huruf vokal, lanjutkan berlatih..."
                className="w-full p-3 rounded-2xl border-2 border-[#12383A] bg-[#FFFAE6] text-xs text-[#12383A]"
              />
            </div>

            {/* Action Bottom Nav */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-[#12383A]/70 font-semibold">
                Tersimpan otomatis sebagai draf
              </span>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    if (currentStudentIdx < students.length - 1) {
                      setCurrentStudentIdx(currentStudentIdx + 1);
                      onShowToast(`Nilai tersimpan. Lanjut ke murid ${students[currentStudentIdx + 1].name}.`);
                    } else {
                      onShowToast('Seluruh 30 murid telah dinilai.');
                    }
                  }}
                  className="tactile-btn w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#FF8C52] text-white font-extrabold text-xs sm:text-sm hover:bg-[#ff7b36]"
                >
                  {currentStudentIdx < students.length - 1 ? 'Murid Berikutnya →' : 'Selesai 30 Murid ✓'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: KELOMPOK BELAJAR (RG12) */}
      {activeTab === 'kelompok' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-[#FFFAE6] border-2 border-[#12383A] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-extrabold text-base text-[#12383A]">
                Kelompok Belajar Fleksibel (Dukungan dan Pengayaan)
              </h3>
              <p className="text-xs text-[#12383A]/80 font-medium">
                Disusun dari hasil asesmen. Keanggotaan tidak terlihat murid dan bersifat sementara agar tidak melabeli anak.
              </p>
            </div>

            <button
              onClick={() => onShowToast('Fitur buat kelompok baru dibuka.')}
              className="tactile-btn px-4 py-2 rounded-full bg-[#359FA0] text-white text-xs font-extrabold flex items-center gap-1.5 self-start"
            >
              <Plus className="w-4 h-4" />
              <span>Susun Kelompok Baru</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {groups.map((grp) => (
              <div
                key={grp.id}
                className="tactile-card p-5 bg-white border-2 border-[#12383A] shadow-tactile-card space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-extrabold border border-[#12383A] ${
                      grp.type === 'dukungan'
                        ? 'bg-[#FFD9C2] text-[#7A2E00]'
                        : 'bg-[#CDEFD0] text-[#174D1F]'
                    }`}
                  >
                    {grp.type === 'dukungan' ? 'Kelompok Dukungan' : 'Kelompok Pengayaan'}
                  </span>
                  <span className="text-xs font-bold text-[#12383A]/70">
                    Cek ulang: {grp.recheckDate}
                  </span>
                </div>

                <h4 className="font-extrabold text-base text-[#12383A]">
                  {grp.name}
                </h4>
                <p className="text-xs text-[#12383A]/80 font-medium">
                  Rencana: {grp.plan}
                </p>

                <div className="pt-2 border-t border-[#12383A]/20">
                  <span className="text-xs font-extrabold text-[#359FA0] block mb-1">
                    Anggota Murid ({grp.studentNames.length}):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {grp.studentNames.map((name, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-full bg-[#FFFAE6] border border-[#12383A] text-xs font-bold text-[#12383A]"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onShowToast(`Asesmen ulang untuk kelompok ${grp.name} dicatat.`)}
                  className="tactile-btn w-full py-2 rounded-full bg-[#FFF0C5] text-xs font-bold text-[#12383A] hover:bg-[#8AD6D1]"
                >
                  Asesmen Ulang dan Perbarui Kelompok
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
