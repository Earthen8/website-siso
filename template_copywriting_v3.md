# Dokumen Copywriting Resmi Website SISO Prasmul (Company Profile BEM Fakultas)
**Dokumen Panduan & Konten Evergreen Siap Implementasi (Next.js 14+ & Django CMS Unfold)**  
*Project: Website Resmi SISO (STEM Prasetiya Mulya Innovation Student Organization)*  
*Acuan Utama: Anggaran Dasar & Anggaran Rumah Tangga (AD/ART) SISO Sekolah STEM Universitas Prasetiya Mulya*  
*Status Dokumen: **REVISI FINAL — Evergreen Company Profile (Berbasis AD/ART SISO)***

## 📌 Catatan Revisi Tim RnD untuk Tim Web Developer

Halo Tim Web Developer! Dokumen ini telah diperbarui secara menyeluruh berdasarkan **AD/ART SISO** dan arahan strategis terbaru dengan prinsip utama berikut:

1. **Positioning sebagai Company Profile SISO (BEM Fakultas):** Fokus seluruh narasi adalah memperkenalkan **SISO** sebagai organisasi kemahasiswaan eksekutif tingkat fakultas (setara BEM Fakultas) di lingkungan Sekolah STEM Universitas Prasetiya Mulya yang menjalankan fungsi **representasi, pengembangan, kolaborasi, dan pengabdian mahasiswa (STEMians)**—bukan mempromosikan pendaftaran kampus atau mengulang isi website akademik [Sekolah STEM Prasetiya Mulya](https://www.prasetiyamulya.ac.id/stem/).
2. **Copywriting Evergreen (Tahan Lama Lintas Tahun Kepengurusan):** Seluruh teks dirancang agar **tidak kedaluwarsa saat terjadi pergantian periode kepengurusan**. Tidak ada penyebutan tahun kepengurusan spesifik, nomor edisi acara (misalnya ditulis `Prog{r}amming` dan `InnoFair` tanpa embel-embel angka tahun/edisi), maupun nama individu pengurus di dalam teks statis.
3. **Berlandaskan AD/ART SISO:**
   - **Asas & Sifat (AD Pasal 1 & Pasal 3):** Otonom, Demokratis, Independen, Inklusif, Kolaboratif, Nirlaba, serta Non-Partisan & Non-Sektarian.
   - **6 Nilai Dasar Resmi (AD Pasal 5):** *Caring*, *Humility*, *Achieving*, *Integrity*, *Non-discrimination*, dan *Innovation*.
   - **9 Prinsip Kerja (AD Pasal 6):** *Partisipatif*, *Transparansi*, *Akuntabilitas*, *Student-Centered*, *Evidence-Based*, *Sinergi Kemitraan*, *Profesional & Efektif*, *Keberlanjutan*, serta *Kemandirian & Tanggung Jawab*.
   - **Struktur Kelembagaan (AD Pasal 10–13 & ART Pasal 12):** Terdiri atas *SISO Grand Assembly* (SGA) sebagai forum tertinggi, *Board of Advisor* (BoA), Badan Pengurus Harian (BPH), serta Unsur Pelaksana (Departemen & *Event Planner*).
4. **Penghapusan Program STEM INC:** Seluruh referensi ke program *STEM INC* telah dihapus karena program tersebut sudah ditutup, digantikan dengan fokus pada program aktif dan fungsi kelembagaan SISO (*InnoFair*, *Prog{r}amming*, *Science Fun Day*, *Perspective*, *Welcoming Night*, *SISO Day*, dan *SISO Grand Assembly*).
5. **Penonaktifan Bagian Prestasi Lama:** Sesuai arahan, daftar prestasi lama dihapus dari dokumen ini agar website tetap fokus pada profil kelembagaan SISO. Komponen *Achievement* di halaman Home dan halaman Artikel diberi penanda **Opsional / Dapat Di-toggle Off di CMS** sampai ada data baru yang relevan dengan program internal SISO.

## 📑 Daftar Isi Halaman
1. Bagian Global (Header, Footer, Meta SEO)
2. Halaman Utama — Home (`/`)
3. Halaman Profil — About SISO (`/about`)
4. Halaman Detail Departemen / Divisi (`/about/divisi/[slug]`)
5. Halaman Program Kerja & Kegiatan (`/program-kerja`)
6. Halaman Detail Program Kerja (`/program-kerja/[slug]`)
7. Halaman Gallery & Dokumentasi (`/gallery`)
8. Halaman Publikasi, Kajian & Advokasi (`/articles-and-achieve`)
9. Halaman Regenerasi & Rekrutmen — Join SISO (`/join-siso`)

## 1. Bagian Global (Layout)
Bagian yang selalu muncul di setiap halaman website (Header/Navbar, Footer, dan SEO Global).

### 1.1. Navigation Bar (Header)
- **Letak Teks:** Bagian paling atas layar, melayang (*sticky header*) di semua halaman.
- **Kesan:** Bersih, institusional, mudah dinavigasi.

| Elemen Teks | Status / Hierarki | Batas Karakter | Keterangan & Konteks | Draf Copywriting RnD | Jumlah Karakter |
|---|---|---|---|---|---|
| **Menu 1** | Navigation Item | Maks 10 karakter | Link ke halaman utama (`/`) | `Home` | 4 karakter |
| **Menu 2** | Navigation Item | Maks 15 karakter | Profil kelembagaan & AD/ART (`/about`) | `About SISO` | 10 karakter |
| **Menu 3** | Navigation Item | Maks 20 karakter | Program kerja & kegiatan (`/program-kerja`) | `Programs & Events` | 17 karakter |
| **Menu 4** | Navigation Item | Maks 12 karakter | Dokumentasi & arsip LPJ (`/gallery`) | `Gallery` | 7 karakter |
| **Menu 5** | Navigation Item | Maks 25 karakter | Kajian, publikasi & info (`/articles-and-achieve`) | `Articles & Insights` | 19 karakter |

### 1.2. Footer (Kaki Halaman)
- **Letak Teks:** Bagian paling bawah setiap halaman.
- **Kesan:** Resmi, berwibawa, mempertegas kedudukan SISO sesuai **AD Pasal 1 & Pasal 8** sebagai organisasi kemahasiswaan tingkat fakultas (BEM Fakultas) di Sekolah STEM Universitas Prasetiya Mulya.
- **Lokasi CMS:** Disinkronkan dengan data singleton `Organization` di Django Admin.

| Elemen Teks | Status / Hierarki | Batas Karakter | Keterangan & Konteks | Draf Copywriting RnD | Jumlah Karakter |
|---|---|---|---|---|---|
| **Organization Name** | Brand / Heading | Maks 30 karakter | Nama resmi brand organisasi | `SISO Prasmul` | 12 karakter |
| **Organization Tagline** | Sub-header / Slogan | 40 – 90 karakter | Penjelas kedudukan resmi di bawah logo | `Organisasi Kemahasiswaan Tingkat Fakultas Sekolah STEM Universitas Prasetiya Mulya` | 82 karakter |
| **Copyright Notice** | Legal text | 30 – 50 karakter | Hak cipta evergreen (tahun dinamis di frontend) | `© SISO Universitas Prasetiya Mulya. All rights reserved.` | 56 karakter (atau `© SISO Prasmul. All rights reserved.` — 36 karakter) |
| **Campus Address** | Footer Info | 60 – 110 karakter | Kedudukan organisasi di Kampus BSD | `Kampus BSD Universitas Prasetiya Mulya, Kavling Edutown I.1, BSD City, Tangerang 15339` | 86 karakter |
| **Social Links** | External Links | 15 – 30 karakter | Kanal komunikasi resmi SISO | Instagram: `@siso.prasmul`<br>TikTok: `@siso.prasmul`<br>LinkedIn: `SISO Prasetiya Mulya` | Sesuai batas |

### 1.3. Global Meta SEO & Social Sharing (Open Graph)
- **Letak Teks:** Muncul saat link website dibagikan ke WhatsApp, LinkedIn, Instagram, atau di hasil pencarian Google.
- **Kesan:** Kredibel, jelas memperkenalkan SISO sebagai BEM Fakultas Sekolah STEM Prasetiya Mulya.

| Elemen Teks | Status / Hierarki | Batas Karakter | Keterangan & Konteks | Draf Copywriting RnD | Jumlah Karakter |
|---|---|---|---|---|---|
| **Meta Title Default** | SEO Title | 50 – 60 karakter | Format: `Judul Halaman \| SISO Prasmul` | `SISO Prasmul \| BEM Fakultas Sekolah STEM Prasetiya Mulya` | 56 karakter |
| **Meta Description** | SEO Description | 140 – 160 karakter | Muncul di snippet Google Search | `Profil resmi STEM Prasetiya Mulya Innovation Student Organization (SISO), wadah representasi, pengembangan, kolaborasi, dan pengabdian mahasiswa STEM Prasmul.` | 159 karakter |

## 2. Halaman Utama — Home (`/`)
Halaman utama berfungsi sebagai *company profile* yang memperkenalkan identitas kelembagaan SISO, fungsi utamanya bagi mahasiswa (*STEMians*) dan mitra eksternal, serta program kerja yang dijalankan secara berkelanjutan.

### 2.1. Hero Section
- **Letak Teks:** Bagian pertama layar (*above the fold*).
- **Kesan:** Institusional, modern, *student-centered*, dan *evergreen* (mengacu pada **AD Pasal 1 ayat (2)** dan semboyan **With STEM We Can**).
- **Lokasi CMS:** Django Admin > Menu `1. Halaman Home` > `Hero Section` / Model `Organization.slogan`.

```markdown
1. Hero Badge (Label Kecil di Atas Judul):
   - Ketentuan: 25 - 45 karakter (Singkat, huruf kapital/title case)
   - Konteks: Memperkenalkan status SISO sebagai BEM Fakultas secara instan
   - [Draf RnD]: BEM Fakultas Sekolah STEM Prasetiya Mulya
   - [Validasi]: 41 karakter

2. Hero Title (Judul Utama H1):
   - Ketentuan: 30 - 65 karakter (Headline utama yang tahan lama lintas periode)
   - Konteks: Memperkenalkan nama dan semboyan pergerakan SISO
   - [Draf RnD]: With STEM We Can: Represent, Collaborate, Innovate
   - [Validasi]: 50 karakter

3. Hero Subtitle (Deskripsi Pendukung):
   - Ketentuan: 100 - 180 karakter (Maksimal 2-3 kalimat)
   - Konteks: Merangkum 4 fungsi utama SISO sesuai AD Pasal 1 ayat (2)
   - [Draf RnD]: STEM Prasetiya Mulya Innovation Student Organization (SISO) adalah wadah resmi mahasiswa Sekolah STEM dalam menjalankan fungsi representasi, pengembangan, kolaborasi, dan pengabdian.
   - [Validasi]: 180 karakter

4. CTA Button 1 (Tombol Utama):
   - Ketentuan: 15 - 25 karakter (Mengandung kata kerja aktif)
   - Link: Mengarah ke `/about`
   - [Draf RnD]: Mengenal Profil SISO
   - [Validasi]: 20 karakter

5. CTA Button 2 (Tombol Sekunder):
   - Ketentuan: 15 - 25 karakter
   - Link: Mengarah ke `/program-kerja`
   - [Draf RnD]: Lihat Program Kerja
   - [Validasi]: 19 karakter

6. Scroll Indicator:
   - Ketentuan: 20 - 30 karakter
   - [Draf RnD]: Gulir untuk mengenal SISO
   - [Validasi]: 25 karakter
```

### 2.2. Section About SISO (Ringkasan Kelembagaan)
- **Letak Teks:** Section kedua di Home, berdampingan dengan foto kepengurusan SISO.
- **Kesan:** Tegas menjelaskan posisi SISO sebagai organisasi kemahasiswaan tingkat fakultas yang otonom, demokratis, dan inklusif sesuai **AD Pasal 1 & Pasal 2**.
- **Lokasi CMS:** Django Admin > Menu `1. Halaman Home` > `Sambutan & Ringkasan About`.

```markdown
1. Section Badge:
   - Ketentuan: 10 - 20 karakter
   - [Draf RnD]: Profil Organisasi
   - [Validasi]: 17 karakter

2. Heading (Judul Section):
   - Ketentuan: 25 - 50 karakter
   - [Draf RnD]: Mengenal SISO Lebih Dekat
   - [Validasi]: 25 karakter

3. Paragraf Pengantar (Deskripsi Ringkas):
   - Ketentuan: 200 - 350 karakter (1 paragraf padat)
   - Konteks: Menjelaskan kedudukan SISO sebagai BEM Fakultas bagi seluruh STEMians
   - [Draf RnD]: STEM Prasetiya Mulya Innovation Student Organization (SISO) merupakan organisasi kemahasiswaan resmi tingkat fakultas di lingkungan Sekolah STEM Universitas Prasetiya Mulya. Berlandaskan asas kedaulatan mahasiswa, SISO hadir menghimpun aspirasi, mengembangkan kepemimpinan, serta memfasilitasi kolaborasi seluruh mahasiswa aktif STEM (STEMians).
   - [Validasi]: 349 karakter

4. Floating Badge Teks (Label Mengambang pada Gambar):
   - Baris 1 (Label): Maks 20 karakter -> [Draf RnD]:BEM Fakultas STEM (17 karakter)
   - Baris 2 (Nilai/Status): Maks 25 karakter -> [Draf RnD]: With STEM We Can (16 karakter)

5. Tombol Link:
   - Ketentuan: Maks 25 karakter
   - [Draf RnD]: Baca Selengkapnya
   - [Validasi]: 17 karakter
```

### 2.3. Section Tujuan & Landasan Pergerakan (Visi & Misi Kelembagaan)
- **Letak Teks:** Section ketiga di Home (latar belakang kontras).
- **Kesan:** Kokoh, berprinsip, mengacu langsung pada **AD BAB III Pasal 7 (Tujuan Organisasi)**.
- **Lokasi CMS:** Django Admin > Menu `1. Halaman Home` > `Visi & Misi (Vision & Mission)`.

```markdown
1. Section Badge:
   - Ketentuan: 15 - 25 karakter
   - [Draf RnD]: Mandat Kelembagaan
   - [Validasi]: 18 karakter

2. Section Heading:
   - Ketentuan: 20 - 40 karakter
   - [Draf RnD]: Vision & Institutional Mission
   - [Validasi]: 30 karakter

3. Section Subtitle:
   - Ketentuan: 90 - 160 karakter
   - [Draf RnD]: Landasan strategis SISO yang berlaku berkesinambungan lintas periode kepengurusan untuk melayani seluruh mahasiswa Sekolah STEM.
   - [Validasi]: 128 karakter

4. Our Vision (Teks Visi Kelembagaan Evergreen):
   - Ketentuan: 120 - 220 karakter (1 kalimat kuat sesuai AD Pasal 7)
   - [Draf RnD]: Menjadi organisasi kemahasiswaan tingkat fakultas yang otonom, inklusif, kolaboratif, dan berkelanjutan dalam mewadahi aspirasi, pengembangan kepemimpinan, serta inovasi mahasiswa Sekolah STEM Universitas Prasetiya Mulya.
   - [Validasi]: 220 karakter

5. Empat Pilar Misi Kelembagaan (Sesuai 4 Fungsi AD Pasal 1 ayat (2) & Pasal 7):
   - Ketentuan: 60 - 110 karakter per poin
   - [Pilar 1]: Mewadahi dan memperjuangkan aspirasi mahasiswa STEM melalui mekanisme representasi serta advokasi yang aktif. (109 karakter)
   - [Pilar 2]: Mengembangkan potensi akademik, nonakademik, kreativitas, dan kepemimpinan mahasiswa melalui program kerja. (107 karakter)
   - [Pilar 3]: Memfasilitasi kolaborasi strategis antara mahasiswa STEM dengan civitas academica, alumni, dan mitra eksternal. (110 karakter)
   - [Pilar 4]: Menjalankan pengabdian masyarakat berbasis sains dan teknologi serta menjaga keberlanjutan regenerasi SISO. (108 karakter)
```

### 2.4. Section Program Kerja Unggulan (Highlighted Programs)
- **Letak Teks:** Section keempat di Home (grid kartu program kerja tetap SISO).
- **Kesan:** Menampilkan program nyata yang dikelola langsung oleh SISO (*InnoFair*, *Prog{r}amming*, *Science Fun Day*, *Perspective*) tanpa menyebut *STEM INC*.
- **Lokasi CMS:** Django Admin > Menu `Program Kerja` (Centang kotak **is_featured** pada program yang dipilih).

```markdown
1. Section Badge:
   - Ketentuan: 15 - 25 karakter
   - [Draf RnD]: Program Kerja Utama
   - [Validasi]: 19 karakter

2. Section Heading:
   - Ketentuan: 20 - 40 karakter
   - [Draf RnD]: Our Signature Programs
   - [Validasi]: 22 karakter

3. Section Subtitle:
   - Ketentuan: 90 - 160 karakter
   - [Draf RnD]: Rangkaian program kerja berkelanjutan yang diselenggarakan oleh SISO untuk memberikan manfaat bagi internal maupun eksternal Sekolah STEM.
   - [Validasi]: 138 karakter

4. Tombol Selengkapnya:
   - Ketentuan: 15 - 25 karakter
   - [Draf RnD]: Lihat Semua Program
   - [Validasi]: 19 karakter
```

### 2.5. Section Agenda Organisasi (Upcoming Events)
- **Letak Teks:** Section kelima di Home.
- **Kesan:** Informatif, menyampaikan agenda kegiatan dan forum organisasi yang sedang berjalan.
- **Lokasi CMS:** Django Admin > Menu `Program Kerja`.

```markdown
1. Section Badge:
   - Ketentuan: 15 - 25 karakter
   - [Draf RnD]: Kalender Kegiatan
   - [Validasi]: 17 karakter

2. Section Heading:
   - Ketentuan: 20 - 40 karakter
   - [Draf RnD]: Upcoming Activities
   - [Validasi]: 19 karakter

3. Section Subtitle:
   - Ketentuan: 90 - 150 karakter
   - [Draf RnD]: Informasi pelaksanaan program kerja, forum permusyawaratan, workshop, dan kegiatan kolaborasi SISO pada periode berjalan.
   - [Validasi]: 121 karakter
```

### 2.6. Section Prestasi Mahasiswa (Student Achievements — *Nonaktif Sementara*)
- **Catatan Penting untuk Web Developer:** Sesuai keputusan revisi, **section ini dapat disembunyikan (*toggle off*) untuk sementara di CMS** karena kita tidak menampilkan data prestasi lama dan ingin menjaga fokus website sebagai *company profile* SISO. Jika suatu saat diaktifkan kembali untuk menampilkan apresiasi program internal SISO, gunakan teks *evergreen* berikut:

```markdown
1. Section Badge:
   - Ketentuan: 15 - 25 karakter
   - [Draf RnD]: Apresiasi & Karya
   - [Validasi]: 17 karakter

2. Section Heading:
   - Ketentuan: 20 - 40 karakter
   - [Draf RnD]: Milestones & Appreciations
   - [Validasi]: 26 karakter

3. Section Subtitle:
   - Ketentuan: 90 - 160 karakter
   - [Draf RnD]: Dokumentasi pencapaian kolektif, karya inovatif program kerja, dan kontribusi fungsionaris SISO di lingkungan kampus maupun masyarakat.
   - [Validasi]: 135 karakter
```

### 2.7. Section Dokumentasi Kegiatan (Documentations)
- **Letak Teks:** Section ketujuh di Home (grid galeri foto).
- **Kesan:** Memperlihatkan kehidupan berorganisasi di SISO (sidang SGA, rapat pleno, pameran InnoFair, pengabdian masyarakat).
- **Lokasi CMS:** Django Admin > Menu `Media Asset`.

```markdown
1. Section Badge:
   - Ketentuan: 15 - 25 karakter
   - [Draf RnD]: Arsip Dokumentasi
   - [Validasi]: 17 karakter

2. Section Heading:
   - Ketentuan: 20 - 40 karakter
   - [Draf RnD]: SISO in Action
   - [Validasi]: 14 karakter (atau `Organization Gallery` — 20 karakter)

3. Section Subtitle:
   - Ketentuan: 90 - 150 karakter
   - [Draf RnD]: Rekaman visual pelaksanaan program kerja, forum permusyawaratan SISO Grand Assembly, hingga kegiatan pengabdian masyarakat oleh SISO.
   - [Validasi]: 133 karakter

4. Tombol Link Galeri:
   - Ketentuan: 15 - 25 karakter
   - [Draf RnD]: Buka Galeri SISO
   - [Validasi]: 16 karakter
```

### 2.8. Section Media Sosial (Our Social Media)
- **Letak Teks:** Section kedelapan di Home (feed interaktif Instagram `@siso.prasmul`).
- **Kesan:** Transparan dan mudah diakses sebagai kanal komunikasi resmi organisasi.
- **Lokasi CMS:** Django Admin > Menu `1. Halaman Home` > `Feed Media Sosial`.

```markdown
1. Section Badge:
   - Ketentuan: 15 - 25 karakter
   - [Draf RnD]: Kanal Komunikasi Resmi
   - [Validasi]: 22 karakter

2. Section Heading:
   - Ketentuan: 20 - 40 karakter
   - [Draf RnD]: Official Social Media
   - [Validasi]: 21 karakter

3. Section Subtitle & Handle:
   - Ketentuan: 80 - 140 karakter
   - [Draf RnD]: Dapatkan informasi resmi organisasi, publikasi kegiatan, dan pengumuman terkini melalui akun Instagram @siso.prasmul.
   - [Validasi]: 117 karakter
```

### 2.9. Section Peran & Fungsi Utama SISO (Value Proposition Kelembagaan)
- **Letak Teks:** Section penutup di Home sebelum Footer. Terdiri dari 3 kartu pilar yang merangkum peran inti SISO sebagai BEM Fakultas sesuai **AD Pasal 1, Pasal 6, dan Pasal 7**.
- **Kesan:** Menjelaskan secara lugas apa yang dilakukan SISO sebagai organisasi (bukan promosi prodi kampus).
- **Lokasi CMS:** Django Admin > Menu `1. Halaman Home` > `Value Proposition`.

```markdown
1. Badge Value Proposition:
   - Ketentuan: 15 - 25 karakter
   - [Draf RnD]: Peran & Fungsi Utama
   - [Validasi]: 20 karakter

2. Judul Utama:
   - Ketentuan: 20 - 45 karakter
   - [Draf RnD]: Core Pillars of SISO
   - [Validasi]: 20 karakter

3. Sub-judul:
   - Ketentuan: 100 - 180 karakter
   - [Draf RnD]: Sebagai organisasi kemahasiswaan tingkat fakultas, SISO menjalankan tiga peran strategis yang berorientasi pada kepentingan mahasiswa (student-centered) dan kemitraan.
   - [Validasi]: 167 karakter

4. Kartu Pilar 1:
   - Judul Pilar (Maks 40 karakter): Representasi & Advokasi Mahasiswa (33 karakter)
   - Deskripsi (110 - 160 karakter): Menjadi jembatan komunikasi resmi yang menghimpun, mengawal, dan memperjuangkan aspirasi serta kesejahteraan seluruh mahasiswa aktif Sekolah STEM (STEMians). (157 karakter)

5. Kartu Pilar 2:
   - Judul Pilar (Maks 40 karakter): Pengembangan Kapasitas & Kepemimpinan (37 karakter)
   - Deskripsi (110 - 160 karakter): Membentuk karakter kepemimpinan, manajemen organisasi yang profesional, serta budaya kerja berbasis data (evidence-based) melalui pengalaman kepengurusan. (154 karakter)

6. Kartu Pilar 3:
   - Judul Pilar (Maks 40 karakter): Kolaborasi Eksternal & Pengabdian (33 karakter)
   - Deskripsi (110 - 160 karakter): Membangun sinergi kemitraan strategis dengan korporasi, alumni, dan organisasi lain sekaligus menghadirkan program edukasi teknologi bagi masyarakat luas. (154 karakter)
```

## 3. Halaman Profil — About SISO (`/about`)
Halaman *company profile* utama yang menjabarkan kedudukan kelembagaan, sifat organisasi, nilai dasar (AD Pasal 5), prinsip kerja (AD Pasal 6), filosofi lambang, serta tata kelola struktur organisasi (SGA, BoA, BPH, dan Departemen).

### 3.1. Hero Section & Identitas Kelembagaan (Stats Grid Evergreen)
- **Letak Teks:** Bagian atas halaman About.
- **Kesan:** Formal, institusional, dan tahan lama (*evergreen*) karena menggunakan indikator struktur tetap dari AD/ART, bukan angka fluktuatif tahunan.
- **Lokasi CMS:** Django Admin > Menu `2. Halaman About` > `Pengantar Organisasi`.

```markdown
1. Hero Badge:
   - Ketentuan: 20 - 35 karakter
   - [Draf RnD]: Identitas Kelembagaan SISO
   - [Validasi]: 26 karakter

2. Hero Title (H1):
   - Ketentuan: 35 - 65 karakter
   - [Draf RnD]: Organisasi Kemahasiswaan Tingkat Fakultas Sekolah STEM
   - [Validasi]: 54 karakter

3. Hero Subtitle (Paragraf Profil Utama sesuai AD Pasal 1 & Pasal 8):
   - Ketentuan: 200 - 320 karakter
   - [Draf RnD]: STEM Prasetiya Mulya Innovation Student Organization (SISO) adalah organisasi kemahasiswaan resmi tingkat fakultas di Sekolah STEM Universitas Prasetiya Mulya yang bersifat otonom, demokratis, independen, inklusif, kolaboratif, dan nirlaba dalam mewadahi seluruh mahasiswa aktif STEM (STEMians).
   - [Validasi]: 301 karakter

4. Empat Indikator Kelembagaan (Evergreen sesuai AD/ART):
   - Metrik 1:
     * Angka: 4
     * Label (Maks 20 karakter): Organ Kelembagaan (17 karakter — SGA, BoA, BPH, Pelaksana)
   - Metrik 2:
     * Angka: 5
     * Label (Maks 20 karakter): Fungsi Operasional (18 karakter — Sesuai ART Pasal 12)
   - Metrik 3:
     * Angka: 6
     * Label (Maks 20 karakter): Nilai Dasar Organisasi (22 -> gunakan `Nilai Dasar SISO`: 16 karakter)
   - Metrik 4:
     * Angka: 7
     * Label (Maks 20 karakter): Asas Pergerakan (15 karakter — Sesuai AD Pasal 3)
```

### 3.2. Tujuan & Prinsip Organisasi (Detail Visi & Misi sesuai AD Pasal 6 & 7)
- **Letak Teks:** Section kedua halaman About.
- **Lokasi CMS:** Sinkron dengan `Organization.visi` dan `Organization.misi`.

```markdown
1. Section Badge:
   - Ketentuan: 15 - 25 karakter -> [Draf RnD]: Tujuan & Prinsip SISO (21 karakter)

2. Section Title:
   - Ketentuan: 20 - 35 karakter -> [Draf RnD]: Institutional Purpose (21 karakter)

3. Section Subtitle:
   - Ketentuan: 80 - 140 karakter -> [Draf RnD]: Ditetapkan dalam Anggaran Dasar SISO sebagai pedoman arah organisasi yang mengikat dan berkesinambungan lintas periode. (119 karakter)

4. Teks Visi / Tujuan Utama Lengkap (AD Pasal 7):
   - Ketentuan: 140 - 240 karakter
   - [Draf RnD]: Membangun ekosistem kemahasiswaan Sekolah STEM Universitas Prasetiya Mulya yang aktif, inklusif, kolaboratif, inovatif, dan berkelanjutan melalui tata kelola organisasi yang profesional, transparan, akuntabel, serta berpusat pada mahasiswa (student-centered).
   - [Validasi]: 239 karakter

5. Empat Pilar Fungsi & Prinsip Lengkap:
   - [Pilar 01] (Maks 110 karakter): Menempatkan kedaulatan dan aspirasi mahasiswa STEM sebagai dasar utama pengambilan keputusan organisasi. (104 karakter)
   - [Pilar 02] (Maks 110 karakter): Menjalankan program kerja secara partisipatif, transparan, akuntabel, dan berbasis data (evidence-based). (105 karakter)
   - [Pilar 03] (Maks 110 karakter): Menjadi representasi resmi mahasiswa STEM dalam hubungan kelembagaan dengan universitas dan pihak eksternal. (108 karakter)
   - [Pilar 04] (Maks 110 karakter): Menjamin kesinambungan organisasi melalui sistem kaderisasi, dokumentasi, dan transfer pengetahuan. (99 karakter)
```

### 3.3. Nilai-Nilai Dasar SISO (Core Organizational Values — AD Pasal 5)
- **Letak Teks:** Section ketiga halaman About.
- **Kesan:** Mengacu secara presisi pada **AD BAB II Pasal 5 (Nilai Dasar)** yang memuat 6 nilai pedoman perilaku seluruh anggota dan fungsionaris SISO: *Caring, Humility, Achieving, Integrity, Non-discrimination,* dan *Innovation*.
- **Lokasi CMS:** Django Admin > Menu `Organization` > Field `Nilai` (JSON list — mendukung 4 atau 6 kartu nilai; di bawah ini disajikan 4 kartu dengan penggabungan harmonis atau 6 butir lengkap sesuai kebutuhan UI).

```markdown
1. Section Badge:
   - Ketentuan: 15 - 25 karakter -> [Draf RnD]: Pedoman Perilaku SISO (21 karakter)

2. Section Title:
   - Ketentuan: 20 - 35 karakter -> [Draf RnD]: SISO Core Values (16 karakter — atau `Organizational Core Values`: 26 karakter)

3. Section Subtitle:
   - Ketentuan: 80 - 140 karakter -> [Draf RnD]: Enam nilai dasar dalam Anggaran Dasar Pasal 5 yang wajib dijunjung tinggi oleh setiap anggota dan fungsionaris SISO. (116 karakter)

4. Nilai Dasar SISO (Sesuai AD Pasal 5 — Format 4 Kartu UI / 6 Nilai Inti):
   - Nilai 1:
     * Nama Nilai (1 - 2 kata): Caring & Humility
     * Penjelasan (90 - 150 karakter): Memiliki kepekaan tinggi terhadap aspirasi sesama mahasiswa dan lingkungan, disertai kerendahan hati untuk menghargai masukan serta perubahan. (143 karakter)
   - Nilai 2:
     * Nama Nilai (1 - 2 kata): Achieving
     * Penjelasan (90 - 150 karakter): Mendayagunakan seluruh potensi secara optimal untuk mencapai standar kualitas kerja terbaik dan berorientasi pada penciptaan kontribusi nyata. (142 karakter)
   - Nilai 3:
     * Nama Nilai (1 - 2 kata): Integrity & Inclusive
     * Penjelasan (90 - 150 karakter): Menjaga keselarasan perkataan dan tindakan secara jujur dan bertanggung jawab, serta menjamin perlakuan setara tanpa diskriminasi (non-discrimination). (150 karakter)
   - Nilai 4:
     * Nama Nilai (1 - 2 kata): Innovation
     * Penjelasan (90 - 150 karakter): Berani menciptakan, mengembangkan, dan menerapkan gagasan atau solusi baru berbasis keilmuan dan teknologi dalam menjawab berbagai permasalahan. (144 karakter)
```
*(Catatan untuk Web Dev: Jika komponen grid di frontend mendukung 6 kartu terpisah, keenam nilai pada AD Pasal 5—`Caring`, `Humility`, `Achieving`, `Integrity`, `Non-discrimination`, dan `Innovation`—juga telah disiapkan definisinya sesuai teks asli Pasal 5).*

### 3.4. Filosofi Logo SISO (Logo Philosophy)
- **Letak Teks:** Section keempat halaman About (berdampingan dengan grafis lambang resmi SISO).
- **Kesan:** Simbolis, mencerminkan kesinambungan kelembagaan dan identitas SISO lintas generasi.
- **Lokasi CMS:** Django Admin > Menu `Organization` > Field `Filosofi Logo`.

```markdown
1. Section Badge:
   - Ketentuan: 15 - 25 karakter -> [Draf RnD]: Simbol Kelembagaan (18 karakter)

2. Section Title:
   - Ketentuan: 20 - 35 karakter -> [Draf RnD]: SISO Logo Philosophy (20 karakter)

3. Section Subtitle:
   - Ketentuan: 80 - 140 karakter -> [Draf RnD]: Representasi visual dari semangat kepemimpinan, keilmuan, inovasi, dan kesinambungan kelembagaan SISO lintas kepengurusan. (122 karakter)

4. Butir Filosofi (Format: Nama Elemen Visual : Makna Filosofis):
   - Elemen 01:
     * Judul Elemen: Burung Phoenix (Kesinambungan & Pembaruan)
     * Makna (110 - 180 karakter): Melambangkan ketangguhan organisasi dan kesinambungan kelembagaan SISO yang terus beregenerasi, bertumbuh, dan membawa pembaruan positif di setiap periode. (156 karakter)
   - Elemen 02:
     * Judul Elemen: Simpul Molekular (Keilmuan & Kolaborasi)
     * Makna (110 - 180 karakter): Mencerminkan asas keilmuan, pendekatan rasional berbasis data, serta persatuan erat seluruh mahasiswa lintas program studi di bawah naungan SISO. (146 karakter)
   - Elemen 03:
     * Judul Elemen: Rentang Sayap Dinamis (Otonomi & Inovasi)
     * Makna (110 - 180 karakter): Menggambarkan kemandirian, keluwesan adaptasi, dan keberanian fungsionaris SISO dalam melahirkan terobosan program kerja yang berdampak luas. (141 karakter)
   - Elemen 04:
     * Judul Elemen: Warna Biru Navy & Putih (Integritas & Transparansi)
     * Makna (110 - 180 karakter): Biru tua melambangkan kematangan berpikir, profesionalisme, dan wibawa kelembagaan, sedangkan putih mencerminkan transparansi, akuntabilitas, dan ketulusan pengabdian. (169 karakter)
```

### 3.5. Struktur & Tata Kelola Organisasi (Organizational Governance — AD BAB VI & ART BAB VI)
- **Letak Teks:** Section kelima halaman About (Bagan struktur kelembagaan SISO yang *evergreen*).
- **Konteks AD/ART:** Sesuai **AD Pasal 10–13**, tata kelola SISO terdiri dari:
  1. **SISO Grand Assembly (SGA):** Forum permusyawaratan tertinggi organisasi (penetapan AD/ART, pengesahan proker & anggaran, penilaian LPJ).
  2. **Board of Advisor (BoA):** Badan penasihat independen non-operasional yang memberikan pertimbangan strategis dan mediasi.
  3. **Badan Pengurus Harian (BPH):** Pimpinan eksekutif yang terdiri dari **Ketua (Chairman)**, **Wakil Ketua (Vice/Co-Chairman)**, **Sekretaris (Secretary)**, dan **Bendahara (Treasurer)**.
  4. **Unsur Pelaksana (Departemen & Event Planner):** Unit kerja operasional yang menjalankan 5 fungsi dasar organisasi sesuai **ART Pasal 12**.
- **Lokasi CMS:** Django Admin > Menu `BPHMember` dan `Division`.

```markdown
1. Section Badge:
   - Ketentuan: 15 - 25 karakter -> [Draf RnD]: Tata Kelola Organisasi (22 karakter)

2. Section Title:
   - Ketentuan: 20 - 35 karakter -> [Draf RnD]: Organizational Governance (25 karakter)

3. Section Subtitle:
   - Ketentuan: 80 - 140 karakter -> [Draf RnD]: Susunan hierarki kelembagaan SISO yang terdiri atas Board of Advisor, Badan Pengurus Harian (BPH), dan Departemen Pelaksana. (124 karakter)
```

**Panduan Pengisian Jabatan BPH Evergreen pada Tabel `BPHMember` di CMS (Tanpa Mengubah Deskripsi Tiap Tahun):**
- **Board of Advisor (BoA):** Badan penasihat independen yang memberikan arahan strategis dan menjaga keselarasan organisasi terhadap AD/ART.
- **Chairman (Ketua SISO):** Memimpin jalannya organisasi secara eksekutif, mengoordinasikan lintas departemen, serta mewakili SISO dalam hubungan kelembagaan internal dan eksternal.
- **Vice / Co-Chairman (Wakil Ketua):** Mendampingi Ketua dalam pengawasan operasional harian, penyelarasan rencana strategis, serta evaluasi kinerja departemen.
- **Secretary (Sekretaris):** Bertanggung jawab atas tata kelola administrasi, persuratan resmi, notulensi rapat pleno/BPH, serta pengarsipan dokumen organisasi.
- **Treasurer (Bendahara):** Mengelola anggaran, pencatatan transaksi, laporan keuangan, serta menjamin transparansi dan akuntabilitas finansial SISO.

### 3.6. Banner Informasi Regenerasi (Join SISO Banner — Evergreen)
- **Letak Teks:** Section penutup halaman About.
- **Kesan:** Mengundang partisipasi aktif mahasiswa STEM (*STEMians*) untuk berkontribusi sebagai fungsionaris tanpa terikat tahun tertentu.
- **Lokasi CMS:** Django Admin > Menu `2. Halaman About` > `Ajakan Bergabung (Join SISO)`.

```markdown
1. Badge Status:
   - Ketentuan: 15 - 25 karakter -> [Draf RnD]: Regenerasi Fungsionaris (23 karakter)

2. Judul Banner:
   - Ketentuan: 25 - 50 karakter -> [Draf RnD]: Mari Berkontribusi sebagai Fungsionaris SISO (44 karakter)

3. Deskripsi Ajakan:
   - Ketentuan: 160 - 260 karakter
   - [Draf RnD]: SISO membuka ruang bagi seluruh mahasiswa aktif Sekolah STEM (STEMians) untuk bertumbuh, menyuarakan aspirasi, dan mengelola program kerja berdampak melalui proses rekrutmen yang terbuka, objektif, dan inklusif setiap periode kepengurusan.
   - [Validasi]: 243 karakter

4. Tombol Aksi:
   - Tombol 1 (Maks 20 karakter): Alur Rekrutmen (14 karakter — link ke `/join-siso`)
   - Tombol 2 (Maks 20 karakter): Program Kerja SISO (18 karakter — link ke `/program-kerja`)
```

## 4. Halaman Detail Departemen / Divisi (`/about/divisi/[slug]`)
Berdasarkan **ART BAB VI Pasal 12**, SISO menjamin keluwesan organisasi lintas periode dengan mewajibkan pemenuhan **5 Fungsi Operasional Dasar** yang diterjemahkan ke dalam unit kerja Departemen dan *Event Planner*. Deskripsi di bawah ini telah disusun secara **evergreen** (bebas dari penyebutan program yang sudah tutup seperti STEM INC maupun nama spesifik tahunan) sehingga dapat dipakai terus-menerus dari tahun ke tahun di menu `Division` Django Admin CMS:

### 4.1. Daftar Departemen & Unsur Pelaksana SISO (Evergreen & Sesuai AD/ART)

```markdown
=== UNIT 1: EVENT PLANNER (EP) ===
1. Nama Divisi (Maks 50 karakter):
   [Draf RnD]: Event Planner (EP) (18 karakter)

2. URL Slug:
   [Draf RnD]: event-planner

3. Tagline / Ringkasan Singkat (Maks 140 karakter):
   [Draf RnD]: Unit kerja perencana dan pelaksana kegiatan besar (major events) di bawah naungan SISO bagi internal maupun eksternal Sekolah STEM. (131 karakter)

4. Uraian Job Description / Tugas Pokok (Sesuai ART Pasal 1 & Pasal 12):
   [Draf RnD]:
   - Merancang konsep kegiatan, proposal terstruktur, dan linimasa pelaksanaan untuk program kerja besar SISO seperti InnoFair, Prog{r}amming, Science Fun Day, dan Perspective.
   - Mengoordinasikan pembentukan kepanitiaan pelaksana melalui mekanisme rekrutmen kepanitiaan yang transparan dan sesuai kebutuhan kegiatan.
   - Memastikan seluruh penyelenggaraan acara memenuhi standar operasional prosedur (SOP) SISO serta ketentuan administratif BangKISI STEM dan Universitas.
   - Menyusun laporan evaluasi dan pertanggungjawaban pelaksanaan kegiatan sebagai acuan keberlanjutan di periode berikutnya.

=== UNIT 2: RESEARCH AND DEVELOPMENT (R&D) ===
1. Nama Divisi (Maks 50 karakter):
   [Draf RnD]: Research and Development (R&D) (30 karakter)

2. URL Slug:
   [Draf RnD]: research-and-development

3. Tagline / Ringkasan Singkat (Maks 140 karakter):
   [Draf RnD]: Penggerak riset berbasis data (evidence-based), penjaringan aspirasi mahasiswa, serta evaluasi kualitas program kerja SISO. (123 karakter)

4. Uraian Job Description / Tugas Pokok (Sesuai AD Pasal 6 & ART Pasal 12):
   [Draf RnD]:
   - Menjalankan fungsi riset dan pengumpulan data (evidence-based) untuk memetakan kebutuhan, aspirasi, serta minat pengembangan diri mahasiswa aktif Sekolah STEM (STEMians).
   - Melakukan kajian, monitoring, dan evaluasi terukur terhadap efektivitas pelaksanaan setiap program kerja SISO.
   - Menyusun publikasi kajian keilmuan dan inovasi teknologi yang memperkaya wawasan civitas academica.
   - Mengembangkan sistem dokumentasi pengetahuan dan inovasi organisasi guna menjamin transfer pengetahuan lintas periode kepengurusan.

=== UNIT 3: HUMAN RESOURCE (HR) ===
1. Nama Divisi (Maks 50 karakter):
   [Draf RnD]: Human Resource (HR) (19 karakter)

2. URL Slug:
   [Draf RnD]: human-resource

3. Tagline / Ringkasan Singkat (Maks 140 karakter):
   [Draf RnD]: Pelaksana fungsi manajemen sumber daya manusia, rekrutmen fungsionaris, orientasi, dan pengembangan kapasitas internal SISO. (124 karakter)

4. Uraian Job Description / Tugas Pokok (Sesuai ART BAB III & Pasal 12):
   [Draf RnD]:
   - Mengelola rangkaian rekrutmen dan seleksi calon fungsionaris SISO mulai dari screening CV dan Cover Letter hingga tahap wawancara secara objektif dan transparan.
   - Menyelenggarakan proses pelantikan, orientasi fungsionaris (SISO Day), serta penyambutan mahasiswa baru (Welcoming Night).
   - Menjaga kohesivitas, kinerja, dan kepatuhan fungsionaris terhadap kode etik serta ketentuan AD/ART SISO.
   - Merancang program peningkatan kapasitas kepemimpinan dan kerja sama tim bagi seluruh fungsionaris aktif selama masa kepengurusan.

=== UNIT 4: PUBLIC RELATION (PR) ===
1. Nama Divisi (Maks 50 karakter):
   [Draf RnD]: Public Relation (PR) (20 karakter)

2. URL Slug:
   [Draf RnD]: public-relation

3. Tagline / Ringkasan Singkat (Maks 140 karakter):
   [Draf RnD]: Jembatan komunikasi kelembagaan, kemitraan strategis eksternal, serta advokasi dan kesejahteraan mahasiswa Sekolah STEM. (120 karakter)

4. Uraian Job Description / Tugas Pokok (Sesuai AD Pasal 7 & ART Pasal 12):
   [Draf RnD]:
   - Menjalankan fungsi representasi dan hubungan kelembagaan antara SISO dengan unit kemahasiswaan (BangKISI STEM dan SNA), organisasi mahasiswa lain, serta alumni.
   - Mengembangkan kemitraan strategis dan kolaborasi produktif dengan industri, komunitas, sekolah mitra, dan institusi eksternal.
   - Memfasilitasi saluran komunikasi, pelayanan informasi, serta penyerapan aspirasi dan advokasi kesejahteraan mahasiswa STEM.
   - Menjaga reputasi dan citra kelembagaan SISO dalam setiap interaksi bilateral maupun multilateral dengan pemangku kepentingan.

=== UNIT 5: FINANCING ===
1. Nama Divisi (Maks 50 karakter):
   [Draf RnD]: Financing (9 karakter)

2. URL Slug:
   [Draf RnD]: financing

3. Tagline / Ringkasan Singkat (Maks 140 karakter):
   [Draf RnD]: Penggerak kemandirian finansial SISO melalui penggalangan dana yang sah, kemitraan sponsorship, dan dukungan pihak eksternal. (125 karakter)

4. Uraian Job Description / Tugas Pokok (Sesuai AD Pasal 16 & ART Pasal 17):
   [Draf RnD]:
   - Merencanakan dan melaksanakan kegiatan penggalangan dana (fundraising) yang sah, kreatif, dan selaras dengan ketentuan Universitas Prasetiya Mulya.
   - Menjalin kerja sama sponsorship, hibah, dan dukungan komersial dengan mitra eksternal untuk menopang keberlangsungan program kerja SISO.
   - Berkoordinasi dengan Bendahara (Treasurer) dalam menjaga akuntabilitas dan transparansi pencatatan seluruh pemasukan dana usaha dan kemitraan.
   - Memastikan pemenuhan kesepakatan kerja sama dengan pihak sponsor secara profesional dan bertanggung jawab.

=== UNIT 6: ONLINE MEDIA ===
1. Nama Divisi (Maks 50 karakter):
   [Draf RnD]: Online Media (12 karakter)

2. URL Slug:
   [Draf RnD]: online-media

3. Tagline / Ringkasan Singkat (Maks 140 karakter):
   [Draf RnD]: Pengelola kanal komunikasi resmi SISO untuk menjamin keterbukaan informasi, publikasi program, dan edukasi kreatif mahasiswa. (125 karakter)

4. Uraian Job Description / Tugas Pokok (Sesuai AD Pasal 6 & ART Pasal 12):
   [Draf RnD]:
   - Mengelola kanal komunikasi digital resmi SISO (@siso.prasmul dan website) sebagai wujud prinsip transparansi dan keterbukaan informasi organisasi.
   - Menyebarluaskan pengumuman resmi organisasi, agenda kegiatan, hasil ketetapan publik, serta liputan program kerja kepada seluruh STEMians.
   - Memproduksi konten komunikasi kreatif, siniar (podcast), dan rubrik edukatif yang relevan dengan kehidupan mahasiswa STEM.
   - Menjaga etika komunikasi publik yang inklusif, non-partisan, dan profesional di seluruh platform media sosial SISO.

=== UNIT 7: DESIGN ===
1. Nama Divisi (Maks 50 karakter):
   [Draf RnD]: Design (6 karakter)

2. URL Slug:
   [Draf RnD]: design

3. Tagline / Ringkasan Singkat (Maks 140 karakter):
   [Draf RnD]: Pengembang identitas visual dan komunikasi grafis SISO untuk seluruh kebutuhan publikasi, program kerja, dan atribut organisasi. (128 karakter)

4. Uraian Job Description / Tugas Pokok (Sesuai ART Pasal 12):
   [Draf RnD]:
   - Menyusun dan menjaga standar panduan identitas visual (visual guideline) organisasi agar tetap konsisten dan representatif.
   - Merancang kebutuhan grafis untuk publikasi media sosial, situs web, materi pameran, serta kelengkapan visual seluruh program kerja SISO.
   - Berkolaborasi erat dengan Online Media dan Documentation dalam mengemas informasi organisasi secara komunikatif dan estetis.
   - Mengelola aset desain organisasi sebagai bagian dari kekayaan intelektual nonfisik SISO yang diwariskan lintas periode.

=== UNIT 8: DOCUMENTATION ===
1. Nama Divisi (Maks 50 karakter):
   [Draf RnD]: Documentation (13 karakter)

2. URL Slug:
   [Draf RnD]: documentation

3. Tagline / Ringkasan Singkat (Maks 140 karakter):
   [Draf RnD]: Penjaga memori kolektif dan arsip visual SISO melalui peliputan fotografi, videografi, serta dokumentasi resmi kegiatan organisasi. (131 karakter)

4. Uraian Job Description / Tugas Pokok (Sesuai AD Pasal 7 ayat (10) & ART Pasal 12):
   [Draf RnD]:
   - Melaksanakan peliputan foto dan video pada seluruh program kerja, rapat, sidang SISO Grand Assembly (SGA), serta agenda resmi organisasi.
   - Memproduksi karya audio-visual seperti profil kepengurusan, video dokumentasi kegiatan, dan rekapitulasi perjalanan organisasi (aftermovie).
   - Menata sistem pengarsipan dokumentasi multimedia secara terpusat untuk mendukung penyusunan Laporan Pertanggungjawaban (LPJ) dan keberlanjutan sejarah SISO.
```

## 5. Halaman Program Kerja & Kegiatan (`/program-kerja`)
Katalog program kerja dan kegiatan kelembagaan SISO yang bersifat *evergreen* (tanpa mencantumkan program yang sudah ditutup seperti STEM INC, dan tanpa mengunci angka tahun/edisi pada judul utama).

### 5.1. Hero Section Program Kerja
- **Lokasi CMS:** Django Admin > Menu `3. Halaman Program Kerja` > `Hero Program Kerja`.

```markdown
1. Hero Badge:
   - Ketentuan: 15 - 25 karakter -> [Draf RnD]: Program Kerja SISO (18 karakter)

2. Hero Title (H1):
   - Ketentuan: 30 - 55 karakter -> [Draf RnD]: Programs for Internal & External Impact (39 karakter)

3. Hero Subtitle (Sesuai ART BAB I Pasal 1 ayat (1)):
   - Ketentuan: 110 - 200 karakter
   - [Draf RnD]: Rangkaian kegiatan dan inisiatif terstruktur yang diselenggarakan oleh SISO untuk memberikan manfaat, dampak, pengalaman, serta pelatihan bagi internal maupun eksternal Sekolah STEM.
   - [Validasi]: 182 karakter
```

### 5.2. Definisi & Deskripsi 5 Kategori Program (Evergreen)
Teks penjelas yang muncul saat pengunjung mengaktifkan filter kategori tertentu di atas katalog.

| Kategori | Judul Kategori | Subtitle Kategori | Deskripsi Kategori (100 – 160 Karakter) | Jumlah Karakter |
|---|---|---|---|---|
| **event** | Exhibition & Showcase | Flagship & Internal Events | Pameran karya inovasi tahunan InnoFair serta kegiatan internalisasi Welcoming Night dan SISO Day bagi keluarga besar STEMians. | 126 karakter |
| **workshop** | Workshop & Training | Technical & Skill Upgrading | Pelatihan pemrograman interaktif melalui Prog{r}amming serta pengembangan keahlian desain 3D modeling dalam program Perspective. | 128 karakter |
| **pengmas** | Pengabdian Masyarakat | Community & Science Outreach | Kegiatan edukasi dan eksperimen sains aplikatif melalui Science Fun Day untuk memberikan dampak nyata bagi masyarakat luas. | 123 karakter |
| **seminar** | Forum & Diskusi | Governance & Industry Talk | Forum permusyawaratan SISO Grand Assembly (SGA), diskusi aspirasi mahasiswa, serta seminar kolaborasi bersama praktisi industri. | 128 karakter |
| **competition** | Kompetisi & Inovasi | Collaborative Challenges | Fasilitasi ajang kreasi, pameran purwarupa kompetitif, dan pengembangan gagasan solutif yang diselenggarakan di bawah naungan SISO. | 132 karakter |

### 5.3. Daftar Entri Program Kerja Tetap SISO (Evergreen — Siap Input CMS)
Berikut adalah **6 Program Kerja & Agenda Kelembagaan SISO** (tanpa STEM INC dan ditulis dengan gaya *evergreen* yang tahan lama lintas kepengurusan):

```markdown
=== PROGRAM KERJA 1: INNOFAIR (INNOVATION FAIR) ===
1. Judul Program (Maks 100 karakter):
   [Draf RnD]: InnoFair: Annual STEM Innovation & Prototype Exhibition (55 karakter)

2. URL Slug:
   [Draf RnD]: innofair-stem-innovation-exhibition

3. Kategori:
   [Draf RnD]: event

4. Tanggal Pelaksanaan (Format YYYY-MM-DD — Disesuaikan kalender periode berjalan):
   [Draf RnD]: 2026-04-02

5. Lokasi Kegiatan (Maks 60 karakter):
   [Draf RnD]: Kampus BSD Universitas Prasetiya Mulya (38 karakter)

6. Deskripsi Singkat untuk Kartu Katalog (Maks 160 karakter):
   [Draf RnD]: Pameran inovasi tahunan yang diselenggarakan SISO untuk mewadahi unjuk karya prototipe mahasiswa, diskusi praktisi industri, dan kolaborasi publik. (147 karakter)

7. Deskripsi Lengkap untuk Halaman Detail (Evergreen Narrative):
   [Draf RnD]:
   InnoFair (Innovation Fair) merupakan salah satu program kerja besar (major event) tahunan yang direncanakan dan dilaksanakan oleh SISO sebagai wadah apresiasi karya serta inovasi teknologi di lingkungan Sekolah STEM Universitas Prasetiya Mulya. Melalui kegiatan ini, SISO memfasilitasi mahasiswa untuk menampilkan prototipe solutif yang menjawab berbagai permasalahan di masyarakat.

   Rangkaian kegiatan InnoFair mencakup pameran karya inovatif lintas kategori (mulai dari sistem teknologi, produk rekayasa, pangan, hingga aplikasi digital), sesi presentasi karya, serta gelar wicara (talkshow) bersama para praktisi profesional. Kehadiran pelaku industri dan publik dalam pameran ini menjadi jembatan kolaborasi yang memberikan masukan konstruktif bagi pengembangan karya mahasiswa lebih lanjut.

8. Link Pendaftaran / Informasi:
   [Draf RnD]: https://www.instagram.com/siso.prasmul/

9. Tampilkan di Halaman Utama (Featured)?:
   [Draf RnD]: Ya

=== PROGRAM KERJA 2: PROG{R}AMMING ===
1. Judul Program (Maks 100 karakter):
   [Draf RnD]: Prog{r}amming: Interactive Coding & Game Development Workshop (61 karakter)

2. URL Slug:
   [Draf RnD]: programming-interactive-coding-workshop

3. Kategori:
   [Draf RnD]: workshop

4. Tanggal Pelaksanaan (Format YYYY-MM-DD):
   [Draf RnD]: 2026-11-14

5. Lokasi Kegiatan (Maks 60 karakter):
   [Draf RnD]: Kampus BSD Universitas Prasetiya Mulya (38 karakter)

6. Deskripsi Singkat untuk Kartu Katalog (Maks 160 karakter):
   [Draf RnD]: Program pelatihan pemrograman interaktif oleh SISO yang mengenalkan logika coding, pembuatan gim sederhana, dan pengembangan aplikasi bagi pelajar. (147 karakter)

7. Deskripsi Lengkap untuk Halaman Detail (Evergreen Narrative):
   [Draf RnD]:
   Prog{r}amming adalah program kerja tahunan di bawah naungan SISO yang bertujuan mematahkan stigma bahwa pemrograman komputer itu sulit, sekaligus menumbuhkan literasi teknologi sejak dini. Dikemas melalui pendekatan belajar yang interaktif, kegiatan ini mengajak peserta mengeksplorasi dunia pemrograman secara menyenangkan.

   Materi pelatihan disusun secara berjenjang, mulai dari pengenalan logika pemrograman visual dan pembuatan video game sederhana berbasis blok kode (Scratch) untuk tingkat dasar, hingga pengenalan bahasa pemrograman Python dan pengembangan aplikasi untuk tingkat menengah. Seluruh sesi dipandu langsung oleh fungsionaris dan panitia mahasiswa SISO sebagai wujud kontribusi edukatif kepada generasi muda.

8. Link Pendaftaran / Informasi:
   [Draf RnD]: https://www.instagram.com/siso.prasmul/

9. Tampilkan di Halaman Utama (Featured)?:
   [Draf RnD]: Ya

=== PROGRAM KERJA 3: SCIENCE FUN DAY (SFD) ===
1. Judul Program (Maks 100 karakter):
   [Draf RnD]: Science Fun Day: Eksperimen Sains Aplikatif & Pengabdian Anak (61 karakter)

2. URL Slug:
   [Draf RnD]: science-fun-day

3. Kategori:
   [Draf RnD]: pengmas

4. Tanggal Pelaksanaan (Format YYYY-MM-DD):
   [Draf RnD]: 2026-11-28

5. Lokasi Kegiatan (Maks 60 karakter):
   [Draf RnD]: Kampus BSD Universitas Prasetiya Mulya (38 karakter)

6. Deskripsi Singkat untuk Kartu Katalog (Maks 160 karakter):
   [Draf RnD]: Program pengabdian masyarakat SISO berupa workshop eksperimen sains interaktif untuk menumbuhkan rasa ingin tahu anak-anak terhadap ilmu pengetahuan alam. (154 karakter)

7. Deskripsi Lengkap untuk Halaman Detail (Evergreen Narrative):
   [Draf RnD]:
   Science Fun Day (SFD) merupakan wujud pelaksanaan fungsi pengabdian masyarakat oleh SISO yang dirancang khusus bagi anak-anak usia sekolah dasar. Kegiatan ini mengemas konsep-konsep dasar Ilmu Pengetahuan Alam (IPA) ke dalam rangkaian eksperimen praktik langsung (hands-on workshops) yang aman, seru, dan mudah dipahami.

   Melalui berbagai percobaan kreatif—seperti simulasi tekanan hidrostatis, reaksi kimia sederhana, hingga mekanika gerak—peserta diajak mengamati bagaimana sains bekerja dalam kehidupan sehari-hari. Bagi fungsionaris dan panitia SISO, Science Fun Day menjadi sarana untuk mengamalkan nilai kepedulian (Caring) dan membagikan ilmu pengetahuan secara inklusif kepada masyarakat.

8. Link Pendaftaran / Informasi:
   [Draf RnD]: https://www.instagram.com/siso.prasmul/

9. Tampilkan di Halaman Utama (Featured)?:
   [Draf RnD]: Ya

=== PROGRAM KERJA 4: PERSPECTIVE ===
1. Judul Program (Maks 100 karakter):
   [Draf RnD]: Perspective: 3D Modeling & Engineering Design Workshop (54 karakter)

2. URL Slug:
   [Draf RnD]: perspective-3d-modeling-workshop

3. Kategori:
   [Draf RnD]: workshop

4. Tanggal Pelaksanaan (Format YYYY-MM-DD):
   [Draf RnD]: 2026-09-19

5. Lokasi Kegiatan (Maks 60 karakter):
   [Draf RnD]: Kampus BSD Universitas Prasetiya Mulya (38 karakter)

6. Deskripsi Singkat untuk Kartu Katalog (Maks 160 karakter):
   [Draf RnD]: Program pengembangan keterampilan teknis yang diselenggarakan SISO dengan fokus pada pelatihan pemodelan tiga dimensi (3D modeling) dan desain produk. (150 karakter)

7. Deskripsi Lengkap untuk Halaman Detail (Evergreen Narrative):
   [Draf RnD]:
   Perspective adalah program kerja pelatihan teknis di bawah koordinasi SISO yang berfokus pada pengembangan kompetensi pemodelan tiga dimensi (3D modeling) dan visualisasi desain rekayasa. Kegiatan ini memfasilitasi peserta untuk menerjemahkan gagasan konseptual menjadi rancangan objek tiga dimensi yang terukur.

   Melalui sesi lokakarya terpandu, peserta mempelajari dasar-dasar penggunaan perangkat lunak desain 3D, prinsip bentuk dan fungsi, serta teknik visualisasi purwarupa. Program ini mendukung tujuan SISO dalam memperkaya keterampilan praktis dan kreativitas di bidang rekayasa desain.

8. Link Pendaftaran / Informasi:
   [Draf RnD]: https://www.instagram.com/siso.prasmul/

9. Tampilkan di Halaman Utama (Featured)?:
   [Draf RnD]: Ya

=== PROGRAM KERJA 5: WELCOMING NIGHT & SISO DAY ===
1. Judul Program (Maks 100 karakter):
   [Draf RnD]: Welcoming Night & SISO Day: Orientasi & Kaderisasi Internal (59 karakter)

2. URL Slug:
   [Draf RnD]: welcoming-night-dan-siso-day

3. Kategori:
   [Draf RnD]: event

4. Tanggal Pelaksanaan (Format YYYY-MM-DD):
   [Draf RnD]: 2026-09-05

5. Lokasi Kegiatan (Maks 60 karakter):
   [Draf RnD]: Kampus BSD Universitas Prasetiya Mulya (38 karakter)

6. Deskripsi Singkat untuk Kartu Katalog (Maks 160 karakter):
   [Draf RnD]: Program internalisasi tahunan SISO untuk menyambut mahasiswa baru sekaligus membekali fungsionaris aktif dengan nilai budaya dan kepemimpinan organisasi. (153 karakter)

7. Deskripsi Lengkap untuk Halaman Detail (Evergreen Narrative):
   [Draf RnD]:
   Welcoming Night dan SISO Day merupakan agenda internal utama yang diselenggarakan untuk membangun rasa kekeluargaan, inklusivitas, dan kesiapan berorganisasi di lingkungan Sekolah STEM Universitas Prasetiya Mulya.

   Welcoming Night menjadi wadah penyambutan bagi mahasiswa baru (STEMians) guna mengenalkan ekosistem kemahasiswaan dan budaya kolaborasi lintas program studi. Sementara itu, SISO Day merupakan forum orientasi dan pembekalan kapasitas (teamwork, kepemimpinan, serta pemahaman AD/ART) bagi seluruh fungsionaris SISO yang baru dilantik sebelum menjalankan masa bakti satu periode kepengurusan.

8. Link Pendaftaran / Informasi:
   [Draf RnD]: https://www.instagram.com/siso.prasmul/

9. Tampilkan di Halaman Utama (Featured)?:
   [Draf RnD]: Tidak

=== PROGRAM KERJA 6: SISO GRAND ASSEMBLY (SGA) & PEMILU SISO ===
1. Judul Program (Maks 100 karakter):
   [Draf RnD]: SISO Grand Assembly (SGA) & Suksesi Kepemimpinan Demokratis (59 karakter)

2. URL Slug:
   [Draf RnD]: siso-grand-assembly-dan-pemilu

3. Kategori:
   [Draf RnD]: seminar

4. Tanggal Pelaksanaan (Format YYYY-MM-DD):
   [Draf RnD]: 2026-08-15

5. Lokasi Kegiatan (Maks 60 karakter):
   [Draf RnD]: Kampus BSD Universitas Prasetiya Mulya (38 karakter)

6. Deskripsi Singkat untuk Kartu Katalog (Maks 160 karakter):
   [Draf RnD]: Forum permusyawaratan tertinggi SISO untuk pengesahan AD/ART, program kerja, dan LPJ, serta penyelenggaraan Pemilu Ketua & Wakil Ketua secara demokratis. (154 karakter)

7. Deskripsi Lengkap untuk Halaman Detail (Evergreen Narrative sesuai AD Pasal 13 & ART Pasal 8):
   [Draf RnD]:
   SISO Grand Assembly (SGA) adalah forum permusyawaratan tertinggi di dalam kelembagaan SISO yang mencerminkan asas kedaulatan mahasiswa, demokrasi, transparansi, dan akuntabilitas. Melalui sidang SGA yang dihadiri oleh fungsionaris aktif, organisasi menetapkan keputusan strategis yang mengikat, mulai dari perubahan AD/ART, pengesahan rencana program kerja dan anggaran, hingga penilaian serta penerimaan Laporan Pertanggungjawaban (LPJ) Badan Pengurus Harian.

   Sejalan dengan komitmen keberlanjutan regenerasi, SISO juga menyelenggarakan Pemilihan Umum (Pemilu) Ketua dan Wakil Ketua secara jujur, adil, dan independen dengan sistem one student, one vote bagi seluruh mahasiswa aktif Sekolah STEM. Rangkaian suksesi ini memastikan setiap estafet kepemimpinan SISO memiliki legitimasi kuat dan berorientasi penuh pada kepentingan mahasiswa.

8. Link Pendaftaran / Informasi:
   [Draf RnD]: https://www.instagram.com/siso.prasmul/

9. Tampilkan di Halaman Utama (Featured)?:
   [Draf RnD]: Tidak
```

## 6. Halaman Detail Program Kerja (`/program-kerja/[slug]`)
Halaman narasi lengkap saat kartu program kerja diklik.

| Elemen Teks | Status / Hierarki | Batas Karakter | Keterangan & Konteks | Draf Copywriting RnD | Jumlah Karakter |
|---|---|---|---|---|---|
| **Judul Halaman** | Heading H1 | Maks 100 karakter | Judul program kerja | *Mengikuti input judul program di atas* | Otomatis |
| **Meta Tanggal & Kategori** | Meta Info | 30 – 50 karakter | Waktu pelaksanaan & label kategori | *Otomatis terformat dari database* | Otomatis |
| **Narasi Deskripsi Lengkap** | Body Text | 500 – 2500 karakter | Penjelasan latar belakang, tujuan, dan pelaksanaan proker | *Mengikuti input deskripsi lengkap program* | Otomatis |
| **Judul Galeri Dokumentasi** | Section Heading H2 | Maks 30 karakter | Bagian foto pelaksanaan kegiatan | `Foto Dokumentasi Kegiatan` | 25 karakter |
| **Judul Video Dokumentasi** | Section Heading H2 | Maks 30 karakter | Bagian video recap / aftermovie | `Video Dokumentasi & Aftermovie` | 30 karakter |
| **Caption Foto/Video** | Media Caption | 40 – 100 karakter | Keterangan momen pada setiap foto kegiatan | `Fungsionaris dan panitia SISO mendampingi jalannya rangkaian program kerja secara kolaboratif.` | 94 karakter |

## 7. Halaman Gallery & Dokumentasi (`/gallery`)
Pusat dokumentasi visual kegiatan SISO serta keterbukaan dokumen organisasi (seperti AD/ART dan Laporan Pertanggungjawaban / LPJ sesuai prinsip transparansi **AD Pasal 6**).

### 7.1. Hero Section Galeri
- **Lokasi CMS:** Django Admin > Menu `4. Halaman Gallery` > `Hero Galeri & Arsip`.

```markdown
1. Hero Badge:
   - Ketentuan: 15 - 25 karakter -> [Draf RnD]: Dokumentasi & Arsip (19 karakter)

2. Hero Title (H1):
   - Ketentuan: 30 - 55 karakter -> [Draf RnD]: Recording Our Organizational Journey (36 karakter)

3. Hero Subtitle:
   - Ketentuan: 110 - 200 karakter
   - [Draf RnD]: Arsip dokumentasi visual pelaksanaan program kerja, forum permusyawaratan, serta dokumen pertanggungjawaban resmi SISO dari periode ke periode.
   - [Validasi]: 144 karakter
```

### 7.2. Entri Foto & Video Dokumentasi (Evergreen — Siap Input CMS)
- **Lokasi CMS:** Django Admin > Menu `Media Asset`.

```markdown
=== ENTRI FOTO KEGIATAN 1 ===
1. Judul Kegiatan (Maks 60 karakter):
   [Draf RnD]: Pameran Karya & Kolaborasi Industri di InnoFair (47 karakter)

2. Kategori (Workshop / Event / Competition / Pengmas / Internal):
   [Draf RnD]: Event

3. Tahun Kegiatan:
   [Draf RnD]: 2026

4. Caption Foto (Maks 120 karakter):
   [Draf RnD]: Suasana pameran prototipe inovasi dan sesi diskusi interaktif yang difasilitasi oleh kepanitiaan InnoFair SISO. (111 karakter)

=== ENTRI FOTO KEGIATAN 2 ===
1. Judul Kegiatan (Maks 60 karakter):
   [Draf RnD]: Eksperimen Sains Interaktif di Science Fun Day (46 karakter)

2. Kategori:
   [Draf RnD]: Pengmas

3. Tahun Kegiatan:
   [Draf RnD]: 2026

4. Caption Foto (Maks 120 karakter):
   [Draf RnD]: Fungsionaris dan panitia SISO mendampingi peserta anak-anak mempraktikkan eksperimen sains secara menyenangkan. (111 karakter)

=== ENTRI FOTO KEGIATAN 3 ===
1. Judul Kegiatan (Maks 60 karakter):
   [Draf RnD]: Pelatihan Pemrograman Visual di Prog{r}amming (45 karakter)

2. Kategori:
   [Draf RnD]: Workshop

3. Tahun Kegiatan:
   [Draf RnD]: 2026

4. Caption Foto (Maks 120 karakter):
   [Draf RnD]: Sesi bimbingan pembuatan gim interaktif dan pengenalan logika pemrograman bersama mentor mahasiswa SISO. (104 karakter)

=== ENTRI VIDEO AFTERMOVIE ===
1. Judul Video (Maks 70 karakter):
   [Draf RnD]: Official Aftermovie InnoFair — STEM Innovation Exhibition (57 karakter)

2. Nama Event Terkait (Maks 40 karakter):
   [Draf RnD]: InnoFair SISO Prasmul (21 karakter)

3. Deskripsi Singkat Video (Maks 140 karakter):
   [Draf RnD]: Dokumentasi rangkaian pameran karya inovasi, gelar wicara praktisi, dan kolaborasi seluruh panitia SISO dalam penyelenggaraan InnoFair. (135 karakter)
```

### 7.3. Arsip Dokumen Kelembagaan & Laporan Pertanggungjawaban (LPJ)
Bagian khusus untuk mewujudkan prinsip **Transparansi dan Akuntabilitas (AD Pasal 6 ayat 2–3 & Pasal 16)**.
- **Lokasi CMS:** Django Admin > Menu `4. Halaman Gallery` > `Publikasi & Laporan Tahunan`.

```markdown
1. Section Badge:
   - Ketentuan: 15 - 25 karakter -> [Draf RnD]: Transparansi & Regulasi (23 karakter)

2. Section Title:
   - Ketentuan: 20 - 40 karakter -> [Draf RnD]: Dokumen Resmi & Arsip LPJ (25 karakter)

3. Section Subtitle:
   - Ketentuan: 80 - 150 karakter -> [Draf RnD]: Wujud akuntabilitas kelembagaan SISO melalui keterbukaan akses Anggaran Dasar, Anggaran Rumah Tangga (AD/ART), dan Laporan Pertanggungjawaban (LPJ). (149 karakter)

4. Entri Dokumen Resmi 1:
   - Judul Dokumen (Maks 60 karakter): Anggaran Dasar & Anggaran Rumah Tangga (AD/ART) SISO (52 karakter)
   - Keterangan Format & Jumlah Halaman: PDF • Pedoman Konstitusi Organisasi
   - Tahun Periode: Berlaku Lintas Periode

5. Entri Dokumen Resmi 2:
   - Judul Dokumen (Maks 60 karakter): Laporan Pertanggungjawaban (LPJ) Kepengurusan SISO (50 karakter)
   - Keterangan Format & Jumlah Halaman: PDF • Laporan Program Kerja & Keuangan BPH
   - Tahun Periode: Tahunan (Disahkan melalui SGA)
```

## 8. Halaman Publikasi, Kajian & Advokasi (`/articles-and-achieve`)
Sesuai arahan revisi agar website berfokus pada **Company Profile SISO** (bukan memajang prestasi lama atau promosi admisi kampus), halaman ini difokuskan sebagai **Pusat Publikasi Kelembagaan, Kajian Berbasis Data (*Evidence-Based*), dan Informasi Kemahasiswaan SISO**.

### 8.1. Hero Section
- **Lokasi CMS:** Django Admin > Menu `5. Halaman Artikel & Prestasi` > `Hero Artikel & Prestasi`.

```markdown
1. Hero Badge:
   - Ketentuan: 15 - 30 karakter -> [Draf RnD]: Publikasi & Wawasan • SISO (26 karakter)

2. Hero Title (H1):
   - Ketentuan: 30 - 55 karakter -> [Draf RnD]: Insights, Research, and Student Advocacy (40 karakter)

3. Hero Subtitle:
   - Ketentuan: 120 - 220 karakter
   - [Draf RnD]: Ruang publikasi resmi SISO yang memuat rilis kegiatan organisasi, kajian strategis berbasis data (evidence-based), artikel keilmuan teknologi, serta informasi pengembangan diri bagi seluruh STEMians.
   - [Validasi]: 199 karakter

4. Empat Teks Indikator Statis (Evergreen):
   - Indikator 1: Publikasi & Rilis Resmi SISO
   - Indikator 2: Kajian Strategis Evidence-Based
   - Indikator 3: Ruang Aspirasi & Advokasi STEMians
   - Indikator 4: Informasi Peluang Pengembangan Diri
```

### 8.2. Quick Jump Navigation Rubrik
Navigasi tombol cepat di bawah hero (bagian `#achievements` dapat disembunyikan/di-toggle off di frontend untuk saat ini):
1. `Rilis & Berita SISO` (`#news`)
2. `Publikasi Organisasi` (`#publications`)
3. `Kajian & Riset R&D` (`#research`)
4. `Info Kemahasiswaan` (`#scholarships`)
5. `Agenda Kegiatan` (`#competitions`)

### 8.3. Entri Artikel Kelembagaan & Kajian SISO (Evergreen — Siap Input CMS)
Berikut adalah **2 Artikel Kelembagaan Evergreen** yang memperkenalkan peran SISO sebagai BEM Fakultas dan budaya kerja *evidence-based* sesuai AD/ART SISO:

```markdown
=== ARTIKEL 1 (KATEGORI: JURNAL / PROFIL KELEMBAGAAN) ===
1. Judul Artikel (Maks 110 karakter):
   [Draf RnD]: Peran SISO sebagai Organisasi Kemahasiswaan Tingkat Fakultas dalam Mewadahi Aspirasi dan Kolaborasi STEMians (108 karakter)

2. Kategori Rubrik (Pilih salah satu: jurnal / kajian / achievement / beasiswa):
   [Draf RnD]: jurnal

3. URL Slug:
   [Draf RnD]: peran-siso-sebagai-organisasi-kemahasiswaan-tingkat-fakultas

4. Excerpt / Ringkasan untuk Kartu Berita (120 - 180 karakter):
   [Draf RnD]: Mengenal kedudukan, fungsi representasi, dan tata kelola SISO sebagai wadah resmi pengembangan kepemimpinan serta pengabdian mahasiswa Sekolah STEM Prasetiya Mulya. (165 karakter)

5. Isi Lengkap Artikel / Body (Minimal 300 kata — Evergreen & Berbasis AD/ART):
   [Draf RnD]:
   Di dalam ekosistem pendidikan tinggi, keberadaan organisasi kemahasiswaan tingkat fakultas memegang peranan vital sebagai jembatan antara mahasiswa, institusi akademik, dan masyarakat luas. Di lingkungan Sekolah STEM Universitas Prasetiya Mulya, mandat tersebut diemban secara resmi oleh STEM Prasetiya Mulya Innovation Student Organization (SISO).

   Berdasarkan Anggaran Dasar SISO Bab I Pasal 1, SISO berkedudukan sebagai organisasi kemahasiswaan tingkat fakultas yang bersifat otonom, demokratis, independen, inklusif, kolaboratif, nirlaba, serta non-partisan. Sifat kesinambungan kelembagaan yang dimiliki SISO memastikan bahwa identitas, nilai perjuangan, dan sistem tata kelola organisasi terus terjaga serta diwariskan secara berkelanjutan meskipun terjadi pergantian kepengurusan setiap tahunnya.

   Empat Fungsi Utama bagi Seluruh STEMians
   Sebagai wadah resmi bagi seluruh mahasiswa aktif Sekolah STEM (STEMians), SISO menjalankan empat fungsi utama:
   1. Fungsi Representasi dan Advokasi: Menghimpun, menyalurkan, dan memperjuangkan aspirasi serta kebutuhan mahasiswa melalui komunikasi kelembagaan yang konstruktif bersama Bagian Pengembangan Karakter Inovatif STEM (BangKISI STEM) dan unit tingkat universitas.
   2. Fungsi Pengembangan Kapasitas: Menyediakan ruang belajar di luar kelas melalui pengelolaan organisasi, kepemimpinan, manajemen proyek, serta penyelenggaraan lokakarya teknis seperti Prog{r}amming dan Perspective.
   3. Fungsi Kolaborasi Lintas Disiplin dan Eksternal: Mempertemukan mahasiswa dari berbagai program studi STEM untuk bersinergi dengan alumni, praktisi industri, dan mitra eksternal, salah satunya melalui pameran inovasi tahunan InnoFair.
   4. Fungsi Pengabdian Masyarakat: Menghadirkan kontribusi nyata bagi lingkungan sekitar melalui kegiatan edukasi sains aplikatif seperti Science Fun Day.

   Tata Kelola yang Demokratis dan Akuntabel
   Seluruh pengambilan keputusan strategis di dalam SISO berlandaskan asas kedaulatan mahasiswa melalui forum tertinggi SISO Grand Assembly (SGA) serta mekanisme Pemilihan Umum (Pemilu) berprinsip one student, one vote. Dengan berpegang teguh pada enam nilai dasar—Caring, Humility, Achieving, Integrity, Non-discrimination, dan Innovation—SISO berkomitmen untuk terus menjadi rumah bertumbuh yang inklusif dan profesional bagi setiap generasi STEMians.

=== ARTIKEL 2 (KATEGORI: KAJIAN / TATA KELOLA EVIDENCE-BASED) ===
1. Judul Artikel (Maks 110 karakter):
   [Draf RnD]: Penerapan Prinsip Student-Centered dan Evidence-Based dalam Perencanaan Program Kerja SISO (90 karakter)

2. Kategori Rubrik:
   [Draf RnD]: kajian

3. URL Slug:
   [Draf RnD]: penerapan-prinsip-student-centered-dan-evidence-based-siso

4. Excerpt / Ringkasan untuk Kartu Berita (120 - 180 karakter):
   [Draf RnD]: Bagaimana SISO merancang kebijakan dan mengevaluasi efektivitas program kerja secara terukur menggunakan pendekatan berbasis data serta penjaringan aspirasi mahasiswa. (167 karakter)

5. Isi Lengkap Artikel / Body (Minimal 300 kata — Evergreen & Berbasis AD/ART):
   [Draf RnD]:
   Sebuah organisasi kemahasiswaan yang relevan adalah organisasi yang mampu mendengar kebutuhan anggotanya secara presisi dan menerjemahkannya ke dalam program kerja yang tepat sasaran. Dalam Anggaran Dasar SISO Pasal 6, dua prinsip operasional yang menjadi tulang punggung penyusunan kebijakan organisasi adalah prinsip Student-Centered (berpusat pada mahasiswa) dan Evidence-Based (berbasis bukti dan data).

   Mengapa Pendekatan Evidence-Based Penting bagi BEM Fakultas?
   Sebagai organisasi yang tumbuh di lingkungan sains, teknologi, rekayasa, dan matematika, SISO menjadikan pemikiran kritis, data, dan pendekatan rasional sebagai landasan dalam memecahkan permasalahan organisasi. Setiap program kerja yang diajukan oleh departemen maupun Event Planner tidak hanya disusun berdasarkan rutinitas tahunan, melainkan harus didahului oleh pemetaan kebutuhan mahasiswa, analisis kelayakan proposal, serta penetapan indikator keberhasilan yang terukur.

   Siklus Perencanaan, Audit, dan Evaluasi Berkelanjutan
   Mengacu pada Anggaran Rumah Tangga SISO Bab X dan Bab XI, setiap pelaksanaan kegiatan wajib melewati tahapan tata kelola yang ketat:
   - Perencanaan Terstruktur: Penyusunan proposal kegiatan dan linimasa realistis yang ditinjau serta disetujui oleh Badan Pengurus Harian (BPH) sebelum dieksekusi.
   - Penjaringan Aspirasi dan Evaluasi R&D: Pengumpulan umpan balik peserta serta survei kepuasan pasca-kegiatan untuk mengukur dampak riil program terhadap pengembangan kompetensi internal maupun masyarakat eksternal.
   - Transparansi dan Audit Internal: Pengelolaan sumber daya finansial—baik dari alokasi universitas, iuran yang disepakati di SGA, penggalangan dana, maupun sponsorship—wajib melalui mekanisme audit internal independen serta dipertanggungjawabkan secara terbuka dalam Laporan Pertanggungjawaban (LPJ) di forum SISO Grand Assembly.

   Melalui perpaduan prinsip Student-Centered dan Evidence-Based ini, SISO memastikan setiap sumber daya organisasi dikelola secara efektif, akuntabel, dan memberikan nilai tambah yang berkelanjutan bagi seluruh keluarga besar Sekolah STEM Universitas Prasetiya Mulya.
```

### 8.4. Bagian Prestasi Mahasiswa (Achievement — *Dikikosongkan / Nonaktif Sementara*)
- **Catatan Tim RnD untuk Web Developer:** Sesuai arahan bahwa kita tidak memasukkan prestasi lama dan fokus pada *company profile* SISO, **tabel `Achievement` di Django Admin dapat dibiarkan kosong terlebih dahulu** (dan section `#achievements` dapat disembunyikan melalui *toggle section* di CMS). Di bawah ini disediakan *scaffolding template* bersih apabila di masa mendatang SISO ingin mempublikasikan pencapaian resmi organisasi:

```markdown
=== TEMPLATE SCAFFOLDING PENCAPAIAN ORGANISASI (OPSIONAL DI MASA MENDATANG) ===
1. Nama Fungsionaris / Tim Delegasi SISO (Maks 80 karakter):
   [Draf RnD]: [Kosongkan di CMS untuk saat ini — Isi saat ada capaian baru SISO]

2. Judul Penghargaan / Rekognisi Kelembagaan (Maks 120 karakter):
   [Draf RnD]: [Contoh format: Penghargaan Program Kerja / Delegasi Resmi SISO]

3. Tanggal Pencapaian (Format YYYY-MM-DD):
   [Draf RnD]: [YYYY-MM-DD]

4. Deskripsi Ringkas Pencapaian (110 - 180 karakter):
   [Draf RnD]: [Uraian singkat kontribusi atau rekognisi yang diperoleh langsung oleh kepengurusan/delegasi SISO pada periode berjalan.]
```

### 8.5. Rubrik Informasi Advokasi & Dukungan Kemahasiswaan (Evergreen)
Jika komponen kartu informasi di halaman `/articles-and-achieve` tetap ditampilkan sebagai layanan informasi dari SISO untuk *STEMians*, berikut adalah format informasi yang bersifat **layanan advokasi & kemahasiswaan SISO** (bukan iklan admisi mahasiswa baru):

```markdown
===LAYANAN INFORMASI KEMAHASISWAAN SISO ===
1. Nama Program / Layanan Informasi (Maks 60 karakter):
   [Draf RnD]: Kanal Aspirasi & Advokasi Mahasiswa SISO (40 karakter)

2. Cakupan Layanan / Manfaat (Maks 40 karakter):
   [Draf RnD]: Penyaluran Aspirasi Akademik & Kampus (37 karakter)

3. Waktu Operasional:
   [Draf RnD]: Sepanjang Periode Semester Aktif

4. Sasaran Layanan / Eligibility (Maks 80 karakter):
   [Draf RnD]: Seluruh Mahasiswa Aktif Sekolah STEM (STEMians) Prasetiya Mulya (63 karakter)

5. Unit Penanggung Jawab (Maks 30 karakter):
   [Draf RnD]: BPH, PR & R&D SISO (18 karakter)

6. Tag Kategori (Maks 30 karakter):
   [Draf RnD]: Layanan Advokasi STEMians (25 karakter)
```

### 8.6. Rubrik Agenda Kegiatan & Partisipasi SISO (Evergreen)
Menggantikan daftar lomba eksternal/STEM INC dengan agenda partisipasi resmi yang dikelola SISO:

```markdown
=== AGENDA KEGIATAN SISO ===
1. Nama Ajang / Kegiatan (Maks 70 karakter):
   [Draf RnD]: InnoFair: Pameran Karya Inovasi & Purwarupa Mahasiswa (53 karakter)

2. Bidang / Kategori Kegiatan (Maks 50 karakter):
   [Draf RnD]: Pameran Prototipe Teknologi & Kolaborasi Industri (49 karakter)

3. Periode Waktu Pelaksanaan:
   [Draf RnD]: Agenda Tahunan SISO

4. Lingkup Kegiatan:
   [Draf RnD]: Fakultas, Universitas & Mitra Eksternal

5. Status Pelaksanaan:
   [Draf RnD]: Program Kerja Rutin
```

## 9. Halaman Regenerasi & Rekrutmen — Join SISO (`/join-siso`)
Halaman yang menjelaskan mekanisme resmi kaderisasi, pemilihan umum (Pemilu), dan rekrutmen fungsionaris SISO secara **evergreen** sesuai **ART BAB III (Pasal 3–7) & BAB IV (Pasal 8)**. Tidak ada tanggal yang terkunci pada satu tahun tertentu sehingga teks ini tetap relevan setiap tahunnya.

### 9.1. Hero Section Pendaftaran
- **Kesan:** Mengundang partisipasi seluruh *STEMians*, menegaskan prinsip inklusivitas dan kesetaraan kesempatan sesuai **AD Pasal 3 ayat (7)**.

```markdown
1. Hero Badge:
   - Ketentuan: 15 - 25 karakter -> [Draf RnD]: REGENERASI & REKRUTMEN (22 karakter)

2. Hero Title (H1):
   - Ketentuan: 20 - 40 karakter -> [Draf RnD]: Become a SISO Functionary (25 karakter)

3. Hero Subtitle:
   - Ketentuan: 120 - 200 karakter
   - [Draf RnD]: Wujudkan kontribusi nyata bagi lingkungan Sekolah STEM Universitas Prasetiya Mulya. Mari bergabung sebagai fungsionaris SISO dan gerakkan perubahan bersama melalui semangat With STEM We Can!
   - [Validasi]: 192 karakter

4. Tombol Aksi:
   - Teks Tombol (Maks 20 karakter) -> [Draf RnD]: Lihat Alur Seleksi (18 karakter)
```

### 9.2. Informasi Rekrutmen (Recruitment Information - 3 Kartu Sesuai ART BAB III)
Bagian yang menjelaskan posisi departemen, persyaratan calon anggota (ART Pasal 4), dan prosedur seleksi resmi (ART Pasal 3 & Pasal 5).

```markdown
1. Judul Section:
   - Ketentuan: 20 - 35 karakter -> [Draf RnD]: Recruitment Governance (22 karakter)

2. Kartu 1: Unsur Pelaksana (Open Departments — ART Pasal 12)
   - Judul Kartu: Open Departments
   - Deskripsi (120 - 180 karakter): Rekrutmen dibuka berdasarkan kebutuhan organisasi pada unit Event Planner, Research & Development, Human Resource, Public Relation, Financing, Online Media, Design, & Documentation. (180 karakter)

3. Kartu 2: Persyaratan Calon Fungsionaris (Requirements — ART Pasal 4)
   - Judul Kartu: Requirements
   - Deskripsi (120 - 180 karakter): Mahasiswa aktif Sekolah STEM Universitas Prasetiya Mulya (STEMians) yang memiliki komitmen berkontribusi, mampu bekerja sama dalam tim, dan bersedia menaati AD/ART serta SOP SISO. (179 karakter)

4. Kartu 3: Tahapan Seleksi Resmi (Selection Process — ART Pasal 3 & 5)
   - Judul Kartu: Selection Process
   - Deskripsi (120 - 180 karakter): Dilaksanakan secara objektif dan transparan meliputi pendaftaran open recruitment, screening dokumen Curriculum Vitae (CV) & Cover Letter (CL), wawancara, serta penetapan BPH. (176 karakter)
```

### 9.3. Nilai Tambah Menjadi Fungsionaris SISO (Benefits of Joining - 5 Poin Evergreen)
Menjelaskan manfaat pengembangan diri yang diperoleh mahasiswa saat menjadi fungsionaris aktif SISO sesuai **AD Pasal 7 & Pasal 14**.

```markdown
1. Judul Section:
   - Ketentuan: 20 - 35 karakter -> [Draf RnD]: Why Join SISO Stewardship? (26 karakter)

2. Poin Benefit 1 (Maks 110 karakter):
   [Draf RnD]: Mengembangkan kompetensi kepemimpinan, manajemen organisasi, dan pengambilan keputusan yang demokratis. (103 karakter)

3. Poin Benefit 2 (Maks 110 karakter):
   [Draf RnD]: Berperan langsung dalam merancang dan mengeksekusi program kerja berdampak bagi internal dan masyarakat. (104 karakter)

4. Poin Benefit 3 (Maks 110 karakter):
   [Draf RnD]: Memiliki hak suara penuh dalam forum permusyawaratan tertinggi SISO Grand Assembly (SGA). (89 karakter)

5. Poin Benefit 4 (Maks 110 karakter):
   [Draf RnD]: Memperluas jejaring kolaborasi lintas program studi, civitas academica, alumni, dan mitra industri. (99 karakter)

6. Poin Benefit 5 (Maks 110 karakter):
   [Draf RnD]: Mengasah profesionalisme, integritas, dan kemampuan kerja sama tim sebagai bekal karir masa depan. (98 karakter)
```

### 9.4. Alur Suksesi & Rekrutmen Tahunan (Evergreen Regeneration Flow — ART Pasal 3–8)
Alur tahapan regenerasi yang ditulis menggunakan **Urutan Tahapan Kelembagaan (Tanpa Tanggal Spesifik yang Kedaluwarsa)** sehingga tidak perlu diubah dari tahun ke tahun kepengurusan.

```markdown
1. Judul Section:
   - Ketentuan: 20 - 35 karakter -> [Draf RnD]: Annual Regeneration Flow (24 karakter)

2. Tahap 01:
   - Nama Tahap (Maks 30 karakter): Pemilu Ketua & Wakil Ketua (26 karakter)
   - Periode Waktu: Tahap I — Suksesi Eksekutif
   - Keterangan Singkat: Pendaftaran calon, kampanye, debat terbuka, dan pemungutan suara mahasiswa STEM (one student, one vote).

3. Tahap 02:
   - Nama Tahap (Maks 30 karakter): Open Recruitment & Berkas (25 karakter)
   - Periode Waktu: Tahap II — Pendaftaran Terbuka
   - Keterangan Singkat: Pengumuman pembukaan rekrutmen departemen serta pengumpulan dokumen CV dan Cover Letter (CL).

4. Tahap 03:
   - Nama Tahap (Maks 30 karakter): Screening & Tahap Wawancara (27 karakter)
   - Periode Waktu: Tahap III — Seleksi Kompetensi
   - Keterangan Singkat: Penilaian dokumen serta wawancara objektif bersama BPH dan Koordinator Departemen terkait.

5. Tahap 04:
   - Nama Tahap (Maks 30 karakter): Penetapan, Pelantikan & SGA I (29 karakter)
   - Periode Waktu: Tahap IV — Awal Kepengurusan
   - Keterangan Singkat: Pengumuman susunan kepengurusan, pelantikan dan orientasi fungsionaris, serta pelaksanaan SGA I.
```

## 🔗 Acuan Dokumen Resmi
Seluruh narasi *company profile* pada dokumen ini mengacu pada:
1. **Anggaran Dasar (AD) STEM Prasetiya Mulya Innovation Student Organization (SISO)** — BAB I s.d. BAB XIV (Nama, Kedudukan sebagai Organisasi Kemahasiswaan Tingkat Fakultas Sekolah STEM, Sifat, 7 Asas, 6 Nilai Dasar, 9 Prinsip Organisasi, Tujuan, Keanggotaan, Struktur Organisasi, SGA, BoA, BPH, dan Sumber Keuangan).
2. **Anggaran Rumah Tangga (ART) STEM Prasetiya Mulya Innovation Student Organization (SISO)** — BAB I s.d. BAB XV (Definisi Operasional, Klasifikasi Anggota & Fungsionaris, Prosedur Rekrutmen CV & CL, Mekanisme Pemilu *One Student One Vote*, 5 Fungsi Dasar Departemen Pasal 12, Rapat & Kuorum SGA/Pleno/BPH/Departemen, Perencanaan Proker, Audit Internal, dan Kode Etik).
3. [Profil Organisasi Mahasiswa STEM — Universitas Prasetiya Mulya](https://www.prasetiyamulya.ac.id/stem-innovation-student-organization-organisasi-mahasiswa-stem/)
4. [Cerita Prasmul: SISO Wadah Prasmulyan STEM Berorganisasi dan Berkoneksi](https://prasetiyamulya.ac.id/ceritaprasmul/siso-wadah-prasmulyan-stem-berorganisasi-dan-berkoneksi/)

## ✅ Checklist Kualitas Copywriting Sebelum Serah Terima ke Tim Web

- [x] **Fokus Penuh sebagai Company Profile SISO (BEM Fakultas):** Narasi berfokus pada jati diri, tata kelola, fungsi representasi, pengembangan, kolaborasi, dan pengabdian SISO—terpisah jelas dari promosi admisi website fakultas.
- [x] **100% Selaras dengan AD/ART SISO:** Mencerminkan istilah baku AD/ART (*STEMians*, *Fungsionaris*, *SISO Grand Assembly / SGA*, *Board of Advisor / BoA*, *BPH*, *BangKISI STEM*, 6 Nilai Dasar Pasal 5, dan 9 Prinsip Pasal 6).
- [x] **Evergreen Lintas Tahun Kepengurusan:** Tidak memuat nama pengurus spesifik, tahun angkatan, maupun edisi tahunan yang cepat usang di dalam teks utama.
- [x] **Program Kerja Aktual (Tanpa STEM INC):** Seluruh penyebutan *STEM INC* telah dihapus; hanya menampilkan program aktif SISO (*InnoFair*, *Prog{r}amming*, *Science Fun Day*, *Perspective*, *Welcoming Night & SISO Day*, serta *SGA*).
- [x] **Tanpa Daftar Prestasi Lama:** Daftar prestasi lama telah dihapus dan komponen *Achievement* diarahkan untuk di-*toggle off* sementara di CMS.
- [x] **Batas Karakter Tervalidasi:** Seluruh elemen teks telah dihitung dan memenuhi batas karakter komponen UI Next.js 14+.
