"use client";

import { Table, Card, Flex, Text, Badge, IconButton } from "@radix-ui/themes";
import { Task } from "../types/Task";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";

type TaskTableProps = {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete?: (task: Task) => void;
};

export default function TaskTable({ tasks, onEdit, onDelete }: TaskTableProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (!tasks.length) {
    return (
      <Flex
        align="center"
        justify="center"
        direction="column"
        className="p-6 text-center"
      >
        <Text size="3" color="gray">
          No hay tareas registradas.
        </Text>
      </Flex>
    );
  }

  return (
    <Card variant="surface" size="3" className="w-full max-w-5xl">
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Título</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Descripción</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Estado</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Creación</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Actualización</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Acciones</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {tasks.map((task) => (
            <Table.Row key={task.id}>
              <Table.Cell>
                <Text color="gray">{task.id}</Text>
              </Table.Cell>
              <Table.Cell>
                <Text weight="medium">{task.title}</Text>
              </Table.Cell>
              <Table.Cell>
                <Text color="gray">{task.description}</Text>
              </Table.Cell>
              <Table.Cell>
                {task.completed ? (
                  <Badge color="green" variant="soft">
                    Completada
                  </Badge>
                ) : (
                  <Badge color="red" variant="soft">
                    Pendiente
                  </Badge>
                )}
              </Table.Cell>
              <Table.Cell>
                <Text color="gray" size="1">
                  {formatDate(task.created_at)}
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text color="gray" size="1">
                  {formatDate(task.updated_at)}
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Flex gap="2">
                  <IconButton
                    size="1"
                    variant="soft"
                    color="blue"
                    onClick={() => onEdit(task)}
                  >
                    <Pencil2Icon width="16" height="16" />
                  </IconButton>
                  {onDelete && (
                    <IconButton
                      size="1"
                      variant="soft"
                      color="red"
                      onClick={() => onDelete(task.id)}
                    >
                      <TrashIcon width="16" height="16" />
                    </IconButton>
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
}
