/**
 * Mock Data for SI STIR HEBAT
 * SDN 03 Wonosari, NPSN 40500185, Boalemo, Gorontalo
 * All mock data strictly carries "Data contoh" marker
 */

import {
  HomeroomTeacher,
  Student,
  AttendanceRecord,
  LearningObjective,
  LearningModule,
  TeacherJournal,
  AssessmentItem,
  LearningGroup,
  HabitDefinition,
  StudentTask,
  CocurricularProject,
  StudentHighlight,
  ParentConversation,
  AbsenceReport,
  PrivateNote,
  DocumentChecklistItem,
  SupervisionStage,
} from '../types';

export const PRINCIPAL_INFO = {
  name: 'Ibu Khoyum Supardi, S.Pd.SD, M.Pd.',
  title: 'Kepala Sekolah SDN 03 Wonosari',
  npsn: '40500185',
  address: 'Jln. Lingkar, Makmur, Wonosari, Kabupaten Boalemo, Gorontalo 96262',
  email: 'sdn03wonosari@sekolah.id',
};

export const HOMEROOM_TEACHERS: HomeroomTeacher[] = [
  {
    id: 't-1',
    name: 'Ibu Darmiati, S.Pd',
    shortName: 'Ibu Darmiati',
    username: 'darmiati',
    grade: 1,
    phase: 'A',
    sticker: '🌱',
    roomTitle: 'Mulai Sekolah dengan Gembira',
    mainPita: 'Membaca permulaan',
    displayMode: 'low_grade',
    weeklyPriorities: [
      'Isi asesmen diagnostik awal mengenal huruf dan membilang 10',
      'Atur Pita Literasi untuk semua murid',
      'Kirim sapaan perkenalan kepada orang tua siswa baru',
    ],
    sampleProject: 'Kebun Kacang Hijau Kelas 1',
    projectTheme: 'Aku Bisa Sendiri',
    highlightedMetrics: [
      'Murid naik minimal satu level baca dalam 8 minggu: 78%',
      'Kehadiran bulan pertama: 96%',
    ],
  },
  {
    id: 't-2',
    name: 'Ibu Fadilatul Jannah Samsuru, S.Pd',
    shortName: 'Ibu Fadilatul',
    username: 'fadilatul',
    grade: 2,
    phase: 'A',
    sticker: '🌿',
    roomTitle: 'Lancar Membaca, Berani Berhitung',
    mainPita: 'Lancar membaca, Kesiapan Fase B',
    displayMode: 'low_grade',
    weeklyPriorities: [
      'Ulangi diagnostik membaca dan berhitung awal semester',
      'Susun Kelompok Dukungan untuk murid yang belum lancar membaca',
      'Mulai pantau Pita Kesiapan Fase B semester ini',
    ],
    sampleProject: 'Pasar Mini Kelas',
    projectTheme: 'Warung Kita',
    highlightedMetrics: [
      'Persentase murid siap Fase B: 83%',
      'Kelompok dukungan yang selesai: 2 kelompok',
    ],
  },
  {
    id: 't-3',
    name: 'Ibu Trin Sugiarti, S.Pd',
    shortName: 'Ibu Trin',
    username: 'trin',
    grade: 3,
    phase: 'B',
    sticker: '🌼',
    roomTitle: 'Membaca untuk Belajar',
    mainPita: 'Membaca teks informasi',
    displayMode: 'standard',
    weeklyPriorities: [
      'Diagnostik membaca teks informasi sebelum materi IPAS',
      'Siapkan modul IPAS pertama makhluk hidup di sekitar',
      'Atur kriteria ketercapaian KKTP untuk tiga TP awal',
    ],
    sampleProject: 'Dari Jagung ke Piring Kita',
    projectTheme: 'Makanan Sehat dari Kebun Kita',
    highlightedMetrics: [
      'Pertumbuhan literasi teks informasi: 75%',
      'Cakupan TP IPAS: 4 dari 8 tuntas',
    ],
  },
  {
    id: 't-4',
    name: 'Ibu Waode Suriani, S.Pd',
    shortName: 'Ibu Waode',
    username: 'waode',
    grade: 4,
    phase: 'B',
    sticker: '🌻',
    roomTitle: 'Menyelidiki dan Menjelaskan',
    mainPita: 'Gagasan pokok dan pecahan',
    displayMode: 'standard',
    weeklyPriorities: [
      'Diagnostik miskonsepsi pecahan dasar',
      'Rancang projek mini sampah di sekolah',
      'Jadwalkan presentasi laporan pengamatan murid',
    ],
    sampleProject: 'Sampah di Sekolah Kita',
    projectTheme: 'Sekolah Bersih Kita',
    highlightedMetrics: [
      'Murid mencapai TP pecahan: 80%',
      'Ketepatan tindak lanjut perlu perhatian: 100%',
    ],
  },
  {
    id: 't-5',
    name: 'Ibu Ima Kusmawati, S.Pd',
    shortName: 'Ibu Ima',
    username: 'ima',
    grade: 5,
    phase: 'C',
    sticker: '🌳',
    roomTitle: 'Bernalar dan Bertanya',
    mainPita: 'Menyimpulkan, desimal dan rasio',
    displayMode: 'standard',
    weeklyPriorities: [
      'Diagnostik prasyarat pecahan sebelum ke desimal',
      'Cek ketersediaan modul pilihan Koding dan KA',
      'Rancang projek pencatatan data kebun sekolah',
    ],
    sampleProject: 'Data Panen Kebun Sekolah',
    projectTheme: 'Hemat Air untuk Kebun',
    highlightedMetrics: [
      'Pertumbuhan numerasi desimal: 70%',
      'Keterlibatan kebiasaan gemar belajar: 88%',
    ],
  },
  {
    id: 't-6',
    name: 'Ibu Pipit Nanda Suprapto, S.Pd',
    shortName: 'Ibu Pipit',
    username: 'pipit',
    grade: 6,
    phase: 'C',
    sticker: '🏅',
    roomTitle: 'Siap Melangkah ke SMP',
    mainPita: 'Kesiapan SMP',
    displayMode: 'standard',
    weeklyPriorities: [
      'Cek kelengkapan portofolio kelulusan murid',
      'Mulai penilaian indikator Pita Kesiapan SMP',
      'Koordinasikan kegiatan Kakak Asuh Baca untuk Kelas 1',
    ],
    sampleProject: 'Kakak Asuh Baca untuk Kelas 1',
    projectTheme: 'Kakak Asuh',
    highlightedMetrics: [
      'Kesiapan melangkah ke SMP: 92%',
      'Ketepatan tindak lanjut siswa: 95%',
    ],
  },
];

