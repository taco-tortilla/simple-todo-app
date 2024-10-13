package response

import (
	"time"

	"github.com/taco-tortilla/simple-todo-app/internal/domain/model"
)

type TasksResponse struct {
	ID          uint       `json:"id"`
	Title       string     `json:"title"`
	Description string     `json:"description"`
	IsDone      bool       `json:"isDone"`
	DeadlineAt  *time.Time `json:"deadlineAt"`
	CreatedAt   time.Time  `json:"createdAt"`
	UpdatedAt   time.Time  `json:"updatedAt"`
}

func ConvertTasksToResponse(tasks []model.Tasks) []TasksResponse {
	var res []TasksResponse
	for _, task := range tasks {
		res = append(res, TasksResponse{
			ID:          task.ID,
			Title:       task.Title,
			Description: task.Description,
			IsDone:      task.IsDone,
			DeadlineAt:  task.DeadlineAt,
			CreatedAt:   task.CreatedAt,
			UpdatedAt:   task.UpdatedAt,
		})
	}
	return res
}
