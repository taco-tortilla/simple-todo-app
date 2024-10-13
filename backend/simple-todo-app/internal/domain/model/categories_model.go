package model

import "time"

type Categories struct {
	ID        uint `gorm:"primaryKey;autoIncrement:false"`
	CreatedAt time.Time
	UpdatedAt time.Time
}
