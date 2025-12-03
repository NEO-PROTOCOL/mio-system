#!/bin/bash

# Script para validar acesso de todas as identidades registradas
# Uso: ./scripts/validate-access.sh [--verbose]

set -e

VERBOSE=${1:-""}
BASE_DIR="infra/identities"
VALIDATED=0
FAILED=0
SKIPPED=0

echo "🔍 Validação de Acesso - Sistema MIO"
echo "===================================="
echo ""

# Função para validar GitHub SSH
validate_github_ssh() {
    local key_file=$1
    local host=$2
    
    if [ -z "$host" ]; then
        host="github.com"
    fi
    
    echo "  🔑 Testando SSH: $host"
    
    if ssh -T git@${host} 2>&1 | grep -q "successfully authenticated\|You've successfully authenticated"; then
        echo "    ✅ Acesso SSH OK"
        return 0
    else
        echo "    ❌ Falha na autenticação SSH"
        return 1
    fi
}

# Função para validar GitHub CLI
validate_github_cli() {
    echo "  🔑 Testando GitHub CLI"
    
    if command -v gh &> /dev/null; then
        if gh auth status &> /dev/null; then
            echo "    ✅ GitHub CLI autenticado"
            return 0
        else
            echo "    ⚠️  GitHub CLI não autenticado"
            return 1
        fi
    else
        echo "    ⏭️  GitHub CLI não instalado"
        return 2
    fi
}

# Função para validar Railway
validate_railway() {
    echo "  🔑 Testando Railway"
    
    if command -v railway &> /dev/null; then
        if railway whoami &> /dev/null; then
            echo "    ✅ Railway CLI autenticado"
            return 0
        else
            echo "    ⚠️  Railway CLI não autenticado"
            return 1
        fi
    else
        echo "    ⏭️  Railway CLI não instalado"
        return 2
    fi
}

# Processar cada arquivo de identidade
find "$BASE_DIR" -name "*.md" -type f ! -name "README.md" ! -name "CATALOGO.md" ! -name "MAPA_MIO.md" ! -name "TEMPLATE_AGENTE.md" ! -name "SISTEMA_MIO.md" | while read -r file; do
    rel_path="${file#$BASE_DIR/}"
    name=$(basename "$file" .md)
    
    echo "📄 Validando: $name"
    echo "   Arquivo: $rel_path"
    
    # Detectar tipo de identidade pelo caminho
    if [[ "$rel_path" == *"github/deploy-keys"* ]]; then
        # Validar GitHub SSH
        if validate_github_ssh "$file" "github.com-kauntdewn1"; then
            ((VALIDATED++))
        else
            ((FAILED++))
        fi
    elif [[ "$rel_path" == *"github/personal-tokens"* ]]; then
        # Validar GitHub CLI
        result=$(validate_github_cli)
        case $? in
            0) ((VALIDATED++)) ;;
            1) ((FAILED++)) ;;
            2) ((SKIPPED++)) ;;
        esac
    elif [[ "$rel_path" == *"railway"* ]]; then
        # Validar Railway
        result=$(validate_railway)
        case $? in
            0) ((VALIDATED++)) ;;
            1) ((FAILED++)) ;;
            2) ((SKIPPED++)) ;;
        esac
    elif [[ "$rel_path" == *"agents/cursor"* ]]; then
        # Cursor usa GitHub, validar GitHub CLI
        result=$(validate_github_cli)
        case $? in
            0) ((VALIDATED++)) ;;
            1) ((FAILED++)) ;;
            2) ((SKIPPED++)) ;;
        esac
    else
        echo "    ⏭️  Tipo não suportado para validação automática"
        ((SKIPPED++))
    fi
    
    echo ""
done

echo "===================================="
echo "📊 Resumo da Validação"
echo "   ✅ Validadas: $VALIDATED"
echo "   ❌ Falhas: $FAILED"
echo "   ⏭️  Puladas: $SKIPPED"
echo ""

if [ $FAILED -gt 0 ]; then
    echo "⚠️  Algumas validações falharam. Revise as identidades acima."
    exit 1
else
    echo "✅ Todas as validações passaram!"
    exit 0
fi

