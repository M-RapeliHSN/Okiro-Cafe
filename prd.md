# Product Requirements Document (PRD)
**Project Name:** ÖKIRO CAFÉ Website
**Type:** Static E-Commerce / Interactive Catalog
**Target Audience:** UMKM Customers

## 1. Project Overview
Website ini adalah *landing page* dan katalog produk interaktif untuk kedai kopi "ÖKIRO CAFÉ". Website dibangun menggunakan pendekatan *static-first* (tanpa *database backend*) untuk performa maksimal, keamanan, dan kemudahan *hosting* gratis. Fungsionalitas pemesanan dilakukan secara *client-side* dan diteruskan langsung ke WhatsApp penjual.

## 2. Tech Stack
* **Markup:** HTML5
* **Styling:** Tailwind CSS (via CDN untuk pengembangan cepat)
* **Interactivity:** Vanilla JavaScript
* **Hosting Target:** GitHub Pages / Vercel / Netlify

## 3. Core Features
1. **Katalog Produk (Grid Layout):** 
   - Menampilkan daftar menu (kopi, non-kopi, camilan/pastry).
   - Setiap kartu produk berisi foto, nama produk, harga, dan tombol aksi "+ Pesan".
2. **Keranjang Belanja (Client-Side):** 
   - Menyimpan *state* pesanan sementara menggunakan JavaScript Array.
   - Menampilkan *badge* dinamis berisi jumlah *item* pada ikon keranjang di *navbar* secara *real-time*.
3. **Checkout via WhatsApp (WhatsApp API):**
   - *Pop-up modal* muncul saat keranjang diklik, menampilkan rincian pesanan (nama *item*, *quantity*, harga satuan, dan total bayar).
   - Saat tombol checkout ditekan, skrip akan melakukan kompilasi pesanan menjadi teks *URL encoded* dan mengarahkan pengguna ke link `wa.me/nomor_tujuan?text=pesanan`.

## 4. User Flow
1. Pengguna membuka *website* dan melihat *hero section* serta katalog produk.
2. Pengguna menekan tombol "+ Pesan" pada produk yang diinginkan.
3. *Badge* pada ikon keranjang bertambah secara visual.
4. Pengguna menekan ikon keranjang, *modal checkout* muncul menampilkan daftar rincian belanja.
5. Pengguna menekan "Pesan via WhatsApp", lalu sistem membuka aplikasi WhatsApp dengan draf pesan otomatis yang siap dikirim ke admin kafe.