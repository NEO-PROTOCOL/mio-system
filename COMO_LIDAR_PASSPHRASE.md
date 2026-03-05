<!-- markdownlint-disable MD003 MD007 MD011 MD013 MD022 MD023 MD025 MD029 MD032 MD033 MD034 -->

```text
========================================
   NΞØ PROTOCOL · SSH PASSPHRASE GUIDE
========================================
```

Procedimentos para recuperação e gestão de chaves SSH com passphrase.

> **Category:** Infrastructure / Security
> **Target:** Local Dev Environment
> **Status:** 🟢 Operational

────────────────────────────────────────

## ❓ Situação: Passphrase Esquecida

Se a sua chave SSH configurada no `mio-system` possui uma passphrase que você não lembra, siga um dos protocolos abaixo.

```text
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃ OPTIONS MATRIX
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃
┃ 🛡️ Option 1: Skip SSH Validation
┃    └─ Use --skip-ssh flag
┃
┃ 🔑 Option 2: New Key (No Passphrase)
┃    └─ Generate and add to GitHub
┃
┃ 🔄 Option 3: Remove Passphrase
┃    └─ Requires knowing current one
┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

────────────────────────────────────────

## 🏗️ Protocolo: Opção 1 (Recomendado)

Pule a validação SSH e foque no GitHub CLI e Railway, que utilizam OAuth.

```bash
cd /Users/nettomello/neomello/NEO-PROTOCOL/mio-system
./identities/scripts/validate-access.sh --skip-ssh
```

────────────────────────────────────────

## 🛠️ Protocolo: Nova Chave (Opção 2)

Se a validação SSH for obrigatória para o seu workflow:

```bash
# 1. Gerar nova chave ed25519 (Vazio para sem passphrase)
ssh-keygen -t ed25519 -f ~/.ssh/id_mio_new -N ""

# 2. Registrar no GitHub (Deploy Keys)
cat ~/.ssh/id_mio_new.pub
```

────────────────────────────────────────

## 🔒 Security Note

Chaves sem passphrase são permitidas apenas em ambientes de desenvolvimento isolados e protegidos por criptografia de disco total (FileVault). Para produção, o uso de passphrase em chaves de deploy é **OBRIGATÓRIO**.

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
