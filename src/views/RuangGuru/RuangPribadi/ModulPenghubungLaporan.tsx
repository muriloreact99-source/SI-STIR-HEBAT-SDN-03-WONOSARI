import React, { useState } from 'react';
import { MessageSquare, Send, Phone, ExternalLink, Download, FileText, CheckCircle } from 'lucide-react';
import { HomeroomTeacher, Student, ParentConversation } from '../../../types';
import { INITIAL_CONVERSATIONS } from '../../../data/mockData';
import { DataContohBadge } from '../../../components/DataContohBadge';

interface ModulPenghubungLaporanProps {
  teacher: HomeroomTeacher;
  students: Student[];
  onShowToast: (msg: string) => void;
}

export const ModulPenghubungLaporan: React.FC<ModulPenghubungLaporanProps> = ({
  teacher,
  students,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'pesan' | 'laporan'>('pesan');
  const [conversations, setConversations] = useState<ParentConversation[]>(INITIAL_CONVERSATIONS);
  const [selectedConvId, setSelectedConvId] = useState<string>(conversations[0].id);
  const [replyText, setReplyText] = useState('');

  const activeConv = conversations.find((c) => c.id === selectedConvId) || conversations[0];

  // Quick reply templates
  const quickTemplates = [
    'Terima kasih Ibu, kabar baik ananda sudah kami terima dan catat.',
    'Baik Ibu, semoga ananda lekas sembuh dan bisa istirahat cukup di rumah.',
    'Ananda hari ini sangat aktif dan ceria mengikuti pelajaran.',
    'Mohon dukungan di rumah untuk mendampingi latihan membaca 10 menit.',
  ];

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newMsg = {
      id: `m-${Date.now()}`,
      sender: 'guru' as const,
      text: replyText,
      time: 'Baru saja',
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === selectedConvId
          ? {
              ...c,
              messages: [...c.messages, newMsg],
              lastMessage: replyText,
              lastTime: 'Baru saja',
            }
          : c
      )
    );

    setReplyText('');
    onShowToast('Balasan terkirim ke orang tua murid.');
  };

  const handleWhatsAppClick = (phone: string, studentName: string) => {
    const text = encodeURIComponent(
      `Halo Ibu, saya ${teacher.name}, Wali Kelas ${teacher.grade} SDN 03 Wonosari mengenai ananda ${studentName}.`
    );
    window.open(`https://wa.me/6281234567890?text=${text}`, '_blank');
    onShowToast('Membuka tautan WhatsApp Click to Chat.');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b-2 border-[#12383A]">
        <div>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-[#359FA0]" />
            <h2 className="text-2xl font-extrabold text-[#12383A]">
              Ruang Penghubung dan Laporan (Kelas {teacher.grade})
            </h2>
            <DataContohBadge />
          </div>
          <p className="text-xs sm:text-sm text-[#12383A]/80 font-medium mt-1">
            Komunikasi santun dengan orang tua siswa dan penyusunan draf Laporan Capaian Murid terstruktur tanpa AI.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-white border-2 border-[#12383A] shadow-tactile-mini self-start">
          <button
            onClick={() => setActiveTab('pesan')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'pesan'
                ? 'bg-[#12383A] text-[#FFF0C5] shadow-tactile-mini'
                : 'text-[#12383A] hover:bg-[#FFF0C5]'
            }`}
          >
            Kotak Masuk Pesan
          </button>
          <button
            onClick={() => setActiveTab('laporan')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'laporan'
                ? 'bg-[#12383A] text-[#FFF0C5] shadow-tactile-mini'
                : 'text-[#12383A] hover:bg-[#FFF0C5]'
            }`}
          >
            Laporan Capaian Murid
          </button>
        </div>
      </div>

      {/* TAB 1: KOTAK MASUK (RG17) */}
      {activeTab === 'pesan' && (
        <div className="space-y-4">
          {/* Work hours notice */}
          <div className="p-3.5 rounded-2xl bg-[#CFEFEC] border-2 border-[#12383A] shadow-tactile-mini flex items-center justify-between text-xs font-bold text-[#12383A]">
            <span>
              🕒 Jam Layanan Komunikasi Guru: 07.00 - 15.00 WITA. Pesan di luar jam kerja akan dibalas pada hari kerja berikutnya.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Thread List */}
            <div className="tactile-card p-4 bg-white border-2 border-[#12383A] shadow-tactile-card space-y-2">
              <span className="text-xs font-extrabold uppercase text-[#359FA0] tracking-wide block mb-2">
                Daftar Percakapan
              </span>

              {conversations.map((conv) => {
                const isSelected = conv.id === selectedConvId;
                return (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConvId(conv.id)}
                    className={`w-full p-3 rounded-2xl border-2 border-[#12383A] text-left transition-all ${
                      isSelected
                        ? 'bg-[#12383A] text-[#FFF0C5] shadow-tactile-btn'
                        : 'bg-[#FFFAE6] text-[#12383A] hover:bg-white shadow-tactile-mini'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-extrabold text-xs block">
                        {conv.parentName}
                      </span>
                      <span className="text-[10px] opacity-70">{conv.lastTime}</span>
                    </div>
                    <span className="text-[11px] font-bold block opacity-90 truncate">
                      {conv.studentName}
                    </span>
                    <p className="text-[11px] opacity-75 truncate mt-1">
                      {conv.lastMessage}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Conversation Active Pane */}
            <div className="md:col-span-2 tactile-card p-5 bg-white border-2 border-[#12383A] shadow-tactile-card flex flex-col justify-between min-h-[420px]">
              {/* Header Pane */}
              <div className="pb-3 border-b-2 border-[#12383A] flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-base text-[#12383A]">
                    {activeConv.parentName}
                  </h3>
                  <span className="text-xs text-[#12383A]/70 font-bold">
                    Orang Tua ananda {activeConv.studentName}
                  </span>
                </div>

                <button
                  onClick={() => handleWhatsAppClick('081234567890', activeConv.studentName)}
                  className="tactile-btn px-3.5 py-1.5 rounded-full bg-[#8AD6D1] text-[#12383A] text-xs font-extrabold hover:bg-[#359FA0] hover:text-white flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Hubungi via WhatsApp</span>
                </button>
              </div>

              {/* Message Bubbles */}
              <div className="space-y-3 py-4 flex-1 overflow-y-auto max-h-[260px]">
                {activeConv.messages.map((msg) => {
                  const isMe = msg.sender === 'guru';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`p-3.5 rounded-2xl border-2 border-[#12383A] max-w-[80%] text-xs font-medium shadow-tactile-mini ${
                          isMe
                            ? 'bg-[#CFEFEC] text-[#12383A]'
                            : 'bg-[#FFFAE6] text-[#12383A]'
                        }`}
                      >
                        <p>{msg.text}</p>
                      </div>
                      <span className="text-[10px] text-[#12383A]/60 font-semibold mt-1 px-1">
                        {isMe ? 'Anda' : activeConv.parentName} • {msg.time}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Quick Template Chips & Reply Input */}
              <div className="pt-3 border-t-2 border-[#12383A] space-y-2">
                <div className="flex flex-wrap gap-1.5">
                  {quickTemplates.map((tpl, i) => (
                    <button
                      type="button"
                      key={i}
                      onClick={() => setReplyText(tpl)}
                      className="px-2.5 py-1 rounded-full bg-[#FFFAE6] hover:bg-[#FFF0C5] text-[10px] font-bold text-[#12383A] border border-[#12383A]"
                    >
                      + {tpl.slice(0, 30)}...
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSendReply} className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Tulis balasan santun untuk orang tua..."
                    className="flex-1 p-2.5 rounded-2xl border-2 border-[#12383A] bg-[#FFFAE6] text-xs text-[#12383A]"
                  />
                  <button
                    type="submit"
                    className="tactile-btn px-4 py-2.5 rounded-full bg-[#FF8C52] text-white text-xs font-extrabold hover:bg-[#ff7b36] flex items-center gap-1 shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LAPORAN CAPAIAN MURID (RG18) */}
      {activeTab === 'laporan' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-[#FFFAE6] border-2 border-[#12383A] shadow-tactile-mini flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-extrabold text-base text-[#12383A]">
                Draf Laporan Capaian Semester (Berdasarkan Templat Terstruktur)
              </h3>
              <p className="text-xs text-[#12383A]/80 font-medium">
                Disusun dari level capaian konkret tanpa kecerdasan artifisial otomatis. Guru meninjau dan menerbitkan ke orang tua.
              </p>
            </div>

            <button
              onClick={() => onShowToast('Ekspor data capaian murid ke format Excel disiapkan.')}
              className="tactile-btn px-4 py-2 rounded-full bg-[#359FA0] text-white text-xs font-extrabold flex items-center gap-1.5 self-start"
            >
              <Download className="w-4 h-4" />
              <span>Ekspor Lembar Nilai</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {students.slice(0, 4).map((st) => (
              <div
                key={st.id}
                className="tactile-card p-5 bg-white border-2 border-[#12383A] shadow-tactile-card space-y-3 text-xs"
              >
                <div className="flex justify-between items-center pb-2 border-b border-[#12383A]/20">
                  <div>
                    <h4 className="font-extrabold text-sm text-[#12383A]">
                      {st.name}
                    </h4>
                    <span className="text-[11px] text-[#12383A]/70">
                      Wali: {st.parentName}
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#CFEFEC] text-[11px] font-bold border border-[#12383A]">
                    Kehadiran: {st.attendancePercent}%
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#FFFAE6] border border-[#12383A] space-y-1.5">
                  <span className="font-extrabold text-[#359FA0] text-[11px] block uppercase">
                    Draf Deskripsi Capaian Pembelajaran:
                  </span>
                  <p className="text-xs text-[#12383A] leading-relaxed">
                    Ananda <strong>{st.name}</strong> sudah menunjukkan penguasaan sangat baik dalam mengenal bunyi huruf dan membilang benda nyata. Ananda perlu dilatih lagi pada pemahaman teks kalimat panjang. Dukungan di rumah: ajak ananda membaca buku cerita bergambar 10 menit sebelum tidur.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-[#12383A]/60 font-semibold">
                    Status: Siap Diterbitkan
                  </span>
                  <button
                    onClick={() => onShowToast(`Laporan capaian ananda ${st.name} diterbitkan ke orang tua.`)}
                    className="tactile-btn px-4 py-1.5 rounded-full bg-[#FF8C52] text-white text-xs font-extrabold"
                  >
                    Terbitkan ke Orang Tua
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
