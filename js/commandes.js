// ===============================
// COMMANDES - CRUD PRO AVEC API
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    const orderForm = document.getElementById("orderForm");
    const orderProductInput = document.getElementById("orderProduct");
    const orderSupplierInput = document.getElementById("orderSupplier");
    const orderQuantityInput = document.getElementById("orderQuantity");
    const ordersTableBody = document.getElementById("ordersTableBody");

    if (!orderForm || !ordersTableBody) {
        return;
    }

    let editOrderId = null;

    // ===============================
    // AFFICHAGE
    // ===============================
    async function loadOrders() {
        try {
            const orders = await apiGet("orders");
            ordersTableBody.innerHTML = "";

            orders.forEach(order => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${order.product}</td>
                    <td>${order.supplier}</td>
                    <td>${order.quantity}</td>
                    <td>
                        <button class="action-btn edit-btn">Modifier</button>
                        <button class="action-btn delete-btn">Supprimer</button>
                    </td>
                `;

                // Modifier
                row.querySelector(".edit-btn").addEventListener("click", () => {
                    orderProductInput.value = order.product;
                    orderSupplierInput.value = order.supplier;
                    orderQuantityInput.value = order.quantity;
                    editOrderId = order.id;
                });

                // Supprimer
                row.querySelector(".delete-btn").addEventListener("click", async () => {
                    await apiDelete("orders", order.id);
                    loadOrders();
                });

                ordersTableBody.appendChild(row);
            });

        } catch (error) {
            console.error("Erreur chargement commandes :", error);
        }
    }

    // ===============================
    // CREATE / UPDATE
    // ===============================
    orderForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const order = {
            product: orderProductInput.value,
            supplier: orderSupplierInput.value,
            quantity: orderQuantityInput.value
        };

        try {
            if (editOrderId === null) {
                await apiPost("orders", order);
            } else {
                await apiPut("orders", editOrderId, order);
                editOrderId = null;
            }

            orderForm.reset();
            loadOrders();

        } catch (error) {
            console.error("Erreur enregistrement commande :", error);
        }
    });

    // ===============================
    // INIT
    // ===============================
    loadOrders();

});