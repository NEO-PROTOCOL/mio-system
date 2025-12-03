# ⚡ Quick Start - Sistema MIO

## 🚀 Criar Novo Repositório GitHub

### Opção 1: Script Automatizado (Recomendado)

```bash
# No diretório do projeto atual
cd /Users/nettomello/CODIGOS/bots_ia/flowcloser_adk-ts

# Executar script de setup
./infra/identities/scripts/setup-new-repo.sh --private

# Ou público
./infra/identities/scripts/setup-new-repo.sh --public
```

O script irá:
1. ✅ Criar diretório `mio-system` no mesmo nível
2. ✅ Copiar toda estrutura MIO
3. ✅ Criar README, .gitignore, templates
4. ✅ Criar repositório no GitHub
5. ✅ Fazer primeiro commit e push

### Opção 2: Manual

Siga o guia completo em [SETUP_NOVO_REPO.md](./SETUP_NOVO_REPO.md)

---

## 📋 Comandos Essenciais

### Registrar Nova Identidade

```bash
./scripts/register-identity.sh {tipo} {nome} {plataforma}

# Exemplo:
./scripts/register-identity.sh deploy-key vercel-deploy vercel
```

### Listar Todas Identidades

```bash
./scripts/list-identities.sh
```

### Validar Acesso

```bash
./scripts/validate-access.sh

# Com verbose
./scripts/validate-access.sh --verbose
```

### Criar PR

```bash
./scripts/create-pr.sh "Título do PR" "Descrição detalhada" [branch]
```

---

## 🗺️ Navegação da Documentação

1. **Comece aqui:** [SISTEMA_MIO.md](./SISTEMA_MIO.md) - Visão geral
2. **Veja o mapa:** [MAPA_MIO.md](./MAPA_MIO.md) - Painel operativo
3. **Índice completo:** [CATALOGO.md](./CATALOGO.md) - Todas identidades
4. **Criar repo:** [SETUP_NOVO_REPO.md](./SETUP_NOVO_REPO.md) - Guia completo

---

## 🎯 Fluxo de Trabalho Típico

```mermaid
graph LR
    A[Novo Agente Identificado] --> B[register-identity.sh]
    B --> C[Preencher Template]
    C --> D[Atualizar MAPA_MIO.md]
    D --> E[validate-access.sh]
    E --> F[Commit + PR]
```

---

## ✅ Checklist Rápido

- [ ] Repositório criado (`mio-system`)
- [ ] GitHub Project configurado
- [ ] Identidades existentes migradas
- [ ] Scripts testados
- [ ] GitHub Actions funcionando
- [ ] Documentação atualizada

---

**Última atualização:** 2025-12-03

