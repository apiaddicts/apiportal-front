# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.0] - 2026-10-05

## Added

- **Agents Catalog:** New `/agents` page built like the Mcps catalog (`LibraryPaginated` + `CardInformation`), with filters by version, protocol (API, A2A, A2UI) and rating, search, sorting, page size and list/grid views. Cards show the protocols as colored chips.
- **Agent Detail:** New `/agents/:slug` page built from the A2A agent card: `BannerImage` header, skills (`CardResource`), production capabilities, protocols with links to the agent docs, contact box and related agents (`CardBasic`).
- **Agent Card Support:** `agentLibraryAction` reads A2A v0.3 and v1.0 agent cards into a single shape and filters/sorts the catalog the same way as `mcpLibraryAction`.
- **Agent Quality:** Agent detail shows the A–E grades with the shared `Ratings` gauges and a "Download report" button when `reportUrl` is set.
- **Agent Description:** Agent detail shows the CMS `markdown` field in an "About this agent" section when it is filled, as MCP detail does.


## [1.2.1] - 2026-07-16

## Fixed

- **Catalog Images:** `LibraryPaginated` now passes each item's image to the card component, fixing missing images in the Mcps catalog.
- **Media URLs:** Added a `getMediaUrl` helper to resolve relative Strapi media URLs, fixing broken images in the local environment.


## [1.2.0] - 2026-05-25

## Added

- **GraphQL Visualizer:** New `GraphqlUI` page with two views, Graph and Explorer.
- **GraphQL Routing:** Added `/apis/:slug/graphql-ui` route in both public and private routers.
- **GraphQL SDL via URL:** `openDocUrl` for GraphQL fetches the SDL as plain text (GET) instead of sending an introspection POST, allowing use of any raw file URL.
- **Frame**: Implement frame for MCP detail view, and MCP UI with inspector functionality.
- Added **API Credentials management**, allow users to add credentials for providers for Kong and AWS.
- Added **Token Details** view to display token information and usage.
- New **Products Section** to display available products from Kong and AWS, and their details.
- New **Product Details** view to display detailed information about a specific product.

## Changed

- `getDocRoute` in public and private `ApiDetail` now redirects to `graphql-ui` when `openDocType` is `graphql`.
- URLs for APIs and MCPs now use `slug` instead of `documentId` across all pages and routes.


## [1.1.0] - 2026-04-16

## Added

- MCP Support: Implementation of basic schemas and connection logic for Model Context Protocol.
- Inspector: New debugging tool for MCPs with support for executing and testing remote tools.
- Dedicated MCP Service to handle provider communication using custom headers and API keys.
- MCP Capabilities: Add tools and prompts on MCP Detail UI, handling list overflow.
