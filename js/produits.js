// ===============================
// PRODUITS - CRUD PRO AVEC API
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    // Sécurité : vérifier que les éléments existent
    const productForm = document.getElementById("productForm");
    const productNameInput = document.getElementById("productName");
    const productPriceInput = document.getElementById("productPrice");
    const productQuantityInput = document.getElementById("productQuantity");
    const productsTableBody = document.getElementById("productsTableBody");

    if (!productForm || !productsTableBody) {
        return; // empêche tout crash JS
    }

    let editProductId = null;

    // ===============================
    // AFFICHAGE
    // ===============================
    async function loadProducts() {
        try {
            const products = await apiGet("products");
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

                // Modifier
                row.querySelector(".edit-btn").addEventListener("click", () => {
                    productNameInput.value = product.name;
                    productPriceInput.value = product.price;
                    productQuantityInput.value = product.quantity;
                    editProductId = product.id;
                });

                // Supprimer
                row.querySelector(".delete-btn").addEventListener("click", async () => {
                    await apiDelete("products", product.id);
                    loadProducts();
                });

                productsTableBody.appendChild(row);
            });

        } catch (error) {
            console.error("Erreur chargement produits :", error);
        }
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

        try {
            if (editProductId === null) {
                await apiPost("products", product);
            } else {
                await apiPut("products", editProductId, product);
                editProductId = null;
            }

            productForm.reset();
            loadProducts();

        } catch (error) {
            console.error("Erreur enregistrement produit :", error);
        }
    });

    // ===============================
    // INIT
    // ===============================
    loadProducts();

});