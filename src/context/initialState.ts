import { IAppState } from "./contextTypes";

const initialState: IAppState = {
  userAuth: { token: "", auth: false, loading: false },
  dispatch: () => null,
};

export default initialState;
