# 🚀 Quick Start Guide

## Installation

```bash
# Clone the repository
git clone https://github.com/NEO-PROTOCOL/mio-system.git
cd mio-system

# Install dependencies
npm install

# Run tests
npm test

# Start development server
npm run dev

# Start production server
npm start
```

## Environment Variables

Create a `.env` file (optional - defaults are provided):

```bash
# Server Configuration
NODE_ENV=production          # Environment: development, production, test
PORT=8080                    # Server port (default: 8080)

# Security (Optional)
WEBHOOK_SECRET=your_secret   # Enable webhook signature verification
LOG_LEVEL=info              # Logging level: debug, info, warn, error
```

## API Endpoints

### Health Check
```bash
GET /health
```
Returns server status and uptime.

### Ecosystem Configuration
```bash
GET /api/v1/ecosystem
```
Returns the complete service registry.

```bash
POST /api/v1/ecosystem/reload
```
Force reload of ecosystem configuration.

### Identity Registry
```bash
GET /api/v1/identities
```
Returns identity registry information.

### Webhook Events
```bash
POST /api/webhook/nexus
Content-Type: application/json

{
  "event": "event.type",
  "payload": { ... }
}
```
Receives webhook events with optional signature verification.

## Development

### Running Tests
```bash
npm test              # Run all tests with coverage
npm run test:watch    # Run tests in watch mode
```

### Code Quality
```bash
npm run lint          # Check code quality
npm run lint:fix      # Fix linting issues
npm run format        # Format code with Prettier
npm run format:check  # Check code formatting
```

## Docker Support

```bash
# Build image
docker build -t mio-system-api .

# Run container
docker run -p 8080:8080 -e NODE_ENV=production mio-system-api
```

## Architecture

The application follows a modular architecture:

```
src/
├── config/           # Configuration management
│   ├── env.js        # Environment variables
│   └── ecosystem.js  # Ecosystem configuration
├── middleware/       # Express middleware
│   ├── security.js   # Security (Helmet, rate limiting)
│   ├── logging.js    # Request logging
│   └── errorHandler.js # Error handling
├── routes/          # API route handlers
│   ├── health.js    # Health check
│   ├── home.js      # Landing page
│   ├── api.js       # API endpoints
│   └── webhook.js   # Webhook endpoints
├── tests/           # Test suites
└── server.new.js    # Main application
```

## Security Features

- ✅ **Helmet.js**: Security headers (CSP, HSTS, XSS protection)
- ✅ **Rate Limiting**: 100 requests per 15 minutes (general), 10 per minute (webhooks)
- ✅ **Input Validation**: All endpoints validated with express-validator
- ✅ **Webhook Signatures**: Optional HMAC-SHA256 verification
- ✅ **Log Injection Prevention**: User input sanitized
- ✅ **Error Sanitization**: Stack traces hidden in production
- ✅ **CORS**: Cross-origin resource sharing enabled

## Performance Features

- ✅ **Smart Caching**: Configuration cached in memory
- ✅ **File Watching**: Auto-reload on config changes
- ✅ **Response Compression**: Gzip compression for all responses
- ✅ **Async Error Handling**: Proper async/await error catching
- ✅ **Graceful Shutdown**: SIGTERM/SIGINT handling

## Documentation

- [Architecture Overview](./docs/ARCHITECTURE.md) - Complete system architecture
- [Security Best Practices](./docs/SECURITY.md) - Security policies and guidelines
- [Migration Guide](./docs/MIGRATION.md) - Upgrading from legacy server
- [Audit Summary](./docs/AUDIT_SUMMARY.md) - Complete audit results
- [API Specification](./docs/api-spec.yaml) - OpenAPI specification

## Testing

Test coverage: **70.76%** (20 tests)

- Integration tests for all API endpoints
- Unit tests for configuration and middleware
- Security tests for headers and rate limiting
- Error handling tests

## CI/CD

GitHub Actions workflow runs on every push/PR:
- Linting with ESLint
- Code formatting check with Prettier
- Comprehensive test suite with coverage

## Migration from Legacy Server

See [Migration Guide](./docs/MIGRATION.md) for detailed instructions on upgrading from `src/server.js` to the new `src/server.new.js`.

## Contributing

1. Run tests: `npm test`
2. Check linting: `npm run lint`
3. Format code: `npm run format`
4. Ensure all checks pass before committing

## License & Authorship

- **Architecture:** NΞØ MELLØ
- **IP:** All architecture designs and code are protected IP of NΞØ MELLØ
- **Contact:** neo@neoprotocol.space

## Support

For issues or questions:
- GitHub Issues: https://github.com/NEO-PROTOCOL/mio-system/issues
- Email: neo@neoprotocol.space

---

**Version:** v2.0.0-openclaw  
**Status:** 🟢 Production Ready  
**Test Coverage:** 70.76%  
**Security Score:** 10/10
