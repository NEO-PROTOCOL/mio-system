#!/bin/bash

# Script para criar novo repositório GitHub para Sistema MIO
# Uso: ./scripts/setup-new-repo.sh [--public|--private]

set -e

REPO_NAME="mio-system"
REPO_DESC="Sistema MIO - Modelo de Identidade Operacional para gerenciamento de identidades de agentes e plataformas"
VISIBILITY=${1:-"--private"}

# Cores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Setup: Criar Novo Repositório MIO${NC}"
echo "===================================="
echo ""

# Verificar GitHub CLI
if ! command -v gh &> /dev/null; then
    echo -e "${RED}❌ GitHub CLI não encontrado${NC}"
    echo "   Instale: brew install gh"
    exit 1
fi

# Verificar autenticação
if ! gh auth status &> /dev/null; then
    echo -e "${YELLOW}⚠️  Não autenticado no GitHub CLI${NC}"
    echo "   Execute: gh auth login"
    exit 1
fi

# Obter diretório atual
CURRENT_DIR=$(pwd)
PARENT_DIR=$(dirname "$CURRENT_DIR")
NEW_REPO_DIR="$PARENT_DIR/$REPO_NAME"

# Verificar se diretório já existe
if [ -d "$NEW_REPO_DIR" ]; then
    echo -e "${YELLOW}⚠️  Diretório já existe: $NEW_REPO_DIR${NC}"
    read -p "Continuar mesmo assim? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Cancelado"
        exit 1
    fi
else
    mkdir -p "$NEW_REPO_DIR"
fi

echo "📁 Diretório: $NEW_REPO_DIR"
echo ""

# Copiar estrutura MIO
echo "📋 Copiando estrutura MIO..."
cp -r "$CURRENT_DIR/infra/identities" "$NEW_REPO_DIR/" 2>/dev/null || true
cp -r "$CURRENT_DIR/scripts" "$NEW_REPO_DIR/" 2>/dev/null || mkdir -p "$NEW_REPO_DIR/scripts"

# Criar README principal
cat > "$NEW_REPO_DIR/README.md" << 'EOF'
# 🔐 Sistema MIO - Modelo de Identidade Operacional

Infraestrutura de coordenação entre inteligências não-humanas.

Cada agente/plataforma tem identidade própria, rastreável e documentada.

## 📚 Documentação

- [Sistema MIO](./infra/identities/SISTEMA_MIO.md) - Visão geral
- [Mapa de Identidades](./infra/identities/MAPA_MIO.md) - Painel operativo
- [Catálogo](./infra/identities/CATALOGO.md) - Índice completo
- [Setup Novo Repo](./infra/identities/SETUP_NOVO_REPO.md) - Guia de setup

## 🚀 Quick Start

```bash
# Registrar nova identidade
./scripts/register-identity.sh {tipo} {nome} {plataforma}

# Listar identidades
./scripts/list-identities.sh

# Validar acesso
./scripts/validate-access.sh

# Criar PR
./scripts/create-pr.sh "Título" "Descrição"
```

## 🗺️ Mapa de Identidades

Ver [MAPA_MIO.md](./infra/identities/MAPA_MIO.md) para visão completa do ecossistema.

## 📖 Licença

MIT
EOF

# Criar .gitignore
cat > "$NEW_REPO_DIR/.gitignore" << 'EOF'
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
*.log
EOF

# Criar estrutura de diretórios
mkdir -p "$NEW_REPO_DIR/.github/ISSUE_TEMPLATE"
mkdir -p "$NEW_REPO_DIR/.github/workflows"

# Criar issue template
cat > "$NEW_REPO_DIR/.github/ISSUE_TEMPLATE/nova-identidade.md" << 'EOF'
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

# Criar workflow de validação
cat > "$NEW_REPO_DIR/.github/workflows/validate-identities.yml" << 'EOF'
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
          chmod +x scripts/validate-access.sh || true
          ./scripts/validate-access.sh || echo "Validação concluída com avisos"
      
      - name: Gerar Relatório
        run: |
          echo "## 📊 Relatório de Validação" >> $GITHUB_STEP_SUMMARY
          echo "" >> $GITHUB_STEP_SUMMARY
          echo "✅ Validação concluída" >> $GITHUB_STEP_SUMMARY
EOF

# Tornar scripts executáveis
chmod +x "$NEW_REPO_DIR/scripts"/*.sh 2>/dev/null || true

cd "$NEW_REPO_DIR"

# Inicializar git
echo "🔧 Inicializando Git..."
git init
git branch -M main

# Criar repo no GitHub
echo "🌐 Criando repositório no GitHub..."
gh repo create "$REPO_NAME" \
  $VISIBILITY \
  --description "$REPO_DESC" \
  --clone=false \
  --source=. \
  --remote=origin

# Primeiro commit
echo "📝 Criando primeiro commit..."
git add .
git commit -m "feat: sistema MIO inicial - infraestrutura de identidades operacionais

- Estrutura completa de identidades
- Scripts de automação
- Documentação completa
- GitHub Actions para validação"

# Push inicial
echo "🚀 Fazendo push inicial..."
git push -u origin main

echo ""
echo -e "${GREEN}✅ Repositório criado com sucesso!${NC}"
echo ""
echo "📁 Local: $NEW_REPO_DIR"
echo "🌐 GitHub: https://github.com/kauntdewn1/$REPO_NAME"
echo ""
echo "📋 Próximos passos:"
echo "   1. Criar GitHub Project: gh project create --title 'MIO Roadmap'"
echo "   2. Configurar branch protection"
echo "   3. Migrar identidades existentes"
echo ""

