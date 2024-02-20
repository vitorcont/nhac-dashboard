"use client";

import React, { createContext, useEffect, useReducer } from "react";

import { userApi } from "@portal/service/user.api";

const initialState: AuthState = {
  user: null,
  accessToken: null,
};

export enum AuthActionEnum {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

interface AuthState {
  user: IUser.IUser | null;
  accessToken: string | null;
}

interface AuthAction {
  type: AuthActionEnum;
  payload?: any;
}

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case AuthActionEnum.LOGIN:
      return {
        ...state,
        user: action.payload || null,
      };
    case AuthActionEnum.LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

interface AuthContextType {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

export const AuthContext = createContext<AuthContextType>({
  state: initialState,
  dispatch: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const getMe = async () => {
    try {
      const data = await userApi.getMe();
      dispatch({ type: AuthActionEnum.LOGIN, payload: data });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
};
