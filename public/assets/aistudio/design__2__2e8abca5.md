# DESIGN.md: Ruang Pribadi Guru (Kelas 1 sampai 6)

| | |
|---|---|
| Produk | SI STIR HEBAT, SDN 03 Wonosari, NPSN 40500185 |
| Dokumen | Tambahan untuk Ruang Guru, melengkapi `DESIGN.md` utama bagian 8 dan 12 |
| Versi | 1.1 draf, 5 November 2026 (menambah bagian 6A: ruang untuk enam wali kelas) |
| Status | Rancangan untuk ditinjau. Belum ada kode, migrasi, atau perubahan pada sistem yang sudah live |
| Aturan emas | Desain Stitch yang sudah disetujui tidak diubah. Dokumen ini hanya menambah |

**Penanda di seluruh dokumen**

- **[Fakta]** ditemukan di sumber resmi atau dokumen proyek, sumbernya ada di bagian 16.
- **[Asumsi]** keputusan perancang atau pengetahuan umum yang belum dicek ke dokumen resmi pada sesi ini.
- **[Konfirmasi]** harus diputuskan sekolah sebelum dibangun. Daftar lengkap di bagian 15.

---

## 1. Ringkasan

**Ruang Pribadi** adalah area kerja satu guru kelas di dalam Ruang Guru. Isinya menyesuaikan diri dengan kelas yang diampu (Kelas 1 sampai 6), fase kurikulumnya, dan ritme belajar murid di usia itu.

Tiga janji produk:

1. **Pekerjaan harian selesai cepat.** Absen 30 murid kurang dari satu menit. Jurnal mengajar kurang dari tiga menit.
2. **Kurikulum menjadi alat, bukan beban.** Capaian Pembelajaran (CP), Tujuan Pembelajaran (TP), modul ajar, dan asesmen saling tersambung sehingga guru tidak mengetik hal yang sama dua kali.
3. **Data berubah menjadi tindakan untuk murid.** Setiap angka di layar berujung pada satu langkah nyata: kelompok dukungan, pesan ke orang tua, atau sorotan positif untuk murid.

Yang dibangun:

- 10 modul, 20 layar (bagian 4 dan 5).
- 6 Paket Kelas yang mengisi isi awal berdasarkan fase kurikulum (bagian 6).
- Siklus dampak murid dengan indikator yang bisa diukur (bagian 7).
- Model data, aturan akses RLS, dan kriteria penerimaan (bagian 8, 9, 13).

---

## 2. Dasar kurikulum

### 2.1 Yang ditemukan di sumber resmi dan pemberitaan

| # | Temuan | Tanda |
|---|---|---|
| 1 | Tidak ada pergantian kurikulum nasional. Permendikdasmen 13 Tahun 2025 menyatukan aturan yang ada. Tahun ajaran 2025/2026 satuan pendidikan masih memakai Kurikulum 2013 atau Kurikulum Merdeka. | [Fakta] |
| 2 | Capaian Pembelajaran terbaru ditetapkan lewat Keputusan Kepala BSKAP Nomor 046/H/KR/2025. | [Fakta] |
| 3 | Fase SD: Fase A (Kelas 1 dan 2), Fase B (Kelas 3 dan 4), Fase C (Kelas 5 dan 6). | [Fakta] |
| 4 | Pendekatan **pembelajaran mendalam**: bermakna, holistik, autentik, memadukan olah pikir, olah hati, olah rasa, olah raga. | [Fakta] |
| 5 | **Profil Pelajar Pancasila** (6 dimensi) menjadi **Profil Lulusan** (8 dimensi): keimanan dan ketakwaan, kewargaan, penalaran kritis, kreativitas, kolaborasi, kemandirian, kesehatan, komunikasi. | [Fakta] |
| 6 | **Kokurikuler** dibuat lebih fleksibel. Bentuknya bisa projek lintas disiplin atau gerakan **tujuh kebiasaan anak Indonesia hebat**. Tema boleh ditetapkan satuan pendidikan. | [Fakta] |
| 7 | **Koding dan Kecerdasan Artifisial** menjadi mata pelajaran **pilihan**. Untuk SD dimulai dari **Kelas 5**, bertahap sejak 2025/2026. | [Fakta] |
| 8 | **Pramuka** atau kepanduan lain wajib sebagai ekstrakurikuler. | [Fakta] |
| 9 | Asesmen formatif berjalan selama pembelajaran. Asesmen sumatif menilai capaian di akhir periode, menekankan asesmen autentik. | [Fakta] |
| 10 | Jumlah mata pelajaran tidak dikurangi dan total alokasi waktu tidak berubah. | [Fakta] |

### 2.2 Yang belum terverifikasi

Teks CP lengkap, daftar mata pelajaran per fase secara rinci, dan jam pelajaran (JP) per mata pelajaran tidak terbaca pada sesi ini. Alasan: dokumen resmi tidak dapat diunduh dari lingkungan kerja, dan salah satu situs sumber menolak akses otomatis.

**Akibat bagi desain**

- Isi kurikulum **tidak ditulis mati di kode**. Isinya disimpan sebagai data berversi (`curriculum_versions`, bagian 8) dan diisi dari dokumen resmi oleh Kepala Sekolah atau Admin.
- Selama belum diverifikasi, semua isi kurikulum di layar membawa badge kecil **"Data contoh"**, sesuai aturan `DESIGN.md` bagian 10.
- Paket Kelas di bagian 6 adalah **isi awal yang bisa diedit guru**, bukan teks CP resmi. Setiap butir bertanda [Asumsi] sampai Kepala Sekolah menandai "Sudah dicocokkan dengan dokumen CP".

### 2.3 Struktur mata pelajaran yang dipakai sebagai isi awal [Asumsi]

Mengikuti struktur Kurikulum Merdeka SD yang dikenal umum. Seluruhnya bisa diubah di pengaturan (`subject_phase_map`).

| Mata pelajaran | Kelas 1 | 2 | 3 | 4 | 5 | 6 |
|---|:-:|:-:|:-:|:-:|:-:|:-:|
| Pendidikan Agama dan Budi Pekerti | ya | ya | ya | ya | ya | ya |
| Pendidikan Pancasila | ya | ya | ya | ya | ya | ya |
| Bahasa Indonesia | ya | ya | ya | ya | ya | ya |
| Matematika | ya | ya | ya | ya | ya | ya |
| PJOK | ya | ya | ya | ya | ya | ya |
| Seni dan Budaya (satu cabang dipilih sekolah) | ya | ya | ya | ya | ya | ya |
| IPAS (Ilmu Pengetahuan Alam dan Sosial) | belum | belum | ya | ya | ya | ya |
| Bahasa Inggris | sesuai pilihan sekolah | | | | | |
| Muatan lokal | sesuai pilihan sekolah | | | | | |
| Koding dan KA (pilihan) | tidak | tidak | tidak | tidak | bila diselenggarakan | bila diselenggarakan |

Catatan: mulai kelas berapa IPAS tampil di Fase A pada CP 2025 perlu dicek. Karena itu kolom ini data, bukan kode.

---

## 3. Konsep Ruang Pribadi

### 3.1 Tiga lapis visibilitas

Kata "pribadi" dipakai dengan arti yang jelas. Setiap isian guru punya satu dari tiga lapis, dan lapisnya selalu terlihat lewat ikon dan label teks.

| Lapis | Label di layar | Siapa yang bisa melihat | Contoh isi |
|---|---|---|---|
| 1 | **Hanya Anda** | Guru pemilik. Tidak ada orang lain, termasuk Kepala Sekolah dan Admin | Catatan Pribadi, draf modul ajar, catatan pengamatan murid |
| 2 | **Dibagikan ke Kepala Sekolah** | Guru dan Kepala Sekolah (baca saja) | Modul ajar yang sudah diajukan, berkas perangkat, jurnal yang diajukan |
| 3 | **Terlihat murid dan orang tua** | Murid dan orang tua yang terverifikasi, setelah guru menerbitkan | Nilai terbit, tugas, pengumuman kelas, sorotan karya, laporan capaian |

Aturan perpindahan lapis:

- Isian baru selalu mulai di lapis 1.
- Naik lapis hanya lewat tombol bertuliskan kata kerja jelas: **Ajukan ke Kepala Sekolah**, **Terbitkan ke Murid dan Orang Tua**.
- Tombol menampilkan pratinjau "Yang akan dilihat" sebelum konfirmasi.
- Menarik kembali dari lapis 3 diperbolehkan, tercatat di audit log, dan memunculkan toast "Nilai ditarik. Murid dan orang tua tidak lagi melihatnya."

**[Konfirmasi K1]** Keputusan awal proyek: Kepala Sekolah punya akses baca ke semua ruang. Rancangan ini **mengecualikan lapis 1** supaya "pribadi" benar-benar pribadi. Bila sekolah ingin Kepala Sekolah ikut membaca lapis 1, label "Hanya Anda" harus diganti dan guru diberi tahu.

### 3.2 Paket Kelas

Saat akun guru dibuat dan ditautkan ke kelas (`classes.homeroom_teacher_id`), Ruang Pribadi memuat **Paket Kelas** sesuai `grade_level`. Paket menentukan isi awal, bukan hak akses.

Paket Kelas mengatur:

- Mata pelajaran yang tampil dan urutannya.
- Daftar TP contoh per semester.
- Jenjang pita literasi dan numerasi.
- Templat kokurikuler dan kegiatan pembelajaran mendalam.
- Aturan "Perlu Perhatian" bawaan.
- Mode tampilan kartu murid (Mode Kelas Rendah untuk Kelas 1 dan 2).

Guru dapat menyalin, menyunting, dan menonaktifkan isi paket. Perubahan guru tidak mengubah paket milik guru lain.

### 3.3 Prinsip desain

1. **Fungsi lebih dulu dari tampilan.** Tidak ada tombol tanpa efek. Tidak ada angka dari data tiruan setelah tahap prototipe.
2. **Satu ketukan menuju pekerjaan harian.** Absen, jurnal, dan nilai cepat bisa dicapai dari Beranda Hari Ini.
3. **Tahan jaringan lemah.** Draf absen dan jurnal tersimpan di perangkat dan berlabel "Belum terkirim" sampai server membalas.
4. **Positif bagi murid.** Tidak ada peringkat antar murid, tidak ada hukuman digital, tidak ada label negatif yang terlihat murid.
5. **Guru memegang keputusan.** Sistem menyarankan, guru memutuskan. Teks laporan dari templat selalu diedit guru sebelum terbit.
6. **Kosakata guru kelas.** Absen, jurnal, modul, nilai, tugas. Bukan istilah sistem.

---

## 4. Peta layar dan navigasi

### 4.1 Posisi dalam Ruang Guru

Ruang Guru yang sudah ada (sapaan, kartu tugas minggu ini, Daftar Kelas) **tidak berubah**. Ruang Pribadi masuk sebagai:

- Satu kartu besar **"Ruang Pribadi Anda"** di Beranda Ruang Guru, tepat di bawah Daftar Kelas, dengan tombol **Buka Ruang Pribadi**.
- Satu tab kapsul **Ruang Pribadi** pada baris tab Ruang Guru.

### 4.2 Pola navigasi di dalam Ruang Pribadi

Pola pusat dan cabang (hub and spoke). Cocok untuk pengguna nonteknis dan ringan di jaringan lemah.

