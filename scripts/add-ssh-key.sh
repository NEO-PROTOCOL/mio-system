#!/bin/bash
# Script para adicionar chave SSH ao agent (evita pedir passphrase toda vez)

echo "🔑 Adicionando chave SSH ao agent..."
ssh-add ~/.ssh/id_ed25519_kauntdewn1

if [ $? -eq 0 ]; then
    echo "✅ Chave adicionada ao agent!"
    echo "   Agora você não precisará digitar a passphrase por algumas horas."
else
    echo "❌ Falha ao adicionar chave"
fi
