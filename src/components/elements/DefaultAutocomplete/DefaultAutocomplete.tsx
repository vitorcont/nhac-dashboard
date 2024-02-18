"use client";

/* eslint-disable @next/next/no-img-element */
import { Autocomplete, AutocompleteProps } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

import { UnderlinedInput } from "../UnderlinedInput/UnderlinedInput";

export interface DefaultAutocompleteProps
  extends Omit<AutocompleteProps<any, any, any, any>, "renderInput"> {
  success?: boolean;
  label?: string;
}

export const DefaultAutocomplete = (props: DefaultAutocompleteProps) => {
  const { t } = useTranslation();
  return (
    <Autocomplete
      {...props}
      disablePortal
      fullWidth
      loadingText={t("UTILS.BUTTONS.LOADING")}
      renderInput={(params) => <UnderlinedInput {...params} label={props.label} />}
    />
  );
};