export const HABIT_DEFINITIONS: HabitDefinition[] = [
  {
    id: 1,
    name: 'Bangun pagi',
    dimension: 'Kemandirian',
    icon: '☀️',
    description: 'Bangun sebelum subuh atau tepat waktu dengan ceria tanpa dibangunkan berulang kali',
  },
  {
    id: 2,
    name: 'Beribadah',
    dimension: 'Keimanan dan ketakwaan',
    icon: '🤲',
    description: 'Menjalankan doa, sholat, atau ibadah harian sesuai keyakinan dengan tertib',
  },
  {
    id: 3,
    name: 'Berolahraga',
    dimension: 'Kesehatan',
    icon: '🏃',
    description: 'Bergerak aktif minimal 15 menit melalui senam, jalan kaki, atau permainan fisik',
  },
  {
    id: 4,
    name: 'Makan sehat dan bergizi',
    dimension: 'Kesehatan',
    icon: '🥗',
    description: 'Sarapan bernutrisi seimbang dengan sayur, buah, dan air putih yang cukup',
  },
  {
    id: 5,
    name: 'Gemar belajar',
    dimension: 'Penalaran kritis dan kemandirian',
    icon: '📖',
    description: 'Membaca buku cerita, mengulang pelajaran, atau berlatih tanpa paksaan',
  },
  {
    id: 6,
    name: 'Bermasyarakat',
    dimension: 'Kewargaan dan kolaborasi',
    icon: '🤝',
    description: 'Membantu orang tua di rumah, menyapa tetangga, atau merapikan lingkungan',
  },
  {
    id: 7,
    name: 'Tidur cepat',
    dimension: 'Kesehatan',
    icon: '🌙',
    description: 'Tidur malam tepat waktu sebelum pukul sembilan malam agar bangun segar',
  },
];

