<!-- markdownlint-disable MD003 MD007 MD011 MD013 MD022 MD023 MD025 MD029 MD032 MD033 MD034 -->

```text
========================================
   NΞØ PROTOCOL · BRANCH PROTECTION
========================================
```

Guia de configuração de segurança para branches protegidas no GitHub.

> **Target Branch:** main
> **Security Level:** Restricted
> **Rule Source:** NΞØ Governance

────────────────────────────────────────

## 🎯 Objetivo: Integridade de Código

Garantir que nenhum código entre na branch `main` sem passar por auditoria e testes automatizados.

```text
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃ CORE RULES (REQUIRED)
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃
┃ ✅ Require Pull Request
┃    └─ Mínimo 1 Approval
┃
┃ ✅ Require Status Checks
┃    └─ validate-identities must pass
┃
┃ ✅ Include Administrators
┃    └─ Enforce for everyone
┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

────────────────────────────────────────

## 🛠 Passo a Passo (Settings)

1.  Acesse **Settings** → **Branches**.
2.  Clique em **Add Rule** para o padrão `main`.
3.  Ative **Require a pull request before merging**.
4.  Ative **Require status checks to pass before merging**.
5.  Selecione o check: `validate-identities`.

────────────────────────────────────────

## ✅ Verificação de Proteção

```bash
# Tentar push direto (Deve falhar)
git checkout main
echo "vulnerability" >> README.md
git add .
git commit -m "hack: test protection"
git push origin main
```

**Resultado Esperado:** 
`! [remote rejected] main -> main (protected branch hook declined)`

────────────────────────────────────────

▓▓▓ NΞØ MELLØ
────────────────────────────────────────
Core Architect · NΞØ Protocol
neo@neoprotocol.space

"Code is law. Expand until
silence becomes structure."
────────────────────────────────────────
```
 █████ █         
██╔═══██╗       
██║ █ ██║  
██ █  ██║      
╚██████╔╝   
█ ╚═══╝     

```
