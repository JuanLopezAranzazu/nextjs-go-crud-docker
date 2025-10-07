package controllers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/JuanLopezAranzazu/backend/db"
	"github.com/JuanLopezAranzazu/backend/models"
	"github.com/gorilla/mux"
)

// obtener todas las tareas
func GetTasks(w http.ResponseWriter, r *http.Request) {
	var tasks []models.Task
	db.DB.Find(&tasks)
	json.NewEncoder(w).Encode(tasks)
}

// obtener tarea por ID
func GetTask(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id, _ := strconv.Atoi(params["id"])
	var task models.Task
	if err := db.DB.First(&task, id).Error; err != nil {
		http.Error(w, "Tarea no encontrada", http.StatusNotFound)
		return
	}
	json.NewEncoder(w).Encode(task)
}

// crear nueva tarea
func CreateTask(w http.ResponseWriter, r *http.Request) {
	var task models.Task
	json.NewDecoder(r.Body).Decode(&task)
	db.DB.Create(&task)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(task)
}

// actualizar tarea
func UpdateTask(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id, _ := strconv.Atoi(params["id"])
	var task models.Task
	if err := db.DB.First(&task, id).Error; err != nil {
		http.Error(w, "Tarea no encontrada", http.StatusNotFound)
		return
	}
	json.NewDecoder(r.Body).Decode(&task)
	db.DB.Save(&task)
	json.NewEncoder(w).Encode(task)
}

// eliminar tarea
func DeleteTask(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id, _ := strconv.Atoi(params["id"])
	if err := db.DB.Delete(&models.Task{}, id).Error; err != nil {
		http.Error(w, "Tarea no encontrada", http.StatusNotFound)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}
