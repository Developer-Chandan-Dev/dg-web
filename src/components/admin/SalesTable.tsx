"use client";
import { getPurchasedCourses } from "@/lib/actions/purchases.action";
import {
  Loader2,
  Download,
  Trash2,
  SquarePen,
  RefreshCcw,
  ChevronDown,
  ArrowUpDown,
} from "lucide-react";
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
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnFiltersState,
  useReactTable,
  SortingState,
} from "@tanstack/react-table";

import { SalesColumns } from "./sales-columns";
import { Input } from "../ui/input";
import { SALES } from "@/types";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

async function getSalesData(): Promise<SALES[]> {
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
  const [entries, setEntries] = React.useState<SALES[]>([]);
  const [loading, setLoading] = useState(true);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [selectedEntry, setSelectedEntry] = useState<SALES | null>(null);

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
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <>
      <div className="w-full">
        <div className="flex items-center justify-between py-4 gap-3">
          <Input
            placeholder="Filter by title..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(e) =>
              table.getColumn("title")?.setFilterValue(e.target.value)
            }
            className="max-w-sm"
          />
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={getSalesData}>
              <RefreshCcw className="w-4 h-4 mr-1" />
              <span className="max-sm:hidden">Refresh</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-2">
                  Columns <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table.getAllColumns().map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    table.resetColumnVisibility();
                  }}
                >
                  Reset Columns
                </DropdownMenuItem>
              </DropdownMenuContent>
              {/* <DropdownMenuLabel>Columns</DropdownMenuLabel> */}
            </DropdownMenu>
          </div>
        </div>

        <div className="rounded-lg border p-2 w-full mx-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <div
                          className={`flex items-center ${
                            header.column.getCanSort() ? "cursor-pointer" : ""
                          }`}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: <ArrowUpDown className="ml-2 h-4 w-4" />,
                            desc: <ArrowUpDown className="ml-2 h-4 w-4" />,
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            {loading && (
              <TableBody>
                <TableRow className="py-4 px-6">
                  <TableCell colSpan={6} className="text-center h-24">
                    Data Loading...
                    {/* <Loader2 className="animate-spin w-30 h-30 text-muted-foreground" /> */}
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
            {!loading && (
              <TableBody>
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={table.getAllColumns().length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            )}
          </Table>
        </div>
        <div className="flex items-center justify-between py-4">
          <div>
            <span className="text-sm text-muted-foreground">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              Rows per page:
            </span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              className="border px-2 bg-white py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-[#090a22]"
            >
              {[5, 10, 20, 30, 40, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* {} */}
      </div>
    </>
  );
};

export default SalesTable;
