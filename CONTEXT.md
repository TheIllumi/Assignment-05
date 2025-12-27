# Project Context: Expense Management System (Assignment 05)

## 1. System Overview
This is a full-stack **Expense Management System** designed to help users track personal finances. It allows for managing multiple accounts (Bank, Cash, Mobile Wallet), recording income/expenses, setting monthly budgets, and visualizing spending habits through a comprehensive dashboard.

The system is built with a **Java Spring Boot** backend and a **React** frontend, communicating via a RESTful API.

## 2. Architecture & Data Flow

### High-Level Architecture
*   **Client (Frontend):** React SPA using Material UI. Handles user interaction, state management (Context API), and API calls.
*   **Server (Backend):** Spring Boot application. Handles business logic, data persistence, and security.
*   **Database:** MySQL (Production) / H2 (Test). Stores users, transactions, accounts, and configuration.

### System Interaction Patterns
1.  **Authentication:**
    *   User logs in via Frontend form.
    *   Backend (`UsersController`) validates credentials via `UsersService`.
    *   On success, a **JWT** is generated and returned.
    *   Frontend (`AuthContext`) saves the token in `localStorage`.
    *   All subsequent Axios requests include `Authorization: Bearer <token>` header.

2.  **Data Retrieval (e.g., Dashboard Load):**
    *   Frontend component (`Dashboard.js`) calls `DashboardService.getSummary(userId)`.
    *   Request: `GET /dashboard/summary?userId=123`.
    *   Backend (`DashboardController`) delegates to `DashboardService`.
    *   `DashboardService` queries multiple repositories (`Transactions`, `Accounts`, `Budgets`) to aggregate data.
    *   Response: JSON object with total balance, recent transactions, and spending summaries.

3.  **Transaction Processing:**
    *   User submits a new expense.
    *   Backend (`TransactionsService`) validates the request (e.g., sufficient balance).
    *   **Transactional Logic:**
        *   The transaction record is saved.
        *   If status is `CLEARED`, the related `Account` balance is immediately updated.
        *   For **Transfers**, two linked transactions are created (one `EXPENSE` (out) and one `INCOME` (in)), and both account balances are updated.

## 3. Backend Details
*   **Language:** Java 17
*   **Framework:** Spring Boot 3.5.6
*   **Build Tool:** Maven

### Core Modules (Service Layer Logic)
*   **UsersService:**
    *   Handles Registration: Creates a user, hashes password (BCrypt), and **auto-generates** default data (Cash Account, Income/Expense/Transfer Categories, Notification Preferences).
    *   Handles Login: Validates credentials and generates JWT.
*   **TransactionsService:**
    *   The heart of the financial logic.
    *   Enforces business rules: checks for negative balances (if configured), validates category types match transaction types.
    *   Manages **state transitions**: Updating a transaction from `PENDING` to `CLEARED` triggers a balance update.
*   **DashboardService:**
    *   A read-heavy service designed for analytics.
    *   Computes "Net Savings" (Income - Expense).
    *   Generates "Budget Progress" by comparing actual category spending against limits.
    *   Aggregates spending trends (Daily/Weekly/Monthly) for charts.
*   **ChartOfAccountsService:**
    *   Aggregates `Accounts` (Assets/Liabilities) and `Categories` (Income/Expenses).
    *   Fetches both user-defined categories and system default categories (where userId is null).
    *   Assigns standard accounting codes (1xxx Assets, 2xxx Liabilities, 4xxx Income, 5xxx Expenses).
    *   Calculates Net Worth (Assets - Liabilities).
*   **DataSeeder:**
    *   Runs on application startup.
    *   Checks for `guest@example.com`. If missing, it populates the DB with a full demo dataset (User, Accounts, Categories, Transactions, Budgets) to facilitate immediate testing/demoing.

