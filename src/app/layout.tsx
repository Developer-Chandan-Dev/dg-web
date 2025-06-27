import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import Script from 'next/script';
import { ClerkProvider } from '@clerk/nextjs';
import { Analytics } from './analytics';

/* ①  Load Poppins and expose it as a CSS variable */
const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Digital Marketing Agency | D-3',
  description:
    "It's a digital marketing agency that helps you grow your business.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /* ②  Put the variable on <body>.  If you were still loading Geist you would add its
          variable here as well, e.g. `${geistSans.variable} ${poppins.variable}`        */
  return (
    <html lang="en">
      <head>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-T817RCNV7R"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-T817RCNV7R', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body className={`${poppins.variable} antialiased`}>
        <ClerkProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Analytics />
            {children}
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
