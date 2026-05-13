# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


## [1.2.0] - 2026-05-12

## Added

- Implement frame for MCP detail view.
- Implement frame for MCP UI with inspector functionality.
- Added API Credentials management, allow users to add credentials for providers for Kong and AWS.
- Added Token Details view to display token information and usage.
- New Products Section to display available products from Kong and AWS, and their details.
- New Product Details view to display detailed information about a specific product.

## Changed

- URLs for APIs and MCPs now use `slug` instead of `documentId` across all pages and routes.


## [1.1.0] - 2026-04-16

## Added

- MCP Support: Implementation of basic schemas and connection logic for Model Context Protocol.
- Inspector: New debugging tool for MCPs with support for executing and testing remote tools.
- Dedicated MCP Service to handle provider communication using custom headers and API keys.
- MCP Capabilities: Add tools and prompts on MCP Detail UI, handling list overflow.
