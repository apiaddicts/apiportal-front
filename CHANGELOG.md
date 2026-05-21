# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

#### Validación de credencial Gaia-X en Participantes
- Llamada automática a `POST /api/gaia-x/validate` con el `slug` del catálogo al entrar a la sección Participantes
- Panel "Compliance y Certificación" con 4 casos de respuesta:
  - `found: false` → badge rojo "Catálogo no encontrado"
  - `hasCredential: false` → aviso "Sin credencial Gaia-X configurada"
  - `isActive: true` → badge verde con datos completos (complianceLabel, certifiedBy, trustFramework, issuer, fechas) y checks de validación
  - `isActive: false` → badge rojo con los mismos datos y checks fallidos
- Checks de validación con hexágono al estilo del resto de la sección: firma JWS, emisor en trust anchors, credencial no expirada
- Componente `GaiaXProofModal` disponible para integración futura en otras vistas
- Claves i18n en namespace `GaiaX` para español e inglés

#### Adaptación de Assets al nuevo formato Gaia-X
- `OverviewServiceOffering` adaptado para consumir el VC `ServiceOffering` con `credentialSubject.gx:aggregationOf`
- Tipo `ServiceOffering` añadido al índice de recursos con icono, label y tag propios
- Fallback genérico para tipos desconocidos: no rompe si llega un tipo no registrado
- Vista de detalle al hacer clic en un asset de tipo `ServiceOffering` (muestra ID, tipo, descripción, proveedor) con botón "Volver"
- Tipos existentes (SoftwareResource, DataResource, InfrastructureResource) mantienen navegación a su sección correspondiente

#### Adaptación de Policies al nuevo formato ODRL/Gaia-X
- `SectionPolicies` reescrito para consumir el VC `Policy` con estructura ODRL
- Columna 1: muestra valores reales de ID, nombre, emisor, fecha y tipo (antes mostraba iconos vacíos)
- Columna 2: cada regla de `gx:accessPolicy.gx:rules` se muestra como tarjeta con su `policyId` y acción `odrl:permission`
- Columna 3: descripción de `gx:usagePolicy`, permisos y prohibiciones de uso, bloque de contrato con `governingLaw`, `arbitration` y enlace a `termsAndConditions`

#### Adaptación de Contracts al nuevo formato Gaia-X
- `SectionContracts` reescrito para consumir el VC `ContractDefinition`
- General Info ampliado: contractId, nombre, versión, estado, modelo, proveedor, consumidor, emisor, fecha y descripción
- Tabla "Linked Services" desde `gx:appliesTo` (reemplaza `gx:linkedAssets` y `gx:policyClauses` del formato anterior)
- Tabla "Terms & Conditions" desde `gx:termsAndConditions` con URL clicable y hash
- Bloque "Compliance" con ubicación de datos y bandera de soberanía desde `gx:compliance.gx:dataSovereignty`

### Changed
- `CatalogDetail`: todos los `JSON.parse` sobre campos del catálogo reemplazados por `safeParse` — el portal no rompe si algún campo contiene JSON malformado o truncado
- `CatalogDetail`: el slug enviado al endpoint Gaia-X usa `catalog.slug` en lugar del ID numérico de la URL
- `ParticipantSection`: accesos a `gx:headquarterAddress` y `gx:legalRegistrationNumber` protegidos con optional chaining para evitar crash cuando el participante no tiene todos los campos

### Fixed
- `OverviewServiceOffering`: crash `Cannot read properties of undefined (reading 'label')` cuando el tipo de un asset de `gx:aggregationOf` no existe en el índice de recursos
- `PoliciesSection`: crash `Cannot read properties of undefined (reading 'icon')` cuando el atributo de una regla de acceso no existe en `titleIconAccessPolicies`
- `ParticipantSection`: crash `Cannot read properties of undefined (reading 'toLowerCase')` al acceder a `gx:addressCountryCode` en participantes con datos incompletos
