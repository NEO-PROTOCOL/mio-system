# 🔑 agent: neobot

## 📋 Metadados

| Campo | Valor |
|-------|-------|
| **Nome** | `neobot` |
| **Tipo** | agent |
| **Plataforma** | neo-protocol |
| **Função** | Toolkit/Operations |
| **Criada em** | 2026-01-30 |
| **Status** | 🟢 Ativo |

---

## 🔐 Detalhes Técnicos

### Stack
- **Language:** TypeScript (Node.js)
- **Skills:** 70+ modular skills
- **MCP:** Server completo (Notion, Brave, GitHub)
- **Messaging:** Telegram Bot, WhatsApp (Baileys nativo)
- **CLI:** moltbot commands

### Arquitetura
- **Camada:** 2 - Toolkit (NEØ Protocol)
- **Repo:** https://github.com/neomello/neobot
- **Local:** `/Users/nettomello/CODIGOS/neobot/`

### Permissões
- ✅ **Read:** File system, Notion (MCP), GitHub
- ✅ **Write:** Telegram, WhatsApp (Baileys), Ledger, Health logs
- ✅ **Execute:** Skills (factory, flowpay, notion, telegram)

### Skills Principais
- `smart-factory/` - Deploy, mint, bridge tokens
- `flowpay/` - PIX payment gateway
- `telegram/` - Bot com comandos
- `notion/` - Work logs, projects, tasks

---

## ✅ Verificação

```bash
# Iniciar Neobot
cd /Users/nettomello/CODIGOS/neobot
pnpm moltbot --help

# Testar Telegram Bot
pnpm moltbot telegram start

# Testar WhatsApp
pnpm moltbot channels login --channel whatsapp
```

---

## 📝 Notas

- Toolkit operacional completo
- 11/14 skills implementadas (79%)
- Telegram Bot funcional
- WhatsApp aguardando ativação
