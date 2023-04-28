"use client";
import { useAuth } from "@/hooks/auth";
import Header from "@/ui/Header";
import Link from "next/link";

export default function PaintLayout({ children }: { children: React.ReactNode }) {
  const auth = useAuth({ redirect: true, auth: false, path: "/login" });
  if (auth.isLoading || !auth.isLoggedIn) return null;
  return (
    <>
      <div className="bg-black">
        <Header>
          <div>
            <Link href="/apps/paint">Paint App</Link>
          </div>
        </Header>
      </div>
      {children}
    </>
  );
}
