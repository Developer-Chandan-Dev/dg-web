interface GetAllCourses {
  limit?: number;
  page?: number;
  title?: string | string[];
}

interface GetCourseById {
  id: string;
}

interface PdfCourse {
  id: string;
  title: string;
  price: number;
  thumbnail_url: string;
  file_url: string;
}

interface Purchase {
  id: string;
  pdf_courses: PdfCourse;
}

export type PDF = {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  created_At: string;
};

export type SALES = {
  purchaseId: string;
  title: string;
  purchasedAt: string;
  price: number;
  userId: string;
};
