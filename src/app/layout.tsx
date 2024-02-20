import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "../styles/globals.css";
import "../styles/base.scss";
import "../i18n";
import { AuthProvider } from "@portal/context/auth-provider";
import MuiProvider from "@portal/context/mui-provider";
import { Header } from "@portal/components/modules/Header/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nhac!",
  description: "Nhac!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="favicon.ico" type="image/x-icon" />
      <body className={inter.className}>
        {/* <MuiProvider> */}
        <AuthProvider>
          <Header />
          <main>{children}</main>
        </AuthProvider>
        {/* </MuiProvider> */}
      </body>
    </html>
  );
}