- **Beranda Hari Ini** adalah pusat. Di bawahnya ada kisi 9 ubin modul.
- Setiap modul punya tombol **Kembali ke Hari Ini** di kiri atas dan paling banyak 4 tab kapsul yang membungkus ke baris baru, tidak pernah menggulir menyamping.
- Bar bawah global (Beranda, Murid, Orang Tua, Guru, Kepala Sekolah) tetap seperti `DESIGN.md` bagian 6. Tidak ada bar bawah kedua.
- Desktop 1280 px ke atas memakai sidebar kiri berisi 9 modul. Tablet memakai rel ramping dengan ikon dan label.

### 4.3 Daftar layar

| ID | Layar | Modul | Fase pembangunan |
|---|---|---|---|
| RG01 | Beranda Hari Ini | A | 2 |
| RG02 | Kelas Saya (tab Murid, Absen, Tugas, Nilai) | B | 2 |
| RG03 | Absen Cepat | B | 2 |
| RG04 | Profil Murid | B | 4 |
| RG05 | Peta Kurikulum | C | 2 |
| RG06 | Rincian Tujuan Pembelajaran | C | 2 |
| RG07 | Daftar Rencana (modul ajar) | D | 2 |
| RG08 | Penyusun Modul Ajar | D | 2 |
| RG09 | Jurnal Mengajar | D | 2 |
| RG10 | Daftar Asesmen | E | 4 |
| RG11 | Input Penilaian | E | 4 |
| RG12 | Kelompok Belajar | E | 4 |
| RG13 | Pita Literasi dan Numerasi | F | 4 |
| RG14 | Kebiasaan Kelas | G | 4 |
| RG15 | Projek Kokurikuler | G | 4 |
| RG16 | Sorotan dan Pesan Semangat | G | 4 |
| RG17 | Ruang Penghubung (kotak masuk guru) | H | 4 |
| RG18 | Laporan Capaian Murid | H | 4 |
| RG19 | Berkas Perangkat dan Hasil Supervisi | I | 2 dan 3 |
| RG20 | Catatan Pribadi | J | 2 |

**Catatan batas 16 layar.** Keputusan awal: seluruh fitur muat dalam 16 layar prompt Stitch. Dokumen ini 20 layar. Cara memadatkan tanpa membuang fitur: gabungkan RG06 ke RG05 (panel geser), RG12 ke RG11 (tab), RG16 ke RG14 (tab), dan RG20 ke RG19 (tab). Hasilnya 16 layar. **[Konfirmasi K2]** pilih versi 20 layar untuk dibangun atau versi 16 layar untuk prompt Stitch.

### 4.4 Sketsa Beranda Hari Ini (ponsel 360 sampai 428 px)

```
+----------------------------------------+
| SI STIR HEBAT [Tumbuh Bersama]  [Masuk]|
| ======= pita 4 garis ================== |
| Selamat pagi, Ibu Darmiati.            |
| Kelas 1 | 30 murid | [Data contoh]     |
|                                        |
| +- Hari ini -------------------------+ |
| | 07.30 Bahasa Indonesia             | |
| | 09.00 Matematika                   | |
| | [Isi Jurnal Mengajar]              | |
| +------------------------------------+ |
| +- Absen hari ini -------------------+ |
| | [Belum diisi]                      | |
| | [ Isi Absen Sekarang ]  (oranye)   | |
| +------------------------------------+ |
| +- Perlu perhatian (3 murid) --------+ |
| | Tidak hadir 3 hari, 1 murid        | |
| | Laporan orang tua menunggu, 2      | |
| | [Lihat Murid]                      | |
| +------------------------------------+ |
| +- Tugas minggu ini -----------------+ |
| | [ ] Ajukan modul ajar minggu depan | |
| | [x] Input nilai formatif IPAS      | |
| +------------------------------------+ |
| +- Kemajuan semester ----------------+ |
| | 12 dari 30 tujuan pembelajaran     | |
| | [#########-----------]             | |
| +------------------------------------+ |
| Menu Ruang Pribadi (2 kolom, 9 ubin)   |
|  Kelas Saya   | Peta Kurikulum         |
|  Rencana      | Asesmen dan Nilai      |
|  Literasi     | Karakter dan Projek    |
|  Penghubung   | Berkas dan Supervisi   |
|  Catatan Pribadi                       |
+----------------------------------------+
| Beranda | Murid | Orang Tua | Guru | KS |
+----------------------------------------+
```

Urutan kartu di Beranda Hari Ini: Hari ini, Absen, Perlu perhatian, Tugas minggu ini, Kemajuan semester, lalu menu modul. Kartu yang kosong diganti Empty State bergaris putus-putus dengan satu tombol langkah berikutnya.

---

## 5. Spesifikasi modul

Format tiap modul: tujuan, layar, isi dan aksi, aturan, dampak bagi murid.

### A. Hari Ini (RG01)

**Tujuan.** Satu layar yang menjawab "apa yang harus saya kerjakan sekarang".

**Isi dan aksi**

- Jadwal hari ini dari `lesson_schedules`, jam yang sedang berjalan diberi penanda.
- Kartu Absen hari ini dengan chip *Absen hari ini sudah diisi* atau *Absen hari ini belum diisi*, mengikuti `DESIGN.md` bagian 12.
- Kartu **Perlu perhatian** berisi murid yang memicu aturan di bagian 7.3.
- Tugas minggu ini dari `teacher_tasks`, ditambah tugas otomatis: tindak lanjut supervisi yang jatuh tempo, modul berstatus *Perlu revisi*, laporan orang tua yang belum dikonfirmasi.
- Kemajuan semester: jumlah TP tuntas dari `class_objective_progress`.
- Tombol cepat: **Isi Absen Sekarang**, **Isi Jurnal Mengajar**, **Catat Nilai Cepat**.

**Aturan.** Kartu tidak menyatakan "tersimpan" sebelum server mengonfirmasi. Teks sementara: *Sebentar ya, sedang disimpan.*

**Dampak murid.** Murid yang butuh perhatian muncul di hari yang sama, bukan di akhir semester.

### B. Kelas Saya (RG02, RG03, RG04)

**Tujuan.** Kelola kelas yang diampu: murid, absen, tugas, nilai.

**RG02 Kelas Saya.** Empat tab kapsul: Murid, Absen, Tugas, Nilai. Tab Murid memuat kartu murid (nama, foto kecil bila ada izin, chip kehadiran bulan ini, chip pita literasi). Di layar lebar, daftar murid tampil sebagai tabel. Di ponsel berubah menjadi kartu bertumpuk.

**RG03 Absen Cepat**

```
+----------------------------------------+
| < Kembali ke Hari Ini                  |
| Absen Kelas 1, Kamis 5 November 2026   |
| [ Semua Hadir ]   Terisi 30 dari 30    |
| +------------------------------------+ |
| | Aisyah            [Hadir v]        | |
| | Murid contoh 2    [Sakit v] (ortu) | |
| | ...                                | |
| +------------------------------------+ |
|  Belum terkirim: 0                     |
| [ Simpan Absen ]  (lekat di bawah)     |
+----------------------------------------+
```

- Status yang tersedia: **Hadir, Sakit, Izin, Alpa, Terlambat, Dispensasi**. Sesuai kolom `attendance_records.status` di Database Blueprint. Daftar status final **[Konfirmasi K3]**.
- Tombol **Semua Hadir** mengisi default. Guru lalu mengetuk pengecualian. Absen baru tersimpan setelah **Simpan Absen** ditekan, supaya ketukan tidak sengaja tidak menjadi data.
- Laporan orang tua (formulir *Lapor Anak Tidak Masuk*) tampil sebagai baris yang sudah terisi **Sakit** atau **Izin** dengan chip *Diajukan* dan tulisan "Dari orang tua". Menjadi catatan final setelah guru menekan **Konfirmasi**. Sesuai aturan bisnis `DESIGN.md` bagian 13.
- Satu murid hanya punya satu catatan per sesi (kunci unik `session_id` dan `student_id`).
- Mengubah absen di hari yang sama: bebas. Hari berikutnya: lewat pengajuan koreksi (`attendance_corrections`). Siapa yang menyetujui **[Konfirmasi K4]**.
- Tanpa jaringan: draf tersimpan di perangkat, baris berlabel **Belum terkirim**, dikirim ulang otomatis saat sinyal kembali, dan hanya memakai draf absen (keputusan proyek).
- Target: 30 murid terisi dalam kurang dari 60 detik, satu tangan, tanpa menggulir menyamping.

**RG04 Profil Murid.** Ringkasan satu murid dalam satu layar: kehadiran, pita literasi dan numerasi, capaian per TP, kebiasaan (data belum diisi tampil netral, bukan "tidak dilakukan"), karya yang disorot, riwayat pesan ke orang tua. Dua tombol: **Catat Pengamatan** (lapis Hanya Anda) dan **Kirim Pesan Semangat**. Tidak ada peringkat dan tidak ada perbandingan antar murid.

**Dampak murid.** Guru melihat pola kehadiran dan perkembangan satu anak sebelum bicara dengan orang tua.

### C. Peta Kurikulum (RG05, RG06)

**Tujuan.** Mengubah CP menjadi alur belajar yang bisa dicentang.

**Isi dan aksi**

- Pilih mata pelajaran lewat tab kapsul. Di bawahnya: **Elemen CP**, lalu daftar **Tujuan Pembelajaran** per semester berurutan (Alur Tujuan Pembelajaran).
- Setiap TP punya status: *Belum dimulai*, *Sedang berjalan*, *Tuntas*. Warna chip mengikuti palet status `DESIGN.md` bagian 2.
- Bilah kemajuan per mata pelajaran dan per semester.
- Tombol **Tambah Tujuan Sendiri** untuk TP buatan guru (`scope = guru`). TP bawaan paket tidak bisa dihapus, hanya dinonaktifkan.
- RG06 Rincian TP memuat: kaitan ke modul ajar, kaitan ke asesmen, kriteria ketercapaian (KKTP) yang ditulis guru, dan daftar murid yang belum menunjukkan capaian.

**Aturan**

- Ambang ketuntasan **tidak diisi otomatis dengan angka**. Kurikulum Merdeka memakai kriteria ketercapaian yang dirumuskan guru atau sekolah, jadi sistem memberi kolom kosong dan contoh rumusan [Asumsi].
- Badge **Data contoh** tampil sampai Kepala Sekolah menandai paket "Sudah dicocokkan dengan dokumen CP".

**Dampak murid.** Murid tidak "terlewat" di TP yang sudah dilewati kelas. Daftar murid belum menunjukkan capaian menjadi bahan kelompok dukungan.

### D. Rencana dan Jurnal (RG07, RG08, RG09)

**Tujuan.** Menyusun modul ajar yang sejalan dengan pembelajaran mendalam, lalu mencatat apa yang sebenarnya terjadi di kelas.

**RG07 Daftar Rencana.** Daftar modul dengan status *Draf, Diajukan, Disetujui, Perlu revisi* (sesuai `DESIGN.md` bagian 10). Filter: mata pelajaran, semester, status. Modul *Perlu revisi* menampilkan catatan Kepala Sekolah di bagian atas.

**RG08 Penyusun Modul Ajar.** Wizard enam langkah, tombol **Simpan Draf** lekat di bawah:

| Langkah | Isi | Otomatis dari |
|---|---|---|
| 1. Dasar | Mata pelajaran, kelas, semester, alokasi waktu | Paket Kelas |
| 2. Tujuan | Pilih satu atau beberapa TP | Peta Kurikulum |
| 3. Profil Lulusan | Pilih dimensi yang ditumbuhkan (maksimal 3 supaya fokus) | 8 dimensi |
| 4. Pengalaman belajar | Tiga bagian: **Memahami**, **Mengaplikasi**, **Merefleksi**, masing-masing dengan kegiatan dan perkiraan menit | Templat Fase |
| 5. Asesmen | Formatif selama kegiatan, sumatif di akhir, kriteria ketercapaian | Modul E |
| 6. Lampiran | Unggah berkas (LKPD, bahan ajar) | Storage |

