import { create } from 'zustand';
import type { Task } from '../types/task';

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  fetchTasks: (projectId: string) => Promise<void>;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  moveTask: (taskId: string, newStatus: Task['status']) => void;
  deleteTask: (id: string) => void;
}

// Dados mock para demonstração
const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Configurar ambiente de desenvolvimento',
    description: 'Instalar dependências e configurar o ambiente local',
    status: 'done',
    priority: 'high',
    assignee: 'João Silva',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-16T14:30:00Z',
    projectId: '1'
  },
  {
    id: '2',
    title: 'Criar layout responsivo',
    description: 'Desenvolver interface responsiva para mobile e desktop',
    status: 'in-progress',
    priority: 'high',
    assignee: 'Maria Santos',
    createdAt: '2024-01-16T09:15:00Z',
    updatedAt: '2024-01-20T16:45:00Z',
    projectId: '1'
  },
  {
    id: '3',
    title: 'Implementar autenticação',
    description: 'Sistema de login e registro de usuários',
    status: 'in-progress',
    priority: 'medium',
    assignee: 'Pedro Costa',
    createdAt: '2024-01-17T11:20:00Z',
    updatedAt: '2024-01-21T08:15:00Z',
    projectId: '1'
  },
  {
    id: '4',
    title: 'Criar API de usuários',
    description: 'Endpoints para CRUD de usuários',
    status: 'review',
    priority: 'medium',
    assignee: 'Ana Oliveira',
    createdAt: '2024-01-18T13:30:00Z',
    updatedAt: '2024-01-22T10:20:00Z',
    projectId: '1'
  },
  {
    id: '5',
    title: 'Configurar banco de dados',
    description: 'Setup do PostgreSQL e migrações',
    status: 'todo',
    priority: 'high',
    assignee: 'Carlos Lima',
    createdAt: '2024-01-19T15:45:00Z',
    updatedAt: '2024-01-19T15:45:00Z',
    projectId: '1'
  },
  {
    id: '6',
    title: 'Implementar testes unitários',
    description: 'Criar testes para as principais funcionalidades',
    status: 'todo',
    priority: 'medium',
    assignee: 'Lucia Ferreira',
    createdAt: '2024-01-20T12:10:00Z',
    updatedAt: '2024-01-20T12:10:00Z',
    projectId: '1'
  },
  {
    id: '7',
    title: 'Documentar API',
    description: 'Criar documentação completa da API',
    status: 'todo',
    priority: 'low',
    assignee: 'Roberto Alves',
    createdAt: '2024-01-21T14:20:00Z',
    updatedAt: '2024-01-21T14:20:00Z',
    projectId: '1'
  },
  {
    id: '8',
    title: 'Deploy em produção',
    description: 'Configurar CI/CD e fazer deploy',
    status: 'todo',
    priority: 'high',
    assignee: 'Fernanda Rocha',
    createdAt: '2024-01-22T09:30:00Z',
    updatedAt: '2024-01-22T09:30:00Z',
    projectId: '1'
  }
];

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  isLoading: false,
  error: null,

  fetchTasks: async (projectId: string) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simula uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Filtra tarefas do projeto (mock)
      const projectTasks = mockTasks.filter(task => task.projectId === projectId);
      set({ tasks: projectTasks, isLoading: false });
    } catch (error) {
      set({ 
        error: 'Erro ao carregar tarefas', 
        isLoading: false 
      });
    }
  },

  addTask: (taskData) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    set(state => ({
      tasks: [...state.tasks, newTask]
    }));
  },

  updateTask: (id, updates) => {
    set(state => ({
      tasks: state.tasks.map(task =>
        task.id === id
          ? { ...task, ...updates, updatedAt: new Date().toISOString() }
          : task
      )
    }));
  },

  moveTask: (taskId, newStatus) => {
    set(state => ({
      tasks: state.tasks.map(task =>
        task.id === taskId
          ? { ...task, status: newStatus, updatedAt: new Date().toISOString() }
          : task
      )
    }));
  },

  deleteTask: (id) => {
    set(state => ({
      tasks: state.tasks.filter(task => task.id !== id)
    }));
  }
}));
