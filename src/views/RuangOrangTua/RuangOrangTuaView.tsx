import React, { useState } from 'react';
import { Users, FileText, Send, AlertCircle, CheckCircle2, MessageSquare, Phone, Heart, Upload } from 'lucide-react';
import { AbsenceReport, ParentConversation } from '../../types';
import { INITIAL_CONVERSATIONS, INITIAL_ABSENCE_REPORTS } from '../../data/mockData';
import { StatusChip } from '../../components/StatusChip';
import { DataContohBadge } from '../../components/DataContohBadge';

interface RuangOrangTuaViewProps {
  onShowToast: (msg: string) => void;
}

export const RuangOrangTuaView: React.FC<RuangOrangTuaViewProps> = ({
  onShowToast,
}) => {
  const [selectedChild, setSelectedChild] = useState<'Aisyah' | 'Fajar'>('Aisyah');
  const isAisyah = selectedChild === 'Aisyah';
  const childGrade = isAisyah ? 1 : 2;
  const teacherName = isAisyah ? 'Ibu Darmiati, S.Pd' : 'Ibu Fadilatul Jannah Samsuru, S.Pd';

  // Lapor Tidak Masuk Form State
  const [reportReason, setReportReason] = useState<'Sakit' | 'Izin' | 'Lainnya'>('Sakit');
  const [reportDate, setReportDate] = useState('2026-11-05');
  const [reportNote, setReportNote] = useState('');
  const [reportsList, setReportsList] = useState<AbsenceReport[]>(INITIAL_ABSENCE_REPORTS);

  // Ceritakan dari Rumah State
  const [reflectionText, setReflectionText] = useState('');
  const [reflections, setReflections] = useState<{ id: string; childName: string; text: string; date: string }[]>([
    {
      id: 'ref-1',
      childName: 'Aisyah',
      text: 'Aisyah sangat bersemangat saat bercerita tentang kebun kacang hijau yang ditanamnya di sekolah.',
      date: '2026-11-03',
    },
  ]);

  // Messages with teacher
  const [conversations, setConversations] = useState<ParentConversation[]>(INITIAL_CONVERSATIONS);
  const [messageInput, setMessageInput] = useState('');

  const activeConv = conversations[0];

  const handleSendAbsenceReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportNote.trim()) {
      onShowToast('Kolom catatan laporan belum diisi.');
      return;
    }

    const newReport: AbsenceReport = {
      id: `rep-${Date.now()}`,
      studentName: selectedChild,
      grade: childGrade,
      reason: reportReason,
      date: reportDate,
      note: reportNote,
      doctorLetterName: reportReason === 'Sakit' ? 'surat_keterangan_sakit.pdf' : undefined,
      status: 'Diajukan',
    };

    setReportsList([newReport, ...reportsList]);
    setReportNote('');
    onShowToast(`Laporan ${reportReason} untuk ananda ${selectedChild} diajukan ke wali kelas.`);
  };

  const handleSendReflection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reflectionText.trim()) return;

    setReflections([
      {
        id: `ref-${Date.now()}`,
        childName: selectedChild,
        text: reflectionText,
        date: '2026-11-05',
      },
      ...reflections,
    ]);
    setReflectionText('');
    onShowToast('Cerita dari rumah berhasil dikirimkan ke Ibu Guru.');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newMsg = {
      id: `m-${Date.now()}`,
      sender: 'orang_tua' as const,
      text: messageInput,
      time: 'Baru saja',
    };

    setConversations((prev) =>
      prev.map((c, i) =>
        i === 0
          ? {
              ...c,
              messages: [...c.messages, newMsg],
              lastMessage: messageInput,
              lastTime: 'Baru saja',
            }
          : c
      )
    );

    setMessageInput('');
    onShowToast('Pesan santun terkirim ke wali kelas.');
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header Orang Tua */}
      <div className="tactile-card p-6 bg-[#FFFAE6] border-2 border-[#12383A] shadow-tactile-card relative overflow-hidden">
        <div className="ribbon-4-strip -mt-6 -mx-6 mb-6">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-3xl">🏡</span>
              <span className="text-xs font-extrabold uppercase tracking-wide text-[#359FA0]">
                Ruang Orang Tua SDN 03 Wonosari
              </span>
              <DataContohBadge />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#12383A]">
              Selamat datang, Ibu Rina
            </h1>
            <p className="text-xs sm:text-sm text-[#12383A]/80 font-medium mt-1">
              Pendampingan terpadu sekolah dan rumah. Pantau kehadiran, rutinitas 7 kebiasaan, serta komunikasi langsung dengan wali kelas.
            </p>
          </div>

          {/* Pemilih Anak (Aisyah & Fajar) sesuai Bagian 13 DESIGN.md */}
          <div className="p-2 rounded-2xl bg-white border-2 border-[#12383A] shadow-tactile-mini self-start shrink-0">
            <span className="text-[10px] uppercase font-extrabold text-[#12383A]/70 block mb-1.5 px-2">
              Pilih Ananda:
            </span>
            <div className="flex gap-1.5">
              <button
                onClick={() => setSelectedChild('Aisyah')}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold border-2 border-[#12383A] transition-all ${
                  isAisyah
                    ? 'bg-[#12383A] text-[#FFF0C5] shadow-tactile-mini'
                    : 'bg-[#FFFAE6] text-[#12383A]'
                }`}
              >
                👧 Aisyah (Kelas 1)
              </button>
              <button
                onClick={() => setSelectedChild('Fajar')}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold border-2 border-[#12383A] transition-all ${
                  !isAisyah
                    ? 'bg-[#12383A] text-[#FFF0C5] shadow-tactile-mini'
                    : 'bg-[#FFFAE6] text-[#12383A]'
                }`}
              >
                👦 Fajar (Kelas 2)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4 KARTU RANGKUMAN HARIAN ANAK (SESUAI ATURAN DESIGN.MD) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Kartu 1: Kehadiran Hari Ini */}
        <div className="tactile-card p-5 bg-white border-2 border-[#12383A] shadow-tactile-card space-y-2">
          <span className="text-xs font-extrabold uppercase text-[#359FA0] block">
            Kehadiran Hari Ini
          </span>
          <div className="flex items-center justify-between">
            <strong className="text-xl font-extrabold text-[#12383A]">
              Hadir di Kelas
            </strong>
            <span className="w-8 h-8 rounded-full bg-[#CDEFD0] text-[#174D1F] border border-[#12383A] font-extrabold text-sm flex items-center justify-center">
              ✓
            </span>
          </div>
          <p className="text-[11px] text-[#12383A]/80 font-medium">
            Tercatat hadir pada pukul 07.15 WITA
          </p>
        </div>

        {/* Kartu 2: 7 Kebiasaan Terlaksana */}
        <div className="tactile-card p-5 bg-white border-2 border-[#12383A] shadow-tactile-card space-y-2">
          <span className="text-xs font-extrabold uppercase text-[#FF8C52] block">
            7 Kebiasaan Hari Ini
          </span>
          <div className="flex items-center justify-between">
            <strong className="text-xl font-extrabold text-[#12383A]">
              5 dari 7 Terisi
            </strong>
            <span className="text-2xl">⭐</span>
          </div>
          <p className="text-[11px] text-[#12383A]/80 font-medium">
            Aktif sarapan sehat dan bangun pagi
          </p>
        </div>

        {/* Kartu 3: Tugas Sekolah Aktif */}
        <div className="tactile-card p-5 bg-white border-2 border-[#12383A] shadow-tactile-card space-y-2">
          <span className="text-xs font-extrabold uppercase text-[#359FA0] block">
            Tugas Sekolah Aktif
          </span>
          <div className="flex items-center justify-between">
            <strong className="text-xl font-extrabold text-[#12383A]">
              1 Perlu Latihan
            </strong>
            <span className="px-2 py-0.5 rounded-full bg-[#FFF0C5] text-xs font-extrabold border border-[#12383A]">
              Aktif
            </span>
          </div>
          <p className="text-[11px] text-[#12383A]/80 font-medium">
            Menghitung benda di rumah sampai 20
          </p>
        </div>

        {/* Kartu 4: Capaian Belajar Terbaru */}
        <div className="tactile-card p-5 bg-white border-2 border-[#12383A] shadow-tactile-card space-y-2">
          <span className="text-xs font-extrabold uppercase text-[#174D1F] block">
            Capaian Terbit
          </span>
          <div className="flex items-center justify-between">
            <strong className="text-xl font-extrabold text-[#174D1F]">
              Level {isAisyah ? '3' : '4'}
            </strong>
            <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-[#CDEFD0] border border-[#12383A]">
              Hebat
            </span>
          </div>
          <p className="text-[11px] text-[#12383A]/80 font-medium">
            Membaca kata nyata dengan lancar
          </p>
        </div>
      </div>

      {/* DUA FORMULIR PENTING: LAPOR TIDAK MASUK & CERITAKAN DARI RUMAH */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formulir 1: Lapor Anak Tidak Masuk (Sakit / Izin) */}
        <div className="tactile-card p-6 bg-white border-2 border-[#12383A] shadow-tactile-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b-2 border-[#12383A]">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-[#FF8C52]" />
              <h2 className="text-lg font-extrabold text-[#12383A]">
                Lapor Anak Tidak Masuk Sekolah
              </h2>
            </div>
            <span className="text-xs font-bold text-[#12383A]/70">
              Wali: {teacherName}
            </span>
          </div>

          <form onSubmit={handleSendAbsenceReport} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-extrabold text-[#12383A] mb-1">
                  Nama Ananda
                </label>
                <input
                  type="text"
                  disabled
                  value={`${selectedChild} (Kelas ${childGrade})`}
                  className="w-full p-2.5 rounded-xl border-2 border-[#12383A] bg-[#FFFAE6] text-xs font-bold text-[#12383A]"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#12383A] mb-1">
                  Alasan Tidak Masuk
                </label>
                <select
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border-2 border-[#12383A] bg-white text-xs font-bold text-[#12383A]"
                >
                  <option value="Sakit">Sakit</option>
                  <option value="Izin">Izin Keperluan Keluarga</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-[#12383A] mb-1">
                Tanggal Tidak Masuk
              </label>
              <input
                type="date"
                value={reportDate}
                onChange={(e) => setReportDate(e.target.value)}
                className="w-full p-2.5 rounded-xl border-2 border-[#12383A] bg-white text-xs font-bold text-[#12383A]"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-[#12383A] mb-1">
                Catatan Singkat untuk Ibu Guru
              </label>
              <textarea
                rows={2}
                required
                value={reportNote}
                onChange={(e) => setReportNote(e.target.value)}
                placeholder="Contoh: Ananda mengalami demam sejak tadi malam dan sedang istirahat di rumah..."
                className="w-full p-2.5 rounded-xl border-2 border-[#12383A] bg-[#FFFAE6] text-xs text-[#12383A]"
              />
            </div>

            <div className="p-3 rounded-xl bg-[#FFFAE6] border border-dashed border-[#12383A] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Upload className="w-4 h-4 text-[#359FA0]" />
                <span className="font-semibold text-[#12383A]">
                  Lampirkan Surat Dokter (Opsional)
                </span>
              </div>
              <span className="text-[10px] text-[#12383A]/60">PDF / Foto</span>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-[#12383A]/70 font-semibold">
                Status awal: Diajukan (Menunggu konfirmasi guru)
              </span>
              <button
                type="submit"
                className="tactile-btn px-6 py-2.5 rounded-full bg-[#FF8C52] text-white text-xs font-extrabold hover:bg-[#ff7b36]"
              >
                Kirim Laporan
              </button>
            </div>
          </form>

          {/* Riwayat Laporan Terakhir */}
          {reportsList.length > 0 && (
            <div className="pt-3 border-t border-[#12383A]/20 space-y-2">
              <span className="text-[11px] font-extrabold text-[#359FA0] uppercase block">
                Riwayat Pengajuan Terakhir:
              </span>
              {reportsList.map((rep) => (
                <div
                  key={rep.id}
                  className="p-3 rounded-xl bg-[#FFFAE6] border border-[#12383A] flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-[#12383A] block">
                      {rep.reason} • {rep.date} ({rep.studentName})
                    </span>
                    <span className="text-[11px] text-[#12383A]/80">{rep.note}</span>
                  </div>
                  <StatusChip status={rep.status} size="sm" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Formulir 2: Ceritakan dari Rumah (Refleksi Orang Tua) */}
        <div className="tactile-card p-6 bg-white border-2 border-[#12383A] shadow-tactile-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b-2 border-[#12383A]">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#359FA0]" />
              <h2 className="text-lg font-extrabold text-[#12383A]">
                Ceritakan dari Rumah
              </h2>
            </div>
            <span className="text-xs font-bold text-[#12383A]/70">
              Refleksi Mingguan
            </span>
          </div>

          <p className="text-xs text-[#12383A]/80 font-medium">
            Ceritakan kebiasaan baik, hal menggembirakan, atau tantangan yang dihadapi ananda saat di rumah agar guru dapat mendampingi lebih tepat di kelas.
          </p>

          <form onSubmit={handleSendReflection} className="space-y-3">
            <div>
              <label className="block text-xs font-extrabold text-[#12383A] mb-1">
                Cerita Perkembangan {selectedChild}
              </label>
              <textarea
                rows={4}
                required
                value={reflectionText}
                onChange={(e) => setReflectionText(e.target.value)}
                placeholder="Contoh: Pekan ini ananda sangat rajin bangun subuh dan mulai gemar menghitung sendok saat makan bersama..."
                className="w-full p-3 rounded-2xl border-2 border-[#12383A] bg-[#FFFAE6] text-xs text-[#12383A]"
              />
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="submit"
                className="tactile-btn px-6 py-2.5 rounded-full bg-[#359FA0] text-white text-xs font-extrabold hover:bg-[#2b8384]"
              >
                Kirim Refleksi ke Guru
              </button>
            </div>
          </form>

          {/* Catatan Refleksi Sebelumnya */}
          <div className="pt-2 space-y-2">
            <span className="text-[11px] font-extrabold text-[#FF8C52] uppercase block">
              Cerita yang Sudah Terkirim:
            </span>
            {reflections.map((rf) => (
              <div key={rf.id} className="p-3 rounded-xl bg-[#FFFAE6] border border-[#12383A] text-xs space-y-1">
                <div className="flex justify-between items-center text-[10px] text-[#12383A]/60 font-semibold">
                  <span>Tentang {rf.childName}</span>
                  <span>{rf.date}</span>
                </div>
                <p className="font-medium text-[#12383A]">{rf.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RUANG PENGHUBUNG: THREAD PERCAKAPAN LANGSUNG DENGAN WALI KELAS */}
      <div className="tactile-card p-6 bg-white border-2 border-[#12383A] shadow-tactile-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b-2 border-[#12383A]">
          <div>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#359FA0]" />
              <h2 className="text-xl font-extrabold text-[#12383A]">
                Ruang Penghubung: Chat dengan {teacherName}
              </h2>
            </div>
            <p className="text-xs text-[#12383A]/80 font-medium">
              Saluran komunikasi santun dan langsung antara orang tua dan wali kelas ananda {selectedChild}.
            </p>
          </div>

          <button
            onClick={() => {
              const text = encodeURIComponent(
                `Halo ${teacherName}, saya Ibu Rina (Orang tua ${selectedChild} Kelas ${childGrade}).`
              );
              window.open(`https://wa.me/6281234567890?text=${text}`, '_blank');
            }}
            className="tactile-btn px-4 py-2 rounded-full bg-[#8AD6D1] text-[#12383A] text-xs font-extrabold flex items-center gap-1.5 self-start"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Chat via WhatsApp</span>
          </button>
        </div>

        {/* Message Thread */}
        <div className="space-y-3 max-h-[300px] overflow-y-auto p-4 rounded-2xl bg-[#FFFAE6] border-2 border-[#12383A]">
          {activeConv.messages.map((msg) => {
            const isMe = msg.sender === 'orang_tua';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3.5 rounded-2xl border-2 border-[#12383A] max-w-[80%] text-xs font-medium shadow-tactile-mini ${
                    isMe
                      ? 'bg-[#CFEFEC] text-[#12383A]'
                      : 'bg-white text-[#12383A]'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
                <span className="text-[10px] text-[#12383A]/60 font-semibold mt-1 px-1">
                  {isMe ? 'Anda (Ibu Rina)' : teacherName} • {msg.time}
                </span>
              </div>
            );
          })}
        </div>

        {/* Reply Box */}
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            required
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder={`Tulis pesan santun kepada ${teacherName}...`}
            className="flex-1 p-3 rounded-2xl border-2 border-[#12383A] bg-[#FFFAE6] text-xs text-[#12383A]"
          />
          <button
            type="submit"
            className="tactile-btn px-6 py-3 rounded-full bg-[#FF8C52] text-white text-xs font-extrabold hover:bg-[#ff7b36] flex items-center gap-1 shrink-0"
          >
            <Send className="w-4 h-4" />
            <span>Kirim Pesan</span>
          </button>
        </form>
      </div>
    </div>
  );
};
