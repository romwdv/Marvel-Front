# Marvel Heroes — Exercice React

> Application de navigation dans l'univers Marvel (personnages et comics), réalisée dans le cadre d'une formation chez **Le Reacteur**.

🌐 **[Voir le site en ligne](https://heros.romwdv.fr)**

> ⚠️ Il s'agit d'un exercice pédagogique. L'application se connecte à un backend dédié (dépôt séparé).

---

## 📖 Présentation

Ce projet permet d'explorer les personnages et comics Marvel. Il comprend :

- Un **header** avec navigation, barre de recherche et authentification
- Une **page d'accueil** avec mise en avant de l'univers Marvel
- Une **liste de personnages** avec recherche et pagination
- Une **fiche personnage** avec ses aptitudes, description et comics associés
- Une **liste de comics** avec navigation et détail par comic
- Une **page favoris** pour retrouver les personnages et comics sauvegardés
- Une **modal d'authentification** (inscription / connexion) avec gestion de session via cookies

---

## 🛠️ Technologies utilisées

| Technologie     | Usage                               |
| --------------- | ----------------------------------- |
| React 19        | UI déclarative, composants, hooks   |
| Vite            | Bundler et serveur de développement |
| React Router v7 | Routing SPA côté client             |
| Axios           | Requêtes HTTP vers le backend       |
| js-cookie       | Gestion du token de session         |
| react-icons     | Icônes                              |

---

## 🗂️ Structure du projet

```
📁 marvelfront/
├── src/
│   ├── App.jsx                  # Routing principal + UserProvider
│   ├── context/
│   │   └── UserContext.jsx      # Contexte global : user, token, favoris, modal auth
│   ├── pages/
│   │   ├── Home/                # Page d'accueil
│   │   ├── Personnages/         # Liste des personnages + fiche détail
│   │   ├── Comics/              # Liste des comics + détail comic
│   │   └── Favoris/             # Page des favoris
│   ├── components/
│   │   ├── Header/              # Navigation + recherche + bouton auth
│   │   ├── Footer/              # Pied de page
│   │   ├── Auth/                # Modal d'authentification
│   │   ├── Cards/               # Composant générique de liste (personnages / comics)
│   │   ├── Fiches/              # Aptitudes et détails d'un personnage
│   │   ├── Search/              # Barre de recherche
│   │   └── Loader/              # Indicateur de chargement
│   └── utils/                   # Fonctions utilitaires pures
│       ├── getImg.js            # Construction de l'URL image Marvel + fallback
│       ├── cleanTitle.js        # Supprime l'année entre parenthèses d'un titre
│       ├── nameYears.js         # Extrait le contenu entre parenthèses
│       ├── extractYears.js      # Variante d'extraction d'années
│       ├── comicsNumber.js      # Extrait le numéro d'un comic
│       ├── countComics.js       # Compte les entrées non-nulles d'un tableau de comics
│       └── randomNumber.js      # Génère un score aléatoire (décoratif)
```

---

## 🗺️ Routes

| Route          | Page                              |
| -------------- | --------------------------------- |
| `/`            | Accueil                           |
| `/personnages` | Liste des personnages             |
| `/profil/:id`  | Fiche détail d'un personnage      |
| `/comics`      | Liste des comics                  |
| `/comic/:id`   | Détail d'un comic                 |
| `/favoris`     | Favoris de l'utilisateur connecté |
| `*`            | Page 404                          |

---

## ⚙️ Fonctionnalités

### Authentification

La modal d'authentification permet l'inscription et la connexion. Le token renvoyé par le backend est stocké dans un cookie via `js-cookie` et partagé dans toute l'application via `UserContext`.

### Favoris

Un utilisateur connecté peut ajouter / retirer des personnages et comics de ses favoris. Les favoris sont persistés côté backend et récupérés à la connexion.

### Recherche

La barre de recherche filtre les personnages ou comics en temps réel via l'API, avec debounce pour limiter les requêtes.

### Optimisation des navigations

Les pages `Profil` et `Comic` exploitent le `state` passé par `<Link>` : si les données sont déjà disponibles (navigation depuis la liste), aucun fetch supplémentaire n'est déclenché.

---

## 🚀 Lancer le projet en local

```bash
# Cloner le dépôt
git clone https://github.com/romwdv/marvelfront.git
cd marvelfront

# Installer les dépendances
yarn install

# Configurer l'URL du backend
cp .env.example .env
# Éditer .env : VITE_API_URL=http://localhost:3000

# Démarrer le serveur de développement
yarn dev
```

> Pour que l'authentification et les favoris fonctionnent, le backend doit être lancé localement ou accessible via une URL distante.

---

## 🔗 Dépôts liés

| Repo                                        | Description                                   |
| ------------------------------------------- | --------------------------------------------- |
| Ce dépôt                                    | Frontend — React / Vite                       |
| [Backend](https://github.com/romwdv/Marvel) | API — authentification, favoris, proxy Marvel |

---

## 👤 Auteur

Exercice réalisé par **Romain** dans le cadre de la formation **[Le Reacteur](https://www.lereacteur.io/)**.
