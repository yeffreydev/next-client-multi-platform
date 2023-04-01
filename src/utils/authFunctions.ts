export const checkLogin = (auth: { isLoggedIn: boolean; isLoading: boolean }): boolean => {
  if (auth.isLoading) return false;
  if (auth.isLoggedIn) return false;
  return true;
};
