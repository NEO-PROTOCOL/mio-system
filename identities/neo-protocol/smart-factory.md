# 🔑 platform: smart-factory

## 📋 Metadados

| Campo | Valor |
|-------|-------|
| **Nome** | `smart-factory` |
| **Tipo** | platform |
| **Plataforma** | neo-protocol |
| **Função** | Tokenization/Multi-chain |
| **Criada em** | 2026-01-30 |
| **Status** | 🟡 Em Análise (v0.5.3) |

---

## 🔐 Detalhes Técnicos

### Stack
- **Contracts:** Solidity (EVM), Tact (TON)
- **Framework:** Hardhat, OpenZeppelin
- **Networks:** Base L2, Polygon, TON
- **Token:** $NEOFLW (ERC20Permit + TEP-74 Jetton)

### Arquitetura
- **Camada:** Valor & Token (NEØ Protocol)
- **Repos:**
  - https://github.com/neo-smart-token-factory/smart-core
  - https://github.com/neo-smart-token-factory/docs
  - https://github.com/neo-smart-token-factory/smart-ui
  - https://github.com/neo-smart-token-factory/smart-cli
  - https://github.com/neo-smart-token-factory/smart-ui-landing
- **Local:** `/Users/nettomello/CODIGOS/neo-smart-token/`

### Permissões
- ✅ **Read:** Blockchain state, Token balances
- ✅ **Write:** Deploy contracts, Mint tokens, Bridge assets
- ✅ **Execute:** Multi-chain operations, Circuit Breaker

### Security
- OpenZeppelin Contracts
- Circuit Breaker pattern
- Multi-sig required for critical ops
- Audited (internal)

---

## ✅ Verificação

```bash
# Deploy em Base L2
cd /Users/nettomello/CODIGOS/neo-smart-token/smart-core
pnpm moltbot factory deploy --network base --verify

# Mint tokens
pnpm moltbot factory mint --amount 1000000 --to 0x...

# Check status
pnpm moltbot factory status --network all
```

---

## 📝 Notas

- Fábrica de tokens multi-chain
- $NEOFLW: Token nativo do ecossistema
- Aguarda launch oficial
- Integrado com FlowPay (gateway PIX)
