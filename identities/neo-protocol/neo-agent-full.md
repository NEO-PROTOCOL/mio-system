# 🔑 agent: neo-agent-full

## 📋 Metadados

| Campo | Valor |
|-------|-------|
| **Nome** | `neo-agent-full` |
| **Tipo** | agent |
| **Plataforma** | neo-protocol |
| **Função** | Cerebro/LangGraph ReAct |
| **Criada em** | 2026-01-30 |
| **Status** | 🟢 Ativo |

---

## 🔐 Detalhes Técnicos

### Stack
- **Framework:** LangGraph ReAct
- **LLMs:** Gemini 1.5, Claude, ASI1
- **Database:** Kwil DB (decentralized SQL)
- **Identity:** Ceramic Network (DID, immutable logs)
- **Storage:** IPFS (cold storage), GUN.js (P2P sync)
- **Memory:** Soberana (KWil + Ceramic)

### Arquitetura
- **Camada:** 3 - Cérebro (NEØ Protocol)
- **Repo:** https://github.com/neomello/neo-agent-full
- **Local:** `/Users/nettomello/CODIGOS/neo-agent-full/`

### Permissões
- ✅ **Read:** GitHub, Brave Search, Notion (MCP)
- ✅ **Write:** Twitter, Kwil DB, Ceramic Logs, IPFS
- ✅ **Execute:** LangGraph planning, Tool use, Multi-step reasoning

### DID
- **Status:** ⏳ Aguardando criação via Ceramic
- **Namespace:** `did:ceramic:neo-agent-full`

---

## ✅ Verificação

```bash
# Testar agent full
cd /Users/nettomello/CODIGOS/neo-agent-full
pnpm start

# Verificar Kwil connection
pnpm test:kwil

# Verificar Ceramic DID
pnpm test:ceramic
```

---

## 📝 Notas

- Agente principal de raciocínio complexo
- Memória persistente via Kwil + Ceramic
- Identidade soberana (DID)
- Integra com NodeMello para coordenação
