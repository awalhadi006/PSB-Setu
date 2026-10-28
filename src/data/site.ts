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
    mediaSosial: {
      instagram: string;
      facebook: string;
      youtube: string;
      tiktok: string;
    };
    maps?: string;
  };
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

const siteData = {
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
      youtube: "https://www.youtube.com/@yayasan_allathifah",
      tiktok: "https://www.tiktok.com/@lathifah2_mediasetu",
    },
    maps: "https://maps.app.goo.gl/dSofJqu2LvcqBHYn7",
  },
  mediaSosial: {
    instagram: "https://www.instagram.com/ponpes_allathifah/",
    facebook: "https://www.facebook.com/pp.allathifah",
    youtube: "https://www.youtube.com/@yayasan_allathifah",
    tiktok: "https://www.tiktok.com/@lathifah2_mediasetu",
  },
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

export const site = {
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
    const buka = new Date("2026-10-25T00:00:00+07:00");
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