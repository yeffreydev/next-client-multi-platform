import { IUserAuth } from "@/types/user";
import { IAction, IAppState, AppActionTypes } from "./contextTypes";

const appReducer = (state: IAppState, action: IAction<IUserAuth | boolean | null>): IAppState => {
  switch (action.type) {
    case AppActionTypes.ADD_USER_AUTH: {
      return { ...state, userAuth: { ...(action.payload as IUserAuth), loading: false } };
    }
    default:
      return state;
  }
};

export default appReducer;
