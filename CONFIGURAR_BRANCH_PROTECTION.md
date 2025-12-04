# 🔒 Configurar Branch Protection

## 📋 Objetivo

Proteger a branch `main` para garantir que apenas código validado seja mergeado.

---

## 🚀 Passo a Passo Visual

### 1️⃣ Acessar Configurações

**URL direta:**
```
https://github.com/kauntdewn1/mio-system/settings/branches
```

**Ou via navegação:**
1. Acesse: https://github.com/kauntdewn1/mio-system
2. Clique em **"Settings"** (canto superior direito)
3. No menu lateral esquerdo, clique em **"Branches"**

---

### 2️⃣ Adicionar Regra de Proteção

Na página de configurações de branches:

1. **Role até a seção:** "Branch protection rules"

2. **Clique no botão:** **"Add rule"** ou **"Add branch protection rule"**

3. **No campo "Branch name pattern":**
   - Digite: `main`
   - Ou use: `*` (protege todas as branches)

---

### 3️⃣ Configurar Regras (Recomendado)

Marque **APENAS** estas opções:

#### ✅ Require a pull request before merging
- **Marcar:** ✅ (checkbox)
- **Opções adicionais:**
  - ✅ **Require approvals:** 1 (mínimo)
  - ✅ **Dismiss stale pull request approvals when new commits are pushed**
  - ⚠️ **Require review from Code Owners:** Deixar desmarcado (se não tiver CODEOWNERS)

#### ✅ Require status checks to pass before merging
- **Marcar:** ✅ (checkbox)
- **Em "Status checks that are required":**
  - ✅ Marcar: **validate-identities** (se aparecer)
  - ⚠️ Se não aparecer, deixe vazio por enquanto (aparece após primeira execução)

#### ✅ Require branches to be up to date before merging
- **Marcar:** ✅ (checkbox)
- Isso garante que a branch está atualizada com `main`

#### ✅ Include administrators
- **Marcar:** ✅ (checkbox)
- Isso aplica as regras até para admins (mais seguro)

---

### 4️⃣ Regras Opcionais (Recomendadas)

#### ✅ Restrict pushes that create files larger than 100 MB
- **Marcar:** ✅ (checkbox)
- Previne commits de arquivos muito grandes

#### ❌ Allow force pushes
- **NÃO marcar** (deixar desmarcado)
- Force push pode sobrescrever histórico

#### ❌ Allow deletions
- **NÃO marcar** (deixar desmarcado)
- Previne deletar a branch `main`

---

### 5️⃣ Salvar Configuração

1. **Role até o final da página**
2. **Clique em:** **"Create"** ou **"Save changes"**
3. **Confirme** se pedir

---

## 🎯 Configuração Mínima Recomendada

Se quiser começar simples, marque apenas:

```
✅ Require a pull request before merging
   └─ Require approvals: 1

✅ Require status checks to pass before merging
   └─ validate-identities (quando disponível)

✅ Include administrators
```

---

## ✅ Como Testar se Está Funcionando

### Teste 1: Tentar Push Direto

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
```

✅ **Se aparecer esse erro, a proteção está funcionando!**

### Teste 2: Criar PR

```bash
git checkout -b teste-protection
echo "# teste" >> TESTE.md
git add TESTE.md
git commit -m "teste: branch protection"
git push origin teste-protection
gh pr create --title "Teste: Branch Protection" --body "Testando se proteção funciona"
```

**Resultado esperado:**
- PR criado com sucesso ✅
- PR mostra que precisa de aprovação ⏳
- Não consegue fazer merge direto ✅

---

## 🔍 Verificar Status Checks

Após configurar branch protection:

1. **Crie um PR** (qualquer um)
2. **No PR, role até "Checks":**
   - Você verá: "validate-identities" (se workflow rodou)
   - Status: ✅ ou ⏳

3. **Se status check não aparecer:**
   - Execute o workflow manualmente uma vez
   - Depois ele aparecerá nas próximas execuções

---

## ⚠️ Troubleshooting

### Problema: "No status checks found"

**Solução:**
1. Execute o workflow manualmente uma vez
2. Aguarde ele completar
3. Depois ele aparecerá na lista de status checks

### Problema: Não consigo fazer merge do meu próprio PR

**Solução:**
- Isso é normal! Você precisa de aprovação
- Ou adicione você mesmo como reviewer e aprove
- Ou desmarque "Require approvals" temporariamente

### Problema: Status check não passa

**Solução:**
- Veja os logs do workflow no GitHub Actions
- Corrija o problema no código
- Faça novo commit no PR

---

## 📝 Checklist Final

- [ ] Acessei Settings → Branches
- [ ] Criei regra para branch `main`
- [ ] Marquei "Require pull request"
- [ ] Marquei "Require status checks"
- [ ] Marquei "Include administrators"
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
   - Veja se aparece a mensagem de aprovação necessária
   - Veja se status checks aparecem

---

**Última atualização:** 2025-12-03

