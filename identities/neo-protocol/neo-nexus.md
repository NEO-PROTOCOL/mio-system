<!-- markdownlint-disable MD003 MD007 MD011 MD013 MD022 MD023 MD025 MD029 MD032 MD033 MD034 -->

```text
========================================
   NΞØ PROTOCOL · NEO NEXUS HUB
========================================
```

Event Hub e Webhook Dispatcher central para coordenação universal de webhooks e eventos.

> **Version:** v1.0.0
> **Status:** 🟢 Ativo
> **Engine:** Node.js + Hono

────────────────────────────────────────

## 🎯 What is NEO Nexus?

O nó de infraestrutura responsável pela distribuição universal de webhooks e execução de regras de reação (Reactors).

```text
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃ CORE CAPABILITIES
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃
┃ 🛰️ Event Hub
┃    └─ Universal webhook collection
┃
┃ ⚡ Reactor Engine
┃    └─ Filtering & Dispatching rules
┃
┃ 🛡️ Auth Proxy
┃    └─ mio-system signature validation
┃
┃ 🐋 Edge Ready
┃    └─ Railway Docker deployment
┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

────────────────────────────────────────

## 📂 Architecture

- **Repo:** https://github.com/NEO-PROTOCOL/neo-nexus.git
- **Local:** `/Users/nettomello/neomello/NEO-PROTOCOL/neo-nexus/`
- **URL:** https://nexus.neoprotocol.space

────────────────────────────────────────

## ✅ Verificação

```bash
# Health Check
curl https://nexus.neoprotocol.space/health

# Trigger Test Event
curl -X POST https://nexus.neoprotocol.space/api/events \
  -H "Content-Type: application/json" \
  -d '{"type": "TEST_EVENT"}'
```

────────────────────────────────────────

▓▓▓ NΞØ MELLØ
────────────────────────────────────────
Core Architect · NΞØ Protocol
neo@neoprotocol.space

"Code is law. Expand until
silence becomes structure."
────────────────────────────────────────
```
 █████ █         
██╔═══██╗       
██║ █ ██║  
██ █  ██║      
╚██████╔╝   
█ ╚═══╝     

```
