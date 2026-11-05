/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { RoleType, GradeLevel } from './types';
import {
  HOMEROOM_TEACHERS,
  INITIAL_STUDENTS_BY_GRADE,
  INITIAL_ATTENDANCE,
  PRINCIPAL_INFO,
} from './data/mockData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileNav } from './components/MobileNav';
import { Toast } from './components/Toast';
import { RoleSwitcherModal } from './components/RoleSwitcherModal';

import { BerandaUmum } from './views/BerandaUmum';
import { RuangGuruHome } from './views/RuangGuru/RuangGuruHome';
import { RuangPribadiMain } from './views/RuangGuru/RuangPribadi/RuangPribadiMain';
import { RuangMuridView } from './views/RuangMurid/RuangMuridView';
import { RuangOrangTuaView } from './views/RuangOrangTua/RuangOrangTuaView';
import { RuangKepalaSekolahView } from './views/RuangKepalaSekolah/RuangKepalaSekolahView';

export default function App() {
  // Navigation & Role states
  const [activeView, setActiveView] = useState<string>('guru');
  const [currentRole, setCurrentRole] = useState<RoleType>('guru');
  const [currentTeacherGrade, setCurrentTeacherGrade] = useState<GradeLevel>(1);
  const [activeStudentName, setActiveStudentName] = useState<string>('Aisyah');
  const [isRoleModalOpen, setIsRoleModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Data states
  const [studentsByGrade] = useState(INITIAL_STUDENTS_BY_GRADE);
  const [attendanceRecords] = useState(INITIAL_ATTENDANCE);

  // Active teacher
  const currentTeacher =
    HOMEROOM_TEACHERS.find((t) => t.grade === currentTeacherGrade) || HOMEROOM_TEACHERS[0];
  const currentStudents = studentsByGrade[currentTeacherGrade] || studentsByGrade[1];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleSelectRole = (
    role: RoleType,
    grade?: GradeLevel,
    studentName?: string
  ) => {
    setCurrentRole(role);
    if (grade) setCurrentTeacherGrade(grade);
    if (studentName) setActiveStudentName(studentName);

    if (role === 'kepala_sekolah') {
      setActiveView('kepala_sekolah');
      showToast(`Beralih ke Ruang ${PRINCIPAL_INFO.name}`);
    } else if (role === 'guru') {
      const t = HOMEROOM_TEACHERS.find((x) => x.grade === (grade || 1));
      setActiveView('ruang_pribadi');
      showToast(`Beralih ke ${t?.name || 'Ibu Guru'} (Kelas ${grade || 1})`);
    } else if (role === 'murid') {
      setActiveView('murid');
      showToast(`Beralih ke Ruang Murid (${studentName || 'Aisyah'})`);
    } else if (role === 'orang_tua') {
      setActiveView('orang_tua');
      showToast('Beralih ke Ruang Orang Tua (Ibu Rina)');
    }
  };

  // Determine label for top bar
  const activeProfileName =
    currentRole === 'kepala_sekolah'
      ? PRINCIPAL_INFO.name
      : currentRole === 'guru'
      ? currentTeacher.name
      : currentRole === 'murid'
      ? activeStudentName
      : 'Ibu Rina (Orang Tua)';

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF0C5] text-[#12383A] font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Role Switcher Modal */}
      <RoleSwitcherModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        currentRole={currentRole}
        currentGrade={currentTeacherGrade}
        onSelectRole={handleSelectRole}
        activeStudent={activeStudentName}
      />

      {/* Header */}
      <Header
        currentRole={currentRole}
        currentTeacherGrade={currentTeacherGrade}
        activeView={activeView}
        onNavigate={(view) => setActiveView(view)}
        onOpenRoleSwitcher={() => setIsRoleModalOpen(true)}
        activeProfileName={activeProfileName}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-6 pt-6 pb-20 lg:pb-10">
        {activeView === 'beranda' && (
          <BerandaUmum
            onNavigateToRoom={(view) => {
              setActiveView(view);
              if (view === 'guru') setCurrentRole('guru');
              if (view === 'kepala_sekolah') setCurrentRole('kepala_sekolah');
              if (view === 'murid') setCurrentRole('murid');
              if (view === 'orang_tua') setCurrentRole('orang_tua');
            }}
            onOpenRoleSwitcher={() => setIsRoleModalOpen(true)}
          />
        )}

        {activeView === 'guru' && (
          <RuangGuruHome
            currentTeacher={currentTeacher}
            onOpenRuangPribadi={(grade) => {
              if (grade) setCurrentTeacherGrade(grade);
              setActiveView('ruang_pribadi');
            }}
            onSelectTeacherGrade={(grade) => {
              setCurrentTeacherGrade(grade);
              setActiveView('ruang_pribadi');
            }}
            onShowToast={showToast}
          />
        )}

        {activeView === 'ruang_pribadi' && (
          <RuangPribadiMain
            teacher={currentTeacher}
            students={currentStudents}
            attendanceRecords={attendanceRecords}
            onBackToRuangGuru={() => setActiveView('guru')}
            onShowToast={showToast}
          />
        )}

        {activeView === 'murid' && (
          <RuangMuridView
            activeStudentName={activeStudentName}
            onSelectStudent={(name) => setActiveStudentName(name)}
            onShowToast={showToast}
          />
        )}

        {activeView === 'orang_tua' && (
          <RuangOrangTuaView onShowToast={showToast} />
        )}

        {activeView === 'kepala_sekolah' && (
          <RuangKepalaSekolahView
            onShowToast={showToast}
            onOpenTeacherRoom={(grade) => {
              setCurrentTeacherGrade(grade);
              setCurrentRole('guru');
              setActiveView('ruang_pribadi');
              showToast(`Membuka Ruang Kelas ${grade} untuk peninjauan.`);
            }}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileNav
        activeView={activeView}
        onNavigate={(view) => {
          setActiveView(view);
          if (view === 'guru') setCurrentRole('guru');
          if (view === 'kepala_sekolah') setCurrentRole('kepala_sekolah');
          if (view === 'murid') setCurrentRole('murid');
          if (view === 'orang_tua') setCurrentRole('orang_tua');
        }}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
