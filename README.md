# 🚀 Devportal in React Mode - Multi API Management

This is an open-source **Devportal** frontend built with React. It provides a multi-API management interface, designed to work with Strapi.io

## 📦 Prerequisites

- **Node.js**: `14.20.1`

## ⚙️ Environment Variables

Set up the following environment variables in a `.env` file:

| Variable                 | Description                       |
| ------------------------ | --------------------------------- |
| `VITE_APP_STRAPI_URL`   | URL of the Strapi backend         |
| `PORT`                   | Port on which the frontend runs   |
| `VITE_APP_REMEMBER_KEY` | Key for remembering user settings |

## ⚙️ Environment variables if using Azure Api Manager

| Variable                                 | Description                              |
| ---------------------------------------- | ---------------------------------------- |
| `VITE_APP_AZURE_APIM_URL`               | Azure API Management URL                 |
| `VITE_APP_AZURE_SUBSCRIPTION_ID`        | Azure subscription ID                    |
| `VITE_APP_AZURE_RESOURCE_GROUP_NAME`    | Azure resource group name                |
| `VITE_APP_AZURE_SERVICE_NAME`           | Azure API service name                   |
| `VITE_APP_AZURE_APIM_ADMIN_API_VERSION` | Azure APIM admin API version (commented) |

## 🚀 Installation & Usage

### 1️⃣ Install dependencies local

```sh
npm install

```

### 2️⃣ Install with docker

```sh
docker-compose up -d --build

```
