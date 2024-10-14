export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  isDone: boolean;
  deadlineat?: string | null;
}
