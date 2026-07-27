import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pet Food | Premium Quality",
  description: "Elevate your feline's diet with organic, vet-approved meals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
