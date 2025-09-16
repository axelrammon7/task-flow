import { useAuth } from "../contexts/AuthContext";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { KanbanBoard } from "../components/KanbanBoard";
import { useProjectStore } from "../stores/projectStore";
import { useTaskStore } from "../stores/taskStore";
import type { Route } from "./+types/project.$id";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `Projeto ${params.id} - Task Flow` },
    { name: "description", content: `Detalhes do projeto ${params.id}` },
  ];
}

function ProjectContent({ params }: { params: { id: string } }) {
  const { user } = useAuth();
  const { projects } = useProjectStore();
  const { tasks } = useTaskStore();
  
  // Busca o projeto atual
  const currentProject = projects.find(p => p.id === params.id);
  
  // Filtra tarefas do projeto atual
  const projectTasks = tasks.filter(task => task.projectId === params.id);
  
  // Calcula estatísticas dinâmicas
  const totalTasks = projectTasks.length;
  const completedTasks = projectTasks.filter(task => task.status === 'done').length;
  const inProgressTasks = projectTasks.filter(task => task.status === 'in-progress').length;
  const todoTasks = projectTasks.filter(task => task.status === 'todo').length;
  const reviewTasks = projectTasks.filter(task => task.status === 'review').length;
  
  // Calcula progresso percentual
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {currentProject?.name || `Projeto #${params.id}`}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Projeto #{params.id} • {user?.name}
          </p>
        </div>
        <a 
          href="/dashboard"
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition duration-200"
        >
          ← Voltar ao Dashboard
        </a>
      </div>
      
      <div className="mb-6">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Sobre o Projeto
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {currentProject?.description || 'Descrição do projeto não disponível.'}
          </p>
          
          {/* Barra de progresso */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Progresso do Projeto
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {progressPercentage}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
          
          {/* Estatísticas dinâmicas */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {totalTasks}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                {todoTasks}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">A Fazer</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {inProgressTasks}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Fazendo</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {reviewTasks}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Review</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {completedTasks}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Concluídas</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <KanbanBoard projectId={params.id} />
      </div>
    </div>
  );
}

export default function Project({ params }: { params: { id: string } }) {
  return (
    <ProtectedRoute>
      <ProjectContent params={params} />
    </ProtectedRoute>
  );
}
