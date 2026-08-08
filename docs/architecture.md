# System Architecture Overview

This document describes the architectural design, system boundaries, data flow, and component organization of the **Expense Management System**.

---

## 1. System Overview & Technology Stack

The application is structured as a decoupled multi-tier system:

- **Frontend Tier**: React 19 Single Page Application (SPA) using Material UI (MUI v7), Chart.js visual analytics, and Axios REST client.
- **Backend Tier**: Java 17 Spring Boot 3.5.6 Web Application providing stateless RESTful APIs.
- **Security Tier**: Spring Security 6 with stateless JWT Bearer token authentication and BCrypt password hashing.
- **Persistence Tier**: Spring Data JPA / Hibernate ORM connected to MySQL 8.0 (production) or H2 (in-memory test).

---

## 2. High-Level Architecture Diagram

```mermaid
graph TB
    subgraph Client Layer [React 19 SPA]
        UI[Material UI Components]
        State[React Context: AuthContext / ThemeContext]
        Axios[Axios HTTP Client + Interceptor]
    end

    subgraph Security & API Gateway [Spring Security 6]
        JwtFilter[JwtAuthenticationFilter]
        SecConfig[SecurityConfig / SecurityFilterChain]
    end

    subgraph Service Layer [Spring Boot 3.5.6]
        Controllers[REST Controllers]
        Services[Business Logic & Service Layer]
        DTO[DTO / VO Mappers]
    end

    subgraph Data & Storage Layer
        JPA[Spring Data JPA Repositories]
        DB[(MySQL 8 / H2 Database)]
        Disk[(Local Disk / File Uploads)]
    end

    UI --> Axios
    Axios -->|HTTP REST / Bearer Token| JwtFilter
    JwtFilter --> SecConfig
    SecConfig --> Controllers
    Controllers --> DTO
    Controllers --> Services
    Services --> JPA
    Services --> Disk
    JPA --> DB
```

---

## 3. Data Flow & Component Interaction

### A. Authentication & Session Setup
1. Client submits credentials to `POST /users/login`.
2. `UsersController` delegates to `UsersService`, validating credentials via BCrypt.
3. Upon success, `JwtUtil` issues a signed JWT token containing `userId` and `email` claims with a 24-hour expiration.
4. Client stores token in `localStorage` via `AuthContext`.
5. Subsequent HTTP requests automatically include `Authorization: Bearer <token>` header added by `axios.js` interceptor.

### B. Double-Leg Transfer Execution
```mermaid
sequenceDiagram
    autonumber
    actor User
    participant Frontend as React Client
    participant Controller as TransactionsController
    participant Service as TransactionsService
    participant AccountRepo as AccountsRepository
    participant TxRepo as TransactionsRepository

    User->>Frontend: Submit Transfer (Source, Target, Amount)
    Frontend->>Controller: POST /transactions (Type: TRANSFER)
    Controller->>Service: createTransaction(vo)
    Service->>AccountRepo: Verify Source & Target Account Balances
    Service->>TxRepo: Save Outgoing Leg (EXPENSE)
    Service->>TxRepo: Save Incoming Leg (INCOME)
    Service->>AccountRepo: Update Source Current Balance (-Amount)
    Service->>AccountRepo: Update Target Current Balance (+Amount)
    Service-->>Controller: Return TransactionDTO
    Controller-->>Frontend: HTTP 201 Created
```

---

## 4. Database Entity Relationships

The core database model consists of user-scoped financial entities:

- **`Users`**: Primary entity owning accounts, budgets, transactions, categories, and settings.
- **`Accounts`**: Financial buckets (`BANK`, `CASH`, `CREDIT_CARD`, `MOBILE_WALLET`) with initial and real-time balances.
- **`Categories`**: Hierarchical classification trees for Income, Expense, and Transfer tagging.
- **`Transactions`**: Atomic units of financial record containing transaction type, amount, status (`CLEARED`, `PENDING`), date, and relationships to `Accounts`, `Categories`, and optional `Merchants`.
- **`Budgets` & `BudgetItems`**: Spending threshold limits associated with specific categories over time windows (Monthly, Weekly, Annual).
- **`Attachments`**: Receipt metadata linking uploaded disk files to specific transactions.
