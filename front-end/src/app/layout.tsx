import type { Metadata } from "next";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";
import { Poppins } from "next/font/google";
import Header from "@/components/Header";
import SideMenu from "@/components/SideMenu";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Daily Helper",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full dark">
      <body
        className={`h-full antialiased overflow-y-hidden ${poppins.className}`}
      >
        <ThemeProvider>
          <div className="w-full h-screen flex flex-col bg-light-gradient dark:bg-dark-gradient text-shade dark:text-dark-text">
            {" "}
            <Header />
            <div className="flex h-full">
              <SideMenu />
              <main className="flex-1">{children}</main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
