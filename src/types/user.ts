export interface IUserAuth {
  token: string;
  loading: boolean;
  auth: boolean;
}
export interface ILoginUser {
  username: string;
  password: string;
}
export interface IRegisterUser extends ILoginUser {
  email: string;
  confirmPassword: string;
  terms: boolean;
}
