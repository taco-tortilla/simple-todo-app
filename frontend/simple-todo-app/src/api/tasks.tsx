import useSWR from "swr";
import { deleteTask, getTasks, postTask, putTask } from "./core/fetcher";
import { Task } from "../types/task";
import useSWRMutation from "swr/mutation";

export function useGetTask(id: string) {
  const { data, error, mutate } = useSWR<Task[]>(`/tasks/${id}`, getTasks, {
    suspense: true,
  });

  return {
    tasks: data,
    isError: error,
    mutate,
  };
}

export function usePutTask(id: string) {
  const { trigger } = useSWRMutation(`/tasks/${id}`, putTask);

  return {
    trigger,
  };
}

export function usePostTask() {
  const { trigger } = useSWRMutation(`/tasks`, postTask);

  return {
    trigger,
  };
}

export function useDeleteTask(id: string) {
  const { trigger } = useSWRMutation(`/tasks/${id}`, deleteTask);

  return {
    trigger,
  };
}
