# DESIGN.md: SI STIR HEBAT

## 1. Identitas Produk & Sekolah (Identity)
- **Nama Produk**: **SI STIR HEBAT** *(Dilarang menuliskan "SI SETIR" atau hanya "SI STIR")*.
- **Kepanjangan Resmi**: Sistem Informasi Supervisi Terintegrasi, Ruang Harmonis Edukatif, Bersama Wujudkan Anak Indonesia Hebat.
- **Deskripsi**: Satu platform dengan empat ruang: Ruang Kepala Sekolah, Ruang Guru, Ruang Murid, Ruang Orang Tua. Admin sekolah mengelola akun dan data induk.
- **Satuan Pendidikan**: SDN 03 Wonosari.
- **NPSN**: 40500185.
- **Alamat Sekolah**: Jln. Lingkar, Makmur, Wonosari, Kabupaten Boalemo, Gorontalo 96262.
- **Kepala Sekolah**: Ibu Khoyum Supardi, S.Pd.SD, M.Pd.
- **Tagline / Label Wajib**: Label kecil *"Tumbuh Bersama"* hadir di setiap header layar.
- **Karakter & Suasana (Mood)**: Segar, rapi, ramah, dan bernuansa *Neo-Tactile* / Gen Z edukatif namun tetap profesional dan bersahabat. Ceria untuk anak-anak, tenang dan tertata untuk dewasa. Bukan portal instansi abu-abu yang kaku.
- **Bahasa Antarmuka**: Seluruh teks antarmuka menggunakan Bahasa Indonesia baku, santun, dan komunikatif.

---

## 2. Palet Warna (Color System)
Sistem warna mengikat ketat (hanya menggunakan palet berikut):

| Peran Token | Nilai Hex | Penggunaan Utama |
|---|---|---|
| **Mint** | `#8AD6D1` | Kartu peran murid, latar lembut penanda ceria |
| **Teal** | `#359FA0` | Aksen struktural dan garis strip identitas |
| **Cream** | `#FFF0C5` | Latar belakang halaman utama (*page background*) dan label kapsul |
| **Orange** | `#FF8C52` | Tombol aksi utama (*primary CTA*) dan penanda status terpilih (*active/selected*) |
| **Deep Teal** | `#12383A` | Seluruh teks antarmuka dan garis tepi (*border*) |
| **Surface** | `#FFFAE6` | Kartu utama di atas latar cream |
| **Field** | `#FFFFFF` | Latar kolom input dan kartu kontras |

### Status Chips (Latar / Teks):
- **Draf & Belum dikerjakan**: `#EADFB8` / `#4B4524`
- **Diajukan & Sudah dikirim**: `#CFEFEC` / `#12383A`
- **Disetujui & Sudah diperiksa**: `#CDEFD0` / `#174D1F`
- **Perlu revisi & Perlu diperbaiki**: `#FFD9C2` / `#7A2E00`

### Aturan Kontras & Dark Mode:
- **Kontras**: Teks pada bidang Orange adalah Deep Teal. Teks pada Mint adalah Deep Teal. Dilarang menempatkan teks body berwarna putih atau cream di atas Teal.
- **Motif Khas (Signature Motif)**: Pita tipis 4 garis sejajar horizontal berurutan *(Mint, Teal, Cream, Orange)* tepat di bawah bilah navigasi / header.
- **Mode Gelap (Otomatis)**: Latar `#0E2A2C`, Surface `#163A3D`, Kartu Mint `#1F5254`, Teks `#FFF0C5`, Border `#8AD6D1`, Shadow `#04171A`. Aksen Orange dan Teal tetap sama.

---

## 3. Tipografi (Typography)
- **Keluarga Huruf**: **Plus Jakarta Sans** untuk seluruh teks antarmuka. Emoji digunakan sebagai aksen visual ramah.
- **Skala Ukuran & Bobot**:
  - **H1**: Bobot 800 (ExtraBold), ukuran 36 px sampai 48 px.
  - **H2**: Bobot 800 (ExtraBold), ukuran 28 px sampai 32 px.
  - **H3**: Bobot 800 (ExtraBold), ukuran 20 px.
  - **Body**: Bobot 500 (Medium), minimal 16 px, line height 1.5. Tidak boleh kurang dari 16 px untuk teks keterbacaan.
  - **Tombol**: Bobot 700 (Bold), ukuran 16 px.
  - **Tag & Label Kapsul**: Bobot 800, ukuran 13 px, kapital (*uppercase*), letter spacing 0.06em.
