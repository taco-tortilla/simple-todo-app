package repository

import (
	"time"

	"github.com/taco-tortilla/simple-todo-app/internal/domain/model"
	"gorm.io/gorm"
)

type TasksRepository struct {
	db *gorm.DB
}

func NewTaskrepository(db *gorm.DB) *TasksRepository {
	return &TasksRepository{db: db}
}

func (r *TasksRepository) GetAll(isDone *bool) ([]model.Tasks, error) {
	var tasks []model.Tasks
	query := r.db.Model(&tasks)

	if isDone != nil {
		query = query.Where("is_done = ?", *isDone)
	}

	if err := query.Debug().Order("is_done ASC, created_at DESC, id DESC").Find(&tasks).Error; err != nil {
		return nil, err
	}
	return tasks, nil
}

func (r *TasksRepository) GetByID(id uint) (*model.Tasks, error) {
	var task model.Tasks
	if err := r.db.First(&task, id).Error; err != nil {
		return nil, err
	}
	return &task, nil
}

func (r *TasksRepository) Create(task *model.Tasks) error {
	if err := r.db.Create(task).Error; err != nil {
		return err
	}
	return nil
}

func (r *TasksRepository) Update(id uint, task *model.Tasks) error {

	updateData := map[string]interface{}{
		"Title":       task.Title,
		"Description": task.Description,
		"IsDone":      task.IsDone,
		"DeadlineAt": task.DeadlineAt,
		"UpdatedAt":   time.Now(),
	}

	result := r.db.Model(task).Where("id = ?", id).Updates(updateData)
	if result.RowsAffected == 0 {
		return gorm.ErrRecordNotFound
	}
	return result.Error
}

func (r *TasksRepository) Delete(id uint) error {
	result := r.db.Delete(&model.Tasks{}, id)
	if result.RowsAffected == 0 {
		return gorm.ErrRecordNotFound
	}
	return result.Error
}
