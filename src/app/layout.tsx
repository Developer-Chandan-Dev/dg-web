import "./globals.css";
import type {Metadata} from "next";
import {Poppins} from "next/font/google";
import {ThemeProvider} from "next-themes";
import {  ClerkProvider } from "@clerk/nextjs";

/* ①  Load Poppins and expose it as a CSS variable */
const poppins = Poppins({
    variable: "--font-poppins",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
    title: "Digital Marketing Agency | D-3",
    description: "It's a digital marketing agency that helps you grow your business.",
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
        <body className={`${poppins.variable} antialiased`}>
            <ClerkProvider>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </ClerkProvider>
        </body>
        </html>
    );
}
