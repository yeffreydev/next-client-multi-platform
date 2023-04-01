import { useContext, useEffect } from "react";
import AppContext from "@/context/AppContext";

export const useAuth = () => {
  const { userAuth } = useContext(AppContext);

  useEffect(() => {
    if (userAuth.auth) {
      window.location.href = "/";
    }
  }, [userAuth]);

  const isLoggedIn = userAuth.auth;
  const isLoading = userAuth.loading;

  return { isLoggedIn, isLoading };
};
