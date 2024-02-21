"use client";
import { ReactNode, useContext } from "react";

import NotAllowedPage from "@portal/app/not-allowed";
import { AuthContext } from "@portal/context/auth-provider";

const AuthGuard = ({ children }: { children: ReactNode }) => {
  const { state } = useContext(AuthContext);

  if (state.user) {
    return children;
  }

  return <NotAllowedPage />;
};

export default AuthGuard;