- **Panjang Baris**: Maksimal 65 karakter per baris agar nyaman dibaca.

---

## 4. Bentuk & Elevasi (Shape & Elevation)
- **Kartu (Cards)**: Radius 24 px (kartu besar 28 px), border 2 px solid Deep Teal (`#12383A`), bayangan tegas (*hard offset shadow*) **5 px 5 px 0 #12383A**. Tanpa blur, tanpa efek gradien kabur, tanpa glassmorphism.
- **Tombol (Buttons)**: Bentuk kapsul (*pill shape*), tinggi minimal 48 px, border 2 px solid Deep Teal, bayangan **3 px 3 px 0 #12383A**. Kondisi ditekan (*active/pressed*) bergeser 3 px ke bawah dan kanan serta menghilangkan offset bayangan.
- **Kolom Isian (Inputs)**: Radius 16 px, border 2 px solid Deep Teal, tinggi minimal 48 px.
- **Status Chip**: Kapsul lonjong, border 2 px, teks 14 px bold.
- **Stiker Emoji**: Ukuran 32 px sampai 36 px (khusus Ruang Murid berukuran 40 px).

---

## 5. Tata Letak & Spasi (Spacing & Layout)
- **Satuan Dasar**: Grid 8 px (Skala: 4, 8, 12, 16, 24, 32, 48, 64 px).
- **Kontainer Halaman**: Lebar maksimal 1120 px, *side gutter* minimal 16 px.
- **Responsif**:
  - *Mobile (360–428 px)*: Tata letak satu kolom, navigasi bawah (*bottom bar*), area sentuh besar, tombol aksi lekat (*sticky action*) pada formulir.
  - *Tablet (768 px)*: Dua kolom dengan rel navigasi ramping.
  - *Desktop (1280 px ke atas)*: Sidebar dalam ruang kerja, kisi kartu 3 sampai 4 kolom.
- **Aturan Bebas Geser**: Dilarang ada gulir horizontal (*no horizontal scroll*). Tabel berganti menjadi kartu bertumpuk pada layar sempit.

---

## 6. Navigasi Global (Navigation)
- **Header Bersama (Desktop Web)**:
  - Logo SI STIR HEBAT dengan kapsul *"Tumbuh Bersama"*.
  - Menu tautan: Beranda, Tentang, Murid, Orang Tua, Guru, Kepala Sekolah, Bantuan.
  - Tombol aksi: *"Masuk"* (atau *"Keluar"* saat pengguna berada di sesi aktif).
- **Header & Bar Bawah (Mobile)**:
  - Header memuat logo dan tombol Masuk.
  - Navigasi bawah dengan 5 item: Beranda, Murid, Orang Tua, Guru, Kepala Sekolah (ikon + label teks; status aktif berlatar Deep Teal dengan teks Cream).
- **Footer Bersama**:
  - Slogan: *"SI STIR HEBAT, tumbuh bersama setiap hari."*
  - Data identitas: *"SDN 03 Wonosari | NPSN 40500185"*, alamat lengkap di Boalemo Gorontalo, serta tombol tautan *"Kontak sdn03wonosari@sekolah.id"*.
  - Badge akreditasi/nilai: *"Pendidikan Berkarakter dan Terbuka"*.
- **Pintu Akses Peran (Gate Card)**: Jika pengguna belum masuk membuka ruang khusus, tampilkan kartu gerbang: *"Ruang ini perlu akun"* dengan tombol *"Masuk ke SI STIR HEBAT"*. Kepala sekolah memiliki akses peninjauan ke seluruh ruang.

---

## 7. Komponen Antarmuka (Components)
1. **Tombol (Buttons)**:
   - Tombol Utama (*Primary*): Latar Orange `#FF8C52`.
   - Tombol Sekunder (*Secondary*): Latar Surface dengan border 2 px Deep Teal.
   - Varian Kecil: Tinggi 44 px.
   - Status: Default, Hover, Ditekan (offset 3px), Nonaktif (opasitas 55%), Fokus (outline 3 px orange, offset 3 px).
