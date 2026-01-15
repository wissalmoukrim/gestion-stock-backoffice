// ===============================
// FOURNISSEURS - CRUD PRO AVEC API
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    const supplierForm = document.getElementById("supplierForm");
    const supplierNameInput = document.getElementById("supplierName");
    const supplierPhoneInput = document.getElementById("supplierPhone");
    const supplierEmailInput = document.getElementById("supplierEmail");
    const suppliersTableBody = document.getElementById("suppliersTableBody");

    if (!supplierForm || !suppliersTableBody) {
        return;
    }

    let editSupplierId = null;

    // ===============================
    // AFFICHAGE
    // ===============================
    async function loadSuppliers() {
        try {
            const suppliers = await apiGet("suppliers");
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

                // Modifier
                row.querySelector(".edit-btn").addEventListener("click", () => {
                    supplierNameInput.value = supplier.name;
                    supplierPhoneInput.value = supplier.phone;
                    supplierEmailInput.value = supplier.email;
                    editSupplierId = supplier.id;
                });

                // Supprimer
                row.querySelector(".delete-btn").addEventListener("click", async () => {
                    await apiDelete("suppliers", supplier.id);
                    loadSuppliers();
                });

                suppliersTableBody.appendChild(row);
            });

        } catch (error) {
            console.error("Erreur chargement fournisseurs :", error);
        }
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

        try {
            if (editSupplierId === null) {
                await apiPost("suppliers", supplier);
            } else {
                await apiPut("suppliers", editSupplierId, supplier);
                editSupplierId = null;
            }

            supplierForm.reset();
            loadSuppliers();

        } catch (error) {
            console.error("Erreur enregistrement fournisseur :", error);
        }
    });

    // ===============================
    // INIT
    // ===============================
    loadSuppliers();

});