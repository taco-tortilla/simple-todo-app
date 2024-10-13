package usecase

import (
	"github.com/taco-tortilla/simple-todo-app/internal/domain/model"
	"github.com/taco-tortilla/simple-todo-app/internal/domain/repository"
)

type TasksUsecase interface {
	GetAll() ([]model.Tasks, error)
	GetByID(id uint) (*model.Tasks, error)
	Create(task *model.Tasks) error
	Update(id uint, task *model.Tasks) error
	Delete(id uint) error
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

func (i *TasksUsecaseImpl) Create(task *model.Tasks) error {
	return i.TasksRepository.Create(task)
}

func (i *TasksUsecaseImpl) Update(id uint, task *model.Tasks) error {
	return i.TasksRepository.Update(id, task)
}

func (i *TasksUsecaseImpl) Delete(id uint) error {
	return i.TasksRepository.Delete(id)
}