2. **Kartu Peran (Role Cards)**: Pilihan tema Mint atau Surface, stiker emoji penanda, H3 nama ruang, keterangan singkat, dan tombol tindakan.
3. **Baris Checklist (Jurnal Kebiasaan)**: Tinggi minimal 56 px, kotak centang tegas, label tebal dan keterangan singkat. Kondisi tercentang berubah menjadi aksen hijau lembut dengan centang oranye.
4. **Indikator Kemajuan (Progress Bar)**: Kapsul tinggi 16 px, isi oranye solid, dilengkapi teks progres jelas seperti *"3 dari 7 selesai. Sedikit lagi!"*.
5. **Tab Navigasi**: Tab berbentuk kapsul pill, status aktif terisi Deep Teal dengan teks Cream. Boleh memiliki lencana hitungan angka oranye.
6. **Gelembung Pesan (Ruang Penghubung)**: Pesan orang tua pada bidang Surface, balasan guru menjorok ke dalam dengan aksen warna pendukung.
7. **Notifikasi Mengambang (Toast Notification)**: Kapsul pill Deep Teal, teks tebal Cream, melayang di bagian tengah, durasi 3 detik.
8. **Kondisi Kosong (Empty State)**: Kotak bergaris putus-putus (*dashed*), satu kalimat bersahabat, satu tombol langkah berikutnya.
9. **Formulir Validasi**: Label di atas kolom input, teks pembantu opsional, teks kesalahan inline *"Kolom ini belum diisi."*, tombol simpan dengan kata kerja aktif.
10. **Toolbar Arsip Dokumen**: Kolom pencarian teks, pilihan tahun ajaran, dan tombol aksi *"Unggah Dokumen"*.
11. **Akordeon Bantuan (FAQ)**: Kartu rapi dengan nomor bulat dan ikon buka/tutup (+ / -), ringkasan tinggi 52 px.
12. **Status Memuat (Loading State)**: Teks bersahabat: *"Sebentar ya, sedang dibuka."*.
13. **Kartu Kelas (Class Card)**: Kartu Surface dengan stiker emoji, H3 nama kelas, baris *"Wali kelas: Ibu ..."*, jumlah murid, chip status singkat, dan tombol *"Buka Kelas"*. Dipakai pada Ruang Guru dan Ruang Murid.
14. **Stepper Supervisi**: Empat langkah kapsul berurutan (Pra Observasi, Observasi, Pasca Observasi, Tindak Lanjut). Langkah aktif berlatar Orange, langkah selesai berlatar chip Disetujui, langkah belum mulai berlatar chip Draf.

---

## 8. Karakter Khusus Tiap Ruang (Room Personalities)
1. **Ruang Murid (Siswa)**: Paling ceria. Kartu hero mint cerah, stiker emoji 40 px, target sentuh minimal 56 px, bilah kemajuan besar, sapaan hangat *"kamu"*.
2. **Ruang Orang Tua**: Tenang dan mengutamakan keterbacaan (*read first*). 4 kartu rangkuman harian anak di bagian atas, formulir refleksi mingguan *"Ceritakan dari rumah"*, dan thread komunikasi santun *"Ruang Penghubung"*.
3. **Ruang Guru (Ibu Darmiati, S.Pd)**: Rapi, tertata, efisien. Latar cream, kartu surface netral, daftar modul ajar, asesmen tugas siswa, catatan supervisi, dan sapaan santun *"Anda"*. Memuat bagian **Daftar Kelas** dengan enam kartu kelas beserta nama wali kelas (lihat bagian 12).
4. **Ruang Kepala Sekolah (Ibu Khoyum Supardi, S.Pd.SD, M.Pd)**: Berwibawa, strategis, dan komprehensif. Metrik supervisi sekolah, persetujuan modul ajar (*Setujui* / *Perlu Revisi*), direktori seluruh guru kelas, serta arsip dokumen resmi (KSP, RKT, RKAS).

---

