package main

import (
	"log"
	"net/http"

	"github.com/taco-tortilla/simple-todo-app/config"
	"github.com/taco-tortilla/simple-todo-app/internal/infrastructure"
	"github.com/taco-tortilla/simple-todo-app/internal/interface/handler"
	"github.com/taco-tortilla/simple-todo-app/internal/repository"
	"github.com/taco-tortilla/simple-todo-app/internal/usecase"
)

func main() {
	config.LoadEnv()
	db := infrastructure.ConnectDB()
	infrastructure.SyncDB(db)

	tasksRepo := repository.NewTaskrepository(db)
	tasksUsecase := usecase.NewTasksUsecase(tasksRepo)
	tasksHandler := handler.NewTasksHandler(tasksUsecase)

	r := infrastructure.SetUpRouter(tasksHandler)

	if err := http.ListenAndServe(":8080", r); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}

}
