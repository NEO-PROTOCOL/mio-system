#!/bin/bash

# Script para criar PR via GitHub CLI
# Uso: ./scripts/create-pr.sh {titulo} {descricao}

set -e

TITLE=$1
BODY=$2
BRANCH=${3:-$(git branch --show-current)}

if [ -z "$TITLE" ]; then
    echo "❌ Uso: $0 {titulo} [descricao] [branch]"
    echo "   Exemplo: $0 'feat: Nova feature' 'Descrição detalhada'"
    exit 1
fi

# Verificar se GitHub CLI está instalado
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI não encontrado"
    echo "   Instale: brew install gh"
    exit 1
fi

# Verificar autenticação
if ! gh auth status &> /dev/null; then
    echo "⚠️  Não autenticado no GitHub CLI"
    echo "   Execute: gh auth login"
    exit 1
fi

# Criar PR
echo "🚀 Criando PR..."
echo "   Título: $TITLE"
echo "   Branch: $BRANCH"
echo ""

gh pr create \
    --title "$TITLE" \
    --body "${BODY:-Automated PR via script}" \
    --base main \
    --head "$BRANCH"

echo ""
echo "✅ PR criado com sucesso!"

