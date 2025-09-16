import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Project } from '../types/project';

interface ProjectState {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
  fetchProjects: (userId: string) => Promise<void>;
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
}

// Dados mock para demonstração
const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Sistema de Vendas',
    description: 'Desenvolvimento de um sistema completo para gestão de vendas online',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
    userId: 'user1'
  },
  {
    id: '2',
    name: 'App Mobile',
    description: 'Aplicativo móvel para iOS e Android com funcionalidades de geolocalização',
    createdAt: '2024-01-10T09:15:00Z',
    updatedAt: '2024-01-18T16:45:00Z',
    userId: 'user1'
  },
  {
    id: '3',
    name: 'Dashboard Analytics',
    description: 'Painel de controle com métricas e relatórios em tempo real',
    createdAt: '2024-01-05T11:20:00Z',
    updatedAt: '2024-01-22T08:15:00Z',
    userId: 'user1'
  },
  {
    id: '4',
    name: 'API REST',
    description: 'Desenvolvimento de API RESTful para integração com sistemas externos',
    createdAt: '2024-01-12T13:30:00Z',
    updatedAt: '2024-01-19T10:20:00Z',
    userId: 'user1'
  },
  {
    id: '5',
    name: 'Sistema de Pagamentos',
    description: 'Integração com gateways de pagamento e processamento de transações',
    createdAt: '2024-01-08T15:45:00Z',
    updatedAt: '2024-01-21T12:10:00Z',
    userId: 'user1'
  }
];

export const useProjectStore = create<ProjectState>()(
  persist(
    (set, get) => ({
      projects: [],
      isLoading: false,
      error: null,

      fetchProjects: async (userId: string) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simula uma chamada de API
          await new Promise(resolve => setTimeout(resolve, 800));
          
          // Se não há projetos salvos, usa os dados mock
          const currentProjects = get().projects;
          if (currentProjects.length === 0) {
            // Atribui os projetos mock ao usuário logado
            const userProjects = mockProjects.map(project => ({
              ...project,
              userId: userId
            }));
            set({ projects: userProjects, isLoading: false });
          } else {
            // Filtra projetos do usuário das tarefas salvas
            const userProjects = currentProjects.filter(project => project.userId === userId);
            set({ projects: userProjects, isLoading: false });
          }
        } catch (error) {
          set({ 
            error: 'Erro ao carregar projetos', 
            isLoading: false 
          });
        }
      },

  addProject: (projectData) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    set(state => ({
      projects: [...state.projects, newProject]
    }));
  },

  updateProject: (id, updates) => {
    set(state => ({
      projects: state.projects.map(project =>
        project.id === id
          ? { ...project, ...updates, updatedAt: new Date().toISOString() }
          : project
      )
    }));
  },

  deleteProject: (id) => {
    set(state => ({
      projects: state.projects.filter(project => project.id !== id)
    }));
  }
    }),
    {
      name: 'taskflow-projects',
      partialize: (state) => ({ projects: state.projects }),
    }
  )
);
