package usecase

import (
	"github.com/taco-tortilla/simple-todo-app/internal/domain/model"
	"github.com/taco-tortilla/simple-todo-app/internal/domain/repository"
)

type TasksUsecase interface {
	GetAll() ([]model.Tasks, error)
	GetByID(id uint) (*model.Tasks, error)
}

type TasksUsecaseImpl struct {
	TasksRepository repository.TasksRepository
}

func NewTasksUsecase(repo repository.TasksRepository) TasksUsecase {
	return &TasksUsecaseImpl{
		TasksRepository: repo,
	}
}

func (i *TasksUsecaseImpl) GetAll() ([]model.Tasks, error) {
	return i.TasksRepository.GetAll()
}

func (i *TasksUsecaseImpl) GetByID(id uint) (*model.Tasks, error) {
	return i.TasksRepository.GetByID(id)
}
