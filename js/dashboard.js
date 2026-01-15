// ===============================
// DASHBOARD - STATISTIQUES VIA API
// ===============================

document.addEventListener("DOMContentLoaded", async () => {

    // Sécurité : récupérer les éléments (peuvent ne pas exister)
    const productsCountEl = document.getElementById("productsCount");
    const categoriesCountEl = document.getElementById("categoriesCount");
    const suppliersCountEl = document.getElementById("suppliersCount");
    const warehousesCountEl = document.getElementById("warehousesCount");
    const ordersCountEl = document.getElementById("ordersCount");

    try {
        // Appels API (centralisés)
        const products = productsCountEl ? await apiGet("products") : [];
        const categories = categoriesCountEl ? await apiGet("categories") : [];
        const suppliers = suppliersCountEl ? await apiGet("suppliers") : [];
        const warehouses = warehousesCountEl ? await apiGet("warehouses") : [];
        const orders = ordersCountEl ? await apiGet("orders") : [];

        // Injection des compteurs
        if (productsCountEl) productsCountEl.textContent = products.length;
        if (categoriesCountEl) categoriesCountEl.textContent = categories.length;
        if (suppliersCountEl) suppliersCountEl.textContent = suppliers.length;
        if (warehousesCountEl) warehousesCountEl.textContent = warehouses.length;
        if (ordersCountEl) ordersCountEl.textContent = orders.length;

    } catch (error) {
        console.error("Erreur lors du chargement du dashboard :", error);
    }

});