- Tiga bagian Memahami, Mengaplikasi, Merefleksi serta prinsip berkesadaran, bermakna, dan menggembirakan adalah kerangka pembelajaran mendalam yang saya kenal dari panduan Kemendikdasmen [Asumsi: belum dicek ke dokumen panduan pada sesi ini]. Nama bagian dapat diganti di pengaturan bila panduan resmi sekolah berbeda.
- Setiap versi tersimpan (`learning_module_versions`). **Ajukan ke Kepala Sekolah** mengubah status menjadi *Diajukan* dan mengunci versi itu. Perubahan baru membuat versi baru.
- Draf tidak terlihat Kepala Sekolah sampai diajukan.
- Dokumen dapat diekspor ke Word atau PDF untuk arsip sekolah.

**RG09 Jurnal Mengajar.** Isian harian dalam kurang dari 3 menit, dipetakan ke `teacher_journals`:

- Tanggal, mata pelajaran, TP yang diajarkan (pilih dari Peta Kurikulum, otomatis menandai TP *Sedang berjalan*).
- Apa yang berjalan baik, apa yang diubah besok (dua kolom pendek).
- Foto kegiatan opsional.
- Penanda keterlibatan kelas: *Sangat aktif*, *Aktif*, *Perlu dipancing* (pilihan satu ketukan).

**Aturan.** Jurnal dapat diajukan ke Kepala Sekolah per minggu. Foto murid hanya diunggah bila sekolah sudah menetapkan aturan izin foto **[Konfirmasi K5]**.

**Dampak murid.** Refleksi harian membuat pelajaran besok disesuaikan dengan apa yang tadi sulit bagi murid.

### E. Asesmen dan Nilai (RG10, RG11, RG12)

**Tujuan.** Memakai asesmen untuk mengajar lebih tepat, bukan hanya mengisi nilai.

**Tiga jenis**

| Jenis | Kapan | Bentuk di layar |
|---|---|---|
| **Diagnostik** | Awal tahun, awal topik | Ceklis kemampuan prasyarat per murid |
| **Formatif** | Selama pembelajaran | Penanda cepat empat level per murid per TP |
| **Sumatif** | Akhir topik, tengah dan akhir semester | Skor angka dan atau level, ada nilai maksimum |

**Empat level capaian** (guru melihat label ini):

| Level | Warna chip | Yang dilihat murid dan orang tua |
|---|---|---|
| Perlu bimbingan | Perlu revisi `#FFD9C2` / `#7A2E00` | "Terus berlatih" |
| Mulai terlihat | Draf `#EADFB8` / `#4B4524` | "Mulai terlihat" |
| Sesuai harapan | Diajukan `#CFEFEC` / `#12383A` | "Sudah sesuai" |
| Sangat baik | Disetujui `#CDEFD0` / `#174D1F` | "Hebat" |

Warna tidak pernah menjadi satu satunya penanda. Setiap chip memuat teks dan ikon. Pasangan label guru dan label murid ini disahkan dulu di **[Konfirmasi K6]**.

**RG11 Input Penilaian**

- Desktop: tabel murid dikali TP atau murid dikali skor.
- Ponsel: **satu murid per kartu**, tombol **Murid Berikutnya** dan **Murid Sebelumnya** (bukan geser saja), progres "12 dari 30 murid".
- Validasi: skor tidak boleh melebihi nilai maksimum, kolom wajib bertanda, pesan kesalahan *Kolom ini belum diisi.*
- Simpan otomatis sebagai draf. Murid dan orang tua **tidak melihat apa pun sebelum guru menekan Terbitkan Nilai**.
- Tombol **Terbitkan Nilai** menampilkan pratinjau tampilan murid dan orang tua.

**Analisis otomatis setelah input** (tampil sebagai kartu ringkas, tanpa peringkat):

- Berapa murid yang menunjukkan capaian per TP.
- TP yang paling banyak belum tercapai di kelas.
- Saran: **Susun Kelompok Dukungan** dan **Susun Kelompok Pengayaan**.

**RG12 Kelompok Belajar**

- Guru membuat kelompok dari hasil asesmen: dukungan, pengayaan, atau campuran, dengan tujuan TP tertentu.
- Setiap kelompok punya rencana singkat (kegiatan, tanggal asesmen ulang) dan catatan kemajuan.
- Keanggotaan kelompok **tidak terlihat murid** dan bersifat sementara. Setelah asesmen ulang, sistem menanyakan "Pindahkan murid yang sudah mencapai?".

**Dampak murid.** Murid yang tertinggal dibantu pada topik yang tepat dalam hitungan hari. Murid yang sudah mencapai mendapat tantangan, bukan menunggu.

### F. Literasi dan Numerasi (RG13)

**Tujuan.** Memantau dasar belajar yang paling menentukan di SD, dengan bahasa yang mudah dipahami guru.

**Pita Kemajuan.** Jenjang pendek dan konkret. Isi awal [Asumsi], sekolah dapat mengganti dengan instrumen yang dipakai.

Literasi (Fase A, Kelas 1 dan 2):

1. Mengenal huruf dan bunyi.
2. Membaca suku kata.
3. Membaca kata.
4. Membaca kalimat sederhana.
5. Membaca teks pendek dengan lancar.
6. Membaca teks pendek dan menceritakan isinya.

Literasi (Fase B dan C, Kelas 3 sampai 6):

1. Membaca lancar teks informasi pendek.
2. Menemukan gagasan pokok.
3. Menyimpulkan dan menjelaskan dengan kata sendiri.
4. Membandingkan dua teks.
5. Menilai ketepatan informasi.

Numerasi mengikuti pola yang sama dan disesuaikan Paket Kelas, misalnya Kelas 1: *membilang sampai 10, membilang sampai 20, membandingkan bilangan, menjumlah benda, mengurang benda*.

**Isi dan aksi**

- Guru mengetuk level per murid dan tanggal pengamatan. Riwayat tersimpan (`student_skill_records`).
- Grafik pertumbuhan **per murid terhadap dirinya sendiri**, dan sebaran level kelas sebagai batang bertumpuk. Tidak ada daftar peringkat.
- Penanda *tidak naik level dalam 6 minggu* memicu kartu Perlu perhatian.
- **Pita Kesiapan Fase B** di Kelas 2 dan **Pita Kesiapan SMP** di Kelas 6: ceklis indikator kesiapan sebelum pindah fase.

**Dampak murid.** Murid yang belum lancar membaca terdeteksi di Kelas 1 dan 2, sebelum membaca menjadi syarat memahami IPAS.

### G. Karakter dan Projek (RG14, RG15, RG16)

**RG14 Kebiasaan Kelas.** Memakai tujuh kebiasaan di `DESIGN.md` bagian 10: bangun pagi, beribadah, berolahraga, makan sehat dan bergizi, gemar belajar, bermasyarakat, tidur cepat.

- Ringkasan kelas: berapa murid sudah mengisi hari ini. Yang belum mengisi tampil **netral**, tidak dihitung sebagai "tidak dilakukan".
- Tampilan rangkaian (streak) memberi bintang. Rangkaian yang putus tidak ditampilkan sebagai kegagalan.
- Pengaitan kebiasaan dengan Profil Lulusan [Asumsi]:

| Kebiasaan | Dimensi Profil Lulusan yang terutama tumbuh |
|---|---|
| Bangun pagi | Kemandirian |
| Beribadah | Keimanan dan ketakwaan |
| Berolahraga | Kesehatan |
| Makan sehat dan bergizi | Kesehatan |
| Gemar belajar | Penalaran kritis, kemandirian |
| Bermasyarakat | Kewargaan, kolaborasi |
| Tidur cepat | Kesehatan |

- Kebiasaan yang diisi di rumah (bangun pagi, tidur cepat, makan) diisi murid atau orang tua. Guru **tidak** menilai kebenarannya dan sistem tidak menuduh.

**RG15 Projek Kokurikuler.** Tema ditetapkan sekolah (fakta nomor 6). Isian:

- Judul, tema, pertanyaan pemandu, tanggal mulai dan selesai.
- Dimensi Profil Lulusan yang disasar (maksimal 3).
- Rencana tahap: Mengenali, Merancang, Mengerjakan, Menampilkan, Merefleksi [Asumsi].
- Bukti karya (foto, berkas, catatan) per murid atau per kelompok.
- Penilaian per dimensi memakai empat level di modul E.
- **Projek bersama antar kelas** (misalnya Kakak Asuh Baca Kelas 6 untuk Kelas 1): dua wali kelas saling mengundang. Hanya objek projek yang dibagikan. Isi kelas masing-masing tetap tertutup. Tahap pembangunan: Fase 5.

**RG16 Sorotan dan Pesan Semangat**

- **Sorotan karya**: guru memilih satu karya atau kemajuan murid untuk tampil di Ruang Murid.
- **Penjaga adil**: sistem mengingatkan lembut "Ada 7 murid yang belum pernah Anda sorot bulan ini" agar perhatian guru merata. Tidak ada peringkat dan tidak ada angka yang terlihat murid.
- **Pesan Semangat**: templat singkat (contoh: *Terima kasih sudah membantu temanmu hari ini.*) yang bisa diubah. Pesan sampai ke Ruang Murid dan dapat diteruskan ke orang tua.
- Semua isi murid bernada positif sesuai karakter Ruang Murid.

**Dampak murid.** Setiap murid pernah melihat bahwa gurunya memperhatikan usahanya. Ini yang paling mudah terlewat di kelas besar.

### H. Ruang Penghubung dan Laporan (RG17, RG18)

**RG17 Kotak masuk guru**

- Percakapan dengan orang tua per murid, gelembung pesan mengikuti `DESIGN.md` komponen 6.
- Templat balasan: konfirmasi izin, ajakan bertemu, kabar baik, permintaan dukungan di rumah.
- Tombol **Hubungi lewat WhatsApp** hanya membuka WhatsApp dengan pesan terisi (click to chat). Tanpa WhatsApp Business API.
- Pesan terkait murid yang tercatat di Perlu perhatian bisa dibuat langsung dari kartunya.
- Pembatasan jam kerja (misalnya balasan diharapkan di jam sekolah) ditulis di bagian atas kotak masuk supaya guru tidak merasa harus selalu siaga **[Konfirmasi K7]**.

**RG18 Laporan Capaian Murid**

- Draf deskripsi capaian per murid disusun dari **templat kalimat** yang diisi dari level capaian, bukan dari AI. Contoh pola: *Ananda sudah menunjukkan {capaian kuat}. Ananda perlu dilatih lagi pada {capaian berikutnya}. Dukungan di rumah: {saran}.*
- Guru wajib menyunting dan menekan **Terbitkan ke Orang Tua**. Murid dan orang tua tidak pernah melihat draf.
- Ekspor Excel membantu guru memindahkan data ke aplikasi rapor resmi. Fitur ini **tidak menggantikan** sistem rapor resmi dan format impornya tidak diasumsikan.

**Dampak murid.** Orang tua menerima gambaran yang spesifik dan bisa ditindaklanjuti di rumah.

### I. Berkas dan Supervisi (RG19)

**Tab Berkas Perangkat.** Daftar kelengkapan per semester, dipetakan ke `teacher_document_checklist`:

