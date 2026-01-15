// ===============================
// CATÉGORIES - CRUD AVEC API
// ===============================

const API_URL = "http://localhost:3000/categories";

// DOM
const categoryForm = document.getElementById("categoryForm");
const categoryNameInput = document.getElementById("categoryName");
const categoriesTableBody = document.getElementById("categoriesTableBody");

let editCategoryId = null;

// ===============================
// READ
// ===============================
async function fetchCategories() {
    const response = await fetch(API_URL);
    const categories = await response.json();
    displayCategories(categories);
}

// ===============================
// DISPLAY
// ===============================
function displayCategories(categories) {
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

        // UPDATE (pré-remplissage)
        row.querySelector(".edit-btn").addEventListener("click", () => {
            categoryNameInput.value = category.name;
            editCategoryId = category.id;
        });

        // DELETE
        row.querySelector(".delete-btn").addEventListener("click", async () => {
            await fetch(`${API_URL}/${category.id}`, { method: "DELETE" });
            fetchCategories();
        });

        categoriesTableBody.appendChild(row);
    });
}

// ===============================
// CREATE / UPDATE
// ===============================
categoryForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const category = {
        name: categoryNameInput.value
    };

    if (editCategoryId === null) {
        // CREATE
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(category)
        });
    } else {
        // UPDATE
        await fetch(`${API_URL}/${editCategoryId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(category)
        });
        editCategoryId = null;
    }

    categoryForm.reset();
    fetchCategories();
});

// ===============================
// INITIAL LOAD
// ===============================
fetchCategories();
