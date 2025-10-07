"use client";

import { useEffect, useState } from "react";
import { Button, Flex, Heading } from "@radix-ui/themes";
import TaskTable from "./components/TaskTable";
import TaskForm from "./components/TaskForm";

type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  created_at?: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [open, setOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const fetchTasks = async () => {
    const res = await fetch(`${API_URL}/tasks`);
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (task: Task) => {
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

  const handleDelete = async (id: number) => {
    await fetch(`${API_URL}/tasks/${id}`, {
      method: "DELETE",
    });
    fetchTasks();
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
        onDelete={handleDelete}
      />

      <TaskForm
        open={open}
        onOpenChange={handleOpenChange}
        onSubmit={handleSubmit}
        initialData={editingTask}
      />
    </Flex>
  );
}
