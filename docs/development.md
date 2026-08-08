# Developer & Contributor Guide

This guide details code structure conventions, developer tooling, testing practices, and contribution workflows for the **Expense Management System**.

---

## 1. Project Organization

```
expense-management-system/
├── src/main/java/io/github/sedmugen/expensetracker/
│   ├── config/       # Spring Configuration & Security Beans
│   ├── controller/   # REST API Controllers (ResponseEntity endpoints)
│   ├── dto/          # Data Transfer Objects
│   ├── entity/       # JPA Domain Model Entities
│   ├── enums/        # Type-safe Java Enums
│   ├── exception/    # Custom Exceptions & Global Exception Handler
│   ├── repository/   # Spring Data JPA Repository Interfaces
│   ├── security/     # JwtAuthenticationFilter & Token Validation
│   ├── service/      # Business Services & Transactional Logic
│   ├── util/         # Helper Validators & Date Calculators
│   └── vo/           # Value Objects for Request Bodies
└── expense-system-frontend/
    ├── src/
    │   ├── api/        # Axios API Service Modules
    │   ├── components/ # Reusable Material UI Components
    │   ├── context/    # React AuthContext & ThemeContext
    │   ├── pages/      # Page View Controllers
    │   └── theme/      # MUI Custom Theme Definitions
```

---

## 2. Coding Standards & Conventions

### Java / Backend
- **Java Version**: Java 17 LTS features (Records, Text Blocks, Enums).
- **Naming**: `CamelCase` for class names, `lowerCamelCase` for variable and method names.
- **REST Endpoints**: `kebab-case` or `camelCase` consistent URL paths returning standard HTTP status codes (`200 OK`, `201 Created`, `204 No Content`, `400 Bad Request`, `401 Unauthorized`, `404 Not Found`).
- **Lombok**: Use `@Data`, `@Builder`, `@NoArgsConstructor`, `@AllArgsConstructor` to eliminate boilerplate getters/setters.

### React / Frontend
- **Framework**: React 19.x with functional components and React Hooks (`useState`, `useEffect`, `useContext`, `useCallback`).
- **Styling**: Material-UI (MUI v7) components with `sx` property styling tokens; avoid inline hardcoded styles.
- **Form Validation**: `react-hook-form` paired with `yup` schema validation.

---

## 3. Testing & Quality Assurance

### Running Backend Unit Tests
```bash
./mvnw test
```

### Running Frontend Tests & Linter
```bash
cd expense-system-frontend
npm test
npm run build
```

---

## 4. Git Workflow & Commit Guidelines

Follow Conventional Commit guidelines:

- `feat(<scope>): description` - New feature capability
- `fix(<scope>): description` - Bug fix
- `refactor(<scope>): description` - Code refactoring without behavioral change
- `docs(<scope>): description` - Documentation updates
- `test(<scope>): description` - Adding or updating unit tests
- `ci(<scope>): description` - CI pipeline or Docker updates

---

## 5. Continuous Integration (CI)

Every pull request and push to `master` triggers the GitHub Actions workflow [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) to run Maven tests and React production build checks.
