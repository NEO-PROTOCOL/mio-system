#!/bin/bash

# Script para listar todas as identidades registradas

BASE_DIR="identities"

echo "📊 Catálogo de Identidades Operacionais"
echo "========================================"
echo ""

find "$BASE_DIR" -name "*.md" -type f ! -name "README.md" ! -name "CATALOGO.md" | while read -r file; do
    rel_path="${file#$BASE_DIR/}"
    dir=$(dirname "$rel_path")
    name=$(basename "$file" .md)
    
    # Extrair status do arquivo
    status=$(grep -E "^\*\*Status\*\*" "$file" | sed 's/.*| \(.*\) |.*/\1/' || echo "❓")
    
    echo "📁 $dir/"
    echo "   └─ $name $status"
    echo ""
done

echo "📝 Total: $(find "$BASE_DIR" -name "*.md" -type f ! -name "README.md" ! -name "CATALOGO.md" | wc -l | tr -d ' ') identidades"

