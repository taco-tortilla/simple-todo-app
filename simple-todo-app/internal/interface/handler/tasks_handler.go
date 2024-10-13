package handler

import (
	"encoding/json"
	"net/http"

	"github.com/taco-tortilla/simple-todo-app/internal/usecase"
)

type TasksHandler struct {
	TasksUsecase usecase.TasksUsecase
}

func NewTasksHandler(tasksUsecase usecase.TasksUsecase) TasksHandler {
	return TasksHandler{
		TasksUsecase: tasksUsecase,
	}
}

func (h *TasksHandler) GetAllTasksHandler(w http.ResponseWriter, r *http.Request) {
	tasks, err := h.TasksUsecase.GetAll()
	if err != nil {
		http.Error(w, "Error fetching tasks", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(tasks)
}
