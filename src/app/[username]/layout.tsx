import { ReactNode } from "react";

export default function AccountLayout({ children }: { children: ReactNode }) {
  return <div className="w-full mx-auto px-2 md:w-9/12 lg:w-8/12">{children}</div>;
}
