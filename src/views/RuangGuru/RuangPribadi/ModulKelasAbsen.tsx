import React, { useState } from 'react';
import {
  Users,
  CheckCircle,
  FileCheck,
  Send,
  Eye,
  AlertCircle,
  Award,
  BookOpen,
  Heart,
  MessageCircle,
} from 'lucide-react';
import { Student, AttendanceStatus, HomeroomTeacher } from '../../../types';
import { StatusChip } from '../../../components/StatusChip';
import { DataContohBadge } from '../../../components/DataContohBadge';

interface ModulKelasAbsenProps {
  teacher: HomeroomTeacher;
  students: Student[];
  onShowToast: (msg: string) => void;
}

export const ModulKelasAbsen: React.FC<ModulKelasAbsenProps> = ({
  teacher,
  students,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'absen' | 'murid' | 'profil'>('absen');
  const [selectedStudent, setSelectedStudent] = useState<Student>(students[0]);

  // Attendance status mapping for 30 students
  const [attendanceMap, setAttendanceMap] = useState<Record<string, AttendanceStatus>>(() => {
    const map: Record<string, AttendanceStatus> = {};
    students.forEach((s, idx) => {
      if (idx === 1) map[s.id] = 'Sakit';
      else if (idx === 6) map[s.id] = 'Alpa';
      else map[s.id] = 'Hadir';
    });
    return map;
  });

  const [parentReportConfirmed, setParentReportConfirmed] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [unsentCount, setUnsentCount] = useState(0);

  // New observation modal/form state
  const [observationText, setObservationText] = useState('');
  const [observationCategory, setObservationCategory] = useState<'kekuatan' | 'perlu_dukungan' | 'catatan_umum'>('kekuatan');
  const [observations, setObservations] = useState<{ id: string; studentName: string; category: string; text: string; date: string }[]>([
    {
      id: 'obs-1',
      studentName: 'Aisyah',
      category: 'kekuatan',
      text: 'Mampu memimpin doa sebelum makan siang dengan khusyuk dan ramah.',
      date: '2026-11-04',
    },
  ]);

  // Quick "Semua Hadir"
  const handleMarkAllPresent = () => {
    const map: Record<string, AttendanceStatus> = {};
    students.forEach((s) => {
      map[s.id] = 'Hadir';
    });
    setAttendanceMap(map);
    onShowToast('Seluruh 30 murid diset Hadir.');
  };

  // Change individual status
  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setAttendanceMap((prev) => ({ ...prev, [studentId]: status }));
  };

  // Save attendance
  const handleSaveAttendance = () => {
    setIsSaving(true);
    onShowToast('Sebentar ya, sedang disimpan.');
    setTimeout(() => {
      setIsSaving(false);
      setUnsentCount(0);
      onShowToast('Tersimpan. Absen 30 murid berhasil dicatat.');
    }, 800);
  };

  // Save observation
  const handleSaveObservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!observationText.trim()) return;
    setObservations((prev) => [
      {
        id: `obs-${Date.now()}`,
        studentName: selectedStudent.name,
        category: observationCategory,
        text: observationText,
        date: '2026-11-05',
      },
      ...prev,
    ]);
    setObservationText('');
    onShowToast('Catatan pengamatan murid disimpan (Lapis Hanya Anda).');
  };

  const statusOptions: AttendanceStatus[] = [
    'Hadir',
    'Sakit',
    'Izin',
    'Alpa',
    'Terlambat',
    'Dispensasi',
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Modul */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b-2 border-[#12383A]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{teacher.sticker}</span>
            <h2 className="text-2xl font-extrabold text-[#12383A]">
              Kelas Saya (Wali Kelas {teacher.grade})
            </h2>
            <DataContohBadge />
          </div>
          <p className="text-xs sm:text-sm text-[#12383A]/80 font-medium mt-1">
            Pengelolaan absen cepat 30 murid, kartu murid, dan catatan perkembangan tanpa pemeringkatan.
          </p>
        </div>

        {/* Tab Kapsul */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-white border-2 border-[#12383A] shadow-tactile-mini self-start">
          <button
            onClick={() => setActiveTab('absen')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'absen'
                ? 'bg-[#12383A] text-[#FFF0C5] shadow-tactile-mini'
                : 'text-[#12383A] hover:bg-[#FFF0C5]'
            }`}
          >
            Absen Cepat
          </button>
          <button
            onClick={() => setActiveTab('murid')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'murid'
                ? 'bg-[#12383A] text-[#FFF0C5] shadow-tactile-mini'
                : 'text-[#12383A] hover:bg-[#FFF0C5]'
            }`}
          >
            Daftar 30 Murid
          </button>
          <button
            onClick={() => setActiveTab('profil')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'profil'
                ? 'bg-[#12383A] text-[#FFF0C5] shadow-tactile-mini'
                : 'text-[#12383A] hover:bg-[#FFF0C5]'
            }`}
          >
            Profil Murid
          </button>
        </div>
      </div>

      {/* TAB 1: ABSEN CEPAT (RG03) */}
      {activeTab === 'absen' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-[#CFEFEC] border-2 border-[#12383A] shadow-tactile-mini flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-[#12383A]">
                  Absen Hari Ini: Kamis, 5 November 2026
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white text-[11px] font-extrabold border border-[#12383A]">
                  Terisi 30 dari 30
                </span>
              </div>
              <p className="text-xs text-[#12383A]/80 font-medium mt-0.5">
                Target selesai dalam kurang dari 60 detik. Tekan Semua Hadir lalu ubah pengecualian.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleMarkAllPresent}
                className="tactile-btn px-4 py-2 rounded-full bg-[#359FA0] text-white text-xs font-extrabold hover:bg-[#2b8384] transition-colors"
              >
                Semua Hadir
              </button>
              <button
                onClick={handleSaveAttendance}
                disabled={isSaving}
                className="tactile-btn px-5 py-2 rounded-full bg-[#FF8C52] text-white text-xs font-extrabold hover:bg-[#ff7b36] transition-colors flex items-center gap-1.5"
              >
                <CheckCircle className="w-4 h-4" />
                <span>{isSaving ? 'Menyimpan...' : 'Simpan Absen'}</span>
              </button>
            </div>
          </div>

          {/* Absence report notification from parent if pending */}
          {!parentReportConfirmed && (
            <div className="p-3.5 rounded-2xl bg-[#FFF0C5] border-2 border-[#12383A] shadow-tactile-mini flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <AlertCircle className="w-5 h-5 text-[#FF8C52] shrink-0" />
                <div>
                  <span className="font-extrabold text-xs text-[#12383A] block">
                    Laporan Sakit dari Orang Tua (Ibu Rina untuk Murid contoh 2)
                  </span>
                  <span className="text-[11px] text-[#12383A]/80">
                    Keterangan: demam sejak semalam • Status: Diajukan
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  setParentReportConfirmed(true);
                  onShowToast('Laporan sakit dikonfirmasi dan tersimpan final.');
                }}
                className="tactile-btn px-3.5 py-1.5 rounded-full bg-[#8AD6D1] text-[#12383A] text-xs font-extrabold hover:bg-[#359FA0] hover:text-white shrink-0"
              >
                Konfirmasi
              </button>
            </div>
          )}

          {/* 30 Students Attendance List */}
          <div className="tactile-card p-4 sm:p-5 bg-white border-2 border-[#12383A] shadow-tactile-card space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {students.map((student, idx) => {
                const currentStatus = attendanceMap[student.id] || 'Hadir';
                const isSpecial = idx === 1; // Murid contoh 2 (ortu report)
                const isAlpa = idx === 6; // Murid contoh 7 (alpa)

                return (
                  <div
                    key={student.id}
                    className={`p-3 rounded-2xl border-2 border-[#12383A] shadow-tactile-mini flex items-center justify-between gap-2 transition-all ${
                      currentStatus === 'Hadir'
                        ? 'bg-[#FFFAE6]'
                        : currentStatus === 'Sakit'
                        ? 'bg-[#CFEFEC]'
                        : currentStatus === 'Alpa'
                        ? 'bg-[#FFD9C2]'
                        : 'bg-white'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-[#12383A] text-white text-[10px] font-extrabold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span className="font-bold text-xs sm:text-sm text-[#12383A] truncate">
                          {student.name}
                        </span>
                      </div>
                      {isSpecial && !parentReportConfirmed && (
                        <span className="text-[10px] font-extrabold text-[#12383A] bg-[#FFF0C5] px-1.5 py-0.2 rounded border border-[#12383A] mt-0.5 inline-block">
                          Dari orang tua (Diajukan)
                        </span>
                      )}
                      {isAlpa && (
                        <span className="text-[10px] font-extrabold text-[#7A2E00] block mt-0.5">
                          Perlu disapa (3 hari)
                        </span>
                      )}
                    </div>

                    {/* Status Dropdown/Toggle */}
                    <select
                      value={currentStatus}
                      onChange={(e) => handleStatusChange(student.id, e.target.value as AttendanceStatus)}
                      className="px-2.5 py-1.5 rounded-full text-xs font-bold border-2 border-[#12383A] bg-white text-[#12383A] shadow-tactile-mini cursor-pointer shrink-0"
                    >
                      {statusOptions.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              })}
            </div>

            {/* Sticky Action Footer */}
            <div className="pt-4 border-t-2 border-[#12383A] flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs font-bold text-[#12383A]/70">
                Belum terkirim: {unsentCount} • Semua perubahan tersimpan otomatis di perangkat
              </span>
              <button
                onClick={handleSaveAttendance}
                disabled={isSaving}
                className="tactile-btn w-full sm:w-auto px-8 py-3 rounded-full bg-[#FF8C52] text-white font-extrabold text-sm hover:bg-[#ff7b36] shadow-tactile-btn flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                <span>Simpan Absen (30 Murid)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DAFTAR 30 MURID (RG02) */}
      {activeTab === 'murid' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-[#12383A]">
              Daftar Murid Kelas {teacher.grade} ({teacher.displayMode === 'low_grade' ? 'Mode Kelas Rendah' : 'Mode Standar'})
            </h3>
            <span className="text-xs font-bold text-[#12383A]/70">
              Total 30 Murid Terdaftar
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {students.map((st, idx) => (
              <div
                key={st.id}
                className="tactile-card p-4 bg-white border-2 border-[#12383A] shadow-tactile-card flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#CFEFEC] border-2 border-[#12383A] flex items-center justify-center font-extrabold text-xs text-[#12383A]">
                        {st.gender === 'L' ? '👦' : '👧'}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm text-[#12383A]">
                          {st.name}
                        </h4>
                        <span className="text-[10px] text-[#12383A]/70 font-semibold">
                          Wali: {st.parentName}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-[#FFFAE6] border border-[#12383A]">
                      No. {idx + 1}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] py-2 border-y border-[#12383A]/20 my-2">
                    <div>
                      <span className="text-[#12383A]/70 block font-medium">Hadir Bulan Ini:</span>
                      <strong className="text-[#359FA0] font-extrabold text-xs">{st.attendancePercent}%</strong>
                    </div>
                    <div>
                      <span className="text-[#12383A]/70 block font-medium">Pita Literasi:</span>
                      <strong className="text-[#FF8C52] font-extrabold text-xs">Level {st.literacyLevel}</strong>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => {
                      setSelectedStudent(st);
                      setActiveTab('profil');
                    }}
                    className="tactile-btn flex-1 py-1.5 px-3 rounded-full bg-[#FFF0C5] text-[#12383A] text-xs font-bold hover:bg-[#8AD6D1] flex items-center justify-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Lihat Profil</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PROFIL SATU MURID (RG04) */}
      {activeTab === 'profil' && (
        <div className="space-y-6">
          {/* Header Profil */}
          <div className="tactile-card p-6 bg-gradient-to-r from-[#FFFAE6] to-[#CFEFEC] border-2 border-[#12383A] shadow-tactile-card">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-3xl bg-[#8AD6D1] border-2 border-[#12383A] shadow-tactile-btn flex items-center justify-center text-3xl">
                  {selectedStudent.gender === 'L' ? '👦' : '👧'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-extrabold text-[#12383A]">
                      {selectedStudent.name}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-white text-xs font-bold border border-[#12383A]">
                      Kelas {teacher.grade}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#12383A]/80 font-medium">
                    Orang Tua: <strong className="font-extrabold">{selectedStudent.parentName}</strong> ({selectedStudent.parentPhone})
                  </p>
                </div>
              </div>

              {/* Selector Murid Lain */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#12383A]">Pilih Murid:</span>
                <select
                  value={selectedStudent.id}
                  onChange={(e) => {
                    const st = students.find((s) => s.id === e.target.value);
                    if (st) setSelectedStudent(st);
                  }}
                  className="px-3 py-1.5 rounded-full border-2 border-[#12383A] bg-white text-xs font-bold text-[#12383A] shadow-tactile-mini"
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 4 Kartu Metrik Satu Murid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="tactile-card p-4 bg-white border-2 border-[#12383A] shadow-tactile-card">
              <span className="text-xs font-bold text-[#12383A]/70 block mb-1">Kehadiran Bulan Ini</span>
              <strong className="text-2xl font-extrabold text-[#359FA0]">
                {selectedStudent.attendancePercent}%
              </strong>
              <p className="text-[11px] text-[#12383A]/80 mt-1">Sangat disiplin hadir</p>
            </div>

            <div className="tactile-card p-4 bg-white border-2 border-[#12383A] shadow-tactile-card">
              <span className="text-xs font-bold text-[#12383A]/70 block mb-1">Pita Literasi Fase A</span>
              <strong className="text-2xl font-extrabold text-[#FF8C52]">
                Level {selectedStudent.literacyLevel}
              </strong>
              <p className="text-[11px] text-[#12383A]/80 mt-1">Membaca kata & kalimat pendek</p>
            </div>

            <div className="tactile-card p-4 bg-white border-2 border-[#12383A] shadow-tactile-card">
              <span className="text-xs font-bold text-[#12383A]/70 block mb-1">Pita Numerasi</span>
              <strong className="text-2xl font-extrabold text-[#359FA0]">
                Level {selectedStudent.numeracyLevel}
              </strong>
              <p className="text-[11px] text-[#12383A]/80 mt-1">Membilang sampai 20 benda</p>
            </div>

            <div className="tactile-card p-4 bg-white border-2 border-[#12383A] shadow-tactile-card">
              <span className="text-xs font-bold text-[#12383A]/70 block mb-1">7 Kebiasaan Anak</span>
              <strong className="text-2xl font-extrabold text-[#174D1F]">
                {selectedStudent.habitsStreak} Hari Rangkaian
              </strong>
              <p className="text-[11px] text-[#12383A]/80 mt-1">Aktif bangun pagi & belajar</p>
            </div>
          </div>

          {/* Form Catat Pengamatan (Lapis Hanya Anda) */}
          <div className="tactile-card p-6 bg-white border-2 border-[#12383A] shadow-tactile-card space-y-4">
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#12383A]">
              <div className="flex items-center gap-2">
                <StatusChip status="Hanya Anda" size="sm" />
                <h4 className="font-extrabold text-base text-[#12383A]">
                  Catat Pengamatan Murid: {selectedStudent.name}
                </h4>
              </div>
              <span className="text-xs font-bold text-[#12383A]/70">
                Rahasia guru • Tidak terlihat murid atau KS
              </span>
            </div>

            <form onSubmit={handleSaveObservation} className="space-y-3">
              <div>
                <label className="block text-xs font-extrabold text-[#12383A] mb-1">
                  Kategori Pengamatan
                </label>
                <div className="flex flex-wrap gap-2">
                  {(['kekuatan', 'perlu_dukungan', 'catatan_umum'] as const).map((cat) => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setObservationCategory(cat)}
                      className={`px-3 py-1 rounded-full text-xs font-bold border-2 border-[#12383A] transition-all ${
                        observationCategory === cat
                          ? 'bg-[#12383A] text-[#FFF0C5] shadow-tactile-mini'
                          : 'bg-[#FFFAE6] text-[#12383A]'
                      }`}
                    >
                      {cat === 'kekuatan' ? 'Kekuatan Unik' : cat === 'perlu_dukungan' ? 'Perlu Dukungan' : 'Catatan Umum'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#12383A] mb-1">
                  Uraian Pengamatan (Fakta Konkret)
                </label>
                <textarea
                  rows={3}
                  value={observationText}
                  onChange={(e) => setObservationText(e.target.value)}
                  placeholder="Contoh: Ananda sangat senang saat permainan kartu huruf kelompok dan membimbing teman sebangkunya..."
                  className="w-full p-3 rounded-2xl border-2 border-[#12383A] bg-[#FFFAE6] text-sm text-[#12383A]"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-[#12383A]/70 font-semibold">
                  Tersimpan di ruang privat Anda
                </span>
                <button
                  type="submit"
                  className="tactile-btn px-5 py-2 rounded-full bg-[#359FA0] text-white text-xs font-extrabold hover:bg-[#2b8384]"
                >
                  Simpan Catatan Pengamatan
                </button>
              </div>
            </form>

            {/* Riwayat Catatan */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-extrabold uppercase tracking-wide text-[#359FA0] block">
                Riwayat Pengamatan Ananda ({observations.filter((o) => o.studentName === selectedStudent.name).length})
              </span>
              {observations
                .filter((o) => o.studentName === selectedStudent.name)
                .map((obs) => (
                  <div key={obs.id} className="p-3 rounded-xl bg-[#FFFAE6] border border-[#12383A] text-xs space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-extrabold text-[#FF8C52] uppercase text-[10px]">
                        {obs.category}
                      </span>
                      <span className="text-[10px] text-[#12383A]/60">{obs.date}</span>
                    </div>
                    <p className="font-medium text-[#12383A]">{obs.text}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
