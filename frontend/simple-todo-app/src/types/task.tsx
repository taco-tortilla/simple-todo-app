export interface Task {
  id: number;
  title: string;
  description: string;
  isDone: boolean;
  deadlineAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskForm {
  title: string;
  description: string;
  isDone: boolean;
  deadlineDate: string;
}
