package infrastructure

import (
	"github.com/taco-tortilla/simple-todo-app/internal/domain/model"
	"gorm.io/gorm"
)

func SyncDB(db *gorm.DB) {
	db.AutoMigrate(&model.Tasks{}, &model.Categories{}, &model.TasksCategories{})
}
