# Architecture Decision Records (ADRs)

This document records the major technical design decisions, trade-offs, and architectural choices made during the development and refactoring of the **Expense Management System**.

---

## ADR 1: Adoption of Spring Security 6 with Stateless JWT Authentication

### Status
Accepted & Implemented

### Context
The application initially lacked security filters, relying solely on client-side state management for authorization. This exposed API endpoints to unauthenticated access and direct parameter manipulation.

### Decision
Implement Spring Security 6 with stateless JWT Bearer token authorization:
1. `JwtAuthenticationFilter` intercepts HTTP requests and validates tokens using HMAC SHA-256 signatures.
2. `SecurityConfig` defines stateless session management (`SessionCreationPolicy.STATELESS`) and permits unauthenticated access only to `/users/register`, `/users/login`, and public static assets.

### Consequences
- **Positive**: All endpoints are secured against unauthorized access; token claims provide verifiable identity.
- **Trade-off**: Requires client application (`axios`) to store and attach Authorization headers on every request.

---

## ADR 2: Atomic Double-Leg Transfer Execution

### Status
Accepted

### Decision
Implement financial transfers between accounts as atomic double-leg transactions managed inside `@Transactional` Spring service methods:
- An outgoing `EXPENSE` transaction leg is recorded for the source account.
- An incoming `INCOME` transaction leg is recorded for the target account.
- Both account balances are updated synchronously within a single database transaction boundary.

### Consequences
- **Positive**: Prevents partial balance updates and maintains double-entry financial balance integrity.

---

## ADR 3: Monorepo Organization & Standards Compliance

### Status
Accepted & Implemented

### Decision
Standardize repository structure according to [`PORTFOLIO-STANDARDS.md`](file:///d:/BNU/SM5/Web%20Engineering/Assignments/Assignment-05/PORTFOLIO-STANDARDS.md):
- Relocate coursework specs into `docs/coursework/`.
- Maintain unified documentation structure (`docs/architecture.md`, `docs/api.md`, `docs/decisions.md`).
- Place visual assets in `assets/images/`, `assets/gifs/`, and `assets/videos/`.
- Provide standard governance files (`LICENSE`, `CHANGELOG.md`, `CONTRIBUTING.md`, `.env.example`).
