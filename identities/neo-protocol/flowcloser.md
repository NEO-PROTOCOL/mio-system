# 🔑 connector: flowcloser

## 📋 Metadados

| Campo | Valor |
|-------|-------|
| **Nome** | `flowcloser` |
| **Tipo** | connector |
| **Plataforma** | neo-protocol |
| **Função** | External Services Bridge |
| **Criada em** | 2026-01-30 |
| **Status** | 🟢 Ativo (Railway) |

---

## 🔐 Detalhes Técnicos

### Stack
- **Base:** Evolution API (Baileys)
- **Deploy:** Railway
- **Messaging:** WhatsApp (para serviços externos)

### Arquitetura
- **Camada:** 4 - Conectores (NEØ Protocol)
- **Deploy:** Railway
- **URL:** flowcloser-agent-production.up.railway.app
- **Local:** TBD (audit pendente)

### Permissões
- ✅ **Read:** WhatsApp messages (external services)
- ✅ **Write:** Send messages, Media, Status
- ✅ **Execute:** Webhook forwarding, External API calls

### Integração
- Neo-agent-full (external requests)
- FlowPay (transaction notifications)
- Chatwoot/Typebot (chatbot platforms)

---

## ✅ Verificação

```bash
# Check Railway status
railway status

# Test webhook
curl https://flowcloser-agent-production.up.railway.app/health
```

---

## 📝 Notas

- Bridge para serviços externos
- Separado do Neobot (Baileys nativo)
- Neobot: WhatsApp pessoal
- FlowCloser: WhatsApp para serviços/clientes
