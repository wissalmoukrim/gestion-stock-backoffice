// ===============================
// CONFIGURATION API
// ===============================
const API_URL = "http://localhost:3000";

// ===============================
// FONCTIONS GÉNÉRIQUES API
// ===============================

// GET (Lire)
async function apiGet(endpoint) {
    const response = await fetch(`${API_URL}/${endpoint}`);
    return await response.json();
}

// POST (Créer)
async function apiPost(endpoint, data) {
    const response = await fetch(`${API_URL}/${endpoint}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}

// PUT (Modifier)
async function apiPut(endpoint, id, data) {
    const response = await fetch(`${API_URL}/${endpoint}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}

// DELETE (Supprimer)
async function apiDelete(endpoint, id) {
    await fetch(`${API_URL}/${endpoint}/${id}`, {
        method: "DELETE"
    });
}