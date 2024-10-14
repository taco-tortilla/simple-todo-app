package request

import "time"

type CreateTaskRequest struct {
	Title       string     `json:"title"`
	Description string     `json:"description"`
	IsDone      bool       `json:"isDone,omitempty"`
	DeadlineAt  *time.Time `json:"deadlineAt,omitempty"`
}

type UpdateTaskRequest struct {
	Title       string     `json:"title,omitempty"`
	Description string     `json:"description,omitempty"`
	IsDone      bool       `json:"isDone"`
	DeadlineAt  *time.Time `json:"deadlineAt,omitempty"`
	UpdatedAt   *time.Time `json:"updateAt"`
}
