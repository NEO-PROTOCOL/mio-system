# Architecture Overview

## 📐 System Architecture

The MIO System API follows a modular, layered architecture designed for maintainability, security, and scalability.

```
┌─────────────────────────────────────────────────────────────┐
│                      Client Applications                     │
│         (Neobot Orchestrator, Services, Webhooks)           │
└─────────────────────────────┬───────────────────────────────┘
                              │
                              │ HTTP/HTTPS
                              │
┌─────────────────────────────▼───────────────────────────────┐
│                    Security Middleware                       │
│  ├── Helmet (Security Headers)                              │
│  ├── Rate Limiting                                           │
│  ├── CORS                                                    │
│  └── Compression                                             │
└─────────────────────────────┬───────────────────────────────┘
                              │
┌─────────────────────────────▼───────────────────────────────┐
│                    Routing Layer                             │
│  ├── Health Routes        (/health)                         │
│  ├── Home Routes          (/)                               │
│  ├── API Routes           (/api/v1/*)                       │
│  └── Webhook Routes       (/api/webhook/*)                  │
└─────────────────────────────┬───────────────────────────────┘
                              │
┌─────────────────────────────▼───────────────────────────────┐
│                    Business Logic Layer                      │
│  ├── Input Validation (express-validator)                   │
│  ├── Request Processing                                      │
│  └── Response Formatting                                     │
└─────────────────────────────┬───────────────────────────────┘
                              │
┌─────────────────────────────▼───────────────────────────────┐
│                    Data/Config Layer                         │
│  ├── Ecosystem Config Manager (Cached)                      │
│  ├── File System Watcher                                     │
│  └── Identity Registry                                       │
└─────────────────────────────┬───────────────────────────────┘
                              │
┌─────────────────────────────▼───────────────────────────────┐
│                    Error Handling                            │
│  ├── Async Error Handler                                     │
│  ├── 404 Handler                                             │
│  └── Global Error Handler                                    │
└─────────────────────────────────────────────────────────────┘
```

## 🏗️ Directory Structure

```
mio-system/
├── src/
│   ├── config/              # Configuration management
│   │   ├── env.js           # Environment variables
│   │   └── ecosystem.js     # Ecosystem config loader
│   ├── middleware/          # Express middleware
│   │   ├── security.js      # Security middleware
│   │   ├── logging.js       # Request logging
│   │   └── errorHandler.js  # Error handling
│   ├── routes/              # Route handlers
│   │   ├── home.js          # Landing page
│   │   ├── health.js        # Health check
│   │   ├── api.js           # API endpoints
│   │   └── webhook.js       # Webhook endpoints
│   ├── tests/               # Test files
│   │   ├── server.test.js   # Integration tests
│   │   ├── config.test.js   # Config tests
│   │   └── middleware.test.js # Middleware tests
│   ├── server.new.js        # Main application (NEW)
│   └── server.js            # Legacy application (DEPRECATED)
├── docs/                    # Documentation
│   ├── ARCHITECTURE.md      # This file
│   ├── SECURITY.md          # Security documentation
│   └── api-spec.yaml        # OpenAPI specification
├── identities/              # Identity registry
├── scripts/                 # Operational scripts
├── .github/                 # GitHub configuration
│   └── workflows/           # CI/CD workflows
├── ecosystem.json           # Service registry
├── package.json             # NPM configuration
├── jest.config.js           # Test configuration
├── eslint.config.js         # Linting configuration
├── .prettierrc.js           # Formatting configuration
├── Dockerfile               # Container configuration
└── README.md                # Main documentation
```

## 🔄 Request Flow

### 1. Incoming Request
```
Client → Express Server
  ↓
Security Middleware (Helmet, Rate Limit, CORS)
  ↓
Request Logging (Morgan)
  ↓
Body Parser (JSON)
```

### 2. Route Matching
```
Router matches request to handler
  ↓
Route-specific middleware (if any)
  ↓
Input validation (express-validator)
```

### 3. Business Logic
```
Handler function executes
  ↓
Access configuration/data
  ↓
Process request
  ↓
Format response
```

### 4. Response
```
Send JSON response
  ↓
Log response (Morgan)
  ↓
Apply compression (if enabled)
  ↓
Client receives response
```

### 5. Error Handling (if error occurs)
```
Error thrown
  ↓
Async handler catches error
  ↓
Error middleware processes
  ↓
Sanitized error response sent
  ↓
Error logged server-side
```

