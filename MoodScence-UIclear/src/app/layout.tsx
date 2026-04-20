import type { Metadata } from "next";
import "./globals.css";
import { MoodProvider } from "../components/MoodContext";

export const metadata: Metadata = {
  title: "MoodSense UI",
  description: "High-fidelity React-based Career Guidance Web App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased text-slate-800">
        <MoodProvider>
          {children}
        </MoodProvider>
      </body>
    </html>
  );
}