## 9. Kaidah Bahasa & Tata Tulis (Strict Writing Rules)
1. **Kata Sapaan**: Gunakan kata **"kamu"** untuk murid. Gunakan kata **"Anda"** untuk orang tua, guru, dan kepala sekolah.
2. **Panggilan Tenaga Pendidik**: Seluruh guru adalah wanita. Selalu sematkan sapaan penghormatan **"Ibu"** di depan nama guru maupun kepala sekolah.
3. **Struktur Kalimat**: Kalimat pendek dan lugas. Satu gagasan utama per kalimat.
4. **Gaya Judul**: Santun, komunikatif, dan rileks.
5. **Larangan Tanda Baca**: **DILARANG KERAS** menggunakan tanda hubung (`-`) dan tanda pisah panjang pada seluruh teks tampilan antarmuka.
6. **Larangan Pola Klise**: Hindari pola bahasa kaku seperti *"dari A ke B"*, *"tidak hanya A tetapi juga B"*, atau deretan tiga kata sifat beruntun.
7. **Kosakata Konkret**: Gunakan istilah langsung dan nyata *(absen, jurnal, tugas, modul)*. Hindari kata-kata muluk seperti *revolusi* atau *transformasi*.
8. **Label Tombol**: Semua label tombol diawali kata kerja aktif *(Kumpulkan Tugas, Kirim Refleksi, Tambah Karya, Aku Hadir, Unggah Dokumen, Setujui Modul)*.
9. **Bebas Teks Semu**: Dilarang menggunakan *Lorem Ipsum*. Wajib menggunakan data contoh riil sekolah.

---

## 10. Data Contoh Resmi (Sample Data)
Semua data simulasi wajib diberi tanda/badge kecil **"Data contoh"**.

- **Kepala Sekolah**: Ibu Khoyum Supardi, S.Pd.SD, M.Pd.
- **Guru Kelas SDN 03 Wonosari**:
  - Kelas 1: Ibu Darmiati, S.Pd
  - Kelas 2: Ibu Fadilatul Jannah Samsuru, S.Pd
  - Kelas 3: Ibu Trin Sugiarti, S.Pd
  - Kelas 4: Ibu Waode Suriani, S.Pd
  - Kelas 5: Ibu Ima Kusmawati, S.Pd
  - Kelas 6: Ibu Pipit Nanda Suprapto, S.Pd
- **Data Murid & Orang Tua**:
  - Murid: Aisyah (Kelas 1), Fajar (Kelas 2).
  - Orang Tua: Ibu Rina (memiliki dua anak: Aisyah dan Fajar).
- **7 Kebiasaan Anak Indonesia Hebat**:
  1. Bangun pagi
  2. Beribadah
  3. Berolahraga
  4. Makan sehat dan bergizi
  5. Gemar belajar
  6. Bermasyarakat
  7. Tidur cepat
- **Status Tugas Siswa**: *Belum dikerjakan*, *Sudah dikirim*, *Sudah diperiksa*, *Perlu diperbaiki*.
- **Status Modul Ajar**: *Draf*, *Diajukan*, *Disetujui*, *Perlu revisi*.
- **Contoh Tugas Siswa**:
  - Bahasa Indonesia: *"Menulis namamu sendiri lima kali"*
  - Matematika: *"Menghitung benda di rumah sampai 20"*
- **Contoh Dokumen Arsip**: KSP, RKT, RKAS (khusus kepala sekolah), Kumpulan SK, Perjalanan Dinas.

---

## 11. Aksesibilitas & Performa Ringan (Accessibility & Performance)
- **Kontras WCAG AA**: Terjamin pada seluruh kombinasi teks dan latar.
- **Indikator Fokus Jelas**: Ring fokus tebal berwarna oranye kontras terlihat pada setiap elemen interaktif saat navigasi keyboard.
- **Label Aksesibilitas**: Setiap ikon grafis dilengkapi label teks pendamping.
- **Target Sentuh Ramah Jemari**: Minimal 44 px (48 px untuk tombol aksi utama).
- **Performa Koneksi Lemah**: Desain mengutamakan bentuk CSS murni, vektor ringan, dan bebas dari gambar berukuran besar agar dapat dimuat cepat pada jaringan internet sekolah daerah.

---

## 12. Ruang Guru: Enam Kelas dan Wali Kelas (Tambahan)
Bagian **Daftar Kelas** tampil di beranda Ruang Guru, tepat di bawah sapaan dan kartu tugas minggu ini. Isinya enam Kartu Kelas (komponen 13), satu kartu per kelas. Kisi 3 kolom di desktop, 2 kolom di tablet, 1 kolom bertumpuk di ponsel.

| Kelas | Wali kelas | Stiker |
|---|---|---|
| Kelas 1 | Ibu Darmiati, S.Pd | 🌱 |
| Kelas 2 | Ibu Fadilatul Jannah Samsuru, S.Pd | 🌿 |
| Kelas 3 | Ibu Trin Sugiarti, S.Pd | 🌼 |
| Kelas 4 | Ibu Waode Suriani, S.Pd | 🌻 |
| Kelas 5 | Ibu Ima Kusmawati, S.Pd | 🌳 |
| Kelas 6 | Ibu Pipit Nanda Suprapto, S.Pd | 🏅 |

