# 🔑 Deploy Key: FlowCloser Agent

## 📋 Metadados

| Campo | Valor |
|-------|-------|
| **Nome** | `flowcloser-deploy` |
| **Tipo** | Deploy Key (SSH) |
| **Plataforma** | GitHub |
| **Repositório** | `kauntdewn1/flowcloser-agent` |
| **Criada em** | 2025-12-03 |
| **Status** | ✅ Ativa |

---

## 🔐 Detalhes Técnicos

- **Algoritmo:** `ed25519`
- **Chave pública:** `~/.ssh/id_ed25519_kauntdewn1.pub`
- **Chave privada:** `~/.ssh/id_ed25519_kauntdewn1` (com passphrase)
- **Permissões:** Read/Write (se habilitado no GitHub)

---

## 📍 Configuração SSH

```ssh-config
Host github.com-kauntdewn1
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_kauntdewn1
  IdentitiesOnly yes
```

---

## ✅ Verificação

```bash
# Testar conexão
ssh -T git@github.com-kauntdewn1

# Verificar chave no agent
ssh-add -l | grep kauntdewn1
```

---

## 🎯 Uso

**Para desenvolvimento local:**
- Atualmente usando HTTPS (mais simples)
- SSH disponível via `github.com-kauntdewn1` host

**Para CI/CD (Railway, etc):**
- Deploy key configurada no GitHub
- Pronta para uso em pipelines automatizados

---

## 🔄 Rotação

- **Próxima rotação:** Quando necessário
- **Última rotação:** N/A (chave inicial)

---

## 📝 Notas

- Chave tem passphrase para segurança adicional
- Configurada no GitHub como deploy key com write access
- Compatível com workflow de PRs protegidos

