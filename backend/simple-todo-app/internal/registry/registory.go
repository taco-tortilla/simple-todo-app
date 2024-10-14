package registry

import (
	domainRepository "github.com/taco-tortilla/simple-todo-app/internal/domain/repository"
	"github.com/taco-tortilla/simple-todo-app/internal/interface/handler"
	"github.com/taco-tortilla/simple-todo-app/internal/repository"
	"github.com/taco-tortilla/simple-todo-app/internal/usecase"
	"gorm.io/gorm"
)

type Registry struct {
	TasksRepository domainRepository.TasksRepository
	TasksUsecase    usecase.TasksUsecase
	TasksHandler    handler.TasksHandler
}

func NewRegistory(db *gorm.DB) *Registry {
	tasksRepo := repository.NewTaskrepository(db)
	tasksUsecase := usecase.NewTasksUsecase(tasksRepo)
	tasksHandler := handler.NewTasksHandler(tasksUsecase)

	return &Registry{
		TasksRepository: tasksRepo,
		TasksUsecase:    tasksUsecase,
		TasksHandler:    tasksHandler,
	}
}
