"use client";

import { useAuth } from "@/hooks/auth";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  const auth = useAuth({ redirect: true, path: "/", auth: true });
  if (auth.isLoading || auth.isLoggedIn) return null;
  return <>{children}</>;
}