// Helper to generate 30 students per class
export const generateClassStudents = (grade: 1 | 2 | 3 | 4 | 5 | 6): Student[] => {
  if (grade === 1) {
    const list: Student[] = [
      {
        id: 's-1-1',
        name: 'Aisyah',
        grade: 1,
        gender: 'P',
        parentName: 'Ibu Rina',
        parentPhone: '081234567890',
        attendancePercent: 96,
        literacyLevel: 3,
        numeracyLevel: 3,
        habitsStreak: 12,
        notesCount: 2,
      },
    ];
    for (let i = 2; i <= 30; i++) {
      list.push({
        id: `s-1-${i}`,
        name: `Murid contoh ${i}`,
        grade: 1,
        gender: i % 2 === 0 ? 'L' : 'P',
        parentName: `Wali murid ${i}`,
        parentPhone: `0812345678${i < 10 ? '0' + i : i}`,
        attendancePercent: i === 7 ? 80 : 95,
        literacyLevel: (i % 5) + 1,
        numeracyLevel: (i % 4) + 1,
        habitsStreak: (i % 10) + 1,
        notesCount: 0,
      });
    }
    return list;
  }

  if (grade === 2) {
    const list: Student[] = [
      {
        id: 's-2-1',
        name: 'Fajar',
        grade: 2,
        gender: 'L',
        parentName: 'Ibu Rina',
        parentPhone: '081234567890',
        attendancePercent: 98,
        literacyLevel: 4,
        numeracyLevel: 4,
        habitsStreak: 15,
        notesCount: 1,
      },
    ];
    for (let i = 2; i <= 30; i++) {
      list.push({
        id: `s-2-${i}`,
        name: `Murid contoh ${i}`,
        grade: 2,
        gender: i % 2 === 0 ? 'L' : 'P',
        parentName: `Wali murid ${i}`,
        parentPhone: `0812345678${i < 10 ? '0' + i : i}`,
        attendancePercent: 94,
        literacyLevel: (i % 4) + 2,
        numeracyLevel: (i % 4) + 2,
        habitsStreak: (i % 8) + 2,
        notesCount: 0,
      });
    }
    return list;
  }

  // Grade 3 - 6
  const list: Student[] = [];
  for (let i = 1; i <= 30; i++) {
    list.push({
      id: `s-${grade}-${i}`,
      name: i === 1 ? (grade === 3 ? 'Dimas' : grade === 4 ? 'Putri' : grade === 5 ? 'Rehan' : 'Zahra') : `Murid contoh ${i}`,
      grade: grade,
      gender: i % 2 === 0 ? 'L' : 'P',
      parentName: `Wali murid ${i}`,
      parentPhone: `0812345678${i < 10 ? '0' + i : i}`,
      attendancePercent: 95,
      literacyLevel: Math.min(5, (i % 3) + 3),
      numeracyLevel: Math.min(5, (i % 3) + 3),
      habitsStreak: (i % 7) + 3,
      notesCount: 0,
    });
  }
  return list;
};

export const INITIAL_STUDENTS_BY_GRADE: Record<number, Student[]> = {
  1: generateClassStudents(1),
  2: generateClassStudents(2),
  3: generateClassStudents(3),
  4: generateClassStudents(4),
  5: generateClassStudents(5),
  6: generateClassStudents(6),
};

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  {
    id: 'att-1',
    studentId: 's-1-1',
    studentName: 'Aisyah',
    grade: 1,
    date: '2026-11-05',
    status: 'Hadir',
    isUnsentDraft: false,
  },
  {
    id: 'att-2',
    studentId: 's-1-2',
    studentName: 'Murid contoh 2',
    grade: 1,
    date: '2026-11-05',
    status: 'Sakit',
    note: 'Lapor dari Ibu Rina: demam sejak semalam',
    isParentReport: true,
    parentReportConfirmed: false,
    isUnsentDraft: false,
  },
  {
    id: 'att-3',
    studentId: 's-1-7',
    studentName: 'Murid contoh 7',
    grade: 1,
    date: '2026-11-05',
    status: 'Alpa',
    note: 'Tidak hadir 3 hari berturut turut',
    isUnsentDraft: false,
  },
];

