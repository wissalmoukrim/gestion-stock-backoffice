// ===============================
// COMMANDES - CRUD AVEC API
// ===============================

const API_URL = "http://localhost:3000/orders";

// DOM
const orderForm = document.getElementById("orderForm");
const orderProductInput = document.getElementById("orderProduct");
const orderSupplierInput = document.getElementById("orderSupplier");
const orderQuantityInput = document.getElementById("orderQuantity");
const ordersTableBody = document.getElementById("ordersTableBody");

let editOrderId = null;

// ===============================
// READ
// ===============================
async function fetchOrders() {
    const response = await fetch(API_URL);
    const orders = await response.json();
    displayOrders(orders);
}

// ===============================
// DISPLAY
// ===============================
function displayOrders(orders) {
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

        // UPDATE
        row.querySelector(".edit-btn").addEventListener("click", () => {
            orderProductInput.value = order.product;
            orderSupplierInput.value = order.supplier;
            orderQuantityInput.value = order.quantity;
            editOrderId = order.id;
        });

        // DELETE
        row.querySelector(".delete-btn").addEventListener("click", async () => {
            await fetch(`${API_URL}/${order.id}`, { method: "DELETE" });
            fetchOrders();
        });

        ordersTableBody.appendChild(row);
    });
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

    if (editOrderId === null) {
        // CREATE
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(order)
        });
    } else {
        // UPDATE
        await fetch(`${API_URL}/${editOrderId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(order)
        });
        editOrderId = null;
    }

    orderForm.reset();
    fetchOrders();
});

// ===============================
// INITIAL LOAD
// ===============================
fetchOrders();
