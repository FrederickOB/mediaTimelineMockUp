import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Frederick Media",
  description: "media editing mock up",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={
          inter.className +
          ' bg-[url("/bgw.png")] dark:bg-[url("/bg.png")] bg-cover'
        }
      >
        {children}
      </body>
    </html>
  );
}
