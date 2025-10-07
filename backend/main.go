package main

import (
	"log"
	"net/http"

	"github.com/JuanLopezAranzazu/backend/db"
	"github.com/JuanLopezAranzazu/backend/models"
	"github.com/JuanLopezAranzazu/backend/routes"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
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

	// rutas para tareas
	routes.TaskRoutes(r)

	// configurar CORS
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	})

	// aplicar CORS al router
	handler := c.Handler(r)

	// iniciar servidor
	log.Println("Servidor iniciado en http://localhost:8000")
	if err := http.ListenAndServe(":8000", handler); err != nil {
		log.Fatal("Error al iniciar el servidor: ", err)
	}
}
