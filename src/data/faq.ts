// FAQ items are defined once and consumed twice:
//   1. FAQ.astro renders them as an accordion
//   2. index.astro emits them as FAQPage JSON-LD for search engines
// Keep the answers plain text (no HTML) so the JSON-LD stays valid.

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    question: 'Bagaimana sistem pendidikan formalnya?',
    answer:
      'Santri mengikuti pendidikan formal SMP/MTs, SMA/MA yang terakreditasi B di lingkungan pondok (kelas khusus santri). Jam pelajaran formal full day pukul 08.00-14.50 WIB, tahfidz & keagamaan sore hingga malam.',
  },
  {
    question: 'Apakah boleh membawa HP / gadget pribadi?',
    answer:
      'Tidak diperbolehkan membawa HP/gadget pribadi. Komunikasi dengan orang tua via telepon umum pondok (tersedia di setiap asrama) atau jadwal video call mingguan yang disediakan pondok.',
  },
  {
    question: 'Kapan kunjungan orang tua (Silaturahmi)?',
    answer:
      'Silaturahmi boleh setiap minggu, pukul 09.00-15.00 WIB. Diluar jadwal tersebut memerlukan izin tertulis Bagian Pengasuhan Santri. Khusus bulan Ramadhan & hari besar Islam: jadwal khusus diinformasikan via WA broadcast.',
  },
  {
    question: 'Apakah ada biaya tersembunyi selain yang tercantum?',
    answer:
      'Tidak ada biaya tersembunyi. Semua biaya wajib tercantum detail di halaman Biaya (Umum/Dhuafa/Yatim). Biaya opsional (foto kenangan, baju lomba, souvenir, dana sosial, dll) diinformasikan terpisah sebelum kegiatan.',
  },
];
