import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Users,
  Compass,
  FileText,
  Award,
  BookOpen,
  Heart,
  MessageSquare,
  FolderCheck,
  Lock,
} from 'lucide-react';
import { HomeroomTeacher, Student, AttendanceRecord } from '../../../types';
import { ModulHariIni } from './ModulHariIni';
import { ModulKelasAbsen } from './ModulKelasAbsen';
import { ModulPetaKurikulum } from './ModulPetaKurikulum';
import { ModulRencanaJurnal } from './ModulRencanaJurnal';
import { ModulAsesmenNilai } from './ModulAsesmenNilai';
import { ModulLiterasiNumerasi } from './ModulLiterasiNumerasi';
import { ModulKarakterProjek } from './ModulKarakterProjek';
import { ModulPenghubungLaporan } from './ModulPenghubungLaporan';
import { ModulBerkasSupervisi } from './ModulBerkasSupervisi';
import { ModulCatatanPribadi } from './ModulCatatanPribadi';
import { DataContohBadge } from '../../../components/DataContohBadge';

interface RuangPribadiMainProps {
  teacher: HomeroomTeacher;
  students: Student[];
  attendanceRecords: AttendanceRecord[];
  onBackToRuangGuru: () => void;
  onShowToast: (msg: string) => void;
}

export const RuangPribadiMain: React.FC<RuangPribadiMainProps> = ({
  teacher,
  students,
  attendanceRecords,
  onBackToRuangGuru,
  onShowToast,
}) => {
  const [activeModule, setActiveModule] = useState<string>('hari_ini');

  const navModules = [
    { key: 'hari_ini', label: 'Hari Ini', icon: Calendar },
    { key: 'kelas', label: 'Kelas Saya', icon: Users },
    { key: 'kurikulum', label: 'Peta Kurikulum', icon: Compass },
    { key: 'rencana', label: 'Rencana & Jurnal', icon: FileText },
    { key: 'asesmen', label: 'Asesmen & Nilai', icon: Award },
    { key: 'literasi', label: 'Literasi & Numerasi', icon: BookOpen },
    { key: 'karakter', label: 'Karakter & Projek', icon: Heart },
    { key: 'penghubung', label: 'Ruang Penghubung', icon: MessageSquare },
    { key: 'berkas', label: 'Berkas & Supervisi', icon: FolderCheck },
    { key: 'catatan', label: 'Catatan Pribadi', icon: Lock },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Top Bar Navigation: Kembali & Module Tabs */}
      <div className="tactile-card p-4 bg-[#FFF0C5] border-2 border-[#12383A] shadow-tactile-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={activeModule === 'hari_ini' ? onBackToRuangGuru : () => setActiveModule('hari_ini')}
            className="tactile-btn flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white text-xs font-extrabold text-[#12383A] hover:bg-[#8AD6D1] shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{activeModule === 'hari_ini' ? 'Kembali ke Ruang Guru' : 'Kembali ke Hari Ini'}</span>
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">{teacher.sticker}</span>
              <span className="font-extrabold text-sm sm:text-base text-[#12383A]">
                Ruang Pribadi {teacher.name}
              </span>
              <DataContohBadge />
            </div>
            <span className="text-[11px] font-bold text-[#12383A]/70 block">
              Kelas {teacher.grade} (Fase {teacher.phase}) • {teacher.roomTitle}
            </span>
          </div>
        </div>

        {/* Quick Nav Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 max-w-full">
          {navModules.map((m) => {
            const Icon = m.icon;
            const isActive = activeModule === m.key;
            return (
              <button
                key={m.key}
                onClick={() => setActiveModule(m.key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold border-2 border-[#12383A] whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#12383A] text-[#FFF0C5] shadow-tactile-mini'
                    : 'bg-white text-[#12383A] hover:bg-[#FFFAE6]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Module Content */}
      <div className="transition-all">
        {activeModule === 'hari_ini' && (
          <ModulHariIni
            teacher={teacher}
            attendanceRecords={attendanceRecords}
            onOpenModule={(key) => setActiveModule(key)}
            onQuickAttendance={() => setActiveModule('kelas')}
            onQuickJournal={() => setActiveModule('rencana')}
            onQuickAssessment={() => setActiveModule('asesmen')}
            onShowToast={onShowToast}
          />
        )}

        {activeModule === 'kelas' && (
          <ModulKelasAbsen
            teacher={teacher}
            students={students}
            onShowToast={onShowToast}
          />
        )}

        {activeModule === 'kurikulum' && (
          <ModulPetaKurikulum
            teacher={teacher}
            onShowToast={onShowToast}
          />
        )}

        {activeModule === 'rencana' && (
          <ModulRencanaJurnal
            teacher={teacher}
            onShowToast={onShowToast}
          />
        )}

        {activeModule === 'asesmen' && (
          <ModulAsesmenNilai
            teacher={teacher}
            students={students}
            onShowToast={onShowToast}
          />
        )}

        {activeModule === 'literasi' && (
          <ModulLiterasiNumerasi
            teacher={teacher}
            students={students}
            onShowToast={onShowToast}
          />
        )}

        {activeModule === 'karakter' && (
          <ModulKarakterProjek
            teacher={teacher}
            students={students}
            onShowToast={onShowToast}
          />
        )}

        {activeModule === 'penghubung' && (
          <ModulPenghubungLaporan
            teacher={teacher}
            students={students}
            onShowToast={onShowToast}
          />
        )}

        {activeModule === 'berkas' && (
          <ModulBerkasSupervisi
            teacher={teacher}
            onShowToast={onShowToast}
          />
        )}

        {activeModule === 'catatan' && (
          <ModulCatatanPribadi
            teacher={teacher}
            onShowToast={onShowToast}
          />
        )}
      </div>
    </div>
  );
};
