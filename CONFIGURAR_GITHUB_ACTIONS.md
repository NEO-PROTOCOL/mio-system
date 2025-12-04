# ⚙️ Configurar GitHub Actions

## 📋 Status Atual

✅ **Workflow criado:** `.github/workflows/validate-identities.yml`  
⏳ **Status:** Criado, mas ainda não testado

---

## 🧪 Passo 1: Testar o Workflow Manualmente

### Opção A: Via GitHub CLI (Recomendado)

```bash
cd /Users/nettomello/CODIGOS/bots_ia/mio-system

# Listar workflows disponíveis
gh workflow list

# Executar workflow manualmente
gh workflow run validate-identities.yml

# Ver status da execução
gh run list --workflow=validate-identities.yml

# Ver logs da última execução
gh run view --log
```

### Opção B: Via Interface Web

1. **Acesse:** https://github.com/kauntdewn1/mio-system/actions

2. **No menu lateral esquerdo:**
   - Clique em **"Validar Identidades MIO"**

3. **No canto superior direito:**
   - Clique em **"Run workflow"** ▼
   - Selecione branch: `main`
   - Clique em **"Run workflow"**

4. **Aguardar execução:**
   - Você verá um card amarelo "In progress"
   - Aguarde alguns segundos (geralmente 10-30s)
   - Quando terminar, ficará verde ✅ ou vermelho ❌

5. **Ver resultado:**
   - Clique no card da execução
   - Veja os logs de cada step
   - Verifique se passou ✅

---

## 🔍 Passo 2: Verificar se o Workflow Está Funcionando

### O que o workflow faz:

1. **Checkout do código**
2. **Executa validação:**
   ```bash
   chmod +x identities/scripts/validate-access.sh
   ./identities/scripts/validate-access.sh
   ```
3. **Gera relatório** no GitHub Actions

### Resultado esperado:

```
✅ Validações concluídas com sucesso!
   ✅ Validadas: 2
   ❌ Falhas: 0
   ⏭️  Puladas: 1
```

---

## ⚠️ Possíveis Problemas e Soluções

### Problema 1: Workflow não aparece

**Solução:**
- Verifique se o arquivo está em `.github/workflows/validate-identities.yml`
- Verifique se está commitado e pushado
- Aguarde alguns segundos (GitHub pode demorar para detectar)

### Problema 2: Script não encontrado

**Solução:**
- Verifique se `identities/scripts/validate-access.sh` existe
- Verifique permissões: `chmod +x identities/scripts/validate-access.sh`

### Problema 3: Validação falha

**Solução:**
- O workflow usa `--skip-ssh` automaticamente (não precisa SSH)
- Verifique se GitHub CLI e Railway CLI estão disponíveis no runner
- Veja os logs detalhados no GitHub Actions

---

## 🔄 Passo 3: Configurar Execução Automática

O workflow já está configurado para executar:

1. **Diariamente às 2h** (cron: `0 2 * * *`)
2. **Quando você clicar em "Run workflow"** (workflow_dispatch)
3. **Quando arquivos em `identities/**` mudarem** (push)

**Não precisa fazer nada adicional!** Já está configurado.

---

## ✅ Checklist de Validação

- [ ] Workflow aparece em Actions
- [ ] Consegue executar manualmente via interface
- [ ] Execução completa sem erros
- [ ] Logs mostram validação correta
- [ ] Relatório gerado no GitHub Actions

---

## 📝 Próximo Passo

Após testar o workflow, você pode:
1. Marcar na Issue #1: `☑️ Configurar GitHub Actions`
2. Adicionar comentário: "✅ GitHub Actions configurado e testado"

---

**Última atualização:** 2025-12-03

