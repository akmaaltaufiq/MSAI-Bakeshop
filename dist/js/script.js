// === Inisialisasi Elemen ===
const hamburgerMenu = document.getElementById("hamburger-menu");
const navbarNav = document.querySelector(".navbar-nav");

const searchButton = document.getElementById("search-button");
const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchSubmit = document.getElementById("search-submit");

const shoppingCart = document.getElementById("shopping-cart");
const shoppingCartButton = document.getElementById("shopping-cart-button");
const closeCartButton = document.getElementById("close-cart");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutButton = document.getElementById("checkout-button");

const langToggle = document.getElementById("language-toggle");
const langOptions = document.getElementById("language-options");
const langLabel = document.getElementById("language-label");

const productGrid = document.getElementById("product-grid");

const productModal = document.getElementById("product-modal");
const modalImage = document.getElementById("modal-image");
const modalName = document.getElementById("modal-name");
const modalPrice = document.getElementById("modal-price");
const modalRating = document.getElementById("modal-rating");
const modalAddCart = document.getElementById("modal-add-cart");
const closeModal = document.getElementById("close-modal");
const modalDesc = document.getElementById("modal-description");
const modalQty = document.getElementById("modal-qty");
const checkoutModal = document.getElementById("checkout-modal");
const checkoutName = document.getElementById("checkout-name");
const paymentMethod = document.getElementById("payment-method");
const paymentOptions = document.getElementById("payment-options");
const confirmOrder = document.getElementById("confirm-order");
const closeCheckoutModal = document.getElementById("close-checkout-modal");

// === Data Produk ===
// === Produk dengan deskripsi dan rating ===
const products = [
  {
    name: "Burnt Cheese Cake",
    price: 75000,
    image: "dist/img/burntcheese-cake.jpeg",
    description:
      "Cheesecake panggang lembut dengan rasa gurih dan manis seimbang.",
    rating: 5,
  },
  {
    name: "Red Velvet Cake",
    price: 120000,
    image: "dist/img/redvelvet-cake.jpeg",
    description:
      "Red velvet klasik dengan slice strawberry dan cream cheese frosting.",
    rating: 5,
  },
  {
    name: "Chocolate Cake",
    price: 80000,
    image: "dist/img/chocolate-cake.jpeg",
    description: "Kue cokelat moist dan legit dengan cokelat premium.",
    rating: 5,
  },
  {
    name: "Choco Chip Cake",
    price: 60000,
    image: "dist/img/chocip-cake.jpeg",
    description: "Kue lembut dengan taburan choco chip melimpah.",
    rating: 4,
  },
  {
    name: "Cheese & Peanut Cake",
    price: 50000,
    image: "dist/img/halfcheesepeanut-cake.jpeg",
    description: "Perpaduan kacang dan keju yang unik dan lezat.",
    rating: 4,
  },
  {
    name: "Strawberry Cake",
    price: 70000,
    image: "dist/img/strawberry-cake.jpeg",
    description: "Kue stroberi segar dengan aroma manis alami.",
    rating: 4,
  },
];

// Render bintang rating
function renderStars(rating) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    stars += `<i class="fa${
      i <= rating ? "s" : "r"
    } fa-star text-yellow-400"></i>`;
  }
  return stars;
}

// === Utility ===
function formatCurrency(value) {
  return `IDR ${value.toLocaleString("id-ID")}`;
}

function closeAll(except) {
  if (except !== "nav") navbarNav.classList.remove("active");
  if (except !== "search") searchForm.classList.remove("active");
  if (except !== "cart") shoppingCart.classList.remove("active");
  if (except !== "lang") langOptions.classList.remove("active");
  if (except !== "modal") productModal.classList.add("hidden");
}

// === Navbar Toggle ===
hamburgerMenu.addEventListener("click", () => {
  const open = navbarNav.classList.contains("active");
  closeAll();
  if (!open) navbarNav.classList.add("active");
});

// === Search Toggle ===
searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  const open = searchForm.classList.contains("active");
  closeAll();
  if (!open) {
    searchForm.classList.add("active");
    searchBox.focus();
  }
});
searchBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    doSearch();
  }
});
searchSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  doSearch();
});

