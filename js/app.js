/**
 * ÖKIRO CAFÉ - Core Interactive Script (Multi-Branch & Shopping Cart Edition)
 * Features:
 * 1. Multi-Branch Management (Jakarta Senopati, Bandung Dago, Bali Canggu) with dedicated WhatsApp numbers
 * 2. Interactive Shopping Cart System (Add to Cart, +/- Qty, Notes, Dine-in/Takeaway)
 * 3. Dynamic Branch Selection during checkout with formatted WhatsApp message generation
 * 4. Interactive Location Tab Switcher with dynamic Google Maps iframe & branch profiles
 * 5. Menu Filter, Live Search, Dynamic Store Status, Counters, and Toast Notifications
 */

// ==========================================
// 1. CONFIGURATION & MULTI-BRANCH DATABASE
// ==========================================
const CONFIG = {
  cafeName: "ÖKIRO CAFÉ",
  currency: "Rp",
  openHour: 8,
  closeHour: 22
};

// 3 Branch Locations with dedicated WhatsApp Numbers & Specific Details
const BRANCHES = [
  {
    id: "senopati",
    name: "Ökiro Senopati (Pusat)",
    city: "Jakarta Selatan",
    tagline: "Flagship Store • Suasana Zen di Pusat Kota",
    address: "Jl. Senopati Asri No. 42, Kebayoran Baru, Jakarta Selatan 12190",
    phone: "6283846480183",
    displayPhone: "+62 838-4648-0183",
    hoursWeekday: "08:00 - 22:00 WIB",
    hoursWeekend: "07:30 - 23:00 WIB",
    badge: "Flagship Store",
    mapsUrl: "https://maps.google.com/?q=Senopati+Jakarta",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2736199859546!2d106.80918737499047!3d-6.227608993760548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f14d30079f01%3A0x2e74f4f39b6b7a5a!2sSenopati%2C%20Jakarta!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid",
    description: "Ruang tenang bergaya Wabi-Sabi di tengah Senopati yang dinamis. Menyediakan area indoor ber-AC hening khusus WFC dan outdoor beratap hijau."
  },
  {
    id: "dago",
    name: "Ökiro Dago Heritage",
    city: "Bandung",
    tagline: "Mountain Breeze • Teduh & Segar",
    address: "Jl. Ir. H. Juanda No. 128, Dago Atas, Kota Bandung 40135",
    phone: "6281234567801",
    displayPhone: "+62 812-3456-7801",
    hoursWeekday: "08:00 - 22:00 WIB",
    hoursWeekend: "07:00 - 23:00 WIB",
    badge: "Cabang Bandung",
    mapsUrl: "https://maps.google.com/?q=Dago+Bandung",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.0267272719114!2d107.6166667!3d-6.8874135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e6587c6031b7%3A0x35ef00a6e35eb076!2sJl.%20Ir.%20H.%20Juanda%2C%20Kota%20Bandung%2C%20Jawa%20Barat!5e0!3m2!1sid!2sid!4v1700000000001!5m2!1sid!2sid",
    description: "Nikmati secangkir espresso hangat ditemani udara sejuk pegunungan Dago. Halaman rumput dengan taman batu Jepang dan area semi-outdoor luas."
  },
  {
    id: "canggu",
    name: "Ökiro Canggu Sanctuary",
    city: "Bali",
    tagline: "Tropical Zen • Kopi Santai Tepi Pantai",
    address: "Jl. Pantai Batu Bolong No. 88, Canggu, Badung, Bali 80361",
    phone: "6281987654321",
    displayPhone: "+62 819-8765-4321",
    hoursWeekday: "07:30 - 22:30 WITA",
    hoursWeekend: "07:00 - 23:00 WITA",
    badge: "Cabang Bali",
    mapsUrl: "https://maps.google.com/?q=Batu+Bolong+Canggu+Bali",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.3056094371424!2d115.1278143750149!3d-8.66245229138487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd2387140e69fa9%3A0xb35a39cb6754bc49!2sJl.%20Pantai%20Batu%20Bolong%2C%20Canggu%2C%20Bali!5e0!3m2!1sid!2sid!4v1700000000002!5m2!1sid!2sid",
    description: "Perpaduan estetika Jepang minimalis dengan kehangatan tropis Bali. Hanya 5 menit dari pantai dengan interior kayu daur ulang dan cold brew spesial."
  }
];

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
// 2. STATE MANAGEMENT & LOCAL STORAGE
// ==========================================
let currentCategory = "all";
let searchQuery = "";
let selectedBranchId = localStorage.getItem("okiro_selected_branch") || "senopati";
let currentShowcaseBranchId = "senopati";
let orderType = "Dine-In";

