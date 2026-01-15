// ===============================
// PRODUITS - CRUD AVEC API (json-server)
// ===============================

const API_URL = "http://localhost:3000/products";

const productForm = document.getElementById("productForm");
const productNameInput = document.getElementById("productName");
const productPriceInput = document.getElementById("productPrice");
const productQuantityInput = document.getElementById("productQuantity");
const productsTableBody = document.getElementById("productsTableBody");

let editProductId = null;

// ===============================
// LECTURE DES PRODUITS (READ)
// ===============================
async function fetchProducts() {
    const response = await fetch(API_URL);
    const products = await response.json();
    displayProducts(products);
}

// ===============================
// AFFICHAGE
// ===============================
function displayProducts(products) {
    productsTableBody.innerHTML = "";

    products.forEach(product => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.quantity}</td>
            <td>
                <button class="action-btn edit-btn">Modifier</button>
                <button class="action-btn delete-btn">Supprimer</button>
            </td>
        `;

        // MODIFIER
        row.querySelector(".edit-btn").addEventListener("click", () => {
            productNameInput.value = product.name;
            productPriceInput.value = product.price;
            productQuantityInput.value = product.quantity;
            editProductId = product.id;
        });

        // SUPPRIMER
        row.querySelector(".delete-btn").addEventListener("click", async () => {
            await fetch(`${API_URL}/${product.id}`, {
                method: "DELETE"
            });
            fetchProducts();
        });

        productsTableBody.appendChild(row);
    });
}

// ===============================
// CREATE / UPDATE
// ===============================
productForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        quantity: productQuantityInput.value
    };

    if (editProductId === null) {
        // CREATE
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product)
        });
    } else {
        // UPDATE
        await fetch(`${API_URL}/${editProductId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product)
        });
        editProductId = null;
    }

    productForm.reset();
    fetchProducts();
});

// ===============================
// CHARGEMENT INITIAL
// ===============================
fetchProducts();
