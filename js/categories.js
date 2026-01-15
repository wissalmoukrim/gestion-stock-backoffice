// ===============================
// CATÉGORIES - CRUD PRO AVEC API
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    const categoryForm = document.getElementById("categoryForm");
    const categoryNameInput = document.getElementById("categoryName");
    const categoriesTableBody = document.getElementById("categoriesTableBody");

    if (!categoryForm || !categoriesTableBody) {
        return;
    }

    let editCategoryId = null;

    // ===============================
    // AFFICHAGE
    // ===============================
    async function loadCategories() {
        try {
            const categories = await apiGet("categories");
            categoriesTableBody.innerHTML = "";

            categories.forEach(category => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${category.name}</td>
                    <td>
                        <button class="action-btn edit-btn">Modifier</button>
                        <button class="action-btn delete-btn">Supprimer</button>
                    </td>
                `;

                // Modifier
                row.querySelector(".edit-btn").addEventListener("click", () => {
                    categoryNameInput.value = category.name;
                    editCategoryId = category.id;
                });

                // Supprimer
                row.querySelector(".delete-btn").addEventListener("click", async () => {
                    await apiDelete("categories", category.id);
                    loadCategories();
                });

                categoriesTableBody.appendChild(row);
            });

        } catch (error) {
            console.error("Erreur chargement catégories :", error);
        }
    }

    // ===============================
    // CREATE / UPDATE
    // ===============================
    categoryForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const category = {
            name: categoryNameInput.value
        };

        try {
            if (editCategoryId === null) {
                await apiPost("categories", category);
            } else {
                await apiPut("categories", editCategoryId, category);
                editCategoryId = null;
            }

            categoryForm.reset();
            loadCategories();

        } catch (error) {
            console.error("Erreur enregistrement catégorie :", error);
        }
    });

    // ===============================
    // INIT
    // ===============================
    loadCategories();

});