"use client";

/* eslint-disable @next/next/no-img-element */
import {
  CircularProgress,
  IconButton,
  InputAdornment,
  StandardTextFieldProps,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import InputMask from "react-input-mask";

import VisibleIcon from "../../../assets/icons/ic_eye.svg";
import MaskedIcon from "../../../assets/icons/ic_eye_masked.svg";

export interface UnderlinedInputProps extends StandardTextFieldProps {
  password?: boolean;
  StartAdornment?: React.ReactNode;
  EndAdornment?: React.ReactNode;
  loading?: boolean;
  errorValidator?: (value: string) => boolean;
  successValidator?: (value: string) => boolean;
  setError?: (value: boolean) => void;
  setSuccess?: (value: boolean) => void;
  success?: boolean;
  onChangeText?: (value: string) => void;
  mask?: string | (string | RegExp)[];
  textArea?: boolean;
}

export const UnderlinedInput = (props: UnderlinedInputProps) => {
  const [password, setPassword] = useState(props.password);
  const [internError, setInternError] = useState(false);
  const [internSuccess, setInternSuccess] = useState(false);

  const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement, Element>) => {
    if (props.errorValidator) {
      setInternError(!props.errorValidator(event.target.value));
      if (props.setError) {
        props.setError(!props.errorValidator(event.target.value));
      }
    }
    if (props.successValidator) {
      setInternSuccess(!props.successValidator(event.target.value));
      if (props.setSuccess) {
        props.setSuccess(!props.successValidator(event.target.value));
      }
    }
    if (props.onBlur) {
      props.onBlur(event);
    }
  };

  const handleHelperMessage = () => {
    if (props.error || internError) {
      return props.helperText;
    }

    return undefined;
  };

  const wrapComponent = (component: React.ReactNode) => {
    if (props.mask) {
      return (
        <InputMask
          value={props.value as any}
          mask={props.mask}
          maskChar={" "}
          disabled={props.disabled}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            if (props.onChange) {
              props.onChange(event);
            }
            if (props.onChangeText) {
              props.onChangeText(event.target.value);
            }
          }}
          onBlur={handleBlur}>
          {(() => component) as any}
        </InputMask>
      );
    } else {
      return component;
    }
  };

  const getEndAdornment = () => {
    if (props.password) {
      return (
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={() => setPassword(!password)}
            edge="end">
            <img src={(!password ? MaskedIcon : VisibleIcon) as string} draggable={false} alt="" />
          </IconButton>
        </InputAdornment>
      );
    }
    if (props.loading) {
      return <CircularProgress className="input-loading" color="primary" />;
    }

    return props.EndAdornment;
  };

  return (
    <>
      {wrapComponent(
        <TextField
          {...props}
          size={props.size ?? "medium"}
          variant="outlined"
          maxRows={props.maxRows}
          type={password ? "password" : props.type ?? "text"}
          error={props.error || internError}
          InputProps={{
            startAdornment: props.StartAdornment,
            endAdornment: getEndAdornment(),
            ...props.InputProps,
          }}
          color={props.success || internSuccess ? "success" : props.color}
          focused={props.success || internSuccess ? true : props.focused}
          fullWidth
          helperText={handleHelperMessage()}
          onChange={
            props.mask
              ? undefined
              : (event) => {
                  if (props.onChange) {
                    props.onChange(event);
                  }
                  if (props.onChangeText) {
                    props.onChangeText(event.target.value);
                  }
                }
          }
          onBlur={props.mask ? undefined : handleBlur}
        />
      )}
    </>
  );
};