// Initialize Cart from localStorage
let cart = [];
try {
  const savedCart = localStorage.getItem("okiro_cart_items");
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
} catch (e) {
  cart = [];
}

function saveCartToStorage() {
  try {
    localStorage.setItem("okiro_cart_items", JSON.stringify(cart));
  } catch (e) {
    console.error("Gagal menyimpan keranjang ke storage", e);
  }
}

// Format Rupiah Currency
function formatRupiah(number) {
  return "Rp " + number.toLocaleString("id-ID");
}

// Toast Notification Helper
function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast-enter bg-[#1A1A1A] text-white px-4 py-2.5 rounded-xl shadow-xl border border-[#829C71]/40 flex items-center gap-2 text-xs font-semibold pointer-events-auto transition-all";
  
  const icon = type === "success" 
    ? `<span class="text-emerald-400">✓</span>`
    : `<span class="text-amber-400">ℹ</span>`;

  toast.innerHTML = `${icon} <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    setTimeout(() => toast.remove(), 300);
  }, 2600);
}

// ==========================================
// 3. CATALOG RENDERING & ITEM INTERACTIONS
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
    const cartItem = cart.find(c => c.id === item.id);
    const inCartQty = cartItem ? cartItem.qty : 0;

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

          <!-- In-Cart indicator tag -->
          ${inCartQty > 0 ? `
            <span class="absolute top-3 right-3 bg-[#2C4027] text-white font-bold text-[10px] px-2 py-0.5 rounded-full shadow-md flex items-center gap-1">
              <span>🛒</span> <span>${inCartQty} di Keranjang</span>
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

          <!-- Actions: Add to Cart and Quick Order -->
          <div class="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
            <button 
              onclick="addToCart('${item.id}', 1)"
              class="flex-1 flex items-center justify-center gap-1.5 bg-[#829C71] hover:bg-[#2C4027] text-white text-xs font-semibold py-2 px-3 rounded-full transition-all duration-300 shadow-sm hover:shadow active:scale-95 group/btn"
              title="Masukkan ${item.name} ke Keranjang"
              aria-label="Tambah ${item.name} ke Keranjang"
            >
              <svg class="w-3.5 h-3.5 fill-none stroke-current" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"></path>
              </svg>
              <span>+ Keranjang</span>
            </button>

            <button 
              onclick="quickOrderDirect('${item.id}')"
              class="w-8 h-8 rounded-full bg-stone-100 hover:bg-[#25D366] text-stone-600 hover:text-white flex items-center justify-center transition shadow-sm active:scale-90"
              title="Pesan Langsung ke Keranjang"
              aria-label="Pesan Cepat ${item.name}"
            >
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");

  observeRevealElements();
}

// ==========================================
// 4. CART CORE LOGIC & DRAWER MANAGEMENT
// ==========================================
function addToCart(productId, quantity = 1) {
  const item = MENU_ITEMS.find(m => m.id === productId);
  if (!item) return;

  const existing = cart.find(c => c.id === productId);
  if (existing) {
    existing.qty += quantity;
  } else {
    cart.push({
      id: item.id,
      name: item.name,
      category: item.category,
      price: item.price,
      image: item.image,
      qty: quantity
    });
  }

  saveCartToStorage();
  updateCartBadges();
  renderCatalog();
  renderCart();

  showToast(`${item.name} berhasil ditambahkan ke keranjang!`);

  // Animate cart button
  const desktopBadge = document.getElementById("cartCountBadgeNavbar");
  if (desktopBadge) {
    desktopBadge.classList.add("cart-indicator-bounce");
    setTimeout(() => desktopBadge.classList.remove("cart-indicator-bounce"), 400);
  }
}

function quickOrderDirect(productId) {
  addToCart(productId, 1);
  openCart();
}

function updateCartItemQty(productId, delta) {
  const itemIndex = cart.findIndex(c => c.id === productId);
  if (itemIndex === -1) return;

  cart[itemIndex].qty += delta;

  if (cart[itemIndex].qty <= 0) {
    const removedName = cart[itemIndex].name;
    cart.splice(itemIndex, 1);
    showToast(`${removedName} dihapus dari keranjang`);
  }

  saveCartToStorage();
  updateCartBadges();
  renderCatalog();
  renderCart();
}

function removeFromCart(productId) {
  const itemIndex = cart.findIndex(c => c.id === productId);
  if (itemIndex === -1) return;

  const removedName = cart[itemIndex].name;
  cart.splice(itemIndex, 1);
  saveCartToStorage();
  updateCartBadges();
  renderCatalog();
  renderCart();
  showToast(`${removedName} dihapus dari keranjang`);
}