export const INITIAL_OBJECTIVES: LearningObjective[] = [
  // Kelas 1
  {
    id: 'tp-1-1',
    code: 'B-IND.1.1',
    subject: 'Bahasa Indonesia',
    grade: 1,
    semester: 1,
    text: 'Murid dapat mengenal huruf dan bunyinya dengan tepat melalui eksplorasi kata nyata.',
    status: 'sedang_berjalan',
    kktp: 'Mampu melafalkan minimal 18 bunyi huruf fonik dengan benar dan menunjuk simbolnya.',
    studentsNeedingSupport: ['Murid contoh 7', 'Murid contoh 12'],
  },
  {
    id: 'tp-1-2',
    code: 'MAT.1.1',
    subject: 'Matematika',
    grade: 1,
    semester: 1,
    text: 'Murid dapat membilang benda konkret di sekitar sampai 20 dengan teliti.',
    status: 'sedang_berjalan',
    kktp: 'Dapat mengelompokkan dan menghitung benda 1 sampai 20 tanpa terlewat.',
    studentsNeedingSupport: ['Murid contoh 14'],
  },
  {
    id: 'tp-1-3',
    code: 'PAN.1.1',
    subject: 'Pendidikan Pancasila',
    grade: 1,
    semester: 1,
    text: 'Murid dapat mematuhi aturan sederhana di ruang kelas dan di rumah.',
    status: 'tuntas',
    kktp: 'Menunjukkan sikap antre, merapikan alat tulis, dan meminta izin saat berbicara.',
    studentsNeedingSupport: [],
  },
  // Kelas 2
  {
    id: 'tp-2-1',
    code: 'B-IND.2.1',
    subject: 'Bahasa Indonesia',
    grade: 2,
    semester: 1,
    text: 'Murid dapat membaca kalimat sederhana dengan lancar dan intonasi wajar.',
    status: 'sedang_berjalan',
    kktp: 'Kecepatan baca wajar tanpa mengeja suku kata satu per satu.',
  },
  {
    id: 'tp-2-2',
    code: 'MAT.2.1',
    subject: 'Matematika',
    grade: 2,
    semester: 1,
    text: 'Murid dapat menjumlah dan mengurang bilangan sampai 100 dengan teknik bersusun.',
    status: 'belum_dimulai',
    kktp: 'Dapat menyelesaikan 8 dari 10 soal cerita penjumlahan dua angka.',
  },
  // Kelas 3
  {
    id: 'tp-3-1',
    code: 'IPAS.3.1',
    subject: 'IPAS',
    grade: 3,
    semester: 1,
    text: 'Murid dapat mengidentifikasi ciri dan kebutuhan makhluk hidup di sekitar sekolah.',
    status: 'sedang_berjalan',
    kktp: 'Dapat menyebutkan 4 ciri makhluk hidup dan memberi contohnya di kebun sekolah.',
  },
  // Kelas 4
  {
    id: 'tp-4-1',
    code: 'MAT.4.1',
    subject: 'Matematika',
    grade: 4,
    semester: 1,
    text: 'Murid dapat menjelaskan konsep pecahan senilai menggunakan gambar dan benda nyata.',
    status: 'sedang_berjalan',
    kktp: 'Mampu menunjukkan kesetaraan 1/2, 2/4, dan 4/8 lewat model piring kertas.',
  },
  // Kelas 5
  {
    id: 'tp-5-1',
    code: 'MAT.5.1',
    subject: 'Matematika',
    grade: 5,
    semester: 1,
    text: 'Murid dapat mengubah pecahan biasa menjadi desimal dan persen serta sebaliknya.',
    status: 'sedang_berjalan',
  },
  // Kelas 6
  {
    id: 'tp-6-1',
    code: 'MAT.6.1',
    subject: 'Matematika',
    grade: 6,
    semester: 1,
    text: 'Murid dapat menghitung volume bangun ruang kubus dan balok dalam konteks kehidupan sehari hari.',
    status: 'sedang_berjalan',
  },
];

export const INITIAL_MODULES: LearningModule[] = [
  {
    id: 'mod-1',
    title: 'Mengenal Huruf Vokal dan Konsonan Awal',
    subject: 'Bahasa Indonesia',
    grade: 1,
    semester: 1,
    allocationHours: '4 JP (2 x 35 Menit)',
    targetObjectives: ['B-IND.1.1'],
    graduateDimensions: ['Penalaran kritis', 'Komunikasi', 'Kemandirian'],
    status: 'Disetujui',
    version: 2,
    submittedAt: '2026-10-28',
    approvedAt: '2026-10-29',
    experiences: {
      memahami: 'Mendengarkan dongeng interaktif Si Kancil dan menebak bunyi huruf pertama nama hewan.',
      mengaplikasi: 'Menempelkan kartu huruf pada benda nyata di kelas (meja, buku, tas, pintu).',
      merefleksi: 'Murid menceritakan huruf favoritnya di depan teman sebangku dengan percaya diri.',
    },
    assessmentPlan: 'Formatif ceklis pengamatan bunyi huruf vokal dan keaktifan saat unjuk kerja.',
  },
  {
    id: 'mod-2',
    title: 'Membilang Benda dan Menghitung Koleksi Rumah',
    subject: 'Matematika',
    grade: 1,
    semester: 1,
    allocationHours: '4 JP (2 x 35 Menit)',
    targetObjectives: ['MAT.1.1'],
    graduateDimensions: ['Penalaran kritis', 'Kemandirian'],
    status: 'Diajukan',
    version: 1,
    submittedAt: '2026-11-03',
    experiences: {
      memahami: 'Mengamati biji jagung dan sendok yang dibawa guru untuk menghitung bersama.',
      mengaplikasi: 'Mengelompokkan kancing baju menjadi kelompok 5 dan 10 pada lembar kerja bergambar.',
      merefleksi: 'Menggambar benda sejumlah angka yang disebutkan oleh guru di papan tulis.',
    },
    assessmentPlan: 'Unjuk kerja menghitung 1 sampai 20 benda nyata di meja guru secara mandiri.',
  },
  {
    id: 'mod-3',
    title: 'Adab dan Aturan Sopan Santun di Sekolah',
    subject: 'Pendidikan Pancasila',
    grade: 1,
    semester: 1,
    allocationHours: '2 JP (2 x 35 Menit)',
    targetObjectives: ['PAN.1.1'],
    graduateDimensions: ['Keimanan dan ketakwaan', 'Kewargaan'],
    status: 'Draf',
    version: 1,
    experiences: {
      memahami: 'Menonton ilustrasi anak yang antre mencuci tangan dengan tertib.',
      mengaplikasi: 'Praktik langsung antre masuk kelas dan bersalaman dengan santun kepada Ibu Guru.',
      merefleksi: 'Menempel stiker senyum pada papan kebiasaan kelas.',
    },
    assessmentPlan: 'Pengamatan harian keteraturan saat berbaris dan kebersihan meja belajar.',
  },
  {
    id: 'mod-4',
    title: 'Gerak Dasar Lokomotor Jalan dan Lari Gembira',
    subject: 'PJOK',
    grade: 1,
    semester: 1,
    allocationHours: '3 JP (3 x 35 Menit)',
    targetObjectives: ['PJOK.1.1'],
    graduateDimensions: ['Kesehatan', 'Kolaborasi'],
    status: 'Perlu revisi',
    version: 1,
    reviewNote: 'Ibu Darmiati, mohon tambahkan penanganan keselamatan untuk lapangan yang basah saat musim hujan.',
    submittedAt: '2026-11-01',
    experiences: {
      memahami: 'Pemanasan bersama menirukan gerakan hewan katak dan burung bangau.',
      mengaplikasi: 'Permainan pos estafet bendera mini di halaman sekolah.',
      merefleksi: 'Pendinginan dan minum air putih sambil beristirahat di bawah pohon rindang.',
    },
    assessmentPlan: 'Ceklis ketepatan langkah gerak jalan lurus dan keseimbangan tubuh.',
  },
];

