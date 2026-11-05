import React, { useState } from 'react';
import { FileText, Send, CheckCircle2, Clock, Plus, BookOpen, AlertCircle, ArrowRight } from 'lucide-react';
import { HomeroomTeacher, LearningModule, TeacherJournal, ModuleStatus } from '../../../types';
import { INITIAL_MODULES, INITIAL_JOURNALS } from '../../../data/mockData';
import { StatusChip } from '../../../components/StatusChip';
import { DataContohBadge } from '../../../components/DataContohBadge';

interface ModulRencanaJurnalProps {
  teacher: HomeroomTeacher;
  onShowToast: (msg: string) => void;
}

export const ModulRencanaJurnal: React.FC<ModulRencanaJurnalProps> = ({
  teacher,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'modul' | 'wizard' | 'jurnal'>('modul');
  const [modules, setModules] = useState<LearningModule[]>(INITIAL_MODULES);
  const [journals, setJournals] = useState<TeacherJournal[]>(INITIAL_JOURNALS);

  // Wizard state (6 steps)
  const [wizardStep, setWizardStep] = useState<number>(1);
  const [modTitle, setModTitle] = useState('');
  const [modSubject, setModSubject] = useState('Bahasa Indonesia');
  const [modHours, setModHours] = useState('4 JP (2 x 35 Menit)');
  const [modDimensions, setModDimensions] = useState<string[]>(['Penalaran kritis', 'Kemandirian']);
  const [modMemahami, setModMemahami] = useState('');
  const [modMengaplikasi, setModMengaplikasi] = useState('');
  const [modMerefleksi, setModMerefleksi] = useState('');
  const [modAssessment, setModAssessment] = useState('');

  // New Journal state
  const [jrnSubject, setJrnSubject] = useState('Bahasa Indonesia');
  const [jrnWorkedWell, setJrnWorkedWell] = useState('');
  const [jrnToChange, setJrnToChange] = useState('');
  const [jrnEngagement, setJrnEngagement] = useState<'sangat_aktif' | 'aktif' | 'perlu_dipancing'>('aktif');

  const graduateDimensionsList = [
    'Keimanan dan ketakwaan',
    'Kewargaan',
    'Penalaran kritis',
    'Kreativitas',
    'Kolaborasi',
    'Kemandirian',
    'Kesehatan',
    'Komunikasi',
  ];

  // Submit module to Principal
  const handleAjukanModul = (moduleId: string) => {
    onShowToast('Sebentar ya, sedang disimpan.');
    setTimeout(() => {
      setModules((prev) =>
        prev.map((m) =>
          m.id === moduleId
            ? { ...m, status: 'Diajukan' as ModuleStatus, submittedAt: '2026-11-05' }
            : m
        )
      );
      onShowToast('Modul sudah diajukan ke Ibu Kepala Sekolah.');
    }, 600);
  };

  // Complete wizard
  const handleSaveModuleWizard = (asSubmit = false) => {
    if (!modTitle.trim()) {
      onShowToast('Kolom judul modul belum diisi.');
      return;
    }

    const newModule: LearningModule = {
      id: `mod-${Date.now()}`,
      title: modTitle,
      subject: modSubject,
      grade: teacher.grade,
      semester: 1,
      allocationHours: modHours,
      targetObjectives: [`TP.${teacher.grade}.1`],
      graduateDimensions: modDimensions,
      status: asSubmit ? 'Diajukan' : 'Draf',
      version: 1,
      submittedAt: asSubmit ? '2026-11-05' : undefined,
      experiences: {
        memahami: modMemahami || 'Mendengarkan penjelasan awal dan berdialog tentang konsep.',
        mengaplikasi: modMengaplikasi || 'Praktik lembar kerja kelompok dengan benda nyata.',
        merefleksi: modMerefleksi || 'Murid menyimpulkan apa yang dipelajari hari ini.',
      },
      assessmentPlan: modAssessment || 'Formatif pengamatan unjuk kerja selama pembelajaran berlangsung.',
    };

    setModules([newModule, ...modules]);
    setActiveTab('modul');
    setWizardStep(1);
    setModTitle('');
    onShowToast(asSubmit ? 'Modul ajar diajukan ke Ibu Kepala Sekolah.' : 'Draf modul ajar disimpan.');
  };

  // Save new journal
  const handleSaveJournal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jrnWorkedWell.trim()) {
      onShowToast('Kolom apa yang berjalan baik belum diisi.');
      return;
    }

    const newJrn: TeacherJournal = {
      id: `jrn-${Date.now()}`,
      date: '2026-11-05',
      subject: jrnSubject,
      grade: teacher.grade,
      objectiveCode: `TP.${teacher.grade}.1`,
      workedWell: jrnWorkedWell,
      toChange: jrnToChange || 'Lanjutkan metode ini besok dengan variasi alat peraga.',
      engagement: jrnEngagement,
      submittedToPrincipal: false,
    };

    setJournals([newJrn, ...journals]);
    setJrnWorkedWell('');
    setJrnToChange('');
    onShowToast('Jurnal mengajar harian tersimpan dalam kurang dari 3 menit.');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b-2 border-[#12383A]">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-[#359FA0]" />
            <h2 className="text-2xl font-extrabold text-[#12383A]">
              Rencana dan Jurnal Mengajar (Kelas {teacher.grade})
            </h2>
            <DataContohBadge />
          </div>
          <p className="text-xs sm:text-sm text-[#12383A]/80 font-medium mt-1">
            Menyusun Modul Ajar Pembelajaran Mendalam (Memahami, Mengaplikasi, Merefleksi) dan mengisi Jurnal Mengajar harian cepat.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-white border-2 border-[#12383A] shadow-tactile-mini self-start">
          <button
            onClick={() => setActiveTab('modul')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'modul'
                ? 'bg-[#12383A] text-[#FFF0C5] shadow-tactile-mini'
                : 'text-[#12383A] hover:bg-[#FFF0C5]'
            }`}
          >
            Daftar Modul ({modules.length})
          </button>
          <button
            onClick={() => {
              setActiveTab('wizard');
              setWizardStep(1);
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'wizard'
                ? 'bg-[#12383A] text-[#FFF0C5] shadow-tactile-mini'
                : 'text-[#12383A] hover:bg-[#FFF0C5]'
            }`}
          >
            + Susun Modul Ajar
          </button>
          <button
            onClick={() => setActiveTab('jurnal')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'jurnal'
                ? 'bg-[#12383A] text-[#FFF0C5] shadow-tactile-mini'
                : 'text-[#12383A] hover:bg-[#FFF0C5]'
            }`}
          >
            Jurnal Harian ({journals.length})
          </button>
        </div>
      </div>

      {/* TAB 1: DAFTAR MODUL AJAR (RG07) */}
      {activeTab === 'modul' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-[#12383A]">
              Modul Ajar Pembelajaran Mendalam
            </h3>
            <button
              onClick={() => setActiveTab('wizard')}
              className="tactile-btn px-4 py-1.5 rounded-full bg-[#FF8C52] text-white text-xs font-extrabold flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              <span>Buat Modul Ajar Baru</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modules.map((mod) => (
              <div
                key={mod.id}
                className="tactile-card p-5 bg-white border-2 border-[#12383A] shadow-tactile-card flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-[#FFFAE6] border border-[#12383A]">
                      {mod.subject}
                    </span>
                    <StatusChip status={mod.status} size="sm" />
                  </div>

                  <h4 className="font-extrabold text-base text-[#12383A] mb-1">
                    {mod.title}
                  </h4>
                  <p className="text-xs text-[#12383A]/70 font-semibold mb-3">
                    Alokasi Waktu: {mod.allocationHours} • Versi {mod.version}
                  </p>

                  {/* Review Note if Perlu Revisi */}
                  {mod.status === 'Perlu revisi' && mod.reviewNote && (
                    <div className="p-3 rounded-xl bg-[#FFD9C2] border-2 border-[#12383A] mb-3 text-xs space-y-1">
                      <div className="flex items-center gap-1 text-[#7A2E00] font-extrabold">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Catatan Kepala Sekolah:</span>
                      </div>
                      <p className="font-bold text-[#7A2E00]">{mod.reviewNote}</p>
                    </div>
                  )}

                  {/* 3 Pengalaman Belajar */}
                  <div className="space-y-1.5 text-xs py-2 border-y border-[#12383A]/20 mb-3">
                    <p>
                      <strong className="text-[#359FA0]">Memahami:</strong> {mod.experiences.memahami}
                    </p>
                    <p>
                      <strong className="text-[#FF8C52]">Mengaplikasi:</strong> {mod.experiences.mengaplikasi}
                    </p>
                    <p>
                      <strong className="text-[#12383A]">Merefleksi:</strong> {mod.experiences.merefleksi}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 pt-2">
                  <span className="text-[11px] font-bold text-[#12383A]/70">
                    {mod.status === 'Draf'
                      ? 'Lapis Hanya Anda'
                      : 'Terhubung ke Kepala Sekolah'}
                  </span>
                  {mod.status === 'Draf' && (
                    <button
                      onClick={() => handleAjukanModul(mod.id)}
                      className="tactile-btn px-4 py-1.5 rounded-full bg-[#359FA0] text-white text-xs font-extrabold hover:bg-[#2b8384]"
                    >
                      Ajukan ke Kepala Sekolah
                    </button>
                  )}
                  {mod.status === 'Perlu revisi' && (
                    <button
                      onClick={() => handleAjukanModul(mod.id)}
                      className="tactile-btn px-4 py-1.5 rounded-full bg-[#FF8C52] text-white text-xs font-extrabold hover:bg-[#ff7b36]"
                    >
                      Ajukan Revisi
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: WIZARD 6 LANGKAH PENYUSUN MODUL (RG08) */}
      {activeTab === 'wizard' && (
        <div className="tactile-card p-6 bg-[#FFFAE6] border-2 border-[#12383A] shadow-tactile-card space-y-6">
          {/* Stepper Wizard */}
          <div className="flex items-center justify-between pb-4 border-b-2 border-[#12383A] overflow-x-auto gap-2">
            {[
              { num: 1, label: 'Dasar' },
              { num: 2, label: 'Tujuan' },
              { num: 3, label: 'Profil Lulusan' },
              { num: 4, label: 'Pengalaman Belajar' },
              { num: 5, label: 'Asesmen' },
              { num: 6, label: 'Lampiran' },
            ].map((step) => (
              <button
                key={step.num}
                onClick={() => setWizardStep(step.num)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold border-2 border-[#12383A] transition-all whitespace-nowrap ${
                  wizardStep === step.num
                    ? 'bg-[#FF8C52] text-white shadow-tactile-mini'
                    : wizardStep > step.num
                    ? 'bg-[#CDEFD0] text-[#174D1F]'
                    : 'bg-white text-[#12383A]'
                }`}
              >
                <span>{step.num}.</span>
                <span>{step.label}</span>
              </button>
            ))}
          </div>

          {/* Step 1: Dasar */}
          {wizardStep === 1 && (
            <div className="space-y-4 max-w-xl animate-fade-in">
              <h3 className="text-lg font-extrabold text-[#12383A]">
                Langkah 1: Informasi Dasar Modul
              </h3>
              <div>
                <label className="block text-xs font-extrabold text-[#12383A] mb-1">
                  Judul Modul Ajar
                </label>
                <input
                  type="text"
                  required
                  value={modTitle}
                  onChange={(e) => setModTitle(e.target.value)}
                  placeholder="Contoh: Petualangan Menemukan Kata dan Bunyi di Sekitar Kita"
                  className="w-full p-3 rounded-2xl border-2 border-[#12383A] bg-white text-sm text-[#12383A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-extrabold text-[#12383A] mb-1">
                    Mata Pelajaran
                  </label>
                  <select
                    value={modSubject}
                    onChange={(e) => setModSubject(e.target.value)}
                    className="w-full p-2.5 rounded-xl border-2 border-[#12383A] bg-white text-xs font-bold"
                  >
                    <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                    <option value="Matematika">Matematika</option>
                    <option value="Pendidikan Pancasila">Pendidikan Pancasila</option>
                    <option value="PJOK">PJOK</option>
                    <option value="Seni dan Budaya">Seni dan Budaya</option>
                    {teacher.grade >= 3 && <option value="IPAS">IPAS</option>}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-[#12383A] mb-1">
                    Alokasi Waktu
                  </label>
                  <input
                    type="text"
                    value={modHours}
                    onChange={(e) => setModHours(e.target.value)}
                    className="w-full p-2.5 rounded-xl border-2 border-[#12383A] bg-white text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Tujuan */}
          {wizardStep === 2 && (
            <div className="space-y-4 max-w-xl animate-fade-in">
              <h3 className="text-lg font-extrabold text-[#12383A]">
                Langkah 2: Pilih Tujuan Pembelajaran (TP)
              </h3>
              <p className="text-xs text-[#12383A]/80 font-medium">
                Tersambung otomatis dari Peta Kurikulum Kelas {teacher.grade}.
              </p>
              <div className="p-4 rounded-2xl bg-white border-2 border-[#12383A] space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
                  <span className="text-xs font-bold text-[#12383A]">
                    B-IND.1.1: Murid dapat mengenal huruf dan bunyinya dengan tepat melalui eksplorasi kata nyata.
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 rounded" />
                  <span className="text-xs font-bold text-[#12383A]">
                    B-IND.1.2: Murid dapat membaca kata sederhana bermakna dengan percaya diri.
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Step 3: Profil Lulusan (8 Dimensi) */}
          {wizardStep === 3 && (
            <div className="space-y-4 max-w-2xl animate-fade-in">
              <div>
                <h3 className="text-lg font-extrabold text-[#12383A]">
                  Langkah 3: Dimensi Profil Lulusan yang Ditumbuhkan
                </h3>
                <p className="text-xs text-[#12383A]/80 font-medium mt-0.5">
                  Pilih maksimal 3 dimensi agar pembelajaran tetap terarah dan bermakna.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {graduateDimensionsList.map((dim) => {
                  const isSelected = modDimensions.includes(dim);
                  return (
                    <button
                      type="button"
                      key={dim}
                      onClick={() => {
                        if (isSelected) {
                          setModDimensions(modDimensions.filter((d) => d !== dim));
                        } else if (modDimensions.length < 3) {
                          setModDimensions([...modDimensions, dim]);
                        } else {
                          onShowToast('Pilih maksimal 3 dimensi agar fokus.');
                        }
                      }}
                      className={`p-3 rounded-2xl border-2 border-[#12383A] text-xs font-extrabold transition-all text-left ${
                        isSelected
                          ? 'bg-[#12383A] text-[#FFF0C5] shadow-tactile-mini'
                          : 'bg-white text-[#12383A] hover:bg-[#FFF0C5]'
                      }`}
                    >
                      {dim}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 4: Pengalaman Belajar (Memahami, Mengaplikasi, Merefleksi) */}
          {wizardStep === 4 && (
            <div className="space-y-4 max-w-2xl animate-fade-in">
              <div>
                <h3 className="text-lg font-extrabold text-[#12383A]">
                  Langkah 4: Tiga Tahap Pembelajaran Mendalam
                </h3>
                <p className="text-xs text-[#12383A]/80 font-medium mt-0.5">
                  Pendekatan bermakna: memadukan olah pikir, olah hati, olah rasa, dan olah raga.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-white border-2 border-[#12383A]">
                  <label className="block text-xs font-extrabold text-[#359FA0] uppercase mb-1">
                    1. Memahami (Awal • ~15 Menit)
                  </label>
                  <textarea
                    rows={2}
                    value={modMemahami}
                    onChange={(e) => setModMemahami(e.target.value)}
                    placeholder="Mendengarkan dongeng, mengamati benda di sekitar, mengajukan pertanyaan pemantik..."
                    className="w-full p-2.5 rounded-xl border border-[#12383A] text-xs text-[#12383A]"
                  />
                </div>

                <div className="p-3.5 rounded-2xl bg-white border-2 border-[#12383A]">
                  <label className="block text-xs font-extrabold text-[#FF8C52] uppercase mb-1">
                    2. Mengaplikasi (Inti • ~40 Menit)
                  </label>
                  <textarea
                    rows={2}
                    value={modMengaplikasi}
                    onChange={(e) => setModMengaplikasi(e.target.value)}
                    placeholder="Permainan gerak kartu kata, menyusun biji jagung, menempel pada pohon huruf..."
                    className="w-full p-2.5 rounded-xl border border-[#12383A] text-xs text-[#12383A]"
                  />
                </div>

                <div className="p-3.5 rounded-2xl bg-white border-2 border-[#12383A]">
                  <label className="block text-xs font-extrabold text-[#12383A] uppercase mb-1">
                    3. Merefleksi (Penutup • ~15 Menit)
                  </label>
                  <textarea
                    rows={2}
                    value={modMerefleksi}
                    onChange={(e) => setModMerefleksi(e.target.value)}
                    placeholder="Murid menceritakan perasaan belajarnya dan menempelkan stiker bintang..."
                    className="w-full p-2.5 rounded-xl border border-[#12383A] text-xs text-[#12383A]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Asesmen */}
          {wizardStep === 5 && (
            <div className="space-y-4 max-w-xl animate-fade-in">
              <h3 className="text-lg font-extrabold text-[#12383A]">
                Langkah 5: Rencana Asesmen Formatif & Sumatif
              </h3>
              <div>
                <label className="block text-xs font-extrabold text-[#12383A] mb-1">
                  Bentuk Asesmen & Kriteria Ketercapaian
                </label>
                <textarea
                  rows={4}
                  value={modAssessment}
                  onChange={(e) => setModAssessment(e.target.value)}
                  placeholder="Formatif berupa ceklis pengamatan pengucapan bunyi huruf, dan unjuk kerja membaca 5 kartu kata bergambar..."
                  className="w-full p-3 rounded-2xl border-2 border-[#12383A] bg-white text-xs text-[#12383A]"
                />
              </div>
            </div>
          )}

          {/* Step 6: Lampiran & Finalisasi */}
          {wizardStep === 6 && (
            <div className="space-y-4 max-w-xl animate-fade-in">
              <h3 className="text-lg font-extrabold text-[#12383A]">
                Langkah 6: Lampiran Berkas dan Konfirmasi
              </h3>
              <div className="p-4 rounded-2xl bg-white border-2 border-dashed border-[#12383A] text-center space-y-2">
                <span className="text-2xl">📎</span>
                <p className="text-xs font-bold text-[#12383A]">
                  Unggah Lembar Kerja Peserta Didik (LKPD) atau bahan ajar
                </p>
                <button
                  type="button"
                  onClick={() => onShowToast('Fitur unggah berkas LKPD siap disematkan.')}
                  className="tactile-btn px-4 py-1.5 rounded-full bg-[#FFF0C5] text-xs font-bold"
                >
                  Pilih Berkas PDF
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-[#CFEFEC] border-2 border-[#12383A] text-xs space-y-1">
                <span className="font-extrabold text-[#12383A] block">
                  Ringkasan: {modTitle || 'Modul Ajar Baru'}
                </span>
                <p className="text-[#12383A]/80 font-medium">
                  Mata Pelajaran: {modSubject} • {modHours} • {modDimensions.length} Dimensi Profil Lulusan
                </p>
              </div>
            </div>
          )}

          {/* Wizard Footer Navigation */}
          <div className="pt-4 border-t-2 border-[#12383A] flex items-center justify-between gap-3">
            <button
              disabled={wizardStep === 1}
              onClick={() => setWizardStep(wizardStep - 1)}
              className="tactile-btn px-4 py-2 rounded-full bg-white text-xs font-bold disabled:opacity-40"
            >
              Kembali
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSaveModuleWizard(false)}
                className="tactile-btn px-4 py-2 rounded-full bg-[#FFF0C5] text-xs font-bold text-[#12383A]"
              >
                Simpan Draf (Lapis Hanya Anda)
              </button>

              {wizardStep < 6 ? (
                <button
                  onClick={() => setWizardStep(wizardStep + 1)}
                  className="tactile-btn px-5 py-2 rounded-full bg-[#359FA0] text-white text-xs font-extrabold flex items-center gap-1"
                >
                  <span>Lanjut</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={() => handleSaveModuleWizard(true)}
                  className="tactile-btn px-5 py-2 rounded-full bg-[#FF8C52] text-white text-xs font-extrabold flex items-center gap-1"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Ajukan ke Kepala Sekolah</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: JURNAL MENGAJAR HARIAN (RG09) */}
      {activeTab === 'jurnal' && (
        <div className="space-y-6">
          {/* Quick Journal Form (< 3 minutes) */}
          <div className="tactile-card p-6 bg-white border-2 border-[#12383A] shadow-tactile-card space-y-4">
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#12383A]">
              <div>
                <h3 className="font-extrabold text-base text-[#12383A]">
                  Tulis Jurnal Mengajar Hari Ini
                </h3>
                <span className="text-xs text-[#12383A]/70 font-semibold">
                  Kamis, 5 November 2026 • Dirancang tuntas dalam kurang dari 3 menit
                </span>
              </div>
              <DataContohBadge />
            </div>

            <form onSubmit={handleSaveJournal} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-extrabold text-[#12383A] mb-1">
                    Mata Pelajaran
                  </label>
                  <select
                    value={jrnSubject}
                    onChange={(e) => setJrnSubject(e.target.value)}
                    className="w-full p-2.5 rounded-xl border-2 border-[#12383A] bg-[#FFFAE6] text-xs font-bold"
                  >
                    <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                    <option value="Matematika">Matematika</option>
                    <option value="Pendidikan Pancasila">Pendidikan Pancasila</option>
                    <option value="PJOK">PJOK</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-[#12383A] mb-1">
                    Keterlibatan Kelas (Satu Ketukan)
                  </label>
                  <div className="flex gap-1.5">
                    {(['sangat_aktif', 'aktif', 'perlu_dipancing'] as const).map((eng) => (
                      <button
                        type="button"
                        key={eng}
                        onClick={() => setJrnEngagement(eng)}
                        className={`flex-1 py-2 px-2 rounded-xl text-[11px] font-extrabold border-2 border-[#12383A] transition-all ${
                          jrnEngagement === eng
                            ? 'bg-[#12383A] text-[#FFF0C5] shadow-tactile-mini'
                            : 'bg-white text-[#12383A]'
                        }`}
                      >
                        {eng === 'sangat_aktif' ? 'Sangat Aktif' : eng === 'aktif' ? 'Aktif' : 'Perlu Dipancing'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold text-[#359FA0] mb-1">
                    Apa yang Berjalan Baik Hari Ini?
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={jrnWorkedWell}
                    onChange={(e) => setJrnWorkedWell(e.target.value)}
                    placeholder="Contoh: Murid sangat fokus saat menyusun puzzle huruf dan aktif bertanya..."
                    className="w-full p-3 rounded-2xl border-2 border-[#12383A] bg-[#FFFAE6] text-xs text-[#12383A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-[#FF8C52] mb-1">
                    Apa yang Akan Diubah Besok?
                  </label>
                  <textarea
                    rows={3}
                    value={jrnToChange}
                    onChange={(e) => setJrnToChange(e.target.value)}
                    placeholder="Contoh: Sediakan lebih banyak contoh kartu bergambar untuk baris samping..."
                    className="w-full p-3 rounded-2xl border-2 border-[#12383A] bg-[#FFFAE6] text-xs text-[#12383A]"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  className="tactile-btn px-6 py-2.5 rounded-full bg-[#FF8C52] text-white text-xs font-extrabold hover:bg-[#ff7b36]"
                >
                  Simpan Jurnal Mengajar
                </button>
              </div>
            </form>
          </div>

          {/* Daftar Riwayat Jurnal */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-base text-[#12383A]">
              Riwayat Jurnal Minggu Ini ({journals.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {journals.map((j) => (
                <div
                  key={j.id}
                  className="tactile-card p-4 bg-white border-2 border-[#12383A] shadow-tactile-card space-y-2 text-xs"
                >
                  <div className="flex justify-between items-center pb-2 border-b border-[#12383A]/20">
                    <span className="font-extrabold text-sm text-[#12383A]">
                      {j.subject}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#CFEFEC] text-[10px] font-bold border border-[#12383A]">
                      {j.date}
                    </span>
                  </div>

                  <div>
                    <span className="font-extrabold text-[#359FA0] block">Berjalan baik:</span>
                    <p className="font-medium text-[#12383A]">{j.workedWell}</p>
                  </div>

                  <div>
                    <span className="font-extrabold text-[#FF8C52] block">Diubah besok:</span>
                    <p className="font-medium text-[#12383A]">{j.toChange}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#12383A]/20 text-[11px]">
                    <span className="font-bold text-[#12383A]/70">
                      Keterlibatan: <strong className="text-[#12383A] uppercase">{j.engagement.replace('_', ' ')}</strong>
                    </span>
                    <StatusChip
                      status={j.submittedToPrincipal ? 'Diajukan' : 'Hanya Anda'}
                      size="sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
