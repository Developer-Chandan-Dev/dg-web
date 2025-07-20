import { ColumnDef } from "@tanstack/react-table";
import { PDF } from "@/types";
import { Button } from "@/components/ui/button";
import { Download, Trash2, SquarePen } from "lucide-react";

export const pdfColumns = (
    handleDelete: (id: string) => void,
    setSelectedPdf: (pdf: PDF) => void
): ColumnDef<PDF>[] => [
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => row.getValue("title"),
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => {
            const desc = row.getValue("description") as string;
            return desc.length > 20 ? desc.slice(0, 20) + "..." : desc;
        },
    },
    {
        accessorKey: "price",
        header: "Price (₹)",
        cell: ({ row }) => <div className="text-right">₹{row.getValue("price")}</div>,
        filterFn: (row, columnId, value: [number, number]) => {
            const price = row.getValue(columnId) as number;
            return price >= value[0] && price <= value[1];
        },
    },

    {
        id: "actions",
        // header: "Actions",
        cell: ({ row }) => {
            const pdf = row.original;
            return (
                <div className="flex items-center justify-end gap-2">
                <Button
                    variant="outline"
            onClick={() => window.open(`/api/download?pdfId=${pdf.id}`, "_blank")}
        >
            <Download size={16} />
            </Button>
            <Button variant="destructive" onClick={() => handleDelete(pdf.id)}>
            <Trash2 size={16} />
            </Button>
            <Button variant="secondary" onClick={() => setSelectedPdf(pdf)}>
            <SquarePen size={16} />
            </Button>
            </div>
        );
        },
    },
];