export const INITIAL_JOURNALS: TeacherJournal[] = [
  {
    id: 'jrn-1',
    date: '2026-11-04',
    subject: 'Bahasa Indonesia',
    grade: 1,
    objectiveCode: 'B-IND.1.1',
    workedWell: 'Murid sangat bersemangat saat mencari benda di kelas yang diawali huruf B dan M.',
    toChange: 'Berikan kartu huruf dengan gambar lebih besar agar murid di baris belakang lebih jelas.',
    engagement: 'sangat_aktif',
    submittedToPrincipal: true,
  },
  {
    id: 'jrn-2',
    date: '2026-11-05',
    subject: 'Matematika',
    grade: 1,
    objectiveCode: 'MAT.1.1',
    workedWell: 'Penggunaan biji jagung lokal memudahkan murid memahami konsep kelompok sepuluh.',
    toChange: 'Siapkan mangkuk plastik agar biji jagung tidak berguling ke lantai.',
    engagement: 'aktif',
    submittedToPrincipal: false,
  },
];

export const INITIAL_ASSESSMENTS: AssessmentItem[] = [
  {
    id: 'asm-1',
    title: 'Asesmen Formatif Pengenalan Bunyi Huruf',
    kind: 'formatif',
    subject: 'Bahasa Indonesia',
    grade: 1,
    objectiveCode: 'B-IND.1.1',
    isPublished: true,
    publishedAt: '2026-11-02',
    results: [
      {
        studentId: 's-1-1',
        studentName: 'Aisyah',
        level: 'sangat_baik',
        notes: 'Dapat melafalkan seluruh huruf vokal dan konsonan awal kata dengan fasih.',
      },
      {
        studentId: 's-1-2',
        studentName: 'Murid contoh 2',
        level: 'sesuai_harapan',
        notes: 'Sudah mengenal huruf vokal dengan baik.',
      },
      {
        studentId: 's-1-7',
        studentName: 'Murid contoh 7',
        level: 'perlu_bimbingan',
        notes: 'Perlu latihan membedakan bunyi huruf b dan d.',
      },
      {
        studentId: 's-1-12',
        studentName: 'Murid contoh 12',
        level: 'mulai_terlihat',
        notes: 'Mulai mengenali huruf vokal a, i, u.',
      },
    ],
  },
  {
    id: 'asm-2',
    title: 'Asesmen Diagnostik Membilang 1 sampai 20',
    kind: 'diagnostik',
    subject: 'Matematika',
    grade: 1,
    objectiveCode: 'MAT.1.1',
    isPublished: false,
    results: [
      {
        studentId: 's-1-1',
        studentName: 'Aisyah',
        level: 'sesuai_harapan',
        notes: 'Membilang lancar sampai 20 benda konkret.',
      },
      {
        studentId: 's-1-14',
        studentName: 'Murid contoh 14',
        level: 'perlu_bimbingan',
        notes: 'Masih sering terbalik antara angka 12 dan 21.',
      },
    ],
  },
];

