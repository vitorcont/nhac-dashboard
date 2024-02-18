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
      <body className={inter.className}>
        <MuiProvider>
          <header className="w-full z-20 border-b-2 border-black border-opacity-10 fixed bg-white py-3 px-5 flex flex-row justify-between items-center">
            <a className="text-3xl primary bold" href="/">
              Nhac!
            </a>
            <div className="w-7/12">
              <SearchBar />
            </div>
            <div>
              <p className="primary bold">Entrar</p>
            </div>
          </header>
          <div className="animate-fade">{children}</div>
        </MuiProvider>
      </body>
    </html>
  );
}
