import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "../styles/globals.css";
import "../styles/base.scss";
import "../i18n";
import { DefaultAutocomplete } from "@portal/components/elements/DefaultAutocomplete/DefaultAutocomplete";
import { SearchBar } from "@portal/components/modules/SearchBar/SearchBar";
import MuiProvider from "@portal/context/mui-provider";

import SearchIcon from "@mui/icons-material/Search";
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
        <MuiProvider>
          <header className="w-full z-20 border-b-2 border-black border-opacity-10 fixed bg-white py-3 px-5 flex flex-row justify-between items-center">
            <nav>
              <a className="flex flex-row items-center" href="/">
                <img src="/ic_logo.svg" alt="logo" className="w-6 h-6" />
                <b className="text-3xl ml-2 bold primary">Nhac!</b>
              </a>
            </nav>
            <nav className="w-7/12">
              <SearchBar />
            </nav>
            <nav>
              <p className="primary bold">Entrar</p>
            </nav>
          </header>
          <main>{children}</main>
        </MuiProvider>
      </body>
    </html>
  );
}
