// Données simulées (plus tard viendront du CRUD)
const products = [
    { id: 1, name: "Produit A" },
    { id: 2, name: "Produit B" },
    { id: 3, name: "Produit C" }
];

const categories = [
    { id: 1, name: "Catégorie 1" },
    { id: 2, name: "Catégorie 2" }
];

const suppliers = [
    { id: 1, name: "Fournisseur X" }
];

const orders = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 }
];

// Injection des statistiques dans le DOM
document.getElementById("productsCount").textContent = products.length;
document.getElementById("categoriesCount").textContent = categories.length;
document.getElementById("suppliersCount").textContent = suppliers.length;
document.getElementById("ordersCount").textContent = orders.length;
