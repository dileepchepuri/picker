// ===============================
// CONFIG
// ===============================
const API_URL = "http://localhost:8080/api/products";

// ===============================
// INIT
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    console.log("Admin JS loaded");
    loadProducts();
});

// ===============================
// READ - Load Products
// ===============================
async function loadProducts() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to load products");
        }

        const products = await response.json();
        const table = document.getElementById("productTable");
        table.innerHTML = "";

        products.forEach(product => {
            table.innerHTML += `
                <tr>
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${product.price}</td>
                    <td>${product.category}</td>
                    <td>${product.image}</td>
                    <td>
                        <button class="edit" onclick='editProduct(${JSON.stringify(product)})'>Edit</button>
                        <button class="delete" onclick='deleteProduct(${product.id})'>Delete</button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        console.error("Error loading products:", error);
    }
}

// ===============================
// CREATE & UPDATE
// ===============================
async function saveProduct() {
    console.log("Save product clicked");

    const id = document.getElementById("productId").value;

    const product = {
        name: document.getElementById("name").value.trim(),
        price: Number(document.getElementById("price").value),
        category: document.getElementById("category").value.trim(),
        image: document.getElementById("image").value.trim()
    };

    // Basic validation
    if (!product.name || !product.price || !product.category) {
        alert("Please fill all required fields");
        return;
    }

    try {
        let response;

        // CREATE
        if (!id) {
            response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(product)
            });
        }
        // UPDATE
        else {
            response = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(product)
            });
        }

        if (!response.ok) {
            const error = await response.text();
            throw new Error(error);
        }

        clearForm();
        loadProducts();

    } catch (error) {
        console.error("Save failed:", error);
        alert("Failed to save product. Check console.");
    }
}

// ===============================
// EDIT - Prefill Form
// ===============================
function editProduct(product) {
    document.getElementById("productId").value = product.id;
    document.getElementById("name").value = product.name;
    document.getElementById("price").value = product.price;
    document.getElementById("category").value = product.category;
    document.getElementById("image").value = product.image;
}

// ===============================
// DELETE
// ===============================
async function deleteProduct(id) {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Delete failed");
        }

        loadProducts();
    } catch (error) {
        console.error("Delete error:", error);
        alert("Failed to delete product");
    }
}

// ===============================
// CLEAR FORM
// ===============================
function clearForm() {
    document.getElementById("productId").value = "";
    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("category").value = "";
    document.getElementById("image").value = "";
}
