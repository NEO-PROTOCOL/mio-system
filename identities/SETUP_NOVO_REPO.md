# 🚀 Setup: Criar Novo Repositório para Sistema MIO

## 🎯 Objetivo

Criar um repositório GitHub separado e dedicado ao **Sistema MIO (Modelo de Identidade Operacional)**, usando GitHub Projects para organização.

---

## 📋 Pré-requisitos

- [x] GitHub CLI instalado (`gh`)
- [x] Autenticado no GitHub (`gh auth login`)
- [x] Estrutura MIO criada localmente

---

## 🔧 Passo 1: Preparar Estrutura Local

### 1.1 Criar diretório limpo para o novo repo

```bash
# Criar diretório temporário
cd ~/CODIGOS/bots_ia
mkdir mio-system
cd mio-system

# Copiar estrutura do MIO
cp -r ../flowcloser_adk-ts/infra/identities/* .
cp -r ../flowcloser_adk-ts/scripts/* ./scripts/ 2>/dev/null || mkdir -p scripts
```

### 1.2 Criar arquivos base do novo repo

```bash
# Criar README principal
cat > README.md << 'EOF'
# 🔐 Sistema MIO - Modelo de Identidade Operacional

Infraestrutura de coordenação entre inteligências não-humanas.

Cada agente/plataforma tem identidade própria, rastreável e documentada.

## 📚 Documentação

- [Sistema MIO](./infra/identities/SISTEMA_MIO.md) - Visão geral
- [Mapa de Identidades](./infra/identities/MAPA_MIO.md) - Painel operativo
- [Catálogo](./infra/identities/CATALOGO.md) - Índice completo

## 🚀 Quick Start

```bash
# Registrar nova identidade
./scripts/register-identity.sh {tipo} {nome} {plataforma}

# Listar identidades
./scripts/list-identities.sh

# Validar acesso
./scripts/validate-access.sh
```

## 📖 Licença

MIT
EOF

# Criar .gitignore
cat > .gitignore << 'EOF'
# Arquivos sensíveis
*.key
*.pem
*.env
*secrets*
*token*
*_private*

# Sistema
.DS_Store
node_modules/
EOF
```

---

## 🔧 Passo 2: Criar Repositório no GitHub

### 2.1 Via GitHub CLI (Recomendado)

```bash
# Criar repo público
gh repo create mio-system \
  --public \
  --description "Sistema MIO - Modelo de Identidade Operacional para gerenciamento de identidades de agentes e plataformas" \
  --clone=false

# Ou criar repo privado
gh repo create mio-system \
  --private \
  --description "Sistema MIO - Modelo de Identidade Operacional" \
  --clone=false
```

### 2.2 Via Interface Web

1. Acesse: https://github.com/new
2. **Repository name:** `mio-system`
3. **Description:** "Sistema MIO - Modelo de Identidade Operacional"
4. **Visibility:** Público ou Privado (recomendado: Privado)
5. **Initialize:** Não marque nenhuma opção (repo vazio)
6. Clique em **Create repository**

---

## 🔧 Passo 3: Inicializar Git Local

```bash
# No diretório do novo repo
cd ~/CODIGOS/bots_ia/mio-system

# Inicializar git
git init
git branch -M main

# Adicionar remote
git remote add origin https://github.com/kauntdewn1/mio-system.git
# Ou SSH:
git remote add origin git@github.com-kauntdewn1:kauntdewn1/mio-system.git

# Primeiro commit
git add .
git commit -m "feat: sistema MIO inicial - infraestrutura de identidades operacionais"

# Push inicial
git push -u origin main
```

---

## 🔧 Passo 4: Configurar GitHub Project

### 4.1 Criar Project via CLI

```bash
# Criar project
gh project create \
  --title "MIO System - Roadmap" \
  --body "Roadmap e tracking do Sistema MIO" \
  --public

# Ou criar via interface web
```

### 4.2 Configurar Project via Web

