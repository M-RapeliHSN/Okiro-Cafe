/**
 * ÖKIRO CAFÉ - Core Interactive Script
 * Features: Menu catalog, direct WhatsApp ordering, category filter, live search, dynamic store status, animated counters, scroll reveals
 */

// ==========================================
// 1. CONFIGURATION & DATABASE
// ==========================================
const CONFIG = {
  cafeName: "ÖKIRO CAFÉ",
  whatsappNumber: "6281234567890", // Ganti dengan nomor WhatsApp admin kafe
  currency: "Rp",
  openHour: 8,
  closeHour: 22
};

const MENU_ITEMS = [
  {
    id: "m1",
    name: "Matcha Espresso Fusion",
    category: "signature",
    price: 28000,
    desc: "Harmoni matcha Uji Jepang premium dengan single origin espresso & susu segar.",
    badge: "Signature",
    image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "m2",
    name: "Tokyo Sea Salt Cold Brew",
    category: "signature",
    price: 26000,
    desc: "Cold brew 12 jam lembut dengan lapisan foam sea salt gurih berpadu aroma karamel.",
    badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "m3",
    name: "Ökiro Kopi Susu Aren",
    category: "signature",
    price: 22000,
    desc: "Espresso gayo, susu segar creamy, dan gula aren organik khas racikan Ökiro.",
    badge: "Favorit UMKM",
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "m4",
    name: "Kyoto Hojicha Latte",
    category: "non-coffee",
    price: 25000,
    desc: "Teh hijau panggang aromatik khas Kyoto dengan susu creamy dan sedikit rasa nutty.",
    badge: "Authentic",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "m5",
    name: "Classic Americano / Long Black",
    category: "espresso",
    price: 18000,
    desc: "Double shot espresso arabika Flores & Gayo dengan tasting notes citrus dan clean finish.",
    badge: "",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "m6",
    name: "Fluffy Cafe Latte",
    category: "espresso",
    price: 24000,
    desc: "Keseimbangan espresso manis dengan microfoam susu lembut yang hangat memeluk.",
    badge: "",
    image: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "m7",
    name: "Yuzu Sparkling Americano",
    category: "signature",
    price: 27000,
    desc: "Perpaduan segar espresso dingin, selai jeruk Yuzu asli, dan sparkling soda bergelembung.",
    badge: "Refreshing",
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "m8",
    name: "Ichigo Blossom Fruit Tea",
    category: "non-coffee",
    price: 23000,
    desc: "Teh artisan cold infused dengan potongan stroberi segar, madu, dan aroma daun mint.",
    badge: "Segar Alami",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "m9",
    name: "Valrhona Artisan Dark Choco",
    category: "non-coffee",
    price: 26000,
    desc: "Cokelat hitam pekat 70% dengan steamed fresh milk bertekstur kental dan harum.",
    badge: "",
    image: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "m10",
    name: "Shokupan French Toast",
    category: "pastry",
    price: 25000,
    desc: "Roti tawar Jepang tebal karamelisasi mentega harum disajikan dengan maple syrup & butter.",
    badge: "Chef's Pick",
    image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "m11",
    name: "Artisan Butter Croissant",
    category: "pastry",
    price: 22000,
    desc: "Pastry renyah berlapis keemasan dengan keharuman butter New Zealand otentik.",
    badge: "Fresh Baked",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "m12",
    name: "Matcha Basque Cheesecake",
    category: "pastry",
    price: 28000,
    desc: "Kue keju panggang ala Basque dengan lelehan lembut Uji matcha di bagian tengah.",
    badge: "Must Try",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80"
  }
];

// ==========================================
// 2. STATE
// ==========================================
let currentCategory = "all";
let searchQuery = "";

// Format Rupiah
function formatRupiah(number) {
  return "Rp " + number.toLocaleString("id-ID");
}

// ==========================================
// 3. CATALOG RENDERING
// ==========================================
function getFilteredItems() {
  return MENU_ITEMS.filter(item => {
    const matchCategory = currentCategory === "all" || item.category === currentCategory;
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });
}

