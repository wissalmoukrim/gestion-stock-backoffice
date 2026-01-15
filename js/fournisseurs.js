// ===============================
// FOURNISSEURS - CRUD AVEC API
// ===============================

const API_URL = "http://localhost:3000/suppliers";

// DOM
const supplierForm = document.getElementById("supplierForm");
const supplierNameInput = document.getElementById("supplierName");
const supplierPhoneInput = document.getElementById("supplierPhone");
const supplierEmailInput = document.getElementById("supplierEmail");
const suppliersTableBody = document.getElementById("suppliersTableBody");

let editSupplierId = null;

// ===============================
// READ
// ===============================
async function fetchSuppliers() {
    const response = await fetch(API_URL);
    const suppliers = await response.json();
    displaySuppliers(suppliers);
}

// ===============================
// DISPLAY
// ===============================
function displaySuppliers(suppliers) {
    suppliersTableBody.innerHTML = "";

    suppliers.forEach(supplier => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${supplier.name}</td>
            <td>${supplier.phone}</td>
            <td>${supplier.email}</td>
            <td>
                <button class="action-btn edit-btn">Modifier</button>
                <button class="action-btn delete-btn">Supprimer</button>
            </td>
        `;

        // UPDATE (pré-remplissage)
        row.querySelector(".edit-btn").addEventListener("click", () => {
            supplierNameInput.value = supplier.name;
            supplierPhoneInput.value = supplier.phone;
            supplierEmailInput.value = supplier.email;
            editSupplierId = supplier.id;
        });

        // DELETE
        row.querySelector(".delete-btn").addEventListener("click", async () => {
            await fetch(`${API_URL}/${supplier.id}`, { method: "DELETE" });
            fetchSuppliers();
        });

        suppliersTableBody.appendChild(row);
    });
}

// ===============================
// CREATE / UPDATE
// ===============================
supplierForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const supplier = {
        name: supplierNameInput.value,
        phone: supplierPhoneInput.value,
        email: supplierEmailInput.value
    };

    if (editSupplierId === null) {
        // CREATE
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(supplier)
        });
    } else {
        // UPDATE
        await fetch(`${API_URL}/${editSupplierId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(supplier)
        });
        editSupplierId = null;
    }

    supplierForm.reset();
    fetchSuppliers();
});

// ===============================
// INITIAL LOAD
// ===============================
fetchSuppliers();
