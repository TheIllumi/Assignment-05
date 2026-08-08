# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-08-08

### Added
- Comprehensive context documentation (`CONTEXT.md`) and portfolio evaluation report.
- Active Spring Security 6 authentication filter chain (`SecurityConfig` & `JwtAuthenticationFilter`).
- Externalized environment configuration template (`.env.example`) for backend and frontend.
- Standardized documentation structure under `docs/` (`architecture.md`, `api.md`, `decisions.md`).
- MIT License and project governance files (`CHANGELOG.md`, `CONTRIBUTING.md`).

### Changed
- Refactored `application.properties` to support environment variable overrides and sensible fallback defaults.
- Reorganized legacy coursework assignment files into `docs/coursework/`.
- Updated Maven `pom.xml` dependencies to include `spring-boot-starter-security` and removed unused SOAP dependency.

### Removed
- Removed unreferenced duplicate stub `AttachmentsService.java`.
- Removed auto-generated default `HELP.md`.
