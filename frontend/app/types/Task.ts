export type Task = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
};

export type TaskFormData = {
  id?: number;
  title: string;
  description?: string;
  completed: boolean;
};

export type PaginatedResponse = {
  tasks: Task[];
  total: number;
};