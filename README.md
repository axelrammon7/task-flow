# 📋 Task Flow - Sistema de Gerenciamento de Projetos

![Task Flow](https://img.shields.io/badge/Task%20Flow-v1.0.0-blue)
![React](https://img.shields.io/badge/React-18.x-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38bdf8)

Um sistema completo de gerenciamento de projetos com Kanban Board, desenvolvido com as mais modernas tecnologias web. Ideal para equipes que precisam organizar tarefas e acompanhar o progresso de projetos de forma visual e intuitiva.

## 🚀 Funcionalidades

### 🔐 Sistema de Autenticação
- **Login e Registro** com validação de formulários
- **Autenticação persistente** usando localStorage
- **Proteção de rotas** com redirecionamento automático
- **Interface responsiva** para desktop e mobile

### 📊 Dashboard Inteligente
- **Visão geral dos projetos** com estatísticas em tempo real
- **CRUD completo de projetos** (Criar, Ler, Atualizar, Excluir)
- **Modal intuitivo** para criação e edição de projetos
- **Filtros por usuário** e persistência de dados

### 📋 Kanban Board Interativo
- **4 colunas fixas**: A Fazer, Fazendo, Review, Concluído
- **Drag & Drop** com @dnd-kit para mover tarefas entre colunas
- **CRUD completo de tarefas** com modal de edição
- **Estatísticas dinâmicas** de progresso do projeto
- **Interface responsiva** que se adapta a diferentes telas

### 💾 Persistência de Dados
- **localStorage** para autenticação e dados dos projetos
- **Sincronização automática** entre abas do navegador
- **Recuperação de dados** ao recarregar a página
- **Filtros por usuário** mantidos entre sessões

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca principal para interface
- **TypeScript** - Tipagem estática para maior confiabilidade
- **React Router** - Roteamento client-side
- **TailwindCSS** - Framework CSS utilitário
- **Zustand** - Gerenciamento de estado global
- **@dnd-kit** - Biblioteca de drag & drop acessível

### Ferramentas de Desenvolvimento
- **Vite** - Build tool e dev server
- **ESLint** - Linting de código
- **Prettier** - Formatação de código
- **Docker** - Containerização para deploy

## 📦 Instalação e Configuração

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Git

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/task-flow.git
cd task-flow
```

### 2. Instale as dependências
```bash
npm install
# ou
yarn install
```

### 3. Execute o projeto em modo de desenvolvimento
```bash
npm run dev
# ou
yarn dev
```

### 4. Acesse a aplicação
Abra seu navegador em `http://localhost:5173`

## 📁 Estrutura do Projeto

```
task-flow/
├── app/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── KanbanBoard.tsx  # Board principal do Kanban
│   │   ├── ProjectModal.tsx # Modal para CRUD de projetos
│   │   └── ProtectedRoute.tsx # Proteção de rotas
│   ├── contexts/            # Contextos React
│   │   └── AuthContext.tsx  # Contexto de autenticação
│   ├── routes/              # Páginas da aplicação
│   │   ├── login.tsx        # Página de login
│   │   ├── register.tsx     # Página de registro
│   │   ├── dashboard.tsx    # Dashboard principal
│   │   └── project.$id.tsx  # Página do projeto
│   ├── stores/              # Stores Zustand
│   │   ├── projectStore.ts  # Estado dos projetos
│   │   └── taskStore.ts     # Estado das tarefas
│   ├── types/               # Definições TypeScript
│   │   ├── project.ts       # Interface do projeto
│   │   └── task.ts          # Interface da tarefa
│   ├── root.tsx             # Componente raiz
│   └── routes.ts            # Configuração de rotas
├── public/                  # Arquivos estáticos
├── Dockerfile              # Configuração Docker
├── package.json            # Dependências e scripts
├── tsconfig.json           # Configuração TypeScript
├── tailwind.config.js      # Configuração TailwindCSS
└── vite.config.ts          # Configuração Vite
```

## 🎯 Como Usar

### 1. **Primeiro Acesso**
- Acesse `http://localhost:5173`
- Crie uma conta ou faça login
- Você será redirecionado para o dashboard

### 2. **Gerenciando Projetos**
- Clique em "Novo Projeto" para criar um projeto
- Preencha nome e descrição
- Use os botões de editar/excluir nos cards dos projetos

### 3. **Usando o Kanban**
- Clique em "Acessar" em um projeto
- Visualize as estatísticas do projeto
- Arraste tarefas entre as colunas
- Clique no "+" para adicionar novas tarefas
- Edite tarefas clicando nelas

### 4. **Navegação**
- Use o menu superior para navegar
- O botão "Sair" desconecta da aplicação
- Dados são salvos automaticamente

## 🔧 Configurações Avançadas

### Personalizando Cores
Edite `tailwind.config.js` para personalizar o tema:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#your-color',
        secondary: '#your-color',
      }
    }
  }
}
```

### Adicionando Novas Colunas
Modifique `app/types/task.ts`:

```typescript
export const KANBAN_COLUMNS = [
  { id: 'todo', title: 'A Fazer', color: 'blue' },
  { id: 'in-progress', title: 'Fazendo', color: 'yellow' },
  { id: 'review', title: 'Review', color: 'orange' },
  { id: 'done', title: 'Concluído', color: 'green' },
  // Adicione novas colunas aqui
];
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

⭐ **Se este projeto te ajudou, considere dar uma estrela!** ⭐