export const INITIAL_LEARNING_GROUPS: LearningGroup[] = [
  {
    id: 'grp-1',
    name: 'Kelompok Bintang Membaca (Dukungan Fonik)',
    type: 'dukungan',
    grade: 1,
    targetObjective: 'B-IND.1.1',
    studentNames: ['Murid contoh 7', 'Murid contoh 12', 'Murid contoh 15'],
    plan: 'Latihan kartu fonik bergambar 10 menit setiap pagi sebelum jam pelajaran dimulai.',
    recheckDate: '2026-11-12',
    status: 'aktif',
  },
  {
    id: 'grp-2',
    name: 'Kelompok Petualang Angka (Pengayaan)',
    type: 'pengayaan',
    grade: 1,
    targetObjective: 'MAT.1.1',
    studentNames: ['Aisyah', 'Murid contoh 3', 'Murid contoh 9'],
    plan: 'Tantangan menyusun teka teki angka dan membilang sampai 30.',
    recheckDate: '2026-11-15',
    status: 'aktif',
  },
];

export const INITIAL_TASKS: StudentTask[] = [
  {
    id: 'tsk-1',
    title: 'Menulis namamu sendiri lima kali',
    subject: 'Bahasa Indonesia',
    grade: 1,
    dueDate: '2026-11-08',
    instructions: 'Tuliskan nama lengkap dan panggilanmu pada buku garis tiga dengan rapi. Mintalah Ibu atau Ayah untuk mendampingi.',
    status: 'Sudah dikirim',
    submissionDate: '2026-11-04',
    feedback: 'Tulisan Aisyah sudah sangat rapi, pertahankan ya!',
  },
  {
    id: 'tsk-2',
    title: 'Menghitung benda di rumah sampai 20',
    subject: 'Matematika',
    grade: 1,
    dueDate: '2026-11-10',
    instructions: 'Hitung 20 sendok atau kancing di rumah. Ceritakan kepada Ibu Guru saat masuk sekolah besok.',
    status: 'Belum dikerjakan',
  },
  {
    id: 'tsk-3',
    title: 'Menggambar buah kesukaan keluarga',
    subject: 'Seni dan Budaya',
    grade: 1,
    dueDate: '2026-11-02',
    instructions: 'Gunakan krayon atau pensil warna cerah untuk menggambar buah yang kamu sukai.',
    status: 'Sudah diperiksa',
    submissionDate: '2026-11-01',
    feedback: 'Hebat, pilihan warnanya ceria sekali!',
  },
  {
    id: 'tsk-4',
    title: 'Latihan membaca suku kata ba bi bu be bo',
    subject: 'Bahasa Indonesia',
    grade: 1,
    dueDate: '2026-10-25',
    instructions: 'Baca berulang kali bersama orang tua di rumah.',
    status: 'Perlu diperbaiki',
    feedback: 'Latih lagi suku kata bo dan bu ya sayang, sedikit lagi lancar!',
  },
];

export const INITIAL_PROJECTS: CocurricularProject[] = [
  {
    id: 'prj-1',
    title: 'Kebun Kacang Hijau Kelas 1',
    theme: 'Aku Bisa Sendiri',
    grade: 1,
    drivingQuestion: 'Bagaimana biji kecil bisa tumbuh menjadi tanaman yang memberi kita makan?',
    dimensions: ['Kemandirian', 'Kesehatan', 'Penalaran kritis'],
    startDate: '2026-10-15',
    endDate: '2026-11-20',
    partnerTeacher: 'Ibu Pipit Nanda Suprapto, S.Pd (Wali Kelas 6 - Mitra Kakak Asuh)',
    stages: [
      { name: 'Mengenali', description: 'Melihat biji kacang hijau dan kapas basah di gelas plastik.', completed: true },
      { name: 'Merancang', description: 'Menyiapkan wadah tanam dengan label nama sendiri.', completed: true },
      { name: 'Mengerjakan', description: 'Menyiram setiap pagi dan mencatat pertumbuhan tunas.', completed: true },
      { name: 'Menampilkan', description: 'Pameran kebun mini di depan selasar kelas 1.', completed: false },
      { name: 'Merefleksi', description: 'Menceritakan perasaan saat melihat biji tumbuh daun pertama.', completed: false },
    ],
  },
  {
    id: 'prj-2',
    title: 'Pasar Mini Kelas 2',
    theme: 'Warung Kita',
    grade: 2,
    drivingQuestion: 'Bagaimana uang mainan dan kejujuran membantu kita jual beli di warung?',
    dimensions: ['Kewargaan', 'Kolaborasi', 'Penalaran kritis'],
    startDate: '2026-10-20',
    endDate: '2026-11-25',
    stages: [
      { name: 'Mengenali', description: 'Mengenal nilai uang mainan sampai seratus rupiah.', completed: true },
      { name: 'Merancang', description: 'Membuat stan jualan dari kardus bekas di kelas.', completed: true },
      { name: 'Mengerjakan', description: 'Simulasi jual beli buah dan pensil dengan uang mainan.', completed: false },
      { name: 'Menampilkan', description: 'Mengundang adik kelas 1 untuk berbelanja.', completed: false },
      { name: 'Merefleksi', description: 'Diskusi tentang pentingnya bersikap jujur saat menghitung kembalian.', completed: false },
    ],
  },
];