Alur Tujuan Pembelajaran, Program Tahunan, Program Semester, Kriteria Ketercapaian Tujuan Pembelajaran, Modul Ajar, Jurnal Mengajar, Daftar Hadir, Daftar Nilai, Analisis Asesmen.

- Ringkasan: *Perangkat Anda lengkap 6 dari 9.*
- Berkas yang sudah ada otomatis tersambung (Modul Ajar dari modul D, Jurnal dari RG09, Daftar Hadir dari RG03, Daftar Nilai dari RG11).
- Status per berkas: *Draf, Diajukan, Disetujui, Perlu revisi*.

**Tab Hasil Supervisi Saya**

- Stepper empat tahap: Pra Observasi, Observasi, Pasca Observasi, Tindak Lanjut (komponen 14).
- Guru hanya melihat hasil yang **sudah dipublikasikan** Kepala Sekolah. Draf supervisi tidak terlihat (aturan proyek).
- Tindak lanjut menjadi tugas di Beranda Hari Ini.
- Indikator supervisi memakai instrumen resmi sekolah. Sampai instrumen ditetapkan, isi tampil sebagai **Data contoh**.

### J. Catatan Pribadi (RG20)

- Buku catatan guru. Judul, isi, label (ide mengajar, pengingat, refleksi, bahan rapat).
- Selalu lapis **Hanya Anda**. Tidak ada tombol bagikan di modul ini.
- Pencarian teks di perangkat dan di server (tetap terlindungi RLS).
- Pengamatan tentang murid **tidak** disimpan di sini. Pengamatan murid memakai **Catat Pengamatan** di Profil Murid karena memiliki kategori terstruktur dan aturan akses sendiri.
- Larangan tampil: nomor identitas, data kesehatan terperinci, dan data pribadi orang tua dalam catatan bebas. Layar menampilkan teks bantu *Hindari menulis data kesehatan atau identitas di sini.*

---

## 6. Paket Kelas 1 sampai 6

Semua butir di bagian ini adalah **isi awal yang dapat diedit**. Tandanya **Data contoh** sampai dicocokkan dengan CP 046/H/KR/2025 dan Alur Tujuan Pembelajaran sekolah. Konteks lokal (jagung, karawo, binte biluhuta, tari saronde) hanyalah gagasan awal yang dapat diganti guru.

### 6.1 Ringkasan fase

| Kelas | Fase | Tema ritme belajar | Pita utama |
|---|---|---|---|
| 1 | A | Belajar lewat bermain dan benda nyata, transisi dari PAUD | Membaca permulaan |
| 2 | A | Membaca lancar, menghitung dengan percaya diri | Lancar membaca, kesiapan Fase B |
| 3 | B | Membaca untuk belajar, IPAS dimulai | Membaca teks informasi |
| 4 | B | Menyelidiki dan menjelaskan | Gagasan pokok, pecahan |
| 5 | C | Bernalar, bertanya, menelaah data | Menyimpulkan, desimal dan rasio |
| 6 | C | Mandiri dan siap melangkah ke SMP | Kesiapan SMP |

### 6.2 Kelas 1, Fase A: "Mulai Sekolah dengan Gembira"

**Karakter belajar [Asumsi].** Usia sekitar 6 sampai 7 tahun. Belajar lewat gerak, bermain, dan benda nyata. Satu kegiatan sebaiknya pendek, kira kira 10 sampai 15 menit.

**Mata pelajaran tampil.** Agama, Pancasila, Bahasa Indonesia, Matematika, PJOK, Seni, ditambah pilihan sekolah.

**Fokus isi awal**

- Bahasa Indonesia: menyimak dan berbicara, membaca permulaan (huruf, bunyi, suku kata, kata, kalimat), menulis nama dan kata.
- Matematika: bilangan sampai 20 (selaras contoh tugas di `DESIGN.md`: *Menghitung benda di rumah sampai 20*), membandingkan, penjumlahan dan pengurangan dengan benda konkret, pola, bentuk, panjang tidak baku.
- Pancasila dan Agama: aturan kelas, adab, bersyukur.
- PJOK dan Seni: gerak dasar, eksplorasi warna dan lagu.

**Yang dipantau khusus.** Kesiapan sekolah, kemandirian (bekal, tas, toilet), kehadiran minggu pertama.

**Asesmen yang disarankan.** Diagnostik awal (mengenal huruf, membilang sampai 10, bahasa sehari hari). Formatif lewat pengamatan dan unjuk kerja. Portofolio gambar dan tulisan nama. Hindari ujian tulis panjang.

**Pita.** Literasi 6 level (6 level Fase A di atas). Numerasi: membilang 10, membilang 20, membandingkan, menjumlah benda, mengurang benda.

**Kebiasaan fokus.** Bangun pagi, makan sehat, tidur cepat (butuh peran orang tua).

**Contoh pengalaman belajar mendalam: Kebun Kacang Hijau Kelas 1**

- Memahami: apa yang dibutuhkan tanaman (cerita, pengamatan biji).
- Mengaplikasi: menanam di gelas, menghitung hari, menggambar dan menulis kata "air", "daun".
- Merefleksi: bercerita "Tanamanku hari ini ..." dengan gambar.

**Tema kokurikuler contoh.** "Aku Bisa Sendiri" (kemandirian, kesehatan).

**Mode tampilan.** Mode Kelas Rendah: kartu murid dengan ikon dan ukuran huruf lebih besar, penanda level dengan ikon bantu.

**Dampak yang diukur.** Persentase murid yang naik minimal satu level baca dalam 8 minggu. Kehadiran bulan pertama. Jumlah murid dengan ceklis kemandirian terpenuhi.

### 6.3 Kelas 2, Fase A: "Lancar Membaca, Berani Berhitung"

**Fokus isi awal**

- Bahasa Indonesia: membaca lancar kalimat dan teks pendek, menulis kalimat, bercerita ulang.
- Matematika: penjumlahan dan pengurangan sampai 100, mengenal perkalian dan pembagian dengan benda nyata, panjang dan waktu, bangun datar sederhana, piktogram.
- PJOK, Seni, Agama, Pancasila: melanjutkan Kelas 1 dengan situasi yang lebih kompleks.

**Yang dipantau khusus.** Kelas 2 adalah **gerbang Fase B**. Murid yang belum membaca lancar harus terdeteksi sebelum naik Kelas 3.

**Asesmen.** Diagnostik ulang di awal tahun (kemampuan bisa turun setelah libur panjang). Cek kelancaran membaca per bulan. Formatif lewat tanya jawab singkat dan lembar kerja pendek.

**Pita.** Literasi level 4 sampai 6. **Pita Kesiapan Fase B** muncul pada semester 2.

**Kebiasaan fokus.** Gemar belajar, bermasyarakat, berolahraga.

**Contoh pengalaman belajar mendalam: Pasar Mini Kelas**

- Memahami: apa itu jual beli, uang mainan, nilai uang sampai 100.
- Mengaplikasi: menjadi penjual dan pembeli, menghitung kembalian, berbicara sopan saat menawar.
- Merefleksi: bercerita siapa yang paling terbantu hari itu dan alasannya.

**Tema kokurikuler contoh.** "Warung Kita" (kewargaan, kolaborasi, penalaran kritis).

**Dampak yang diukur.** Persentase murid siap Fase B pada akhir tahun. Jumlah kelompok dukungan yang selesai.

### 6.4 Kelas 3, Fase B: "Membaca untuk Belajar"

**Fokus isi awal**

- Bahasa Indonesia: teks informasi, menulis paragraf, bercerita dengan urutan jelas.
- Matematika: bilangan sampai 10.000, perkalian dan pembagian, pecahan sederhana, keliling, pengukuran panjang berat waktu.
- IPAS: makhluk hidup dan lingkungannya, wujud benda, kehidupan di sekitar tempat tinggal.
- Pancasila dan Agama: kerja sama, tanggung jawab, kebiasaan baik.

**Yang dipantau khusus.** Perpindahan dari belajar membaca ke membaca untuk belajar. IPAS tampil sebagai mata pelajaran dan banyak murid kesulitan karena teksnya, bukan konsepnya.

**Asesmen.** Diagnostik membaca teks informasi sebelum topik IPAS. Tiket keluar (satu pertanyaan di akhir pelajaran) sebagai formatif cepat.

**Kebiasaan fokus.** Makan sehat, gemar belajar.

**Contoh pengalaman belajar mendalam: Dari Jagung ke Piring Kita**

- Memahami: tanaman jagung, bagian yang dimakan, makanan dari jagung.
- Mengaplikasi: mengamati jagung, mencatat bagian, bertanya kepada orang tua tentang makanan khas, misalnya binte biluhuta.
- Merefleksi: menulis satu paragraf "Makanan jagung yang kusuka".

**Tema kokurikuler contoh.** "Makanan Sehat dari Kebun Kita" (kesehatan, kreativitas).

### 6.5 Kelas 4, Fase B: "Menyelidiki dan Menjelaskan"

**Fokus isi awal**

- Bahasa Indonesia: teks nonfiksi, laporan pengamatan sederhana, presentasi pendek.
- Matematika: pecahan senilai dan operasi sederhana, keliling dan luas, sudut, diagram data.
- IPAS: gaya dan energi, ekosistem dan rantai makanan, kegiatan ekonomi, keragaman budaya.
- Pancasila: musyawarah, hak dan kewajiban di lingkungan.

**Yang dipantau khusus.** Miskonsepsi pecahan dan kemampuan menjelaskan dengan kata sendiri.

**Asesmen.** Diagnostik miskonsepsi pecahan. Projek mini dengan rubrik penalaran. Formatif lewat penjelasan lisan.

**Kebiasaan fokus.** Bermasyarakat, berolahraga.

**Contoh pengalaman belajar mendalam: Sampah di Sekolah Kita**

- Memahami: jenis sampah, dampak ke lingkungan.
- Mengaplikasi: menimbang sampah kelas selama seminggu, membuat diagram batang, mengusulkan aturan kelas.
- Merefleksi: menyampaikan temuan kepada kelas lain dalam presentasi dua menit.

**Tema kokurikuler contoh.** "Sekolah Bersih Kita" (penalaran kritis, kewargaan, komunikasi).

### 6.6 Kelas 5, Fase C: "Bernalar dan Bertanya"

**Fokus isi awal**

- Bahasa Indonesia: teks prosedur dan argumentasi sederhana, meringkas, diskusi.
- Matematika: pecahan desimal dan persen, rasio, volume bangun ruang sederhana, data dan modus atau median.
- IPAS: tubuh manusia, daur air, perubahan wujud, kebinekaan, sejarah dan wilayah sekitar.
- **Koding dan KA (pilihan)**: tampil bila sekolah menyelenggarakan (pengaturan Kepala Sekolah). Isi awal tanpa komputer: urutan langkah (algoritma) lewat resep atau rute, mengenali pola, memecah masalah, membaca data sederhana, etika memakai AI dan mengecek fakta [Asumsi isi, Fakta status pilihan dan mulai Kelas 5].

**Yang dipantau khusus.** Kemandirian belajar dan ketelitian membaca data.

**Asesmen.** Sumatif projek dengan rubrik. Portofolio refleksi. Diagnostik prasyarat pecahan sebelum desimal.

**Kebiasaan fokus.** Gemar belajar, bermasyarakat.

**Contoh pengalaman belajar mendalam: Data Panen Kebun Sekolah**

- Memahami: faktor pertumbuhan tanaman, cara mencatat data.
- Mengaplikasi: mencatat tinggi tanaman mingguan, membuat tabel dan grafik, menyimpulkan.
- Merefleksi: menulis saran untuk panen berikutnya.

