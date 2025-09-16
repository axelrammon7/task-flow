import React from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
} from '@dnd-kit/core';
import type {
  DragEndEvent,
  DragStartEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useTaskStore } from '../stores/taskStore';
import { KANBAN_COLUMNS } from '../types/task';
import { TaskModal } from './TaskModal';
import type { Task } from '../types/task';

function TaskCard({ 
  task, 
  isDragging = false, 
  onEdit, 
  onDelete 
}: { 
  task: Task; 
  isDragging?: boolean;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}) {
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
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 p-4 mb-3 hover:shadow-md transition-shadow duration-200 ${
      isDragging ? 'opacity-50 rotate-2 scale-105' : ''
    }`}>
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
      
      <div className="flex items-center justify-between">
        {task.assignee && (
          <div className="flex items-center">
            <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">
              {task.assignee}
            </span>
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
              {task.assignee.charAt(0)}
            </div>
          </div>
        )}
        
        <div className="flex space-x-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task);
            }}
            className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            title="Editar tarefa"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
                onDelete(task.id);
              }
            }}
            className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
            title="Excluir tarefa"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function SortableTaskCard({ 
  task, 
  onEdit, 
  onDelete 
}: { 
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-grab active:cursor-grabbing"
    >
      <TaskCard 
        task={task} 
        isDragging={isDragging} 
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
}

function DroppableArea({ columnId }: { columnId: string }) {
  const { isOver, setNodeRef } = useDroppable({
    id: columnId,
  });

  return (
    <div
      ref={setNodeRef}
      className={`w-full min-h-32 rounded-lg border-2 border-dashed transition-colors duration-200 ${
        isOver
          ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20'
          : 'border-gray-300 dark:border-gray-600'
      }`}
    >
      <div className="flex items-center justify-center h-32 text-gray-500 dark:text-gray-400 text-sm">
        {isOver ? 'Solte a tarefa aqui' : 'Arraste uma tarefa para cá'}
      </div>
    </div>
  );
}

function KanbanColumn({ 
  column, 
  tasks, 
  onEdit, 
  onDelete 
}: { 
  column: any; 
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}) {
  const columnTasks = tasks.filter(task => task.status === column.status);
  const taskIds = columnTasks.map(task => task.id);

  return (
    <div className="w-full h-full flex flex-col">
      <div className={`${column.color} rounded-lg p-4 mb-4`}>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
          {column.title}
        </h3>
        <span className="text-sm text-gray-600 dark:text-gray-300">
          {columnTasks.length} tarefa{columnTasks.length !== 1 ? 's' : ''}
        </span>
      </div>
      
      <div className="flex-1 space-y-2 min-h-96">
        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
          {columnTasks.map((task) => (
            <SortableTaskCard 
              key={task.id} 
              task={task} 
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </SortableContext>
        
        {columnTasks.length === 0 && (
          <DroppableArea columnId={column.id} />
        )}
      </div>
    </div>
  );
}

export function KanbanBoard({ projectId }: { projectId: string }) {
  const { tasks, isLoading, error, fetchTasks, reorderTasks, deleteTask } = useTaskStore();
  const [activeTask, setActiveTask] = React.useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingTask, setEditingTask] = React.useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  React.useEffect(() => {
    fetchTasks(projectId);
  }, [projectId, fetchTasks]);

  const handleCreateTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks.find(t => t.id === active.id);
    setActiveTask(task || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const taskId = active.id as string;
    const overId = over.id as string;

    // Se está sendo solto em uma coluna (não em outra tarefa)
    const targetColumn = KANBAN_COLUMNS.find(col => col.id === overId);
    if (targetColumn) {
      const task = tasks.find(t => t.id === taskId);
      if (task && task.status !== targetColumn.status) {
        reorderTasks(taskId, targetColumn.status, 0);
      }
      return;
    }

    // Se está sendo solto em outra tarefa
    const targetTask = tasks.find(t => t.id === overId);
    if (targetTask) {
      const sourceTask = tasks.find(t => t.id === taskId);
      if (sourceTask && sourceTask.status !== targetTask.status) {
        const targetColumn = KANBAN_COLUMNS.find(col => col.status === targetTask.status);
        if (targetColumn) {
          const targetIndex = tasks
            .filter(t => t.status === targetTask.status)
            .findIndex(t => t.id === targetTask.id);
          reorderTasks(taskId, targetColumn.status, targetIndex);
        }
      }
    }
  };

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
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Kanban Board
        </h2>
        <button 
          onClick={handleCreateTask}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200"
        >
          + Nova Tarefa
        </button>
      </div>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-4">
          {KANBAN_COLUMNS.map((column) => (
            <div key={column.id} id={column.id} className="min-w-0">
              <KanbanColumn
                column={column}
                tasks={tasks}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            </div>
          ))}
        </div>
        
        <DragOverlay>
          {activeTask ? (
            <TaskCard 
              task={activeTask} 
              isDragging={true} 
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
          ) : null}
        </DragOverlay>
      </DndContext>

      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        task={editingTask}
        projectId={projectId}
      />
    </>
  );
}