function clearCart() {
  if (cart.length === 0) return;
  if (confirm("Kosongkan semua pesanan dalam keranjang?")) {
    cart = [];
    saveCartToStorage();
    updateCartBadges();
    renderCatalog();
    renderCart();
    showToast("Keranjang berhasil dikosongkan");
  }
}

function openCart() {
  const drawer = document.getElementById("cartDrawer");
  const backdrop = document.getElementById("cartDrawerBackdrop");
  if (!drawer || !backdrop) return;

  renderCart();

  backdrop.classList.remove("opacity-0", "pointer-events-none");
  backdrop.classList.add("opacity-100", "pointer-events-auto");
  drawer.classList.remove("translate-x-full");
  drawer.classList.add("translate-x-0");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  const drawer = document.getElementById("cartDrawer");
  const backdrop = document.getElementById("cartDrawerBackdrop");
  if (!drawer || !backdrop) return;

  backdrop.classList.remove("opacity-100", "pointer-events-auto");
  backdrop.classList.add("opacity-0", "pointer-events-none");
  drawer.classList.remove("translate-x-0");
  drawer.classList.add("translate-x-full");
  document.body.style.overflow = "";
}

function updateCartBadges() {
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  // Navbar Badges
  const navbarBadge = document.getElementById("cartCountBadgeNavbar");
  const mobileBadge = document.getElementById("cartCountBadgeMobile");
  if (navbarBadge) navbarBadge.innerText = totalQty;
  if (mobileBadge) mobileBadge.innerText = totalQty;

  // Drawer Badge
  const drawerBadge = document.getElementById("cartDrawerItemCountBadge");
  if (drawerBadge) drawerBadge.innerText = `${totalQty} Item`;

  // Floating Cart Bar
  const floatingBar = document.getElementById("floatingCartBar");
  const floatingBadge = document.getElementById("floatingCartBadge");
  const floatingText = document.getElementById("floatingCartText");
  const floatingTotal = document.getElementById("floatingCartTotal");
  const floatingWaBtn = document.getElementById("floatingWaButton");

  if (floatingBar && floatingBadge && floatingText && floatingTotal) {
    if (totalQty > 0) {
      floatingBar.classList.remove("hidden");
      floatingBadge.innerText = totalQty;
      floatingText.innerText = `${totalQty} Item`;
      floatingTotal.innerText = formatRupiah(totalPrice);
      // Lift WA button slightly to avoid overlap
      if (floatingWaBtn) floatingWaBtn.style.bottom = "84px";
    } else {
      floatingBar.classList.add("hidden");
      if (floatingWaBtn) floatingWaBtn.style.bottom = "24px";
    }
  }
}

function renderCart() {
  const emptyState = document.getElementById("cartEmptyState");
  const contentWrapper = document.getElementById("cartContentWrapper");
  const footerWrapper = document.getElementById("cartDrawerFooter");
  const listContainer = document.getElementById("cartItemsList");
  const subtotalEl = document.getElementById("cartDrawerSubtotal");
  const totalEl = document.getElementById("cartDrawerTotal");
  const checkoutBtnText = document.getElementById("btnCheckoutText");

  if (!listContainer || !emptyState || !contentWrapper || !footerWrapper) return;

  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  if (cart.length === 0) {
    emptyState.classList.remove("hidden");
    contentWrapper.classList.add("hidden");
    footerWrapper.classList.add("hidden");
    return;
  }

  emptyState.classList.add("hidden");
  contentWrapper.classList.remove("hidden");
  footerWrapper.classList.remove("hidden");

  // Render items list
  listContainer.innerHTML = cart.map(item => {
    return `
      <div class="flex items-center justify-between gap-3 p-3 bg-white rounded-xl border border-stone-200/80 shadow-sm">
        <img 
          src="${item.image}" 
          alt="${item.name}" 
          class="w-14 h-14 rounded-lg object-cover flex-shrink-0 bg-stone-100" 
        />
        <div class="flex-1 min-w-0">
          <h4 class="text-xs font-bold text-[#1A1A1A] truncate">${item.name}</h4>
          <p class="text-[11px] text-stone-500 font-medium">${formatRupiah(item.price)}</p>
          <p class="text-[10px] text-[#829C71] font-bold mt-0.5">${formatRupiah(item.price * item.qty)}</p>
        </div>
        <div class="flex items-center gap-2 flex-shrink-0">
          <div class="flex items-center border border-stone-200 rounded-full bg-[#F6F4EB] px-1 py-0.5">
            <button 
              onclick="updateCartItemQty('${item.id}', -1)"
              class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-stone-600 hover:bg-stone-200 transition"
              aria-label="Kurangi jumlah ${item.name}"
            >
              -
            </button>
            <span class="w-6 text-center text-xs font-bold text-[#1A1A1A]">${item.qty}</span>
            <button 
              onclick="updateCartItemQty('${item.id}', 1)"
              class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-stone-600 hover:bg-stone-200 transition"
              aria-label="Tambah jumlah ${item.name}"
            >
              +
            </button>
          </div>
          <button 
            onclick="removeFromCart('${item.id}')"
            class="p-1 text-stone-400 hover:text-red-500 transition"
            title="Hapus menu ini"
            aria-label="Hapus menu ${item.name}"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </button>
        </div>
      </div>
    `;
  }).join("");

  if (subtotalEl) subtotalEl.innerText = formatRupiah(totalPrice);
  if (totalEl) totalEl.innerText = formatRupiah(totalPrice);

  // Sync selected branch radio
  const branchRadios = document.querySelectorAll("input[name='cartBranchSelect']");
  branchRadios.forEach(radio => {
    radio.checked = radio.value === selectedBranchId;
  });

  const branch = BRANCHES.find(b => b.id === selectedBranchId) || BRANCHES[0];
  if (checkoutBtnText) {
    checkoutBtnText.innerText = `Kirim Pesanan ke WA Cabang ${branch.name.split(" ")[1] || branch.city}`;
  }
}

