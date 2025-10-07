package routes

import (
	"github.com/JuanLopezAranzazu/backend/controllers"
	"github.com/gorilla/mux"
)

// rutas para tareas
func TaskRoutes(r *mux.Router) {
	api := r.PathPrefix("/tasks").Subrouter()

	api.HandleFunc("/paginated", controllers.GetTasksPaginated).Methods("GET")
	api.HandleFunc("", controllers.GetTasks).Methods("GET")
	api.HandleFunc("/{id}", controllers.GetTask).Methods("GET")
	api.HandleFunc("", controllers.CreateTask).Methods("POST")
	api.HandleFunc("/{id}", controllers.UpdateTask).Methods("PUT")
	api.HandleFunc("/{id}", controllers.DeleteTask).Methods("DELETE")
}