Isi tiap kartu:
- H3 nama kelas, baris *"Wali kelas: Ibu ..."* dengan nama lengkap seperti tabel.
- Jumlah murid (contoh 30 murid, beri badge "Data contoh").
- Chip status singkat: *Absen hari ini sudah diisi* (chip Disetujui) atau *Absen hari ini belum diisi* (chip Draf).
- Tombol sekunder *"Buka Kelas"*. Halaman kelas memuat daftar murid, absen, tugas, dan nilai kelas itu.

Aturan tampilan:
- Kartu kelas milik guru yang sedang masuk diberi penanda *"Kelas Anda"* (kapsul Orange). Pada contoh, itu Kelas 1 milik Ibu Darmiati.
- Kartu kelas lain bersifat hanya lihat nama wali kelas dan jumlah murid. Isi kelas lain tidak dibuka untuk guru lain.
- Kepala sekolah melihat keenam kartu dengan akses peninjauan penuh.
- Guru PJOK dan PAI diberi dua kartu terpisah bertanda *"Guru mata pelajaran"* dengan nama dikosongkan dan badge *"Data contoh"*, karena penugasannya belum ditetapkan sekolah.
- Pada ponsel, kartu bertumpuk satu kolom dan tombol *"Buka Kelas"* selebar kartu dengan tinggi minimal 48 px.

---

## 13. Rincian Brief Tambahan (Tambahan)
**Tujuan produk.** Satu tempat untuk supervisi kepala sekolah, administrasi guru, absen, nilai, kebiasaan murid, dan komunikasi dengan orang tua.

**Lima pengguna.** Admin sekolah (akun dan data induk), Kepala Sekolah, Guru, Murid, Orang Tua. Setiap orang punya akun sendiri. Tidak ada pendaftaran mandiri. Masuk memakai email dan kata sandi. Akun murid memakai email internal, sehingga layar masuk boleh menerima NISN.

**Layar utama per ruang.**
- Ruang Kepala Sekolah: metrik supervisi, Stepper Supervisi empat tahap, persetujuan modul ajar (*Setujui Modul* / *Perlu Revisi*), direktori guru kelas, arsip KSP, RKT, RKAS, SK.
- Ruang Guru: tugas minggu ini, Daftar Kelas (bagian 12), modul ajar dengan status, absen siswa, asesmen dan nilai, hasil supervisi pribadi.
- Ruang Murid: checklist 7 Kebiasaan dengan bintang, tugas dengan status, jadwal, pengumuman.
- Ruang Orang Tua: 4 kartu ringkasan harian anak, formulir *"Lapor Anak Tidak Masuk"* (nama anak, alasan Sakit atau Izin atau Lainnya, tanggal, catatan singkat, foto surat dokter opsional), *"Ceritakan dari rumah"*, dan *"Ruang Penghubung"*.

**Aturan bisnis yang tampak di layar.**
- Nilai baru terlihat murid dan orang tua setelah dipublikasikan guru.
- Draf supervisi tidak terlihat guru sampai kepala sekolah mempublikasikan.
- Laporan orang tua baru menjadi catatan absen final setelah guru mengonfirmasi. Sebelum itu tampil dengan chip *Diajukan*.
- Data kebiasaan yang belum diisi ditampilkan netral, tidak sama dengan *tidak dilakukan*.
- Motivasi murid selalu positif: bintang, lencana, pesan semangat. Tidak ada hukuman digital, tidak ada peringkat antar murid.
- Orang tua hanya melihat anak yang sudah diverifikasi sekolah. Bila punya dua anak (contoh Ibu Rina), tampilkan pemilih anak di bagian atas.
- Layar tidak boleh menyatakan data tersimpan sebelum server mengonfirmasi. Tampilkan *"Sebentar ya, sedang disimpan."* lebih dulu.
- Draf absen yang belum terkirim diberi label *"Belum terkirim"*, berbeda dari data yang sudah tersimpan.

**Cakupan awal.** Tanpa aplikasi ponsel asli, tanpa pembayaran, tanpa banyak sekolah. WhatsApp hanya tombol hubungi sekolah (click to chat).

**Status tertunda.** Instrumen supervisi resmi, aturan keterlambatan, dan penugasan guru PJOK dan PAI belum ditetapkan sekolah. Tampilkan isi contoh dengan badge *"Data contoh"*.
