# 🔒 Passo a Passo: Configurar Branch Protection

## 🎯 Objetivo

Proteger a branch `main` para garantir qualidade e segurança do código.

---

## 📍 Passo 1: Acessar Configurações

### Opção A: URL Direta (Mais Rápido)
```
https://github.com/kauntdewn1/mio-system/settings/branches
```

### Opção B: Via Navegação
1. Acesse: https://github.com/kauntdewn1/mio-system
2. Clique em **"Settings"** (aba no topo, ao lado de "Insights")
3. No menu lateral esquerdo, clique em **"Branches"**

---

## 📍 Passo 2: Adicionar Regra

Na página de configurações:

1. **Role até a seção:** "Branch protection rules"
2. **Clique no botão:** **"Add rule"** ou **"Add branch protection rule"**

---

## 📍 Passo 3: Configurar Nome da Branch

No campo **"Branch name pattern"**:

- **Digite:** `main`
- **Ou use:** `*` (protege todas as branches)

**Clique em:** Continuar ou próximo passo

---

## 📍 Passo 4: Configurar Regras (IMPORTANTE)

### ✅ Regra 1: Require a pull request before merging

**Marque a checkbox:** ✅

**Configurações adicionais:**
- ✅ **Require approvals:** `1` (mínimo de 1 aprovação)
- ✅ **Dismiss stale pull request approvals when new commits are pushed**
- ⚠️ **Require review from Code Owners:** Deixar **desmarcado** (por enquanto)

---

### ✅ Regra 2: Require status checks to pass before merging

**Marque a checkbox:** ✅

**Em "Status checks that are required":**
- ⏳ **validate-identities** - Pode não aparecer ainda (aparece após algumas execuções)
- Se não aparecer, deixe vazio por enquanto
- Você pode adicionar depois quando o status check aparecer

**Opções adicionais:**
- ✅ **Require branches to be up to date before merging** (já vem marcado)

---

### ✅ Regra 3: Include administrators

**Marque a checkbox:** ✅

Isso aplica as regras até para você (mais seguro).

---

## 📍 Passo 5: Regras Opcionais (Recomendadas)

### ✅ Restrict pushes that create files larger than 100 MB
- **Marque:** ✅
- Previne commits de arquivos muito grandes

### ❌ Allow force pushes
- **NÃO marque** (deixar desmarcado)
- Force push pode sobrescrever histórico

### ❌ Allow deletions
- **NÃO marque** (deixar desmarcado)
- Previne deletar a branch `main`

---

## 📍 Passo 6: Salvar

1. **Role até o final da página**
2. **Clique em:** **"Create"** ou **"Save changes"**
3. **Confirme** se pedir

---

## ✅ Verificação Visual

Após salvar, você verá:

```
Branch protection rules
└─ main
   ├─ ✅ Require pull request
   ├─ ✅ Require status checks
   └─ ✅ Include administrators
```

---

## 🧪 Teste Rápido

### Teste 1: Tentar Push Direto (Deve Falhar)

```bash
cd /Users/nettomello/CODIGOS/bots_ia/mio-system
git checkout main
echo "# teste" >> TESTE.md
git add TESTE.md
git commit -m "teste: branch protection"
git push origin main
```

**Resultado esperado:**
```
! [remote rejected] main -> main (protected branch hook declined)
error: failed to push some refs to 'origin/main'
```

✅ **Se aparecer esse erro, a proteção está funcionando!**

### Teste 2: Criar PR (Deve Funcionar)

```bash
git checkout -b teste-protection
echo "# teste" >> TESTE.md
git add TESTE.md
git commit -m "teste: branch protection"
git push origin teste-protection
gh pr create --title "Teste: Branch Protection" --body "Testando se proteção funciona"
```

**Resultado esperado:**
- ✅ PR criado com sucesso
- ⏳ PR mostra: "1 approval required"
- ❌ Botão "Merge" desabilitado até aprovar

---

## 📝 Checklist de Configuração

- [ ] Acessei Settings → Branches
- [ ] Cliquei em "Add rule"
- [ ] Digitei `main` no campo "Branch name pattern"
- [ ] Marquei "Require a pull request before merging"
   - [ ] Configurei: Require approvals: 1
- [ ] Marquei "Require status checks to pass before merging"
- [ ] Marquei "Require branches to be up to date before merging"
- [ ] Marquei "Include administrators"
- [ ] Marquei "Restrict pushes that create files larger than 100 MB"
- [ ] Salvei a configuração
- [ ] Testei push direto (deve falhar)
- [ ] Testei criar PR (deve funcionar)

---

## 🎉 Próximo Passo

Após configurar:

1. **Na Issue #1:**
   - Marque: `☑️ Ativar branch protection`
   - Adicione comentário: "✅ Branch protection configurada para `main`"

2. **Teste criando um PR:**
   - Veja se aparece mensagem de aprovação necessária
   - Veja se status checks aparecem (quando disponíveis)

---

## 🔗 Links Úteis

- **Configurações:** https://github.com/kauntdewn1/mio-system/settings/branches
- **Actions:** https://github.com/kauntdewn1/mio-system/actions
- **PRs:** https://github.com/kauntdewn1/mio-system/pulls

---

**Última atualização:** 2025-12-04

