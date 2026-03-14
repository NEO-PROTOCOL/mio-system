# Migration Guide - Legacy to New Server

This guide helps you migrate from the legacy `src/server.js` to the new improved `src/server.new.js`.

## 🎯 Overview

The new server (`src/server.new.js`) provides:
- ✅ Enhanced security (Helmet, rate limiting, input validation)
- ✅ Better performance (caching, compression, file watching)
- ✅ Modular architecture (separated concerns)
- ✅ Comprehensive error handling
- ✅ Production-ready logging
- ✅ 70%+ test coverage

## 📋 Pre-Migration Checklist

Before migrating, ensure:
- [ ] All tests pass: `npm test`
- [ ] Linting passes: `npm run lint`
- [ ] You have a backup of current deployment
- [ ] You understand the new environment variables

## 🔄 Migration Steps

### Step 1: Test the New Server Locally

```bash
# Install dependencies (if not already done)
npm install

# Run tests to ensure everything works
npm test

# Start the new server in development mode
npm run dev

# Test the endpoints
curl http://localhost:8080/health
curl http://localhost:8080/api/v1/ecosystem
```

### Step 2: Update Environment Variables

The new server supports additional optional environment variables:

```bash
# Required (with defaults)
NODE_ENV=production          # production, development, or test

# Optional
PORT=8080                     # Default: 8080
WEBHOOK_SECRET=your_secret   # For webhook signature verification
LOG_LEVEL=info               # Logging verbosity
```

**Add to your deployment platform:**
- Railway: Settings → Environment → Add variables
- Docker: Add to docker-compose.yml or .env file
- Heroku: Settings → Config Vars

### Step 3: Update package.json Main Entry

**Current:**
```json
"main": "src/server.js"
```

**New:**
```json
"main": "src/server.new.js"
```

Or keep both and use scripts:
```json
"scripts": {
  "start": "node src/server.new.js",
  "start:old": "node src/server.js"
}
```

### Step 4: Update Deployment Configuration

#### Railway
No changes needed - uses npm start script

#### Docker
Update CMD in Dockerfile:
```dockerfile
CMD ["node", "src/server.new.js"]
```

#### PM2
Update ecosystem.config.js:
```javascript
module.exports = {
  apps: [{
    name: 'mio-system-api',
    script: 'src/server.new.js',
    env: {
      NODE_ENV: 'production'
    }
  }]
}
```

### Step 5: Deploy to Staging

1. Deploy to staging environment first
2. Run smoke tests:
   ```bash
   # Health check
   curl https://staging.your-domain.com/health
   
   # Ecosystem endpoint
   curl https://staging.your-domain.com/api/v1/ecosystem
   
   # Test webhook (should return 400 - validation working)
   curl -X POST https://staging.your-domain.com/api/webhook/nexus \
     -H "Content-Type: application/json" \
     -d '{}'
   ```

3. Monitor logs for any errors
4. Check response times and performance

### Step 6: Deploy to Production

Once staging is validated:

1. **Backup current production** (if possible)
2. **Deploy new server**
3. **Monitor immediately** for:
   - Error rates
   - Response times
   - Memory usage
   - CPU usage
4. **Verify all endpoints**:
   - `/health` - should return status UP
   - `/api/v1/ecosystem` - should return nodes
   - `/api/v1/identities` - should return identity info
   - Webhook endpoint - should validate input

### Step 7: Rollback Plan (If Needed)

If issues occur:

**Quick rollback:**
```bash
# Update package.json
"main": "src/server.js"

# Redeploy
npm start
```

Or use the old server script:
```bash
npm run start:old
```

## 🔍 Validation Checklist

After migration, verify:

- [ ] Server starts without errors
- [ ] Health endpoint returns 200
- [ ] Ecosystem endpoint returns data
- [ ] Security headers are present (check browser DevTools)
- [ ] Rate limiting works (test with multiple requests)
- [ ] Webhook validation works (test with invalid payload)
- [ ] Logs are being generated
- [ ] Performance is good (response times < 100ms)
- [ ] No memory leaks (monitor for 24 hours)

## 📊 Key Differences

### Request/Response
| Feature | Old Server | New Server |
|---------|-----------|-----------|
| Security Headers | ❌ None | ✅ Helmet (CSP, HSTS, etc.) |
| Rate Limiting | ❌ None | ✅ 100 req/15min |
| Input Validation | ❌ Basic | ✅ express-validator |
| Compression | ❌ None | ✅ Gzip |
| Caching | ❌ None | ✅ Smart caching |
| Error Handling | ❌ Basic | ✅ Comprehensive |

### API Endpoints
All existing endpoints work the same, plus:
- **NEW**: `POST /api/v1/ecosystem/reload` - Manual cache reload
- **IMPROVED**: `/health` - Now includes uptime

### Configuration Loading
- **Old**: Reads ecosystem.json on every request
- **New**: Cached in memory, auto-reloads on file change

## ⚠️ Known Issues & Limitations

1. **File Watching**: 
   - Uses Node.js fs.watch which may not work on all file systems
   - Falls back to manual reload endpoint if needed

2. **Webhook Signature**:
   - Optional feature, requires WEBHOOK_SECRET to be set
   - If not set, webhook still works without verification

3. **Test Environment**:
   - File watching disabled in test mode
   - Some features behave differently in test vs production

## 🆘 Troubleshooting

### Server won't start
```bash
# Check Node version
node --version  # Should be >= 18.0.0

# Check for port conflicts
lsof -i :8080

# Check logs
npm start 2>&1 | tee server.log
```

### Ecosystem not loading
```bash
# Verify file exists
ls -la ecosystem.json

# Check file permissions
chmod 644 ecosystem.json

# Manual reload
curl -X POST http://localhost:8080/api/v1/ecosystem/reload
```

### Rate limiting too aggressive
```bash
# Adjust in src/middleware/security.js
# Change windowMs and max values
```

## 📞 Support

If you encounter issues:
1. Check logs: `npm start` output
2. Check GitHub issues: https://github.com/NEO-PROTOCOL/mio-system/issues
3. Email: neo@neoprotocol.space

## 📚 Additional Resources

- [Architecture Documentation](./ARCHITECTURE.md)
- [Security Best Practices](./SECURITY.md)
- [Audit Summary](./AUDIT_SUMMARY.md)
- [API Specification](./api-spec.yaml)

## ✅ Post-Migration

After successful migration:

1. **Remove old server** (optional):
   ```bash
   mv src/server.js src/server.old.js
   mv src/server.new.js src/server.js
   ```

2. **Update documentation**:
   - Update README with new features
   - Update deployment docs

3. **Enable CI/CD**:
   - Ensure `.github/workflows/ci-test.yml` is active
   - Tests will run on every PR

4. **Monitor for 1 week**:
   - Watch for any unexpected behavior
   - Monitor performance metrics
   - Collect user feedback

## 🎉 Success!

Your MIO System API is now running with:
- 🔒 Enterprise-grade security
- 🚀 Improved performance
- 🧪 Comprehensive test coverage
- 📚 Complete documentation
- 🏗️ Maintainable architecture

Thank you for migrating to the improved server!
