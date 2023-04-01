"use client";
import AppContext from "./AppContext";

import { ReactNode, useEffect, useReducer } from "react";
import initialState from "./initialState";
import { getUserAuth } from "@/utils/authStorage";
import appReducer from "./appReducer";
import { IUserAuth } from "@/types/user";
import { addUserAuth } from "./appActions";

const AppState = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  useEffect(() => {
    let user: IUserAuth | null = getUserAuth();
    if (user) addUserAuth(user, dispatch);
    else addUserAuth({ token: "", auth: false, loading: false }, dispatch);
  }, []);
  return <AppContext.Provider value={{ ...state, dispatch }}>{children}</AppContext.Provider>;
};
export default AppState;
