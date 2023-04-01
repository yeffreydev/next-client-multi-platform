"use client";

import { useAuth } from "@/hooks/auth";
import { checkLogin } from "@/utils/authFunctions";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  if (!checkLogin(auth)) return null;
  return <>{children}</>;
}
