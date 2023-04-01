import { IUserAuth } from "@/types/user";

import { Dispatch } from "react";

import { AppActionTypes, IAction } from "./contextTypes";

export const addUserAuth = (userAuth: IUserAuth, dispatch: Dispatch<IAction<IUserAuth>>) => {
  dispatch({
    type: AppActionTypes.ADD_USER_AUTH,
    payload: userAuth,
  });
};
