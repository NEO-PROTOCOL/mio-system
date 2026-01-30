# 🔑 platform: nodemello

## 📋 Metadados

| Campo | Valor |
|-------|-------|
| **Nome** | `nodemello` |
| **Tipo** | platform |
| **Plataforma** | neo-protocol |
| **Função** | Orchestrator/Content |
| **Criada em** | 2026-01-30 |
| **Status** | 🟡 Em Desenvolvimento |

---

## 🔐 Detalhes Técnicos

### Stack
- **Framework:** Next.js 15
- **Backend:** Payload CMS (headless)
- **Auth:** NextAuth.js
- **Database:** MongoDB
- **Deploy:** Vercel

### Arquitetura
- **Camada:** 1 - Platform (NEØ Protocol)
- **Repo:** https://github.com/neomello/neoflowoff-nodemello.run
- **URL:** https://nodemello.run

### Permissões
- ✅ **Read:** Content, Posts, Media
- ✅ **Write:** Publish content, Schedule posts
- ✅ **Execute:** Workflow automation, Social media posting

### Integrações
- Twitter API (automated posting)
- Notion (content source)
- neo-agent-full (content generation)

---

## ✅ Verificação

```bash
# Testar localmente
cd /Users/nettomello/CODIGOS/neoflowoff-nodemello.run
pnpm dev

# Deploy
vercel deploy --prod
```

---

## 📝 Notas

- Plataforma de conteúdo e coordenação
- Integra agentes para geração de conteúdo
- Automatização de posts sociais
