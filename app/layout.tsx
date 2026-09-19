import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import "./globals.css";

export const metadata = {
  title: "Red Crescent Institute of Paramedical Sciences",
  icons: {
    icon: [{ url: "/Images/redcresent.jpg", type: "image/jpeg" }],
    shortcut: "/Images/redcresent.jpg",
    apple: "/Images/redcresent.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <AppRouterCacheProvider>
          <Navbar />
          {children}
          <Footer />
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
