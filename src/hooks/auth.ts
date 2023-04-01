import { useContext, useEffect } from "react";
import AppContext from "@/context/AppContext";

interface Props {
  redirect: boolean;
  path?: string;
  auth?: boolean;
}
export const useAuth = (p: Props) => {
  const { userAuth } = useContext(AppContext);

  useEffect(() => {
    let commun = p.redirect && !userAuth.loading;
    if (p.auth && userAuth.auth && commun) window.location.href = p.path as string;
    if (!p.auth && !userAuth.auth && commun) window.location.href = p.path as string;
  }, [userAuth, p]);

  const isLoggedIn = userAuth.auth;
  const isLoading = userAuth.loading;

  return { isLoggedIn, isLoading };
};