function doSearch() {
  const q = searchBox.value.trim().toLowerCase();
  if (!q) return;
  let found = false;
  document.querySelectorAll(".product-card").forEach((card) => {
    if (card.textContent.toLowerCase().includes(q)) {
      card.scrollIntoView({ behavior: "smooth" });
      card.classList.add("ring", "ring-pink-500", "ring-offset-2");
      setTimeout(
        () => card.classList.remove("ring", "ring-pink-500", "ring-offset-2"),
        2000
      );
      found = true;
    }
  });
  if (!found) alert("Produk tidak ditemukan.");
}

// === Shopping Cart ===
const cart = [];

shoppingCartButton.addEventListener("click", (e) => {
  e.stopPropagation();
  const open = shoppingCart.classList.contains("active");
  closeAll();
  if (!open) shoppingCart.classList.add("active");
});
closeCartButton.addEventListener("click", () => closeAll());

function updateCartIconBadge() {
  const badge = document.getElementById("cart-count");
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  badge.textContent = totalQty > 0 ? totalQty : "0";
}

function updateCartTotal() {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotal.textContent = formatCurrency(total);
  updateCartIconBadge();
}

function renderCartItems() {
  cartItemsContainer.innerHTML = "";
  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "cart-item flex items-center gap-4 border-b pb-4 relative";
    div.innerHTML = `
  <img src="${item.image}" alt="${
      item.name
    }" class="h-16 w-16 rounded object-cover" />
  <div class="flex-1">
    <h4 class="text-sm font-semibold">${item.name}</h4>
    <p class="text-sm text-gray-500">${formatCurrency(item.price)}</p>
    <div class="mt-2 flex items-center gap-2">
      <button class="qty-minus px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">-</button>
      <span class="text-sm font-medium">${item.quantity}</span>
      <button class="qty-plus px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">+</button>
    </div>
  </div>
  <button class="remove-item absolute top-0 right-0 text-xl text-red-500 hover:text-red-700">&times;</button>
`;
    div.querySelector(".qty-minus").addEventListener("click", (e) => {
      e.stopPropagation();
      changeQuantity(index, -1);
    });
    div.querySelector(".qty-plus").addEventListener("click", (e) => {
      e.stopPropagation();
      changeQuantity(index, 1);
    });
    div.querySelector(".remove-item").addEventListener("click", (e) => {
      e.stopPropagation();
      removeFromCart(index);
    });
    cartItemsContainer.appendChild(div);
  });
  updateCartTotal();
}

function resetCheckoutForm() {
  checkoutName.value = "";
  paymentMethod.value = "";
  paymentOptions.innerHTML = "";
  paymentOptions.classList.add("hidden");
}

function addToCart(product) {
  const index = cart.findIndex((item) => item.name === product.name);
  if (index !== -1) {
    cart[index].quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  renderCartItems();
}

function changeQuantity(index, delta) {
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) cart.splice(index, 1);
  renderCartItems();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCartItems();
}

// === Modal Produk ===
closeModal?.addEventListener("click", () => {
  productModal.classList.add("hidden");
});

function setupProductModalListeners() {
  document.querySelectorAll(".product-image").forEach((image, index) => {
    image.addEventListener("click", () => {
      const product = products[index];
      modalImage.src = product.image;
      modalName.textContent = product.name;
      modalPrice.textContent = formatCurrency(product.price);
      modalRating.innerHTML = renderStars(product.rating);
      modalDesc.textContent = product.description;
      modalQty.value = 1;

      modalAddCart.onclick = () => {
        const qty = parseInt(modalQty.value);
        for (let i = 0; i < qty; i++) {
          addToCart(product);
        }
        closeAll();
      };

      productModal.classList.remove("hidden");
    });
  });
}

function renderStars(rating) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    stars += `<i class="fa${i <= rating ? "s" : "r"} fa-star"></i>`;
  }
  return stars;
}

