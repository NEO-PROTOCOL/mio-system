# 🔑 interface: neo-agent-dashboard

## 📋 Metadados

| Campo | Valor |
|-------|-------|
| **Nome** | `neo-agent-dashboard` |
| **Tipo** | interface |
| **Plataforma** | neo-protocol |
| **Função** | Agent Monitoring |
| **Criada em** | 2026-01-30 |
| **Status** | 🟢 Ativo |

---

## 🔐 Detalhes Técnicos

### Stack
- **Framework:** Next.js 15
- **State:** Real-time WebSocket
- **Sync:** GUN.js (P2P multi-device)
- **UI:** React 19, Tailwind

### Arquitetura
- **Camada:** 5 - Interação & Apps (NEØ Protocol)
- **Repo:** https://github.com/NEO-PROTOCOL/neo-agent-dashboard
- **Local:** `/Users/nettomello/CODIGOS/neo-agent-dashboard/`

### Permissões
- ✅ **Read:** Agent logs, Memory state, LangGraph traces
- ✅ **Write:** Agent config, Prompts, Tool policies
- ✅ **Execute:** Manual agent triggers, Debug mode

### Funcionalidades
- Real-time agent monitoring
- LangGraph execution traces
- Memory inspection (Kwil DB)
- Tool call logs
- Performance metrics
- Multi-device sync (GUN.js)

---

## ✅ Verificação

```bash
# Dev mode
cd /Users/nettomello/CODIGOS/neo-agent-dashboard
pnpm dev

# Connect to agent
# URL: http://localhost:3000
# Agent: neo-agent-full
```

---

## 📝 Notas

- Dashboard para neo-agent-full
- Real-time monitoring
- PWA (instalável)
- Suporta múltiplos dispositivos (sync via GUN.js)