export const INITIAL_HIGHLIGHTS: StudentHighlight[] = [
  {
    id: 'hl-1',
    studentName: 'Aisyah',
    grade: 1,
    type: 'karya',
    title: 'Koleksi Tulisan Nama yang Rapi',
    content: 'Aisyah berhasil menuliskan nama lengkapnya sendiri dengan huruf tegak yang rapi tanpa melihat contoh lagi.',
    date: '2026-11-03',
  },
  {
    id: 'hl-2',
    studentName: 'Murid contoh 3',
    grade: 1,
    type: 'kemajuan',
    title: 'Semangat Membaca Meningkat',
    content: 'Hari ini sudah berani maju ke depan kelas membaca kalimat pendek dengan suara lantang.',
    date: '2026-11-04',
  },
];

export const INITIAL_CONVERSATIONS: ParentConversation[] = [
  {
    id: 'conv-1',
    parentName: 'Ibu Rina',
    studentName: 'Aisyah & Fajar',
    grade: 1,
    lastMessage: 'Terima kasih informasinya Ibu Darmiati, Aisyah tadi sudah minum obat dan tidur siang.',
    lastTime: '13:45',
    unread: false,
    messages: [
      {
        id: 'm-1',
        sender: 'orang_tua',
        text: 'Selamat pagi Ibu Darmiati. Mohon maaf adiknya Aisyah hari ini agak hangat badannya.',
        time: '06:30',
      },
      {
        id: 'm-2',
        sender: 'guru',
        text: 'Selamat pagi Ibu Rina. Baik Ibu, semoga lekas sembuh ya. Istirahat di rumah dulu saja.',
        time: '06:45',
      },
      {
        id: 'm-3',
        sender: 'orang_tua',
        text: 'Terima kasih informasinya Ibu Darmiati, Aisyah tadi sudah minum obat dan tidur siang.',
        time: '13:45',
      },
    ],
  },
  {
    id: 'conv-2',
    parentName: 'Ibu Siska',
    studentName: 'Murid contoh 7',
    grade: 1,
    lastMessage: 'Besok kami usahakan ananda bisa masuk sekolah kembali Ibu.',
    lastTime: 'Kemarin',
    unread: true,
    messages: [
      {
        id: 'm-20',
        sender: 'guru',
        text: 'Selamat siang Ibu Siska, ananda belum hadir tiga hari ini. Apakah ananda sehat di rumah?',
        time: '11:00',
      },
      {
        id: 'm-21',
        sender: 'orang_tua',
        text: 'Besok kami usahakan ananda bisa masuk sekolah kembali Ibu.',
        time: '14:20',
      },
    ],
  },
];

export const INITIAL_ABSENCE_REPORTS: AbsenceReport[] = [
  {
    id: 'abs-rep-1',
    studentName: 'Murid contoh 2',
    grade: 1,
    reason: 'Sakit',
    date: '2026-11-05',
    note: 'Demam sejak semalam, istirahat di rumah',
    doctorLetterName: 'surat_dokter_puskesmas_wonosari.pdf',
    status: 'Diajukan',
  },
];

export const INITIAL_PRIVATE_NOTES: PrivateNote[] = [
  {
    id: 'pn-1',
    title: 'Ide Permainan Huruf Hari Senin',
    body: 'Gunakan kartu kata bergambar buah lokal Gorontalo seperti mangga kweni, jagung, dan pisang goroho untuk menyemangati kelompok membaca.',
    category: 'ide_mengajar',
    updatedAt: '2026-11-04 15:30',
  },
  {
    id: 'pn-2',
    title: 'Pengingat Pembagian Kelompok Diskusi',
    body: 'Campurkan murid yang sudah lancar membilang dengan murid yang masih butuh teman latihan agar saling mendukung.',
    category: 'pengingat',
    updatedAt: '2026-11-02 09:15',
  },
  {
    id: 'pn-3',
    title: 'Refleksi Pembelajaran Berdiferensiasi',
    body: 'Anak usia 6 sampai 7 tahun membutuhkan jeda gerak setiap 15 menit agar perhatian tidak cepat buyar.',
    category: 'refleksi',
    updatedAt: '2026-10-30 16:00',
  },
];

