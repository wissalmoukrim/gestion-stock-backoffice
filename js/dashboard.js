// ===============================
// DASHBOARD - DONNÉES VIA API
// ===============================

const API_BASE = "http://localhost:3000";

// Récupération des éléments HTML
const productsCountEl = document.getElementById("productsCount");
const categoriesCountEl = document.getElementById("categoriesCount");
const suppliersCountEl = document.getElementById("suppliersCount");
const warehousesCountEl = document.getElementById("warehousesCount");
const ordersCountEl = document.getElementById("ordersCount");

// Fonction générique pour récupérer un compteur
async function fetchCount(endpoint, element) {
    if (!element) return;

    const response = await fetch(`${API_BASE}/${endpoint}`);
    const data = await response.json();
    element.textContent = data.length;
}

// Charger les statistiques
async function loadDashboardStats() {
    await fetchCount("products", productsCountEl);
    await fetchCount("categories", categoriesCountEl);
    await fetchCount("suppliers", suppliersCountEl);
    await fetchCount("warehouses", warehousesCountEl);
    await fetchCount("orders", ordersCountEl);
}

// Lancement
loadDashboardStats();