### API Endpoints & Conventions
*   **Naming Convention:** REST endpoints use **camelCase** (e.g., `/paymentMethods`, `/recurringRules`) rather than kebab-case.
*   **Pagination:** Many list endpoints (like `/merchants`, `/paymentMethods`) return a Spring Data `Page` object (`content`, `pageable`, `totalElements`), while others (like `/accounts`) return a simple `List`. The Frontend services abstract this difference.
*   **Filtering:** Most `GET` requests require `userId` as a query parameter.
*   **ID Mapping Consistency:** All backend DTOs (Accounts, Categories, Merchants, Payment Methods, Transactions) consistently use the `id` field as the primary identifier. Frontend components must map dropdown keys and values to `entity.id`.
*   **Creation Operations:** Backend VOs (`CategoriesVO`, `MerchantsVO`, etc.) have been relaxed to allow null `id`, `createdAt`, `updatedAt`, and `archived` fields. The Service layer injects default values (e.g., current date, archived=false) if these are missing, simplifying frontend requests.

### Key Entities & Relationships
*   **Users:** Root entity. Owns all other data.
*   **Accounts:** Represents a financial bucket (e.g., "HBL Savings", "Wallet"). Has a `currentBalance`.
*   **Transactions:** The atomic unit of change. Linked to `Users`, `Accounts`, `Categories`, and optionally `Merchants` or `PaymentMethods`.
    *   `type`: INCOME, EXPENSE, TRANSFER.
    *   `status`: CLEARED, PENDING.
*   **Budgets:** Defines a spending limit for a set of categories over a date range.
*   **Categories:** Hierarchy for tagging transactions (e.g., "Food", "Salary").

## 4. Frontend Details
*   **Framework:** React 19.2.3
*   **UI Library:** Material UI (MUI) v7
*   **State Management:**
    *   **AuthContext:** Global state for User object and Authentication status.
    *   **Local State:** `useState` hooks within components for form data and UI controls.

### Directory Structure & Responsibilities
*   `src/api/`: **Service Layer**. Contains files like `dashboardService.js`, `authService.js`. These are pure JS objects that wrap `axios` calls, isolating components from API URL details.
*   `src/pages/`: **Views**.
    *   `Dashboard.js`: The command center. Displays summary cards and widgets.
    *   `Transactions.js`: List and filter transactions.
    *   `ChartOfAccounts.js`: Displays a hierarchical view of all financial accounts with codes and balances.
*   `src/components/`: **Building Blocks**.
    *   `Layout.js`: Application shell with Sidebar and Header.
    *   `ProtectedRoute.js`: Higher-order component that redirects unauthenticated users to Login.
    *   `TransactionDialog.js`: Modal for creating expenses, income, and transfers. Fetches necessary metadata (Accounts, Categories, PaymentMethods) on open.

### Key Features Implementation
*   **Charts:** Implemented using `react-chartjs-2` (wraps Chart.js). Configuration resides in `utils/chartSetup.js`.
*   **Forms:** Heavy use of `react-hook-form` paired with `yup` schema validation for robust user input handling.

## 5. Development & Configuration
*   **Database Config:** `application.properties` defines connection to `expense-system-db`.
    *   Credentials: `root` / `batmanbinsuperman`.
*   **Security:**
    *   `SecurityConfig` is currently a placeholder.
    *   Security is primarily enforced via `JwtUtil` and manual checks in Services.
    *   **Note:** The backend relies on `userId` passed as a request parameter for many read operations, trusting the frontend to pass the ID matching the logged-in user (authorization checks inside services should verify this match).

## 6. How to Run
1.  **Database:** Start MySQL. Create database `expense-system-db`.
2.  **Backend:**
    ```bash
    mvn spring-boot:run
    ```
    *Wait for "Database seeding completed" log to confirm startup.*
3.  **Frontend:**
    ```bash
    cd expense-system-frontend
    npm start
    ```
4.  **Access:**
    *   Web UI: `http://localhost:3000`
    *   API: `http://localhost:8080`
    *   **Demo Login:** `guest@example.com` / `guest123`