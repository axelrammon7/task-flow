import { useAuth } from "../contexts/AuthContext";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { KanbanBoard } from "../components/KanbanBoard";
import type { Route } from "./+types/project.$id";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `Projeto ${params.id} - Task Flow` },
    { name: "description", content: `Detalhes do projeto ${params.id}` },
  ];
}

function ProjectContent({ params }: { params: { id: string } }) {
  const { user } = useAuth();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Sistema de Vendas
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
            Desenvolvimento de um sistema completo para gestão de vendas online com funcionalidades de catálogo, carrinho de compras, processamento de pagamentos e painel administrativo.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">8</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Tarefas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">1</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Concluídas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">2</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Em Progresso</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Kanban Board
          </h2>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200">
            + Nova Tarefa
          </button>
        </div>
        
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