**Tema kokurikuler contoh.** "Hemat Air untuk Kebun" (penalaran kritis, kolaborasi, kemandirian).

### 6.7 Kelas 6, Fase C: "Siap Melangkah ke SMP"

**Fokus isi awal**

- Bahasa Indonesia: menulis teks lebih panjang, presentasi, membandingkan sumber.
- Matematika: operasi pecahan dan desimal, rasio dan skala, bangun ruang dan volume, rata rata, peluang sederhana.
- IPAS: sesuai paket Fase C.
- Pancasila dan Agama: kepemimpinan, tanggung jawab sosial.

**Yang dipantau khusus.** Kesiapan masuk SMP, pengelolaan waktu belajar sendiri, kepercayaan diri berbicara di depan kelas.

**Asesmen.** Persiapan asesmen akhir jenjang sesuai ketentuan yang berlaku **[Konfirmasi K8: ketentuan asesmen akhir jenjang dan Tes Kemampuan Akademik tahun ajaran ini belum dicek]**. Portofolio kelulusan. Pita Kesiapan SMP.

**Kebiasaan fokus.** Gemar belajar, bermasyarakat, beribadah.

**Contoh pengalaman belajar mendalam: Kakak Asuh Baca untuk Kelas 1**

- Memahami: apa yang membuat anak kecil mau membaca, memilih buku yang tepat.
- Mengaplikasi: menyiapkan cerita pendek, membaca berpasangan dengan murid Kelas 1 setiap minggu.
- Merefleksi: menulis apa yang dipelajari sebagai kakak asuh.

**Tema kokurikuler contoh.** "Kakak Asuh" (kewargaan, komunikasi, kemandirian). Projek bersama antar kelas dengan Kelas 1 (bagian 5.G, Fase 5).

### 6.8 Profil Lulusan sebagai bahasa pengamatan

Delapan dimensi dipakai sebagai label pilihan di modul ajar, projek, dan pengamatan. Contoh tanda yang bisa dilihat guru [Asumsi, dapat disunting]:

| Dimensi | Contoh tanda terlihat di SD |
|---|---|
| Keimanan dan ketakwaan | Berdoa dan bersyukur dengan tertib, menghormati teman berbeda keyakinan |
| Kewargaan | Menaati aturan kelas, membantu menjaga kebersihan, menghargai perbedaan |
| Penalaran kritis | Bertanya "mengapa", menjelaskan alasan jawaban, memeriksa kebenaran informasi |
| Kreativitas | Mencoba cara berbeda, membuat karya sendiri |
| Kolaborasi | Berbagi tugas dalam kelompok, mendengarkan teman |
| Kemandirian | Menyiapkan perlengkapan sendiri, menyelesaikan tugas tanpa diingatkan terus |
| Kesehatan | Menjaga kebersihan diri, mau mencoba makanan sehat, aktif bergerak |
| Komunikasi | Berbicara jelas, bercerita runtut, menulis pesan sederhana |

---

## 6A. Ruang Pribadi Enam Wali Kelas

Bagian ini menerapkan Paket Kelas (bagian 6) pada enam wali kelas SDN 03 Wonosari. Nama dan kelas berasal dari `DESIGN.md` bagian 10 dan 12. Hanya nama, kelas, dan stiker yang diambil dari data sekolah. Isian lain adalah isi awal yang boleh disunting masing masing guru.

### 6A.1 Aturan umum

- Satu wali kelas, satu akun, satu Ruang Pribadi. Judul ruang memakai nama lengkap, contoh **Ruang Pribadi Ibu Darmiati, S.Pd**.
- Sapaan di Beranda Hari Ini memakai nama depan agar ringkas, contoh *Selamat pagi, Ibu Fadilatul.* Nama lengkap tampil di judul ruang dan di Kartu Kelas.
- Ruang terbuka otomatis sesuai kelas yang tertaut di `classes.homeroom_teacher_id`. Guru tidak memilih kelas sendiri.
- Isi kelas lain tertutup. Dari Daftar Kelas, wali hanya melihat nama wali kelas dan jumlah murid kelas lain (aturan `DESIGN.md` bagian 12).
- Penanda **Kelas Anda** (kapsul Orange) hanya muncul pada kartu kelas milik guru yang masuk.
- Kepala Sekolah melihat enam ruang dengan akses baca, kecuali lapis **Hanya Anda** (keputusan K1).

### 6A.2 Ringkasan enam ruang

| Kelas | Wali kelas | Stiker | Fase | Judul ruang | Pita utama | Mode tampilan |
|---|---|---|---|---|---|---|
| 1 | Ibu Darmiati, S.Pd | 🌱 | A | Mulai Sekolah dengan Gembira | Membaca permulaan | Kelas Rendah |
| 2 | Ibu Fadilatul Jannah Samsuru, S.Pd | 🌿 | A | Lancar Membaca, Berani Berhitung | Lancar membaca, Kesiapan Fase B | Kelas Rendah |
| 3 | Ibu Trin Sugiarti, S.Pd | 🌼 | B | Membaca untuk Belajar | Membaca teks informasi | Standar |
| 4 | Ibu Waode Suriani, S.Pd | 🌻 | B | Menyelidiki dan Menjelaskan | Gagasan pokok, pecahan | Standar |
| 5 | Ibu Ima Kusmawati, S.Pd | 🌳 | C | Bernalar dan Bertanya | Menyimpulkan, desimal dan rasio | Standar |
| 6 | Ibu Pipit Nanda Suprapto, S.Pd | 🏅 | C | Siap Melangkah ke SMP | Kesiapan SMP | Standar |

### 6A.3 Isi awal tiap ruang

Setiap ruang memuat tiga prioritas minggu pertama di Tugas minggu ini, satu projek kokurikuler contoh, dan dua indikator dampak yang disorot. Semuanya berbadge **Data contoh**.

**Ruang Pribadi Ibu Darmiati, S.Pd (Kelas 1)**

- Sapaan: *Selamat pagi, Ibu Darmiati.* Subjudul: *Kelas 1, 30 murid.*
- Tiga prioritas awal: isi asesmen diagnostik awal (mengenal huruf, membilang sampai 10), atur Pita Literasi untuk semua murid, kirim sapaan perkenalan kepada orang tua.
- TP pembuka contoh: *Murid dapat mengenal huruf dan bunyinya.* dan *Murid dapat membilang benda sampai 20.*
- Projek contoh: Kebun Kacang Hijau Kelas 1 (tema Aku Bisa Sendiri).
- Indikator disorot: murid yang naik minimal satu level baca dalam 8 minggu, kehadiran bulan pertama.
- Data demo: murid **Aisyah**, orang tua Ibu Rina. Murid lain tidak ditampilkan dalam contoh.
- Mitra projek bersama (Fase 5): Kakak Asuh Baca dengan Kelas 6.

**Ruang Pribadi Ibu Fadilatul Jannah Samsuru, S.Pd (Kelas 2)**

- Sapaan: *Selamat pagi, Ibu Fadilatul.* Subjudul: *Kelas 2, 30 murid.*
- Tiga prioritas awal: ulangi diagnostik membaca dan berhitung, susun Kelompok Dukungan untuk murid yang belum lancar membaca, mulai Pita Kesiapan Fase B.
- TP pembuka contoh: *Murid dapat membaca kalimat sederhana dengan lancar.* dan *Murid dapat menjumlah dan mengurang sampai 100.*
- Projek contoh: Pasar Mini Kelas (tema Warung Kita).
- Indikator disorot: persentase murid siap Fase B, jumlah kelompok dukungan yang selesai.
- Data demo: murid **Fajar**, orang tua Ibu Rina (dua anak: Aisyah dan Fajar).
- Mitra projek bersama (Fase 5): Adik Asuh Cerita dengan Kelas 5.

**Ruang Pribadi Ibu Trin Sugiarti, S.Pd (Kelas 3)**

- Sapaan: *Selamat pagi, Ibu Trin.* Subjudul: *Kelas 3, 30 murid.*
- Tiga prioritas awal: diagnostik membaca teks informasi, siapkan modul IPAS pertama, atur kriteria ketercapaian untuk tiga TP awal.
- TP pembuka contoh: *Murid dapat menemukan informasi dalam teks pendek.* dan *Murid dapat menjelaskan ciri makhluk hidup.*
- Projek contoh: Dari Jagung ke Piring Kita (tema Makanan Sehat dari Kebun Kita).
- Indikator disorot: pertumbuhan literasi pada teks informasi, cakupan TP IPAS.

**Ruang Pribadi Ibu Waode Suriani, S.Pd (Kelas 4)**

- Sapaan: *Selamat pagi, Ibu Waode.* Subjudul: *Kelas 4, 30 murid.*
- Tiga prioritas awal: diagnostik miskonsepsi pecahan, rancang projek mini pertama, jadwalkan presentasi murid.
- TP pembuka contoh: *Murid dapat menjelaskan pecahan senilai.* dan *Murid dapat menyusun laporan pengamatan sederhana.*
- Projek contoh: Sampah di Sekolah Kita (tema Sekolah Bersih Kita).
- Indikator disorot: murid yang mencapai TP pecahan, ketepatan tindak lanjut Perlu perhatian.

**Ruang Pribadi Ibu Ima Kusmawati, S.Pd (Kelas 5)**

- Sapaan: *Selamat pagi, Ibu Ima.* Subjudul: *Kelas 5, 30 murid.*
- Tiga prioritas awal: diagnostik prasyarat pecahan, tentukan apakah Koding dan KA diselenggarakan (menunggu keputusan sekolah), rancang projek data.
- TP pembuka contoh: *Murid dapat mengubah pecahan menjadi desimal dan persen.* dan *Murid dapat membuat ringkasan teks.*
- Projek contoh: Data Panen Kebun Sekolah (tema Hemat Air untuk Kebun).
- Indikator disorot: pertumbuhan numerasi, keterlibatan kebiasaan Gemar belajar.
- Fitur tambahan: modul Koding dan KA tampil di Peta Kurikulum hanya bila diaktifkan sekolah.

**Ruang Pribadi Ibu Pipit Nanda Suprapto, S.Pd (Kelas 6)**

- Sapaan: *Selamat pagi, Ibu Pipit.* Subjudul: *Kelas 6, 30 murid.*
- Tiga prioritas awal: cek ketentuan asesmen akhir jenjang, mulai Pita Kesiapan SMP, siapkan portofolio kelulusan.
- TP pembuka contoh: *Murid dapat menghitung volume bangun ruang.* dan *Murid dapat menyampaikan gagasan secara lisan dan tulisan.*
- Projek contoh: Kakak Asuh Baca untuk Kelas 1 (tema Kakak Asuh).
- Indikator disorot: kesiapan SMP, ketepatan tindak lanjut Perlu perhatian.
- Fitur tambahan: Ringkasan Capaian Kelulusan yang dapat diterbitkan ke orang tua.

### 6A.4 Akun demo

| Wali kelas | Nama pengguna | Kelas |
|---|---|---|
| Ibu Darmiati | darmiati | 1 |
| Ibu Fadilatul Jannah Samsuru | fadilatul | 2 |
| Ibu Trin Sugiarti | trin | 3 |
| Ibu Waode Suriani | waode | 4 |
| Ibu Ima Kusmawati | ima | 5 |
| Ibu Pipit Nanda Suprapto | pipit | 6 |

