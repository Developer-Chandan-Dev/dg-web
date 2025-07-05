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
