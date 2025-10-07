"use client";

import { useEffect, useState } from "react";
import { Button, Flex, Heading } from "@radix-ui/themes";
import TaskTable from "./components/TaskTable";
import TaskForm from "./components/TaskForm";
import DeleteConfirmDialog from "./components/DeleteConfirmDialog";
import { Task, TaskFormData } from "./types/Task";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [open, setOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskFormData | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const fetchTasks = async () => {
    const res = await fetch(`${API_URL}/tasks`);
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (task: TaskFormData) => {
    const method = task.id ? "PUT" : "POST";
    const url = task.id ? `${API_URL}/tasks/${task.id}` : `${API_URL}/tasks`;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });

    fetchTasks();
    setEditingTask(null);
    setOpen(false);
  };

  const handleDeleteClick = (task: Task) => {
    setTaskToDelete(task);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (taskToDelete) {
      await fetch(`${API_URL}/tasks/${taskToDelete.id}`, {
        method: "DELETE",
      });
      fetchTasks();
      setDeleteDialogOpen(false);
      setTaskToDelete(null);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setEditingTask(null);
    }
  };

  const handleNewTask = () => {
    setEditingTask(null);
    setOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setOpen(true);
  };

  return (
    <Flex
      direction="column"
      align="center"
      className="min-h-screen py-10 gap-6"
    >
      <Flex justify="between" align="center" className="w-full max-w-4xl">
        <Heading size="7">Gestor de Tareas</Heading>
        <Button color="blue" onClick={handleNewTask}>
          Nueva Tarea
        </Button>
      </Flex>

      <TaskTable
        tasks={tasks}
        onEdit={handleEditTask}
        onDelete={handleDeleteClick}
      />

      <TaskForm
        open={open}
        onOpenChange={handleOpenChange}
        onSubmit={handleSubmit}
        initialData={editingTask}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        taskTitle={taskToDelete?.title || ""}
      />
    </Flex>
  );
}
