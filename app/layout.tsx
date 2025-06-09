import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from './context/AuthContext';
import { Providers } from './providers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Jewelmer",
  description: "Jewelmer is an international luxury brand that was born out of a commitment to the world's most cultured golden South Sea Pearls from the Philippines. View our fine jewelry collection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${lato.variable} antialiased pt-[80px] xl:pt-[145px]`}
      >
        <Providers>
          <AuthProvider>
            <Navbar />
            <main>
              {children}
            </main>
            <Footer />
            <ToastContainer position="bottom-right" />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
