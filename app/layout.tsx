import AuthProvider from "@/components/Auth/AuthProvider";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../assets/styles/global.css";

import { MessageWrapper } from "@/context/MessageContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Property App",
  description: "Find perfect rental place",
  keywords:
    "rental,homes,views,cost,effective,booking,comparative,search,properties",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MessageWrapper>
      <AuthProvider>
        <html lang="en">
          <body className={inter.className}>
            <main>
              <Navbar />
              {children}
            </main>
            <Footer />
            <ToastContainer />
          </body>
        </html>
      </AuthProvider>
    </MessageWrapper>
  );
}
