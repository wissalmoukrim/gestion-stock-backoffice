// ===============================
// AUTHENTIFICATION - DÉCONNEXION
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    const logoutBtn = document.querySelector(".logout-btn");

    if (!logoutBtn) return;

    logoutBtn.addEventListener("click", () => {
        // Redirection vers la page de login
        window.location.href = "../index.html";
    });

});


