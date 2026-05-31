import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "DataQuotes Campus Ambassador Program",
  description:
    "Represent DataQuotes on your campus. Build leadership skills, grow your network, and connect students with real-world data & technology opportunities.",
  keywords: "DataQuotes, campus ambassador, student, Tirupati, data science, technology",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#161b27",
              border: "1px solid #1e2535",
              color: "#e8eaf0",
            },
          }}
        />
      </body>
    </html>
  );
}