// ===============================
// CONFIG
// ===============================
const API_URL = "http://localhost:8080/api/products";

// ===============================
// STATE
// ===============================
let allProducts = [];
let filteredProducts = [];
let cart = [];

// ===============================
// DOM ELEMENTS
// ===============================
const productGrid = document.getElementById("productGrid");
const cartIcon = document.getElementById("cartIcon");
const cartCount = document.getElementById("cartCount");
const cartModal = document.getElementById("cartModal");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const closeBtn = document.querySelector(".close");
const searchInput = document.getElementById("searchInput");

// ===============================
// INIT
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    console.log("User script.js loaded");
    fetchProducts();
    setupEventListeners();
    createParticles();
});

// ===============================
// FETCH PRODUCTS (READ)
// ===============================
async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Failed to load products");
        }

        allProducts = await response.json();
        filteredProducts = [...allProducts];
        renderProducts(filteredProducts);

    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

// ===============================
// RENDER PRODUCTS
// ===============================
function renderProducts(products) {
    productGrid.innerHTML = "";

    if (products.length === 0) {
        productGrid.innerHTML =
            "<p style='text-align:center;'>No products found</p>";
        return;
    }

    products.forEach(product => {
        productGrid.innerHTML += `
            <div class="product-card">
                <div class="product-image">${product.image}</div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">₹${product.price}</div>
                    <button class="add-to-cart" data-id="${product.id}">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
    });
}

// ===============================
// EVENT LISTENERS
// ===============================
function setupEventListeners() {

    // CART ICON
    cartIcon.addEventListener("click", () => {
        cartModal.style.display = "block";
        renderCart();
    });

    // CLOSE CART
    closeBtn.addEventListener("click", () => {
        cartModal.style.display = "none";
    });

    window.addEventListener("click", e => {
        if (e.target === cartModal) {
            cartModal.style.display = "none";
        }
    });

    // SEARCH
    if (searchInput) {
        searchInput.addEventListener("input", e => {
            const text = e.target.value.toLowerCase().trim();

            filteredProducts = allProducts.filter(p =>
                p.name.toLowerCase().includes(text) ||
                p.category.toLowerCase().includes(text)
            );

            renderProducts(filteredProducts);
        });
    }

    // CATEGORY FILTER
    document.querySelectorAll(".category-card").forEach(card => {
        card.addEventListener("click", () => {
            const category = card.dataset.category;

            filteredProducts =
                category === "all"
                    ? [...allProducts]
                    : allProducts.filter(p => p.category === category);

            renderProducts(filteredProducts);
        });
    });
}

// ===============================
// ADD TO CART
// ===============================
document.addEventListener("click", e => {
    if (e.target.classList.contains("add-to-cart")) {

        const id = parseInt(e.target.dataset.id);
        const product = allProducts.find(p => p.id === id);

        if (!product) return;

        const item = cart.find(i => i.id === id);
        if (item) {
            item.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        updateCartUI();
        showNotification("Added to cart");
    }
});

// ===============================
// CART RENDER
// ===============================
function renderCart() {
    if (cart.length === 0) {
        cartItems.innerHTML =
            "<p style='text-align:center;'>Cart is empty</p>";
        cartTotal.textContent = "0";
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>${item.image}</div>
            <div>
                <strong>${item.name}</strong><br>
                ₹${item.price} x ${item.quantity}
            </div>
            <button class="remove-item" data-id="${item.id}">Remove</button>
        </div>
    `).join("");

    cartTotal.textContent = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    ).toFixed(2);
}

// ===============================
// REMOVE FROM CART
// ===============================
document.addEventListener("click", e => {
    if (e.target.classList.contains("remove-item")) {
        const id = parseInt(e.target.dataset.id);
        cart = cart.filter(item => item.id !== id);
        renderCart();
        updateCartUI();
    }
});

// ===============================
// UPDATE CART COUNT
// ===============================
function updateCartUI() {
    cartCount.textContent =
        cart.reduce((sum, item) => sum + item.quantity, 0);
}

// ===============================
// NOTIFICATION
// ===============================
function showNotification(message) {
    const n = document.createElement("div");
    n.textContent = message;
    n.style.cssText =
        "position:fixed;top:100px;right:20px;background:#ff6b6b;color:white;padding:10px;border-radius:8px;";
    document.body.appendChild(n);
    setTimeout(() => n.remove(), 2000);
}

// ===============================
// BACKGROUND PARTICLES
// ===============================
function createParticles() {
    const bg = document.querySelector(".bg-animation");
    if (!bg) return;

    for (let i = 0; i < 12; i++) {
        const p = document.createElement("div");
        p.className = "particle";
        p.style.left = Math.random() * 100 + "%";
        p.style.width = p.style.height =
            Math.random() * 40 + 20 + "px";
        p.style.animationDelay = Math.random() * 10 + "s";
        bg.appendChild(p);
    }
}
