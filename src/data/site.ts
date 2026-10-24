export interface SiteConfig {
  nama: string;
  tagline: string;
  alamat: string;
  kontak: {
    whatsapp: {
      nomor: string;
      nama: string;
      pesanAwal: string;
    };
    whatsappAdmin: {
      nomor: string;
      nama: string;
      pesanAwal: string;
    };
    website: string;
    email: string;
    mediaSosial?: {
      instagram?: string;
      facebook?: string;
      youtube?: string;
      tiktok?: string;
    };
    maps?: string;
  };
  sistemPendidikan: string[];
  ringkasan: {
    label: string;
    value: string | number;
  }[];
  motto: string;
  visi: string;
  misi: string[];
  kegiatan: {
    nama: string;
    deskripsi: string;
    ikon: string;
    foto: string;
  }[];
  pengajar: {
    deskripsi: string;
    kampus: string[];
  };
  syarat: {
    items: string[];
    khususIndices: number[];
  };
  jadwal: {
    tahap: string;
    tanggalMulai: string;
    tanggalSelesai: string;
    keterangan: string;
  }[];
  biaya: {
    umum: {
      label: string;
      items: { nama: string; nominal: number }[];
      keterangan: string[];
    };
    dhuafa: {
      label: string;
      items: { nama: string; nominal: number }[];
      keterangan: string[];
    };
    yatim: {
      label: string;
      items: { nama: string; nominal: number }[];
      keterangan: string[];
    };
  };
  alurPendaftaran: {
    langkah: string;
    deskripsi: string;
  }[];
  faq: {
    pertanyaan: string;
    jawaban: string;
  }[];
  sloganFotoGaleri: string;
  tahunAjaran: string;
  logo: string;
  gerbang: string;
  gedung: string;
  get biayaUmumTotal(): number;
  get biayaDhuafaTotal(): number;
  get biayaYatimTotal(): number;
  get statusPendaftaran(): "Akan Datang" | "Sedang Dibuka" | "Selesai";
  get whatsappLink(): string;
  get whatsappAdminLink(): string;
  get googleMapsLink(): string;
}

