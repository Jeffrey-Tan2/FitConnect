import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "../globals.css";

import Topbar from "@/components/shared/Topbar";
import Bottombar from "@/components/shared/Bottombar";
import LeftSidebar from "@/components/shared/LeftSidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'FitConnect',
  description: 'A Next.js 14 Social Media Application for fitness and bodybuilding'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Topbar />
          <main className="flex flex-row">
            <LeftSidebar />

              <section className="main-container">
                <div className="w-full max-w-4xl">
                  {children}
                </div>
              </section>
              
          </main>
          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  );
}
