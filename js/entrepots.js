// ===============================
// ENTREPÔTS - CRUD PRO AVEC API
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    const warehouseForm = document.getElementById("warehouseForm");
    const warehouseNameInput = document.getElementById("warehouseName");
    const warehouseAddressInput = document.getElementById("warehouseAddress");
    const warehousesTableBody = document.getElementById("warehousesTableBody");

    if (!warehouseForm || !warehousesTableBody) {
        return;
    }

    let editWarehouseId = null;

    // ===============================
    // AFFICHAGE
    // ===============================
    async function loadWarehouses() {
        try {
            const warehouses = await apiGet("warehouses");
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

                // Modifier
                row.querySelector(".edit-btn").addEventListener("click", () => {
                    warehouseNameInput.value = warehouse.name;
                    warehouseAddressInput.value = warehouse.address;
                    editWarehouseId = warehouse.id;
                });

                // Supprimer
                row.querySelector(".delete-btn").addEventListener("click", async () => {
                    await apiDelete("warehouses", warehouse.id);
                    loadWarehouses();
                });

                warehousesTableBody.appendChild(row);
            });

        } catch (error) {
            console.error("Erreur chargement entrepôts :", error);
        }
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

        try {
            if (editWarehouseId === null) {
                await apiPost("warehouses", warehouse);
            } else {
                await apiPut("warehouses", editWarehouseId, warehouse);
                editWarehouseId = null;
            }

            warehouseForm.reset();
            loadWarehouses();

        } catch (error) {
            console.error("Erreur enregistrement entrepôt :", error);
        }
    });

    // ===============================
    // INIT
    // ===============================
    loadWarehouses();

});