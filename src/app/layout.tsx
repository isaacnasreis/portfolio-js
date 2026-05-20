import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Isaac Reis | Full Stack Developer & Product Designer",
  description:
    "Polo Tech de Isaac Reis. Construindo aplicações escaláveis da arquitetura ao pixel. Full Stack, UX Engineering e Product Design.",
  openGraph: {
    title: "Isaac Reis | Full Stack Developer & Product Designer",
    description:
      "Polo Tech de Isaac Reis. Construindo aplicações escaláveis da arquitetura ao pixel.",
    url: "https://tech.isaacreis.com",
    siteName: "Isaac Reis Tech Hub",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground scanlines">
        {/* We add a fixed pixel grid in the background to give that subtle retro-futuristic feel */}
        <div className="fixed inset-0 z-[-1] bg-grid-pattern pointer-events-none opacity-40"></div>

        <main className="flex-1 flex flex-col">{children}</main>
      </body>
    </html>
  );
}
