import config from "@/config";
import { ILoginUser, IRegisterUser } from "@/types/user";

const authApi = `${config.host}/api/auth`;

export const loginUser = async (user: ILoginUser) => {
  const res = await fetch(`${authApi}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return {
    status: res.status,
    data: await res.json(),
  };
};

export const registerUser = async (user: IRegisterUser) => {
  const res = await fetch(`${authApi}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return {
    status: res.status,
    data: await res.json(),
  };
};
