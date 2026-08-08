# Setup & Installation Guide

This guide provides step-by-step instructions for configuring, building, and running the **Expense Management System** in local development and containerized environments.

---

## 1. System Requirements

| Tool / Dependency | Minimum Version | Recommended |
| :--- | :--- | :--- |
| **Java Development Kit (JDK)** | 17 LTS | Eclipse Temurin 17 |
| **Node.js** | 18 LTS | Node.js 20 LTS |
| **npm** | 9.x | 10.x |
| **MySQL Server** | 8.0 | 8.0+ |
| **Docker & Docker Compose** *(Optional)* | 24.0+ | Docker Desktop 4.25+ |

---

## 2. Environment Configuration

The application uses externalized environment variables for database credentials, JWT security keys, and server ports.

### A. Root Environment Setup (Backend)
Copy `.env.example` to `.env` in the repository root:
```bash
cp .env.example .env
```

Configure local credentials inside `.env`:
```env
# Database Credentials
DB_URL=jdbc:mysql://localhost:3306/expense-system-db?createDatabaseIfNotExist=true
DB_USERNAME=root
DB_PASSWORD=your_mysql_password

# JWT Security
JWT_SECRET=your_super_secret_jwt_key_that_is_at_least_256_bits_long
JWT_EXPIRATION=86400000

# Application Server
PORT=8080
DDL_AUTO=update
UPLOAD_DIR=uploads/receipts
```

### B. Frontend Environment Setup
Copy `.env.example` inside `expense-system-frontend`:
```bash
cp expense-system-frontend/.env.example expense-system-frontend/.env
```

Configure API Base URL inside `expense-system-frontend/.env`:
```env
REACT_APP_API_BASE_URL=http://localhost:8080
PORT=3000
```

---

## 3. Database Initialization

1. Start your local MySQL server.
2. Open MySQL CLI or workbench and create the database schema:
   ```sql
   CREATE DATABASE `expense-system-db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```
3. The Spring Boot application automatically creates and updates required table schemas on startup via Hibernate DDL (`spring.jpa.hibernate.ddl-auto=update`).

---

## 4. Running Locally

### Step 1: Start Backend (Spring Boot)
From the repository root:
```bash
# Windows
.\mvnw.cmd spring-boot:run

# Linux / macOS
./mvnw spring-boot:run
```
*Verify server startup log: `Started ExpenseManagementSystemApplication in X seconds` on `http://localhost:8080`.*

### Step 2: Start Frontend (React)
In a separate terminal window:
```bash
cd expense-system-frontend
npm install
npm start
```
*The React SPA will start on `http://localhost:3000` with automatic browser opening.*

---

## 5. Running with Docker Compose (Containerized)

To launch the complete application stack (Backend, Frontend, and MySQL) in isolated containers:

```bash
# Build and launch all services
docker-compose up --build -d

# View container logs
docker-compose logs -f

# Shutdown containers
docker-compose down
```

Container access points:
- **Frontend SPA**: `http://localhost:3000`
- **Backend REST API**: `http://localhost:8080`
- **MySQL Database**: `localhost:3306` (`root` / `root`)
