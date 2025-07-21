"use client";
import { getPurchasedCourses } from "@/lib/actions/purchases.action";
import { Loader2, Download, Trash2, SquarePen } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { SalesColumns } from "./sales-columns";

type ENTRY = {
  purchasedAt: string;
  userId: string;
  purchaseId: string;
  title: string;
  price: number;
  userName: string;
  email: string;
};

async function getSalesData() {
  const data = await getPurchasedCourses();
  if (!data || data.length === 0) {
    return [];
  }
  return data.map((item) => ({
    purchasedAt: item.purchasedAt,
    userId: item.userId,
    purchaseId: item.purchaseId,
    title: item.title,
    price: item.price,
    userName: item.userName,
    email: item.email,
  }));
}

const SalesTable = () => {
  const [entries, setEntries] = React.useState<ENTRY[]>([]);
  const [loading, setLoading] = useState(true);
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [selectedEntry, setSelectedEntry] = useState<ENTRY | null>(null);

  useEffect(() => {
    (async () => {
      const data = await getPurchasedCourses();

      setEntries(
        (data || []).map((item) => ({
          purchasedAt: item.purchasedAt,
          userId: item.userId,
          purchaseId: item.purchaseId,
          title: item.title,
          price: item.price,
          userName: item.userName,
          email: item.email,
        }))
      );
      setLoading(false);
    })();
  }, []);

  React.useEffect(() => {
    getSalesData()
      .then((res) => setEntries(res))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  console.log(entries, "entries");

  const handleDelete = (id: string) => {
    console.log("Purchased Id", id);
  };

  const table = useReactTable({
    data: entries,
    columns: SalesColumns(handleDelete),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // onSortingChange: setSorting,
    // onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="animate-spin w-6 h-6 text-muted-foreground" />
      </div>
    );
  }

  return (
    <ScrollArea className="rounded-lg border p-4 w-full mx-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Price (₹)</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry) => (
            <TableRow key={entry.purchaseId}>
              <TableCell className="font-medium">{entry.title}</TableCell>
              <TableCell>{entry.userName}</TableCell>
              <TableCell>{entry.email}</TableCell>
              <TableCell>{entry.purchasedAt.split("T")[0]}</TableCell>
              <TableCell>{entry.price}</TableCell>
              <TableCell className="flex items-center gap-x-2 justify-end">
                <Button
                  variant="destructive"
                  className="cursor-pointer"
                  onClick={() => handleDelete(entry.purchaseId)}
                >
                  <Trash2 />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};

export default SalesTable;
