import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { SALES } from "@/types";
import { format } from "date-fns";
import { ArrowUpDown } from "lucide-react";

export const SalesColumns = (
  handleDelete: (id: string) => void
): ColumnDef<SALES>[] => [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="h-8 w-full justify-start text-left"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Title
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "userName",
    header: "Customer",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "price",
    header: "Amount (₹)",
  },
  {
    accessorKey: "purchasedAt",
    header: "Purchased At",
    cell: ({ row }) => {
      const rawDate: string = row.getValue("purchasedAt");
      const formatted = format(new Date(rawDate), "dd MMM yyyy hh:mm a");
      return formatted;
    },
  },

  // {
  //   accessorKey: "userId",
  //   header: "User ID",
  // },
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
