package infrastructure

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/taco-tortilla/simple-todo-app/internal/interface/handler"
	"github.com/taco-tortilla/simple-todo-app/internal/interface/middlewares"
)

func SetUpRouter(tasksHandler handler.TasksHandler) http.Handler {

	r := chi.NewRouter()
	r.Use(middlewares.LoggingMiddleware)
	r.Route("/tasks", func(r chi.Router) {
		r.Get("/", tasksHandler.GetAllTasksHandler)
		// r.Post("/", handler.CreateTaskHandler)

		// r.Route("/{taskID}", func(r chi.Router) {
		// 	r.Get("/", handler.GetTaskByIDHandler)
		// 	r.Put("/", handler.UpdateTaskHandler)
		// 	r.Delete("/", handler.DeleteTaskHandler)
		// })
	})

	return r
}