// Select Branch within Cart Drawer
function selectCartBranch(branchId) {
  selectedBranchId = branchId;
  localStorage.setItem("okiro_selected_branch", branchId);

  const branch = BRANCHES.find(b => b.id === branchId);
  const checkoutBtnText = document.getElementById("btnCheckoutText");
  if (branch && checkoutBtnText) {
    checkoutBtnText.innerText = `Kirim Pesanan ke WA Cabang ${branch.name.split(" ")[1] || branch.city}`;
    showToast(`Cabang pemesanan dipilih: ${branch.name}`);
  }
}

function updateOrderType(type) {
  orderType = type;
}

// ==========================================
// 5. DIRECT WHATSAPP CHECKOUT (MULTI-BRANCH)
// ==========================================
function checkoutViaWhatsApp() {
  if (cart.length === 0) {
    showToast("Keranjang Anda masih kosong. Silakan pilih menu terlebih dahulu.", "info");
    return;
  }

  const branch = BRANCHES.find(b => b.id === selectedBranchId) || BRANCHES[0];
  const customerNameInput = document.getElementById("cartCustomerName");
  const notesInput = document.getElementById("cartOrderNotes");

  const customerName = (customerNameInput && customerNameInput.value.trim()) 
    ? customerNameInput.value.trim() 
    : "Pelanggan Ökiro";

  const notes = (notesInput && notesInput.value.trim()) 
    ? notesInput.value.trim() 
    : "-";

  const totalQuantity = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  // Construct Formatted WhatsApp Message
  let message = `*PESANAN ÖKIRO CAFÉ - CABANG ${branch.city.toUpperCase()}*\n`;
  message += `═════════════════════════════\n`;
  message += `📍 *Cabang Tujuan:* ${branch.name}\n`;
  message += `👤 *Nama Pemesan:* ${customerName}\n`;
  message += `🍽️ *Tipe Pesanan:* ${orderType}\n`;
  message += `📝 *Catatan Khusus:* ${notes}\n`;
  message += `═════════════════════════════\n`;
  message += `📋 *RINCIAN MENU (${totalQuantity} item):*\n\n`;

  cart.forEach((item, index) => {
    const itemSubtotal = item.price * item.qty;
    message += `${index + 1}. *${item.name}*\n`;
    message += `   Jumlah: ${item.qty}x @ ${formatRupiah(item.price)}\n`;
    message += `   Subtotal: ${formatRupiah(itemSubtotal)}\n\n`;
  });

  message += `═════════════════════════════\n`;
  message += `💰 *TOTAL PEMBAYARAN: ${formatRupiah(totalPrice)}*\n`;
  message += `═════════════════════════════\n`;
  message += `Halo Admin Ökiro ${branch.city}, mohon konfirmasi ketersediaan menu di atas dan panduan pembayarannya. Terima kasih! 🙏☕`;

  // Encode message for URL
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${branch.phone}?text=${encodedMessage}`;

  showToast(`Membuka WhatsApp Cabang ${branch.name}...`);

  // Open WhatsApp in new tab
  window.open(whatsappUrl, "_blank");
}

// ==========================================
// 6. MULTI-BRANCH SHOWCASE (SECTION #LOKASI)
// ==========================================
function selectBranchTab(branchId) {
  currentShowcaseBranchId = branchId;
  const branch = BRANCHES.find(b => b.id === branchId);
  if (!branch) return;

  // Update Tab Buttons UI
  const tabButtons = document.querySelectorAll(".branch-tab-btn");
  tabButtons.forEach(btn => {
    btn.className = "branch-tab-btn flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 bg-stone-100 text-stone-600 hover:bg-stone-200";
    const dot = btn.querySelector("span:first-child");
    if (dot) dot.className = "w-2 h-2 rounded-full bg-stone-400";
  });

  const activeBtn = document.getElementById(`branchTabBtn-${branchId}`);
  if (activeBtn) {
    activeBtn.className = "branch-tab-btn flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 bg-[#829C71] text-white shadow-md";
    const activeDot = activeBtn.querySelector("span:first-child");
    if (activeDot) activeDot.className = "w-2 h-2 rounded-full bg-white";
  }

  // Update Details in Section
  const badgeEl = document.getElementById("showcaseBranchBadge");
  const cityEl = document.getElementById("showcaseBranchCity");
  const nameEl = document.getElementById("showcaseBranchName");
  const descEl = document.getElementById("showcaseBranchDesc");
  const addrEl = document.getElementById("showcaseBranchAddress");
  const weekdayEl = document.getElementById("showcaseBranchWeekday");
  const weekendEl = document.getElementById("showcaseBranchWeekend");
  const phoneEl = document.getElementById("showcaseBranchPhone");
  const mapsLink = document.getElementById("showcaseBranchMapsLink");
  const iframeEl = document.getElementById("showcaseBranchIframe");
  const overlayName = document.getElementById("showcaseOverlayName");
  const overlayCity = document.getElementById("showcaseOverlayCity");

  if (badgeEl) badgeEl.innerText = branch.badge;
  if (cityEl) cityEl.innerText = branch.city;
  if (nameEl) nameEl.innerText = branch.name;
  if (descEl) descEl.innerText = branch.description;
  if (addrEl) addrEl.innerText = branch.address;
  if (weekdayEl) weekdayEl.innerText = branch.hoursWeekday;
  if (weekendEl) weekendEl.innerText = branch.hoursWeekend;
  if (phoneEl) phoneEl.innerText = branch.displayPhone;
  if (mapsLink) mapsLink.href = branch.mapsUrl;
  if (iframeEl) iframeEl.src = branch.mapEmbed;
  if (overlayName) overlayName.innerText = `ÖKIRO CAFÉ • ${branch.name}`;
  if (overlayCity) overlayCity.innerText = `${branch.city} • Buka Setiap Hari`;

  // Auto-sync cart branch selection as well
  selectCartBranch(branchId);
}

function orderToCurrentShowcaseBranch() {
  selectCartBranch(currentShowcaseBranchId);
  if (cart.length > 0) {
    openCart();
  } else {
    location.href = "#menu";
    showToast(`Cabang terpilih: ${BRANCHES.find(b => b.id === currentShowcaseBranchId)?.name}. Silakan pilih menu!`);
  }
}

// ==========================================
// 7. DYNAMIC STORE STATUS & COUNTERS
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
      statusText.innerText = `3 Cabang Buka • 08:00 - 22:00`;
    } else {
      statusDot.className = "w-2.5 h-2.5 rounded-full bg-amber-500";
      statusText.innerText = `Tutup • Buka Besok 08:00`;
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
// 8. SCROLL REVEAL OBSERVER
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
// 9. INITIALIZATION & EVENT LISTENERS
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  // 1. Initial Renders
  renderCatalog();
  updateCartBadges();
  renderCart();
  updateStoreStatus();
  observeRevealElements();
  initCounters();

  // Initialize showcase branch
  selectBranchTab(selectedBranchId || "senopati");

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
    if (!navbar) return;
    if (window.scrollY > 40) {
      navbar.classList.add("shadow-sm", "bg-[#F6F4EB]/95");
      navbar.classList.remove("bg-[#F6F4EB]/80");
    } else {
      navbar.classList.remove("shadow-sm", "bg-[#F6F4EB]/95");
      navbar.classList.add("bg-[#F6F4EB]/80");
    }
  });

  // Keyboard shortcut: ESC to close cart drawer
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCart();
    }
  });
});
