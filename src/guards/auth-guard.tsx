"use client";
import { ReactNode, useContext } from "react";

import { AuthContext } from "@portal/context/auth-provider";

const AuthGuard = ({ children }: { children: ReactNode }) => {
  const { state } = useContext(AuthContext);

  if (state.user) {
    return children;
  }

  return <></>;
};

export default AuthGuard;
