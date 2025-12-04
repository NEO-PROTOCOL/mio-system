# 🎯 Guia Prático: Interface GitHub Issues/Projects

## 📋 Visão Geral

A interface do GitHub Projects é similar ao Notion - você tem **cards (issues)** que podem ser movidos entre colunas (Todo, In Progress, Done).

---

## 🖼️ Elementos da Tela (da esquerda para direita)

### 1️⃣ **Painel Esquerdo - Project Board**

```
┌─────────────────────────┐
│ Todo (1)                │ ← Coluna de tarefas pendentes
│ ┌─────────────────────┐ │
│ │ mio-system #1       │ │ ← Card da Issue #1
│ │ Migrar identidades  │ │
│ └─────────────────────┘ │
└─────────────────────────┘

┌─────────────────────────┐
│ In Progress (0)         │ ← Coluna de tarefas em andamento
└─────────────────────────┘

┌─────────────────────────┐
│ Done (0)                │ ← Coluna de tarefas concluídas
└─────────────────────────┘
```

**Como usar:**
- **Arrastar e soltar:** Clique no card e arraste para outra coluna
- **Mover via menu:** Clique nos "..." do card → Move to → Escolha coluna

---

### 2️⃣ **Área Central - Detalhes da Issue**

#### 📝 **Checklist (Lista de Tarefas)**

Você vê duas checklists:

**Checklist 1: "Identidades a migrar:"**
```
☑️ GitHub Deploy Key (flowcloser-deploy) - Já migrada
☑️ Railway Deploy - Já migrada  
☑️ Cursor AI - Já migrada
```

**Checklist 2: "Próximos passos:"**
```
☑️ Validar todas identidades com validate-access.sh
☐ Atualizar MAPA_MIO.md com status atualizado
☐ Configurar GitHub Actions
☐ Ativar branch protection
```

**Como marcar/desmarcar:**
1. Clique diretamente na checkbox ☐ para marcar ☑️
2. Ou edite a issue e modifique o texto markdown

**Como editar a Issue:**
1. Clique no botão **"Edit"** (canto superior direito)
2. Modifique o texto markdown
3. Clique em **"Update comment"** ou **"Save"**

---

#### 💬 **Seção de Comentários**

**Como adicionar comentário:**
1. Role até a seção **"Add a comment"**
2. Digite seu comentário na caixa de texto
3. Use a barra de formatação para:
   - **Bold** (negrito)
   - *Italic* (itálico)
   - `Code` (código)
   - Links, listas, etc.
4. Clique em **"Comment"** para publicar

**Exemplo de comentário útil:**
```markdown
✅ Validação executada em 2025-12-03

- GitHub Deploy Key: ✅ OK
- Railway: ⏭️ CLI não instalado (opcional)
- Cursor: ✅ OK via GitHub CLI

Próximo passo: Atualizar MAPA_MIO.md
```

---

### 3️⃣ **Sidebar Direita - Metadados**

#### 📌 **Projects**
```
Projects
└─ Identidade Operacional System - Roadmap
   Status: Todo ▼
```

**Como mudar o status:**
1. Clique no dropdown **"Todo ▼"**
2. Escolha:
   - **Todo** - Tarefa não iniciada
   - **In Progress** - Em andamento
   - **Done** - Concluída

**Isso move o card automaticamente no board!**

---

#### 👤 **Assignees (Responsáveis)**
```
Assignees
└─ No one - Assign yourself
```

**Como atribuir a você:**
1. Clique em **"Assign yourself"**
2. Ou clique em **"No one"** → Digite seu username → Selecione

---

#### 🏷️ **Labels (Etiquetas)**
```
Labels
└─ No labels
```

**Como adicionar label:**
1. Clique em **"No labels"**
2. Digite o nome da label (ex: `identidade`, `documentação`)
3. Ou crie nova label clicando em **"+ New label"**

**Labels úteis para MIO:**
- `identidade` - Para novas identidades
- `documentação` - Para atualizações de docs
- `validação` - Para validações
- `configuração` - Para setup

---

#### 🔗 **Development (Desenvolvimento)**
```
Development
└─ Create a branch for this issue or link a pull request
```

**Como criar branch:**
1. Clique em **"Create a branch"**
2. Escolha o nome (ex: `update-mapa-mio`)
3. GitHub cria branch automaticamente
4. Você pode fazer commits e criar PR depois

