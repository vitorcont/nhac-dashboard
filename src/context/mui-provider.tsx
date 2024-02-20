"use client";

import { createTheme, ThemeProvider } from "@mui/material";
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
      secondary: {
        main: "#4c4c4c",
      },
    },
  });

  return (
    <I18nextProvider i18n={i18n} defaultNS="translation">
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </I18nextProvider>
  );
};

export default MuiProvider;
