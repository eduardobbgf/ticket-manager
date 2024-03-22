import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./components/nav";
import Sidebar from "./components/sidebar";
import { RoutePath } from "./entities/RoutePath";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Ticket Manager",
  description: "Zendesk ticket server to automate processes",
};

const sidebar: RoutePath[] = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Create Ticket",
    route: "/create-ticket",
  },
  {
    label: "Generate Token",
    route: "/generate-token",
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav />
        <div className="flex h-128">
          <Sidebar items={sidebar} />
          {children}
        </div>
      </body>
    </html>
  );
}
