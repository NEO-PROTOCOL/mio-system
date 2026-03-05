const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Load Ecosystem Config
// ⚠️  SOURCE OF TRUTH: neobot-orchestrator/config/ecosystem.json
// This file is a COPY — do NOT edit here directly.
// To update: copy from NEO-PROTOCOL/neobot-orchestrator/config/ecosystem.json
const ecosystemPath = path.join(__dirname, '..', 'ecosystem.json');
let ecosystemConfig = {};

function loadEcosystem() {
    try {
        if (fs.existsSync(ecosystemPath)) {
            const data = fs.readFileSync(ecosystemPath, 'utf8');
            ecosystemConfig = JSON.parse(data);
            console.log('✅ Ecosystem configuration loaded.');
        } else {
            console.error('⚠️ Ecosystem file not found:', ecosystemPath);
        }
    } catch (error) {
        console.error('❌ Error loading ecosystem:', error);
    }
}

// Initial load
loadEcosystem();

// Health Check for Railway/Orchestrator
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'UP',
        service: 'mio-system-api',
        timestamp: new Date().toISOString()
    });
});

// Serve Identity & Ecosystem Info
app.get('/api/v1/ecosystem', (req, res) => {
    loadEcosystem(); // Reload to pick up changes
    res.json({
        updatedAt: new Date().toISOString(),
        nodes: ecosystemConfig
    });
});

app.get('/api/v1/identities', (req, res) => {
    // In future, this could load from the identities/ directory
    // For now, we return a placeholder or specific identity info
    res.json({
        message: "Identity Registry is active. See /api/v1/ecosystem for node mappings.",
        registryPath: "identities/"
    });
});

// Nexus-compatible webhook endpoint
app.post('/api/webhook/nexus', (req, res) => {
    const { event, payload } = req.body || {};

    if (!event || typeof event !== 'string') {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'Missing or invalid "event" field'
        });
    }

    // Do not include user-controlled fields in logs to avoid log injection findings.
    console.log('[MIO] Webhook received');

    res.status(200).json({
        status: 'accepted',
        event,
        receivedAt: new Date().toISOString(),
        payload: payload || {}
    });
});

// Default Route
app.get('/', (req, res) => {
    res.send(`
        <h1>MIO System API</h1>
        <p>Operational Identity & Configuration Layer for NEO Protocol.</p>
        <ul>
            <li><a href="/health">/health</a></li>
            <li><a href="/api/v1/ecosystem">/api/v1/ecosystem</a></li>
        </ul>
    `);
});

app.listen(PORT, () => {
    console.log(`🚀 MIO System API running on port ${PORT}`);
});
