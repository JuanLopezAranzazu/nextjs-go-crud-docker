package main

import (
	"log"
	"net/http"

	"github.com/JuanLopezAranzazu/backend/db"
	"github.com/JuanLopezAranzazu/backend/models"
	"github.com/JuanLopezAranzazu/backend/routes"
	"github.com/gorilla/mux"
)

func main() {
	// conexion con la base de datos
	db.DBConnection()
	// migraciones de las tablas
	if err := db.DB.AutoMigrate(models.Task{}); err != nil {
		log.Fatal("Error en migración de tablas: ", err)
	}
	// manejar rutas
	r := mux.NewRouter()
	// index
	r.HandleFunc("/", routes.HomeHandler)

	// iniciar servidor
	log.Println("Servidor iniciado en http://localhost:8000")
	if err := http.ListenAndServe(":8000", r); err != nil {
		log.Fatal("Error al iniciar el servidor: ", err)
	}
}
