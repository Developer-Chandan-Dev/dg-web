// app/(user)/courses/layout.tsx
export const metadata = {
  title: 'Courses | SkillsBazzar2',
  description: 'Browse digital products and marketing resources.',
  keywords: ['digital marketing', 'courses', 'ebooks'],
  openGraph: {
    title: 'Courses | SkillsBazzar2',
    description: 'Browse and download digital marketing resources.',
    type: 'website',
  },
};

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
