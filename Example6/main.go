package main

import (
	"fmt"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type car struct {
	ID       int64
	Brand    string
	MaxSpeed int64
	FuelType string
}

func main() {
	dsn := "host=localhost port=5432 user=postgres password=postgres dbname=postgres sslmode=disable"
	db, err := gorm.Open(postgres.Open(dsn))
	if err != nil {
		panic(err)
	}
	sqlDb, err := db.DB()
	if err != nil {
		panic(err)
	}
	if err := sqlDb.Ping(); err != nil {
		panic(err)
	}
	db.AutoMigrate(&car{})
	db.Create([]*car{
		{Brand: "Ferrari", MaxSpeed: 250, FuelType: "gasoline"},
		{Brand: "FIAT", MaxSpeed: 180, FuelType: "gasoline"},
	})
	var cars []car
	if err := db.Model(&car{}).Find(&cars).Error; err != nil {
		panic(err)
	}
	for _, v := range cars {
		fmt.Println(v)
	}
}
