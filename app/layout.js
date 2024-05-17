import { Inter } from "next/font/google";
import localFont from 'next/font/local'
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter',});

const optima = localFont({
  src: [
    {
      path: '../fonts/Optima Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Optima Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../fonts/Optima Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
})

export const metadata = {
  title: "Jikanto",
  description: "Time God Disciple. Time management app.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={optima.className}>{children}</body>
    </html>
  );
}