---

## ✅ Passo a Passo: Completar Item 2 da Checklist

### **Item 2: "Atualizar MAPA_MIO.md com status atualizado"**

#### Opção A: Via Interface (Mais Fácil)

1. **Mover Issue para "In Progress":**
   - No sidebar direito, clique em **"Status: Todo ▼"**
   - Selecione **"In Progress"**
   - O card move automaticamente no board

2. **Adicionar comentário:**
   - Role até **"Add a comment"**
   - Digite:
   ```markdown
   🔄 Trabalhando em: Atualizar MAPA_MIO.md
   
   Vou marcar as identidades migradas como ✅ Ativas
   ```
   - Clique em **"Comment"**

3. **Criar branch (opcional):**
   - No sidebar, clique em **"Create a branch"**
   - Nome: `update-mapa-mio`
   - Isso cria branch para você trabalhar

4. **Fazer as mudanças:**
   - Edite `identities/MAPA_MIO.md` localmente
   - Commit e push
   - Criar PR

5. **Marcar checklist:**
   - Clique em **"Edit"** (topo da issue)
   - Marque a checkbox: `☑️ Atualizar MAPA_MIO.md...`
   - Clique em **"Update comment"**

6. **Mover para Done:**
   - Quando concluir, mude status para **"Done"**

---

#### Opção B: Via Terminal + Interface

```bash
# 1. Criar branch
cd /Users/nettomello/CODIGOS/bots_ia/mio-system
git checkout -b update-mapa-mio

# 2. Editar MAPA_MIO.md
# (edite o arquivo)

# 3. Commit e push
git add identities/MAPA_MIO.md
git commit -m "docs: atualiza MAPA_MIO.md com status das identidades migradas"
git push origin update-mapa-mio

# 4. Criar PR via script
./scripts/create-pr.sh "docs: Atualizar MAPA_MIO.md" "Atualiza status das identidades migradas"
```

Depois na interface:
- Marque a checkbox na Issue
- Adicione comentário: "✅ MAPA_MIO.md atualizado via PR #X"

---

## 🎨 Dicas de Uso

### **Workflow Recomendado:**

```
1. Criar Issue → Status: Todo
   ↓
2. Começar trabalho → Status: In Progress
   ↓
3. Criar branch → Trabalhar → PR
   ↓
4. PR aprovado → Status: Done
```

### **Comentários Úteis:**

- **Início:** "🔄 Iniciando trabalho em [tarefa]"
- **Progresso:** "⏳ Trabalhando em [detalhes]"
- **Conclusão:** "✅ Concluído! PR #X criado"

### **Labels Recomendadas:**

- `prioridade-alta` / `prioridade-media` / `prioridade-baixa`
- `tipo-identidade` / `tipo-documentacao` / `tipo-configuracao`
- `status-migrado` / `status-pendente`

---

## 🔄 Movendo Cards no Board

### **Método 1: Arrastar e Soltar**
1. No painel esquerdo, clique no card
2. Arraste para outra coluna
3. Solte

### **Método 2: Via Issue**
1. Abra a issue
2. No sidebar, mude o **Status**
3. O card move automaticamente

### **Método 3: Via Menu do Card**
1. No card, clique nos **"..."** (três pontos)
2. **Move to** → Escolha coluna

---

## 📊 Visualizando o Progresso

O board mostra visualmente:
- **Todo:** O que precisa ser feito
- **In Progress:** O que está sendo feito agora
- **Done:** O que já foi concluído

**Dica:** Use isso como dashboard do seu progresso!

---

## 🚀 Próximos Passos Práticos

### **Agora mesmo:**

1. ✅ **Mover Issue para "In Progress"**
   - Sidebar direito → Status → "In Progress"

2. ✅ **Adicionar comentário**
   - "🔄 Trabalhando em: Atualizar MAPA_MIO.md"

3. ✅ **Criar branch**
   - Sidebar → "Create a branch" → `update-mapa-mio`

4. ✅ **Editar MAPA_MIO.md**
   - Marcar identidades como ✅ Ativas
   - Atualizar estatísticas

5. ✅ **Commit, push e PR**
   - Depois marcar checkbox na Issue

---

**Última atualização:** 2025-12-03