// === Produk ===
// Render kartu produk dengan hover + klik gambar aktif
function renderProducts(strings = null) {
  productGrid.innerHTML = "";
  products.forEach((product) => {
    const card = document.createElement("div");
    card.className =
      "product-card bg-white rounded-lg shadow p-4 transition transform hover:scale-105 hover:shadow-lg";
    card.dataset.price = product.price;
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" 
        class="h-48 w-full object-cover rounded mb-4 cursor-pointer product-image" />
      <h4 class="text-lg font-bold text-pink-700 mb-1">${product.name}</h4>
      <p class="text-gray-600 mb-1">${product.description}</p>
      <div class="text-yellow-400 mb-2">${renderStars(product.rating)}</div>
      <p class="text-gray-700 mb-2 font-semibold">${formatCurrency(
        product.price
      )}</p>
      <button class="mt-2 w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 add-to-cart-btn">
        ${strings ? strings.add_to_cart : "Tambah ke Keranjang"}
      </button>
    `;
    productGrid.appendChild(card);
  });
  function setupAddToCartButtons() {
    document.querySelectorAll(".add-to-cart-btn").forEach((btn, index) => {
      btn.addEventListener("click", () => {
        addToCart(products[index]);
      });
    });
  }
  setupProductModalListeners();
  setupAddToCartButtons();
}

// Load languange lang
async function loadLanguage(lang) {
  try {
    const res = await fetch("./lang.json");
    if (!res.ok) throw new Error("lang.json not found");
    const data = await res.json();
    const strings = data[lang] || data.id;

    // update document.title
    document.title = strings.title;

    if (!strings) return;

    document.title = strings.title;
    document.querySelector('[data-key="nav_home"]').textContent =
      strings.nav_home;
    document.querySelector('[data-key="nav_about"]').textContent =
      strings.nav_about;
    document.querySelector('[data-key="nav_products"]').textContent =
      strings.nav_products;
    document.querySelector('[data-key="nav_contact"]').textContent =
      strings.nav_contact;
    document.querySelector('[data-key="hero_heading"]').textContent =
      strings.hero_heading;
    document.querySelector('[data-key="hero_desc"]').textContent =
      strings.hero_desc;
    document.querySelector('[data-key="hero_button"]').textContent =
      strings.hero_button;
    document.querySelector('[data-key="about_title"]').textContent =
      strings.about_title;
    document.querySelector('[data-key="about_text"]').textContent =
      strings.about_text;
    document.querySelector('[data-key="products_title"]').textContent =
      strings.products_title;
    document.querySelector('[data-key="cart_title"]').textContent =
      strings.cart_title;
    document.querySelector('[data-key="cart_total"]').textContent =
      strings.cart_total;
    document.querySelector('[data-key="checkout_name"]').placeholder =
      strings.checkout_name;
    document.querySelector('[data-key="checkout_payment"]').textContent =
      strings.checkout_payment;
    document.querySelector('[data-key="checkout_button"]').textContent =
      strings.checkout_button;
    document.querySelector('[data-key="contact_title"]').textContent =
      strings.contact_title;
    document.querySelector('[data-key="contact_desc"]').textContent =
      strings.contact_desc;
    document.querySelector('[data-key="contact_whatsapp"]').textContent =
      strings.contact_whatsapp;
    document.querySelector('[data-key="contact_instagram"]').textContent =
      strings.contact_instagram;
    document.querySelector('[data-key="footer_text"]').innerHTML =
      strings.footer_text;
    document.querySelector('[data-key="modal_desc"]').textContent =
      strings.modal_desc;
    document.querySelector('[data-key="modal_qty_label"]').textContent =
      strings.modal_qty_label;
    document.querySelector('[data-key="modal_add_cart"]').textContent =
      strings.modal_add_cart;
    document.querySelector('[data-key="contact_send_button"]').textContent =
      strings.contact_send_button;
    document.querySelector("#checkout-name").placeholder =
      strings.checkout_name;
    document.querySelector('[data-key="form_name_placeholder"]').placeholder =
      strings.form_name_placeholder;
    document.querySelector('[data-key="form_email_placeholder"]').placeholder =
      strings.form_email_placeholder;
    document.querySelector(
      '[data-key="form_message_placeholder"]'
    ).placeholder = strings.form_message_placeholder;
    document.querySelector('[data-key="footer_nav_home"]').textContent =
      strings.footer_nav_home;
    document.querySelector('[data-key="footer_nav_about"]').textContent =
      strings.footer_nav_about;
    document.querySelector('[data-key="footer_nav_products"]').textContent =
      strings.footer_nav_products;
    document.querySelector('[data-key="footer_nav_contact"]').textContent =
      strings.footer_nav_contact;

    // re‑render produk dengan teks button baru
    renderProducts(strings);
    localStorage.setItem("selectedLang", lang);
  } catch (e) {
    console.error(e);
  }
}

// === Language Switch ===
langToggle.addEventListener("click", (e) => {
  e.preventDefault();
  const open = langOptions.classList.contains("active");
  closeAll();
  if (!open) langOptions.classList.add("active");
});
document.querySelectorAll(".language-option").forEach((btn) => {
  btn.addEventListener("click", () => {
    const lang = btn.dataset.lang;
    document.getElementById("language-label").textContent = lang.toUpperCase();
    loadLanguage(lang);
    langOptions.classList.remove("active");
  });
});

renderCartItems();

// === Klik luar elemen: tutup panel yang terbuka ===
document.addEventListener("click", (e) => {
  // Navbar
  if (
    !e.target.closest("#hamburger-menu") &&
    !e.target.closest(".navbar-nav")
  ) {
    navbarNav.classList.remove("active");
  }

  // Search
  if (
    !e.target.closest("#search-button") &&
    !e.target.closest("#search-form")
  ) {
    searchForm.classList.remove("active");
  }

  // Cart
  if (
    !e.target.closest("#shopping-cart-button") &&
    !e.target.closest("#shopping-cart")
  ) {
    shoppingCart.classList.remove("active");
  }

  // Language
  if (
    !e.target.closest("#language-toggle") &&
    !e.target.closest("#language-options")
  ) {
    langOptions.classList.remove("active");
  }

  // Product Modal (jika overlay diklik)
  if (e.target === productModal) {
    productModal.classList.add("hidden");
  }
});

// === Init Saat Load ===
document.addEventListener("DOMContentLoaded", () => {
  const saved = "id";
  document.getElementById("language-label").textContent = saved.toUpperCase();
  loadLanguage(saved);

  renderProducts();
  renderCartItems();

  checkoutButton?.addEventListener("click", (e) => {
    e.stopPropagation();
    if (cart.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Keranjang Kosong",
        text: "Silakan tambahkan produk terlebih dahulu.",
      });
      return;
    }

    checkoutModal.classList.remove("hidden");
  });

  closeCheckoutModal.addEventListener("click", () => {
    checkoutModal.classList.add("hidden");
  });

  paymentMethod.addEventListener("change", () => {
    const selected = paymentMethod.value;
    let options = "";
    if (selected === "bank") {
      options = `
      <label class="block mb-2">Pilih Bank:</label>
      <select id="bank-option" class="w-full border px-3 py-2 rounded">
        <option value="BCA">BCA</option>
        <option value="BNI">BNI</option>
        <option value="Mandiri">Mandiri</option>
      </select>
    `;
    } else if (selected === "ewallet") {
      options = `
      <label class="block mb-2">Pilih E-Wallet:</label>
      <select id="ewallet-option" class="w-full border px-3 py-2 rounded">
        <option value="OVO">OVO</option>
        <option value="GoPay">GoPay</option>
        <option value="DANA">DANA</option>
      </select>
    `;
    }

    paymentOptions.innerHTML = options;
    paymentOptions.classList.remove("hidden");
  });

  confirmOrder.addEventListener("click", () => {
    const name = checkoutName.value.trim();
    const method = paymentMethod.value;
    let selectedMethod = "";

    if (!name || !method) {
      Swal.fire({
        icon: "warning",
        title: "Form Tidak Lengkap",
        text: "Mohon isi nama dan pilih metode pembayaran.",
      });
      return;
    }

    if (method === "bank") {
      selectedMethod = document.getElementById("bank-option")?.value;
    } else if (method === "ewallet") {
      selectedMethod = document.getElementById("ewallet-option")?.value;
    }

    if (!selectedMethod) {
      Swal.fire({
        icon: "warning",
        title: "Metode Tidak Dipilih",
        text: "Silakan pilih bank atau e-wallet yang digunakan.",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Pesanan Berhasil!",
      html: `
    <p><strong>Nama:</strong> ${name}</p>
    <p><strong>Metode:</strong> ${method.toUpperCase()} - ${selectedMethod}</p>
    <p>Pesanan Anda sedang diproses.</p>
  `,
      confirmButtonColor: "#d946ef",
    });

    cart.length = 0;
    renderCartItems();
    resetCheckoutForm();
    checkoutModal.classList.add("hidden");
    closeAll();
  });
});