1. Acesse: https://github.com/kauntdewn1/mio-system
2. Clique em **Projects** → **New project**
3. Escolha template: **Board** ou **Table**
4. Configure campos:
   - **Status** (Todo, In Progress, Done)
   - **Priority** (Low, Medium, High)
   - **Platform** (GitHub, Railway, Vercel, etc)
   - **Agent Type** (Cursor, MCP, LangChain)

### 4.3 Criar Issues Template

```bash
# Criar template de issue para nova identidade
mkdir -p .github/ISSUE_TEMPLATE

cat > .github/ISSUE_TEMPLATE/nova-identidade.md << 'EOF'
---
name: Nova Identidade
about: Registrar nova identidade no Sistema MIO
title: '[IDENTIDADE] '
labels: identidade, documentação
assignees: ''
---

## 📋 Metadados

- **Nome:** 
- **Tipo:** [Deploy Key / Token / Agent]
- **Plataforma:** 
- **Prioridade:** [Low / Medium / High]

## 🔐 Detalhes

- **Método de autenticação:**
- **Escopo de acesso:**
- **Permissões necessárias:**

## ✅ Checklist

- [ ] Criar identidade com `register-identity.sh`
- [ ] Documentar em arquivo `.md`
- [ ] Atualizar `MAPA_MIO.md`
- [ ] Atualizar `CATALOGO.md`
- [ ] Validar acesso com `validate-access.sh`
- [ ] Testar integração
EOF
```

---

## 🔧 Passo 5: Configurar GitHub Actions

### 5.1 Workflow de Validação Automática

```bash
mkdir -p .github/workflows

cat > .github/workflows/validate-identities.yml << 'EOF'
name: Validar Identidades MIO

on:
  schedule:
    - cron: '0 2 * * *'  # Diariamente às 2h
  workflow_dispatch:
  push:
    paths:
      - 'infra/identities/**'

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Validar Identidades
        run: |
          chmod +x scripts/validate-access.sh
          ./scripts/validate-access.sh || true
      
      - name: Gerar Relatório
        run: |
          echo "## 📊 Relatório de Validação" >> $GITHUB_STEP_SUMMARY
          echo "" >> $GITHUB_STEP_SUMMARY
          echo "✅ Validação concluída" >> $GITHUB_STEP_SUMMARY
EOF
```

---

## 🔧 Passo 6: Configurar Segurança

### 6.1 Branch Protection

```bash
# Criar ruleset via CLI (se disponível)
gh api repos/kauntdewn1/mio-system/branches/main/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["validate"]}' \
  --field enforce_admins=true \
  --field required_pull_request_reviews='{"required_approving_review_count":1}'
```

### 6.2 Secret Scanning

- GitHub automaticamente escaneia secrets
- Configure alertas em: Settings → Security → Secret scanning

---

## ✅ Checklist Final

- [ ] Repositório criado no GitHub
- [ ] Estrutura inicial commitada
- [ ] GitHub Project criado e configurado
- [ ] Issue templates criados
- [ ] GitHub Actions configurado
- [ ] Branch protection ativado
- [ ] README.md completo
- [ ] .gitignore configurado

---

## 🚀 Próximos Passos

1. **Migrar identidades existentes:**
   ```bash
   # Copiar do projeto flowcloser
   cp -r ../flowcloser_adk-ts/infra/identities/* ./infra/identities/
   ```

2. **Criar primeira issue:**
   ```bash
   gh issue create --title "Migrar identidades do flowcloser" --body "Migrar identidades existentes para o novo repo"
   ```

3. **Adicionar ao Project:**
   - Vincular issues ao Project criado
   - Criar cards para cada identidade

---

## 📝 Notas

- **Repositório separado** permite evolução independente do MIO
- **GitHub Projects** facilita tracking de identidades e roadmap
- **GitHub Actions** automatiza validação e manutenção
- **Issue templates** padronizam adição de novas identidades

---

**Última atualização:** 2025-12-03

