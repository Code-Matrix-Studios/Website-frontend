import { ReactNode } from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import "./globals.css";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">

        <Navbar />

        <main className="flex-grow">
          {children}
        </main>

        <Footer />

      </body>
    </html>
  );
}