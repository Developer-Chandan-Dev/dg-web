'use client';
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { getPurchasedCoursesById } from '@/lib/actions/purchases.action';
import { Download, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';

type PDF = {
  purchasedId: string;
  pdfId: string; // Assuming pdfId is the same as purchaseId
  title: string;
  price: string;
  thumbnailUrl: string; // Assuming thumbnail_url is mapped to thumbnail
  downloadurl: string; // Optional, if you want to include the file URL
};

export default function DownloadsTable({ userId }: { userId: string }) {
  const [pdfs, setPdfs] = useState<PDF[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getPurchasedCoursesById(userId);
      
      setPdfs(
        (data || []).map((item) => ({
          purchasedId: item.purchaseId,
          pdfId: item.purchaseId, // Use purchaseId as pdfId
          title: item.title,
          price: item.price.toString(), // Convert price to string
          thumbnailUrl: item.thumbnailUrl, // Correctly map thumbnailUrl
          downloadurl: item.downloadUrl, // Correctly map downloadUrl
        }))
      );
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="animate-spin w-6 h-6 text-muted-foreground" />
      </div>
    );
  }
  return (
    <Table className="mt-3">
      <TableCaption>Your purchased PDF courses.</TableCaption>
      <TableHeader>
        <TableRow className="dark:!text-gray-700">
          <TableHead>Thumbnail</TableHead>
          <TableHead>Title</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead>Download</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pdfs.map((item) => (
          <TableRow key={item.purchasedId}>
            <TableCell>
              <Link href={`/courses/${item.pdfId}`}>
                <img
                  src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/pdfs/${item.thumbnailUrl}`}
                  alt={item.title}
                  className="w-12 h-12 object-cover rounded"
                />
              </Link>
            </TableCell>
            <TableCell>
              <Link href={`/courses/${item.pdfId}`}>{item.title}</Link>
            </TableCell>
            <TableCell className="text-right">₹ {item.price}</TableCell>
            <TableCell>
              <a
                href={`${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/pdfs/${item.downloadurl}`}
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="cursor-pointer"
                >
                  <Download />
                </Button>
              </a>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
