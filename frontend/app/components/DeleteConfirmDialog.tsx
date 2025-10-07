"use client";

import { AlertDialog, Button, Flex } from "@radix-ui/themes";

type DeleteConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  taskTitle: string;
};

export default function DeleteConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  taskTitle,
}: DeleteConfirmDialogProps) {
  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>Eliminar Tarea</AlertDialog.Title>
        <AlertDialog.Description size="2">
          ¿Estás seguro de que deseas eliminar la tarea "{taskTitle}"? Esta
          acción no se puede deshacer.
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancelar
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="red" onClick={onConfirm}>
              Eliminar
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}