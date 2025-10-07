"use client";

import { Flex, Button, Text, Select } from "@radix-ui/themes";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  limit,
  total,
  onPageChange,
  onLimitChange,
}: PaginationProps) {
  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, total);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <Flex
      direction="column"
      gap="3"
      align="center"
      className="w-full max-w-5xl"
    >
      <Flex justify="between" align="center" className="w-full">
        <Flex align="center" gap="2">
          <Text size="2" color="gray">
            Mostrando {startItem} - {endItem} de {total} tareas
          </Text>
        </Flex>

        <Flex align="center" gap="2">
          <Text size="2" color="gray">
            Filas por página:
          </Text>
          <Select.Root
            value={limit.toString()}
            onValueChange={(value) => onLimitChange(Number(value))}
          >
            <Select.Trigger />
            <Select.Content>
              <Select.Item value="5">5</Select.Item>
              <Select.Item value="8">8</Select.Item>
              <Select.Item value="10">10</Select.Item>
              <Select.Item value="20">20</Select.Item>
              <Select.Item value="50">50</Select.Item>
            </Select.Content>
          </Select.Root>
        </Flex>
      </Flex>

      <Flex gap="2" align="center">
        <Button
          variant="soft"
          size="2"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          <DoubleArrowLeftIcon />
        </Button>

        <Button
          variant="soft"
          size="2"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeftIcon />
        </Button>

        {getPageNumbers().map((page, index) => {
          if (page === "...") {
            return (
              <Text key={`ellipsis-${index}`} size="2" color="gray">
                ...
              </Text>
            );
          }

          return (
            <Button
              key={page}
              variant={currentPage === page ? "solid" : "soft"}
              size="2"
              onClick={() => onPageChange(page as number)}
            >
              {page}
            </Button>
          );
        })}

        <Button
          variant="soft"
          size="2"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRightIcon />
        </Button>

        <Button
          variant="soft"
          size="2"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          <DoubleArrowRightIcon />
        </Button>
      </Flex>
    </Flex>
  );
}
