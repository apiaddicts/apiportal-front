# 🚀 DevPortal Frontend

This is the **DevPortal Frontend**, a React-based interface designed to manage and consume multiple APIs. It acts as the presentation layer for the **Strapi CMS**, providing a seamless experience for API documentation.

---

## 📦 Container Specifications

The frontend is containerized using **Node 22 Alpine** image.

* **Base Image:** `node:22.14.0-alpine`
* **Port:** `3000` (Defined via `VITE_PORT`)

---

## ⚙️ Environment Variables

The application is highly configurable via environment variables. Create a `.env` file at the root of the project:

### 🔑 Core & Backend Connections
| Variable | Description |
| :--- | :--- |
| `VITE_PORT` | Port where the frontend runs (default: 3000) |
| `VITE_APP_STRAPI_URL` | Base URL of the Strapi API (e.g., `http://localhost:1337/api`) |
| `VITE_APP_STRAPI_URL_IMGS` | Base URL for media assets (e.g., `http://localhost:1337`) |
| `VITE_APP_AUTH` | Authentication service endpoint |
| `VITE_APP_INTEGRATOR_URL` | Gateway/Integrator URL |


### 📄 Content Slugs
Must match the slugs defined in the CMS Seed data.

| Variable | Default Value |
| :--- | :--- |
| `VITE_APP_HOME_PAGE_SLUG` | `home` |
| `VITE_APP_APIS_PAGE_SLUG` | `apis` |
| `VITE_APP_MCPS_PAGE_SLUG` | `mcps` |
| `VITE_APP_BLOG_PAGE_SLUG` | `blog` |
| `VITE_APP_FAQ_PAGE_SLUG` | `faq` |
| `VITE_APP_TERMS_PAGE_SLUG` | `terms` |
| `VITE_APP_POLICY_PAGE_SLUG` | `policy-privacy` |

---

## 🚀 Execution

### 🐳 Using Docker (Recommended)

```sh
docker-compose up -d --build
```

### 🧑‍💻 Local Development

Run the application natively with Node.js:

```sh
npm install
npm run start
```

---

## ⚠️ Important Notes

1. **CMS Dependency:** This frontend is dynamic. If the Strapi backend is empty or lacks the correct slugs, the pages will load but content will be missing.
2. **Build Time Variables:** Since this is a Vite/React app, environment variables are injected at **build time**. If you change a variable in `.env`, you **must** rebuild the container:
`docker-compose up -d --build`

---