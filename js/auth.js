// 1. Recuperer le formulaire
const loginForm = document.getElementById("loginForm");

// 2. Écouter l'evenement submit
loginForm.addEventListener("submit", function (event) {
    // Empêcher le rechargement de la page
    event.preventDefault();

    // 3. Récupérer les valeurs saisies
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // 4. Zone pour afficher l'erreur
    const errorMessage = document.getElementById("error-message");

    // 5. Vérification des identifiants
    if (username === "admin" && password === "admin") {
        // Connexion réussie → redirection vers le dashboard
        window.location.href = "pages/dashboard.html";
    } else {
        // Connexion echoue → message d'erreur
        errorMessage.textContent = "Nom d'utilisateur ou mot de passe incorrect";
    }
});
