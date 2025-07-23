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
  purchasedAt: string;
  userId: string;
  purchaseId: string;
  title: string;
  price: number;
  userName: string;
  email: string;
};

export type USER = {
  id: string;
  email: string;
  full_name: string;
  role: string;
  created_at: string;
  userId: string;
};
