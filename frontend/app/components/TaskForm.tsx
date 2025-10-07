"use client";

import {
  Dialog,
  Button,
  Flex,
  TextField,
  TextArea,
  Switch,
  Text,
} from "@radix-ui/themes";
import { useState, useEffect } from "react";
import { TaskFormData } from "../types/Task";

type TaskFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (task: TaskFormData) => Promise<void>;
  initialData?: TaskFormData | null;
};

export default function TaskForm({
  open,
  onOpenChange,
  onSubmit,
  initialData,
}: TaskFormProps) {
  const [task, setTask] = useState<TaskFormData>({
    title: "",
    description: "",
    completed: false,
  });

  useEffect(() => {
    if (initialData) {
      setTask(initialData);
    } else {
      setTask({ title: "", description: "", completed: false });
    }
  }, [initialData, open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(task);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>
          {initialData ? "Editar Tarea" : "Crear Nueva Tarea"}
        </Dialog.Title>
        <Dialog.Description size="2" mb="4">
          {initialData
            ? "Modifica los datos de la tarea seleccionada."
            : "Completa los datos para crear una nueva tarea."}
        </Dialog.Description>

        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="medium">
                Título
              </Text>
              <TextField.Root
                name="title"
                value={task.title}
                onChange={handleChange}
                required
                placeholder="Ej: Aprender Go"
              />
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="medium">
                Descripción
              </Text>
              <TextArea
                name="description"
                value={task.description}
                onChange={handleChange}
                placeholder="Ej: Completar tutorial de Go y practicar con proyectos"
              />
            </label>

            <Flex align="center" gap="2" mt="2">
              <Switch
                checked={task.completed}
                onCheckedChange={(checked) =>
                  setTask((prev) => ({ ...prev, completed: checked }))
                }
              />
              <Text>Completada</Text>
            </Flex>

            <Flex justify="end" gap="3" mt="4">
              <Dialog.Close>
                <Button variant="soft" color="gray">
                  Cancelar
                </Button>
              </Dialog.Close>
              <Button type="submit" color="blue">
                {initialData ? "Actualizar" : "Crear"}
              </Button>
            </Flex>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
