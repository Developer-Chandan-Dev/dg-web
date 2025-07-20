import { PDF } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { format } from "date-fns";

export const CourseColumns = (
  handleDelete: (id: string) => void,
  setSelectedPdf: (pdf: PDF) => void
): ColumnDef<PDF>[] => [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="h-8 w-full justify-start"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Title
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "price",
    header: "Price (₹)",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const desc: string = row.getValue("description");
      return desc.length > 20 ? `${desc.slice(0, 20)}...` : desc;
    },
  },
  {
    accessorKey: "created_At",
    header: "Created At",
    cell: ({ row }) => {
      const rawDate: string = row.getValue("created_At");
      const formatted = format(new Date(rawDate), "dd MMM yyyy hh:mm a");
      return formatted;
    },
  },
  //   {
  //     accessorKey: "price",
  //     header: "Price (₹)",
  //     cell: ({ row }) => (
  //       <div className="text-right">₹{row.getValue("price")}</div>
  //     ),
  //     filterFn: (row, columnId, value: [number, number]) => {
  //       const price = row.getValue(columnId) as number;
  //       return price >= value[0] && price <= value[1];
  //     },
  //   },
  {
    id: "actions",
    cell: ({ row }) => {
      const pdf = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSelectedPdf(pdf)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(pdf.id)}>
              Delete
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Download</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        // <div className="flex items-center justify-end gap-2">
        //   <Button
        //     variant="outline"
        //     onClick={() =>
        //       window.open(`/api/download?pdfId=${pdf.id}`, "_blank")
        //     }
        //   >
        //     Download
        //   </Button>
        //   <Button variant="destructive" onClick={() => handleDelete(pdf.id)}>
        //     Delete
        //   </Button>
        //   <Button variant="secondary" onClick={() => setSelectedPdf(pdf)}>
        //     Edit
        //   </Button>
        // </div>
      );
    },
  },
];
