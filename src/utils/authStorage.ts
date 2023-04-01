import { IUserAuth } from "@/types/user";

const authKeyForSave = "user";

export const saveUserAuth = (value: string) => {
  localStorage.setItem(authKeyForSave, value);
};
export const deleteUserAuth = () => {
  localStorage.removeItem(authKeyForSave);
};
export const getUserAuth = (): IUserAuth | null => {
  let user = localStorage.getItem(authKeyForSave);
  return user ? (JSON.parse(user) as IUserAuth) : null;
};
