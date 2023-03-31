export interface IAuthUser {
  token: string;
  auth: boolean;
}
export interface ILoginUser {
  username: string;
  password: string;
}
export interface IRegisterUser extends ILoginUser {
  email: string;
  terms: boolean;
}
