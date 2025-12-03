# 🧱 Sistema MIO - Modelo de Identidade Operacional

## 🎯 Objetivo

Gerenciar de forma sistemática todas as identidades, chaves e tokens usados por agentes, automações e plataformas de deploy.

**Princípio:** Cada agente/plataforma tem identidade própria, rastreável e documentada.

---

## 📊 Status Atual

### ✅ Identidades Registradas

1. **GitHub Deploy Key** (`flowcloser-deploy`)
   - Tipo: SSH Key (ed25519)
   - Status: ✅ Ativa
   - Uso: Deploy em produção

2. **Railway Deploy** (`railway-production`)
   - Tipo: Platform Integration
   - Status: ✅ Ativo
   - Uso: Deploy automático

3. **Cursor AI** (`cursor-dev`)
   - Tipo: AI Agent
   - Status: ✅ Ativo
   - Uso: Desenvolvimento local

---

## 🗂️ Estrutura Criada

```
infra/identities/
├── README.md                    # Documentação principal
├── CATALOGO.md                  # Índice de identidades
├── TEMPLATE_AGENTE.md          # Template para novos agentes
├── SISTEMA_MIO.md              # Este arquivo
│
├── github/
│   ├── deploy-keys/
│   │   └── flowcloser-deploy.md
│   └── personal-tokens/        # (vazio - adicionar quando necessário)
│
├── railway/
│   └── railway-deploy.md
│
├── vercel/                     # (vazio - adicionar quando necessário)
│
└── agents/
    ├── cursor/
    │   └── cursor-github.md
    ├── mcp/                    # (vazio - adicionar quando necessário)
    └── langchain-bots/        # (vazio - adicionar quando necessário)
```

---

## 🛠️ Scripts Disponíveis

### 1. Registrar Nova Identidade
```bash
./scripts/register-identity.sh {tipo} {nome} {plataforma}
# Exemplo: ./scripts/register-identity.sh deploy-key vercel-deploy vercel
```

### 2. Listar Identidades
```bash
./scripts/list-identities.sh
```

### 3. Criar PR Automático
```bash
./scripts/create-pr.sh "Título do PR" "Descrição" [branch]
```

---

## 🔒 Segurança

### Proteções Implementadas

- ✅ `.gitignore` atualizado para proteger chaves privadas
- ✅ Apenas documentação (`.md`) é commitada
- ✅ Valores sensíveis em variáveis de ambiente
- ✅ Chaves SSH com passphrase quando possível

### Boas Práticas

1. **Nunca commite:**
   - Chaves privadas (`.key`, `.pem`)
   - Tokens (`.env`, `*token*`)
   - Secrets (`*secret*`)

2. **Sempre documente:**
   - Metadados da identidade
   - Escopo de acesso
   - Método de autenticação
   - Data de criação/rotação

---

## 📈 Próximos Passos

### Identidades a Adicionar (quando necessário)

- [ ] **Vercel Deploy Key** (se usar Vercel)
- [ ] **Netlify Token** (se usar Netlify)
- [ ] **MCP Agent Identity** (quando implementar MCP agents)
- [ ] **LangChain Bot Token** (quando criar bots customizados)
- [ ] **GitHub Personal Access Token** (se necessário para automações)

### Melhorias Futuras

- [ ] Script de validação de acesso automático
- [ ] Rotação automática de tokens
- [ ] Integração com secret managers (1Password, Vault)
- [ ] Dashboard de status de identidades

---

## 📝 Exemplo de Uso

### Registrar Nova Identidade

```bash
# Criar identidade para Vercel
./scripts/register-identity.sh deploy-key vercel-deploy vercel

# Editar arquivo gerado
vim infra/identities/vercel/vercel-deploy.md

# Preencher detalhes técnicos
```

### Criar PR via Script

```bash
# Criar branch
git checkout -b feat/nova-feature

# Fazer mudanças...
git add .
git commit -m "feat: nova feature"

# Push
git push origin feat/nova-feature

# Criar PR automaticamente
./scripts/create-pr.sh "feat: Nova Feature" "Descrição detalhada"
```

---

## 🔗 Referências

- [GitHub Deploy Keys](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/managing-deploy-keys)
- [Railway GitHub Integration](https://docs.railway.app/guides/github)
- [Cursor AI Documentation](https://cursor.sh/docs)

---

**Última atualização:** 2025-12-03  
**Versão do Sistema:** 1.0.0

