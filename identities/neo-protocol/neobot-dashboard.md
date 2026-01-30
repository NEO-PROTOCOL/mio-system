# 🔑 interface: neobot-dashboard

## 📋 Metadados

| Campo | Valor |
|-------|-------|
| **Nome** | `neobot-dashboard` |
| **Tipo** | interface |
| **Plataforma** | neo-protocol |
| **Função** | Operations Dashboard |
| **Criada em** | 2026-01-30 |
| **Status** | 🟢 Ativo |

---

## 🔐 Detalhes Técnicos

### Stack
- **Framework:** HTML5 + Vanilla JS
- **UI:** Bento Grid + Glassmorphism
- **Icons:** Font Awesome
- **Deploy:** Serve (local)

### Arquitetura
- **Camada:** 5 - Interação & Apps (NEØ Protocol)
- **Local:** `/Users/nettomello/CODIGOS/neobot/dashboard/`
- **URL:** http://localhost:3003 (local)

### Permissões
- ✅ **Read:** Health status, Ledger logs, Work logs
- ✅ **Write:** Trigger skills, Config updates
- ✅ **Execute:** Manual commands, System diagnostics

### Funcionalidades
- System health dashboard
- Skill execution logs
- Work log visualization
- Quick actions (Telegram, WhatsApp, Factory)
- Visual status indicators

---

## ✅ Verificação

```bash
# Start dashboard
cd /Users/nettomello/CODIGOS/neobot/dashboard
npx serve -p 3003

# Open browser
open http://localhost:3003
```

---

## 📝 Notas

- Dashboard simples e efetivo
- Bento Grid design
- Integra com Neobot skills
- Planejado merge com neo-agent-dashboard (unified dashboard)
