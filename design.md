# Design System & Guidelines
**Project Name:** ÖKIRO CAFÉ
**Theme:** Japanese-Minimalist, Clean, Warm

## 1. Color Palette
Skema warna diekstrak langsung dari elemen visual logo ÖKIRO (cangkir hijau dan nuansa pastel).
* **Background Utama:** Off-White / Krem Pastel (`#F6F4EB`)
  *Fungsi: Memberikan kesan ruang yang hangat, bersih, dan lapang.*
* **Aksen Utama:** Sage Green (`#829C71`)
  *Fungsi: Warna utama untuk tombol CTA, *badge* keranjang, dan elemen penekanan lainnya.*
* **Aksen Sekunder:** Dark Forest Green (`#2C4027`)
  *Fungsi: Digunakan untuk efek *hover* pada tombol agar terasa interaktif.*
* **Warna Teks:** Charcoal / Hitam Pekat (`#1A1A1A`)
  *Fungsi: Digunakan pada *heading* dan teks *body* untuk memastikan kontras dan keterbacaan tinggi.*

## 2. Typography
Tipografi dipilih untuk mereplikasi kelengkungan (rounded) dan keramahan dari jenis huruf pada logo ÖKIRO.
* **Font Family Utama:** `Quicksand` atau `Nunito` (Tersedia di Google Fonts).
* **Karakteristik:** Memiliki ujung membulat (*rounded terminals*), geometris, dan modern. Sangat cocok untuk *brand* UMKM yang ingin tampil bersahabat namun profesional.

## 3. UI Components (Tailwind Classes Reference)
* **Global Body:** `bg-[#F6F4EB] text-[#1A1A1A] font-quicksand antialiased`
* **Buttons (Primary CTA):** `bg-[#829C71] hover:bg-[#2C4027] text-white rounded-full px-6 py-2 transition-all duration-300 shadow-md`
* **Product Cards:** `bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100`
* **Navbar:** `fixed top-0 w-full bg-[#F6F4EB]/90 backdrop-blur-md z-50 border-b border-[#829C71]/20`
* **Modals & Overlays:** Latar belakang *overlay* hitam transparan (`bg-black/40 backdrop-blur-sm`), dengan kontainer *modal* melengkung (`bg-white rounded-3xl`).

## 4. Layouting & Spacing
* Fokus pada *white-space* (ruang kosong) yang lega. Jangan menumpuk elemen terlalu rapat.
* **Container Width:** Gunakan `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8` agar konten terpusat dan rapi di layar lebar.
* **Grid Produk:** Gunakan `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6` (2 kolom di HP, 3-4 kolom di laptop).