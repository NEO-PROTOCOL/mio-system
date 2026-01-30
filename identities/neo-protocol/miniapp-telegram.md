# 🔑 interface: miniapp-telegram

## 📋 Metadados

| Campo | Valor |
|-------|-------|
| **Nome** | `miniapp-telegram` |
| **Tipo** | interface |
| **Plataforma** | neo-protocol |
| **Função** | Telegram Mini App |
| **Criada em** | 2026-01-30 |
| **Status** | 🟡 Em Desenvolvimento |

---

## 🔐 Detalhes Técnicos

### Stack
- **Frontend:** Vue.js 3.4.0
- **Web3 TON:** @ton/core, TON Connect
- **Web3 EVM:** ethers, Web3Modal
- **State:** Pinia
- **Deploy:** Vercel

### Arquitetura
- **Camada:** 5 - Interação & Apps (NEØ Protocol)
- **Local:** `/Users/nettomello/CODIGOS/GAMES/smart-ui-mobile/`
- **Project:** `/Users/nettomello/CODIGOS/neo-smart-token/` (parent)

### Permissões
- ✅ **Read:** Token balances, Jetton metadata
- ✅ **Write:** Create tokens (Factory UI), Telegram Cloud Storage
- ✅ **Execute:** Deploy Jettons (TON), Deploy ERC20 (Base/Polygon)

### Funcionalidades
- Token Factory UI (step-by-step wizard)
- Jetton deployment (TON)
- ERC20 deployment (Base, Polygon)
- Share certificate generator
- Cloud storage (drafts)

---

## ✅ Verificação

```bash
# Dev mode
cd /Users/nettomello/CODIGOS/GAMES/smart-ui-mobile
pnpm dev

# Build
pnpm build

# Deploy
vercel deploy --prod
```

---

## 📝 Notas

- Integra com Smart Factory
- Multi-chain (TON + EVM)
- Overlap com ceo-escalavel-miniapp (requer merge)
- Auditoria completa em AUDIT_MINIAPPS.md
