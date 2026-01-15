// ===============================
// ENTREPÔTS - CRUD AVEC API
// ===============================

const API_URL = "http://localhost:3000/warehouses";

// DOM
const warehouseForm = document.getElementById("warehouseForm");
const warehouseNameInput = document.getElementById("warehouseName");
const warehouseAddressInput = document.getElementById("warehouseAddress");
const warehousesTableBody = document.getElementById("warehousesTableBody");

let editWarehouseId = null;

// ===============================
// READ
// ===============================
async function fetchWarehouses() {
    const response = await fetch(API_URL);
    const warehouses = await response.json();
    displayWarehouses(warehouses);
}

// ===============================
// DISPLAY
// ===============================
function displayWarehouses(warehouses) {
    warehousesTableBody.innerHTML = "";

    warehouses.forEach(warehouse => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${warehouse.name}</td>
            <td>${warehouse.address}</td>
            <td>
                <button class="action-btn edit-btn">Modifier</button>
                <button class="action-btn delete-btn">Supprimer</button>
            </td>
        `;

        // UPDATE
        row.querySelector(".edit-btn").addEventListener("click", () => {
            warehouseNameInput.value = warehouse.name;
            warehouseAddressInput.value = warehouse.address;
            editWarehouseId = warehouse.id;
        });

        // DELETE
        row.querySelector(".delete-btn").addEventListener("click", async () => {
            await fetch(`${API_URL}/${warehouse.id}`, { method: "DELETE" });
            fetchWarehouses();
        });

        warehousesTableBody.appendChild(row);
    });
}

// ===============================
// CREATE / UPDATE
// ===============================
warehouseForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const warehouse = {
        name: warehouseNameInput.value,
        address: warehouseAddressInput.value
    };

    if (editWarehouseId === null) {
        // CREATE
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(warehouse)
        });
    } else {
        // UPDATE
        await fetch(`${API_URL}/${editWarehouseId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(warehouse)
        });
        editWarehouseId = null;
    }

    warehouseForm.reset();
    fetchWarehouses();
});

// ===============================
// INITIAL LOAD
// ===============================
fetchWarehouses();
