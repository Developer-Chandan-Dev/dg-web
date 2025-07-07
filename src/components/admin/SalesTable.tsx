'use client';
import { getPurchasedCourses } from '@/lib/actions/purchases.action';
import { Loader2, Download, Trash2, SquarePen } from 'lucide-react';
import React, { useEffect, useState } from 'react';
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

type ENTRY = {
  purchasedAt: string;
  userId: string;
  purchaseId: string;
  title: string;
  price: number;
};

const SalesTable = () => {
  const [entries, setEntries] = React.useState<ENTRY[]>([]);
  const [loading, setLoading] = useState(true);
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
        }))
      );
      setLoading(false);
    })();
  }, []);

  console.log(entries, 'entries');

  const handleDelete = (id: string) => {
    console.log("Purchased Id", id);
  };

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
              <TableCell>Test1</TableCell>
              <TableCell>test1@test.com</TableCell>
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
