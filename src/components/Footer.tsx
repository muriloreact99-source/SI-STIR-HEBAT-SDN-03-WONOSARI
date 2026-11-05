import React from 'react';
import { Mail, MapPin } from 'lucide-react';
import { PRINCIPAL_INFO } from '../data/mockData';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 bg-[#12383A] text-[#FFF0C5] border-t-2 border-[#12383A] pt-12 pb-24 lg:pb-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-[#359FA0]/40">
          {/* Identity */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl font-extrabold text-[#FFF0C5]">SI STIR HEBAT</span>
              <span className="px-2 py-0.5 rounded-full bg-[#FFF0C5] text-[#12383A] font-extrabold text-[10px] uppercase">
                Tumbuh Bersama
              </span>
            </div>
            <p className="text-sm text-[#FFF0C5]/90 font-medium leading-relaxed mb-4">
              Sistem Informasi Supervisi Terintegrasi, Ruang Harmonis Edukatif, Bersama Wujudkan Anak Indonesia Hebat.
            </p>
            <p className="text-sm font-bold text-[#FF8C52]">
              SI STIR HEBAT, tumbuh bersama setiap hari.
            </p>
          </div>

          {/* School details */}
          <div>
            <h4 className="font-extrabold text-base text-[#8AD6D1] mb-3">Satuan Pendidikan</h4>
            <p className="text-sm font-bold mb-1">SDN 03 Wonosari</p>
            <p className="text-xs text-[#FFF0C5]/80 mb-3">NPSN: {PRINCIPAL_INFO.npsn}</p>
            <div className="flex items-start gap-2 text-xs text-[#FFF0C5]/80 mb-2">
              <MapPin className="w-4 h-4 shrink-0 text-[#FF8C52] mt-0.5" />
              <span>{PRINCIPAL_INFO.address}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#FFF0C5]/80">
              <Mail className="w-4 h-4 shrink-0 text-[#8AD6D1]" />
              <a href={`mailto:${PRINCIPAL_INFO.email}`} className="hover:underline">
                {PRINCIPAL_INFO.email}
              </a>
            </div>
          </div>

          {/* Accreditation & Values */}
          <div>
            <h4 className="font-extrabold text-base text-[#8AD6D1] mb-3">Nilai dan Semangat</h4>
            <div className="inline-block p-4 rounded-2xl bg-[#163A3D] border-2 border-[#8AD6D1] shadow-tactile-mini mb-3">
              <span className="block text-xs uppercase font-extrabold text-[#FF8C52] tracking-wider mb-1">
                Karakter Utama
              </span>
              <span className="font-extrabold text-sm text-[#FFF0C5]">
                Pendidikan Berkarakter dan Terbuka
              </span>
            </div>
            <p className="text-xs text-[#FFF0C5]/70 leading-relaxed">
              Menerapkan 7 Kebiasaan Anak Indonesia Hebat dan prinsip Pembelajaran Mendalam olah pikir, olah hati, olah rasa, dan olah raga.
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FFF0C5]/70 font-medium">
          <p>© 2026 SDN 03 Wonosari Boalemo Gorontalo. Hak cipta dilindungi.</p>
          <p>Kepala Sekolah: {PRINCIPAL_INFO.name}</p>
        </div>
      </div>
    </footer>
  );
};
