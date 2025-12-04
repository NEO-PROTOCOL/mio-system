#!/bin/bash

# Script para validar acesso de todas as identidades registradas
# Uso: ./scripts/validate-access.sh [--verbose] [--skip-ssh]

# Não usar set -e para permitir tratamento de erros manual

VERBOSE=${1:-""}
SKIP_SSH=false

# Verificar se --skip-ssh foi passado
for arg in "$@"; do
    if [ "$arg" == "--skip-ssh" ]; then
        SKIP_SSH=true
    fi
done

BASE_DIR="identities"

echo "🔍 Validação de Acesso - Sistema MIO"
echo "===================================="
echo ""

# Contadores
VALIDATED=0
FAILED=0
SKIPPED=0

# Função para validar GitHub SSH
validate_github_ssh() {
    local key_file=$1
    local host=$2
    
    if [ "$SKIP_SSH" = true ]; then
        echo "    ⏭️  Validação SSH pulada (--skip-ssh ativo)"
        return 2
    fi
    
    if [ -z "$host" ]; then
        host="github.com"
    fi
    
    echo "  🔑 Testando SSH: $host"
    
    # Verificar se chave está no agent
    if ssh-add -l 2>/dev/null | grep -q "kauntdewn1\|id_ed25519"; then
        echo "    ℹ️  Chave já está no ssh-agent"
    else
        echo "    ⚠️  Chave não está no agent - será necessário digitar passphrase"
        echo "    💡 Dica: Execute 'ssh-add ~/.ssh/id_ed25519_kauntdewn1' antes"
    fi
    
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

# Coletar arquivos em array (evita subshell)
IDENTITY_FILES=()
while IFS= read -r -d '' file; do
    IDENTITY_FILES+=("$file")
done < <(find "$BASE_DIR" -name "*.md" -type f ! -name "README.md" ! -name "CATALOGO.md" ! -name "MAPA_MIO.md" ! -name "TEMPLATE_AGENTE.md" ! -name "SISTEMA_MIO.md" ! -name "SETUP_NOVO_REPO.md" ! -name "QUICK_START.md" ! -name "GUIA_INTERFACE_GITHUB.md" ! -name "COMO_LIDAR_PASSPHRASE.md" -print0)

# Processar cada arquivo de identidade
for file in "${IDENTITY_FILES[@]}"; do
    rel_path="${file#$BASE_DIR/}"
    name=$(basename "$file" .md)
    
    echo "📄 Validando: $name"
    echo "   Arquivo: $rel_path"
    
    # Detectar tipo de identidade pelo caminho
    if [[ "$rel_path" == *"github/deploy-keys"* ]]; then
        # Validar GitHub SSH
        validate_github_ssh "$file" "github.com-kauntdewn1"
        result=$?
        case $result in
            0) ((VALIDATED++)) ;;
            1) ((FAILED++)) ;;
            2) ((SKIPPED++)) ;;
        esac
    elif [[ "$rel_path" == *"github/personal-tokens"* ]]; then
        # Validar GitHub CLI
        validate_github_cli
        result=$?
        case $result in
            0) ((VALIDATED++)) ;;
            1) ((FAILED++)) ;;
            2) ((SKIPPED++)) ;;
        esac
    elif [[ "$rel_path" == *"railway"* ]]; then
        # Validar Railway
        validate_railway
        result=$?
        case $result in
            0) ((VALIDATED++)) ;;
            1) ((FAILED++)) ;;
            2) ((SKIPPED++)) ;;
        esac
    elif [[ "$rel_path" == *"agents/cursor"* ]]; then
        # Cursor usa GitHub, validar GitHub CLI
        validate_github_cli
        result=$?
        case $result in
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
    if [ $VALIDATED -gt 0 ]; then
        echo "✅ Validações concluídas com sucesso!"
    else
        echo "ℹ️  Nenhuma validação executada (todas puladas ou não suportadas)"
    fi
    exit 0
fi
