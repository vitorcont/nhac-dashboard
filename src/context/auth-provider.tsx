"use client";

import React, { createContext, useEffect, useReducer } from "react";

import { userApi } from "@portal/service/user.api";
import {
  LocalStorageEnum,
  clearLocalStorage,
  getLocalKey,
  setLocalKey,
} from "@portal/utils/local-storage";

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
      clearLocalStorage();

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
      const token = getLocalKey(LocalStorageEnum.ACCESS_TOKEN);
      const data = await userApi.getMe(token ?? "");
      dispatch({ type: AuthActionEnum.LOGIN, payload: data });
    } catch (err) {
      setLocalKey(LocalStorageEnum.ACCESS_TOKEN, "");
      console.error(err);
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
};
