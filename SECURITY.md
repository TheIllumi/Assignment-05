# Security Policy

## Supported Versions

We provide security updates for the latest release branch of the **Expense Management System**:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

---

## Reporting a Vulnerability

We take the security of the Expense Management System seriously. If you discover a security vulnerability, please **do not** open a public issue on GitHub.

Instead, please report security concerns directly via email:

- **Email**: `security@sedmugen.dev` or via GitHub Private Vulnerability Reporting.
- **Response Window**: You will receive an initial acknowledgment within 48 hours.
- **Disclosure Policy**: We request that you give us reasonable time to address and patch the issue before public disclosure.

---

## Security Best Practices in Implementation

1. **Secrets Management**: Never commit database passwords, JWT signing keys, or private API credentials to source control. Always use environment variable overrides defined in `.env.example`.
2. **Stateless JWT Tokens**: Standard JWT expiration is configured for 24 hours. Keep signing secrets at least 256 bits (32 characters) long using HMAC SHA-256.
3. **Transport Security**: Deploy production instances behind an HTTPS reverse proxy (e.g., Nginx, Traefik, or AWS ALB) with TLS 1.3 enabled.