Nama pengguna `darmiati` sudah ditetapkan di desain layar Masuk. Lima lainnya mengikuti pola yang sama dan merupakan **usulan** **[Konfirmasi K11]**. Kata sandi demo hanya untuk prototipe dan dihapus sebelum data nyata dimasukkan. Produksi memakai email dan kata sandi sesuai keputusan proyek.

### 6A.5 Siapa melihat apa antar wali kelas

| Penonton | R1 | R2 | R3 | R4 | R5 | R6 |
|---|:-:|:-:|:-:|:-:|:-:|:-:|
| Ibu Darmiati (K1) | isi penuh | kartu saja | kartu saja | kartu saja | kartu saja | kartu saja |
| Ibu Fadilatul (K2) | kartu saja | isi penuh | kartu saja | kartu saja | kartu saja | kartu saja |
| Ibu Trin (K3) | kartu saja | kartu saja | isi penuh | kartu saja | kartu saja | kartu saja |
| Ibu Waode (K4) | kartu saja | kartu saja | kartu saja | isi penuh | kartu saja | kartu saja |
| Ibu Ima (K5) | kartu saja | kartu saja | kartu saja | kartu saja | isi penuh | kartu saja |
| Ibu Pipit (K6) | kartu saja | kartu saja | kartu saja | kartu saja | kartu saja | isi penuh |

"Kartu saja" berarti nama wali kelas dan jumlah murid. Projek bersama antar kelas hanya membagikan objek projeknya, bukan isi ruang.

### 6A.6 Situasi khusus

| Situasi | Perilaku |
|---|---|
| Pergantian wali kelas di tengah tahun | Admin menautkan wali baru ke kelas. Data kelas (absen, nilai, TP) tetap milik kelas. Lapis **Hanya Anda** tetap milik guru lama dan tidak berpindah |
| Tahun ajaran baru | Kelas dan wali ditautkan ulang. Paket Kelas mengikuti `grade_level` kelas baru. Data tahun lalu tersimpan sebagai arsip baca saja |
| Guru pengganti sementara | Akses terbatas pada kelas dan rentang tanggal tertentu, diberikan Admin, tercatat di audit log **[Konfirmasi K12]** |
| Wali kelas memegang dua kelas | Pemilih kelas di bagian atas Ruang Pribadi. Data tiap kelas tetap terpisah |
| Guru mata pelajaran (PJOK dan PAI) | Bukan bagian bagian ini. Mereka memakai varian ringan: daftar kelas yang diajar, absen, dan penilaian mata pelajaran sendiri. Dirancang setelah penugasan ditetapkan sekolah |

---

## 7. Siklus dampak bagi murid

### 7.1 Lima langkah

```
Ketahui (diagnostik, absen, pita)
    -> Kelompokkan (dukungan, pengayaan)
        -> Bantu (kegiatan terarah, pesan ke orang tua)
            -> Cek ulang (asesmen formatif)
                -> Rayakan (sorotan karya, pesan semangat)
```

Setiap langkah punya satu layar dan satu tindakan di aplikasi. Tidak ada langkah yang berhenti di "lihat data".

### 7.2 Indikator dampak

Diukur terhadap diri murid sendiri dan terhadap kondisi awal kelas, bukan terhadap kelas lain.

| Indikator | Cara menghitung | Dilihat oleh |
|---|---|---|
| Pertumbuhan literasi | Murid yang naik minimal satu level dalam 8 minggu dibagi seluruh murid | Guru, ringkasan agregat ke Kepala Sekolah |
| Pertumbuhan numerasi | Sama, untuk pita numerasi | Guru, Kepala Sekolah agregat |
| Kehadiran | Persen hadir per bulan, tanpa membandingkan murid | Guru |
| Ketepatan tindak lanjut | Kartu Perlu perhatian yang ditindaklanjuti dalam 3 hari kerja | Guru, Kepala Sekolah agregat |
| Keterpenuhan sorotan | Murid yang pernah disorot dalam bulan ini | Guru |
| Cakupan TP | TP tuntas dibagi seluruh TP semester | Guru, Kepala Sekolah |
| Keterlibatan kebiasaan | Hari yang terisi dibagi hari yang mungkin (data kosong tidak dihitung negatif) | Guru, murid (milik sendiri) |

Kepala Sekolah hanya melihat **angka agregat per kelas** untuk indikator murid, bukan data per murid, kecuali sekolah memutuskan lain **[Konfirmasi K9]**.

### 7.3 Aturan Perlu Perhatian (nilai awal, dapat diatur guru)

| Pemicu | Nilai awal | Tindakan yang ditawarkan |
|---|---|---|
| Tidak hadir berturut turut | 3 hari sekolah | Kirim Pesan ke Orang Tua, Catat Tindak Lanjut |
| Level capaian Perlu bimbingan pada TP yang sama | 2 kali berturut turut | Susun Kelompok Dukungan |
| Pita literasi atau numerasi tidak naik | 6 minggu | Susun Kelompok Dukungan, Catat Pengamatan |
| Tugas belum dikumpulkan | 3 tugas berturut turut | Kirim Pesan ke Orang Tua |
| Laporan orang tua menunggu konfirmasi | lewat 1 hari kerja | Konfirmasi |

Aturan tidak menyebut murid sebagai masalah. Kartu memakai kalimat netral, misalnya *Perlu disapa: tidak hadir 3 hari.* Tindak lanjut mempunyai tanggal jatuh tempo dan masuk ke Tugas minggu ini.

---

## 8. Model data

Mengacu pada `Database_Blueprint_SI_STIR_HEBAT`. Yang sudah ada **dipakai ulang**. Yang baru ditandai **baru**. Semua tabel memakai UUID, `TIMESTAMPTZ`, snake_case. Rancangan, bukan migrasi siap jalan **[Konfirmasi K10]**: skema Supabase sekarang belum diaudit, jadi tabel yang sudah ada harus dicek dulu agar tidak terjadi duplikat.

### 8.1 Dipakai ulang

`profiles`, `user_roles`, `academic_years`, `semesters`, `classes`, `subjects`, `teacher_assignments`, `teachers`, `students`, `class_memberships`, `student_parent_relationships`, `attendance_sessions`, `attendance_records`, `attendance_corrections`, `learning_modules`, `learning_materials`, `assessments`, `assessment_results`, `supervision_*`, `habit_categories`, `habit_records`, `student_development_reports`, `student_achievements`, `teacher_journals`, `teacher_tasks`, `announcements`, `notifications`, `audit_logs`.

### 8.2 Tambahan dan perubahan

**Kurikulum (baru)**

| Tabel | Kolom utama | Keterangan |
|---|---|---|
| `curriculum_versions` | id, name, legal_basis, effective_from, status (`contoh`, `terverifikasi`), verified_by, verified_at | Versi kurikulum. `legal_basis` memuat nomor keputusan. |
| `subject_phase_map` | id, version_id, subject_id, phase (`A`,`B`,`C`), grade_level, is_elective, weekly_hours (boleh kosong), notes | Mata pelajaran per fase dan kelas. JP dikosongkan sampai terverifikasi. |
| `cp_elements` | id, version_id, subject_id, phase, element_name, cp_text, sort_order | Elemen dan teks CP. |
| `learning_objectives` | id, cp_element_id, grade_level, semester_no, code, objective_text, sequence_no, scope (`contoh`,`sekolah`,`guru`), owner_teacher_id, is_active | TP dan urutannya. |
| `class_objective_progress` | id, class_id, objective_id, academic_year_id, status (`belum`,`berjalan`,`tuntas`), started_on, completed_on, note | Unik pada class_id, objective_id, academic_year_id. |

**Perencanaan (baru atau perluasan)**

| Tabel | Perubahan |
|---|---|
| `lesson_schedules` (baru) | id, class_id, subject_id, teacher_id, weekday, start_time, end_time, academic_year_id |
| `learning_modules` (ubah) | tambah version_no, status (`draf`,`diajukan`,`disetujui`,`perlu_revisi`), reviewer_id, review_note, submitted_at, reviewed_at |
| `learning_module_versions` (baru) | id, module_id, version_no, content (jsonb), document_path, created_at |
| `learning_module_objectives` (baru) | module_id, objective_id |
| `teacher_journals` (ubah) | tambah module_id, objective_id, worked_well, to_change, engagement (`sangat_aktif`,`aktif`,`perlu_dipancing`), submitted_at |
| `teacher_document_checklist` (baru) | id, teacher_id, academic_year_id, semester_no, doc_type, file_path, status, submitted_at, reviewed_by, review_note |

**Asesmen dan dukungan (baru atau perluasan)**

| Tabel | Perubahan |
|---|---|
| `assessments` (ubah) | tambah kind (`diagnostik`,`formatif`,`sumatif`), status (`draf`,`terbit`) |
| `assessment_objectives` (baru) | assessment_id, objective_id |
| `assessment_results` (ubah) | tambah level (`perlu_bimbingan`,`mulai_terlihat`,`sesuai_harapan`,`sangat_baik`); CHECK bahwa score atau level terisi; `published_at` tetap penentu keterlihatan |
| `learning_groups` | id, class_id, teacher_id, name, purpose, objective_id, planned_recheck_on, status |
| `learning_group_members` | group_id, student_id, joined_on, left_on |
| `follow_up_actions` | id, class_id, student_id, teacher_id, trigger_code, action_type, due_date, status, done_at, note |

**Literasi, karakter, projek (baru)**

| Tabel | Kolom utama |
|---|---|
| `skill_levels` | id, domain (`literasi`,`numerasi`), grade_band, code, label, sort_order |
| `student_skill_records` | id, student_id, level_id, assessed_on, assessed_by, note |
| `cocurricular_projects` | id, class_id, teacher_id, academic_year_id, title, theme, driving_question, start_date, end_date, status |
| `cocurricular_project_dimensions` | project_id, dimension (8 nilai Profil Lulusan) |
| `cocurricular_project_evidence` | id, project_id, student_id (boleh kosong), storage_path, caption, created_at |
| `cocurricular_project_assessments` | project_id, student_id, dimension, level |
| `cocurricular_project_collaborators` | project_id, teacher_id (untuk projek antar kelas) |
| `student_highlights` | id, student_id, teacher_id, kind (`karya`,`kemajuan`,`pesan`), content, media_path, published_at |

**Catatan (baru)**

| Tabel | Kolom utama | Keterangan |
|---|---|---|
| `teacher_private_notes` | id, owner_user_id, title, body, tags, created_at, updated_at | Hanya pemilik. |
| `student_observations` | id, student_id, class_id, teacher_id, category (`kekuatan`,`perlu_dukungan`,`catatan_umum`), body, visibility (`pribadi`,`dibagikan_ke_orang_tua`), observed_on | Default `pribadi`. |

### 8.3 Penyimpanan berkas

| Bucket | Isi | Akses |
|---|---|---|
| `teacher-documents` (ada) | Modul ajar, perangkat | Private, pemilik, dan Kepala Sekolah bila diajukan |
| `learning-materials` (ada) | LKPD, bahan ajar | Sesuai kelas dan penugasan |
| `cocurricular-evidence` (baru) | Foto dan karya projek | Private, signed URL berumur pendek |
| `student-highlights` (baru) | Media sorotan | Private, terbuka bagi murid dan orang tua terkait setelah terbit |

Validasi jenis MIME dan ukuran berkas di sisi server. Tidak ada bucket publik untuk data murid.

---

## 9. Akses, RLS, dan audit

**Larangan mutlak:** menyembunyikan menu atau tombol di antarmuka **bukan** keamanan. Setiap aturan di bawah ditegakkan di database.

### 9.1 Matriks akses

