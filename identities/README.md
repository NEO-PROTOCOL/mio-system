# 🔐 Sistema de Identidades Operacionais (MIO)

## 📋 Visão Geral

Este diretório centraliza todas as identidades e credenciais usadas por agentes, automações e plataformas de deploy.

**Princípio:** Cada agente/plataforma tem identidade própria, rastreável e documentada.

---

## 🗂️ Estrutura

```
infra/identities/
├── github/
│   ├── deploy-keys/          # Chaves SSH para deploy
│   └── personal-tokens/       # PATs (Personal Access Tokens)
├── vercel/                   # Tokens Vercel
├── railway/                  # Tokens Railway
└── agents/
    ├── cursor/               # Configurações do Cursor AI
    ├── mcp/                  # Model Context Protocol agents
    └── langchain-bots/       # Bots LangChain customizados
```

---

## 📝 Convenções de Nomenclatura

### Chaves SSH
- Formato: `{plataforma}-{funcao}_{tipo}.{pub|key}`
- Exemplo: `github-deploy_id_ed25519.pub`

### Tokens
- Formato: `{plataforma}-{funcao}-token.env`
- Exemplo: `vercel-ci-token.env`

### Documentação
- Formato: `{agente}-{plataforma}.md`
- Exemplo: `cursor-github.md`

---

## 🔒 Segurança

- **NUNCA** commite chaves privadas ou tokens
- Use `.gitignore` para proteger arquivos sensíveis
- Documente apenas metadados (não valores reais)
- Use variáveis de ambiente para valores sensíveis

---

## 📊 Catálogo de Identidades

Verifique os arquivos `.md` em cada subdiretório para ver identidades registradas.

---

## 🚀 Quick Start

1. **Registrar nova identidade:**
   ```bash
   ./scripts/register-identity.sh {tipo} {nome} {plataforma}
   ```

2. **Listar identidades:**
   ```bash
   ./scripts/list-identities.sh
   ```

3. **Validar acesso:**
   ```bash
   ./scripts/validate-access.sh {identidade}
   ```