const siteData: Omit<SiteConfig, "biayaUmumTotal" | "biayaDhuafaTotal" | "biayaYatimTotal" | "statusPendaftaran" | "whatsappLink" | "whatsappAdminLink" | "googleMapsLink"> = {
  nama: "Pondok Pesantren Al-Lathifah 2",
  tagline: "Lebih Baik Pesantren, Pesantren Lebih Baik",
  alamat: "Jl. Pasar Kojengkang, Kp. Sawah RT. 02 RW. 08, Ds. Cikarageman, Kec. Setu, Kab. Bekasi, Jawa Barat",
  kontak: {
    whatsapp: {
      nomor: "6289679313820",
      nama: "Ust. Abdul Khair Nursa Ilma, S.Pd",
      pesanAwal: "Assalamualaikum, saya ingin bertanya tentang penerimaan santri baru Al-Lathifah 2",
    },
    whatsappAdmin: {
      nomor: "6281703072269",
      nama: "Ust. Aldi Wahid Alfaini, S.Li, Gr",
      pesanAwal: "Assalamualaikum, saya ingin bertanya tentang penerimaan santri baru Al-Lathifah 2",
    },
    website: "www.yayasanallathifah.com",
    email: "pp.allathifah@gmail.com",
    mediaSosial: {
      instagram: "https://www.instagram.com/ponpes_allathifah/",
      facebook: "https://www.facebook.com/pp.allathifah",
      youtube: "https://www.youtube.com/@ppallathifah2mediaofficial",
      tiktok: "https://www.tiktok.com/@lathifah2_mediasetu",
    },
    maps: "https://maps.app.goo.gl/dSofJqu2LvcqBHYn7",
  },
  sistemPendidikan: [
    "Kurikulum Pondok Pesantren Al-Lathifah merupakan kolaborasi antara Kurikulum Nasional (Kurikulum Merdeka) dan Kurikulum Pesantren (Kurikulum Salaf) yang disesuaikan dengan visi dan misi pondok.",
    "Pendidikan Formal: SD/MI, SMP/MTs, SMA/MA dengan kurikulum nasional yang diperkaya materi keagamaan.",
    "Tahfidz Al-Qur'an: Target hafalan 30 Juz untuk jenjang SMA/MA, 15 Juz untuk SMP/MTs, dan 5 Juz untuk SD/MI.",
    "Bahasa Arab: Nahwu, Sharaf, Muhadatsah, Istima', Qira'ah, Kitabah, dan Balaghah.",
    "Bahasa Inggris: Conversation, Grammar, Reading, Writing, Listening, dan TOEFL Preparation.",
    "Ulumul Qur'an: Tajwid, Tafsir, Asbabun Nuzul, Nasikh Mansukh, Makki Madani, dan I'jaz Al-Qur'an.",
    "Fikh: Ibadah, Munakahat, Jinayat, Muamalah, Siyasah, dan Fikh Kontemporer.",
    "Aqidah Akhlak: Tauhid, Asmaul Husna, Akhlak Mahmudah, Akhlak Mazmumah, dan Sirah Nabawiyah.",
    "Sejarah Islam: Khulafaur Rasyidin, Dinasti Umayyah, Abbasiyah, Utsmaniyah, dan Perkembangan Islam di Nusantara.",
    "Keterampilan: Pramuka, Pertanian, Kerajinan, IT Dasar, Kewirausahaan, dan Seni Budaya.",
  ],
  ringkasan: [
    { label: "Tahun Pendidikan SMP", value: 3 },
    { label: "Tahun Pendidikan Aliyah", value: 3 },
    { label: "Jam Pelajaran/Minggu", value: 24 },
  ],
  motto: "Sholeh, Mandiri, Berjiwa Besar",
  visi: "Membentuk generasi Qur'ani yang berpengetahuan luas, berakhlak mulia, mandiri, dan berjiwa besar untuk kemaslahatan umat.",
  misi: [
    "Menyelenggarakan pendidikan yang mengintegrasikan ilmu agama (naqli) dan ilmu umum (aqli) secara seimbang.",
    "Menanamkan kecintaan dan keikhlasan dalam menghafal, memahami, dan mengamalkan Al-Qur'an.",
    "Membangun karakter mandiri melalui pembiasaan hidup disiplin, tanggung jawab, dan kepemimpinan.",
    "Mengembangkan potensi santri di bidang akademik, non-akademik, dan kewirausahaan untuk bersaing di era global.",
  ],
  kegiatan: [
    {
      nama: "Tahfidz Al-Qur'an",
      deskripsi: "Program hafalan Al-Qur'an dengan metode Talaqqi, Muraja'ah harian, Munaqasyah mingguan/bulanan, dan simulasi Ujian Hafalan Tahap (UHT).",
      ikon: "book-open",
      foto: "kegiatan 1.jpg",
    },
    {
      nama: "Pendidikan Formal Terakreditasi",
      deskripsi: "SD/MI, SMP/MTs, SMA/MA terakreditasi A dengan kurikulum Merdeka diperkaya muatan lokal pesantren.",
      ikon: "graduation-cap",
      foto: "kegiatan 2.jpg",
    },
    {
      nama: "Bahasa Arab & Inggris Intensif",
      deskripsi: "Arabic English Zone (AEZ), Muhadatsah harian, English Club, Arabic Speech Contest, TOEFL & Arabic Proficiency Test rutin.",
      ikon: "languages",
      foto: "kegiatan 3.jpg",
    },
    {
      nama: "Kemahiran & Kewirausahaan",
      deskripsi: "Pramuka wajib, pertanian hydroponik/organik, kerajinan tangan, IT (coding basic, desain grafis), dan program Santripreneur.",
      ikon: "tool",
      foto: "kegiatan 4.jpg",
    },
    {
      nama: "Kegiatan Keagamaan & Sosial",
      deskripsi: "Sholat berjamaah 5 waktu, Qiyamul Lail, Haflah, Maulid, PHBI, Bakti Sosial, Pengajian Rutin Ortu/Wali Santri, dan Dakwah Keliling Desa.",
      ikon: "users",
      foto: "kegiatan 5.jpg",
    },
  ],
  pengajar: {
    deskripsi: "Pengajar berkualifikasi S1/S2 dari universitas ternama, memiliki sanad muttasil Al-Qur'an, dan pengalaman mengajar minimal 3 tahun.",
    kampus: [
      "Al-Azhar Mesir",
      "UIN Jakarta",
      "UIN Bandung",
      "IIQ (Institut Ilmu Qur'an) Jakarta",
      "KMI Gontor",
    ],
  },
syarat: {
    items: [
      "Beragama Islam",
      "Sehat jasmani dan rohani (bukti surat keterangan dokter)",
      "Usia sesuai jenjang: SMP 12–14 th, Aliyah 15–17 th (per 1 Juli 2027)",
      "Lulus tes akademik (TKA/TOEFL/TOAFL) dan wawancara",
      "Lulus tes kesehatan (lab & fisik) di RS/Klinik mitra",
      "Surat rekomendasi RT/RW atau tokoh masyarakat setempat",
      "Fotokopi KTP & KK orang tua/wali (legalisir)",
      "Pas foto 3 lembar",
      "Surat pernyataan bersedia mematuhi seluruh aturan pondok (KHUSUS)",
      "Surat pernyataan tidak pulang sebelum masa studi selesai kecuali izin (KHUSUS)",
      "Surat pernyataan orang tua/wali menanggung biaya pendidikan & kesehatan (KHUSUS)",
    ],
    khususIndices: [7, 8, 9],
  },
  jadwal: [
    {
      tahap: "Pendaftaran Dini (Early Bird)",
      tanggalMulai: "2026-10-25",
      tanggalSelesai: "2026-12-31",
      keterangan: "Potongan biaya pendaftaran Rp 500.000",
    },
    {
      tahap: "Pendaftaran Reguler",
      tanggalMulai: "2027-01-01",
      tanggalSelesai: "2027-03-31",
      keterangan: "Biaya standar",
    },
    {
      tahap: "Pendaftaran Terakhir",
      tanggalMulai: "2027-04-01",
      tanggalSelesai: "2027-04-25",
      keterangan: "Tidak ada potongan, kuota terbatas",
    },
    {
      tahap: "Tes Akademik & Wawancara",
      tanggalMulai: "2027-04-26",
      tanggalSelesai: "2027-05-10",
      keterangan: "Offline di Pondok Pesantren Al-Lathifah 2",
    },
    {
      tahap: "Pengumuman Hasil Seleksi",
      tanggalMulai: "2027-05-15",
      tanggalSelesai: "2027-05-15",
      keterangan: "Via website, WA broadcast, & pengumuman di papan info pondok",
    },
    {
      tahap: "Daftar Ulang & Pembayaran",
      tanggalMulai: "2027-05-16",
      tanggalSelesai: "2027-06-10",
      keterangan: "Wajib hadir orang tua/wali, bawa berkas asli untuk verifikasi",
    },
    {
      tahap: "Masa Orientasi (Ta'aruf)",
      tanggalMulai: "2027-06-15",
      tanggalSelesai: "2027-06-25",
      keterangan: "Wajib untuk semua santri baru, masuk asrama penuh",
    },
    {
      tahap: "Mulai Kegiatan Belajar Mengajar",
      tanggalMulai: "2027-07-01",
      tanggalSelesai: "2027-07-01",
      keterangan: "Awal Tahun Ajaran 2027-2028",
    },
  ],
  biaya: {
    umum: {
      label: "Biaya Umum",
      items: [
        { nama: "Uang Bangunan", nominal: 3_500_000 },
        { nama: "SPP Bulanan Awal", nominal: 750_000 },
        { nama: "Lemari", nominal: 585_000 },
        { nama: "Baju Olahraga", nominal: 165_000 },
        { nama: "Kegiatan Awal Tahun", nominal: 150_000 },
      ],
      keterangan: [
        "Biaya formulir pendaftaran Rp200.000.",
        "Biaya bangunan dan SPP bulanan bagi santri yatim gratis.",
        "Biaya masuk pesantren dilunasi ketika daftar ulang.",
      ],
    },
    dhuafa: {
      label: "Biaya Dhuafa",
      items: [
        { nama: "Uang Bangunan", nominal: 1_500_000 },
        { nama: "SPP Bulanan Awal", nominal: 400_000 },
        { nama: "Lemari", nominal: 585_000 },
        { nama: "Baju Olahraga", nominal: 165_000 },
        { nama: "Kegiatan Awal Tahun", nominal: 150_000 },
      ],
      keterangan: [
        "Biaya formulir pendaftaran Rp200.000.",
        "Biaya bangunan dan SPP bulanan bagi santri yatim gratis.",
        "Biaya masuk pesantren dilunasi ketika daftar ulang.",
      ],
    },
    yatim: {
      label: "Biaya Yatim",
      items: [
        { nama: "Lemari", nominal: 585_000 },
        { nama: "Baju Olahraga", nominal: 165_000 },
        { nama: "Kegiatan Awal Tahun", nominal: 150_000 },
      ],
      keterangan: [
        "Biaya formulir pendaftaran Rp200.000.",
        "Biaya bangunan dan SPP bulanan bagi santri yatim gratis.",
        "Biaya masuk pesantren dilunasi ketika daftar ulang.",
      ],
    },
  },
  alurPendaftaran: [
    {
      langkah: "1. Isi Formulir Pendaftaran",
      deskripsi: "Ambil formulir di kantor PSB Pondok Pesantren Al-Lathifah 2 atau unduh via website www.yayasanallathifah.com. Isi lengkap dengan tulisan jelas & tanda tangan orang tua/wali.",
    },
    {
      langkah: "2. Mengambil Formulir",
      deskripsi: "Kumpulkan syarat no. 1–7 (KTP, KK, Akta, SKTM, Foto, Rekomendasi RT/RW, Surat Kesehatan) ke panitia PSB secara langsung atau via pos. Dapatkan Nomor Pendaftaran & Kartu Ujian.",
    },
    {
      langkah: "3. Menyerahkan Berkas",
      deskripsi: "Menyerahkan kelengkapan berkas persyaratan fisik kepada panitia PSB.",
    },
    {
      langkah: "4. Ikuti Tes Akademik & Wawancara",
      deskripsi: "Hadir pada jadwal Tes TKA/TOEFL/TOAFL & Wawancara (offline di pondok) sesuai Nomor Pendaftaran. Tes meliputi: Akademik, Tahfidz/Tilawah, Psikologi, & Wawancara Akhlak.",
    },
    {
      langkah: "4. Pembayaran Biaya Awal & Daftar Ulang",
      deskripsi: "Bayar biaya pendaftaran + seragam + perlengkapan asrama + buku/ATK sesuai kategori (Umum/Dhuafa/Yatim) pada masa Daftar Ulang. Bawa berkas ASLI untuk verifikasi.",
    },
    {
      langkah: "5. Ikuti Masa Orientasi (Ta'aruf)",
      deskripsi: "Masuk asrama penuh pada 15–25 Juni 2027 untuk Masa Ta'aruf: pengenalan aturan, pembiasaan ibadah, tahfidz, bahasa, dan kemandirian. Orang tua wajib hadir pembukaan & penutupan.",
    },
  ],
  faq: [
    {
      pertanyaan: "Bagaimana sistem pendidikan formalnya?",
      jawaban: "Santri mengikuti pendidikan formal SD/MI, SMP/MTs, SMA/MA yang terakreditasi A di lingkungan pondok (kelas khusus santri). Jam pelajaran formal full day pukul 08.00–14.50 WIB, tahfidz & keagamaan sore hingga malam.",
    },
    {
      pertanyaan: "Apakah boleh membawa HP / gadget pribadi?",
      jawaban: "Tidak diperbolehkan membawa HP/gadget pribadi. Komunikasi dengan orang tua via telepon umum pondok (tersedia di setiap asrama) atau jadwal video call mingguan yang disediakan pondok.",
    },
    {
      pertanyaan: "Kapan kunjungan orang tua (Silaturahmi)?",
      jawaban: "Silaturahmi boleh setiap minggu, pukul 09.00–15.00 WIB. Diluar jadwal tersebut memerlukan izin tertulis Bagian Pengasuhan Santri. Khusus bulan Ramadhan & hari besar Islam: jadwal khusus diinformasikan via WA broadcast.",
    },
    {
      pertanyaan: "Apakah ada biaya tersembunyi selain yang tercantum?",
      jawaban: "Tidak ada biaya tersembunyi. Semua biaya wajib tercantum detail di halaman Biaya (Umum/Dhuafa/Yatim). Biaya opsional (foto kenangan, baju lomba, souvenir, dana sosial, dll) diinformasikan terpisah sebelum kegiatan.",
    },
  ],
  sloganFotoGaleri: "Bersama Al-Lathifah, Mengukir Prestasi!",
  tahunAjaran: "2027-2028",
  logo: "Logo.png",
  gerbang: "gerbang.jpg",
  gedung: "gedung.jpg",
};

