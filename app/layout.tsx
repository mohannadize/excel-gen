import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Patients to Excel",
  description:
    "A tool that parses whatsapp messages with patients data and exports excel sheets",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="./icons/apple-touch-icon.png" />
        <link rel="manifest" href="./manifest.json" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
