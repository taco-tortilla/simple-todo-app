package model

import (
	"time"
)

type Tasks struct {
	ID          uint   `gorm:"primaryKey"`
	Title       string `gorm:"not null"`
	Description string
	IsDone      bool
	DeadlineAt  *time.Time
	CreatedAt   time.Time
	UpdatedAt   time.Time
}
