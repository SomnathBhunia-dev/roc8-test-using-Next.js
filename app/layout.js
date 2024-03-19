import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from './Utills/Navbar';
import Context from "./Utills/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Roc8-Test",
  description: "Developed By Somnath Bhunia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Context>
          <Navbar />
          {children}
        </Context>
      </body>
    </html>
  );
}
