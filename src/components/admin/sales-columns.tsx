import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { SALES } from "@/types";
import { format } from "date-fns";

export const SalesColumns = (
  handleDelete: (id: string) => void
): ColumnDef<SALES>[] => [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="h-8 w-full justify-start"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Title
      </Button>
    ),
  },
  {
    accessorKey: "purchasedAt",
    header: "Purchased At",
    cell: ({ row }) => {
      const rawDate: string = row.getValue("created_At");
      const formatted = format(new Date(rawDate), "dd MMM yyyy hh:mm a");
      return formatted;
    },
  },
  {
    accessorKey: "price",
    header: "Price (₹)",
  },
  {
    accessorKey: "userId",
    header: "User ID",
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <Button
        variant="destructive"
        onClick={() => handleDelete(row.original.purchaseId)}
      >
        Delete
      </Button>
    ),
  },
];