export const INITIAL_CHECKLIST_DOCUMENTS: DocumentChecklistItem[] = [
  { id: 'doc-1', name: 'Alur Tujuan Pembelajaran (ATP)', sourceModule: 'Peta Kurikulum', status: 'Disetujui', updatedAt: '2026-10-15' },
  { id: 'doc-2', name: 'Program Tahunan (Prota)', sourceModule: 'Rencana', status: 'Disetujui', updatedAt: '2026-10-15' },
  { id: 'doc-3', name: 'Program Semester (Promes)', sourceModule: 'Rencana', status: 'Disetujui', updatedAt: '2026-10-18' },
  { id: 'doc-4', name: 'Kriteria Ketercapaian Tujuan Pembelajaran (KKTP)', sourceModule: 'Peta Kurikulum', status: 'Disetujui', updatedAt: '2026-10-20' },
  { id: 'doc-5', name: 'Modul Ajar Semester 1', sourceModule: 'Penyusun Modul Ajar', status: 'Diajukan', updatedAt: '2026-11-03' },
  { id: 'doc-6', name: 'Jurnal Mengajar Harian', sourceModule: 'Jurnal Mengajar', status: 'Disetujui', updatedAt: '2026-11-04' },
  { id: 'doc-7', name: 'Daftar Hadir Murid', sourceModule: 'Absen Cepat', status: 'Disetujui', updatedAt: '2026-11-05' },
  { id: 'doc-8', name: 'Daftar Nilai Asesmen', sourceModule: 'Asesmen dan Nilai', status: 'Draf', updatedAt: '2026-11-02' },
  { id: 'doc-9', name: 'Analisis Hasil Asesmen dan Remedial', sourceModule: 'Kelompok Belajar', status: 'Draf', updatedAt: '2026-11-01' },
];

export const INITIAL_SUPERVISION_STAGES: SupervisionStage[] = [
  {
    stage: 'Pra Observasi',
    status: 'Disetujui',
    date: '2026-10-22',
    notes: 'Diskusi kesiapan perangkat ajar dan pendekatan pembelajaran mendalam berjalan sangat baik.',
    strengths: 'Modul ajar sudah memuat aktivitas olah pikir dan olah rasa yang berkesadaran.',
    recommendations: 'Pastikan alat peraga benda nyata sudah siap sebelum bel masuk kelas.',
  },
  {
    stage: 'Observasi',
    status: 'Disetujui',
    date: '2026-10-29',
    notes: 'Pelaksanaan pembelajaran di kelas 1 berjalan hangat dan menggembirakan.',
    strengths: 'Kemampuan mengelola dinamika anak usia dini sangat luwes dan penuh kasih sayang.',
    recommendations: 'Berikan penguatan positif berulang pada murid yang masih ragu melafalkan huruf.',
  },
  {
    stage: 'Pasca Observasi',
    status: 'Disetujui',
    date: '2026-10-31',
    notes: 'Refleksi bersama guru mengenai pencapaian tujuan pembelajaran dan keterlibatan anak.',
    strengths: 'Guru mampu mengenali murid yang membutuhkan bimbingan tambahan secara cepat.',
    recommendations: 'Dokumentasikan hasil karya murid pada papan portofolio kelas.',
  },
  {
    stage: 'Tindak Lanjut',
    status: 'Diajukan',
    date: '2026-11-05',
    notes: 'Implementasi kelompok bimbingan fonik pagi hari sebelum jam pelajaran.',
    strengths: 'Komitmen tinggi dalam menuntaskan literasi awal fase A.',
    recommendations: 'Lanjutkan koordinasi dengan orang tua siswa untuk pendampingan membaca di rumah.',
  },
];

export const SCHOOL_ARCHIVE_DOCUMENTS = [
  {
    id: 'arc-1',
    code: 'KSP-2026',
    title: 'Kurikulum Satuan Pendidikan (KSP) SDN 03 Wonosari',
    year: '2025/2026',
    category: 'Kurikulum Resmi',
    size: '2.4 MB',
    date: '2026-08-01',
    badge: 'Disahkan Dinas',
  },
  {
    id: 'arc-2',
    code: 'RKT-2026',
    title: 'Rencana Kerja Tahunan (RKT) Berbasis Pembelajaran Mendalam',
    year: '2025/2026',
    category: 'Rencana Strategis',
    size: '1.8 MB',
    date: '2026-08-10',
    badge: 'Disahkan',
  },
  {
    id: 'arc-3',
    code: 'RKAS-2026',
    title: 'Rencana Kegiatan dan Anggaran Sekolah (RKAS) BOS Reguler',
    year: '2025/2026',
    category: 'Keuangan Sekolah',
    size: '1.1 MB',
    date: '2026-08-15',
    badge: 'Disahkan',
  },
  {
    id: 'arc-4',
    code: 'SK-GURU-2026',
    title: 'SK Penetapan Pembagian Tugas Guru dan Wali Kelas',
    year: '2025/2026',
    category: 'Kumpulan SK',
    size: '850 KB',
    date: '2026-07-15',
    badge: 'Arsip Aktif',
  },
];
