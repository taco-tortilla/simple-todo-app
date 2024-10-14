package main

import (
	"log"
	"net/http"

	"github.com/taco-tortilla/simple-todo-app/config"
	"github.com/taco-tortilla/simple-todo-app/internal/infrastructure"
	"github.com/taco-tortilla/simple-todo-app/internal/registry"
)

func main() {
	config.LoadEnv()
	db := infrastructure.ConnectDB()
	infrastructure.SyncDB(db)

	reg := registry.NewRegistory(db)

	r := infrastructure.SetUpRouter(reg)

	if err := http.ListenAndServe(":8080", r); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}

}
