export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee?: string;
  createdAt: string;
  updatedAt: string;
  projectId: string;
}

export interface KanbanColumn {
  id: string;
  title: string;
  status: Task['status'];
  color: string;
}

export const KANBAN_COLUMNS: KanbanColumn[] = [
  {
    id: 'todo',
    title: 'A Fazer',
    status: 'todo',
    color: 'bg-gray-100 dark:bg-gray-700'
  },
  {
    id: 'in-progress',
    title: 'Fazendo',
    status: 'in-progress',
    color: 'bg-blue-100 dark:bg-blue-900'
  },
  {
    id: 'review',
    title: 'Review',
    status: 'review',
    color: 'bg-yellow-100 dark:bg-yellow-900'
  },
  {
    id: 'done',
    title: 'Concluído',
    status: 'done',
    color: 'bg-green-100 dark:bg-green-900'
  }
];
