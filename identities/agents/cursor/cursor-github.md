# 🤖 Agente: Cursor AI - GitHub Integration

## 📋 Metadados

| Campo | Valor |
|-------|-------|
| **Nome** | `cursor-dev` |
| **Tipo** | AI Agent (Cursor App) |
| **Plataforma** | GitHub |
| **Acesso** | Via Cursor App (OAuth/Token) |
| **Status** | ✅ Ativo |

---

## 🔐 Método de Autenticação

Cursor usa autenticação integrada via:
- OAuth GitHub (preferencial)
- Ou Personal Access Token (PAT) configurado

---

## 📍 Escopo de Acesso

- **Repositórios:** `kauntdewn1/flowcloser-agent`
- **Branches:** Todas (com restrições de PR)
- **Permissões:** Read, Write (via PRs)

---

## 🎯 Workflow Atual

1. **Edição:** Cursor edita código localmente
2. **Commit:** Git commit via terminal/Cursor
3. **Push:** Bloqueado por regras do GitHub (requer PR)
4. **PR:** Criado manualmente ou via GitHub CLI

---

## 🔄 Automação Futura

**Possível via GitHub CLI:**
```bash
gh pr create --title "Update via Cursor" --body "Automated update"
```

---

## 📝 Notas

- Cursor não faz push direto (respeita regras do repo)
- Requer intervenção manual para criar PRs
- Pode ser automatizado com scripts MCP

