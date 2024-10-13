package model

type TasksCategories struct {
	TasksID      uint `gorm:"primaryKey;autoIncrement:false"`
	CategoriesID uint `gorm:"primaryKey;autoIncrement:false"`
}
