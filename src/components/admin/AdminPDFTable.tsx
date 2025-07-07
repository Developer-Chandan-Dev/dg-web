'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, Download, Trash2, SquarePen } from 'lucide-react';
import { getAllCourses } from '@/lib/actions/pdf_courses.actions';
import { deleteCourse } from '@/lib/actions/pdf_courses.actions';
import { CourseUpdationDialog } from '@/components/admin/CourseUpdationDialog';

type PDF = {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  created_At: string;
};

export function AdminPDFTable() {
  const [pdfs, setPdfs] = useState<PDF[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPdf, setSelectedPdf] = useState<PDF | null>(null);

  useEffect(() => {
    (async () => {
      const data = await getAllCourses({ title: '' });

      setPdfs(
        (data || []).map((item) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          price: item.price,
          thumbnail: item.thumbnail_url, // Map thumbnail_url to thumbnail
          created_At: item.created_at,
        }))
      );
      setLoading(false);
    })();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this PDF?')) return;
    const res = await deleteCourse(id);

    if (res.success) setPdfs((prev) => prev.filter((pdf) => pdf.id !== id));
    else alert('Failed to delete PDF.');
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
      <div>
        <h3 className="font-bold py-2 ml-1">Available Courses</h3>

        <ScrollArea className="rounded-lg border p-4 w-full mx-auto">
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
                  <TableCell>
                    {pdf.description.length > 20
                      ? pdf.description.slice(0, 20) + '...'
                      : pdf.description}
                  </TableCell>
                  <TableCell>{pdf.price}</TableCell>
                  <TableCell className="flex items-center gap-x-2 justify-end">
                    <Button
                      variant="outline"
                      className="cursor-pointer"
                      onClick={() =>
                        window.open(`/api/download?pdfId=${pdf.id}`, '_blank')
                      }
                    >
                      <Download />
                    </Button>
                    <Button
                      variant="destructive"
                      className="cursor-pointer"
                      onClick={() => handleDelete(String(pdf.id))}
                    >
                      <Trash2 />
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
            pdf={{
              ...selectedPdf,
              id: String(selectedPdf.id),
              price: String(selectedPdf.price),
            }}
            onClose={() => setSelectedPdf(null)}
          />
        )}
      </div>
    </>
  );
}
