import { IUserAuth } from "@/types/user";

const authKeyForSave = "auth";

export const saveUserAuth = (userAuth: IUserAuth) => {
  localStorage.setItem(authKeyForSave, JSON.stringify(userAuth));
};
export const deleteUserAuth = () => {
  localStorage.removeItem(authKeyForSave);
};
export const getUserAuth = (): IUserAuth | null => {
  let user = localStorage.getItem(authKeyForSave);
  return user ? (JSON.parse(user) as IUserAuth) : null;
};
