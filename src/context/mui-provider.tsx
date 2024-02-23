"use client";

import { createTheme, ThemeProvider } from "@mui/material";
import React, { use, useEffect } from "react";
import { I18nextProvider } from "react-i18next";

import { getLocalKey, LocalStorageEnum } from "@portal/utils/local-storage";

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

  useEffect(() => {
    const lang = getLocalKey(LocalStorageEnum.LANGUAGE) ?? "pt";

    i18n.changeLanguage(lang);
  }, []);

  return (
    <I18nextProvider i18n={i18n} defaultNS="translation">
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </I18nextProvider>
  );
};

export default MuiProvider;
