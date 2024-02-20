"use client";

import { CircularProgress } from "@mui/material";
import React from "react";

export interface ButtonProps {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  variant?: "filled" | "outlined";
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  color?: string;
  outlinedColor?: string;
  className?: string;
}

export const Button = ({
  label,
  onPress = () => {},
  variant = "filled",
  loading = false,
  disabled,
  type,
  color,
  outlinedColor,
  className,
}: ButtonProps) => {
  const getClassName = () => {
    let className = `${variant}-button`;
    if (disabled) {
      className = `${className}__disabled`;
    }

    return className;
  };

  const getLoadingColor = () => {
    if (disabled) {
      return "#a7a6b2";
    }
    if (variant === "outlined") {
      return undefined;
    }

    return "#FFF";
  };

  return (
    <div className="button-container">
      <button
        disabled={disabled === true && disabled}
        onClick={() => (disabled ? () => {} : onPress())}
        className={`sizes ${getClassName()} ${className}`}
        type={type}
        style={{
          backgroundColor: color,
          color: outlinedColor,
          borderColor: outlinedColor,
        }}>
        {loading ? (
          <CircularProgress
            color={variant === "outlined" ? "primary" : undefined}
            style={{
              color: getLoadingColor(),
            }}
            size={16}
          />
        ) : (
          label
        )}
      </button>
    </div>
  );
};
