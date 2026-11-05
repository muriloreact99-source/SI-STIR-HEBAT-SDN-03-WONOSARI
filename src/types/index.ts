/**
 * SI STIR HEBAT - Type Definitions
 * SDN 03 Wonosari, Boalemo, Gorontalo (NPSN 40500185)
 */

export type RoleType = 'kepala_sekolah' | 'guru' | 'murid' | 'orang_tua' | 'admin';

export type GradeLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type PhaseType = 'A' | 'B' | 'C';

export type AttendanceStatus = 'Hadir' | 'Sakit' | 'Izin' | 'Alpa' | 'Terlambat' | 'Dispensasi';

export type TaskStatus = 'Belum dikerjakan' | 'Sudah dikirim' | 'Sudah diperiksa' | 'Perlu diperbaiki';

export type ModuleStatus = 'Draf' | 'Diajukan' | 'Disetujui' | 'Perlu revisi';

export type AssessmentKind = 'diagnostik' | 'formatif' | 'sumatif';

export type AchievementLevel = 'perlu_bimbingan' | 'mulai_terlihat' | 'sesuai_harapan' | 'sangat_baik';

export interface HomeroomTeacher {
  id: string;
  name: string; // e.g. "Ibu Darmiati, S.Pd"
  shortName: string; // e.g. "Ibu Darmiati"
  username: string; // e.g. "darmiati"
  grade: GradeLevel;
  phase: PhaseType;
  sticker: string; // e.g. "🌱"
  roomTitle: string; // e.g. "Mulai Sekolah dengan Gembira"
  mainPita: string; // e.g. "Membaca permulaan"
  displayMode: 'low_grade' | 'standard'; // 'low_grade' for Kelas 1 and 2
  weeklyPriorities: string[];
  sampleProject: string;
  projectTheme: string;
  highlightedMetrics: string[];
}

export interface Student {
  id: string;
  name: string;
  grade: GradeLevel;
  gender: 'L' | 'P';
  parentName: string;
  parentPhone: string;
  attendancePercent: number;
  literacyLevel: number;
  numeracyLevel: number;
  habitsStreak: number;
  notesCount: number;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  grade: GradeLevel;
  date: string;
  status: AttendanceStatus;
  note?: string;
  isParentReport?: boolean;
  parentReportConfirmed?: boolean;
  isUnsentDraft?: boolean;
}

export interface LearningObjective {
  id: string;
  code: string;
  subject: string;
  grade: GradeLevel;
  semester: 1 | 2;
  text: string;
  status: 'belum_dimulai' | 'sedang_berjalan' | 'tuntas';
  isCustom?: boolean; // created by teacher
  kktp?: string; // kriteria ketercapaian
  studentsNeedingSupport?: string[];
}

export interface LearningModule {
  id: string;
  title: string;
  subject: string;
  grade: GradeLevel;
  semester: 1 | 2;
  allocationHours: string;
  targetObjectives: string[];
  graduateDimensions: string[];
  status: ModuleStatus;
  version: number;
  reviewNote?: string;
  submittedAt?: string;
  approvedAt?: string;
  experiences: {
    memahami: string;
    mengaplikasi: string;
    merefleksi: string;
  };
  assessmentPlan: string;
}

export interface TeacherJournal {
  id: string;
  date: string;
  subject: string;
  grade: GradeLevel;
  objectiveCode: string;
  workedWell: string;
  toChange: string;
  engagement: 'sangat_aktif' | 'aktif' | 'perlu_dipancing';
  submittedToPrincipal: boolean;
}

export interface AssessmentItem {
  id: string;
  title: string;
  kind: AssessmentKind;
  subject: string;
  grade: GradeLevel;
  objectiveCode: string;
  maxScore?: number;
  isPublished: boolean;
  publishedAt?: string;
  results: {
    studentId: string;
    studentName: string;
    score?: number;
    level: AchievementLevel;
    notes?: string;
  }[];
}

export interface LearningGroup {
  id: string;
  name: string;
  type: 'dukungan' | 'pengayaan' | 'campuran';
  grade: GradeLevel;
  targetObjective: string;
  studentNames: string[];
  plan: string;
  recheckDate: string;
  status: 'aktif' | 'selesai';
}

export interface HabitDefinition {
  id: number;
  name: string;
  dimension: string;
  icon: string;
  description: string;
}

export interface StudentHabitLog {
  habitId: number;
  completed: boolean;
  date: string;
}

export interface StudentTask {
  id: string;
  title: string;
  subject: string;
  grade: GradeLevel;
  dueDate: string;
  instructions: string;
  status: TaskStatus;
  feedback?: string;
  submissionDate?: string;
}

export interface CocurricularProject {
  id: string;
  title: string;
  theme: string;
  grade: GradeLevel;
  drivingQuestion: string;
  dimensions: string[];
  startDate: string;
  endDate: string;
  stages: {
    name: string;
    description: string;
    completed: boolean;
  }[];
  partnerTeacher?: string; // for collaborative projects
}

export interface StudentHighlight {
  id: string;
  studentName: string;
  grade: GradeLevel;
  type: 'karya' | 'kemajuan' | 'pesan';
  title: string;
  content: string;
  date: string;
}

export interface ParentConversation {
  id: string;
  parentName: string;
  studentName: string;
  grade: GradeLevel;
  lastMessage: string;
  lastTime: string;
  unread: boolean;
  messages: {
    id: string;
    sender: 'guru' | 'orang_tua';
    text: string;
    time: string;
  }[];
}

export interface AbsenceReport {
  id: string;
  studentName: string;
  grade: GradeLevel;
  reason: 'Sakit' | 'Izin' | 'Lainnya';
  date: string;
  note: string;
  doctorLetterName?: string;
  status: 'Diajukan' | 'Dikonfirmasi';
}

export interface PrivateNote {
  id: string;
  title: string;
  body: string;
  category: 'ide_mengajar' | 'pengingat' | 'refleksi' | 'bahan_rapat';
  updatedAt: string;
}

export interface DocumentChecklistItem {
  id: string;
  name: string;
  sourceModule?: string;
  status: ModuleStatus;
  updatedAt: string;
}

export interface SupervisionStage {
  stage: 'Pra Observasi' | 'Observasi' | 'Pasca Observasi' | 'Tindak Lanjut';
  status: 'Draf' | 'Diajukan' | 'Disetujui' | 'Perlu revisi';
  date: string;
  notes: string;
  strengths: string;
  recommendations: string;
}
