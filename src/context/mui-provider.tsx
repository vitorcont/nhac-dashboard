"use client";

import { createTheme, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import React from "react";
import { I18nextProvider } from "react-i18next";

import i18n from "../i18n";

interface MuiProviderProps {
  children: React.ReactNode;
}

const MuiProvider = (props: MuiProviderProps) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#BC0505",
      },
    },
  } as any);

  return (
    <I18nextProvider i18n={i18n} defaultNS="translation">
      <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="pt">
        <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
      </LocalizationProvider>
    </I18nextProvider>
  );
};

export default MuiProvider;
