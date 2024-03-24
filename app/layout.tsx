import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./components/nav";
import Sidebar from "./components/sidebar";
import { RoutePath } from "./entities/RoutePath";
import HomeIcon from "@mui/icons-material/Home";
import TokenIcon from "@mui/icons-material/Token";
import EditNoteIcon from "@mui/icons-material/EditNote";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Ticket Manager",
  description: "Zendesk ticket server to automate processes",
};

const sidebar: RoutePath[] = [
  {
    label: "Home",
    route: "/",
    icon: HomeIcon,
  },
  {
    label: "Create Ticket",
    route: "/create-ticket",
    icon: EditNoteIcon,
  },
  {
    label: "Generate Token",
    route: "/generate-token",
    icon: TokenIcon,
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
        <div className="flex min-h-128">
          <Sidebar items={sidebar} />
          {children}
        </div>
      </body>
    </html>
  );
}