## 🎯 Design Patterns

### 1. **Modular Architecture**
- Separation of concerns
- Each module has single responsibility
- Easy to test and maintain

### 2. **Middleware Pattern**
- Reusable request processing logic
- Composable functionality
- Order-dependent execution

### 3. **Configuration Management**
- Centralized configuration
- Environment-based settings
- Caching for performance

### 4. **Error Handling**
- Centralized error processing
- Consistent error responses
- Development vs production modes

### 5. **Async/Await**
- Modern async handling
- Async error wrapper
- Clean, readable code

## 📊 Data Flow

### Ecosystem Configuration
```
ecosystem.json (on disk)
  ↓
Initial load on startup
  ↓
Cached in memory
  ↓
File system watcher monitors changes
  ↓
Auto-reload on file change
  ↓
API returns cached data (fast)
  ↓
Manual reload endpoint available
```

### Webhook Processing
```
Webhook event received
  ↓
Rate limiting check
  ↓
Signature verification (if enabled)
  ↓
Input validation
  ↓
Sanitize for logging
  ↓
Accept and acknowledge
  ↓
(Future: Queue for processing)
```

## 🔐 Security Layers

1. **Network Layer**: HTTPS (enforced via HSTS)
2. **Application Layer**: Helmet security headers
3. **Rate Limiting**: DoS protection
4. **Input Validation**: Injection prevention
5. **Authentication**: Webhook signatures
6. **Logging**: Sanitized, no sensitive data

## 🚀 Performance Optimizations

1. **Configuration Caching**
   - Ecosystem config cached in memory
   - Only reloaded when file changes
   - Reduces disk I/O

2. **Response Compression**
   - Gzip compression for responses
   - Reduces bandwidth usage
   - Faster response times

3. **Efficient Logging**
   - Skip health check logs
   - Minimal production logging
   - Async logging (Morgan)

4. **Lazy Loading**
   - Routes loaded on demand
   - Modules loaded as needed

## 🧪 Testing Strategy

### Unit Tests
- Configuration modules
- Middleware functions
- Utility functions

### Integration Tests
- API endpoints
- Request/response flow
- Error handling

### Coverage Goals
- 70% minimum coverage
- Focus on critical paths
- Test edge cases

## 📈 Scalability Considerations

### Current Scale
- Single Node.js process
- Suitable for 100-1000 requests/minute
- Low latency requirements

### Future Scaling Options
1. **Horizontal Scaling**: Multiple instances behind load balancer
2. **Caching Layer**: Redis for distributed cache
3. **Message Queue**: For webhook processing
4. **Microservices**: Split into smaller services

## 🔄 Future Enhancements

### Phase 1 (Current)
- [x] Modular architecture
- [x] Security hardening
- [x] Test coverage
- [x] API documentation

### Phase 2 (Planned)
- [ ] Identity scanning from `/identities` directory
- [ ] Redis caching for distributed systems
- [ ] WebSocket support for real-time updates
- [ ] Metrics and monitoring (Prometheus)

### Phase 3 (Future)
- [ ] Event streaming (Kafka/RabbitMQ)
- [ ] GraphQL API layer
- [ ] Advanced identity verification
- [ ] Multi-region deployment

## 📚 Technology Stack

### Runtime
- **Node.js** 18+ (LTS)
- **Express.js** 4.x - Web framework

### Security
- **Helmet** - Security headers
- **express-rate-limit** - Rate limiting
- **express-validator** - Input validation
- **CORS** - Cross-origin resource sharing

### Development
- **Jest** - Testing framework
- **Supertest** - HTTP testing
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Nodemon** - Development server

### Monitoring
- **Morgan** - HTTP request logging
- Built-in health checks
- Process uptime tracking

## 🎓 Best Practices Applied

1. ✅ **Separation of Concerns**: Each module has clear responsibility
2. ✅ **DRY Principle**: Reusable middleware and utilities
3. ✅ **Security First**: Multiple security layers
4. ✅ **Error Handling**: Centralized, consistent error responses
5. ✅ **Testing**: Comprehensive test coverage
6. ✅ **Documentation**: Code comments, API docs, architecture docs
7. ✅ **Code Quality**: Linting, formatting, code reviews
8. ✅ **Performance**: Caching, compression, efficient algorithms
