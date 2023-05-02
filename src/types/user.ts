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
  fullName: string;
  confirmPassword: string;
  terms: boolean;
}
