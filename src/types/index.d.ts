interface GetAllCourses {
    limit?: number;
    page?: number;
    title?: string | string[];
}

interface GetCourseById {
    id: string;
}