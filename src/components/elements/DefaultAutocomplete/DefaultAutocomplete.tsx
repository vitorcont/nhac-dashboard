"use client";

/* eslint-disable @next/next/no-img-element */
import { Autocomplete, AutocompleteProps, InputProps } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

import { UnderlinedInput } from "../UnderlinedInput/UnderlinedInput";

export interface DefaultAutocompleteProps
  extends Omit<AutocompleteProps<any, any, any, any>, "renderInput"> {
  success?: boolean;
  label?: string;
  InputProps?: InputProps;
  onChangeText?: (value: string) => void;
  text?: string;
  placeholder?: string;
}

export const DefaultAutocomplete = (props: DefaultAutocompleteProps) => {
  const { t } = useTranslation();
  return (
    <Autocomplete
      {...props}
      disablePortal
      fullWidth
      loadingText={t("UTILS.BUTTONS.LOADING")}
      renderInput={(params) => (
        <UnderlinedInput
          {...params}
          placeholder={props.placeholder}
          value={props.text}
          onChange={(e) => {
            props.onChangeText && props.onChangeText(e.target.value);
          }}
          InputProps={{
            ...params.InputProps,
            ...props.InputProps,
          }}
          label={props.label}
        />
      )}
    />
  );
};
