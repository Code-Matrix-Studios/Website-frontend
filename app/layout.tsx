import { ReactNode } from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import "./globals.css";
import LenisProvider from "./components/lenisProvider";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-[#0a1525]">

        {/* ✅ Navbar only here */}
        <Navbar />

        <LenisProvider>
          <main className="flex-grow">
            {children}
          </main>
        </LenisProvider>

        {/* ✅ Footer only here */}
        <Footer />

      </body>
    </html>
  );
}