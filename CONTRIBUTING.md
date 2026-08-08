# Contributing Guidelines

Thank you for your interest in contributing to the **Expense Management System**! This document provides guidelines and standards for submitting contributions.

## Code of Conduct

Please maintain a respectful, inclusive, and welcoming environment for all contributors.

## Git Workflow & Branch Naming

All contributions must follow the standard Git branching and Conventional Commit specifications outlined in [`PORTFOLIO-STANDARDS.md`](file:///d:/BNU/SM5/Web%20Engineering/Assignments/Assignment-05/PORTFOLIO-STANDARDS.md):

### Branch Naming Conventions
- `feature/<short-description>` (e.g. `feature/export-pdf-report`)
- `bugfix/<short-description>` (e.g. `bugfix/jwt-expiration-handling`)
- `docs/<short-description>` (e.g. `docs/update-api-spec`)
- `refactor/<short-description>` (e.g. `refactor/account-service-cleanups`)

### Conventional Commits
```
<type>(<scope>): <short summary>
```
*Types*: `feat`, `fix`, `refactor`, `docs`, `style`, `test`, `chore`, `perf`, `build`, `ci`.

## Code Quality Standards
1. **No Hardcoded Secrets**: Ensure all credentials use environment variables.
2. **Formatting & Linting**: Run backend unit tests (`mvn test`) and frontend linter (`npm run build`) before opening a Pull Request.
3. **Documentation**: Update OpenAPI/Swagger documentation or markdown files in `docs/` when modifying API contracts.
