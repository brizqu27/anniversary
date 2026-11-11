# Anniversary Abdul ♡ Dela

Website statis tanpa install apa pun. Cukup buka `index.html` di browser.

## Struktur file
```
anniversary-dela/
├── index.html          isi halaman (semua teks dan bagian)
├── css/
│   ├── base.css        warna (:root), hero, menu, kartu, timeline, galeri, kuis, surat, footer
│   ├── mobile.css      tampilan HP, ukuran tombol, mode gelap dasar
│   ├── features.css    amplop, hitung mundur, chat, janji, tombol sayangg, hujan hati
│   ├── music.css       tombol musik dan hati melayang di latar
│   └── slides.css      tampilan slide, tombol Kembali/Lanjut, menu
├── js/
│   ├── game.js         kuis, truth or dare, who is more likely, kode rahasia, upload foto
│   ├── main.js         amplop, hitung mundur, penghitung hari, tombol sayangg, surat bertahap
│   ├── music.js        musik latar (musik.mp3 atau melodi buatan browser)
│   └── slides.js       perpindahan slide, swipe, menu (judul menu ada di TITLES)
├── musik.mp3           (opsional, taruh sendiri)
└── foto/               (opsional, taruh sendiri)
```
Website ini berbentuk slide: satu bagian (`<section>`) per layar, halaman tidak bisa di-scroll. Pindah lewat tombol Kembali/Lanjut, swipe kiri-kanan, panah keyboard, atau menu ☰ di kiri atas. Kalau satu slide isinya panjang, hanya slide itu yang bisa digulir.

Urutan `<link>` dan `<script>` di `index.html` jangan ditukar, karena CSS yang di bawah menimpa yang di atas.

## Mau mengubah apa, buka file mana
| Yang mau diubah | File | Cari |
|---|---|---|
| Nama, tanggal, tulisan di halaman pembuka | `index.html` | `class="hero"` |
| Cerita, timeline, alasan, penghargaan, janji | `index.html` | `id="story"`, `id="timeline"`, `id="reasons"`, `id="awards"`, `id="promise"` |
| Chat pertama | `index.html` | `class="chat"` |
| Isi surat | `index.html` | `class="letter"` |
| Daftar impian | `index.html` | `id="dreams"` |
| Tanggal hitung mundur dan hari jadian | `js/main.js` | `new Date(` (bulan mulai dari 0, jadi 10 = November) |
| Pesan tombol sayangg | `js/main.js` | `var msgs` |
| Kecepatan surat muncul | `js/main.js` | `2200` (milidetik per paragraf) |
| Pertanyaan kuis, truth, dare | `js/game.js` | `const questions`, `const truths`, `const dares` |
| Kode rahasia dan pesannya | `js/game.js` dan `index.html` | `11112023`, `id="secretMessage"` |
| Warna utama | `css/base.css` | `:root{` |
| Tambah/hapus/urutkan slide | `index.html` | tiap `<section id="...">` di dalam `<main>` adalah satu slide. Judul di menu: `TITLES` di `js/slides.js` |
| Tampilan tombol dan animasi slide | `css/slides.css` | `.nbtn`, `@keyframes slideIn` |
| Volume musik | `js/music.js` | `audio.volume` |

## Musik
- Taruh `musik.mp3` di folder yang sama dengan `index.html`. File itu yang akan diputar.
- Kalau tidak ada, otomatis diputar melodi kotak musik buatan browser.
- Pastikan kamu berhak memakai lagunya sebelum meng-upload ke GitHub publik.

## Foto tetap (opsional)
Foto yang dipasang lewat galeri hanya tampil di perangkat yang dipakai. Supaya selalu muncul, taruh gambar di folder `foto/`, lalu di `index.html` ganti isi `<div class="photo">...</div>` menjadi `<div class="photo"><img src="foto/nama.jpg" alt="Kenangan"></div>`.

## Deploy ke GitHub Pages
1. Buat repository baru di github.com (misalnya `anniversary`).
2. Upload semua isi folder ini, termasuk folder `css` dan `js`, lalu Commit. Kalau lewat web, drag-and-drop foldernya sekaligus.
3. Settings → Pages → Branch `main`, folder `/ (root)` → Save.
4. Tunggu 1 sampai 2 menit. Linknya: `https://USERNAME.github.io/anniversary/`

Catatan: repository publik bisa dibaca siapa saja, termasuk isi surat dan kode rahasia. Untuk lebih privat, pakai repository private.
# anniversary
# anniversary
# anniversary
