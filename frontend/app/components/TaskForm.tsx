"use client";

import {
  Dialog,
  Button,
  Flex,
  TextField,
  TextArea,
  Switch,
  Text,
  Callout,
} from "@radix-ui/themes";
import { useState, useEffect } from "react";
import { TaskFormData } from "../types/Task";
import { InfoCircledIcon } from "@radix-ui/react-icons";

type TaskFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (task: TaskFormData) => Promise<void>;
  initialData?: TaskFormData | null;
};

type FormErrors = {
  title?: string;
  description?: string;
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

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTask(initialData);
    } else {
      setTask({ title: "", description: "", completed: false });
    }
    
    setErrors({});
  }, [initialData, open]);

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "title":
        if (!value.trim()) {
          return "El título es obligatorio";
        }
        if (value.trim().length < 3) {
          return "El título debe tener al menos 3 caracteres";
        }
        if (value.length > 100) {
          return "El título no puede exceder 100 caracteres";
        }
        break;
      case "description":
        if (value.length > 500) {
          return "La descripción no puede exceder 500 caracteres";
        }
        break;
    }
    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const titleError = validateField("title", task.title);
    if (titleError) newErrors.title = titleError;

    const descriptionError = validateField("description", task.description || "");
    if (descriptionError) newErrors.description = descriptionError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(task);
      onOpenChange(false);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setErrors({});
    onOpenChange(false);
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
                Título <Text color="red">*</Text>
              </Text>
              <TextField.Root
                name="title"
                value={task.title}
                onChange={handleChange}
                placeholder="Ej: Aprender Go"
                color={errors.title ? "red" : undefined}
              />
              {errors.title && (
                <Text size="1" color="red" mt="1">
                  {errors.title}
                </Text>
              )}
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
                color={errors.description ? "red" : undefined}
              />
              {errors.description && (
                <Text size="1" color="red" mt="1">
                  {errors.description}
                </Text>
              )}
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

            {Object.values(errors).some((error) => error) && (
              <Callout.Root color="red" size="1">
                <Callout.Icon>
                  <InfoCircledIcon />
                </Callout.Icon>
                <Callout.Text>
                  Por favor corrige los errores antes de continuar
                </Callout.Text>
              </Callout.Root>
            )}

            <Flex justify="end" gap="3" mt="4">
              <Button
                variant="soft"
                color="gray"
                type="button"
                onClick={handleCancel}
              >
                Cancelar
              </Button>
              <Button type="submit" color="blue" disabled={isSubmitting}>
                {isSubmitting
                  ? "Guardando..."
                  : initialData
                  ? "Actualizar"
                  : "Crear"}
              </Button>
            </Flex>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
