import { IAuthUser } from "@/types/user";

const authKeyForSave = "user";
export const saveAuthUser = (value: string) => {
  localStorage.setItem(authKeyForSave, value);
};
export const deleteAuthUser = () => {
  localStorage.removeItem(authKeyForSave);
};
export const getAuthUser = (): IAuthUser | undefined => {
  let user = localStorage.getItem(authKeyForSave);
  return user ? (JSON.parse(user) as IAuthUser) : undefined;
};