V lihat, C buat, U ubah, D hapus, A setujui atau terbitkan, E ekspor. Sesuai `RBAC MATRIX SI STIR`.

| Data | Guru (kelas sendiri) | Guru lain | Kepala Sekolah | Admin | Murid | Orang tua |
|---|---|---|---|---|---|---|
| Peta kurikulum dan paket | V, C(TP guru), U(TP guru) | V paket | V, A(verifikasi paket) | C, U (impor) | tidak | tidak |
| Modul ajar | V, C, U, E | tidak | V (setelah diajukan), A | tidak | tidak | tidak |
| Jurnal mengajar | V, C, U | tidak | V (setelah diajukan) | tidak | tidak | tidak |
| Absen kelas | V, C, U, E | tidak | V, E | tidak | V (milik sendiri) | V (anak terverifikasi) |
| Asesmen dan nilai (draf) | V, C, U | tidak | V (agregat) | tidak | tidak | tidak |
| Nilai terbit | V, U, A (tarik) | tidak | V | tidak | V (milik sendiri) | V (anak terverifikasi) |
| Pita literasi dan numerasi | V, C, U | tidak | V (agregat) | tidak | tidak | V (ringkasan, setelah terbit) |
| Kelompok belajar | V, C, U | tidak | V (agregat) | tidak | tidak | tidak |
| Pengamatan murid (pribadi) | V, C, U | tidak | **tidak** | tidak | tidak | tidak |
| Catatan Pribadi guru | V, C, U, D | tidak | **tidak** | tidak | tidak | tidak |
| Sorotan dan pesan semangat | V, C, U | tidak | V | tidak | V (terbit) | V (terbit) |
| Projek kokurikuler | V, C, U | hanya projek yang dibagikan | V | tidak | V (milik sendiri, terbit) | V (terbit) |
| Berkas perangkat | V, C, U | tidak | V, A | tidak | tidak | tidak |
| Hasil supervisi | V (setelah dipublikasikan) | tidak | V, C, U, A | tidak | tidak | tidak |

Catatan: Admin tidak otomatis mempunyai wewenang akademik (RBAC bagian 2.2). Satu akun satu peran (keputusan proyek).

### 9.2 Contoh kebijakan (ilustrasi, belum final)

```sql
-- Fungsi bantu: apakah pengguna wali kelas dari kelas ini
create or replace function public.is_homeroom_teacher(p_class_id uuid)
returns boolean
language sql stable security definer
set search_path = public
as $$
  select exists (
    select 1
    from classes c
    join teachers t on t.id = c.homeroom_teacher_id
    where c.id = p_class_id
      and t.user_id = auth.uid()
  );
$$;

-- Catatan Pribadi: hanya pemilik
alter table teacher_private_notes enable row level security;
create policy "pemilik saja" on teacher_private_notes
  for all to authenticated
  using (owner_user_id = auth.uid())
  with check (owner_user_id = auth.uid());

-- Nilai: murid hanya melihat nilai yang sudah terbit dan miliknya
alter table assessment_results enable row level security;
create policy "murid lihat nilai terbit" on assessment_results
  for select to authenticated
  using (
    published_at is not null
    and student_id in (select id from students where user_id = auth.uid())
  );

-- Pengamatan murid: guru kelas sendiri, selalu terbatas pada pembuatnya
alter table student_observations enable row level security;
create policy "pembuat dan wali kelas" on student_observations
  for all to authenticated
  using (teacher_id in (select id from teachers where user_id = auth.uid())
         and public.is_homeroom_teacher(class_id))
  with check (teacher_id in (select id from teachers where user_id = auth.uid())
              and public.is_homeroom_teacher(class_id));
```

Peringatan dari Database Blueprint tetap berlaku: fungsi cek peran harus dibuat hati hati agar tidak memicu rekursi RLS atau membuka akses yang tidak seharusnya. Fungsi `security definer` wajib mengunci `search_path`.

### 9.3 Audit

Dicatat di `audit_logs`: menerbitkan atau menarik nilai, koreksi absen, mengajukan dan menyetujui modul, membagikan pengamatan ke orang tua, membuka Profil Murid, ekspor data, perubahan TP bawaan, perubahan aturan Perlu Perhatian. Tidak mencatat kata sandi, token, atau isi Catatan Pribadi.

### 9.4 Privasi data murid

- Kumpulkan seperlunya. Catatan murid memakai kategori, bukan teks bebas panjang.
- Foto murid hanya dengan izin yang tercatat **[Konfirmasi K5]**.
- Data kebutuhan khusus belajar dan kesehatan tidak masuk ke Ruang Pribadi pada tahap awal. Bila diperlukan, dirancang terpisah dengan persetujuan sekolah.
- Orang tua hanya melihat anak yang sudah diverifikasi sekolah.

---

## 10. Responsif, aksesibilitas, performa

### 10.1 Titik lebar (mengikuti `DESIGN.md` bagian 5)

| Lebar | Tata letak Ruang Pribadi |
|---|---|
| 360 sampai 428 px | Satu kolom. Menu modul berupa kisi 2 kolom. Tabel menjadi kartu bertumpuk. Tombol aksi lekat di bawah pada formulir. Absen dan penilaian satu tangan |
| 768 px | Dua kolom. Rel navigasi ramping dengan ikon dan label. Kisi menu 3 kolom |
| 1280 px ke atas | Sidebar 9 modul. Kisi kartu 3 sampai 4 kolom. Tabel penuh untuk murid dan penilaian |

Tidak ada gulir menyamping di halaman mana pun. Tabel lebar berubah menjadi kartu di bawah 768 px.

### 10.2 Perilaku per modul di ponsel

| Modul | Perilaku |
|---|---|
| Absen Cepat | Baris minimal 56 px, pilihan status lewat panel bawah selebar layar, tombol Simpan Absen lekat |
| Input Penilaian | Satu murid per kartu, tombol berikutnya dan sebelumnya, progres terlihat |
| Penyusun Modul Ajar | Satu langkah per layar, bilah langkah di atas, Simpan Draf lekat |
| Peta Kurikulum | Daftar TP berupa akordeon per mata pelajaran |
| Pita Literasi | Level dipilih lewat deretan tombol besar, bukan menu tarik |

### 10.3 Aksesibilitas

- Teks isi minimal 16 px, target sentuh minimal 44 px (48 px untuk tombol utama), kontras WCAG AA.
- Cincin fokus oranye tebal pada setiap elemen interaktif.
- Setiap ikon punya label teks. Status tidak hanya berbasis warna.
- Seluruh fungsi dapat dijalankan dengan keyboard dan pembaca layar. Panel bawah dan dialog menangkap dan mengembalikan fokus.
- Mode gelap otomatis sesuai `DESIGN.md` bagian 2.

### 10.4 Performa untuk jaringan sekolah daerah [Asumsi target]

- Pemisahan kode per modul (route level code splitting). Layar pertama tidak memuat modul lain.
- Target awal: halaman Hari Ini siap dipakai kurang dari 3 detik pada jaringan 3G lambat, JavaScript layar pertama di bawah 200 KB terkompresi. Angka ini perlu diukur dan disesuaikan.
- Tanpa gambar besar. Ikon dari vektor ringan. Foto diperkecil di perangkat sebelum diunggah.
- Daftar murid dan penilaian memakai pagination atau pemuatan bertahap, memilih kolom yang diperlukan saja.
- Offline hanya untuk draf absen dan jurnal. Fitur lain menampilkan *Perlu sinyal untuk bagian ini.*

---

## 11. Microcopy

Mengikuti `DESIGN.md` bagian 9: sapaan **Anda** untuk guru, **kamu** untuk murid, panggilan **Ibu**, kalimat pendek, tombol berawal kata kerja, **tanpa tanda hubung atau tanda pisah panjang** pada teks antarmuka.

### 11.1 Tombol

Isi Absen Sekarang, Semua Hadir, Simpan Absen, Konfirmasi Laporan, Isi Jurnal Mengajar, Simpan Draf, Ajukan ke Kepala Sekolah, Terbitkan Nilai, Tarik Nilai, Susun Kelompok Dukungan, Susun Kelompok Pengayaan, Kirim Pesan Semangat, Kirim Pesan ke Orang Tua, Catat Pengamatan, Catat Tindak Lanjut, Tambah Tujuan Sendiri, Buka Ruang Pribadi, Kembali ke Hari Ini, Unggah Berkas, Terbitkan ke Orang Tua.

### 11.2 Pesan sistem

| Situasi | Teks |
|---|---|
| Sedang menyimpan | Sebentar ya, sedang disimpan. |
| Tersimpan | Tersimpan. |
| Menunggu sinyal | Belum terkirim. Akan dikirim saat sinyal kembali. |
| Kolom kosong | Kolom ini belum diisi. |
| Skor melebihi maksimum | Skor tidak boleh lebih dari nilai maksimum. |
| Nilai diterbitkan | Nilai sudah terlihat oleh murid dan orang tua. |
| Nilai ditarik | Nilai ditarik. Murid dan orang tua tidak lagi melihatnya. |
| Modul diajukan | Modul sudah diajukan ke Ibu Kepala Sekolah. |
| Tidak ada murid perlu perhatian | Hari ini tidak ada murid yang perlu disapa. Bagus sekali. |
| Draf supervisi belum terbit | Hasil supervisi akan tampil setelah dipublikasikan. |
| Data tiruan | Data contoh |

### 11.3 Kondisi kosong

| Layar | Kalimat | Tombol |
|---|---|---|
| Daftar Rencana | Belum ada modul ajar. Mulai dari satu tujuan pembelajaran. | Buat Modul Ajar |
| Jurnal | Belum ada jurnal minggu ini. | Isi Jurnal Mengajar |
| Kelompok Belajar | Belum ada kelompok. Hasil asesmen akan membantu menyusunnya. | Buka Asesmen |
| Sorotan | Belum ada sorotan bulan ini. | Tambah Sorotan |
| Catatan Pribadi | Belum ada catatan. Hanya Anda yang bisa membacanya. | Tulis Catatan |

---

## 12. Data contoh untuk prototipe

Semua data bertanda badge **Data contoh**.

- Guru: Ibu Darmiati, S.Pd (Kelas 1). Lima wali kelas lain sesuai `DESIGN.md` bagian 10, dipakai untuk menguji paket Kelas 2 sampai 6.
- Kelas 1: 30 murid. Murid bernama hanya **Aisyah**. Murid lain disembunyikan dengan keterangan "29 murid lain tidak ditampilkan dalam contoh", sejalan dengan keputusan demo tanpa nama murid. Kelas 2 memakai **Fajar**.
- Orang tua: Ibu Rina (dua anak: Aisyah dan Fajar).
- Tugas contoh: Bahasa Indonesia *Menulis namamu sendiri lima kali*. Matematika *Menghitung benda di rumah sampai 20*.
- Status modul: Draf, Diajukan, Disetujui, Perlu revisi, dengan satu modul contoh per status.
- Status tugas murid: Belum dikerjakan, Sudah dikirim, Sudah diperiksa, Perlu diperbaiki.
- TP contoh: tiga TP per mata pelajaran inti per Paket Kelas, ditandai Data contoh.
- Tanpa Lorem Ipsum di mana pun.

---

## 13. Kriteria penerimaan

Fitur dinyatakan selesai hanya bila seluruh butir yang berlaku lulus dan diuji, bukan dilihat sekilas.

### 13.1 Fungsi

