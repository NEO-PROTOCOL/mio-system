/**
 * Home Routes
 * Default landing page and documentation
 */

const express = require('express');
const router = express.Router();

/**
 * GET /
 * Landing page with API documentation
 */
router.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MIO System API</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            line-height: 1.6;
            color: #333;
        }
        h1 { color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px; }
        h2 { color: #34495e; margin-top: 30px; }
        a { color: #3498db; text-decoration: none; }
        a:hover { text-decoration: underline; }
        .endpoint { 
            background: #f8f9fa; 
            padding: 15px; 
            border-left: 4px solid #3498db; 
            margin: 10px 0;
            border-radius: 4px;
        }
        .method { 
            display: inline-block;
            padding: 2px 8px;
            border-radius: 3px;
            font-weight: bold;
            font-size: 12px;
            margin-right: 8px;
        }
        .get { background: #28a745; color: white; }
        .post { background: #007bff; color: white; }
        code { 
            background: #e9ecef; 
            padding: 2px 6px; 
            border-radius: 3px;
            font-family: 'Courier New', monospace;
        }
        footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #dee2e6;
            text-align: center;
            color: #6c757d;
        }
    </style>
</head>
<body>
    <h1>🚀 MIO System API</h1>
    <p>Operational Identity & Configuration Layer for NEO Protocol.</p>
    
    <h2>📡 Available Endpoints</h2>
    
    <div class="endpoint">
        <span class="method get">GET</span>
        <a href="/health"><code>/health</code></a>
        <p>Health check endpoint for monitoring. Returns service status and uptime.</p>
    </div>
    
    <div class="endpoint">
        <span class="method get">GET</span>
        <a href="/api/v1/ecosystem"><code>/api/v1/ecosystem</code></a>
        <p>Returns the complete service registry with all registered nodes and their configurations.</p>
    </div>
    
    <div class="endpoint">
        <span class="method get">GET</span>
        <a href="/api/v1/identities"><code>/api/v1/identities</code></a>
        <p>Returns identity registry information and available endpoints.</p>
    </div>
    
    <div class="endpoint">
        <span class="method post">POST</span>
        <code>/api/v1/ecosystem/reload</code>
        <p>Force reload of ecosystem configuration. Useful for manual cache invalidation.</p>
    </div>
    
    <div class="endpoint">
        <span class="method post">POST</span>
        <code>/api/webhook/nexus</code>
        <p>Webhook endpoint for receiving events from Nexus and other services.</p>
    </div>
    
    <h2>🔐 Security</h2>
    <ul>
        <li>Rate limiting enabled (100 requests per 15 minutes)</li>
        <li>Security headers configured (Helmet.js)</li>
        <li>Input validation on all endpoints</li>
        <li>Webhook signature verification supported</li>
    </ul>
    
    <h2>📚 Documentation</h2>
    <ul>
        <li><a href="https://github.com/NEO-PROTOCOL/mio-system">GitHub Repository</a></li>
        <li>Identity Registry: <code>/identities</code> directory</li>
        <li>Ecosystem Config: <code>/ecosystem.json</code></li>
    </ul>
    
    <footer>
        <p>MIO System API v1.0.0 | NEO Protocol</p>
        <p>👤 <strong>NΞØ MELLØ</strong> | neo@neoprotocol.space</p>
    </footer>
</body>
</html>
  `);
});

module.exports = router;
