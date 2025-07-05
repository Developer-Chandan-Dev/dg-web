export const metadata = {
  title: 'About | SkillsBazzar2',
  description: 'Know who we are and what we are providing.',
  keywords: ['digital marketing', 'courses', 'ebooks'],
  openGraph: {
    title: 'About | SkillsBazzar2',
    description: 'Browse and download digital marketing resources.',
    type: 'website',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
