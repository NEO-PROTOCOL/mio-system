#!/bin/bash

# Script para registrar nova identidade operacional
# Uso: ./scripts/register-identity.sh {tipo} {nome} {plataforma}

set -e

TYPE=$1
NAME=$2
PLATFORM=$3

if [ -z "$TYPE" ] || [ -z "$NAME" ] || [ -z "$PLATFORM" ]; then
    echo "❌ Uso: $0 {tipo} {nome} {plataforma}"
    echo "   Exemplo: $0 deploy-key vercel-deploy vercel"
    exit 1
fi

BASE_DIR="identities"
TARGET_DIR="$BASE_DIR/$PLATFORM"

# Criar diretório se não existir
mkdir -p "$TARGET_DIR"

# Criar arquivo de documentação
DOC_FILE="$TARGET_DIR/${NAME}.md"

if [ -f "$DOC_FILE" ]; then
    echo "⚠️  Arquivo já existe: $DOC_FILE"
    read -p "Sobrescrever? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Cancelado"
        exit 1
    fi
fi

cat > "$DOC_FILE" << EOF
# 🔑 ${TYPE}: ${NAME}

## 📋 Metadados

| Campo | Valor |
|-------|-------|
| **Nome** | \`${NAME}\` |
| **Tipo** | ${TYPE} |
| **Plataforma** | ${PLATFORM} |
| **Criada em** | $(date +%Y-%m-%d) |
| **Status** | ⚠️ Pendente |

---

## 🔐 Detalhes Técnicos

- **Método:** [Preencher]
- **Chave/Token:** [Preencher]
- **Permissões:** [Preencher]

---

## ✅ Verificação

\`\`\`bash
# Comandos de teste aqui
\`\`\`

---

## 📝 Notas

[Adicionar notas relevantes]
EOF

echo "✅ Identidade criada: $DOC_FILE"
echo "📝 Edite o arquivo para preencher os detalhes"

