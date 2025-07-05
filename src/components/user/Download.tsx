'use client';

import { DownloadIcon } from 'lucide-react';
import CustomButton from './CustomButton';

export const Download = ({ pdfUrl }: { pdfUrl: string }) => {

  return (
    <a
      href={`${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/pdfs/${pdfUrl}`}
      download
      target="_blank"
      rel="noopener noreferrer"
    >
      <CustomButton className="flex items-center gap-1">
        <DownloadIcon className="mr-2 h-4 w-4" />
        <span>Download</span>
      </CustomButton>
    </a>
  );
};
