# 🔑 connector: flowpay

## 📋 Metadados

| Campo | Valor |
|-------|-------|
| **Nome** | `flowpay` |
| **Tipo** | connector |
| **Plataforma** | neo-protocol |
| **Função** | Payment Gateway PIX |
| **Criada em** | 2026-01-30 |
| **Status** | 🟢 Em Produção (90%) |

---

## 🔐 Detalhes Técnicos

### Stack
- **Framework:** Astro 5.16.6
- **Payment:** Woovi/OpenPix (PIX API)
- **Web3:** Web3Auth Modal, QuickNode (Base L2)
- **Deploy:** Netlify Functions

### Arquitetura
- **Camada:** Valor & Token (NEØ Protocol)
- **Repo:** https://github.com/neomello/flowpay
- **Local:** `/Users/nettomello/CODIGOS/flowpay/`
- **URL:** https://flowpaypix.netlify.app

### Permissões
- ✅ **Read:** PIX transactions, Wallet balances
- ✅ **Write:** Create PIX charges, Mint tokens
- ✅ **Execute:** PIX → $NEOFLW conversion, Webhook handlers

### Funcionalidades
- PIX Integration (100%)
- Crypto Integration (80% - aguarda Smart Factory)
- Dual Mode (PIX simples + Crypto avançado)
- Admin Panel (100%)
- PWA iOS-like (100%)
- Telegram notifications (100%)

---

## ✅ Verificação

```bash
# Test FlowPay
curl https://flowpaypix.netlify.app/health

# Neobot integration
pnpm moltbot flowpay status --recent
pnpm moltbot flowpay buy --amount 100 --token NEOFLW
```

---

## 📝 Notas

- Gateway de pagamento PIX → Crypto
- v2.2.0 em produção
- 208 arquivos, 19 Netlify Functions
- Aguarda integração com Smart Factory
- Auditoria completa em AUDIT_FLOWPAY.md
