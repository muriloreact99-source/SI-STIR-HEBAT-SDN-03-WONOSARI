import React from 'react';
import {
  Clock,
  Calendar,
  AlertCircle,
  CheckCircle,
  Users,
  Compass,
  FileText,
  Award,
  BookOpen,
  Heart,
  MessageSquare,
  FolderCheck,
  Lock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { HomeroomTeacher, AttendanceRecord } from '../../../types';
import { StatusChip } from '../../../components/StatusChip';
import { DataContohBadge } from '../../../components/DataContohBadge';

interface ModulHariIniProps {
  teacher: HomeroomTeacher;
  attendanceRecords: AttendanceRecord[];
  onOpenModule: (moduleKey: string) => void;
  onQuickAttendance: () => void;
  onQuickJournal: () => void;
  onQuickAssessment: () => void;
  onShowToast: (msg: string) => void;
}

export const ModulHariIni: React.FC<ModulHariIniProps> = ({
  teacher,
  attendanceRecords,
  onOpenModule,
  onQuickAttendance,
  onQuickJournal,
  onQuickAssessment,
  onShowToast,
}) => {
  const isAttendanceDone = attendanceRecords.some((r) => r.grade === teacher.grade);

  const modules = [
    { key: 'kelas', label: 'Kelas Saya', icon: Users, desc: '30 murid, absen cepat, profil murid', count: '30 murid' },
    { key: 'kurikulum', label: 'Peta Kurikulum', icon: Compass, desc: 'Elemen CP dan Alur TP semester', count: 'Fase ' + teacher.phase },
    { key: 'rencana', label: 'Rencana dan Jurnal', icon: FileText, desc: 'Modul ajar dan refleksi harian', count: '4 modul' },
    { key: 'asesmen', label: 'Asesmen dan Nilai', icon: Award, desc: '4 level capaian dan kelompok belajar', count: '2 asesmen' },
    { key: 'literasi', label: 'Pita Literasi Numerasi', icon: BookOpen, desc: 'Pantau pertumbuhan dasar belajar', count: teacher.mainPita },
    { key: 'karakter', label: 'Karakter dan Projek', icon: Heart, desc: '7 kebiasaan dan projek kokurikuler', count: teacher.projectTheme },
    { key: 'penghubung', label: 'Ruang Penghubung', icon: MessageSquare, desc: 'Pesan orang tua dan laporan capaian', count: '2 pesan' },
    { key: 'berkas', label: 'Berkas dan Supervisi', icon: FolderCheck, desc: 'Kelengkapan 9 dokumen dan supervisi', count: '6 dari 9' },
    { key: 'catatan', label: 'Catatan Pribadi', icon: Lock, desc: 'Buku catatan guru lapis Hanya Anda', count: 'Hanya Anda' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Sapaan Hari Ini */}
      <div className="tactile-card p-6 bg-[#FFFAE6] border-2 border-[#12383A] shadow-tactile-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{teacher.sticker}</span>
              <span className="text-xs font-extrabold uppercase tracking-wide text-[#359FA0]">
                Ruang Pribadi Wali Kelas {teacher.grade}
              </span>
              <DataContohBadge />
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#12383A]">
              Selamat pagi, {teacher.shortName}.
            </h2>
            <p className="text-xs sm:text-sm text-[#12383A]/80 font-bold mt-0.5">
              SDN 03 Wonosari • 30 murid • {teacher.roomTitle}
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onQuickAttendance}
              className="tactile-btn px-4 py-2.5 rounded-full bg-[#FF8C52] text-white font-extrabold text-xs sm:text-sm hover:bg-[#ff7b36] flex items-center gap-1.5"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Isi Absen Sekarang</span>
            </button>
            <button
              onClick={onQuickJournal}
              className="tactile-btn px-4 py-2.5 rounded-full bg-[#359FA0] text-white font-extrabold text-xs sm:text-sm hover:bg-[#2b8384] flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4" />
              <span>Isi Jurnal Mengajar</span>
            </button>
            <button
              onClick={onQuickAssessment}
              className="tactile-btn px-3.5 py-2.5 rounded-full bg-white text-[#12383A] font-extrabold text-xs sm:text-sm hover:bg-[#FFF0C5] flex items-center gap-1.5"
            >
              <Award className="w-4 h-4 text-[#FF8C52]" />
              <span>Catat Nilai Cepat</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid 3 Kartu Harian */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Kartu 1: Jadwal Hari Ini */}
        <div className="tactile-card p-5 bg-white border-2 border-[#12383A] shadow-tactile-card space-y-3">
          <div className="flex items-center justify-between pb-2 border-b-2 border-[#12383A]">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#359FA0]" />
              <h3 className="font-extrabold text-base text-[#12383A]">Jadwal Hari Ini</h3>
            </div>
            <span className="text-[11px] font-bold text-[#12383A]/70">Kamis</span>
          </div>

          <div className="space-y-2">
            <div className="p-3 rounded-xl bg-[#CFEFEC] border border-[#12383A] flex items-center justify-between">
              <div>
                <span className="text-[11px] font-extrabold text-[#12383A] block">
                  07.30 - 09.00
                </span>
                <span className="font-bold text-xs text-[#12383A]">
                  Bahasa Indonesia (Fase {teacher.phase})
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#359FA0] text-white text-[10px] font-extrabold">
                Sedang Berjalan
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#FFFAE6] border border-[#12383A] flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-[#12383A]/70 block">
                  09.15 - 10.45
                </span>
                <span className="font-bold text-xs text-[#12383A]">
                  Matematika
                </span>
              </div>
              <span className="text-[11px] font-bold text-[#12383A]/60">Sesi 2</span>
            </div>
          </div>

          <button
            onClick={onQuickJournal}
            className="w-full py-2 rounded-full border-2 border-[#12383A] bg-[#FFF0C5] text-xs font-bold text-[#12383A] hover:bg-[#FF8C52] hover:text-white transition-colors"
          >
            Tulis Jurnal Sesi Ini
          </button>
        </div>

        {/* Kartu 2: Absen Hari Ini */}
        <div className="tactile-card p-5 bg-white border-2 border-[#12383A] shadow-tactile-card space-y-3">
          <div className="flex items-center justify-between pb-2 border-b-2 border-[#12383A]">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#FF8C52]" />
              <h3 className="font-extrabold text-base text-[#12383A]">Absen Hari Ini</h3>
            </div>
            <StatusChip
              status={isAttendanceDone ? 'Absen hari ini sudah diisi' : 'Absen hari ini belum diisi'}
              size="sm"
            />
          </div>

          <div className="p-3 rounded-xl bg-[#FFFAE6] border border-[#12383A] space-y-1">
            <div className="flex justify-between text-xs font-bold">
              <span>Kehadiran Terisi:</span>
              <span className="text-[#359FA0] font-extrabold">30 dari 30 murid</span>
            </div>
            <div className="flex justify-between text-xs font-medium text-[#12383A]/80">
              <span>Hadir: 28</span>
              <span>Sakit (ortu): 1</span>
              <span>Alpa: 1</span>
            </div>
          </div>

          <button
            onClick={() => onOpenModule('kelas')}
            className="tactile-btn w-full py-2 rounded-full bg-[#359FA0] text-xs font-extrabold text-white hover:bg-[#2b8384] transition-colors"
          >
            Buka Daftar Absen Lengkap
          </button>
        </div>

        {/* Kartu 3: Perlu Perhatian */}
        <div className="tactile-card p-5 bg-[#FFD9C2]/40 border-2 border-[#12383A] shadow-tactile-card space-y-3">
          <div className="flex items-center justify-between pb-2 border-b-2 border-[#12383A]">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#7A2E00]" />
              <h3 className="font-extrabold text-base text-[#7A2E00]">Perlu Perhatian (2 Murid)</h3>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#FF8C52] text-white text-[10px] font-extrabold">
              Tindakan
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-white border border-[#12383A] flex items-center justify-between gap-2">
              <div>
                <span className="font-bold text-[#12383A] block">Murid contoh 7</span>
                <span className="text-[11px] text-[#7A2E00]">Tidak hadir 3 hari berturut turut</span>
              </div>
              <button
                onClick={() => {
                  onOpenModule('penghubung');
                  onShowToast('Membuka percakapan dengan orang tua Murid contoh 7.');
                }}
                className="px-2.5 py-1 rounded-full bg-[#FF8C52] text-white text-[10px] font-extrabold"
              >
                Kirim Pesan
              </button>
            </div>

            <div className="p-2.5 rounded-xl bg-white border border-[#12383A] flex items-center justify-between gap-2">
              <div>
                <span className="font-bold text-[#12383A] block">Murid contoh 2</span>
                <span className="text-[11px] text-[#359FA0]">Laporan izin sakit dari orang tua</span>
              </div>
              <button
                onClick={() => {
                  onOpenModule('kelas');
                  onShowToast('Laporan sakit dikonfirmasi.');
                }}
                className="px-2.5 py-1 rounded-full bg-[#8AD6D1] text-[#12383A] text-[10px] font-extrabold"
              >
                Konfirmasi
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Kemajuan Semester & Tugas Minggu Ini */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Kemajuan Semester */}
        <div className="tactile-card p-5 bg-white border-2 border-[#12383A] shadow-tactile-card space-y-3">
          <div className="flex items-center justify-between pb-2 border-b-2 border-[#12383A]">
            <h3 className="font-extrabold text-base text-[#12383A]">Kemajuan Tujuan Pembelajaran</h3>
            <span className="text-xs font-bold text-[#359FA0]">Semester 1</span>
          </div>

          <div>
            <div className="flex justify-between items-center text-xs font-bold mb-1.5">
              <span>14 dari 24 TP tuntas</span>
              <span className="text-[#FF8C52] font-extrabold">58% Tuntas</span>
            </div>
            {/* Tactile Progress Bar */}
            <div className="w-full h-4 rounded-full bg-[#FFFAE6] border-2 border-[#12383A] overflow-hidden p-0.5">
              <div
                className="h-full rounded-full bg-[#FF8C52] transition-all"
                style={{ width: '58%' }}
              />
            </div>
            <p className="text-[11px] text-[#12383A]/70 font-medium mt-2">
              Fokus minggu ini: Penguatan fonik huruf dan membilang benda konkret 1 sampai 20.
            </p>
          </div>
        </div>

        {/* Tugas Minggu Ini Otomatis */}
        <div className="tactile-card p-5 bg-[#FFFAE6] border-2 border-[#12383A] shadow-tactile-card space-y-3">
          <div className="flex items-center justify-between pb-2 border-b-2 border-[#12383A]">
            <h3 className="font-extrabold text-base text-[#12383A]">Tugas Otomatis Sistem</h3>
            <span className="text-xs font-bold text-[#FF8C52]">Tenggat Waktu</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded border-2 border-[#12383A] bg-white flex items-center justify-center text-[10px] font-extrabold">
                ✓
              </span>
              <span className="line-through text-[#12383A]/60 font-medium">
                Kirim absen harian sebelum jam 08.00 pagi
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded border-2 border-[#12383A] bg-white shrink-0"></span>
              <span className="font-bold text-[#12383A]">
                Revisi Modul Ajar PJOK: perbaiki keselamatan lapangan
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded border-2 border-[#12383A] bg-white shrink-0"></span>
              <span className="font-bold text-[#12383A]">
                Cek laporan kemajuan Pita Literasi untuk 3 murid bimbingan
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Modul Ruang Pribadi (9 Ubin) */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-extrabold text-[#12383A]">
              Menu Modul Ruang Pribadi
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-[#FFF0C5] text-xs font-extrabold border border-[#12383A]">
              9 Modul Lengkap
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <button
                key={m.key}
                onClick={() => onOpenModule(m.key)}
                className="tactile-card p-4 text-left bg-white hover:bg-[#FFFAE6] transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-2xl bg-[#CFEFEC] border-2 border-[#12383A] flex items-center justify-center text-[#12383A] shadow-tactile-mini group-hover:bg-[#FF8C52] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-[#FFF0C5] text-[#12383A] border border-[#12383A]">
                      {m.count}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-base text-[#12383A] mb-1">
                    {m.label}
                  </h4>
                  <p className="text-xs text-[#12383A]/70 font-medium leading-relaxed">
                    {m.desc}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-xs font-extrabold text-[#359FA0] mt-3 group-hover:text-[#FF8C52] transition-colors">
                  <span>Buka Modul</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
