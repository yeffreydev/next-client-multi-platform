import { Dispatch } from "react";
import { IUserAuth } from "@/types/user";

export enum AppActionTypes {
  ADD_USER_AUTH = "ADD_USER_AUTH",
  REMMOVE_USER_AUTH = "REMVOE_USER_AUTH",
}

export interface IAction<T> {
  type: AppActionTypes;
  payload: T;
}

export interface IAppState {
  userAuth: IUserAuth;
  dispatch: Dispatch<IAction<IUserAuth | null>>;
}
