import React, { useState } from 'react';
import { FolderCheck, CheckCircle2, Upload, FileText, ArrowRight, ShieldCheck } from 'lucide-react';
import { HomeroomTeacher, DocumentChecklistItem, SupervisionStage } from '../../../types';
import { INITIAL_CHECKLIST_DOCUMENTS, INITIAL_SUPERVISION_STAGES } from '../../../data/mockData';
import { StatusChip } from '../../../components/StatusChip';
import { DataContohBadge } from '../../../components/DataContohBadge';

interface ModulBerkasSupervisiProps {
  teacher: HomeroomTeacher;
  onShowToast: (msg: string) => void;
}

export const ModulBerkasSupervisi: React.FC<ModulBerkasSupervisiProps> = ({
  teacher,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'berkas' | 'supervisi'>('berkas');
  const [docs, setDocs] = useState<DocumentChecklistItem[]>(INITIAL_CHECKLIST_DOCUMENTS);
  const [stages, setStages] = useState<SupervisionStage[]>(INITIAL_SUPERVISION_STAGES);

  const completedDocsCount = docs.filter((d) => d.status === 'Disetujui').length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b-2 border-[#12383A]">
        <div>
          <div className="flex items-center gap-2">
            <FolderCheck className="w-6 h-6 text-[#359FA0]" />
            <h2 className="text-2xl font-extrabold text-[#12383A]">
              Berkas Perangkat dan Hasil Supervisi (Kelas {teacher.grade})
            </h2>
            <DataContohBadge />
          </div>
          <p className="text-xs sm:text-sm text-[#12383A]/80 font-medium mt-1">
            Daftar kelengkapan 9 berkas perangkat mengajar dan riwayat umpan balik supervisi akademik kepala sekolah.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-white border-2 border-[#12383A] shadow-tactile-mini self-start">
          <button
            onClick={() => setActiveTab('berkas')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'berkas'
                ? 'bg-[#12383A] text-[#FFF0C5] shadow-tactile-mini'
                : 'text-[#12383A] hover:bg-[#FFF0C5]'
            }`}
          >
            Kelengkapan 9 Dokumen ({completedDocsCount}/9)
          </button>
          <button
            onClick={() => setActiveTab('supervisi')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'supervisi'
                ? 'bg-[#12383A] text-[#FFF0C5] shadow-tactile-mini'
                : 'text-[#12383A] hover:bg-[#FFF0C5]'
            }`}
          >
            Hasil Supervisi Saya
          </button>
        </div>
      </div>

      {/* TAB 1: KELENGKAPAN 9 BERKAS PERANGKAT */}
      {activeTab === 'berkas' && (
        <div className="space-y-4">
          <div className="tactile-card p-5 bg-[#FFFAE6] border-2 border-[#12383A] shadow-tactile-card flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base text-[#12383A]">
                  Perangkat Anda Lengkap {completedDocsCount} dari 9
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#359FA0] text-white text-xs font-extrabold">
                  {Math.round((completedDocsCount / 9) * 100)}% Lengkap
                </span>
              </div>
              <p className="text-xs text-[#12383A]/80 font-medium mt-0.5">
                Dokumen otomatis tersambung dari modul harian (Modul Ajar, Jurnal, Absen Cepat, dan Asesmen).
              </p>
            </div>

            <button
              onClick={() => onShowToast('Fitur unggah berkas arsip dibuka.')}
              className="tactile-btn px-4 py-2 rounded-full bg-[#FF8C52] text-white text-xs font-extrabold flex items-center gap-1.5 self-start"
            >
              <Upload className="w-4 h-4" />
              <span>Unggah Dokumen Tambahan</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {docs.map((d, idx) => (
              <div
                key={d.id}
                className="tactile-card p-4 bg-white border-2 border-[#12383A] shadow-tactile-mini flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="w-6 h-6 rounded-full bg-[#12383A] text-[#FFF0C5] font-extrabold text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <StatusChip status={d.status} size="sm" />
                  </div>
                  <h4 className="font-extrabold text-sm text-[#12383A] mb-1">
                    {d.name}
                  </h4>
                  <span className="text-[11px] text-[#12383A]/70 font-semibold block">
                    Sumber: {d.sourceModule}
                  </span>
                </div>

                <div className="pt-2 border-t border-[#12383A]/20 mt-3 flex justify-between items-center text-[11px]">
                  <span className="text-[#12383A]/60">Diperbarui: {d.updatedAt}</span>
                  <button
                    onClick={() => onShowToast(`Membuka dokumen ${d.name}.`)}
                    className="text-[#359FA0] font-extrabold hover:underline"
                  >
                    Buka Berkas
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: HASIL SUPERVISI SAYA (STEPPER 4 TAHAP) */}
      {activeTab === 'supervisi' && (
        <div className="space-y-6">
          <div className="tactile-card p-6 bg-white border-2 border-[#12383A] shadow-tactile-card space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#359FA0]" />
                <h3 className="font-extrabold text-lg text-[#12383A]">
                  Siklus Supervisi Akademik Berkelanjutan
                </h3>
              </div>
              <p className="text-xs text-[#12383A]/80 font-medium mt-0.5">
                Hasil yang dipublikasikan oleh Kepala Sekolah Ibu Khoyum Supardi, S.Pd.SD, M.Pd.
              </p>
            </div>

            {/* Stepper 4 Tahap */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {stages.map((stg, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-[#FFFAE6] border-2 border-[#12383A] shadow-tactile-mini space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-[#12383A] text-white">
                      Tahap {i + 1}
                    </span>
                    <StatusChip status={stg.status} size="sm" />
                  </div>
                  <h4 className="font-extrabold text-sm text-[#12383A]">
                    {stg.stage}
                  </h4>
                  <span className="text-[11px] text-[#12383A]/70 font-semibold block">
                    Tanggal: {stg.date}
                  </span>

                  <div className="pt-2 border-t border-[#12383A]/20 text-xs space-y-1">
                    <div>
                      <strong className="text-[#174D1F] block text-[11px]">Kekuatan:</strong>
                      <p className="text-[#12383A]/90">{stg.strengths}</p>
                    </div>
                    <div>
                      <strong className="text-[#FF8C52] block text-[11px]">Tindak Lanjut:</strong>
                      <p className="text-[#12383A]/90">{stg.recommendations}</p>
                    </div>
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
