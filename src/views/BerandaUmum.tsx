import React, { useState } from 'react';
import { ArrowRight, Sparkles, BookOpen, Users, Smile, ShieldCheck, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { DataContohBadge } from '../components/DataContohBadge';

interface BerandaUmumProps {
  onNavigateToRoom: (view: string) => void;
  onOpenRoleSwitcher: () => void;
}

export const BerandaUmum: React.FC<BerandaUmumProps> = ({
  onNavigateToRoom,
  onOpenRoleSwitcher,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqList = [
    {
      q: 'Apa itu SI STIR HEBAT?',
      a: 'SI STIR HEBAT adalah Sistem Informasi Supervisi Terintegrasi, Ruang Harmonis Edukatif, Bersama Wujudkan Anak Indonesia Hebat di SDN 03 Wonosari. Platform ini memadukan empat ruang kerja khusus: Kepala Sekolah, Guru, Murid, dan Orang Tua.',
    },
    {
      q: 'Bagaimana pembagian ruang pribadi untuk enam wali kelas?',
      a: 'Masing masing wali kelas (Kelas 1 sampai 6) memiliki Ruang Pribadi yang menyesuaikan diri dengan fase kurikulum (Fase A, B, C) serta ritme belajar murid pada jenjang usianya.',
    },
    {
      q: 'Apakah data catatan pribadi guru dapat dilihat oleh kepala sekolah?',
      a: 'Tidak. Lapis visibilitas 1 (Hanya Anda) memastikan Catatan Pribadi dan draf modul ajar guru terlindungi sepenuhnya dan tidak dapat dibaca oleh pengguna lain.',
    },
    {
      q: 'Bagaimana cara orang tua melaporkan anak yang tidak masuk sekolah?',
      a: 'Orang tua dapat menggunakan formulir "Lapor Anak Tidak Masuk" pada Ruang Orang Tua. Laporan akan tampil dengan status "Diajukan" di Absen Cepat guru, dan menjadi catatan final setelah dikonfirmasi.',
    },
  ];

  return (
    <div className="space-y-12 animate-fade-in pb-12">
      {/* Hero Banner Neo-Tactile */}
      <div className="tactile-card-lg p-6 sm:p-10 bg-[#FFFAE6] border-2 border-[#12383A] shadow-tactile-card relative overflow-hidden">
        <div className="ribbon-4-strip -mt-6 sm:-mt-10 -mx-6 sm:-mx-10 mb-8">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className="max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3.5 py-1 rounded-full bg-[#359FA0] text-white border-2 border-[#12383A] text-xs font-extrabold shadow-tactile-mini uppercase tracking-wider">
              SDN 03 Wonosari • Boalemo Gorontalo
            </span>
            <span className="px-3 py-1 rounded-full bg-[#FFF0C5] text-[#12383A] border-2 border-[#12383A] text-xs font-extrabold shadow-tactile-mini uppercase">
              Tumbuh Bersama
            </span>
            <DataContohBadge />
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#12383A] tracking-tight leading-tight">
            SI STIR HEBAT
          </h1>
          <p className="text-base sm:text-lg text-[#12383A]/90 font-bold leading-relaxed">
            Sistem Informasi Supervisi Terintegrasi, Ruang Harmonis Edukatif, Bersama Wujudkan Anak Indonesia Hebat.
          </p>
          <p className="text-sm sm:text-base text-[#12383A]/80 font-medium leading-relaxed">
            Satu ekosistem terpadu yang memadukan supervisi akademik pimpinan, ruang kerja privat 6 wali kelas, pembiasaan 7 kebiasaan berkarakter untuk murid, dan pendampingan santun orang tua di rumah.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateToRoom('guru')}
              className="tactile-btn px-6 py-3.5 rounded-full bg-[#FF8C52] text-white font-extrabold text-sm sm:text-base hover:bg-[#ff7b36] flex items-center gap-2 shadow-tactile-btn"
            >
              <span>Masuk Ruang Guru</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={onOpenRoleSwitcher}
              className="tactile-btn px-5 py-3.5 rounded-full bg-white text-[#12383A] font-extrabold text-sm sm:text-base hover:bg-[#8AD6D1] flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#359FA0]" />
              <span>Ganti Akun Demo</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 PINTU GERBANG RUANG SEKOLAH (ROLE GATE CARDS) */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12383A]">
            Empat Ruang Kerja Terintegrasi
          </h2>
          <p className="text-xs sm:text-sm text-[#12383A]/80 font-medium">
            Setiap pemangku kepentingan memiliki ruang yang dirancang khusus sesuai perannya di sekolah.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Ruang Kepala Sekolah */}
          <div className="tactile-card p-6 bg-white border-2 border-[#12383A] shadow-tactile-card flex flex-col justify-between hover:-translate-y-1 transition-all">
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-[#CFEFEC] border-2 border-[#12383A] flex items-center justify-center text-3xl shadow-tactile-mini">
                🏛️
              </div>
              <h3 className="font-extrabold text-xl text-[#12383A]">
                Ruang Kepala Sekolah
              </h3>
              <p className="text-xs text-[#12383A]/80 font-medium leading-relaxed">
                Supervisi terpadu 4 tahap, persetujuan modul ajar, direktori 6 wali kelas, dan arsip dokumen resmi sekolah (KSP, RKT, RKAS).
              </p>
            </div>
            <button
              onClick={() => onNavigateToRoom('kepala_sekolah')}
              className="tactile-btn mt-6 w-full py-2.5 rounded-full bg-[#12383A] text-[#FFF0C5] text-xs font-extrabold hover:bg-[#205558] flex items-center justify-center gap-1.5"
            >
              <span>Buka Ruang KS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: Ruang Guru */}
          <div className="tactile-card p-6 bg-[#FFFAE6] border-2 border-[#12383A] shadow-tactile-card flex flex-col justify-between hover:-translate-y-1 transition-all ring-2 ring-[#FF8C52]">
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-[#8AD6D1] border-2 border-[#12383A] flex items-center justify-center text-3xl shadow-tactile-mini">
                🌱
              </div>
              <div>
                <span className="px-2 py-0.5 rounded-full bg-[#FF8C52] text-white text-[10px] font-extrabold uppercase">
                  Fokus Utama
                </span>
                <h3 className="font-extrabold text-xl text-[#12383A] mt-1">
                  Ruang Guru
                </h3>
              </div>
              <p className="text-xs text-[#12383A]/80 font-medium leading-relaxed">
                Ruang Pribadi 6 wali kelas (Fase A, B, C): Absen cepat 30 murid kurang dari 1 menit, jurnal harian, peta kurikulum, dan asesmen 4 level.
              </p>
            </div>
            <button
              onClick={() => onNavigateToRoom('guru')}
              className="tactile-btn mt-6 w-full py-2.5 rounded-full bg-[#FF8C52] text-white text-xs font-extrabold hover:bg-[#ff7b36] flex items-center justify-center gap-1.5 shadow-tactile-btn"
            >
              <span>Buka Ruang Guru</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 3: Ruang Murid */}
          <div className="tactile-card p-6 bg-white border-2 border-[#12383A] shadow-tactile-card flex flex-col justify-between hover:-translate-y-1 transition-all">
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-[#CDEFD0] border-2 border-[#12383A] flex items-center justify-center text-3xl shadow-tactile-mini">
                🎒
              </div>
              <h3 className="font-extrabold text-xl text-[#12383A]">
                Ruang Murid
              </h3>
              <p className="text-xs text-[#12383A]/80 font-medium leading-relaxed">
                Antarmuka ceria ramah anak: checklist 7 Kebiasaan Anak Indonesia Hebat bertabur bintang, tugas sekolah aktif, jadwal, dan apresiasi karya.
              </p>
            </div>
            <button
              onClick={() => onNavigateToRoom('murid')}
              className="tactile-btn mt-6 w-full py-2.5 rounded-full bg-[#359FA0] text-white text-xs font-extrabold hover:bg-[#2b8384] flex items-center justify-center gap-1.5"
            >
              <span>Buka Ruang Murid</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 4: Ruang Orang Tua */}
          <div className="tactile-card p-6 bg-white border-2 border-[#12383A] shadow-tactile-card flex flex-col justify-between hover:-translate-y-1 transition-all">
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-[#FFF0C5] border-2 border-[#12383A] flex items-center justify-center text-3xl shadow-tactile-mini">
                🏡
              </div>
              <h3 className="font-extrabold text-xl text-[#12383A]">
                Ruang Orang Tua
              </h3>
              <p className="text-xs text-[#12383A]/80 font-medium leading-relaxed">
                Tenang dan mengutamakan keterbacaan: 4 kartu rangkuman anak, formulir Lapor Anak Tidak Masuk, Ceritakan dari Rumah, dan chat dengan guru.
              </p>
            </div>
            <button
              onClick={() => onNavigateToRoom('orang_tua')}
              className="tactile-btn mt-6 w-full py-2.5 rounded-full bg-[#8AD6D1] text-[#12383A] text-xs font-extrabold hover:bg-[#359FA0] hover:text-white flex items-center justify-center gap-1.5"
            >
              <span>Buka Ruang Ortu</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* PRINSIP PEMBELAJARAN MENDALAM & 7 KEBIASAAN */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="tactile-card p-6 bg-white border-2 border-[#12383A] shadow-tactile-card space-y-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#359FA0]" />
            <h3 className="font-extrabold text-lg text-[#12383A]">
              Prinsip Pembelajaran Mendalam
            </h3>
          </div>
          <p className="text-xs text-[#12383A]/80 font-medium leading-relaxed">
            Sesuai Permendikdasmen Nomor 13 Tahun 2025, pembelajaran mendalam dirancang bermakna, holistik, dan otentik dengan memadukan empat pilar utama:
          </p>
          <div className="grid grid-cols-2 gap-2 pt-1 text-xs font-extrabold">
            <div className="p-3 rounded-xl bg-[#FFFAE6] border border-[#12383A]">
              🧠 Olah Pikir (Nalar Kritis)
            </div>
            <div className="p-3 rounded-xl bg-[#CFEFEC] border border-[#12383A]">
              ❤️ Olah Hati (Iman & Adab)
            </div>
            <div className="p-3 rounded-xl bg-[#FFF0C5] border border-[#12383A]">
              🎨 Olah Rasa (Kreativitas & Seni)
            </div>
            <div className="p-3 rounded-xl bg-[#CDEFD0] border border-[#12383A]">
              🏃 Olah Raga (Kesehatan Fisik)
            </div>
          </div>
        </div>

        <div className="tactile-card p-6 bg-white border-2 border-[#12383A] shadow-tactile-card space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#FF8C52]" />
            <h3 className="font-extrabold text-lg text-[#12383A]">
              7 Kebiasaan Anak Indonesia Hebat
            </h3>
          </div>
          <p className="text-xs text-[#12383A]/80 font-medium leading-relaxed">
            Gerakan kokurikuler pembiasaan harian yang dipantau positif bersama antara sekolah dan rumah:
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {[
              '1. Bangun pagi',
              '2. Beribadah',
              '3. Berolahraga',
              '4. Makan sehat & bergizi',
              '5. Gemar belajar',
              '6. Bermasyarakat',
              '7. Tidur cepat',
            ].map((hb, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full bg-[#FFFAE6] text-[#12383A] font-bold text-xs border border-[#12383A]"
              >
                {hb}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ AKORDEON BANTUAN */}
      <div className="tactile-card p-6 sm:p-8 bg-white border-2 border-[#12383A] shadow-tactile-card space-y-5">
        <div>
          <h3 className="font-extrabold text-xl text-[#12383A]">
            Tanya Jawab Seputar SI STIR HEBAT
          </h3>
          <p className="text-xs sm:text-sm text-[#12383A]/80 font-medium mt-0.5">
            Informasi penting terkait sistem dan operasional SDN 03 Wonosari.
          </p>
        </div>

        <div className="space-y-3">
          {faqList.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#FFFAE6] border-2 border-[#12383A] shadow-tactile-mini cursor-pointer transition-all"
                onClick={() => toggleFaq(idx)}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#359FA0] text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <h4 className="font-extrabold text-sm sm:text-base text-[#12383A]">
                      {faq.q}
                    </h4>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#12383A] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#12383A] shrink-0" />
                  )}
                </div>

                {isOpen && (
                  <p className="mt-3 pl-10 text-xs sm:text-sm text-[#12383A]/85 font-medium leading-relaxed border-t border-[#12383A]/20 pt-2">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