- [ ] Setiap tombol di Ruang Pribadi menyimpan atau mengubah data sungguhan. Tidak ada data tiruan di luar mode contoh.
- [ ] Absen 30 murid terisi dalam kurang dari 60 detik pada ponsel, satu tangan.
- [ ] Satu murid tidak dapat memiliki dua catatan di sesi absen yang sama.
- [ ] Laporan orang tua tampil dengan chip *Diajukan* dan hanya menjadi final setelah guru mengonfirmasi.
- [ ] Skor di atas nilai maksimum ditolak oleh database, bukan hanya oleh layar.
- [ ] Nilai baru tidak terlihat murid dan orang tua sebelum Terbitkan Nilai. Setelah Tarik Nilai, nilai hilang dari tampilan mereka.
- [ ] Modul berstatus Draf tidak muncul di Ruang Kepala Sekolah. Setelah Ajukan, muncul. Perubahan setelah diajukan membuat versi baru.
- [ ] Menandai TP *Tuntas* memperbarui bilah kemajuan di Hari Ini.
- [ ] Draf absen dan jurnal bertahan tanpa sinyal, berlabel Belum terkirim, dan terkirim sekali saja (tanpa duplikat) saat sinyal kembali.
- [ ] Aturan Perlu Perhatian menghasilkan kartu yang benar pada data uji, dan tindak lanjut muncul di Tugas minggu ini.
- [ ] Tidak ada tampilan peringkat antar murid di layar guru, murid, maupun orang tua.

### 13.2 Keamanan (diuji dengan akun setiap peran)

- [ ] Ibu Darmiati (Kelas 1) tidak dapat membaca atau menulis data murid Kelas 2 sampai 6 lewat antarmuka maupun API langsung.
- [ ] Catatan Pribadi dan pengamatan murid tidak terbaca oleh Kepala Sekolah, Admin, guru lain, murid, dan orang tua.
- [ ] Matriks bagian 6A.5 lulus untuk keenam akun: setiap wali kelas membuka isi penuh hanya pada kelasnya, dan hanya melihat nama wali serta jumlah murid pada lima kelas lain, lewat antarmuka maupun API langsung.
- [ ] Mengganti wali kelas memindahkan akses data kelas ke wali baru tanpa memindahkan Catatan Pribadi guru lama.
- [ ] Murid tidak dapat membaca nilai yang belum terbit, juga lewat pemanggilan API langsung.
- [ ] Orang tua hanya melihat anak yang relasinya terverifikasi.
- [ ] Guru lain tidak dapat membuka berkas bucket `teacher-documents` milik guru lain.
- [ ] Kunci `service_role` tidak ada di kode antarmuka maupun repositori.
- [ ] Setiap tabel baru memiliki RLS aktif dan minimal satu kebijakan teruji.
- [ ] Audit log mencatat peristiwa di bagian 9.3 dan tidak memuat rahasia autentikasi.

### 13.3 Kurikulum

- [ ] Paket Kelas 1 sampai 6 tampil sesuai kelas wali yang masuk: judul ruang, sapaan, tiga prioritas awal, dan projek contoh sesuai bagian 6A.3.
- [ ] Nama lengkap wali kelas tampil persis seperti bagian 6A.2, dengan sapaan Ibu di depan.
- [ ] Isi kurikulum bertanda Data contoh sampai Kepala Sekolah menandai terverifikasi.
- [ ] Mata pelajaran dan JP dapat diubah tanpa mengubah kode.
- [ ] Koding dan KA hanya tampil di Kelas 5 dan 6, dan hanya bila diaktifkan sekolah.
- [ ] TP bawaan tidak bisa dihapus guru, hanya dinonaktifkan. TP buatan guru bisa disunting.

### 13.4 Responsif dan aksesibilitas

- [ ] Diuji pada 360, 390, 428, 768, 1280 px. Tidak ada gulir menyamping.
- [ ] Target sentuh minimal 44 px dan 48 px untuk tombol utama.
- [ ] Kontras AA pada mode terang dan gelap.
- [ ] Seluruh alur utama bisa dijalankan dengan keyboard.
- [ ] Teks antarmuka tidak memuat tanda hubung atau tanda pisah panjang, tidak memuat Lorem Ipsum.

### 13.5 Uji pengguna

- [ ] Enam wali kelas masing masing menyelesaikan lima tugas (isi absen, tulis jurnal, ajukan modul, input nilai formatif, buat kelompok dukungan) tanpa dibantu. Catat waktu dan titik bingung.

---

## 14. Urutan pembangunan

Mengikuti roadmap proyek dan prinsip keamanan lebih dulu dari integrasi.

| Fase proyek | Isi Ruang Pribadi |
|---|---|
| 1. Fondasi | Auth, RBAC, RLS dasar, tabel `classes` dan penugasan. Fungsi `is_homeroom_teacher`. Pengujian akses akun enam wali kelas |
| 2. Administrasi inti | RG01 Hari Ini, RG02 dan RG03 Kelas dan Absen, RG05 dan RG06 Peta Kurikulum, RG07 sampai RG09 Rencana dan Jurnal, RG19 tab Berkas, RG20 Catatan Pribadi |
| 3. Supervisi akademik | RG19 tab Hasil Supervisi dan tindak lanjut |
| 4. Pembelajaran dan perkembangan murid | RG04 Profil Murid, RG10 sampai RG12 Asesmen dan Kelompok, RG13 Pita, RG14 sampai RG16 Karakter dan Projek, RG17 dan RG18 Penghubung dan Laporan |
| 5. Integrasi dan optimasi | Ekspor Excel, tombol WhatsApp click to chat, projek bersama antar kelas, notifikasi |
| 6. Kesiapan produksi | Uji menyeluruh bagian 13, tinjauan keamanan, uji pengguna enam guru, dokumentasi |

**Potongan MVP bila waktu terbatas** (yang paling cepat terasa oleh guru dan murid): Hari Ini, Absen Cepat, Peta Kurikulum, Penyusun Modul Ajar, Jurnal, Catatan Pribadi, lalu Asesmen formatif dengan Kelompok Belajar.

**Sengaja tidak dibuat pada tahap ini**

- Peringkat antar murid atau antar kelas.
- Pengganti aplikasi rapor atau Dapodik.
- Teks laporan yang dibuat AI tanpa suntingan guru. Opsi bantuan AI untuk draf modul dapat dipertimbangkan nanti dengan aturan: tidak mengirim data pribadi murid ke layanan luar, guru yang memutuskan.
- Pelacakan lokasi (GPS) untuk absen.
- WhatsApp Business API.
- Aplikasi ponsel asli.

---

## 15. Keputusan terbuka dan risiko

### 15.1 Keputusan yang perlu dari sekolah

| ID | Pertanyaan | Dampak bila belum diputuskan |
|---|---|---|
| K1 | Apakah Kepala Sekolah boleh membaca lapis "Hanya Anda"? Usulan: tidak | Menentukan label dan kebijakan RLS lapis 1 |
| K2 | Versi 20 layar atau dipadatkan jadi 16 layar? | Menentukan prompt Stitch dan jumlah halaman |
| K3 | Daftar status absen final (hadir, sakit, izin, alpa, terlambat, dispensasi) | Mengunci pilihan di Absen Cepat |
| K4 | Siapa yang menyetujui koreksi absen hari berikutnya? | Alur `attendance_corrections` |
| K5 | Aturan izin foto murid | Fitur foto di jurnal, projek, dan sorotan |
| K6 | Pasangan label capaian guru dan label untuk murid dan orang tua | Wording rapor dan Ruang Murid |
| K7 | Jam balasan pesan guru ke orang tua | Teks bantu di Ruang Penghubung |
| K8 | Ketentuan asesmen akhir jenjang dan Tes Kemampuan Akademik tahun ajaran ini | Isi Paket Kelas 6 |
| K9 | Apakah Kepala Sekolah melihat data murid per orang atau hanya agregat? | Kebijakan RLS untuk indikator dampak |
| K10 | URL repositori lama dan baru, dan apakah Supabase lama berisi data nyata | Audit skema sebelum migrasi (Fase 0) |
| K11 | Nama pengguna lima wali kelas selain darmiati (usulan: fadilatul, trin, waode, ima, pipit) | Akun demo dan layar Masuk |
| K12 | Aturan guru pengganti sementara dan siapa yang memberi izin | Alur akses sementara di bagian 6A.6 |

### 15.2 Risiko dan penanganan

| Risiko | Penanganan |
|---|---|
| Isi kurikulum di layar tidak sama dengan dokumen CP resmi | Badge Data contoh, penanda terverifikasi oleh Kepala Sekolah, impor dari dokumen resmi, versi kurikulum |
| Beban pengisian membuat guru berhenti memakai | Kerja harian di bawah 3 menit, impor Excel, templat, uji dengan enam guru |
| Data murid bocor lewat API karena kebijakan salah | RLS di semua tabel, uji lintas peran otomatis, tinjauan keamanan Fase 6 |
| Label capaian menyakiti murid atau orang tua | Dua set label, murid tidak melihat "Perlu bimbingan", tanpa peringkat |
| Sinyal buruk menghilangkan data | Draf lokal untuk absen dan jurnal, label Belum terkirim, pengiriman ulang tanpa duplikat |
| Guru merasa diawasi lewat "pribadi" yang tidak pribadi | Tiga lapis terlihat di setiap isian, lapis 1 tertutup untuk Kepala Sekolah |
| Isi paket Kelas terlalu preskriptif | Semua isi bisa disalin, disunting, dan dinonaktifkan oleh guru |
| Desain Stitch yang sudah disetujui berubah | Semua komponen memakai token dan komponen `DESIGN.md`. Hanya menambah layar |

---

## 16. Sumber

Fakta kurikulum pada bagian 2.1 berasal dari pemberitaan dan ringkasan sosialisasi berikut, bukan dari teks resmi yang dibaca langsung:

- [Permendikdasmen 13/2025, ringkasan sosialisasi](https://www.imrantululi.net/read/289/sosialisasi-permendikdasmen-nomor-13-tahun-2025-transformasi-kurikulum-untuk-pembelajaran-mendalam) (pembelajaran mendalam, profil lulusan, kokurikuler, Koding dan KA mulai Kelas 5, Pramuka wajib, asesmen)
- [Guru Inovatif, isi Permendikdasmen 13/2025](https://guruinovatif.id/artikel/resmi-tidak-ganti-kurikulum-inilah-isi-lengkap-permendikdasmen-no-13-tahun-2025) (tidak ada pergantian kurikulum, Koding dan KA pilihan Kelas 5 dan 6, kokurikuler, kepramukaan)
- [Guru Inovatif, CP terbaru 2025](https://guruinovatif.id/artikel/bskap-terbitkan-cp-terbaru-2025-struktur-pembelajaran-mata-pelajaran-koding-ai-di-kurikulum-merdeka) (Keputusan BSKAP 046/H/KR/2025, Fase A, B, C)
- [JPNN, Mapel Koding dan KA](https://www.jpnn.com/news/kemendikdasmen-mapel-koding-dan-kecerdasan-artifisial-berlaku-tahun-ini-dimulai-sd) (pernyataan Menteri bahwa Permendikdasmen 13/2025 bukan kurikulum baru)

Dokumen proyek yang dipakai: `DESIGN (1).md`, `Database_Blueprint_SI_STIR_HEBAT.docx`, `RBAC MATRIX SI STIR.docx`, project instructions.

**Untuk menutup bagian 2.2:** unduh teks Keputusan Kepala BSKAP 046/H/KR/2025 dan struktur kurikulum SD dari situs resmi Kemendikdasmen (JDIH), lalu minta Kepala Sekolah mencocokkan Paket Kelas.
