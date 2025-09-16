import React from 'react';
import { useTaskStore } from '../stores/taskStore';
import { KANBAN_COLUMNS } from '../types/task';
import type { Task } from '../types/task';

function TaskCard({ task }: { task: Task }) {
  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getPriorityText = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'Alta';
      case 'medium':
        return 'Média';
      case 'low':
        return 'Baixa';
      default:
        return priority;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 p-4 mb-3 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-gray-900 dark:text-white text-sm">
          {task.title}
        </h4>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
          {getPriorityText(task.priority)}
        </span>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 text-xs mb-3 line-clamp-2">
        {task.description}
      </p>
      
      {task.assignee && (
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {task.assignee}
          </span>
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
            {task.assignee.charAt(0)}
          </div>
        </div>
      )}
    </div>
  );
}

function KanbanColumn({ column, tasks }: { column: any; tasks: Task[] }) {
  const columnTasks = tasks.filter(task => task.status === column.status);

  return (
    <div className="flex-1 min-w-0">
      <div className={`${column.color} rounded-lg p-4 mb-4`}>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
          {column.title}
        </h3>
        <span className="text-sm text-gray-600 dark:text-gray-300">
          {columnTasks.length} tarefa{columnTasks.length !== 1 ? 's' : ''}
        </span>
      </div>
      
      <div className="space-y-2 min-h-96">
        {columnTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        
        {columnTasks.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
            Nenhuma tarefa
          </div>
        )}
      </div>
    </div>
  );
}

export function KanbanBoard({ projectId }: { projectId: string }) {
  const { tasks, isLoading, error, fetchTasks } = useTaskStore();

  React.useEffect(() => {
    fetchTasks(projectId);
  }, [projectId, fetchTasks]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Carregando tarefas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded-md">
        {error}
      </div>
    );
  }

  return (
    <div className="flex gap-6 overflow-x-auto pb-4">
      {KANBAN_COLUMNS.map((column) => (
        <KanbanColumn
          key={column.id}
          column={column}
          tasks={tasks}
        />
      ))}
    </div>
  );
}
