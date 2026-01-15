// ===============================
// LOGIN - AUTHENTIFICATION SIMPLE
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.getElementById("loginForm");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const errorMessage = document.getElementById("error-message");

    if (!loginForm) return;

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const username = usernameInput.value;
        const password = passwordInput.value;

        // Identifiants simples (projet académique)
        if (username === "admin" && password === "admin") {
            // Redirection vers le dashboard
            window.location.href = "pages/dashboard.html";
        } else {
            errorMessage.textContent = "Nom d'utilisateur ou mot de passe incorrect";
        }
    });

});