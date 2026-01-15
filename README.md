# 📦 Gestion de Stock du Magasin – Backoffice

## 📌 Description du projet
Ce projet est une application web **Backoffice de gestion de stock** destinée à un magasin.
Elle permet à l’administrateur de gérer les **produits, catégories, fournisseurs, entrepôts et commandes**
via une interface simple, claire et responsive.

Le projet a été réalisé dans un **cadre académique** afin de mettre en pratique :
- le développement web frontend
- le CRUD (Create, Read, Update, Delete)
- la manipulation du DOM
- l’utilisation d’une **API REST** avec `json-server`

---

## 🎯 Objectifs pédagogiques
- Comprendre et implémenter la logique CRUD
- Manipuler des données via une API REST
- Utiliser `fetch` et `async/await`
- Structurer un projet web proprement
- Simuler un backend avec **Node.js** et **json-server**
- Relier un frontend à une API

---

## 🛠️ Technologies utilisées
- **HTML5**
- **CSS3**
- **JavaScript (Vanilla JS)**
- **Node.js**
- **json-server**
- **Git & GitHub**

---


---

## ⚙️ Fonctionnalités principales

### 🔐 Authentification
- Page de connexion administrateur

### 📊 Dashboard
- Affichage dynamique des statistiques :
  - Nombre de produits
  - Nombre de catégories
  - Nombre de fournisseurs
  - Nombre d’entrepôts
  - Nombre de commandes

### 📦 Gestion des produits
- Ajouter un produit
- Modifier un produit
- Supprimer un produit
- Données gérées via API REST

### 🗂️ Gestion des catégories
- CRUD complet via API

### 🚚 Gestion des fournisseurs
- CRUD complet via API

### 🏬 Gestion des entrepôts
- CRUD complet via API

### 🧾 Gestion des commandes
- CRUD complet via API

---

## 🔌 API REST (json-server)

Le projet utilise **json-server** pour simuler un backend.

### Endpoints utilisés :
- `GET /products`
- `GET /categories`
- `GET /suppliers`
- `GET /warehouses`
- `GET /orders`
- `POST /`
- `PUT /:id`
- `DELETE /:id`

---

## ▶️ Instructions pour lancer le projet

### 1️⃣ Installer Node.js
Télécharger la version **LTS** depuis :
https://nodejs.org

Vérifier l’installation :
```bash
node -v
npm -v

### 2️⃣ Installer json-server, lancer l’API et démarrer le projet
npm install -g json-server
json-server --watch data/db.json --port 3000
