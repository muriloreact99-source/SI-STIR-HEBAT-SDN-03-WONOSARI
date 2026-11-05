import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, FileText, Download, Users, Eye, Check, X, Sparkles } from 'lucide-react';
import { HomeroomTeacher, LearningModule, ModuleStatus } from '../../types';
import { HOMEROOM_TEACHERS, INITIAL_MODULES, SCHOOL_ARCHIVE_DOCUMENTS, PRINCIPAL_INFO } from '../../data/mockData';
import { StatusChip } from '../../components/StatusChip';
import { DataContohBadge } from '../../components/DataContohBadge';

interface RuangKepalaSekolahViewProps {
  onShowToast: (msg: string) => void;
  onOpenTeacherRoom: (grade: 1 | 2 | 3 | 4 | 5 | 6) => void;
}

export const RuangKepalaSekolahView: React.FC<RuangKepalaSekolahViewProps> = ({
  onShowToast,
  onOpenTeacherRoom,
}) => {
  const [activeTab, setActiveTab] = useState<'supervisi' | 'modul' | 'guru' | 'arsip'>('supervisi');
  const [modules, setModules] = useState<LearningModule[]>(INITIAL_MODULES);
  const [revisionNote, setRevisionNote] = useState('');
  const [selectedModuleForRevision, setSelectedModuleForRevision] = useState<string | null>(null);

  // Stepper Supervisi Stages
  const [supervisionStages, setSupervisionStages] = useState([
    {
      stage: 'Pra Observasi',
      status: 'Disetujui',
      date: 'Oktober 2026',
      desc: 'Penyelarasan modul ajar dengan pendekatan pembelajaran mendalam.',
    },
    {
      stage: 'Observasi Kelas',
      status: 'Disetujui',
      date: 'Akhir Oktober 2026',
      desc: 'Pengamatan dinamika kelas dan asesmen formatif otentik.',
    },
    {
      stage: 'Pasca Observasi',
      status: 'Disetujui',
      date: 'Awal November 2026',
      desc: 'Refleksi mendalam bersama guru tentang dampak belajar murid.',
    },
    {
      stage: 'Tindak Lanjut',
      status: 'Diajukan',
      date: 'Sedang Berjalan',
      desc: 'Pendampingan kelompok dukungan membaca dan bimbingan numerasi.',
    },
  ]);

  const handleApproveModule = (modId: string) => {
    setModules((prev) =>
      prev.map((m) =>
        m.id === modId ? { ...m, status: 'Disetujui' as ModuleStatus, approvedAt: '2026-11-05' } : m
      )
    );
    onShowToast('Modul ajar telah disetujui resmi oleh Kepala Sekolah.');
  };

  const handleRequestRevision = (modId: string) => {
    if (!revisionNote.trim()) {
      onShowToast('Mohon tuliskan catatan evaluasi revisi.');
      return;
    }

    setModules((prev) =>
      prev.map((m) =>
        m.id === modId
          ? {
              ...m,
              status: 'Perlu revisi' as ModuleStatus,
              reviewNote: revisionNote,
            }
          : m
      )
    );
    setSelectedModuleForRevision(null);
    setRevisionNote('');
    onShowToast('Catatan perbaikan telah dikirimkan ke guru pengampu.');
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header Kepala Sekolah */}
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
              <span className="text-3xl">🏛️</span>
              <span className="px-3 py-1 rounded-full bg-[#359FA0] text-white border-2 border-[#12383A] text-xs font-extrabold shadow-tactile-mini uppercase">
                Pimpinan Satuan Pendidikan
              </span>
              <DataContohBadge />
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#12383A] tracking-tight">
              {PRINCIPAL_INFO.name}
            </h1>
            <p className="text-sm sm:text-base text-[#12383A]/85 font-medium max-w-2xl">
              Kepala Sekolah SDN 03 Wonosari (NPSN 40500185). Memastikan tata kelola supervisi akademik berjalan terintegrasi, transparan, dan berdampak nyata bagi pertumbuhan seluruh murid.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border-2 border-[#12383A] shadow-tactile-mini text-center shrink-0">
            <span className="block text-[11px] font-extrabold uppercase text-[#FF8C52]">
              Tahun Ajaran Aktif
            </span>
            <strong className="text-xl font-extrabold text-[#12383A] block">
              2025/2026 Semester 1
            </strong>
            <span className="text-xs text-[#12383A]/70 font-semibold">
              6 Kelas • 180 Murid
            </span>
          </div>
        </div>
      </div>

      {/* 4 Metrik Supervisi Utama Sekolah */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="tactile-card p-5 bg-white border-2 border-[#12383A] shadow-tactile-card space-y-1">
          <span className="text-xs font-extrabold uppercase text-[#359FA0] block">
            Kelengkapan Modul Ajar
          </span>
          <strong className="text-2xl font-extrabold text-[#12383A]">
            85% Disetujui
          </strong>
          <p className="text-[11px] text-[#12383A]/70 font-medium">
            2 modul menunggu persetujuan
          </p>
        </div>

        <div className="tactile-card p-5 bg-white border-2 border-[#12383A] shadow-tactile-card space-y-1">
          <span className="text-xs font-extrabold uppercase text-[#FF8C52] block">
            Kehadiran Agregat Sekolah
          </span>
          <strong className="text-2xl font-extrabold text-[#FF8C52]">
            96.2%
          </strong>
          <p className="text-[11px] text-[#12383A]/70 font-medium">
            Data hadir terverifikasi hari ini
          </p>
        </div>

        <div className="tactile-card p-5 bg-white border-2 border-[#12383A] shadow-tactile-card space-y-1">
          <span className="text-xs font-extrabold uppercase text-[#174D1F] block">
            Supervisi Akademik
          </span>
          <strong className="text-2xl font-extrabold text-[#174D1F]">
            Tahap 4 Berjalan
          </strong>
          <p className="text-[11px] text-[#12383A]/70 font-medium">
            Tindak lanjut bimbingan belajar
          </p>
        </div>

        <div className="tactile-card p-5 bg-white border-2 border-[#12383A] shadow-tactile-card space-y-1">
          <span className="text-xs font-extrabold uppercase text-[#359FA0] block">
            Arsip Dokumen Sekolah
          </span>
          <strong className="text-2xl font-extrabold text-[#12383A]">
            4 Berkas Sah
          </strong>
          <p className="text-[11px] text-[#12383A]/70 font-medium">
            KSP, RKT, RKAS, dan Kumpulan SK
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-full bg-white border-2 border-[#12383A] shadow-tactile-mini self-start w-fit">
        <button
          onClick={() => setActiveTab('supervisi')}
          className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all ${
            activeTab === 'supervisi'
              ? 'bg-[#12383A] text-[#FFF0C5] shadow-tactile-mini'
              : 'text-[#12383A] hover:bg-[#FFFAE6]'
          }`}
        >
          Siklus Supervisi Akademik
        </button>
        <button
          onClick={() => setActiveTab('modul')}
          className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all ${
            activeTab === 'modul'
              ? 'bg-[#12383A] text-[#FFF0C5] shadow-tactile-mini'
              : 'text-[#12383A] hover:bg-[#FFFAE6]'
          }`}
        >
          Persetujuan Modul Ajar ({modules.filter((m) => m.status === 'Diajukan').length} Diajukan)
        </button>
        <button
          onClick={() => setActiveTab('guru')}
          className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all ${
            activeTab === 'guru'
              ? 'bg-[#12383A] text-[#FFF0C5] shadow-tactile-mini'
              : 'text-[#12383A] hover:bg-[#FFFAE6]'
          }`}
        >
          Direktori 6 Guru Kelas
        </button>
        <button
          onClick={() => setActiveTab('arsip')}
          className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all ${
            activeTab === 'arsip'
              ? 'bg-[#12383A] text-[#FFF0C5] shadow-tactile-mini'
              : 'text-[#12383A] hover:bg-[#FFFAE6]'
          }`}
        >
          Arsip Dokumen Sekolah
        </button>
      </div>

      {/* TAB 1: SIKLUS SUPERVISI (STEPPER 4 TAHAP) */}
      {activeTab === 'supervisi' && (
        <div className="space-y-6">
          <div className="tactile-card p-6 bg-white border-2 border-[#12383A] shadow-tactile-card space-y-5">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-[#359FA0]" />
                <h2 className="text-xl font-extrabold text-[#12383A]">
                  Alur Stepper Supervisi 4 Tahap Sekolah
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#12383A]/80 font-medium mt-1">
                Supervisi terstruktur berkesadaran: Pra Observasi, Observasi Kelas, Pasca Observasi, dan Tindak Lanjut Nyata.
              </p>
            </div>

            {/* Stepper 4 Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {supervisionStages.map((stg, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-[#FFFAE6] border-2 border-[#12383A] shadow-tactile-mini space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <span className="w-8 h-8 rounded-full bg-[#12383A] text-[#FFF0C5] font-extrabold text-xs flex items-center justify-center">
                      0{i + 1}
                    </span>
                    <StatusChip status={stg.status} size="sm" />
                  </div>

                  <h3 className="font-extrabold text-base text-[#12383A]">
                    {stg.stage}
                  </h3>
                  <span className="text-xs text-[#359FA0] font-extrabold block">
                    {stg.date}
                  </span>
                  <p className="text-xs text-[#12383A]/85 font-medium leading-relaxed">
                    {stg.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-[#CFEFEC] border-2 border-[#12383A] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <span className="font-bold text-[#12383A]">
                Hasil supervisi diterbitkan secara berkala agar menjadi panduan peningkatan mutu bagi seluruh guru kelas.
              </span>
              <button
                onClick={() => onShowToast('Hasil evaluasi supervisi semester 1 disahkan.')}
                className="tactile-btn px-4 py-2 rounded-full bg-[#12383A] text-[#FFF0C5] font-extrabold hover:bg-[#205558] shrink-0"
              >
                Publikasikan Hasil Supervisi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PERSETUJUAN MODUL AJAR */}
      {activeTab === 'modul' && (
        <div className="space-y-5">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-extrabold text-[#12383A]">
              Daftar Pengajuan Modul Ajar dari Guru
            </h2>
            <span className="text-xs font-bold text-[#12383A]/70">
              Total {modules.length} Modul Terpantau
            </span>
          </div>

          <div className="space-y-4">
            {modules.map((mod) => (
              <div
                key={mod.id}
                className="tactile-card p-6 bg-white border-2 border-[#12383A] shadow-tactile-card space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#12383A]/20">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#FFFAE6] border border-[#12383A] text-xs font-extrabold">
                        {mod.subject} • Kelas {mod.grade}
                      </span>
                      <span className="text-xs font-semibold text-[#12383A]/70">
                        Alokasi: {mod.allocationHours}
                      </span>
                    </div>
                    <h3 className="font-extrabold text-lg text-[#12383A]">
                      {mod.title}
                    </h3>
                  </div>

                  <StatusChip status={mod.status} size="md" />
                </div>

                {/* 3 Pengalaman Belajar */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-[#FFFAE6] border border-[#12383A]">
                    <strong className="text-[#359FA0] block text-[11px] uppercase font-extrabold mb-1">
                      1. Memahami
                    </strong>
                    <p className="text-[#12383A]/90 font-medium">{mod.experiences.memahami}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FFFAE6] border border-[#12383A]">
                    <strong className="text-[#FF8C52] block text-[11px] uppercase font-extrabold mb-1">
                      2. Mengaplikasi
                    </strong>
                    <p className="text-[#12383A]/90 font-medium">{mod.experiences.mengaplikasi}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FFFAE6] border border-[#12383A]">
                    <strong className="text-[#12383A] block text-[11px] uppercase font-extrabold mb-1">
                      3. Merefleksi
                    </strong>
                    <p className="text-[#12383A]/90 font-medium">{mod.experiences.merefleksi}</p>
                  </div>
                </div>

                {/* Review Form if user clicked Minta Revisi */}
                {selectedModuleForRevision === mod.id && (
                  <div className="p-4 rounded-2xl bg-[#FFD9C2] border-2 border-[#12383A] space-y-2">
                    <label className="block text-xs font-extrabold text-[#7A2E00]">
                      Tulis Catatan Evaluasi dan Arahan Revisi untuk Guru Pengampu:
                    </label>
                    <textarea
                      rows={3}
                      value={revisionNote}
                      onChange={(e) => setRevisionNote(e.target.value)}
                      placeholder="Contoh: Mohon tambahkan panduan keselamatan fisik untuk lapangan saat musim hujan..."
                      className="w-full p-2.5 rounded-xl border border-[#12383A] bg-white text-xs text-[#12383A]"
                    />
                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        onClick={() => setSelectedModuleForRevision(null)}
                        className="px-3 py-1.5 rounded-full bg-white text-xs font-bold"
                      >
                        Batal
                      </button>
                      <button
                        onClick={() => handleRequestRevision(mod.id)}
                        className="tactile-btn px-4 py-1.5 rounded-full bg-[#7A2E00] text-white text-xs font-extrabold"
                      >
                        Kirim Arahan Revisi
                      </button>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <span className="text-xs text-[#12383A]/70 font-medium">
                    {mod.approvedAt ? `Disetujui pada ${mod.approvedAt}` : 'Menunggu tinjauan Kepala Sekolah'}
                  </span>

                  <div className="flex items-center gap-2">
                    {mod.status !== 'Disetujui' && (
                      <button
                        onClick={() => setSelectedModuleForRevision(mod.id)}
                        className="tactile-btn px-4 py-2 rounded-full bg-[#FFF0C5] text-xs font-extrabold text-[#12383A] hover:bg-[#FFD9C2] flex items-center gap-1.5"
                      >
                        <AlertTriangle className="w-4 h-4 text-[#7A2E00]" />
                        <span>Minta Revisi</span>
                      </button>
                    )}

                    {mod.status !== 'Disetujui' && (
                      <button
                        onClick={() => handleApproveModule(mod.id)}
                        className="tactile-btn px-5 py-2 rounded-full bg-[#359FA0] text-white text-xs font-extrabold hover:bg-[#2b8384] flex items-center gap-1.5"
                      >
                        <Check className="w-4 h-4" />
                        <span>Setujui Modul</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: DIREKTORI 6 GURU KELAS */}
      {activeTab === 'guru' && (
        <div className="space-y-5">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-extrabold text-[#12383A]">
              Direktori 6 Wali Kelas SDN 03 Wonosari
            </h2>
            <DataContohBadge />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {HOMEROOM_TEACHERS.map((teacher) => (
              <div
                key={teacher.id}
                className="tactile-card p-5 bg-white border-2 border-[#12383A] shadow-tactile-card flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{teacher.sticker}</span>
                    <div>
                      <h3 className="font-extrabold text-base text-[#12383A]">
                        {teacher.name}
                      </h3>
                      <span className="text-xs font-bold text-[#359FA0]">
                        Wali Kelas {teacher.grade} (Fase {teacher.phase})
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#FFFAE6] border border-[#12383A] text-xs space-y-1 mb-4">
                    <div className="flex justify-between">
                      <span className="text-[#12383A]/70">Tema Belajar:</span>
                      <strong className="text-[#12383A]">{teacher.roomTitle}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#12383A]/70">Pita Utama:</span>
                      <strong className="text-[#FF8C52]">{teacher.mainPita}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#12383A]/70">Perangkat Lengkap:</span>
                      <strong className="text-[#174D1F]">8 dari 9 Berkas</strong>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onOpenTeacherRoom(teacher.grade)}
                  className="tactile-btn w-full py-2.5 rounded-full bg-[#359FA0] text-white text-xs font-extrabold hover:bg-[#2b8384] flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-4 h-4" />
                  <span>Tinjau Ruang Kelas {teacher.grade}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: ARSIP DOKUMEN RESMI SEKOLAH */}
      {activeTab === 'arsip' && (
        <div className="space-y-5">
          <div className="p-4 rounded-2xl bg-[#FFFAE6] border-2 border-[#12383A] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-extrabold text-[#12383A]">
                Penyimpanan Berkas Resmi Satuan Pendidikan
              </h2>
              <p className="text-xs text-[#12383A]/80 font-medium">
                KSP, RKT, RKAS, dan Surat Keputusan pembagian tugas guru yang disahkan dinas.
              </p>
            </div>

            <button
              onClick={() => onShowToast('Fitur unggah arsip resmi dibuka.')}
              className="tactile-btn px-4 py-2 rounded-full bg-[#FF8C52] text-white text-xs font-extrabold self-start"
            >
              + Unggah Dokumen Resmi
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SCHOOL_ARCHIVE_DOCUMENTS.map((arc) => (
              <div
                key={arc.id}
                className="tactile-card p-5 bg-white border-2 border-[#12383A] shadow-tactile-card space-y-3"
              >
                <div className="flex justify-between items-center">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#CFEFEC] text-[#12383A] text-xs font-extrabold border border-[#12383A]">
                    {arc.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#CDEFD0] text-[#174D1F] text-xs font-extrabold border border-[#12383A]">
                    {arc.badge}
                  </span>
                </div>

                <h3 className="font-extrabold text-base text-[#12383A]">
                  {arc.title}
                </h3>
                <span className="text-xs text-[#12383A]/70 font-semibold block">
                  Kode: {arc.code} • Tahun Ajaran: {arc.year} • Ukuran: {arc.size}
                </span>

                <div className="pt-2 border-t border-[#12383A]/20 flex justify-between items-center text-xs">
                  <span className="text-[#12383A]/60">Disahkan: {arc.date}</span>
                  <button
                    onClick={() => onShowToast(`Mengunduh dokumen ${arc.title}.`)}
                    className="tactile-btn px-3.5 py-1.5 rounded-full bg-[#FFF0C5] text-[#12383A] font-extrabold text-xs hover:bg-[#8AD6D1] flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Unduh PDF</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
