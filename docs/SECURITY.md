# Security Best Practices

This document outlines the security measures implemented in the MIO System API.

## 🔒 Security Features

### 1. HTTP Security Headers (Helmet.js)
- **Content Security Policy**: Restricts resource loading
- **HSTS**: Enforces HTTPS connections
- **X-Frame-Options**: Prevents clickjacking
- **X-Content-Type-Options**: Prevents MIME sniffing

### 2. Rate Limiting
- **General endpoints**: 100 requests per 15 minutes per IP
- **Webhook endpoints**: 10 requests per minute per IP
- Prevents DoS attacks and API abuse

### 3. Input Validation
- All webhook events validated using `express-validator`
- Event name length limited to 100 characters
- Type checking for all request parameters
- Payload size limited to 10MB

### 4. Webhook Signature Verification
- Optional HMAC-SHA256 signature verification
- Set `WEBHOOK_SECRET` environment variable to enable
- Prevents unauthorized webhook submissions

### 5. Log Injection Prevention
- User input sanitized before logging
- Control characters (\\r, \\n, \\t) removed
- Prevents log poisoning attacks

### 6. Error Handling
- Stack traces hidden in production
- Generic error messages for users
- Detailed errors logged server-side only

### 7. CORS Configuration
- Cross-Origin Resource Sharing enabled
- Can be restricted to specific origins if needed

### 8. Response Compression
- Gzip compression enabled
- Reduces bandwidth and improves performance

## 🔐 Environment Variables

### Required
- `NODE_ENV`: Set to `production` in production

### Recommended
- `WEBHOOK_SECRET`: Secret for webhook signature verification
- `PORT`: Custom port (default: 8080)
- `LOG_LEVEL`: Logging level (default: info)

### Secrets Management
Never commit secrets to version control:
- Use `.env` files (gitignored)
- Use environment variables in deployment platforms
- Use secret management services (AWS Secrets Manager, etc.)

## 🚨 Security Checklist

- [x] Security headers configured
- [x] Rate limiting implemented
- [x] Input validation on all endpoints
- [x] Webhook signature verification supported
- [x] Log injection prevention
- [x] Error handling without information leakage
- [x] Dependencies scanned for vulnerabilities
- [x] Secrets excluded from version control
- [x] HTTPS enforced (via HSTS header)
- [x] Non-root user in Docker container

## 📋 Dependency Vulnerabilities

Run `npm audit` regularly to check for dependency vulnerabilities:

```bash
npm audit
npm audit fix  # Automatically fix vulnerabilities
```

## 🔄 Security Updates

- Keep Node.js updated to latest LTS version
- Regularly update npm dependencies
- Monitor security advisories for used packages
- Run automated security scans in CI/CD

## 📞 Reporting Security Issues

If you discover a security vulnerability, please email:
**neo@neoprotocol.space**

Do not create public GitHub issues for security vulnerabilities.
