import { axiosBase } from "./axiosInstance";
import { UpdateTaskRequest } from "../requests/tasksRequest";

export const getTasks = async (url: string) =>
  await axiosBase.get(url).then((res) => res.data);

export const putTask = async (
  url: string,
  { arg }: { arg: UpdateTaskRequest }
) => {
  await axiosBase.put(url, arg);
};

export const postTask = async (
  url: string,
  { arg }: { arg: UpdateTaskRequest }
) => {
  await axiosBase.post(url, arg);
};

export const deleteTask = async (url: string) => {
  await axiosBase.post(url);
};
