import "@radix-ui/themes/styles.css";

import { Container, Theme } from "@radix-ui/themes";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./Navbar";
import AuthProvider from "./auth/Provider";
import QueryClientProvider from "./QueryClientProvider";
import { auth } from "@/auth";
import Footer from "./Footer";
// import Sidebar from "./Sidebar"; // Import Sidebar component

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ItikafConnect",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  let classLogin = "";
  if (!session?.user) {
    const arrClas = [
      "justify-center",
      "items-center",
      "h-full",
      "flex",
      "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]",
      "from-extra_light_gold",
      "to-light_gold",
    ];
    classLogin = arrClas.join(" ");
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProvider>
          <AuthProvider>
            <Theme
              className={`${classLogin} grid  min-h-screen grid-rows-[auto_1fr] grid-cols-[auto_1fr]`}
            >
              {/* First child: Navbar, spans two columns */}
              {session?.user && (
                <div className="col-span-2">
                  <Navbar />
                </div>
              )}

              {/* Second child: Main content, first column of second row */}
              <main className="col-start-2 row-start-2 p-4">
                <Container>{children}</Container>
              </main>

              {/* Third child: Sidebar, second column of second row */}
              {
                /* {session?.user && ( */
                // <div className="col-start-1 row-start-2">
                // <Sidebar />
                // </div>
                // )
              }
              <Footer />
            </Theme>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