function encodeWhatsAppMessage(message: string): string {
  return encodeURIComponent(message);
}

function encodeGoogleMapsQuery(query: string): string {
  return encodeURIComponent(query);
}

export const site: SiteConfig = {
  ...siteData,
  get biayaUmumTotal(): number {
    return siteData.biaya.umum.items.reduce((sum, item) => sum + item.nominal, 0);
  },
  get biayaDhuafaTotal(): number {
    return siteData.biaya.dhuafa.items.reduce((sum, item) => sum + item.nominal, 0);
  },
  get biayaYatimTotal(): number {
    return siteData.biaya.yatim.items.reduce((sum, item) => sum + item.nominal, 0);
  },
  get statusPendaftaran(): "Akan Datang" | "Sedang Dibuka" | "Selesai" {
    const now = new Date();
    const wibOffset = 7 * 60 * 60 * 1000;
    const nowWIB = new Date(now.getTime() + wibOffset);
    const buka = new Date("2026-10-18T00:00:00+07:00");
    const tutup = new Date("2027-04-25T23:59:59+07:00");
    if (nowWIB < buka) return "Akan Datang";
    if (nowWIB > tutup) return "Selesai";
    return "Sedang Dibuka";
  },
  get whatsappLink(): string {
    const { nomor, pesanAwal } = siteData.kontak.whatsapp;
    return `https://wa.me/${nomor}?text=${encodeWhatsAppMessage(pesanAwal)}`;
  },
  get whatsappAdminLink(): string {
    const { nomor, pesanAwal } = siteData.kontak.whatsappAdmin;
    return `https://wa.me/${nomor}?text=${encodeWhatsAppMessage(pesanAwal)}`;
  },
  get googleMapsLink(): string {
    return `https://www.google.com/maps/search/?api=1&query=${encodeGoogleMapsQuery(siteData.alamat)}`;
  },
};

// Dev-only assertions — build will fail if totals drift
if (import.meta.env.DEV) {
  console.assert(site.biayaUmumTotal === 5_150_000, `biayaUmumTotal mismatch: expected 5150000, got ${site.biayaUmumTotal}`);
  console.assert(site.biayaDhuafaTotal === 2_800_000, `biayaDhuafaTotal mismatch: expected 2800000, got ${site.biayaDhuafaTotal}`);
  console.assert(site.biayaYatimTotal === 900_000, `biayaYatimTotal mismatch: expected 900000, got ${site.biayaYatimTotal}`);
}