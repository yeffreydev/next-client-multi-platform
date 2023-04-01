import { IAppState } from "./contextTypes";

const initialState: IAppState = {
  userAuth: { token: "", auth: false, loading: true },
  dispatch: () => null,
};

export default initialState;
