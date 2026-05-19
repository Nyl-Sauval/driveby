# 🚗 DriveOps — Location de Voitures

DriveOps est une solution logicielle complète de location de véhicules comprenant une plateforme web pour les clients, un tableau de bord pour les agents sur le terrain, une API sécurisée et une application mobile.

---

## 🛠️ Architecture du Projet

Le projet est organisé sous forme de monorépertoire (monorepo) regroupant trois sous-projets :

*   **`client/` (Web)** : Application frontend web construite avec **Angular (v19)** et **Angular Material**. Elle propose une interface moderne aux clients pour la réservation de véhicules et un espace agent pour les retraits/retours de véhicules.
*   **`server/` (API)** : API REST robuste développée avec **Laravel** (PHP 8.2+), gérant la persistance des données (MySQL/PostgreSQL), la facturation (génération de PDFs), et l'authentification sécurisée (JWT).
*   **`mobile/` (Application Mobile)** : Application hybride multiplateforme construite avec **Ionic** et **Capacitor** pour un usage nomade.

---

## ✨ Fonctionnalités Clés

### 💻 Espace Client (Web)
- **Catalogue interactif** : Recherche et filtrage des véhicules par agence, type de transmission, motorisation, et disponibilité.
- **Réservation en plusieurs étapes (Stepper)** : Formulaire fluide avec choix des dates, informations du conducteur, sélection de formules d'assurance et d'options (siège bébé, GPS, etc.).
- **Espace Profil** : Visualisation de l'historique des réservations, modification des réservations actives et téléchargement des documents (factures et avenants au format PDF).

### 👥 Espace Agent (Web)
- **Tableau de bord dynamique** : Indicateurs de performance en temps réel (réservations actives, retours attendus, indicateur de flotte).
- **Gestion des flux sur le terrain** :
  - Formulaires numériques pour les **Retraits** (vérification du permis, kilométrage de départ, niveau de carburant).
  - Formulaires de **Retour** (constat d'état, calcul d'avenant de facturation en cas de retard, surcoût carburant ou dépassement kilométrique).

### 📱 Espace Mobile (Ionic)
- Version optimisée et réactive pour le suivi de ses locations en déplacement.

---

## 🚀 Installation et Lancement Rapide

### Prérequis
- **Node.js** (v20+)
- **PHP** (v8.2+) & **Composer**
- Un serveur de base de données (MySQL / PostgreSQL / SQLite)

### 1. Cloner le projet
```bash
git clone https://github.com/votre-username/location-de-voitures.git
cd location-de-voitures
```

## Connexion à l'application
Nous avons créé un client, agent et administratetur grâce aux seeders pour pouvoir tester l'application:
1. Client :  
emaiil : client@example.com  
password : password


2. Agent :  
email : agent@example.com  
password : password


3. Administrateur :  
email : test@example.com  
password : password


## Système d'information
### MCD
![MCD du projet](./MCD.jpg)
### MLD
![MLD du projet](./MLD.jpg)

