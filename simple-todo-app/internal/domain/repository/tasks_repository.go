package repository

import "github.com/taco-tortilla/simple-todo-app/internal/domain/model"

type TasksRepository interface {
	GetAll() ([]model.Tasks, error)
	GetByID(id uint) (*model.Tasks, error)
	// Create(task *model.Tasks) error
	// Update(task *model.Tasks) error
	// Delete(id uint) error
}
