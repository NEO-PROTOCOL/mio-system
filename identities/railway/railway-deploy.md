# 🚂 Railway - Deploy Configuration

## 📋 Metadados

| Campo | Valor |
|-------|-------|
| **Nome** | `railway-production` |
| **Tipo** | Platform Deploy |
| **Plataforma** | Railway |
| **Projeto** | `flowcloser-agent-production` |
| **Status** | ✅ Ativo |

---

## 🔐 Autenticação

Railway usa:
- **GitHub Integration:** OAuth via GitHub
- **Deploy Key:** Usa deploy key do repositório
- **Environment Variables:** Configuradas no dashboard

---

## 📍 Configuração Atual

- **Repositório:** `kauntdewn1/flowcloser-agent`
- **Branch:** `main` (auto-deploy)
- **Runtime:** Node.js 20
- **Build Command:** `npm run build`
- **Start Command:** `npm start`

---

## 🔄 Deploy Flow

1. **Push para `main`** → Railway detecta
2. **Build automático** → `npm install && npm run build`
3. **Deploy** → `npm start`
4. **Health Check** → `/health` endpoint

---

## 📝 Variáveis de Ambiente

Ver: `RAILWAY_CONFIG.md` ou `.env.example`

**Importante:** Variáveis sensíveis gerenciadas no Railway Dashboard.

---

## ✅ Verificação

```bash
# Status do deploy
curl https://flowcloser-agent-production.up.railway.app/health
```

---

## 🔄 Rotação

- **Deploy Key:** Gerenciada pelo Railway (automático)
- **Tokens:** Rotacionados via Railway Dashboard

