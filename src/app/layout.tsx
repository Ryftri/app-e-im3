import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavbarComponent } from "@/components/navbar";
import ReduxProvider from "@/lib/redux/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aplikasi e-IM3",
  description: "Aplikasi e-IM3",
  manifest: "/manifest.json",
  icons: [
    { rel: "apple-touch-icon", url: "images/icons/icon-128x128.png" },
    { rel: "icon", url: "images/icons/icon-128x128.png" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
        <ReduxProvider>
            <header className="fixed z-30 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <NavbarComponent/>
            </header>
              {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
