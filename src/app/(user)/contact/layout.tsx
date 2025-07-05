export const metadata = {
  title: 'Contact | SkillsBazzar2',
  description: 'Contact to SkillsBazzar2 agency and explore marketing resources.',
  keywords: ['digital marketing', 'courses', 'ebooks'],
  openGraph: {
    title: 'Contact | SkillsBazzar2',
    description: 'Browse and download digital marketing resources.',
    type: 'website',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
