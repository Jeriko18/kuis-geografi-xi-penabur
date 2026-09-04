# Kuis Geografi Kelas XI BPK PENABUR — Poros Maritim & Flora-Fauna Indonesia

Aplikasi website kuis interaktif mata pelajaran Geografi Kelas XI BPK PENABUR yang mencakup topik **Poros Maritim Indonesia** dan **Flora dan Fauna Indonesia**.

---

## 🌟 Ringkasan Fitur
- **60 Soal Pilihan Ganda (A–E)** yang terbagi secara presisi:
  - 30 Soal Poros Maritim Indonesia
  - 30 Soal Flora dan Fauna Indonesia
- **Level Kognitif Terstruktur**: C2 (Memahami), C3 (Menerapkan), C4 (Menganalisis), dan C5 (Mengevaluasi).
- **Timer Real-Time Persisten**: Batas waktu 45 menit yang tidak akan hilang meski halaman dimuat ulang (*refresh*).
- **Pembahasan & Kunci Jawaban Instan**: Kunci dan penjelasan muncul secara aman setelah opsi dikunci.
- **Navigasi Soal 1–60**: Penanda warna status (belum dikerjakan, aktif, benar, dan salah) serta filter per bab.
- **Halaman Hasil & Evaluasi**: Menampilkan skor 0–100, waktu pengerjaan, serta opsi *Ulangi Soal yang Salah*.
- **Branding**: Menampilkan identitas profesional **MADE BY GEOFREY**.

---

## 🚀 Cara Menjalankan Secara Lokal

1. **Ekstrak File ZIP** dan buka terminal di dalam folder proyek:
   ```bash
   cd kuis-geografi-xi-penabur
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Jalankan Server Pengembangan**:
   ```bash
   npm run dev
   ```
   Buka URL yang tertera di terminal (contoh: `http://localhost:5173`).

4. **Build untuk Produksi**:
   ```bash
   npm run build
   ```

---

## ⚙️ Panduan Kustomisasi

- **Mengubah Durasi Timer**:
  Buka file `src/data/questions.ts` dan ubah nilai variabel:
  ```typescript
  export const QUIZ_DURATION_MINUTES = 45;
  ```

- **Mengubah / Menambah Soal**:
  Edit array `questions` di `src/data/questions.ts`.

- **Mengubah Identitas Branding**:
  Cari teks `MADE BY GEOFREY` di `Header.tsx`, `HeroSection.tsx`, `ResultSummary.tsx`, dan `App.tsx`.

---

## 📤 Panduan Upload ke GitHub

```bash
git init
git add .
git commit -m "Initial commit - Website Kuis Geografi XI BPK PENABUR"
git branch -M main
git remote add origin https://github.com/USERNAME/kuis-geografi-xi-penabur.git
git push -u origin main
```

---
*Dibuat secara khusus untuk pembelajaran Geografi Kelas XI SMA BPK PENABUR.*
