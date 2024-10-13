package handler

import (
	"encoding/json"
	"errors"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
	"github.com/taco-tortilla/simple-todo-app/internal/domain/model"
	"github.com/taco-tortilla/simple-todo-app/internal/presentation/request"
	"github.com/taco-tortilla/simple-todo-app/internal/usecase"
	"gorm.io/gorm"
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

func (h *TasksHandler) GetTaskByIDHandler(w http.ResponseWriter, r *http.Request) {
	taskIDStr := chi.URLParam(r, "taskID")

	taskID, err := strconv.ParseUint(taskIDStr, 10, 32)
	if err != nil {
		http.Error(w, "Invalid task id", http.StatusBadRequest)
	}

	task, err := h.TasksUsecase.GetByID(uint(taskID))
	if err != nil {
		http.Error(w, "Error fetching tasks", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(task)
}

func (h *TasksHandler) CreateHandler(w http.ResponseWriter, r *http.Request) {
	var req request.CreateTaskRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Error request", http.StatusInternalServerError)
		return
	}

	task := model.Tasks{
		Title:       req.Title,
		Description: req.Description,
		IsDone:      req.IsDone,
		DeadlineAt:  req.DeadlineAt,
	}

	if err := h.TasksUsecase.Create(&task); err != nil {
		http.Error(w, "Error fetching tasks", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)

	json.NewEncoder(w).Encode(task)
}

func (h *TasksHandler) UpdateHandler(w http.ResponseWriter, r *http.Request) {
	taskIDStr := chi.URLParam(r, "taskID")

	taskID, err := strconv.ParseUint(taskIDStr, 10, 32)
	if err != nil {
		http.Error(w, "Invalid task id", http.StatusBadRequest)
	}

	var req request.UpdateTaskRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Error request", http.StatusInternalServerError)
		return
	}

	task := model.Tasks{
		Title:       req.Title,
		Description: req.Description,
		IsDone:      req.IsDone,
		DeadlineAt:  req.DeadlineAt,
	}

	if err := h.TasksUsecase.Update(uint(taskID), &task); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			http.Error(w, "Task not found", http.StatusNotFound)
			return
		}
		http.Error(w, "Error updating task", http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}

func (h *TasksHandler) DeleteHandler(w http.ResponseWriter, r *http.Request) {
	taskIDStr := chi.URLParam(r, "taskID")

	taskID, err := strconv.ParseUint(taskIDStr, 10, 32)
	if err != nil {
		http.Error(w, "Invalid task id", http.StatusBadRequest)
	}

	if err := h.TasksUsecase.Delete(uint(taskID)); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			http.Error(w, "Task not found", http.StatusNotFound)
			return
		}
		http.Error(w, "Error fetching tasks", http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}
