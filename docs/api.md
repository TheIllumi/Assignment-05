# REST API Specification & Endpoint Catalog

This document details the RESTful API endpoints exposed by the **Expense Management System** backend.

Base URL: `http://localhost:8080`  
Authentication Header: `Authorization: Bearer <token>`

---

## 1. Authentication Endpoints

### `POST /users/register`
Registers a new user account and seeds default cash accounts and categories.
- **Request Body**:
  ```json
  {
    "fullName": "Jane Doe",
    "email": "jane@example.com",
    "password": "SecurePassword123!",
    "preferredCurrency": "PKR"
  }
  ```
- **Response** (`201 Created`):
  ```json
  {
    "id": 1,
    "fullName": "Jane Doe",
    "email": "jane@example.com",
    "status": "ACTIVE",
    "createdAt": "2026-08-08T12:00:00.000+00:00"
  }
  ```

### `POST /users/login`
Authenticates user credentials and returns a signed JWT.
- **Request Body**:
  ```json
  {
    "email": "guest@example.com",
    "password": "guest123"
  }
  ```
- **Response** (`200 OK`):
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiJ9...",
    "userId": 1,
    "email": "guest@example.com",
    "fullName": "Guest User"
  }
  ```

---

## 2. Dashboard & Analytics Endpoints

### `GET /dashboard/summary?userId={userId}`
Retrieves aggregated financial dashboard statistics.
- **Response** (`200 OK`):
  ```json
  {
    "totalBalance": 155000.00,
    "monthlyIncome": 250000.00,
    "monthlyExpenses": 18800.00,
    "netSavings": 231200.00,
    "recentTransactions": [...],
    "categoryBreakdown": [...]
  }
  ```

---

## 3. Account Endpoints

### `GET /accounts?userId={userId}`
Retrieves all active financial accounts owned by the user.

### `POST /accounts`
Creates a new financial account (e.g. Bank Account or Cash Wallet).

---

## 4. Transaction Endpoints

### `GET /transactions?userId={userId}`
Fetches filtered transactions.

### `POST /transactions`
Records a new transaction (Income, Expense, or Transfer).

---

## 5. Export Endpoints

### `GET /export/csv?userId={userId}&startDate={YYYY-MM-DD}&endDate={YYYY-MM-DD}`
Downloads formatted CSV transaction log using Apache Commons CSV.

### `GET /export/json?userId={userId}&startDate={YYYY-MM-DD}&endDate={YYYY-MM-DD}`
Downloads formatted JSON financial summary export.