function renderCatalog() {
  const grid = document.getElementById("productGrid");
  const emptyState = document.getElementById("catalogEmpty");
  if (!grid) return;

  const items = getFilteredItems();

  if (items.length === 0) {
    grid.innerHTML = "";
    if (emptyState) emptyState.classList.remove("hidden");
    return;
  }

  if (emptyState) emptyState.classList.add("hidden");

  grid.innerHTML = items.map((item, index) => {
    return `
      <div class="product-card group relative bg-white rounded-2xl overflow-hidden border border-stone-200/70 shadow-sm flex flex-col justify-between reveal-item delay-${(index % 4 + 1) * 100}">
        <!-- Image Container -->
        <div class="relative w-full h-48 overflow-hidden bg-stone-100">
          <img 
            src="${item.image}" 
            alt="${item.name}" 
            loading="lazy"
            class="product-image w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>
          
          ${item.badge ? `
            <span class="absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-full text-white shadow-sm ${
              item.badge === 'Signature' || item.badge === 'Best Seller' ? 'shimmer-badge' : 'bg-[#2C4027]'
            }">
              ${item.badge}
            </span>
          ` : ''}

          <span class="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-[#1A1A1A] font-bold text-xs px-2.5 py-1 rounded-full shadow">
            ${formatRupiah(item.price)}
          </span>
        </div>

        <!-- Details -->
        <div class="p-4 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-1">
              <span class="text-[11px] uppercase tracking-wider text-[#829C71] font-semibold">
                ${item.category === 'signature' ? 'Signature Craft' : item.category === 'espresso' ? 'Espresso Based' : item.category === 'non-coffee' ? 'Non-Coffee' : 'Pastry & Bakery'}
              </span>
            </div>
            <h3 class="font-bold text-[#1A1A1A] text-base group-hover:text-[#829C71] transition-colors leading-snug">
              ${item.name}
            </h3>
            <p class="text-xs text-stone-500 mt-1.5 line-clamp-2 leading-relaxed font-medium">
              ${item.desc}
            </p>
          </div>

          <!-- Action Button: Direct WhatsApp Order -->
          <div class="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
            <div class="text-xs text-stone-400 font-medium flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>Diseduh Segar</span>
            </div>
            
            <button 
              onclick="orderProductViaWhatsApp('${item.id}')"
              class="relative flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-semibold px-4 py-2 rounded-full transition-all duration-300 shadow hover:shadow-md active:scale-95 group/btn"
              aria-label="Pesan ${item.name} via WhatsApp"
            >
              <svg class="w-3.5 h-3.5 fill-current transition-transform group-hover/btn:rotate-12 duration-300" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>Pesan via WA</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");

  observeRevealElements();
}

// ==========================================
// 4. DIRECT WHATSAPP ORDER FUNCTION
// ==========================================
function orderProductViaWhatsApp(productId) {
  const item = MENU_ITEMS.find(m => m.id === productId);
  if (!item) return;

  // Build direct WhatsApp message
  let text = `*☕ PESANAN MENU - ${CONFIG.cafeName}*\n`;
  text += `═══════════════════════\n`;
  text += `Halo Admin Ökiro Café, saya ingin memesan menu ini:\n\n`;
  text += `• *${item.name}*\n`;
  text += `  Kategori: ${item.category.toUpperCase()}\n`;
  text += `  Harga: ${formatRupiah(item.price)}\n\n`;
  text += `═══════════════════════\n`;
  text += `Apakah menu ini saat ini tersedia? Terima kasih! 🙏🍃`;

  const encodedText = encodeURIComponent(text);
  const waUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedText}`;

  // Open WhatsApp in a new tab
  window.open(waUrl, "_blank");
}

// ==========================================
// 5. DYNAMIC STORE STATUS & COUNTERS
// ==========================================
function updateStoreStatus() {
  const now = new Date();
  const currentHour = now.getHours();
  const isOpen = currentHour >= CONFIG.openHour && currentHour < CONFIG.closeHour;

  const statusText = document.getElementById("storeStatusText");
  const statusDot = document.getElementById("storeStatusDot");

  if (statusText && statusDot) {
    if (isOpen) {
      statusDot.className = "w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping absolute";
      statusText.innerText = `Buka Sekarang • 08:00 - 22:00`;
    } else {
      statusDot.className = "w-2.5 h-2.5 rounded-full bg-amber-500";
      statusText.innerText = `Tutup • Buka Kembali Pukul 08:00 WIB`;
    }
  }
}

// Animated Numerical Counters
function initCounters() {
  const counters = document.querySelectorAll(".stat-counter");
  const options = { threshold: 0.5 };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseFloat(counter.getAttribute("data-target"));
        const suffix = counter.getAttribute("data-suffix") || "";
        const isDecimal = target % 1 !== 0;
        let start = 0;
        const duration = 1800;
        const stepTime = 25;
        const steps = duration / stepTime;
        const increment = target / steps;

        const timer = setInterval(() => {
          start += increment;
          if (start >= target) {
            counter.innerText = (isDecimal ? target.toFixed(1) : Math.floor(target)) + suffix;
            clearInterval(timer);
          } else {
            counter.innerText = (isDecimal ? start.toFixed(1) : Math.floor(start)) + suffix;
          }
        }, stepTime);

        obs.unobserve(counter);
      }
    });
  }, options);

  counters.forEach(c => observer.observe(c));
}

// ==========================================
// 6. SCROLL REVEAL OBSERVER
// ==========================================
function observeRevealElements() {
  const elements = document.querySelectorAll(".reveal-item, .reveal-left, .reveal-right, .reveal-scale");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  elements.forEach(el => observer.observe(el));
}

// ==========================================
// 7. INITIALIZATION & EVENT LISTENERS
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  // 1. Initial Renders
  renderCatalog();
  updateStoreStatus();
  observeRevealElements();
  initCounters();

  // 2. Category Tab Filter Listeners
  const categoryButtons = document.querySelectorAll(".category-btn");
  categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      categoryButtons.forEach(b => {
        b.classList.remove("bg-[#829C71]", "text-white", "shadow-md");
        b.classList.add("bg-white", "text-stone-600", "border-stone-200");
      });

      btn.classList.remove("bg-white", "text-stone-600", "border-stone-200");
      btn.classList.add("bg-[#829C71]", "text-white", "shadow-md");

      currentCategory = btn.getAttribute("data-category");
      renderCatalog();
    });
  });

  // 3. Search Bar Live Filtering
  const searchInput = document.getElementById("menuSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      renderCatalog();
    });
  }

  // 4. Mobile Navigation Menu Toggle
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });

    // Auto close when nav item clicked
    const mobileNavLinks = mobileMenu.querySelectorAll("a");
    mobileNavLinks.forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });
    });
  }

  // 5. Navbar Scroll Background Adjustment
  const navbar = document.getElementById("mainNavbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("shadow-sm", "bg-[#F6F4EB]/95");
      navbar.classList.remove("bg-[#F6F4EB]/80");
    } else {
      navbar.classList.remove("shadow-sm", "bg-[#F6F4EB]/95");
      navbar.classList.add("bg-[#F6F4EB]/80");
    }
  });
});
