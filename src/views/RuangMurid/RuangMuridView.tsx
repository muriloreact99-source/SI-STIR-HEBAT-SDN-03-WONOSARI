import React, { useState } from 'react';
import { Sparkles, Star, Award, CheckCircle2, Clock, Calendar, Upload, BookOpen } from 'lucide-react';
import { StudentTask, StudentHighlight } from '../../types';
import { HABIT_DEFINITIONS, INITIAL_TASKS, INITIAL_HIGHLIGHTS } from '../../data/mockData';
import { StatusChip } from '../../components/StatusChip';
import { DataContohBadge } from '../../components/DataContohBadge';

interface RuangMuridViewProps {
  activeStudentName: string;
  onSelectStudent: (name: string) => void;
  onShowToast: (msg: string) => void;
}

export const RuangMuridView: React.FC<RuangMuridViewProps> = ({
  activeStudentName,
  onSelectStudent,
  onShowToast,
}) => {
  const isAisyah = activeStudentName === 'Aisyah';
  const grade = isAisyah ? 1 : 2;
  const teacherName = isAisyah ? 'Ibu Darmiati, S.Pd' : 'Ibu Fadilatul Jannah Samsuru, S.Pd';

  // 7 Habits completed state for today
  const [completedHabits, setCompletedHabits] = useState<number[]>([1, 2, 4]);
  const [tasks, setTasks] = useState<StudentTask[]>(INITIAL_TASKS);
  const [highlights] = useState<StudentHighlight[]>(INITIAL_HIGHLIGHTS);

  const toggleHabit = (id: number) => {
    if (completedHabits.includes(id)) {
      setCompletedHabits(completedHabits.filter((h) => h !== id));
      onShowToast('Centang kebiasaan diperbarui.');
    } else {
      setCompletedHabits([...completedHabits, id]);
      onShowToast('Hebat! Kamu mendapatkan satu bintang baru ⭐');
    }
  };

  const handleKumpulkanTugas = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? { ...t, status: 'Sudah dikirim', submissionDate: '2026-11-05' }
          : t
      )
    );
    onShowToast('Tugasmu berhasil dikirim ke Ibu Guru!');
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Ceria Hero Card (Mint Accent, 40px Emoji, Warm Greeting "Kamu") */}
      <div className="tactile-card-lg p-6 sm:p-8 bg-[#8AD6D1] border-2 border-[#12383A] shadow-tactile-card relative overflow-hidden">
        <div className="ribbon-4-strip -mt-6 sm:-mt-8 -mx-6 sm:-mx-8 mb-6">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-4xl">🎒</span>
              <span className="px-3 py-1 rounded-full bg-white border-2 border-[#12383A] text-xs font-extrabold text-[#12383A] shadow-tactile-mini">
                Kelas {grade} SD • SDN 03 Wonosari
              </span>
              <DataContohBadge />
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#12383A] tracking-tight">
              Halo, {activeStudentName}!
            </h1>
            <p className="text-sm sm:text-base text-[#12383A] font-bold max-w-xl">
              Selamat belajar dengan gembira hari ini bersama {teacherName}. Kumpulkan bintang kebiasaan baik dan selesaikan tugas belajarmu dengan ceria!
            </p>
          </div>

          {/* Child Switcher Pills */}
          <div className="p-2 rounded-2xl bg-[#FFFAE6] border-2 border-[#12383A] shadow-tactile-mini self-start shrink-0">
            <span className="text-[10px] uppercase font-extrabold text-[#12383A]/70 block mb-1.5 px-2">
              Pilih Profil Murid:
            </span>
            <div className="flex gap-1.5">
              <button
                onClick={() => onSelectStudent('Aisyah')}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold border-2 border-[#12383A] transition-all ${
                  isAisyah
                    ? 'bg-[#12383A] text-[#FFF0C5] shadow-tactile-mini'
                    : 'bg-white text-[#12383A]'
                }`}
              >
                👧 Aisyah (Kelas 1)
              </button>
              <button
                onClick={() => onSelectStudent('Fajar')}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold border-2 border-[#12383A] transition-all ${
                  !isAisyah
                    ? 'bg-[#12383A] text-[#FFF0C5] shadow-tactile-mini'
                    : 'bg-white text-[#12383A]'
                }`}
              >
                👦 Fajar (Kelas 2)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 7 KEBIASAAN ANAK INDONESIA HEBAT (CHECKLIST DENGAN BINTANG) */}
      <div className="tactile-card p-6 bg-white border-2 border-[#12383A] shadow-tactile-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b-2 border-[#12383A]">
          <div>
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 text-[#FF8C52] fill-[#FF8C52]" />
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#12383A]">
                7 Kebiasaan Anak Indonesia Hebat
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#12383A]/80 font-medium">
              Ketuk untuk menandai kebiasaan yang sudah kamu lakukan hari ini di rumah atau sekolah.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="px-4 py-2 rounded-full bg-[#FFF0C5] border-2 border-[#12383A] shadow-tactile-mini flex items-center gap-2">
              <span className="text-xl">⭐</span>
              <strong className="text-sm font-extrabold text-[#12383A]">
                {completedHabits.length} dari 7 Selesai
              </strong>
            </div>
          </div>
        </div>

        {/* Progress Bar Ceria */}
        <div>
          <div className="w-full h-4 rounded-full bg-[#FFFAE6] border-2 border-[#12383A] overflow-hidden p-0.5">
            <div
              className="h-full rounded-full bg-[#FF8C52] transition-all duration-300"
              style={{ width: `${(completedHabits.length / 7) * 100}%` }}
            />
          </div>
          <p className="text-xs font-bold text-[#12383A] mt-1.5 text-right">
            {completedHabits.length === 7
              ? 'Luar biasa! Semua kebiasaan hebat hari ini selesai!'
              : `${7 - completedHabits.length} kebiasaan lagi untuk hari ini!`}
          </p>
        </div>

        {/* Habits Checklist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {HABIT_DEFINITIONS.map((habit) => {
            const isDone = completedHabits.includes(habit.id);
            return (
              <button
                key={habit.id}
                type="button"
                onClick={() => toggleHabit(habit.id)}
                className={`p-4 rounded-2xl border-2 border-[#12383A] text-left transition-all flex items-center justify-between gap-3 min-h-[56px] ${
                  isDone
                    ? 'bg-[#CDEFD0] text-[#174D1F] shadow-tactile-mini'
                    : 'bg-[#FFFAE6] hover:bg-white text-[#12383A]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{habit.icon}</span>
                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base">
                      {habit.name}
                    </h3>
                    <p className="text-xs opacity-85 font-medium leading-snug">
                      {habit.description}
                    </p>
                  </div>
                </div>

                <div
                  className={`w-7 h-7 rounded-xl border-2 border-[#12383A] flex items-center justify-center shrink-0 transition-all ${
                    isDone ? 'bg-[#FF8C52] text-white shadow-tactile-mini' : 'bg-white'
                  }`}
                >
                  {isDone && <CheckCircle2 className="w-5 h-5" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* TUGAS SISWA & JADWAL HARI INI */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tugas Siswa (2 Kolom) */}
        <div className="lg:col-span-2 tactile-card p-6 bg-white border-2 border-[#12383A] shadow-tactile-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b-2 border-[#12383A]">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#359FA0]" />
              <h2 className="text-xl font-extrabold text-[#12383A]">Tugas Sekolahmu</h2>
            </div>
            <span className="text-xs font-bold text-[#12383A]/70">
              {tasks.length} Tugas
            </span>
          </div>

          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="p-4 rounded-2xl bg-[#FFFAE6] border-2 border-[#12383A] shadow-tactile-mini space-y-2.5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-extrabold uppercase px-2 py-0.5 rounded bg-white border border-[#12383A] text-[#12383A]">
                      {task.subject}
                    </span>
                    <h3 className="font-extrabold text-base text-[#12383A] mt-1">
                      {task.title}
                    </h3>
                  </div>
                  <StatusChip status={task.status} size="sm" />
                </div>

                <p className="text-xs text-[#12383A]/85 font-medium leading-relaxed">
                  {task.instructions}
                </p>

                {task.feedback && (
                  <div className="p-3 rounded-xl bg-[#CDEFD0] border border-[#12383A] text-xs">
                    <strong className="text-[#174D1F] block text-[11px] font-extrabold">
                      Catatan Ibu Guru:
                    </strong>
                    <p className="text-[#12383A] font-medium">{task.feedback}</p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-[#12383A]/20 text-xs">
                  <span className="text-[#12383A]/70 font-semibold">
                    Kumpulkan sebelum: {task.dueDate}
                  </span>
                  {task.status === 'Belum dikerjakan' && (
                    <button
                      onClick={() => handleKumpulkanTugas(task.id)}
                      className="tactile-btn px-4 py-2 rounded-full bg-[#FF8C52] text-white font-extrabold hover:bg-[#ff7b36] flex items-center justify-center gap-1.5"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Kumpulkan Tugas</span>
                    </button>
                  )}
                  {task.status === 'Perlu diperbaiki' && (
                    <button
                      onClick={() => handleKumpulkanTugas(task.id)}
                      className="tactile-btn px-4 py-2 rounded-full bg-[#359FA0] text-white font-extrabold hover:bg-[#2b8384] flex items-center justify-center gap-1.5"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Kirim Ulang Tugas</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Jadwal Pelajaran & Sorotan Guru */}
        <div className="space-y-6">
          {/* Jadwal Hari Ini */}
          <div className="tactile-card p-5 bg-[#FFFAE6] border-2 border-[#12383A] shadow-tactile-card space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b-2 border-[#12383A]">
              <Clock className="w-4 h-4 text-[#359FA0]" />
              <h3 className="font-extrabold text-base text-[#12383A]">Jadwal Hari Ini</h3>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-white border border-[#12383A]">
                <span className="text-[10px] font-extrabold text-[#359FA0] block">07.30 - 09.00</span>
                <strong className="text-sm font-extrabold text-[#12383A] block">Bahasa Indonesia</strong>
                <p className="text-[#12383A]/70 mt-0.5">Membaca kartu kata dan dongeng</p>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#12383A]">
                <span className="text-[10px] font-extrabold text-[#FF8C52] block">09.15 - 10.45</span>
                <strong className="text-sm font-extrabold text-[#12383A] block">Matematika</strong>
                <p className="text-[#12383A]/70 mt-0.5">Menghitung benda sampai 20</p>
              </div>
            </div>
          </div>

          {/* Sorotan Karya dari Ibu Guru */}
          <div className="tactile-card p-5 bg-gradient-to-b from-[#CFEFEC] to-[#FFFAE6] border-2 border-[#12383A] shadow-tactile-card space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b-2 border-[#12383A]">
              <Sparkles className="w-4 h-4 text-[#FF8C52]" />
              <h3 className="font-extrabold text-base text-[#12383A]">Karyamu Disorot</h3>
            </div>

            {highlights.slice(0, 1).map((hl) => (
              <div key={hl.id} className="space-y-2 text-xs">
                <span className="px-2 py-0.5 rounded-full bg-white text-[10px] font-extrabold border border-[#12383A] text-[#12383A]">
                  Apresiasi Ibu Guru
                </span>
                <h4 className="font-extrabold text-sm text-[#12383A] leading-snug">
                  {hl.title}
                </h4>
                <p className="text-[#12383A]/90 font-medium leading-relaxed bg-white/70 p-3 rounded-xl border border-[#12383A]/20">
                  "{hl.content}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
