"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import {Loader2, Download, Trash2, SquarePen} from "lucide-react";
import {deletePdfCourseAction, getAllCourses} from "@/lib/actions/dg.actions";
import {CourseUpdationDialog} from "@/components/admin/CourseUpdationDialog";

type PDF = {
    id: number;
    title: string;
    description: string;
    price: number;
    file_url: string;
    image_url: string;
};

export function AdminPDFTable() {
    const [pdfs, setPdfs] = useState<PDF[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedPdf, setSelectedPdf] = useState<PDF | null>(null);

    useEffect(() => {
        (async () => {
            const data = await getAllCourses({title: ""});
            setPdfs(data || []);
            setLoading(false);
        })();
    }, []);



    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this PDF?")) return;
        const res = await deletePdfCourseAction(id);

        if (res.success) setPdfs((prev) => prev.filter((pdf) => pdf.id !== id));
        else alert("Failed to delete PDF.");
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <Loader2 className="animate-spin w-6 h-6 text-muted-foreground" />
            </div>
        );
    }

    return (
        <>
        <ScrollArea className="rounded-lg border p-4 w-full max-w-5xl mx-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Price (₹)</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {pdfs.map((pdf) => (
                        <TableRow key={pdf.id}>
                            <TableCell className="font-medium">{pdf.title}</TableCell>
                            <TableCell>{pdf.description.length > 20 ? pdf.description.slice(0, 20) + '...' : pdf.description}</TableCell>
                            <TableCell>{pdf.price}</TableCell>
                            <TableCell className="flex items-center gap-x-2 justify-end">
                                <Button
                                    variant="outline"
                                    className="cursor-pointer"
                                    onClick={() =>
                                        window.open(`/api/download?pdfId=${pdf.id}`, "_blank")
                                    }
                                >
                                    <Download/>
                                </Button>
                                <Button variant="destructive" className="cursor-pointer" onClick={() => handleDelete(pdf.id)}>
                                    <Trash2/>
                                </Button>
                                <Button
                                    variant="secondary"
                                    onClick={() => setSelectedPdf(pdf)}
                                >
                                    <SquarePen />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </ScrollArea>

        {selectedPdf && (
            <CourseUpdationDialog
                pdf={selectedPdf}
                onClose={() => setSelectedPdf(null)}
            />
        )}
        </>
    );
}
