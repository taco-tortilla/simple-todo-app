package infrastructure

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/taco-tortilla/simple-todo-app/internal/interface/middlewares"
	"github.com/taco-tortilla/simple-todo-app/internal/registry"
)

func SetUpRouter(reg *registry.Registry) http.Handler {

	r := chi.NewRouter()
	r.Use(middlewares.Cors)
	r.Use(middlewares.LoggingMiddleware)
	r.Route("/tasks", func(r chi.Router) {
		r.Get("/", reg.TasksHandler.GetAllTasksHandler)
		r.Post("/", reg.TasksHandler.CreateHandler)

		r.Route("/{taskID}", func(r chi.Router) {
			r.Get("/", reg.TasksHandler.GetTaskByIDHandler)
			r.Put("/", reg.TasksHandler.UpdateHandler)
			r.Delete("/", reg.TasksHandler.DeleteHandler)
		})
	})

	return r
}
